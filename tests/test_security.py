
from scope.web.security import (
    current_user_id,
    get_public_endpoints,
    mark_public_endpoint,
    public,
    require_auth,
)


def test_current_user_id_returns_none_without_session(app):
    """current_user_id returns None when session has no user_id."""
    with app.test_client() as client:
        with client.session_transaction() as sess:
            assert sess.get("user_id") is None

        # We need to test this in a request context.
        with app.test_request_context():
            assert current_user_id() is None


def test_current_user_id_returns_user_id_when_in_session(app):
    """current_user_id returns user_id from session."""
    with app.test_client() as client:
        with client.session_transaction() as sess:
            sess["user_id"] = "test-user-id"

        with app.test_request_context():
            # Manually set session for this test
            from flask import session
            session["user_id"] = "test-user-id"
            assert current_user_id() == "test-user-id"


def test_require_auth_redirects_anonymous_user(app):
    """require_auth decorator redirects anonymous users to /auth/signin."""
    @require_auth
    def protected_route():
        return "protected"

    with app.test_request_context():
        response = protected_route()
        assert response.status_code == 302
        assert "/auth/signin" in response.location


def test_require_auth_allows_authenticated_user(app):
    """require_auth decorator allows authenticated users."""
    @require_auth
    def protected_route():
        return "protected"

    with app.test_client() as client:
        with client.session_transaction() as sess:
            sess["user_id"] = "test-user-id"

        with app.test_request_context():
            from flask import session
            session["user_id"] = "test-user-id"
            assert protected_route() == "protected"


def test_public_decorator_marks_function(app):
    """public decorator marks function with _is_public flag."""
    @public
    def public_route():
        return "public"

    assert hasattr(public_route, "_is_public")
    assert public_route._is_public is True


def test_mark_public_endpoint_registers_endpoint(app):
    """mark_public_endpoint registers an endpoint as public."""
    mark_public_endpoint("test.endpoint")
    public_endpoints = get_public_endpoints()
    assert "test.endpoint" in public_endpoints


def test_public_endpoints_set_is_copy(app):
    """get_public_endpoints returns a copy, not the internal set."""
    endpoints = get_public_endpoints()
    endpoints_copy = get_public_endpoints()
    assert endpoints is not endpoints_copy
    assert endpoints == endpoints_copy
