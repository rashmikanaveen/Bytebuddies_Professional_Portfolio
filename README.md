# Green Scoring System — Commercial Bank of Sri Lanka
**Team ByteBuddies** | University of Moratuwa

A Green Scoring System that integrates Environmental, Social, and Governance (ESG) factors into the loan approval process of Commercial Bank of Sri Lanka, aligned with CBSL's Green Finance Taxonomy and GRI standards.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript + Vite, Deno 2 |
| Backend | Python 3.12 + FastAPI + uv |
| Database | PostgreSQL (via SQLAlchemy + asyncpg) |
| Auth | JWT (python-jose) |
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

## Prerequisites

| Tool | macOS / Linux | Windows (PowerShell) |
|---|---|---|
| [Deno 2](https://deno.land/) | `curl -fsSL https://deno.land/install.sh \| sh` | `irm https://deno.land/install.ps1 \| iex` |
| [uv](https://docs.astral.sh/uv/getting-started/installation/) | `curl -LsSf https://astral.sh/uv/install.sh \| sh` | `powershell -c "irm https://astral.sh/uv/install.ps1 \| iex"` |
| [Node.js 20+](https://nodejs.org/) | via [nvm](https://github.com/nvm-sh/nvm) or package manager | via [nvm-windows](https://github.com/coreybutler/nvm-windows) or installer |
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
uv run python main.py
```

**Windows (PowerShell)**
```powershell
cd backend
uv sync
Copy-Item .env.example .env   # then edit .env with your local values
uv run python main.py
```

> API: http://localhost:8000 · Swagger docs: http://localhost:8000/api/v1/docs

### 3. Frontend

**macOS / Linux / WSL2 / Windows (PowerShell)**
```bash
cd frontend
npm install
npm run dev
```

> App: http://localhost:5173

> **Deno users:** `deno task dev` / `deno task build` work from the `frontend/` directory.

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env` before running the backend. **Never commit `.env`.**

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `SECRET_KEY` | JWT signing key — use a strong random value in dev |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins |

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
├── backend/                  # FastAPI application (uv managed)
│   ├── app/
│   │   ├── api/v1/           # API routes (add new endpoints here)
│   │   │   └── endpoints/    # One file per domain (loans.py, scoring.py, …)
│   │   ├── core/             # Settings, security, shared dependencies
│   │   └── main.py           # FastAPI app factory
│   ├── main.py               # Uvicorn entry point
│   └── pyproject.toml        # Dependencies
└── frontend/                 # React + Vite + TypeScript
    ├── src/
    │   ├── App.tsx
    │   └── main.tsx
    ├── deno.json             # Deno 2 task runner config
    └── package.json
```