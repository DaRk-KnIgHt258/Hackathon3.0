"""
NyayaSutra FastAPI Application Entry Point.
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, SessionLocal, engine
from app.api.routes import router
from app.services.sample_loader import seed_sample_cases


@asynccontextmanager
async def lifespan(app: FastAPI):
    # ── Startup ─────────────────────────────────────────────────────────────
    # Retry DB connection up to 10 times to handle container startup lag
    import time
    import logging
    logger = logging.getLogger("uvicorn")

    max_retries = 10
    for attempt in range(1, max_retries + 1):
        try:
            Base.metadata.create_all(bind=engine)
            break
        except Exception as e:
            if attempt == max_retries:
                logger.error(f"Failed to connect to database after {max_retries} attempts: {e}")
                raise e
            logger.warning(f"Database not ready yet (attempt {attempt}/{max_retries}). Retrying in 2s...")
            time.sleep(2)

    # Seed the 4 benchmark cases for zero-latency demo
    db = SessionLocal()
    try:
        seed_sample_cases(db)
    except Exception as e:
        logger.warning(f"Warning seeding sample cases: {e}")
    finally:
        db.close()

    yield  # App is now running

    # ── Shutdown ─────────────────────────────────────────────────────────────
    # Nothing to clean up for now


app = FastAPI(
    title="NyayaSutra – Indian Court Document Intelligence API",
    description=(
        "Ingest multi-page Indian court judgments (PDF), extract structured legal entities "
        "via Gemini Flash, and enable grounded Q&A with exact page citations."
    ),
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ──────────────────────────────────────────────────────────────────
# Open to * for local hackathon development so frontend can connect freely.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ────────────────────────────────────────────────────────────────
app.include_router(router)


@app.get("/", tags=["Health"])
def root():
    return {
        "service": "NyayaSutra",
        "status": "running",
        "docs": "/docs",
        "version": "1.0.0",
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}
