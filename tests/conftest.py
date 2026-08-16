import os

import pytest

from scope.app import create_app


@pytest.fixture(autouse=True)
def setup_env():
    os.environ.setdefault("SECRET_KEY", "test-secret-key")
    os.environ.setdefault("DATABASE_URL", "postgresql://localhost/scope_test")
    os.environ.setdefault("SUPABASE_URL", "https://test.supabase.co")
    os.environ.setdefault("SUPABASE_ANON_KEY", "test-anon-key")
    os.environ.setdefault("SUPABASE_SERVICE_KEY", "test-service-key")
    os.environ.setdefault("SIGNUP_ALLOWLIST", "test@example.com")


@pytest.fixture
def app():
    """Create a test Flask app."""
    app = create_app()
    app.config["TESTING"] = True
    yield app
