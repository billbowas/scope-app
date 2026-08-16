from scope.config import Settings


def test_config_loads_from_env():
    settings = Settings()
    assert settings.SECRET_KEY
    assert settings.DATABASE_URL
    assert settings.SUPABASE_URL
    assert settings.SUPABASE_ANON_KEY
    assert settings.SUPABASE_SERVICE_KEY
    assert settings.SIGNUP_ALLOWLIST


def test_allowlist_parsing_single_email():
    """get_allowlist parses single email."""
    settings = Settings(_env_file=None, SIGNUP_ALLOWLIST="test@example.com")
    allowlist = settings.get_allowlist()
    assert allowlist == frozenset(["test@example.com"])


def test_allowlist_parsing_multiple_emails():
    """get_allowlist parses comma-separated emails."""
    settings = Settings(
        _env_file=None,
        SIGNUP_ALLOWLIST="test1@example.com, test2@example.com, test3@example.com",
    )
    allowlist = settings.get_allowlist()
    assert allowlist == frozenset(["test1@example.com", "test2@example.com", "test3@example.com"])


def test_allowlist_parsing_empty_string():
    """get_allowlist returns empty frozenset for empty string."""
    settings = Settings(_env_file=None, SIGNUP_ALLOWLIST="")
    allowlist = settings.get_allowlist()
    assert allowlist == frozenset()


def test_allowlist_parsing_whitespace():
    """get_allowlist strips whitespace."""
    signup_list = "  test@example.com  ,  other@example.com  "
    settings = Settings(_env_file=None, SIGNUP_ALLOWLIST=signup_list)
    allowlist = settings.get_allowlist()
    assert allowlist == frozenset(["test@example.com", "other@example.com"])
