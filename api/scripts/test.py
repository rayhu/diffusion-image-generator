#!/usr/bin/env python3
"""
Test runner script for the API.
"""

import subprocess
import sys


def main():
    """Run tests with pytest."""
    print("Running tests with pytest...")

    try:
        # Run pytest
        subprocess.run(["pytest", "tests/", "-v", "--cov=app"], check=True)
        print("✅ All tests passed!")

    except subprocess.CalledProcessError as e:
        print(f"❌ Tests failed with exit code {e.returncode}")
        sys.exit(e.returncode)
    except FileNotFoundError:
        print("❌ pytest not found. Please install development dependencies:")
        print("   uv sync --extra dev")
        sys.exit(1)


if __name__ == "__main__":
    main()
