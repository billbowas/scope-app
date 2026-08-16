from functools import wraps

from flask import redirect, session, url_for

# Mark routes exempt from default-deny guard.
_public_endpoints = set()


def current_user_id() -> str | None:
    """Get current user's UUID from session, or None if not authenticated."""
    return session.get("user_id")


def require_auth(f):
    """Decorator: redirect to /auth/signin if not authenticated."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user_id():
            return redirect(url_for("auth.signin"))
        return f(*args, **kwargs)
    return decorated_function


def public(f):
    """Mark route as exempt from default-deny guard. Use after blueprint registration."""
    f._is_public = True
    return f


def get_public_endpoints() -> set[str]:
    """Return the set of endpoint names exempt from default-deny."""
    return _public_endpoints.copy()


def mark_public_endpoint(endpoint_name: str) -> None:
    """Register an endpoint as public. Called after blueprint registration."""
    _public_endpoints.add(endpoint_name)
