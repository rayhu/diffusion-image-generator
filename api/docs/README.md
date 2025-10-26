# Stable Diffusion FastAPI Service

A modern FastAPI service for Stable Diffusion image generation with proper project structure and best practices.

## Features

- **Modern FastAPI Architecture**: Clean, scalable API structure
- **Stable Diffusion Integration**: Generate images from text prompts
- **Organized Project Structure**: Proper separation of concerns
- **Configuration Management**: Environment-based settings
- **API Documentation**: Automatic OpenAPI/Swagger docs
- **Input Validation**: Pydantic models for request/response validation
- **Image Management**: Save and retrieve generated images

## Project Structure

```
app/
├── __init__.py
├── main.py                 # FastAPI application entry point
├── core/
│   ├── __init__.py
│   └── config.py          # Application configuration
├── models/
│   ├── __init__.py
│   └── schemas.py         # Pydantic models
├── routers/
│   ├── __init__.py
│   ├── images.py          # API routes
│   └── health.py          # Health check routes
└── services/
    ├── __init__.py
    └── image_generation.py # Business logic
```

## Quick Start

### 1. Install Dependencies
```bash
uv sync
```

### 2. Start the Server
```bash
# Method 1: Using uvicorn directly
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Method 2: Using Python script
python app/main.py
```

### 3. Access the API
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/api/v1/health
- **Root Endpoint**: http://localhost:8000/

## API Endpoints

### Generate Image
```bash
POST /api/v1/generate
```

**Request Body:**
```json
{
  "prompt": "a photo of an astronaut riding a horse on mars",
  "negative_prompt": "blurry, low quality",
  "num_inference_steps": 50,
  "guidance_scale": 7.5,
  "width": 512,
  "height": 512,
  "seed": 42
}
```

**Response:**
```json
{
  "success": true,
  "message": "Image generated successfully",
  "image_path": "/path/to/generated_image.png",
  "generation_time": 15.2,
  "seed_used": 42
}
```

### Get Image
```bash
GET /api/v1/image/{filename}
```

### List Images
```bash
GET /api/v1/images
```

## Configuration

The application uses environment variables for configuration. Create a `.env` file:

```bash
DEBUG=true
HOST=0.0.0.0
PORT=8000
MODEL_NAME=CompVis/stable-diffusion-v1-1
TORCH_DTYPE=float16
DEVICE=cuda
```

## Development

### Project Structure Benefits

1. **Separation of Concerns**: Each module has a specific responsibility
2. **Scalability**: Easy to add new features and endpoints
3. **Testability**: Services can be easily unit tested
4. **Maintainability**: Clear code organization and documentation
5. **Modern Python**: Uses latest Python 3.12+ features

### Best Practices Implemented

- ✅ **Type Hints**: Full type annotation support
- ✅ **Pydantic Models**: Request/response validation
- ✅ **Async/Await**: Non-blocking operations
- ✅ **Error Handling**: Proper HTTP status codes
- ✅ **Configuration Management**: Environment-based settings
- ✅ **Dependency Injection**: Clean service architecture
- ✅ **API Documentation**: Automatic OpenAPI generation
- ✅ **CORS Support**: Cross-origin resource sharing
- ✅ **Logging**: Structured logging for debugging

## Container Deployment

### Docker Deployment
```bash
# Build the image
docker build -f deployment/docker/Dockerfile -t stable-diffusion-service-1 .

# Run the container
docker run -p 8000:8000 --gpus all stable-diffusion-service-1

# Or use docker-compose
docker-compose up -d
```

### Kubernetes Deployment
```bash
kubectl apply -f deployment/k8s/k8s-deployment.yaml
```

For detailed containerization information, see [Container Deployment Guide](CONTAINER.md).

## Requirements

- Python 3.12+
- CUDA-compatible GPU (recommended)
- 8GB+ RAM
- 10GB+ disk space for models

## License

This project is licensed under the Apache License 2.0.

---

**Language Switch**: English | [中文](README-zh.md)
