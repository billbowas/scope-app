from datetime import datetime

from sqlalchemy import Column, DateTime, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Profile(Base):
    __tablename__ = "profiles"
    __table_args__ = {"schema": "public"}

    id = Column(UUID(as_uuid=True), primary_key=True)
    display_name = Column(Text, nullable=False, default="")
    timezone = Column(String(255), nullable=False, default="America/New_York")
    created_at = Column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
