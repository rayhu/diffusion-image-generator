#!/usr/bin/env python3
"""
Code formatting script for the API.
"""

import subprocess
import sys


def main():
    """Format code using Ruff."""
    print("Formatting code with Ruff...")

    try:
        # Run ruff format
        subprocess.run(["ruff", "format", "app", "scripts"], check=True)
        print("✅ Code formatted successfully!")

    except subprocess.CalledProcessError as e:
        print(f"❌ Formatting failed with exit code {e.returncode}")
        sys.exit(e.returncode)
    except FileNotFoundError:
        print("❌ Ruff not found. Please install development dependencies:")
        print("   uv sync --extra dev")
        sys.exit(1)


if __name__ == "__main__":
    main()
