"""
Realtor Inbox demo app
======================

See README.md for installation and usage examples.
"""


import argparse
import os

from flask import Flask
from flask_cors import CORS
from flask_smorest import Api

from ma_frontend_demo import views


app = Flask(__name__)
CORS(app, expose_headers=r'*')
app.config["API_TITLE"] = "MA-Frontend-Demo"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.2"
app.config["OPENAPI_JSON_PATH"] = "api-spec.json"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

api = Api(app)
views.init(api)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Simple realtor messages API")
    parser.add_argument(
        "-p",
        "--port",
        type=int,
        default=os.getenv("PORT", "8080"),
        help="TCP Port to listen to.",
    )
    args = parser.parse_args()

    app.run(debug=True, host="0.0.0.0", port=args.port, threaded=True)
