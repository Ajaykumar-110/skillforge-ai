from http.server import BaseHTTPRequestHandler

from api._lib.postgres import ensure_schema, get_connection, is_postgres_configured, json_response


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        json_response(self, 200, {"ok": True})

    def do_GET(self):
        if not is_postgres_configured():
            return json_response(self, 500, {"ok": False, "error": "Postgres not configured"})

        try:
            conn = get_connection()
            try:
                ensure_schema(conn)
                with conn.cursor() as cur:
                    cur.execute("SELECT 1 AS ok")
                    row = cur.fetchone()
                return json_response(self, 200, {"ok": True, "row": row})
            finally:
                conn.close()
        except Exception as exc:
            return json_response(self, 500, {"ok": False, "error": str(exc)})
