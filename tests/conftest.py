import os

import pytest


@pytest.fixture(autouse=True)
def setup_env():
    os.environ.setdefault("SECRET_KEY", "test-secret-key")
    os.environ.setdefault("DATABASE_URL", "postgresql://localhost/scope_test")
    os.environ.setdefault("SIGNUP_ALLOWLIST", "test@example.com")
