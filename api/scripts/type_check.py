#!/usr/bin/env python3
"""
Type checking script for the API.
"""

import subprocess
import sys


def main():
    """Run type checking with MyPy."""
    print("Running type checks with MyPy...")

    try:
        # Run mypy
        subprocess.run(["mypy", "app", "scripts"], check=True)
        print("✅ Type checking passed!")

    except subprocess.CalledProcessError as e:
        print(f"❌ Type checking failed with exit code {e.returncode}")
        sys.exit(e.returncode)
    except FileNotFoundError:
        print("❌ MyPy not found. Please install development dependencies:")
        print("   uv sync --extra dev")
        sys.exit(1)


if __name__ == "__main__":
    main()
