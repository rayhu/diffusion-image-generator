# syntax=docker/dockerfile:1.7

# Multi-stage Dockerfile for FastAPI Stable Diffusion Service
FROM python:3.12-slim AS builder

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    VIRTUAL_ENV=/opt/venv \
    PATH=/opt/venv/bin:$PATH

# Install build dependencies
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    apt-get update && apt-get install -y --no-install-recommends \
      build-essential \
      git \
      curl \
      && rm -rf /var/lib/apt/lists/*

# Create dedicated virtual environment and install uv inside it
RUN python -m venv /opt/venv && pip install --no-cache-dir uv

WORKDIR /app

# Copy dependency files first for better layer caching
COPY pyproject.toml uv.lock ./

# Install project dependencies into /opt/venv
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev

# Copy application source
COPY app/ ./app/

# Pre-compile python files (optional, helps with cold start)
RUN --mount=type=cache,target=/root/.cache/uv \
    uv run python -m compileall app


FROM python:3.12-slim AS runtime

# Default application configuration (override via build args or `docker run -e`)
ARG APP_DEBUG=false
ARG APP_HOST=0.0.0.0
ARG APP_PORT=8000
ARG APP_MODEL=CompVis/stable-diffusion-v1-1
ARG APP_TORCH_DTYPE=float16
ARG APP_DEVICE=cuda

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PATH=/opt/venv/bin:$PATH \
    HF_HOME=/app/models/hf-cache \
    DEBUG=${APP_DEBUG} \
    HOST=${APP_HOST} \
    PORT=${APP_PORT} \
    MODEL_NAME=${APP_MODEL} \
    TORCH_DTYPE=${APP_TORCH_DTYPE} \
    DEVICE=${APP_DEVICE}

# Install only runtime dependencies
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    apt-get update && apt-get install -y --no-install-recommends \
      curl \
      git \
      && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy virtual environment and application code from builder stage
COPY --from=builder /opt/venv /opt/venv
COPY --from=builder /app /app

# Create directories that will often be mounted as volumes
RUN mkdir -p /app/generated-images "$HF_HOME"

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser && \
    chown -R appuser:appuser /app /opt/venv
USER appuser

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/api/v1/health || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
