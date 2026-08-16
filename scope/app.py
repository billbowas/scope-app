from flask import Flask, redirect, render_template, session, url_for

from scope.adapters.supabase_client import get_anon_client
from scope.config import Settings
from scope.web.auth import auth_bp
from scope.web.healthz import healthz_bp
from scope.web.security import get_public_endpoints, mark_public_endpoint
from scope.web.setup import setup_bp


def create_app():
    app = Flask(__name__, template_folder="web/templates")
    settings = Settings()
    app.config["SETTINGS"] = settings
    app.config["SECRET_KEY"] = settings.SECRET_KEY

    app.register_blueprint(healthz_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(setup_bp)

    # Mark public endpoints.
    mark_public_endpoint("auth.signin")
    mark_public_endpoint("auth.signin_google")
    mark_public_endpoint("auth.callback")
    mark_public_endpoint("auth.signout")
    mark_public_endpoint("healthz.healthz")

    @app.route("/today")
    def today():
        user_id = session.get("user_id")
        if not user_id:
            return redirect(url_for("auth.signin"))

        client = get_anon_client()
        profile = client.table("profiles").select("*").eq("id", user_id).single().execute()
        display_name = profile.data.get("display_name") if profile.data else ""

        return render_template("dashboard/today.html", display_name=display_name)

    @app.before_request
    def check_auth():
        """Default-deny: redirect unmarked routes to /auth/signin if not authenticated."""
        from flask import request
        if request.endpoint is None:
            return None

        public = get_public_endpoints()
        # Always allow static files and public endpoints.
        if request.endpoint.startswith("static") or request.endpoint in public:
            return None

        # Check if user is authenticated.
        if not session.get("user_id"):
            return redirect(url_for("auth.signin"))

    return app
