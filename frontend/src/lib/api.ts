import {
  ImageGenerationRequest,
  ImageGenerationResponse,
  HealthCheckResponse,
  ImageListItem,
  ApiError,
} from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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
    return this.request<ImageGenerationResponse>('/api/v1/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getHealth(): Promise<HealthCheckResponse> {
    return this.request<HealthCheckResponse>('/api/v1/health');
  }

  async listImages(): Promise<ImageListItem[]> {
    const response = await this.request<{images: ImageListItem[]}>('/api/v1/images');
    return response.images || [];
  }

  getImageUrl(filename: string): string {
    return `${this.baseUrl}/api/v1/image/${filename}`;
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
