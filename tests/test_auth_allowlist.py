from unittest.mock import MagicMock, patch


@patch("scope.web.auth.Settings")
@patch("scope.web.auth.get_anon_client")
@patch("scope.web.auth.get_service_client")
def test_allowlist_accepts_valid_email(mock_service_client, mock_anon_client, mock_settings, app):
    """OAuth callback accepts allowlisted email."""
    # Mock Supabase response for exchange_code_for_session.
    mock_user = MagicMock()
    mock_user.id = "user-123"
    mock_user.email = "allowlisted@example.com"

    mock_session = MagicMock()
    mock_session.access_token = "access-token"
    mock_session.refresh_token = "refresh-token"

    mock_auth_response = MagicMock()
    mock_auth_response.user = mock_user
    mock_auth_response.session = mock_session

    mock_client = MagicMock()
    mock_client.auth.exchange_code_for_session.return_value = mock_auth_response

    # Mock profile check.
    mock_profile_response = MagicMock()
    mock_profile_response.data = {"id": "user-123", "display_name": "Test"}
    table = mock_client.table.return_value
    select = table.select.return_value
    eq = select.eq.return_value
    single = eq.single.return_value
    single.execute.return_value = mock_profile_response

    mock_anon_client.return_value = mock_client
    mock_service_client.return_value = mock_client

    # Mock Settings instance and its get_allowlist method.
    mock_settings_instance = MagicMock()
    mock_settings_instance.get_allowlist.return_value = frozenset(["allowlisted@example.com"])
    mock_settings.return_value = mock_settings_instance

    with app.test_client() as client:
        response = client.get("/auth/callback?code=test-code")

        # Should redirect to /today (since profile exists).
        assert response.status_code == 302
        assert "/today" in response.location

        # Check session was set.
        with client.session_transaction() as sess:
            assert sess.get("user_id") == "user-123"


@patch("scope.web.auth.Settings")
@patch("scope.web.auth.get_anon_client")
@patch("scope.web.auth.get_service_client")
def test_allowlist_rejects_invalid_email(mock_service_client, mock_anon_client, mock_settings, app):
    """OAuth callback rejects non-allowlisted email."""
    # Mock Supabase response for exchange_code_for_session.
    mock_user = MagicMock()
    mock_user.id = "user-123"
    mock_user.email = "notallowed@example.com"

    mock_session = MagicMock()
    mock_session.access_token = "access-token"
    mock_session.refresh_token = "refresh-token"

    mock_auth_response = MagicMock()
    mock_auth_response.user = mock_user
    mock_auth_response.session = mock_session

    mock_client = MagicMock()
    mock_client.auth.exchange_code_for_session.return_value = mock_auth_response
    mock_client.auth.sign_out.return_value = None

    mock_anon_client.return_value = mock_client

    # Mock Settings instance with allowlist that doesn't include the user's email.
    mock_settings_instance = MagicMock()
    mock_settings_instance.get_allowlist.return_value = frozenset(["allowlisted@example.com"])
    mock_settings.return_value = mock_settings_instance

    with app.test_client() as client:
        response = client.get("/auth/callback?code=test-code", follow_redirects=True)

        # Should render signin page with error.
        assert b"not yet on the invite list" in response.data

        # Session should NOT be set.
        with client.session_transaction() as sess:
            assert sess.get("user_id") is None
