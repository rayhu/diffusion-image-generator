"""
Image generation service using Stable Diffusion.
"""

import random
import time

import torch
from diffusers import StableDiffusionPipeline

from app.core.config import settings


class ImageGenerationService:
    """Service for generating images using Stable Diffusion."""

    def __init__(self):
        """Initialize the service."""
        self.pipe: StableDiffusionPipeline | None = None
        self._model_loaded = False

    async def load_model(self) -> bool:
        """Load the Stable Diffusion model."""
        try:
            print(f"Loading model: {settings.model_name}")

            self.pipe = StableDiffusionPipeline.from_pretrained(
                settings.model_name,
                torch_dtype=getattr(torch, settings.torch_dtype),
                safety_checker=None,  # Disable safety checker for API
                requires_safety_checker=False,
            )

            if settings.device == "cuda" and torch.cuda.is_available():
                self.pipe = self.pipe.to("cuda")
                print("CUDA available, using GPU")
            else:
                self.pipe = self.pipe.to("cpu")
                print("CUDA not available, using CPU")

            self._model_loaded = True
            print("Model loaded successfully")
            return True

        except Exception as e:
            print(f"Error loading model: {e}")
            self._model_loaded = False
            return False

    async def generate_image(
        self,
        prompt: str,
        negative_prompt: str | None = None,
        num_inference_steps: int = 50,
        guidance_scale: float = 7.5,
        width: int = 512,
        height: int = 512,
        seed: int | None = None,
    ) -> tuple[bool, str, str | None, float, int | None]:
        """
        Generate an image based on the given parameters.

        Returns:
            Tuple of (success, message, image_path, generation_time, seed_used)
        """
        if not self._model_loaded:
            return False, "Model not loaded", None, 0.0, None

        try:
            start_time = time.time()

            # Set random seed if provided
            if seed is not None:
                torch.manual_seed(seed)
                generator = torch.Generator(device=settings.device)
                generator.manual_seed(seed)
            else:
                seed = random.randint(0, 2**32 - 1)
                torch.manual_seed(seed)
                generator = torch.Generator(device=settings.device)
                generator.manual_seed(seed)

            # Generate image
            result = self.pipe(
                prompt=prompt,
                negative_prompt=negative_prompt,
                num_inference_steps=num_inference_steps,
                guidance_scale=guidance_scale,
                width=width,
                height=height,
                generator=generator,
            )

            image = result.images[0]

            # Save image
            settings.images_dir.mkdir(exist_ok=True)
            timestamp = int(time.time())
            filename = f"generated_{timestamp}_{seed}.png"
            image_path = settings.images_dir / filename

            image.save(str(image_path))

            generation_time = time.time() - start_time

            return (
                True,
                "Image generated successfully",
                str(image_path),
                generation_time,
                seed,
            )

        except Exception as e:
            generation_time = time.time() - start_time
            return (
                False,
                f"Error generating image: {e!s}",
                None,
                generation_time,
                None,
            )

    @property
    def is_model_loaded(self) -> bool:
        """Check if the model is loaded."""
        return self._model_loaded


# Global service instance
image_service = ImageGenerationService()
