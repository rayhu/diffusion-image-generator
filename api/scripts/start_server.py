#!/usr/bin/env python3
"""
Start server script wrapper for FastAPI application.
"""

import os
import shutil
import subprocess
import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent
VENV_PATH = PROJECT_ROOT / ".venv"
VENV_BIN = VENV_PATH / "bin"


def ensure_venv():
    """Ensure the local virtual environment exists."""
    if VENV_PATH.exists():
        return

    print(f"Creating virtual environment at {VENV_PATH}")
    if shutil.which("uv"):
        subprocess.run(["uv", "venv", str(VENV_PATH)], check=True)
    else:
        subprocess.run([sys.executable, "-m", "venv", str(VENV_PATH)], check=True)


def with_venv_env():
    """Return env vars patched to include the virtual environment."""
    env = os.environ.copy()
    env["VIRTUAL_ENV"] = str(VENV_PATH)
    existing_path = env.get("PATH", "")
    env["PATH"] = f"{VENV_BIN}{os.pathsep}{existing_path}"
    return env


def main():
    """Main function to start the FastAPI server."""
    try:
        os.chdir(PROJECT_ROOT)

        ensure_venv()

        # Install dependencies if needed
        print("Installing dependencies...")
        subprocess.run(["uv", "sync"], check=True, env=with_venv_env())

        # Start the FastAPI server
        print("Starting FastAPI server...")
        cmd = [
            str(VENV_BIN / "uvicorn"),
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
        subprocess.run(cmd, check=True, env=with_venv_env())

    except subprocess.CalledProcessError as e:
        print(f"Server failed to start with exit code {e.returncode}")
        sys.exit(e.returncode)
    except FileNotFoundError as e:
        print(f"Command not found: {e.filename}. Please install required dependencies.")
        sys.exit(1)


if __name__ == "__main__":
    main()
