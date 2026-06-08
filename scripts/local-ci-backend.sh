#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"

if [[ ! -f "$BACKEND_DIR/pyproject.toml" ]]; then
  echo "Error: backend/pyproject.toml not found."
  exit 1
fi

echo "Running backend CI checks (pytest)..."

if command -v uv >/dev/null 2>&1; then
  cd "$BACKEND_DIR"
  uv run pytest
elif [[ -x "$BACKEND_DIR/.venv/bin/python" ]]; then
  cd "$BACKEND_DIR"
  .venv/bin/python -m pytest
else
  echo "Error: backend test runner is not available."
  echo "Install dependencies with one of:"
  echo "  - cd backend && uv sync --dev"
  echo "  - cd backend && python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt pytest pytest-asyncio"
  exit 1
fi

echo "Backend CI checks passed."