# Agent Instructions: NyayaSutra (Indian Court Document Review & Organization)

Welcome, Agent. This file contains persistent rules, architectural boundaries, coding standards, and operational guidelines for the **NyayaSutra** project. Follow these directives in all interactions.

---

## 1. Project Overview & Mission

* **Project Name**: NyayaSutra (Legal Document Review & Docket Intelligence)
* **Objective**: Automatically ingest multi-page Indian court judgments/orders (PDF/text), extract structured legal entities (Parties, Coram, IPC/CrPC statutory sections, precedents, disposition status), and generate dual-mode summaries (Advocate Headnote vs. Plain-English/Hindi Citizen Summary) with grounded Q&A.
* **Target Audience**: Court clerks, young advocates, and everyday citizens navigating Indian judicial backlog.
* **Team Structure**: 2-person team (1 Backend + 1 Frontend).

---

## 2. Repository Layout & Architecture

```text
DYP_Hackathon/
├── AGENTS.md                  # This file: Agent instructions and guidelines
├── BACKEND.md                 # Backend technical blueprint, schemas, and milestones
├── FRONTEND.md                # Frontend blueprint, Google Stitch prompts, mock contracts
├── ROADMAP.md                 # Original hackathon roadmap
├── docker-compose.yml         # PostgreSQL 16 local database
├── .gitignore                 # Strict ignores for .venv, .env, __pycache__, etc.
├── backend/
│   ├── .venv/                 # Python 3.12 virtual environment (local, ignored)
│   ├── .env                   # Local secrets (GEMINI_API_KEY, etc. - NEVER commit)
│   ├── .env.example           # Sanitized environment template
│   ├── requirements.txt       # Python dependencies (FastAPI, PyMuPDF, google-genai, etc.)
│   └── app/                   # FastAPI application code
└── frontend/                  # React + Vite + Tailwind CSS application
```

---

## 3. Environment & Execution Guidelines (Windows / PowerShell)

1. **Python Virtual Environment**:
   * Virtualenv is located at `backend/.venv`.
   * Python executable: `backend\.venv\Scripts\python.exe`
   * Pip executable: `backend\.venv\Scripts\pip.exe`
   * When running Python commands on this machine, prefer the direct path `backend\.venv\Scripts\python.exe` or ensure the virtualenv is activated (`.\backend\.venv\Scripts\Activate.ps1`). Do not invoke a bare `python` if it may point to an unconfigured system interpreter.

2. **Database Execution**:
   * Primary DB: PostgreSQL 16 via Docker: `docker compose up -d`
   * Fallback DB: SQLite (`sqlite:///./nyayasutra.db`) if Docker is unavailable.

3. **Git & Security Rules**:
   * **NEVER** commit API keys or raw secrets.
   * `backend/.env` is strictly ignored by `.gitignore`. Keep it that way.
   * Remote name is `origin` pointing to `https://github.com/DaRk-KnIgHt258/Hackathon3.0`.

---

## 4. Backend Coding Standards

* **Framework**: FastAPI (async routes, standard CORS middleware open to `*` for frontend local dev).
* **Validation**: Pydantic v2. Use strict `CaseDossier` schemas matching [BACKEND.md](file:///d:/Do%20Not%20Open/LOL/DYP_Hackathon/BACKEND.md).
* **PDF Extraction**:
  * Use **PyMuPDF (`fitz`)** for high-speed sub-100ms extraction.
  * Always track page numbers (`--- PAGE X ---`) to enable exact citation linking.
* **LLM Calls**:
  * Primary engine: Google Gemini Flash (`gemini-2.5-flash` or `gemini-1.5-flash`) via `google-genai` SDK.
  * Always use structured JSON outputs (`response_mime_type="application/json"` with `response_schema=CaseDossier`).
  * Temperature should be low (`0.1`) for deterministic legal extraction.
* **Grounded Q&A**:
  * Q&A answers must cite exact pages/paragraphs from the judgment text. If an allegation or statute is not found in the judgment, state so explicitly.
* **Preloaded Demo Benchmark Cases**:
  * Maintain cached responses or pre-seeded JSON for the 4 benchmark Indian cases (*Arnesh Kumar*, *Dashrath Rupsingh*, *Puttaswamy*, *BALCO*) to guarantee zero-latency, fail-safe demos even with spotty venue Wi-Fi.

---

## 5. Frontend Alignment & Team Contracts

* The frontend teammate is developing with **React + Vite + Tailwind CSS** based on designs generated in **Google Stitch**.
* The contract defined in [FRONTEND.md](file:///d:/Do%20Not%20Open/LOL/DYP_Hackathon/FRONTEND.md) and [BACKEND.md](file:///d:/Do%20Not%20Open/LOL/DYP_Hackathon/BACKEND.md) is the single source of truth:
  * `POST /api/document/analyze` -> Returns full `CaseDossier`
  * `POST /api/cases/{case_id}/ask` -> Grounded Q&A response
  * `GET /api/cases/samples` -> List of preloaded sample cases
* **Never alter API response shapes** without coordinating updates in `FRONTEND.md` and notifying the user.

---

## 6. Indian Legal Domain Conventions

When handling judgments or writing prompts:
* **Statutory Acts**: Normalize Indian Acts (e.g., "IPC" -> "Indian Penal Code, 1860"; "CrPC" -> "Code of Criminal Procedure, 1973"; "NI Act" -> "Negotiable Instruments Act, 1881").
* **Court Hierarchy**: Accurately recognize Supreme Court of India vs. High Courts vs. District/Sessions/Magistrate Courts.
* **Dispositions**: Map final orders into standardized enums (`ALLOWED`, `DISMISSED`, `BAIL_GRANTED`, `BAIL_REJECTED`, `REMANDED`, `DISPOSED_WITH_DIRECTIONS`, `PARTLY_ALLOWED`).
* **Bilingual Requirement**: Provide citizen-level summaries in both English and natural Hindi.
