# Stable Diffusion FastAPI Service - Monorepo

A modern monorepo containing both the Stable Diffusion FastAPI backend and frontend application with proper project structure and best practices.

## Features

- **Modern FastAPI Architecture**: Clean, scalable API structure
- **Stable Diffusion Integration**: Generate images from text prompts
- **Organized Project Structure**: Proper separation of concerns
- **Configuration Management**: Environment-based settings
- **API Documentation**: Automatic OpenAPI/Swagger docs
- **Input Validation**: Pydantic models for request/response validation
- **Image Management**: Save and retrieve generated images

## Monorepo Structure

```
diffusion-ray-1/
├── api/                        # Python FastAPI Backend
│   ├── app/                   # FastAPI application
│   │   ├── main.py            # Application entry point
│   │   ├── core/              # Core configuration
│   │   ├── models/            # Pydantic models
│   │   ├── routers/           # API routes
│   │   └── services/          # Business logic
│   ├── deployment/            # Deployment configurations
│   │   └── k8s/               # Kubernetes manifests
│   ├── scripts/               # Utility scripts
│   ├── docs/                  # API documentation
│   ├── config/                # Configuration files
│   ├── Dockerfile             # API Docker image
│   ├── nginx.conf             # Nginx configuration
│   ├── pyproject.toml         # Python dependencies
│   └── uv.lock                # uv lock file
├── frontend/                   # Frontend Application
│   ├── Dockerfile             # Frontend Docker image
│   ├── package.json           # Node.js dependencies
│   └── README.md              # Frontend documentation
├── images/                     # Generated images (gitignored)
├── notebook/                   # Jupyter notebooks
├── docker-compose.yml          # Full-stack orchestration
├── .dockerignore               # Monorepo Docker ignores
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## Quick Start

### 1. Install Dependencies

**Backend (API):**
```bash
cd api
uv sync
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Start the Services

**Option A: Full Stack with Docker Compose (Recommended)**
```bash
# From project root
docker-compose up -d
```

**Option B: Development Mode**
```bash
# Terminal 1: Start API
cd api
uv sync --extra dev  # Install dev dependencies for linting
uv run start-server

# Terminal 2: Start Frontend
cd frontend
npm install
npm run dev
```

### 3. Code Quality

**API (Python):**
```bash
cd api
uv run lint          # Run linting
uv run format         # Format code
uv run type-check     # Type checking
uv run test          # Run tests
```

**Frontend (TypeScript):**
```bash
cd frontend
npm run lint         # Run linting
npm run lint:fix     # Fix linting issues
npm run format       # Format code
npm run type-check   # Type checking
npm run check-all    # Run all checks
```

**Pre-commit hooks:**
```bash
# Install pre-commit hooks (run once)
pre-commit install

# Run hooks manually
pre-commit run --all-files
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

- **Type Hints**: Full type annotation support
- **Pydantic Models**: Request/response validation
- **Async/Await**: Non-blocking operations
- **Error Handling**: Proper HTTP status codes
- **Configuration Management**: Environment-based settings
- **Dependency Injection**: Clean service architecture
- **API Documentation**: Automatic OpenAPI generation
- **CORS Support**: Cross-origin resource sharing
- **Logging**: Structured logging for debugging

## Container Deployment

### Full Stack Deployment
```bash
# From project root - starts API, Frontend, and Nginx
docker-compose up -d
```

### API Only Deployment
```bash
# Build API image
cd api
uv run build

# Or use docker-compose for API only
docker-compose up api -d
```

### Kubernetes Deployment
```bash
# Deploy API to Kubernetes
kubectl apply -f api/deployment/k8s/k8s-deployment.yaml
```

For detailed containerization information, see [Container Deployment Guide](api/docs/CONTAINER.md).

## Requirements

- Python 3.12+
- CUDA-compatible GPU (recommended)
- 8GB+ RAM
- 10GB+ disk space for models

## License

This project is licensed under the Apache License 2.0.

---

**Language Switch**: English | [中文](docs/README-zh.md)