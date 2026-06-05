# Task Board — Green Scoring System

Atomic tasks per team member across all phases. Use these as the basis for GitHub Issues when the repo is set up.  
Status markers: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Vihanga — UI

### Phase 1 · Setup
- [ ] Install and configure Tailwind CSS v4
- [ ] Install and configure shadcn/ui component library
- [ ] Set up React Router v7 with placeholder routes (`/login`, `/dashboard`, `/loans`, `/scoring`, `/reports`)
- [ ] Create base layout component (sidebar, header, main content area)
- [ ] Create a shared design token file (`src/styles/tokens.css`) for colours and typography

### Phase 2 · Core Pages
- [ ] Build Login page — form with email/password, client-side validation
- [ ] Build Dashboard page — overview stat cards, placeholder chart areas
- [ ] Build Loan Applications list page — sortable/filterable data table
- [ ] Build Loan Application detail page — read-only view of all loan fields
- [ ] Build ESG Score submission form — structured form matching the scoring model inputs
- [ ] Build Green Score result view — score gauge, sub-score breakdown (E / S / G), explainability panel
- [ ] Build Reports page — date-range filter, export button placeholder
- [ ] Implement role-based route guards (Loan Officer, Manager, Admin)

### Phase 3 · Polish
- [ ] Implement responsive design (mobile and tablet breakpoints)
- [ ] Add loading skeleton components for async data
- [ ] Add toast notification system for API success/error feedback
- [ ] Accessibility audit — ensure WCAG 2.1 AA compliance (keyboard nav, ARIA labels, contrast ratios)

---

## Semini & Rashmika — Database & Backend

### Phase 1 · Setup
- [ ] Design Entity-Relationship Diagram (ERD) covering: `customers`, `loans`, `esg_scores`, `users`, `roles`, `audit_logs`
- [ ] Set up Alembic for database migrations (`uv run alembic init`)
- [ ] Create baseline migration from the ERD
- [ ] Define SQLAlchemy async base model with `created_at`, `updated_at`, `id` (UUID)

### Phase 2 · Models & Endpoints
- [ ] Implement `User` model, Pydantic schema, registration + login endpoints
- [ ] Implement JWT auth — access token (30 min) + refresh token (7 days)
- [ ] Implement RBAC middleware — roles: `loan_officer`, `manager`, `admin`
- [ ] Implement `Customer` model, schema, and CRUD endpoints (`/api/v1/customers`)
- [ ] Implement `Loan` model, schema, and CRUD endpoints (`/api/v1/loans`)
- [ ] Implement `ESGScore` model and schema (write-only from scoring service, read from API)
- [ ] Implement `AuditLog` model — append-only, log all create/update/delete actions with user ID + timestamp
- [ ] Add input validation and sanitisation on all request bodies (use Pydantic strict mode)
- [ ] Write a database seed script for local development (`backend/scripts/seed.py`)

### Phase 3 · Quality
- [ ] Write integration tests for all endpoints using `pytest` + `httpx`
- [ ] Configure PostgreSQL connection pooling (pool size, overflow, timeout)
- [ ] Add OpenAPI `description`, `summary`, and `response` docs to all endpoints
- [ ] Add database index strategy (index foreign keys, `loan.status`, `esg_score.created_at`)

---

## Nipun — Algorithm & Scoring Model

### Phase 1 · Research & Specification
- [ ] Define the full list of ESG input metrics (minimum 5 per E, S, G pillar), citing CBSL Green Finance Taxonomy and GRI Standards
- [ ] Define the weightage model — how E, S, G sub-scores are combined into the final Green Score (0–100 range)
- [ ] Document the scoring algorithm specification as a single reference document: inputs, formula, output range, edge cases
- [ ] Identify and document potential bias vectors (e.g. industry type, company size) and mitigations

### Phase 2 · Implementation
- [ ] Implement `calculate_e_score(inputs)`, `calculate_s_score(inputs)`, `calculate_g_score(inputs)` as pure functions (no side effects, fully unit-testable)
- [ ] Implement `calculate_green_score(e, s, g, weights)` — final composite score function
- [ ] Create FastAPI scoring endpoint `POST /api/v1/scoring/calculate` that accepts ESG inputs and returns the full score breakdown
- [ ] Integrate SHAP values for score explainability — return per-metric contribution alongside the score
- [ ] Add score versioning — each calculation stores the `algorithm_version` used to produce it

### Phase 3 · Validation
- [ ] Write a bias detection test suite — assert score distribution is not skewed by non-ESG demographic factors
- [ ] Tune weights using sample/synthetic loan data and document the rationale
- [ ] Validate edge cases: all-zero inputs, maximum inputs, missing optional fields
- [ ] Prepare a plain-language summary of the algorithm for regulatory review (CBSL submission format)

---

## Dewmina — Testing, CI/CD, Monitoring & Deployment

### Phase 1 · Testing Framework Setup
- [ ] Configure `pytest` in `pyproject.toml` (testpaths, asyncio mode, coverage thresholds)
- [ ] Set up Vitest for frontend unit tests (`npm install -D vitest @testing-library/react`)
- [ ] Set up Playwright for end-to-end tests (`npm install -D @playwright/test`)
- [ ] Write initial backend smoke tests: health check, settings load, CORS headers
- [ ] Write initial frontend smoke test: app mounts, login route renders

### Phase 2 · CI/CD Pipeline
- [ ] Create GitHub Actions workflow — backend: `ruff` lint → `pytest` → build check (triggers on PR to `main`)
- [ ] Create GitHub Actions workflow — frontend: `eslint` → `vitest` → `vite build` (triggers on PR to `main`)
- [ ] Add `pre-commit` hooks: `ruff`, `black` for Python; `eslint --fix` for TypeScript
- [ ] Configure branch protection on `main`: require PR, passing CI, and at least 1 review before merge
- [ ] Set up Dependabot for automated dependency updates (Python + npm)
- [ ] Add `pip-audit` / `npm audit` step to CI to catch vulnerable dependencies

### Phase 3 · Monitoring & Deployment
- [ ] Add `prometheus-fastapi-instrumentator` to backend — expose `/metrics` endpoint
- [ ] Write `docker-compose.yml` covering: FastAPI, PostgreSQL, Prometheus, Grafana
- [ ] Configure Grafana dashboards: request rate, p95 latency, error rate, scoring throughput
- [ ] Set up structured logging with `structlog` — include correlation IDs on every request
- [ ] Write `Dockerfile` for the backend (multi-stage, non-root user, no secrets in image)
- [ ] Write `Dockerfile` for the frontend (nginx-based, production build)
- [ ] Write deployment runbook: environment setup, migration steps, rollback procedure
