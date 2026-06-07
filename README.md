# Green Scoring System — Commercial Bank of Sri Lanka
**Team ByteBuddies** | University of Moratuwa

A Green Scoring System that integrates Environmental, Social, and Governance (ESG) factors into the loan approval process of Commercial Bank of Sri Lanka, aligned with CBSL's Green Finance Taxonomy and GRI standards.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 + TypeScript |
| Backend | Python 3.12 + FastAPI + uv |
| Database | PostgreSQL (via SQLAlchemy + asyncpg) |
| Auth | JWT (python-jose) |
| Document Verification | AWS Textract or Azure Document Intelligence (cloud API) |
| Monitoring | Grafana + Prometheus (owned by Dewmina) |

---

## Team & Responsibilities

| Member | Area |
|---|---|
| **Vihanga** | UI — React components, pages, design system |
| **Semini, Rashmika** | Database schema, migrations (Alembic), backend API endpoints |
| **Nipun** | ESG scoring algorithm, mathematical model, ML integration |
| **Dewmina** | Testing framework, CI/CD pipeline, monitoring (Grafana + Prometheus), deployment |

See [TASKS.md](./TASKS.md) for the full breakdown of atomic tasks per member.

---

## Documentation

| Document | Description |
|---|---|
| [TASKS.md](./TASKS.md) | Atomic tasks per member across all phases |
| [docs/SCORING.md](./docs/SCORING.md) | AHP scoring methodology, comparison matrices, metric registry, verification pipeline |

---

## Prerequisites

| Tool | macOS / Linux | Windows (PowerShell) |
|---|---|---|
| [Node.js 20+](https://nodejs.org/) | via [nvm](https://github.com/nvm-sh/nvm) or package manager | via [nvm-windows](https://github.com/coreybutler/nvm-windows) or installer |
| [uv](https://docs.astral.sh/uv/getting-started/installation/) | `curl -LsSf https://astral.sh/uv/install.sh \| sh` | `powershell -c "irm https://astral.sh/uv/install.ps1 \| iex"` |
| [PostgreSQL 16+](https://www.postgresql.org/) | `brew install postgresql@16` | [Installer](https://www.postgresql.org/download/windows/) or Docker |

> **Windows users:** Git Bash, WSL2, or PowerShell 7+ all work. Commands below are shown for bash — PowerShell equivalents are noted where they differ.

---

## Getting Started

### 1. Clone & branch

```bash
git clone <repo-url>
cd Bytebuddies_Professional_Portfolio

# Always work on your own branch
git checkout -b <your-name>/<feature-name>
```

### 2. Backend

**macOS / Linux / WSL2**
```bash
cd backend
uv sync
cp .env.example .env   # then edit .env with your local values
uv run fastapi dev app/main.py
```

**Windows (PowerShell)**
```powershell
cd backend
uv sync
Copy-Item .env.example .env   # then edit .env with your local values
uv run fastapi dev app/main.py
```

> API: http://localhost:8000 · Swagger docs: http://localhost:8000/docs
>
> For production: `uv run fastapi run app/main.py`

### 3. Frontend

**macOS / Linux / WSL2 / Windows (PowerShell)**
```bash
cd frontend
npm install
npm run dev
```

> App: http://localhost:5173

### 4. Mandatory Local CI Policy Setup

All contributors must enable repository-managed Git hooks so the same quality gate used in CI runs before every push.

```bash
./scripts/setup-local-hooks.sh
```

```powershell
.\scripts\setup-local-hooks.ps1
```

What this enforces on `git push`:
- Frontend lint (`npm run lint`)
- Frontend build/type-check (`npm run build`)

If checks fail, push is blocked until fixed.

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env` before running the backend. **Never commit `.env`.**

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `SECRET_KEY` | JWT signing key — use a strong random value in dev |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins |
| `DOCUMENT_INTELLIGENCE_PROVIDER` | `aws_textract` or `azure_doc_intelligence` |
| `DOCUMENT_INTELLIGENCE_KEY` | API key for the document intelligence service |
| `DOCUMENT_INTELLIGENCE_ENDPOINT` | Required for Azure only — your resource endpoint URL |

---

## Branch & Contribution Convention

- Branch naming: `<your-name>/<short-description>` — e.g. `nipun/esg-scoring-algorithm`
- Commit style: [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `chore:`, `test:`, `docs:`
- Open a PR into `main` and request at least **one review** before merging
- Do **not** push directly to `main`

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy-frontend.yml   # CD — deploys frontend to Vercel on push to main
├── .githooks/
│   └── pre-push                  # Local pre-push gate: runs frontend CI checks
├── docs/
│   └── SCORING.md                # AHP scoring methodology, matrices, metric registry
├── backend/                      # FastAPI application (uv managed)
│   ├── app/
│   │   ├── api/v1/
│   │   │   ├── router.py
│   │   │   └── endpoints/        # One file per domain (health.py, …)
│   │   ├── core/                 # Settings, security, shared dependencies
│   │   │   └── config.py
│   │   └── main.py               # FastAPI app factory
│   ├── .env.example
│   └── pyproject.toml            # Dependencies (uv)
├── frontend/                     # React 19 + Vite 8 + TypeScript
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── scripts/
│   ├── setup-local-hooks.sh      # One-time local hook setup
│   ├── setup-local-hooks.ps1     # PowerShell hook setup (Windows)
│   ├── local-ci-frontend.sh      # Lint + build checks used by hook
│   └── local-ci-frontend.ps1     # PowerShell equivalent manual CI check
├── TASKS.md
└── README.md
```