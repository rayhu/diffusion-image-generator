"""
API routes for image generation.
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.core.config import settings
from app.models.schemas import (
    HealthResponse,
    ImageGenerationRequest,
    ImageGenerationResponse,
)
from app.services.image_generation import image_service

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        version=settings.app_version,
        model_loaded=image_service.is_model_loaded,
    )


@router.post("/generate", response_model=ImageGenerationResponse)
async def generate_image(request: ImageGenerationRequest):
    """Generate an image based on the given prompt."""

    if not image_service.is_model_loaded:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please wait for the service to initialize.",
        )

    (
        success,
        message,
        image_path,
        generation_time,
        seed_used,
    ) = await image_service.generate_image(
        prompt=request.prompt,
        negative_prompt=request.negative_prompt,
        num_inference_steps=request.num_inference_steps,
        guidance_scale=request.guidance_scale,
        width=request.width,
        height=request.height,
        seed=request.seed,
    )

    if not success:
        raise HTTPException(status_code=500, detail=message)

    return ImageGenerationResponse(
        success=success,
        message=message,
        image_path=image_path,
        generation_time=generation_time,
        seed_used=seed_used,
    )


@router.get("/image/{filename}")
async def get_image(filename: str):
    """Retrieve a generated image by filename."""
    image_path = settings.images_dir / filename

    if not image_path.exists():
        raise HTTPException(status_code=404, detail="Image not found")

    return FileResponse(path=str(image_path), media_type="image/png", filename=filename)


@router.get("/images")
async def list_images():
    """List all generated images."""
    if not settings.images_dir.exists():
        return {"images": []}

    images = []
    for image_file in settings.images_dir.glob("*.png"):
        images.append(
            {
                "filename": image_file.name,
                "path": str(image_file),
                "size": image_file.stat().st_size,
                "created": image_file.stat().st_ctime,
            }
        )

    return {"images": images}
