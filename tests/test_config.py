from scope.config import Settings


def test_config_loads_from_env():
    settings = Settings()
    assert settings.SECRET_KEY
    assert settings.DATABASE_URL
    assert settings.SIGNUP_ALLOWLIST
