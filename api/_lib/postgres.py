import json
import os
from urllib.parse import parse_qs, urlparse

import psycopg


def is_postgres_configured() -> bool:
    return bool(os.getenv("POSTGRES_URL") or os.getenv("DATABASE_URL") or os.getenv("POSTGRES_URL_NON_POOLING"))


def _connection_string() -> str:
    # Prefer direct/non-pooling when available.
    return os.getenv("POSTGRES_URL_NON_POOLING") or os.getenv("POSTGRES_URL") or os.getenv("DATABASE_URL") or ""


def get_connection():
    conn_str = _connection_string()
    if not conn_str:
        raise RuntimeError("Postgres is not configured. Set POSTGRES_URL (Neon/Vercel integration).")
    return psycopg.connect(conn_str, connect_timeout=10)


def ensure_schema(conn) -> None:
    with conn.cursor() as cur:
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS user_profiles (
              user_id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              email TEXT,
              title TEXT,
              location TEXT,
              about TEXT,
              skills JSONB,
              created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
              updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
            """
        )


def json_response(handler, status: int, payload: dict):
    body = json.dumps(payload, default=str).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    handler.end_headers()
    handler.wfile.write(body)


def read_json_body(handler) -> dict:
    length_header = handler.headers.get("Content-Length")
    length = int(length_header) if length_header and length_header.isdigit() else 0

    if length > 0:
        raw = handler.rfile.read(length)
    else:
        # Some clients send chunked transfer encoding without Content-Length.
        # In Vercel's Python runtime this stream is bounded to the request body.
        raw = handler.rfile.read()

    if not raw:
        return {}
    try:
        return json.loads(raw.decode("utf-8"))
    except Exception:
        return {}


def get_query_param(path: str, name: str) -> str:
    parsed = urlparse(path)
    qs = parse_qs(parsed.query)
    return (qs.get(name) or [""])[0].strip()
