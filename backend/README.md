# Backend Setup

## Environment Variables

Sensitive values are loaded from environment variables via pydantic settings.

1. Copy [backend/.env.example](backend/.env.example) to `backend/.env`.
2. Set real values for `DATABASE_URL` and `SECRET_KEY`.
3. Keep `backend/.env` out of source control.

In CI, configure `DATABASE_URL` and `SECRET_KEY` as repository or environment secrets.

### GitHub Actions Secret Names

- `BACKEND_DATABASE_URL`
- `BACKEND_SECRET_KEY`
