# SkillForge AI Flask Backend (Optional)

This folder contains an optional Python Flask backend (Postgres-backed) that matches the frontend’s expected endpoints.

## Run locally

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
set POSTGRES_URL=postgres://USER:PASSWORD@HOST:5432/DATABASE
python app.py
```

Health:
- `GET http://127.0.0.1:5000/api/health`
- `GET http://127.0.0.1:5000/api/db/health`

## Deploy

Deploy this backend to a service that can run long-lived Python web servers (Railway/Render/Fly.io/etc.).

### Render (recommended)

1. Create a new Render service from this repo.
2. Render will detect `render.yaml` at repo root and set up `skillforge-ai-backend`.
3. Set the env var `POSTGRES_URL` to your Neon (or any Postgres) connection string.

### Railway

1. Create a new Railway project → Deploy from GitHub repo.
2. Set env var `POSTGRES_URL`.
3. Start command is already in `Procfile`.

### Point the frontend to this backend

In Vercel (frontend project), set:

- Frontend (Vercel) env: `VITE_API_BASE_URL=https://<your-backend-domain>`

