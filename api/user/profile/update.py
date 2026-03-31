from http.server import BaseHTTPRequestHandler

from api._lib.postgres import json_response

from api.user.profile import handler as ProfileHandler


class handler(ProfileHandler):
    # This route matches legacy frontend calls to `/api/user/profile/update`.
    def do_GET(self):
        return json_response(self, 405, {"error": "Method not allowed"})
