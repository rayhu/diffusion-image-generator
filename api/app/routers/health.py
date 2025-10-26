"""
Health check router for container monitoring.
"""

from fastapi import APIRouter

from app.core.config import settings
from app.models.schemas import HealthResponse
from app.services.image_generation import image_service

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint for container monitoring."""
    return HealthResponse(
        status="healthy",
        version=settings.app_version,
        model_loaded=image_service.is_model_loaded,
    )


@router.get("/ready")
async def readiness_check():
    """Readiness check endpoint for Kubernetes."""
    if not image_service.is_model_loaded:
        return {"status": "not_ready", "reason": "model_not_loaded"}

    return {"status": "ready"}


@router.get("/live")
async def liveness_check():
    """Liveness check endpoint for Kubernetes."""
    return {"status": "alive"}
