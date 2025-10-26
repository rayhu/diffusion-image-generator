#!/usr/bin/env python3
"""
Linting script for the API.
"""

import subprocess
import sys


def main():
    """Run linting checks."""
    print("Running Ruff linter...")

    try:
        # Run ruff check
        subprocess.run(["ruff", "check", "app", "scripts"], check=True)
        print("✅ Ruff check passed")

        # Run ruff format check
        subprocess.run(["ruff", "format", "--check", "app", "scripts"], check=True)
        print("✅ Ruff format check passed")

        print("🎉 All linting checks passed!")

    except subprocess.CalledProcessError as e:
        print(f"❌ Linting failed with exit code {e.returncode}")
        sys.exit(e.returncode)
    except FileNotFoundError:
        print("❌ Ruff not found. Please install development dependencies:")
        print("   uv sync --extra dev")
        sys.exit(1)


if __name__ == "__main__":
    main()
