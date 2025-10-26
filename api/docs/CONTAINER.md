# Container Deployment Guide

## Docker Deployment

### Quick Start

```bash
# From project root
docker-compose up -d

# Or build and run manually
docker build -f api/Dockerfile -t stable-diffusion-service-1 ./api
docker run -p 8000:8000 --gpus all stable-diffusion-service-1
```

### Build Options

```bash
# Using the build script
cd api
uv run build

# Manual build with custom tag
docker build -f Dockerfile -t stable-diffusion-service-1:v1.0.0 .

# Build for specific platform
docker build --platform linux/amd64 -t stable-diffusion-service-1 .
```

## Docker Compose

### Development Environment
```bash
docker-compose up -d
```

### Production Environment
```bash
# Use production environment
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Kubernetes Deployment

### Apply Kubernetes manifests
```bash
kubectl apply -f deployment/k8s/k8s-deployment.yaml
```

### Check deployment status
```bash
kubectl get pods
kubectl get services
```

## Health Checks

The container includes comprehensive health checks:

- **Liveness Probe**: `/api/v1/live` - Container is running
- **Readiness Probe**: `/api/v1/ready` - Service is ready to accept traffic
- **Health Check**: `/api/v1/health` - Detailed health information

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DEBUG` | `false` | Debug mode |
| `HOST` | `0.0.0.0` | Server host |
| `PORT` | `8000` | Server port |
| `MODEL_NAME` | `CompVis/stable-diffusion-v1-1` | Model name |
| `TORCH_DTYPE` | `float16` | Torch data type |
| `DEVICE` | `cuda` | Device (cuda/cpu) |

## Resource Requirements

### Minimum Requirements
- **CPU**: 2 cores
- **Memory**: 4GB RAM
- **GPU**: NVIDIA GPU with CUDA support
- **Storage**: 10GB for models and images

### Recommended Configuration
- **CPU**: 4+ cores
- **Memory**: 8GB+ RAM
- **GPU**: NVIDIA RTX 3080 or better
- **Storage**: 20GB+ SSD

## Security Considerations

1. **Non-root User**: Container runs as non-root user
2. **Resource Limits**: CPU and memory limits configured
3. **Health Checks**: Comprehensive monitoring
4. **Network Security**: Proper port exposure

## Monitoring

### Logs
```bash
# Docker logs
docker logs <container_id>

# Kubernetes logs
kubectl logs <pod_name>
```

### Metrics
- Health check endpoints for monitoring
- Resource usage metrics
- API response times

## Troubleshooting

### Common Issues

1. **GPU Not Available**
   ```bash
   # Check NVIDIA Docker runtime
   docker run --rm --gpus all nvidia/cuda:11.0-base nvidia-smi
   ```

2. **Model Loading Issues**
   ```bash
   # Check container logs
   docker logs <container_id>
   ```

3. **Memory Issues**
   ```bash
   # Increase memory limits in docker-compose.yml
   deploy:
     resources:
       limits:
         memory: 16G
   ```

## Production Deployment

### Best Practices

1. **Use specific image tags** instead of `latest`
2. **Configure resource limits** appropriately
3. **Set up monitoring** and alerting
4. **Use secrets management** for sensitive data
5. **Implement backup strategies** for persistent data
6. **Set up log aggregation** and analysis
7. **Configure auto-scaling** based on load
8. **Use HTTPS** with proper certificates
9. **Implement rate limiting** for API protection
10. **Regular security updates** and vulnerability scanning

---

**Language Switch**: English | [中文](CONTAINER-zh.md)
