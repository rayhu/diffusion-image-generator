# Stable Diffusion FastAPI 服务

一个现代化的 FastAPI 服务，用于 Stable Diffusion 图像生成，具有适当的项目结构和最佳实践。

## 功能特性 / Features

- **现代化 FastAPI 架构**: 清洁、可扩展的 API 结构
- **Stable Diffusion 集成**: 从文本提示生成图像
- **组织化项目结构**: 适当的关注点分离
- **配置管理**: 基于环境的设置
- **API 文档**: 自动 OpenAPI/Swagger 文档
- **输入验证**: Pydantic 模型用于请求/响应验证
- **图像管理**: 保存和检索生成的图像

## 项目结构 / Project Structure

```
app/
├── __init__.py
├── main.py                 # FastAPI 应用程序入口点
├── core/
│   ├── __init__.py
│   └── config.py          # 应用程序配置
├── models/
│   ├── __init__.py
│   └── schemas.py         # Pydantic 模型
├── routers/
│   ├── __init__.py
│   ├── images.py          # API 路由
│   └── health.py          # 健康检查路由
└── services/
    ├── __init__.py
    └── image_generation.py # 业务逻辑
```

## 快速开始 / Quick Start

### 1. 安装依赖 / Install Dependencies
```bash
uv sync
```

### 2. 启动服务器 / Start the Server
```bash
# 方法 1: 直接使用 uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# 方法 2: 使用 Python 脚本
python app/main.py
```

### 3. 访问 API / Access the API
- **API 文档**: http://localhost:8000/docs
- **健康检查**: http://localhost:8000/api/v1/health
- **根端点**: http://localhost:8000/

## API 端点 / API Endpoints

### 生成图像 / Generate Image
```bash
POST /api/v1/generate
```

**请求体 / Request Body:**
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

**响应 / Response:**
```json
{
  "success": true,
  "message": "Image generated successfully",
  "image_path": "/path/to/generated_image.png",
  "generation_time": 15.2,
  "seed_used": 42
}
```

### 获取图像 / Get Image
```bash
GET /api/v1/image/{filename}
```

### 列出图像 / List Images
```bash
GET /api/v1/images
```

## 配置 / Configuration

应用程序使用环境变量进行配置。创建一个 `.env` 文件：

```bash
DEBUG=true
HOST=0.0.0.0
PORT=8000
MODEL_NAME=CompVis/stable-diffusion-v1-1
TORCH_DTYPE=float16
DEVICE=cuda
```

## 开发 / Development

### 项目结构优势 / Project Structure Benefits

1. **关注点分离**: 每个模块都有特定的职责
2. **可扩展性**: 易于添加新功能和端点
3. **可测试性**: 服务可以轻松进行单元测试
4. **可维护性**: 清晰的代码组织和文档
5. **现代 Python**: 使用最新的 Python 3.12+ 功能

### 实现的最佳实践 / Best Practices Implemented

- ✅ **类型提示**: 完整的类型注解支持
- ✅ **Pydantic 模型**: 请求/响应验证
- ✅ **异步/等待**: 非阻塞操作
- ✅ **错误处理**: 适当的 HTTP 状态码
- ✅ **配置管理**: 基于环境的设置
- ✅ **依赖注入**: 清洁的服务架构
- ✅ **API 文档**: 自动 OpenAPI 生成
- ✅ **CORS 支持**: 跨域资源共享
- ✅ **日志记录**: 结构化日志用于调试

## 要求 / Requirements

- Python 3.12+
- CUDA 兼容 GPU（推荐）
- 8GB+ RAM
- 10GB+ 磁盘空间用于模型

## 容器化部署 / Container Deployment

### Docker 部署 / Docker Deployment
```bash
# 构建镜像
docker build -f deployment/docker/Dockerfile -t stable-diffusion-service-1 .

# 运行容器
docker run -p 8000:8000 --gpus all stable-diffusion-service-1

# 或使用 docker-compose
docker-compose up -d
```

### Kubernetes 部署 / Kubernetes Deployment
```bash
kubectl apply -f deployment/k8s/k8s-deployment.yaml
```

更多容器化部署信息，请查看 [容器部署指南](docs/zh/CONTAINER.md)。

## 许可证 / License

本项目采用 Apache License 2.0 许可证。

---

**语言切换 / Language Switch**: [English](README.md) | 中文
