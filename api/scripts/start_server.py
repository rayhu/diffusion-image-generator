#!/usr/bin/env python3
"""
Start server script wrapper for FastAPI application.
"""

import subprocess
import sys
from pathlib import Path


def main():
    """Main function to start the FastAPI server."""
    try:
        # Check if virtual environment exists
        venv_path = Path(".venv")
        if not venv_path.exists():
            print("Virtual environment not found. Please run 'uv sync' first.")
            sys.exit(1)

        # Install dependencies if needed
        print("Installing dependencies...")
        subprocess.run(["uv", "sync"], check=True)

        # Start the FastAPI server
        print("Starting FastAPI server...")
        cmd = [
            "uvicorn",
            "app.main:app",
            "--host",
            "0.0.0.0",
            "--port",
            "8000",
            "--reload",
            "--reload-exclude",
            "generated-images/*",
            "--reload-exclude",
            "*.png",
            "--reload-exclude",
            "*.jpg",
            "--reload-exclude",
            "*.jpeg",
        ]
        subprocess.run(cmd, check=True)

    except subprocess.CalledProcessError as e:
        print(f"Server failed to start with exit code {e.returncode}")
        sys.exit(e.returncode)
    except FileNotFoundError as e:
        print(f"Command not found: {e.filename}. Please install required dependencies.")
        sys.exit(1)


if __name__ == "__main__":
    main()
