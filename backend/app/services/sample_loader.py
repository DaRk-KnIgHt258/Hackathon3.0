"""
Seeds 4 landmark Indian judgment pre-parsed dossiers into the database.
This guarantees ZERO-latency demo loading even with no Wi-Fi / API outage.
"""
import json
import uuid
import os
from pathlib import Path
from sqlalchemy.orm import Session
from app.models import CaseRecord

# Path to the pre-built JSON cache
_DATA_DIR = Path(__file__).parent.parent.parent / "data"
_PRELOADED_PATH = _DATA_DIR / "preloaded_cases.json"


# ---------------------------------------------------------------------------
# Static metadata for the 4 benchmark cases
# ---------------------------------------------------------------------------
SAMPLE_CASES_META = [
    {
        "case_id": "sample_arnesh_kumar",
        "title": "Arnesh Kumar vs. State of Bihar & Anr.",
        "description": "Landmark SC guidelines on arrest powers under Section 498A IPC and Section 41 CrPC. Police cannot arrest without satisfying the magistrate.",
        "court": "Supreme Court of India",
        "year": "2014",
        "topic": "Criminal – Bail & Arrest Guidelines",
    },
    {
        "case_id": "sample_dashrath_rupsingh",
        "title": "Dashrath Rupsingh Rathod vs. State of Maharashtra & Anr.",
        "description": "SC ruling on territorial jurisdiction for cheque-bounce offences under Section 138 NI Act – only the bank where cheque is presented has jurisdiction.",
        "court": "Supreme Court of India",
        "year": "2014",
        "topic": "Commercial – Cheque Bounce / NI Act",
    },
    {
        "case_id": "sample_puttaswamy",
        "title": "Justice K.S. Puttaswamy (Retd.) vs. Union of India",
        "description": "9-judge Constitution Bench unanimously upheld Right to Privacy as a fundamental right under Article 21 of the Constitution of India.",
        "court": "Supreme Court of India",
        "year": "2017",
        "topic": "Constitutional – Right to Privacy",
    },
    {
        "case_id": "sample_balco",
        "title": "Bharat Aluminium Co. (BALCO) vs. Kaiser Aluminium & Chemical Corp.",
        "description": "SC overruled the Bhatia International case. Indian courts have no supervisory jurisdiction over foreign-seated arbitrations.",
        "court": "Supreme Court of India",
        "year": "2012",
        "topic": "Commercial – International Arbitration",
    },
]


def _make_stub_dossier(meta: dict) -> dict:
    """Create a minimal pre-built dossier for offline demo use."""
    return {
        "title": meta["title"],
        "case_number": f"Sample/{meta['year']}",
        "court": meta["court"],
        "judgment_date": meta["year"],
        "coram": ["Sample – Load from data/preloaded_cases.json for full detail"],
        "petitioner": meta["title"].split(" vs. ")[0].strip(),
        "respondent": meta["title"].split(" vs. ")[-1].strip(),
        "case_type": "CONSTITUTIONAL" if "Constitutional" in meta["topic"] else "CRIMINAL" if "Criminal" in meta["topic"] else "COMMERCIAL",
        "disposition_status": "ALLOWED",
        "verdict_summary": meta["description"],
        "statutes_cited": [],
        "precedents_cited": [],
        "lawyer_headnote": meta["description"],
        "citizen_summary_en": meta["description"],
        "citizen_summary_hi": "यह एक महत्वपूर्ण भारतीय न्यायालय का निर्णय है। पूरा विवरण डेटा फ़ाइल में उपलब्ध है।",
    }


def seed_sample_cases(db: Session) -> None:
    """
    Insert the 4 benchmark cases if they don't already exist.
    Tries to load rich pre-parsed JSON from `data/preloaded_cases.json` first;
    falls back to stub dossiers so the app always starts.
    """
    preloaded: dict = {}
    if _PRELOADED_PATH.exists():
        try:
            with open(_PRELOADED_PATH, "r", encoding="utf-8") as f:
                preloaded = json.load(f)
        except Exception:
            preloaded = {}

    for meta in SAMPLE_CASES_META:
        existing = db.query(CaseRecord).filter(CaseRecord.id == meta["case_id"]).first()
        if existing:
            continue

        dossier = preloaded.get(meta["case_id"], _make_stub_dossier(meta))

        record = CaseRecord(
            id=meta["case_id"],
            title=meta["title"],
            case_number=dossier.get("case_number", f"Sample/{meta['year']}"),
            court=meta["court"],
            judgment_date=meta["year"],
            case_type=dossier.get("case_type", "COMMERCIAL"),
            disposition_status=dossier.get("disposition_status", "ALLOWED"),
            total_pages=0,
            processing_time_ms=0.0,
            full_text=meta["description"],
            dossier_json=dossier,
            is_sample="true",
        )
        db.add(record)

    db.commit()
