"""Create profiles table with signup trigger.

Revision ID: 0001
Revises:
Create Date: 2026-08-16 17:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create profiles table.
    op.create_table(
        "profiles",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("display_name", sa.Text(), nullable=False, server_default=""),
        sa.Column("timezone", sa.String(255), nullable=False, server_default="America/New_York"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["id"], ["auth.users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        schema="public",
    )

    # Create signup trigger function.
    op.execute("""
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS trigger AS $$
        BEGIN
            INSERT INTO public.profiles (id, display_name, timezone)
            VALUES (new.id, '', 'America/New_York');
            RETURN new;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
    """)

    # Create trigger on auth.users insert.
    op.execute("""
        CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW
        EXECUTE FUNCTION public.handle_new_user();
    """)

    # Enable RLS on profiles.
    op.execute("ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;")

    # Create RLS policy: users can only see their own profile.
    op.execute("""
        CREATE POLICY "Users can see their own profile"
        ON public.profiles
        FOR SELECT
        USING (auth.uid() = id);
    """)

    # Create RLS policy: users can update their own profile.
    op.execute("""
        CREATE POLICY "Users can update their own profile"
        ON public.profiles
        FOR UPDATE
        USING (auth.uid() = id);
    """)


def downgrade() -> None:
    # Drop RLS policies.
    op.execute("DROP POLICY IF EXISTS \"Users can update their own profile\" ON public.profiles;")
    op.execute("DROP POLICY IF EXISTS \"Users can see their own profile\" ON public.profiles;")

    # Disable RLS.
    op.execute("ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;")

    # Drop trigger and function.
    op.execute("DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;")
    op.execute("DROP FUNCTION IF EXISTS public.handle_new_user();")

    # Drop profiles table.
    op.drop_table("profiles", schema="public")
