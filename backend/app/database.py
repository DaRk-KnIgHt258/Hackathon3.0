"""
SQLAlchemy 2.0 database setup.
Supports both PostgreSQL (primary, via psycopg2) and SQLite (fallback).
"""
from sqlalchemy import create_engine, Column, String, Integer, Float, Text, JSON
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session
from app.config import get_settings

settings = get_settings()

# ── URL fixup ─────────────────────────────────────────────────────────────
# SQLAlchemy 2.x defaults postgresql:// to the newer psycopg3 driver.
# We only have psycopg2-binary installed, so ensure the dialect string is right.
_db_url = settings.database_url
if _db_url.startswith("postgresql://"):
    _db_url = _db_url.replace("postgresql://", "postgresql+psycopg2://", 1)
elif _db_url.startswith("postgres://"):
    _db_url = _db_url.replace("postgres://", "postgresql+psycopg2://", 1)

# ── Engine ─────────────────────────────────────────────────────────────────
connect_args = {}
if _db_url.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    _db_url,
    connect_args=connect_args,
    echo=False,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# ── Base ────────────────────────────────────────────────────────────────────
class Base(DeclarativeBase):
    pass


# ── Dependency ──────────────────────────────────────────────────────────────
def get_db():
    """FastAPI dependency that yields a database session."""
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
