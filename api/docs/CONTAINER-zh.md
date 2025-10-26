# 容器部署指南

## Docker 部署 / Docker Deployment

### 快速开始 / Quick Start

```bash
# 构建镜像
docker build -f api/Dockerfile -t stable-diffusion-service-1 ./api

# 运行容器
docker run -p 8000:8000 --gpus all stable-diffusion-service-1

# 或使用 docker-compose
docker-compose up -d
```

### 构建选项 / Build Options

```bash
# 使用构建脚本
cd api
uv run build

# 手动构建自定义标签
docker build -f Dockerfile -t stable-diffusion-service-1:v1.0.0 .

# 为特定平台构建
docker build --platform linux/amd64 -t stable-diffusion-service-1 .
```

## Docker Compose / Docker Compose

### 开发环境 / Development Environment
```bash
docker-compose up -d
```

### 生产环境 / Production Environment
```bash
# 使用生产环境
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Kubernetes 部署 / Kubernetes Deployment

### 应用 Kubernetes 清单
```bash
kubectl apply -f deployment/k8s/k8s-deployment.yaml
```

### 检查部署状态
```bash
kubectl get pods
kubectl get services
```

## 健康检查 / Health Checks

容器包含全面的健康检查：

- **存活探针**: `/api/v1/live` - 容器正在运行
- **就绪探针**: `/api/v1/ready` - 服务已准备好接受流量
- **健康检查**: `/api/v1/health` - 详细的健康信息

## 环境变量 / Environment Variables

| 变量 | 默认值 | 描述 |
|------|--------|------|
| `DEBUG` | `false` | 调试模式 |
| `HOST` | `0.0.0.0` | 服务器主机 |
| `PORT` | `8000` | 服务器端口 |
| `MODEL_NAME` | `CompVis/stable-diffusion-v1-1` | 模型名称 |
| `TORCH_DTYPE` | `float16` | Torch 数据类型 |
| `DEVICE` | `cuda` | 设备 (cuda/cpu) |

## 资源要求 / Resource Requirements

### 最低要求 / Minimum Requirements
- **CPU**: 2 核心
- **内存**: 4GB RAM
- **GPU**: 支持 CUDA 的 NVIDIA GPU
- **存储**: 10GB 用于模型和图像

### 推荐配置 / Recommended Configuration
- **CPU**: 4+ 核心
- **内存**: 8GB+ RAM
- **GPU**: NVIDIA RTX 3080 或更好
- **存储**: 20GB+ SSD

## 安全考虑 / Security Considerations

1. **非 root 用户**: 容器以非特权用户运行
2. **资源限制**: 配置了 CPU 和内存限制
3. **健康检查**: 全面的监控
4. **网络安全**: 适当的端口暴露

## 监控 / Monitoring

### 日志 / Logs
```bash
# Docker 日志
docker logs <container_id>

# Kubernetes 日志
kubectl logs <pod_name>
```

### 指标 / Metrics
- 用于监控的健康检查端点
- 资源使用指标
- API 响应时间

## 故障排除 / Troubleshooting

### 常见问题 / Common Issues

1. **GPU 不可用**
   ```bash
   # 检查 NVIDIA Docker 运行时
   docker run --rm --gpus all nvidia/cuda:11.0-base nvidia-smi
   ```

2. **模型加载问题**
   ```bash
   # 检查容器日志
   docker logs <container_id>
   ```

3. **内存问题**
   ```bash
   # 在 docker-compose.yml 中增加内存限制
   deploy:
     resources:
       limits:
         memory: 16G
   ```

## 生产部署 / Production Deployment

### 最佳实践 / Best Practices

1. **使用特定的镜像标签**而不是 `latest`
2. **适当配置资源限制**
3. **设置监控和告警**
4. **使用密钥管理**处理敏感数据
5. **实施备份策略**用于持久化数据
6. **设置日志聚合**和分析
7. **配置自动扩缩容**基于负载
8. **使用 HTTPS**和适当的证书
9. **实施速率限制**用于 API 保护
10. **定期安全更新**和漏洞扫描

---

**语言切换 / Language Switch**: [English](CONTAINER.md) | 中文
