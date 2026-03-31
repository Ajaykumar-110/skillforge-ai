import os
from urllib.parse import urlparse

from sqlalchemy import create_engine, text


def _build_mysql_url() -> str | None:
    mysql_url = os.getenv("MYSQL_URL") or os.getenv("DATABASE_URL")
    if mysql_url:
        return mysql_url

    host = os.getenv("MYSQL_HOST")
    user = os.getenv("MYSQL_USER")
    password = os.getenv("MYSQL_PASSWORD")
    database = os.getenv("MYSQL_DATABASE")
    port = os.getenv("MYSQL_PORT") or "3306"

    if not (host and user and password and database):
        return None

    return f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}"


def is_mysql_configured() -> bool:
    return _build_mysql_url() is not None


def get_engine():
    url = _build_mysql_url()
    if not url:
        raise RuntimeError(
            "MySQL is not configured. Set MYSQL_URL (or DATABASE_URL), or MYSQL_HOST/MYSQL_USER/MYSQL_PASSWORD/MYSQL_DATABASE."
        )

    # Force SQLAlchemy driver for pymysql if user provided a plain mysql:// URL
    if url.startswith("mysql://"):
        parsed = urlparse(url)
        netloc = parsed.netloc
        path = parsed.path
        query = f"?{parsed.query}" if parsed.query else ""
        url = f"mysql+pymysql://{netloc}{path}{query}"

    return create_engine(url, pool_pre_ping=True, pool_recycle=280)


def ensure_schema(engine) -> None:
    with engine.begin() as conn:
        conn.execute(
            text(
                """
                CREATE TABLE IF NOT EXISTS user_profiles (
                  user_id VARCHAR(64) PRIMARY KEY,
                  name VARCHAR(255) NOT NULL,
                  email VARCHAR(255) NULL,
                  title VARCHAR(255) NULL,
                  location VARCHAR(255) NULL,
                  about TEXT NULL,
                  skills JSON NULL,
                  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
                """
            )
        )

