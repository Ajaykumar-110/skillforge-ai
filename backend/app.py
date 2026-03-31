import os
import uuid

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from db import ensure_schema, get_conn, is_postgres_configured


load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


def _get_conn_or_none():
    if not is_postgres_configured():
        return None
    return get_conn()


@app.get("/api/health")
def health():
    return jsonify(
        {
            "ok": True,
            "postgresConfigured": is_postgres_configured(),
        }
    )


@app.get("/api/db/health")
def db_health():
    conn = _get_conn_or_none()
    if conn is None:
        return jsonify({"ok": False, "error": "Postgres not configured"}), 500

    try:
        ensure_schema(conn)
        with conn.cursor() as cur:
            cur.execute("SELECT 1")
            cur.fetchone()
        return jsonify({"ok": True})
    finally:
        conn.close()


@app.post("/api/user/token")
def issue_token():
    token = str(uuid.uuid4())
    user = {"id": token, "name": "Guest"}
    return jsonify({"token": token, "user": user})


@app.get("/api/user/profile")
def get_profile():
    user_id = (request.args.get("userId") or "").strip()
    if not user_id:
        return jsonify({"error": "userId is required"}), 400

    conn = _get_conn_or_none()
    if conn is None:
        return jsonify({"error": "Postgres not configured"}), 500

    try:
        ensure_schema(conn)
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT user_id, name, email, title, location, about, skills, created_at, updated_at
                FROM user_profiles
                WHERE user_id = %s
                LIMIT 1
                """,
                (user_id,),
            )
            row = cur.fetchone()
        if not row:
            return jsonify({"profile": None})
        keys = ["user_id", "name", "email", "title", "location", "about", "skills", "created_at", "updated_at"]
        return jsonify({"profile": dict(zip(keys, row))})
    finally:
        conn.close()


@app.post("/api/user/profile")
def upsert_profile():
    payload = request.get_json(silent=True) or {}
    user_id = str(payload.get("userId") or "").strip()
    name = str(payload.get("name") or "").strip()
    if not user_id or not name:
        return jsonify({"error": "userId and name are required"}), 400

    conn = _get_conn_or_none()
    if conn is None:
        return jsonify({"error": "Postgres not configured"}), 500

    email = (payload.get("email") or None)
    title = (payload.get("title") or None)
    location = (payload.get("location") or None)
    about = (payload.get("about") or None)
    skills = payload.get("skills")

    try:
        ensure_schema(conn)
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO user_profiles (user_id, name, email, title, location, about, skills)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (user_id) DO UPDATE SET
                  name = EXCLUDED.name,
                  email = EXCLUDED.email,
                  title = EXCLUDED.title,
                  location = EXCLUDED.location,
                  about = EXCLUDED.about,
                  skills = EXCLUDED.skills,
                  updated_at = NOW()
                """,
                (user_id, name, email, title, location, about, psycopg.types.json.Json(skills) if skills is not None else None),
            )
        conn.commit()
    finally:
        conn.close()

    return jsonify({"ok": True})


@app.put("/api/user/profile/update")
def update_profile():
    # Keep same payload contract as create; performs upsert.
    return upsert_profile()


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)

