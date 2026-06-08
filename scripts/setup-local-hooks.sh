#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"
git config core.hooksPath .githooks

echo "Local Git hooks enabled from .githooks/."
echo "Pre-push will now run frontend and backend CI checks."
