"""
FastAPI application for Stable Diffusion image generation.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import (
    API_ROOT,
    ENV_FILE_PATH,
    REPO_ROOT,
    settings,
)
from app.routers import health, images
from app.services.image_generation import image_service


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    """Application lifespan manager."""
    # Startup
    logger.info("Starting %s v%s", settings.app_name, settings.app_version)
    logger.info("Repository root: %s", REPO_ROOT)
    logger.info("API root: %s", API_ROOT)
    logger.info(
        "Environment file: %s (exists=%s)",
        ENV_FILE_PATH,
        ENV_FILE_PATH.exists(),
    )
    logger.info("Images directory: %s", settings.images_dir)
    logger.info("Loading Stable Diffusion model...")

    # Load the model in background
    await image_service.load_model()

    yield

    # Shutdown
    logger.info("Shutting down application...")


# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="A modern FastAPI service for Stable Diffusion image generation",
    lifespan=lifespan,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api/v1", tags=["health"])
app.include_router(images.router, prefix="/api/v1", tags=["images"])


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": f"Welcome to {settings.app_name}",
        "version": settings.app_version,
        "docs": "/docs",
        "health": "/api/v1/health",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app", host=settings.host, port=settings.port, reload=settings.debug
    )
