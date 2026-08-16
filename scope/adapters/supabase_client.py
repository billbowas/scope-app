from supabase import create_client

from scope.config import Settings

_anon_client = None
_service_client = None


def get_anon_client():
    """Get Supabase client using anon key. Used for user-facing OAuth calls."""
    global _anon_client
    if _anon_client is None:
        settings = Settings()
        _anon_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
    return _anon_client


def get_service_client():
    """Get Supabase client using service key. Used for admin operations."""
    global _service_client
    if _service_client is None:
        settings = Settings()
        _service_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)
    return _service_client
