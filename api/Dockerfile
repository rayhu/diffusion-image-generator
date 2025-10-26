# Multi-stage Dockerfile for FastAPI Stable Diffusion Service
FROM python:3.12-slim as base

# Default application configuration (override via build args or `docker run -e`)
ARG APP_DEBUG=false
ARG APP_HOST=0.0.0.0
ARG APP_PORT=8000
ARG APP_MODEL=CompVis/stable-diffusion-v1-1
ARG APP_TORCH_DTYPE=float16
ARG APP_DEVICE=cuda

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    DEBUG=${APP_DEBUG} \
    HOST=${APP_HOST} \
    PORT=${APP_PORT} \
    MODEL_NAME=${APP_MODEL} \
    TORCH_DTYPE=${APP_TORCH_DTYPE} \
    DEVICE=${APP_DEVICE}

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install uv
RUN pip install uv

# Set work directory
WORKDIR /app

    # Copy dependency files
    COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen --no-dev

# Copy application code
COPY app/ ./app/

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/api/v1/health || exit 1

# Run the application (falls back to defaults if env vars unset)
CMD ["sh", "-c", "uv run uvicorn app.main:app --host ${HOST:-0.0.0.0} --port ${PORT:-8000}"]
