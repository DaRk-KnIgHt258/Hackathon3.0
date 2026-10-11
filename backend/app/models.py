"""
SQLAlchemy ORM models for NyayaSutra.
"""
import uuid
from sqlalchemy import Column, String, Integer, Float, Text, JSON, DateTime
from sqlalchemy.sql import func
from app.database import Base


def _new_uuid() -> str:
    return str(uuid.uuid4())


class CaseRecord(Base):
    """Persists one fully-processed court judgment."""
    __tablename__ = "case_records"

    id = Column(String, primary_key=True, default=_new_uuid)
    title = Column(String, nullable=False, index=True)
    case_number = Column(String, nullable=False)
    court = Column(String, nullable=False)
    judgment_date = Column(String, nullable=False)
    case_type = Column(String, nullable=False)
    disposition_status = Column(String, nullable=False)
    total_pages = Column(Integer, nullable=False, default=0)
    processing_time_ms = Column(Float, nullable=False, default=0.0)

    # Full extracted text stored for Q&A grounding
    full_text = Column(Text, nullable=True)

    # Complete CaseDossier stored as JSON
    dossier_json = Column(JSON, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_sample = Column(String, nullable=False, default="false")  # "true"/"false" flag


class QuestionLog(Base):
    """Logs every Q&A interaction for audit & analytics."""
    __tablename__ = "question_logs"

    id = Column(String, primary_key=True, default=_new_uuid)
    case_id = Column(String, nullable=False, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
