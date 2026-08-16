from flask import Flask

from scope.config import Settings
from scope.web.healthz import healthz_bp


def create_app():
    app = Flask(__name__)
    settings = Settings()
    app.config["SETTINGS"] = settings
    app.register_blueprint(healthz_bp)
    return app
