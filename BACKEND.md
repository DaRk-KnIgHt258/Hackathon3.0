# Backend Development Master Plan (NyayaSutra)
> **Target Audience:** Backend Engineer (You)  
> **Mission:** Build a high-speed, reliable FastAPI backend that ingests multi-page Indian court PDFs, extracts structured legal entities using **Gemini Flash**, and exposes clean REST APIs matching `FRONTEND.md`.

---

## 1. System Architecture

```mermaid
flowchart TD
    A[Client: React Upload / Sample Click] -->|Multipart PDF / Case ID| B[FastAPI Gateway]
    
    subgraph Ingestion & Processing
        B --> C[PyMuPDF / fitz<br>High-Speed PDF Parser & Page Indexer]
        C --> D[Text Chunking & Metadata Pre-filter]
        D --> E[Gemini 1.5/2.0 Flash<br>Structured JSON Schema Extraction]
    end

    subgraph Data & Storage
        E --> F[Pydantic v2 Validation<br>Schema-strict Output]
        F --> G[(PostgreSQL / SQLite<br>Full Case Dossier + JSONB)]
    end

    subgraph Intelligence & Search
        B --> H[Q&A Endpoint: POST /api/cases/ask]
        H --> I[Grounded Context RAG<br>Exact Page/Para Citations]
        I --> E
    end

    G --> J[Instant Response to Frontend]
```

---

## 2. API Endpoints Contract (Matches `FRONTEND.md`)

| Method | Endpoint | Description | Payload / Query |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/document/analyze` | Upload a raw PDF $\rightarrow$ parses, extracts, saves, and returns the full dossier. | `file: UploadFile` |
| `GET` | `/api/cases` | List all processed cases in history. | `limit=20, offset=0` |
| `GET` | `/api/cases/{case_id}` | Retrieve a specific case dossier by ID. | Path: `case_id` |
| `POST` | `/api/cases/{case_id}/ask` | Interactive Q&A grounded strictly in the judgment text. | `{"question": "Why was bail rejected?"}` |
| `GET` | `/api/cases/samples` | Instant fetch of the 4 preloaded benchmark Indian cases (zero latency demo). | None |

---

## 3. Directory Layout

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app, CORS, routes mount
│   ├── config.py            # Pydantic BaseSettings (GEMINI_API_KEY, DATABASE_URL)
│   ├── database.py          # SQLAlchemy engine & session factory
│   ├── models.py            # DB models (CaseRecord, QuestionLog)
│   ├── schemas.py           # Pydantic models for structured output & API response
│   ├── services/
│   │   ├── __init__.py
│   │   ├── pdf_service.py   # PyMuPDF fast text extraction with page tracking
│   │   ├── llm_service.py   # Gemini Flash structured legal extractor & Q&A
│   │   └── sample_loader.py # Seeds the 4 preloaded benchmark Indian cases
│   └── api/
│       ├── __init__.py
│       └── routes.py        # REST endpoints implementation
├── data/
│   ├── samples/             # 4 sample Indian judgment PDFs
│   └── preloaded_cases.json # Cached pre-parsed outputs for 0-second loading
├── Dockerfile
├── docker-compose.yml       # PostgreSQL 16
├── requirements.txt
└── .env
```

---

## 4. Phased Implementation Milestones

```mermaid
gantt
    title Backend Development Milestones (Hackathon Sprint)
    dateFormat  HH:mm
    axisFormat  %H:%M
    section Setup
    Scaffold & Dependencies          :done, s1, 00:00, 00:45
    Database & Docker Setup          :active, s2, 00:45, 01:30
    section Core Extraction
    PyMuPDF Parser Service           :s3, 01:30, 02:30
    Gemini Structured Legal Extractor:s4, 02:30, 04:30
    section API & Intelligence
    FastAPI Endpoints + Swagger Validation :s5, 04:30, 06:00
    Grounded Q&A Endpoint            :s6, 06:00, 07:15
    section Demo Polish
    Preloaded Benchmark Seed Data    :s7, 07:15, 08:30
```

### Milestone 1: Environment & Scaffolding (Hour 0 – 1)
- Install dependencies:
  ```bash
  pip install fastapi uvicorn pydantic sqlalchemy asyncpg psycopg2-binary pymupdf google-genai python-dotenv python-multipart
  ```
- Setup `.env`:
  ```env
  GEMINI_API_KEY="your-google-ai-studio-key"
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nyayasutra"
  # Optional fallback: sqlite:///./nyayasutra.db
  ```

### Milestone 2: PDF Parser Service (`pdf_service.py`) (Hour 1 – 2)
- Use **PyMuPDF (`fitz`)**: It extracts text from a 30-page PDF in **< 100 milliseconds** (10x faster than `pdfplumber` or `pypdf`).
- Preserves **page-level text boundaries** so that when citations are extracted, you can link directly to `Page X`.

### Milestone 3: Gemini Flash Structured Legal Extractor (`llm_service.py`) (Hour 2 – 4)
- Leverage **Gemini 1.5/2.0 Flash** with strict JSON Schema output (`response_schema`).
- System prompt incorporates Indian legal nuance:
  - Distinguishes **Ratio Decidendi** (binding rule) from **Obiter Dicta** (passing remarks).
  - Normalizes Acts: e.g., converts *"498A IPC"* to *"Section 498-A, Indian Penal Code, 1860"*.
  - Classifies disposition into clean enum: `ALLOWED`, `DISMISSED`, `BAIL_GRANTED`, `BAIL_REJECTED`, `REMANDED`, `DISPOSED_WITH_DIRECTIONS`.
  - Generates **Dual Summaries**:
    1. Professional Advocate Headnote (concise legal principles).
    2. Citizen Plain Language Summary (English + Hindi).

### Milestone 4: REST API & Database Persistence (Hour 4 – 6)
- Store case metadata and full JSON response in PostgreSQL (using `JSONB` for zero-friction schema flexibility).
- Ensure CORS middleware is enabled so your frontend teammate can connect without domain blockers:
  ```python
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )
  ```

### Milestone 5: Grounded Legal Q&A Service (`POST /api/cases/{id}/ask`) (Hour 6 – 7)
- Allows judges or lawyers to ask questions like:
  - *"Why did the judge reject the prosecution's delay argument?"*
  - *"Was there any mention of Section 41A CrPC notice?"*
- Prompt forces the model to answer **only using the judgment text**, citing exact paragraphs/pages.

### Milestone 6: Preload the 4 Benchmark Cases (Hour 7 – 8)
- **The Secret Hackathon Saver:** If conference Wi-Fi lags during judging, you don't wait for LLM calls!
- Preload 4 real landmark judgments directly into the database:
  1. **Criminal Bail Guidelines**: *Arnesh Kumar vs. State of Bihar* (Sec 498A IPC & Sec 41 CrPC).
  2. **Commercial / Cheque Bounce**: *Dashrath Rupsingh Rathod vs. State of Maharashtra* (Sec 138 NI Act).
  3. **Constitutional / Right to Privacy**: Excerpt from *K.S. Puttaswamy vs. Union of India* (Art 21).
  4. **Arbitration / Commercial Dispute**: *BALCO vs. Kaiser Aluminium* (Arbitration & Conciliation Act).

---

## 5. Core Code Implementations (Ready to Use)

### A. Pydantic Legal Dossier Schema (`app/schemas.py`)
```python
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
```

---

### B. High-Speed PDF Text Extractor (`app/services/pdf_service.py`)
```python
import fitz  # PyMuPDF

class PDFService:
    @staticmethod
    def extract_text_with_pages(file_bytes: bytes) -> dict:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        pages_content = []
        full_text = []
        
        for idx, page in enumerate(doc):
            page_num = idx + 1
            text = page.get_text("text").strip()
            pages_content.append({"page": page_num, "text": text})
            full_text.append(f"--- PAGE {page_num} ---\n{text}")
            
        return {
            "total_pages": len(doc),
            "pages": pages_content,
            "full_text": "\n\n".join(full_text)
        }
```

---

### C. Gemini Flash Legal Extractor (`app/services/llm_service.py`)
```python
import os
import json
from google import genai
from google.genai import types
from app.schemas import CaseDossier

class LLMService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        self.client = genai.Client(api_key=api_key)

    def extract_case_dossier(self, judgment_text: str) -> CaseDossier:
        prompt = f"""
You are an expert Indian Supreme Court & High Court legal research clerk.
Analyze the following multi-page Indian court judgment and extract all structured details strictly matching the provided JSON schema.

Key guidelines:
1. Accurately identify the final operative disposition (ALLOWED, DISMISSED, BAIL_GRANTED, etc.).
2. Distinguish the core legal principle (Ratio Decidendi) from passing observations.
3. Normalize all Indian Acts (e.g. IPC, CrPC, BNS, BNSS, NI Act, Constitution).
4. Provide a crystal-clear, jargon-free citizen summary in both English and natural Hindi.

--- JUDGMENT TEXT ---
{judgment_text[:50000]}
"""
        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=CaseDossier,
                temperature=0.1
            ),
        )
        return CaseDossier.model_validate_json(response.text)

    def ask_judgment(self, judgment_text: str, question: str) -> str:
        prompt = f"""
You are a legal research assistant. Answer the question STRICTLY using the provided Indian court judgment text.
Include exact page/paragraph references where the answer is found. If not mentioned in the text, state that explicitly.

Question: {question}

--- JUDGMENT TEXT ---
{judgment_text[:40000]}
"""
        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        return response.text
```

---

## 6. Testing & Verifying Your Backend

Once started (`uvicorn app.main:app --reload --port 8000`):

1. **Test in Browser**: Open `http://localhost:8000/docs` (Swagger UI).
2. **Test Document Upload via curl**:
   ```bash
   curl -X POST "http://localhost:8000/api/document/analyze" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@./data/samples/sample_bail_order.pdf"
   ```
3. **Test Interactive Q&A**:
   ```bash
   curl -X POST "http://localhost:8000/api/cases/case_01/ask" \
     -H "Content-Type: application/json" \
     -d '{"question": "What conditions were imposed for granting bail?"}'
   ```

---

## 7. Immediate Next Steps for You
1. Setup Python virtual environment (`python -m venv venv` and `pip install -r requirements.txt`).
2. Add your `GEMINI_API_KEY` to `.env`.
3. Create `app/` folder with `main.py`, `schemas.py`, and the two service files above.
4. Provide the running endpoint `http://localhost:8000` to your frontend teammate!
