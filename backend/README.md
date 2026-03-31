# SkillForge AI Flask Backend

This folder contains an optional Python Flask backend (MySQL-backed) that matches the frontend’s expected endpoints.

## Run locally

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
set MYSQL_URL=mysql://USER:PASSWORD@HOST:3306/DATABASE
python app.py
```

Health:
- `GET http://127.0.0.1:5000/api/health`
- `GET http://127.0.0.1:5000/api/db/health`

## Deploy

Deploy this backend to a service that can run long-lived Python web servers (Railway/Render/Fly.io/etc.), then set:

- Frontend (Vercel) env: `VITE_API_BASE_URL=https://<your-backend-domain>`

