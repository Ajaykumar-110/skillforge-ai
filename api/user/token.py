import uuid
from http.server import BaseHTTPRequestHandler

from api._lib.postgres import json_response


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        json_response(self, 200, {"ok": True})

    def do_POST(self):
        token = str(uuid.uuid4())
        json_response(self, 200, {"token": token, "user": {"id": token, "name": "Guest"}})
