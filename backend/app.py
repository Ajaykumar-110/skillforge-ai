import os
import uuid

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import text

from db import ensure_schema, get_engine, is_mysql_configured


load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


def _get_engine_or_none():
    if not is_mysql_configured():
        return None
    return get_engine()


@app.get("/api/health")
def health():
    return jsonify(
        {
            "ok": True,
            "mysqlConfigured": is_mysql_configured(),
        }
    )


@app.get("/api/db/health")
def db_health():
    engine = _get_engine_or_none()
    if engine is None:
        return jsonify({"ok": False, "error": "MySQL not configured"}), 500

    ensure_schema(engine)

    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))

    return jsonify({"ok": True})


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

    engine = _get_engine_or_none()
    if engine is None:
        return jsonify({"error": "MySQL not configured"}), 500

    ensure_schema(engine)

    with engine.connect() as conn:
        result = conn.execute(
            text(
                """
                SELECT user_id, name, email, title, location, about, skills, created_at, updated_at
                FROM user_profiles
                WHERE user_id = :user_id
                LIMIT 1
                """
            ),
            {"user_id": user_id},
        ).mappings().first()

    return jsonify({"profile": dict(result) if result else None})


@app.post("/api/user/profile")
def upsert_profile():
    payload = request.get_json(silent=True) or {}
    user_id = str(payload.get("userId") or "").strip()
    name = str(payload.get("name") or "").strip()
    if not user_id or not name:
        return jsonify({"error": "userId and name are required"}), 400

    engine = _get_engine_or_none()
    if engine is None:
        return jsonify({"error": "MySQL not configured"}), 500

    ensure_schema(engine)

    email = (payload.get("email") or None)
    title = (payload.get("title") or None)
    location = (payload.get("location") or None)
    about = (payload.get("about") or None)
    skills = payload.get("skills")

    with engine.begin() as conn:
        conn.execute(
            text(
                """
                INSERT INTO user_profiles (user_id, name, email, title, location, about, skills)
                VALUES (:user_id, :name, :email, :title, :location, :about, :skills)
                ON DUPLICATE KEY UPDATE
                  name = VALUES(name),
                  email = VALUES(email),
                  title = VALUES(title),
                  location = VALUES(location),
                  about = VALUES(about),
                  skills = VALUES(skills),
                  updated_at = CURRENT_TIMESTAMP
                """
            ),
            {
                "user_id": user_id,
                "name": name,
                "email": email,
                "title": title,
                "location": location,
                "about": about,
                "skills": skills,
            },
        )

    return jsonify({"ok": True})


@app.put("/api/user/profile/update")
def update_profile():
    # Keep same payload contract as create; performs upsert.
    return upsert_profile()


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)

