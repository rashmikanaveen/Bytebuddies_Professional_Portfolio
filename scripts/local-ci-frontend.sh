#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"

if [[ ! -f "$FRONTEND_DIR/package.json" ]]; then
  echo "Error: frontend/package.json not found."
  exit 1
fi

if [[ ! -d "$FRONTEND_DIR/node_modules" ]]; then
  echo "Error: frontend dependencies are missing. Run: cd frontend && npm install"
  exit 1
fi

echo "Running frontend CI checks (lint + build)..."
cd "$FRONTEND_DIR"
npm run ci:check

echo "Frontend CI checks passed."
