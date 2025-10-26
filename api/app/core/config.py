"""
Core configuration for the FastAPI application.
"""

from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""

    # Application
    app_name: str = "Stable Diffusion API"
    app_version: str = "0.1.0"
    debug: bool = False

    # Server
    host: str = "0.0.0.0"
    port: int = 8000

    # Paths
    repo_root: Path = Path(__file__).parent.parent.parent
    images_dir: Path = repo_root / "generated-images"

    # Model settings
    model_name: str = "CompVis/stable-diffusion-v1-1"
    torch_dtype: str = "float16"
    device: str = "cuda"

    # API settings
    max_image_size: int = 1024
    max_prompt_length: int = 500
    default_steps: int = 50
    default_guidance_scale: float = 7.5

    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()
