# Documentation / 文档

Welcome to the Stable Diffusion FastAPI Service documentation!

欢迎来到 Stable Diffusion FastAPI 服务文档！

## Quick Links / 快速链接

### English Documentation / 英文文档
- [README](README.md) - Project overview and quick start
- [Container Deployment Guide](CONTAINER.md) - Docker and Kubernetes deployment

### Chinese Documentation / 中文文档
- [README](README-zh.md) - 项目概述和快速开始
- [容器部署指南](CONTAINER-zh.md) - Docker 和 Kubernetes 部署

## Project Structure / 项目结构

```
docs/
├── index.md              # This file
├── README.md             # English documentation
├── README-zh.md          # Chinese documentation
├── CONTAINER.md          # English container guide
└── CONTAINER-zh.md       # Chinese container guide
```

## Features

- **Modern FastAPI Architecture** / **现代化 FastAPI 架构**
- **Stable Diffusion Integration** / **Stable Diffusion 集成**
- **Organized Project Structure** / **组织化项目结构**
- **Configuration Management** / **配置管理**
- **API Documentation** / **API 文档**
- **Input Validation** / **输入验证**
- **Image Management** / **图像管理**
- **Container Support** / **容器支持**

## Getting Started / 开始使用

1. **Clone the repository** / **克隆仓库**
2. **Install dependencies** / **安装依赖**: `uv sync`
3. **Start the server** / **启动服务器**: `uvicorn app.main:app --reload`
4. **Access the API** / **访问 API**: http://localhost:8000/docs

## Deployment Options / 部署选项

- **Local Development** / **本地开发**: Direct Python execution
- **Docker** / **Docker**: Containerized deployment
- **Kubernetes** / **Kubernetes**: Orchestrated deployment
- **Cloud Platforms** / **云平台**: AWS, GCP, Azure support

## Support / 支持

For questions and support, please refer to the documentation in your preferred language.

如有问题和支持需求，请参考您首选语言的文档。

---

**Language Switch / 语言切换**: English | 中文
