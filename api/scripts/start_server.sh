#!/bin/bash
# Start script for the FastAPI application

# Activate virtual environment
source .venv/bin/activate

# Install dependencies if needed
uv sync

# Start the FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
