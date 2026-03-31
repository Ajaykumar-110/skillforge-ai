from http.server import BaseHTTPRequestHandler

from api._lib.postgres import is_postgres_configured, json_response


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        json_response(self, 200, {"ok": True})

    def do_GET(self):
        json_response(
            self,
            200,
            {
                "ok": True,
                "postgresConfigured": is_postgres_configured(),
            },
        )
