# Scripts

This folder contains utility scripts for building, running, and managing the application.

## Available Scripts

### build.sh
Builds the Docker image for the application.

```bash
./scripts/build.sh
```

**Features:**
- Automatic image building
- Custom tag support
- Container testing
- Optional registry push

### run_server.py
Python script to start the FastAPI server.

```bash
python scripts/run_server.py
```

### start_server.sh
Shell script to start the server with virtual environment activation.

```bash
./scripts/start_server.sh
```

## Usage

### Using uv (Recommended)

All scripts can be run using `uv run` from the project root directory:

```bash
# Build Docker image
uv run build

# Start development server
uv run start-server
```

### Direct execution

Scripts can also be run directly:

```bash
# Build Docker image
./scripts/build.sh
python scripts/build.py

# Start development server
python scripts/run_server.py
./scripts/start_server.sh
```

## Customization

Scripts can be customized by modifying the variables at the top of each file.
