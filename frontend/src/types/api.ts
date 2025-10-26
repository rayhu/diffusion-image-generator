export interface ImageGenerationRequest {
  prompt: string;
  negative_prompt?: string;
  num_inference_steps?: number;
  guidance_scale?: number;
  width?: number;
  height?: number;
  seed?: number;
}

export interface ImageGenerationResponse {
  success: boolean;
  message: string;
  image_path: string;
  generation_time: number;
  seed_used: number;
  image_url?: string;
  filename?: string;
}

export interface HealthCheckResponse {
  status: string;
  version: string;
  model_loaded: boolean;
}

export interface ImageListItem {
  filename: string;
  url: string;
  created: number;
}

export interface ApiError {
  detail: string;
}
