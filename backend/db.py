import os

import psycopg


def _postgres_url() -> str | None:
    return os.getenv("POSTGRES_URL_NON_POOLING") or os.getenv("POSTGRES_URL") or os.getenv("DATABASE_URL")


def is_postgres_configured() -> bool:
    return _postgres_url() is not None


def get_conn():
    url = _postgres_url()
    if not url:
        raise RuntimeError("Postgres is not configured. Set POSTGRES_URL (Neon) environment variables.")
    return psycopg.connect(url, connect_timeout=10)


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
    conn.commit()

