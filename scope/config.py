from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str
    DATABASE_URL: str
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_KEY: str
    SIGNUP_ALLOWLIST: str

    RESEND_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    GOOGLE_OAUTH_CLIENT_ID: str = ""
    GOOGLE_OAUTH_CLIENT_SECRET: str = ""

    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    def get_allowlist(self) -> frozenset[str]:
        """Parse SIGNUP_ALLOWLIST as comma-separated emails."""
        if not self.SIGNUP_ALLOWLIST:
            return frozenset()
        return frozenset(e.strip() for e in self.SIGNUP_ALLOWLIST.split(",") if e.strip())
