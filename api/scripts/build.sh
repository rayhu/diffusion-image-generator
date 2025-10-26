#!/bin/bash
# Build script for Stable Diffusion FastAPI container

set -e

# Configuration
IMAGE_NAME="stable-diffusion-service-1"
TAG="latest"
REGISTRY=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building Docker image: ${IMAGE_NAME}:${TAG}${NC}"

# Build the image
docker build -f deployment/docker/Dockerfile -t ${REGISTRY}${IMAGE_NAME}:${TAG} .

echo -e "${GREEN}Build completed successfully!${NC}"

# Optional: Run tests
echo -e "${YELLOW}Running container tests...${NC}"
docker run --rm ${REGISTRY}${IMAGE_NAME}:${TAG} python -c "import app; print('Import test passed')"

echo -e "${GREEN}All tests passed!${NC}"

# Optional: Push to registry (uncomment if needed)
# echo -e "${YELLOW}Pushing to registry...${NC}"
# docker push ${REGISTRY}${IMAGE_NAME}:${TAG}
# echo -e "${GREEN}Push completed!${NC}"
