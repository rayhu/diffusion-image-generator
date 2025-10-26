#!/usr/bin/env python3
"""
Build script wrapper for Stable Diffusion FastAPI container.
"""

import subprocess
import sys


def main():
    """Main function to build Docker image."""
    # Configuration
    image_name = "stable-diffusion-service-1"
    tag = "latest"
    registry = ""

    # Colors for output
    class Colors:
        RED = "\033[0;31m"
        GREEN = "\033[0;32m"
        YELLOW = "\033[1;33m"
        NC = "\033[0m"  # No Color

    print(f"{Colors.GREEN}Building Docker image: {image_name}:{tag}{Colors.NC}")

    try:
        # Build the image
        cmd = [
            "docker",
            "build",
            "-f",
            "Dockerfile",
            "-t",
            f"{registry}{image_name}:{tag}",
            ".",
        ]
        subprocess.run(cmd, check=True)

        print(f"{Colors.GREEN}Build completed successfully!{Colors.NC}")

        # Optional: Run tests
        print(f"{Colors.YELLOW}Running container tests...{Colors.NC}")
        test_cmd = [
            "docker",
            "run",
            "--rm",
            f"{registry}{image_name}:{tag}",
            "python",
            "-c",
            "import app; print('Import test passed')",
        ]
        subprocess.run(test_cmd, check=True)

        print(f"{Colors.GREEN}All tests passed!{Colors.NC}")

    except subprocess.CalledProcessError as e:
        print(f"{Colors.RED}Build failed with exit code {e.returncode}{Colors.NC}")
        sys.exit(e.returncode)
    except FileNotFoundError:
        print(f"{Colors.RED}Docker not found. Please install Docker first.{Colors.NC}")
        sys.exit(1)


if __name__ == "__main__":
    main()
