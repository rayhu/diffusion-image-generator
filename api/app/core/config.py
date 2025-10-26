"""
Core configuration for the FastAPI application.
"""

from pathlib import Path

from pydantic_settings import BaseSettings


_CURRENT_FILE = Path(__file__).resolve()
API_ROOT = _CURRENT_FILE.parents[2]
_candidate_repo_root = API_ROOT.parent
REPO_ROOT = (
    _candidate_repo_root
    if (_candidate_repo_root / "api").exists() and (_candidate_repo_root / "frontend").exists()
    else API_ROOT
)
ENV_FILE_PATH = API_ROOT / ".env"


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
    repo_root: Path = REPO_ROOT
    api_root: Path = API_ROOT
    images_dir: Path = API_ROOT / "generated-images"

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
        env_file = str(ENV_FILE_PATH)
        case_sensitive = False


# Global settings instance
settings = Settings()
