import {
  ImageGenerationRequest,
  ImageGenerationResponse,
  HealthCheckResponse,
  ImageListItem,
  ApiError,
} from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type ApiImageListItem = {
  filename?: string;
  path?: string;
  url?: string;
  created?: number;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async generateImage(
    request: ImageGenerationRequest
  ): Promise<ImageGenerationResponse> {
    const result = await this.request<ImageGenerationResponse>('/api/v1/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    });

    return {
      ...result,
      ...this.buildImageMeta(result.image_path),
    };
  }

  async getHealth(): Promise<HealthCheckResponse> {
    return this.request<HealthCheckResponse>('/api/v1/health');
  }

  async listImages(): Promise<ImageListItem[]> {
    const response = await this.request<{images: ApiImageListItem[]}>('/api/v1/images');
    if (!response.images) {
      return [];
    }

    const normalized = response.images
      .map((image) => {
        const filename = image.filename || this.extractFilename(image.path);
        if (!filename) {
          return null;
        }

        return {
          filename,
          url: image.url || this.getImageUrl(filename),
          created: image.created ?? 0,
        };
      })
      .filter((image): image is ImageListItem => image !== null)
      .sort((a, b) => b.created - a.created);

    return normalized;
  }

  getImageUrl(filename: string): string {
    return `${this.baseUrl}/api/v1/image/${filename}`;
  }

  private extractFilename(pathOrFilename?: string): string | null {
    if (!pathOrFilename) {
      return null;
    }

    const normalized = pathOrFilename.replace(/\\/g, '/').split('/').filter(Boolean);
    const filename = normalized.pop();
    return filename || null;
  }

  private buildImageMeta(imagePath?: string) {
    const filename = this.extractFilename(imagePath);
    if (!filename) {
      return {};
    }

    return {
      filename,
      image_url: this.getImageUrl(filename),
    };
  }
}

export const apiClient = new ApiClient();

// Convenience functions for easier imports
export const generateImage = (request: ImageGenerationRequest) => 
  apiClient.generateImage(request);

export const getImage = (filename: string) => 
  apiClient.getImageUrl(filename);

export const listImages = () => 
  apiClient.listImages();

export const healthCheck = () => 
  apiClient.getHealth();

export default apiClient;
