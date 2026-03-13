## Python + FastAPI Profile

### Conventions

- **Naming**: snake_case for functions/variables/modules, PascalCase for classes, SCREAMING_SNAKE_CASE for constants
- **Imports**: stdlib → third-party → local. Use absolute imports.
- **Types**: Type hints on all function signatures. Use Pydantic models for data validation.
- **Async**: `async def` for all endpoint handlers. Use `asyncio` for concurrent I/O.
- **Error handling**: Custom exception classes + FastAPI exception handlers. Never bare `except:`.
- **Docstrings**: Google style for public functions.

### Commands

- **Run**: `uvicorn app.main:app --reload`
- **Test**: `pytest`
- **Lint**: `ruff check .`
- **Format**: `ruff format .`
- **Type check**: `mypy .`

### Project Structure

```
app/
  main.py         # FastAPI app instance
  models/         # Pydantic models + SQLAlchemy models
  routes/         # API route handlers
  services/       # Business logic
  deps.py         # Dependency injection
  config.py       # Settings (pydantic-settings)
tests/
  conftest.py     # Fixtures
  test_*.py       # Test files
```

### Dependencies

- Runtime: Python 3.11+
- Framework: FastAPI + Uvicorn
- ORM: SQLAlchemy 2.0 (async) or Prisma
- Validation: Pydantic v2
- Test: pytest + pytest-asyncio + httpx
- Lint: Ruff

### Security

- Use Pydantic for all request body validation
- Use `python-jose` for JWT, `passlib` for password hashing
- Use `pip audit` regularly
- Environment variables via `pydantic-settings`
