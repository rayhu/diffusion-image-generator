# Configuration

This folder contains configuration files for the project.

## Files

### .python-version
Specifies the Python version for the project (managed by pyenv).

**Content:**
```
3.12
```

## Usage

These configuration files are automatically used by various tools:

- **pyenv**: Uses `.python-version` for Python version management
- **uv**: Uses `pyproject.toml` in project root for dependency management

## Adding New Configurations

When adding new configuration files:

1. Place them in this `config/` folder
2. Update this README with descriptions
3. Document usage in main project documentation
4. Consider if they should be version controlled or ignored
