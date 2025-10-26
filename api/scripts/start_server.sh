#!/bin/bash
# Start script for the FastAPI application

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PROJECT_ROOT}"

# Ensure virtual environment exists
if [[ ! -d ".venv" ]]; then
  echo "Creating virtual environment at ${PROJECT_ROOT}/.venv"
  if command -v uv >/dev/null 2>&1; then
    uv venv .venv
  else
    python3 -m venv .venv
  fi
fi

# Activate virtual environment
source .venv/bin/activate

# Install dependencies if needed
uv sync

# Start the FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
