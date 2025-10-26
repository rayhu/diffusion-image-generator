"""
Pydantic models for API request/response validation.
"""

from pydantic import BaseModel, Field, validator


class ImageGenerationRequest(BaseModel):
    """Request model for image generation."""

    prompt: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="Text prompt for image generation",
    )
    negative_prompt: str | None = Field(
        None, max_length=500, description="Negative prompt to avoid certain elements"
    )
    num_inference_steps: int = Field(
        50, ge=1, le=100, description="Number of denoising steps"
    )
    guidance_scale: float = Field(
        7.5, ge=1.0, le=20.0, description="Guidance scale for prompt adherence"
    )
    width: int = Field(512, ge=256, le=1024, description="Image width")
    height: int = Field(512, ge=256, le=1024, description="Image height")
    seed: int | None = Field(
        None, ge=0, le=2**32 - 1, description="Random seed for reproducible generation"
    )

    @validator("width", "height")
    def validate_dimensions(cls, v):
        """Ensure dimensions are multiples of 8."""
        if v % 8 != 0:
            raise ValueError("Width and height must be multiples of 8")
        return v


class ImageGenerationResponse(BaseModel):
    """Response model for image generation."""

    success: bool = Field(description="Whether the generation was successful")
    message: str = Field(description="Status message")
    image_path: str | None = Field(None, description="Path to generated image")
    generation_time: float | None = Field(
        None, description="Generation time in seconds"
    )
    seed_used: int | None = Field(None, description="Seed used for generation")


class HealthResponse(BaseModel):
    """Health check response model."""

    status: str = Field(description="Service status")
    version: str = Field(description="API version")
    model_loaded: bool = Field(description="Whether the diffusion model is loaded")
