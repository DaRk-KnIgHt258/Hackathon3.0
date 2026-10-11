from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum


class DispositionEnum(str, Enum):
    ALLOWED = "ALLOWED"
    DISMISSED = "DISMISSED"
    BAIL_GRANTED = "BAIL_GRANTED"
    BAIL_REJECTED = "BAIL_REJECTED"
    REMANDED = "REMANDED"
    DISPOSED_WITH_DIRECTIONS = "DISPOSED_WITH_DIRECTIONS"
    PARTLY_ALLOWED = "PARTLY_ALLOWED"


class StatuteCited(BaseModel):
    act: str = Field(description="Full name of the legal Act, e.g., Indian Penal Code, 1860")
    section: str = Field(description="Specific section or article, e.g., Section 438 or Article 226")
    description: str = Field(description="Plain-English 1-sentence meaning of this section")
    context_in_case: str = Field(description="How this section was applied or contested in this judgment")


class CaseDossier(BaseModel):
    title: str = Field(description="Case title, e.g., State of Maharashtra vs. XYZ")
    case_number: str = Field(description="Official case registration number and year")
    court: str = Field(description="Court name, e.g., Supreme Court of India or High Court of Bombay")
    judgment_date: str = Field(description="Date the order/judgment was pronounced")
    coram: List[str] = Field(description="List of Hon'ble Judges on the bench")
    petitioner: str = Field(description="Name(s) of petitioner(s) / appellant(s)")
    respondent: str = Field(description="Name(s) of respondent(s)")
    case_type: str = Field(description="CRIMINAL, CIVIL, CONSTITUTIONAL, COMMERCIAL, or FAMILY")

    disposition_status: DispositionEnum = Field(description="Standardized final outcome enum")
    verdict_summary: str = Field(description="One-line summary of final operative order")

    statutes_cited: List[StatuteCited] = Field(description="List of all statutory sections referenced")
    precedents_cited: List[str] = Field(description="Key prior Supreme Court / High Court cases cited")

    lawyer_headnote: str = Field(description="Professional legal headnote emphasizing Ratio Decidendi")
    citizen_summary_en: str = Field(description="3-sentence simple summary for an everyday citizen in English")
    citizen_summary_hi: str = Field(description="Citizen summary translated into natural Hindi")


# ---------------------------------------------------------------------------
# API-level request / response wrappers
# ---------------------------------------------------------------------------

class AnalyzeResponse(BaseModel):
    case_id: str
    dossier: CaseDossier
    total_pages: int
    processing_time_ms: float


class CaseListItem(BaseModel):
    case_id: str
    title: str
    court: str
    judgment_date: str
    disposition_status: DispositionEnum
    case_type: str


class CaseListResponse(BaseModel):
    cases: List[CaseListItem]
    total: int


class AskRequest(BaseModel):
    question: str = Field(..., min_length=5, description="Legal question grounded in the judgment")


class AskResponse(BaseModel):
    question: str
    answer: str
    case_id: str


class SampleCase(BaseModel):
    case_id: str
    title: str
    description: str
    court: str
    year: str
    topic: str
