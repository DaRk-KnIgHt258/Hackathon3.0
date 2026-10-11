"""
NyayaSutra REST API routes.

Endpoints:
  POST /api/document/analyze       – Upload PDF → extract → persist → return CaseDossier
  GET  /api/cases                  – List all processed cases
  GET  /api/cases/samples          – Return the 4 preloaded benchmark cases (zero-latency)
  GET  /api/cases/{case_id}        – Get a single full dossier
  POST /api/cases/{case_id}/ask    – Grounded Q&A against the judgment text
"""
import time
import uuid
from functools import lru_cache
from typing import List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import CaseRecord, QuestionLog
from app.schemas import (
    AnalyzeResponse,
    AskRequest,
    AskResponse,
    CaseDossier,
    CaseListItem,
    CaseListResponse,
    SampleCase,
)
from app.services.llm_service import LLMService
from app.services.pdf_service import PDFService
from app.services.sample_loader import SAMPLE_CASES_META

router = APIRouter(prefix="/api")

# PDFService has no external deps – safe to instantiate at import
_pdf_service = PDFService()


@lru_cache(maxsize=1)
def _get_llm_service() -> LLMService:
    """Lazy singleton – ensures .env is fully loaded before Gemini client init."""
    return LLMService()


# ── Helper ──────────────────────────────────────────────────────────────────
def _record_to_dossier(record: CaseRecord) -> CaseDossier:
    return CaseDossier.model_validate(record.dossier_json)


# ── POST /api/document/analyze ──────────────────────────────────────────────
@router.post("/document/analyze", response_model=AnalyzeResponse, tags=["Document"])
async def analyze_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Upload a multi-page Indian court judgment PDF.
    Returns a fully-structured CaseDossier extracted by Gemini Flash.
    """
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")

    raw_bytes = await file.read()
    if len(raw_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # 1. Extract text
    t0 = time.perf_counter()
    extracted = _pdf_service.extract_text_with_pages(raw_bytes)
    full_text: str = extracted["full_text"]
    total_pages: int = extracted["total_pages"]

    if not full_text.strip():
        raise HTTPException(
            status_code=422,
            detail="Could not extract text from the PDF. It may be scanned/image-only.",
        )

    # 2. LLM extraction
    try:
        dossier: CaseDossier = _get_llm_service().extract_case_dossier(full_text)
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Gemini extraction failed: {exc}",
        )

    elapsed_ms = (time.perf_counter() - t0) * 1000

    # 3. Persist to DB
    case_id = str(uuid.uuid4())
    record = CaseRecord(
        id=case_id,
        title=dossier.title,
        case_number=dossier.case_number,
        court=dossier.court,
        judgment_date=dossier.judgment_date,
        case_type=dossier.case_type,
        disposition_status=dossier.disposition_status.value,
        total_pages=total_pages,
        processing_time_ms=elapsed_ms,
        full_text=full_text,
        dossier_json=dossier.model_dump(),
        is_sample="false",
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return AnalyzeResponse(
        case_id=case_id,
        dossier=dossier,
        total_pages=total_pages,
        processing_time_ms=round(elapsed_ms, 2),
        pages=extracted.get("pages"),
    )


# ── GET /api/cases/samples ──────────────────────────────────────────────────
# NOTE: This route MUST be declared BEFORE /api/cases/{case_id} so FastAPI
# doesn't interpret "samples" as a case_id path segment.
@router.get("/cases/samples", response_model=List[SampleCase], tags=["Cases"])
def get_sample_cases(db: Session = Depends(get_db)):
    """Return the 4 preloaded benchmark Indian landmark cases (instant, no LLM call)."""
    results = []
    for meta in SAMPLE_CASES_META:
        record = db.query(CaseRecord).filter(CaseRecord.id == meta["case_id"]).first()
        status = "available" if record else "not_seeded"
        results.append(
            SampleCase(
                case_id=meta["case_id"],
                title=meta["title"],
                description=meta["description"],
                court=meta["court"],
                year=meta["year"],
                topic=meta["topic"],
            )
        )
    return results


# ── GET /api/cases ──────────────────────────────────────────────────────────
@router.get("/cases", response_model=CaseListResponse, tags=["Cases"])
def list_cases(
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    """List all processed cases, newest first."""
    total = db.query(CaseRecord).count()
    records = (
        db.query(CaseRecord)
        .order_by(CaseRecord.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
    items = [
        CaseListItem(
            case_id=r.id,
            title=r.title,
            court=r.court,
            judgment_date=r.judgment_date,
            disposition_status=r.disposition_status,
            case_type=r.case_type,
        )
        for r in records
    ]
    return CaseListResponse(cases=items, total=total)


# ── GET /api/cases/{case_id} ────────────────────────────────────────────────
@router.get("/cases/{case_id}", response_model=AnalyzeResponse, tags=["Cases"])
def get_case(case_id: str, db: Session = Depends(get_db)):
    """Retrieve a full CaseDossier by case ID."""
    record = db.query(CaseRecord).filter(CaseRecord.id == case_id).first()
    if not record:
        raise HTTPException(status_code=404, detail=f"Case '{case_id}' not found.")
    # Reconstruct pages from full_text if available
    pages_list = []
    if record.full_text and "--- PAGE " in record.full_text:
        parts = record.full_text.split("--- PAGE ")
        for p in parts[1:]:
            lines = p.split("\n", 1)
            try:
                page_num = int(lines[0].split(" ---")[0].strip())
                text = lines[1] if len(lines) > 1 else ""
                pages_list.append({"page": page_num, "text": text.strip()})
            except Exception:
                continue

    return AnalyzeResponse(
        case_id=record.id,
        dossier=_record_to_dossier(record),
        total_pages=record.total_pages,
        processing_time_ms=record.processing_time_ms,
        pages=pages_list if pages_list else None,
    )


# ── POST /api/cases/{case_id}/ask ────────────────────────────────────────────
@router.post("/cases/{case_id}/ask", response_model=AskResponse, tags=["Q&A"])
def ask_case(
    case_id: str,
    body: AskRequest,
    db: Session = Depends(get_db),
):
    """
    Grounded Q&A: answer a legal question strictly from the judgment text.
    Cites exact page/paragraph references.
    """
    record = db.query(CaseRecord).filter(CaseRecord.id == case_id).first()
    if not record:
        raise HTTPException(status_code=404, detail=f"Case '{case_id}' not found.")

    judgment_text = record.full_text or ""
    if not judgment_text.strip():
        # Fall back to dossier summary if full text was not stored (sample stubs)
        judgment_text = (
            record.dossier_json.get("lawyer_headnote", "")
            + "\n"
            + record.dossier_json.get("citizen_summary_en", "")
        )

    try:
        answer = _get_llm_service().ask_judgment(judgment_text, body.question)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Gemini Q&A failed: {exc}")

    # Log the interaction
    log = QuestionLog(
        case_id=case_id,
        question=body.question,
        answer=answer,
    )
    db.add(log)
    db.commit()

    return AskResponse(question=body.question, answer=answer, case_id=case_id)
