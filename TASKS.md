# Task Board — Green Scoring System

Atomic tasks per team member across all phases. Use these as the basis for GitHub Issues when the repo is set up.  
Status markers: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Vihanga — UI

### Phase 1 · Setup

- [x] Install and configure Tailwind CSS v4
- [x] Install and configure shadcn/ui component library
- [x] Set up React Router v7 with placeholder routes (`/login`, `/dashboard`, `/loans`, `/scoring`, `/reports`, `/admin/weights`)
- [x] Create base layout component (sidebar, header, main content area)
- [x] Create a shared design token file (`src/styles/tokens.css`) for colours and typography

### Phase 2 · Core Pages

- [x] Build Login page — form with email/password, client-side validation
- [x] Build Dashboard page — overview stat cards, placeholder chart areas
- [x] Build Loan Applications list page — sortable/filterable data table
- [x] Build Loan Application detail page — read-only view of all loan fields
- [x] Build ESG submission form — three-section form (E / S / G), one or more document upload per section, raw value inputs matching `docs/SCORING.md` metric registry
- [x] Build document upload component — drag-and-drop, accepts PDF/JPG/PNG, shows upload status per section
- [x] Build officer verification panel — side-by-side view of submitted value vs document-extracted value, VERIFIED / REJECTED / CANNOT_VERIFY toggle per field, required document label per metric
- [x] Build Green Score result view — score gauge (0–100), grade badge (A/B/C/D), E/S/G sub-score bars, per-metric contribution breakdown, pass/fail gate indicator
- [x] Build Reports page — date-range filter, export button placeholder
- [x] Implement role-based route guards (Loan Officer, Manager, Admin)
- [x] Build admin AHP weights panel — display active comparison matrices per sector, allow admin to submit updated matrix values

### Phase 3 · Polish

- [ ] Implement responsive design (mobile and tablet breakpoints)
- [ ] Add loading skeleton components for async data
- [ ] Add toast notification system for API success/error feedback
- [ ] Accessibility audit — ensure WCAG 2.1 AA compliance (keyboard nav, ARIA labels, contrast ratios)

---

## Semini & Rashmika — Database & Backend

### Phase 1 · Setup

- [ ] Design ERD covering: `users`, `roles`, `customers`, `loans`, `document_store`, `esg_submissions`, `ahp_matrices`, `esg_scores`, `audit_logs` — reference `docs/SCORING.md` for column details
- [ ] Set up Alembic for database migrations (`uv run alembic init`)
- [ ] Create baseline migration from the ERD
- [ ] Define SQLAlchemy async base model with `created_at`, `updated_at`, `id` (UUID)

### Phase 2 · Auth & Core Models

- [ ] Implement `User` model, Pydantic schema, registration + login endpoints
- [ ] Implement JWT auth — access token (30 min) + refresh token (7 days)
- [ ] Implement RBAC middleware — roles: `loan_officer`, `manager`, `admin`
- [ ] Implement `Customer` model, schema, and CRUD endpoints (`/api/v1/customers`)
- [ ] Implement `Loan` model, schema, and CRUD endpoints (`/api/v1/loans`)
- [ ] Implement `AuditLog` model — append-only, log all create/update/delete actions with user ID + timestamp
- [ ] Add input validation and sanitisation on all request bodies (use Pydantic strict mode)

### Phase 3 · ESG Verification Pipeline

- [ ] Implement `document_store` model — file reference, submission ID, section (E/S/G), upload status
- [ ] Implement secure file upload endpoint (`POST /api/v1/documents/upload`) — store file ref, not file content in DB; use object storage (S3 or local in dev)
- [ ] Implement `esg_submissions` model — `e_inputs`, `s_inputs`, `g_inputs` as JSONB, per-field `verification_status` JSONB, overall `status` enum (`PENDING → SYSTEM_VERIFIED / FLAGGED_FOR_OFFICER → OFFICER_VERIFIED`)
- [ ] Implement document intelligence service wrapper (`app/services/document_intelligence.py`) — calls AWS Textract or Azure Document Intelligence based on `DOCUMENT_INTELLIGENCE_PROVIDER` env var, returns extracted key-value pairs
- [ ] Implement auto-verification step — after document upload, call document intelligence service, compare extracted values against submitted values within tolerance (see `docs/SCORING.md`), set per-field status to `SYSTEM_VERIFIED` or `FLAGGED_FOR_OFFICER`
- [ ] Implement officer verification endpoint (`PATCH /api/v1/submissions/{id}/verify`) — accepts per-field override decisions, updates `verification_status` JSONB, records officer ID in audit log
- [ ] Implement `ahp_matrices` model — sector, pillar, matrix JSONB, derived_weights JSONB, consistency_ratio, is_active; seed with default values from `docs/SCORING.md`
- [ ] Implement `esg_scores` model — full breakdown storage: green_score, e/s/g sub-scores, pillar_weights_snapshot JSONB, metric_breakdown JSONB, algorithm_version, version counter
- [ ] Implement scoring gate — `POST /api/v1/scoring/calculate` returns 422 if submission status is not fully verified
- [ ] Implement re-scoring — insert new `esg_scores` row with incremented version, never delete previous versions
- [ ] Implement admin weights endpoint (`PUT /api/v1/admin/ahp-matrices/{id}`) — validate CR ≤ 0.10 before saving, reject otherwise
- [ ] Write a database seed script for local development (`backend/scripts/seed.py`) including default AHP matrices

### Phase 4 · Quality

- [ ] Write integration tests for all endpoints using `pytest` + `httpx`
- [ ] Configure PostgreSQL connection pooling (pool size, overflow, timeout)
- [ ] Add OpenAPI `description`, `summary`, and `response` docs to all endpoints
- [ ] Add database index strategy (index foreign keys, `loan.status`, `esg_submission.status`, `esg_score.version`)

---

## Nipun — Algorithm & Scoring Model

### Phase 1 · Specification

- [ ] Read `docs/SCORING.md` in full — confirm or propose changes to the default comparison matrices and metric registry before any implementation starts
- [ ] Conduct AHP expert elicitation session with at least 3 domain experts (loan officer + risk manager + sustainability officer) — record pairwise judgments for pillar-level and all within-pillar matrices
- [ ] Verify all expert-derived matrices have CR ≤ 0.10; revise any that exceed the threshold
- [ ] Define per-sector metric benchmarks — `min_val` and `max_val` for each of the 14 metrics across `MANUFACTURING`, `SERVICES`, `AGRICULTURE`, `FINANCE`, `DEFAULT` sectors
- [ ] Define plausibility bounds per sector — values outside these bounds trigger `FLAGGED_FOR_OFFICER` even if they pass Pydantic validation
- [ ] Define cross-metric consistency rules — e.g. `renewable_energy_pct = 100` AND `carbon_intensity > 200` → flag; document all rules
- [ ] Update `docs/SCORING.md` with final expert-derived matrices and sector benchmarks

### Phase 2 · Implementation (`backend/app/services/scoring/`)

- [ ] Implement `metrics.py` — metric registry dataclass: key, label, pillar, direction, min_val, max_val, plausibility_max per sector, tolerance, hard_penalty flag, required document label
- [ ] Implement `ahp.py` — pure functions: `derive_weights(matrix)` returns `(weights, cr)`, `validate_cr(cr)` raises if CR > 0.10
- [ ] Implement `normaliser.py` — pure functions: `normalise_higher_is_better(value, min, max)` and `normalise_lower_is_better(value, min, max)`, both return 0–100 float
- [ ] Implement `engine.py` — `calculate_green_score(e_inputs, s_inputs, g_inputs, sector, weights_from_db)`: loads sector weights, normalises all inputs, calculates E/S/G sub-scores, applies hard penalty caps, combines to final score, returns full `GreenScoreResult` dataclass
- [ ] Implement plausibility check function — `check_plausibility(inputs, sector)` returns list of flagged fields with reasons
- [ ] Implement cross-metric consistency checker — `check_consistency(e_inputs, s_inputs, g_inputs)` returns list of inconsistency flags

### Phase 3 · Validation

- [ ] Write bias detection tests — assert that score distributions across different sectors and company sizes are not skewed by non-ESG factors
- [ ] Validate edge cases: all-zero inputs (all missing), all-maximum inputs, partial missing fields, hard penalty trigger
- [ ] Run scoring engine on synthetic loan dataset (minimum 20 cases) and verify results are intuitive
- [ ] Prepare plain-language algorithm summary for CBSL regulatory submission

---

## Dewmina — Testing, CI/CD, Monitoring & Deployment

### Phase 1 · Testing Framework Setup

- [ ] Configure `pytest` in `pyproject.toml` (testpaths, asyncio mode, coverage threshold ≥ 80%)
- [ ] Set up Vitest for frontend unit tests (`npm install -D vitest @testing-library/react`)
- [ ] Set up Playwright for end-to-end tests (`npm install -D @playwright/test`)
- [ ] Write backend smoke tests: health check, settings load, CORS headers
- [ ] Write frontend smoke test: app mounts, login route renders

### Phase 2 · Scoring & Verification Tests

- [ ] Write unit tests for `ahp.py` — known matrix → expected weights, CR value; assert CR > 0.10 raises exception
- [ ] Write unit tests for `normaliser.py` — boundary values (0, max, above max, negative), both directions
- [ ] Write unit tests for `engine.py` — known inputs → expected green score; hard penalty trigger; all-zero inputs
- [ ] Write unit tests for plausibility checker and cross-metric consistency checker
- [ ] Write integration test: scoring endpoint returns 422 when submission is not fully verified
- [ ] Write integration test: document tolerance matching — value within tolerance → `SYSTEM_VERIFIED`, outside → `FLAGGED_FOR_OFFICER`
- [ ] Mock the document intelligence API in all tests (no real API calls in CI)

### Phase 3 · CI/CD Pipeline

- [ ] Create GitHub Actions workflow — backend: `ruff` lint → `pytest` → build check (triggers on PR to `main`)
- [ ] Create GitHub Actions workflow — frontend: `eslint` → `vitest` → `vite build` (triggers on PR to `main`)
- [ ] Add `pre-commit` hooks: `ruff`, `black` for Python; `eslint --fix` for TypeScript
- [ ] Configure branch protection on `main`: require PR, passing CI, and at least 1 review before merge
- [ ] Set up Dependabot for automated dependency updates (Python + npm)
- [ ] Add `pip-audit` / `npm audit` step to CI to catch vulnerable dependencies

### Phase 4 · Monitoring & Deployment

- [ ] Add `prometheus-fastapi-instrumentator` to backend — expose `/metrics` endpoint
- [ ] Write `docker-compose.yml` covering: FastAPI, PostgreSQL, Prometheus, Grafana
- [ ] Configure Grafana dashboards: request rate, p95 latency, error rate, scoring throughput, verification pipeline queue depth
- [ ] Set up structured logging with `structlog` — include correlation IDs on every request
- [ ] Write `Dockerfile` for backend (multi-stage, non-root user, no secrets baked in)
- [ ] Write `Dockerfile` for frontend (nginx-based, production Vite build)
- [ ] Write deployment runbook: environment setup, migration steps, rollback procedure
