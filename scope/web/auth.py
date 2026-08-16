
from flask import Blueprint, redirect, render_template, request, session, url_for

from scope.adapters.supabase_client import get_anon_client, get_service_client
from scope.config import Settings
from scope.web.security import public

auth_bp = Blueprint("auth", __name__, url_prefix="/auth", template_folder="templates")


@auth_bp.route("/signin", methods=["GET"])
@public
def signin():
    """Render sign-in page."""
    return render_template("auth/signin.html")


@auth_bp.route("/signin/google", methods=["POST"])
@public
def signin_google():
    """Initiate Google OAuth flow."""
    client = get_anon_client()
    callback_url = url_for("auth.callback", _external=True)
    response = client.auth.sign_in_with_oauth(
        {
            "provider": "google",
            "options": {"redirect_to": callback_url},
        }
    )
    # Redirect to the OAuth provider.
    return redirect(response.session.provider_token)


@auth_bp.route("/callback", methods=["GET"])
@public
def callback():
    """Exchange OAuth code for session."""
    code = request.args.get("code")
    if not code:
        return redirect(url_for("auth.signin"))

    try:
        client = get_anon_client()
        auth_response = client.auth.exchange_code_for_session(code)
        user_id = auth_response.user.id
        access_token = auth_response.session.access_token
        refresh_token = auth_response.session.refresh_token
        user_email = auth_response.user.email or ""

        # Check allowlist.
        settings = Settings()
        allowlist = settings.get_allowlist()
        if allowlist and user_email not in allowlist:
            # Sign out the user and show friendly rejection.
            client.auth.sign_out()
            return render_template(
                "auth/signin.html",
                error_message="Your email is not yet on the invite list. Check back soon!",
            )

        # Store session.
        session["user_id"] = user_id
        session["access_token"] = access_token
        session["refresh_token"] = refresh_token

        # Check if this is first sign-in (no profile row yet).
        service_client = get_service_client()
        profile = service_client.table("profiles").select("*").eq("id", user_id).single().execute()
        if profile.data is None:
            # First sign-in: go to welcome.
            return redirect(url_for("setup.welcome"))
        else:
            # Returning user: go to today.
            return redirect(url_for("today"))

    except Exception as e:
        # Log the error (redact sensitive details).
        print(f"OAuth callback error: {type(e).__name__}")
        return render_template(
            "auth/signin.html",
            error_message="Sign-in failed. Please try again.",
        )


@auth_bp.route("/signout", methods=["GET"])
def signout():
    """Sign out user and clear session."""
    session.clear()
    return redirect(url_for("auth.signin"))
