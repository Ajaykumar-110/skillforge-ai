from http.server import BaseHTTPRequestHandler
from api._lib.postgres import (
    ensure_schema,
    get_connection,
    get_query_param,
    is_postgres_configured,
    json_response,
    read_json_body,
)
from psycopg.types.json import Json
from psycopg.rows import dict_row


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        json_response(self, 200, {"ok": True})

    def do_GET(self):
        user_id = get_query_param(self.path, "userId")
        if not user_id:
            return json_response(self, 400, {"error": "userId is required"})

        if not is_postgres_configured():
            return json_response(self, 500, {"error": "Postgres not configured"})

        try:
            conn = get_connection()
            try:
                ensure_schema(conn)
                with conn.cursor(row_factory=dict_row) as cur:
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
                return json_response(self, 200, {"profile": row})
            finally:
                conn.close()
        except Exception as exc:
            return json_response(self, 500, {"error": str(exc)})

    def do_POST(self):
        self._upsert()

    def do_PUT(self):
        self._upsert()

    def _upsert(self):
        if not is_postgres_configured():
            return json_response(self, 500, {"error": "Postgres not configured"})

        body = read_json_body(self)
        user_id = str(body.get("userId") or "").strip()
        name = str(body.get("name") or "").strip()

        if not user_id or not name:
            return json_response(self, 400, {"error": "userId and name are required"})

        email = (str(body.get("email")).strip() if body.get("email") is not None else None) or None
        title = (str(body.get("title")).strip() if body.get("title") is not None else None) or None
        location = (str(body.get("location")).strip() if body.get("location") is not None else None) or None
        about = (str(body.get("about")).strip() if body.get("about") is not None else None) or None
        skills = body.get("skills")
        skills_value = Json(skills) if skills is not None else None

        try:
            conn = get_connection()
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
                        (user_id, name, email, title, location, about, skills_value),
                    )
                conn.commit()
                return json_response(self, 200, {"ok": True})
            finally:
                conn.close()
        except Exception as exc:
            return json_response(self, 500, {"error": str(exc)})
