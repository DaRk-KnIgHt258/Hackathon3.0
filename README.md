# ⚖️ NyayaSutra — Indian Court Document Review & Docket Intelligence

> **Hackathon Project** | AI-powered legal document triage and statutory intelligence for Indian courts

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📌 What is NyayaSutra?

**NyayaSutra** (Sanskrit: *Thread of Justice*) is an AI-powered legal document review platform purpose-built for the Indian judicial system. It automatically ingests multi-page court judgments and orders (PDF/text), extracts structured legal entities, and delivers dual-mode summaries — one for legal professionals and one for everyday citizens.

### 🎯 Target Audience
| User | Use Case |
|------|----------|
| 🧑‍⚖️ Court Clerks | Fast triage and docketing of incoming judgments |
| 👨‍💼 Young Advocates | Instant headnotes and statutory clause lookup |
| 👤 Citizens | Plain-language understanding of court orders in English & Hindi |

---

## ✨ Key Features

- **📄 PDF Ingestion** — Sub-100ms high-speed extraction via PyMuPDF with page-level tracking
- **🤖 Structured AI Extraction** — Google Gemini 2.5 Flash extracts parties, bench (Coram), IPC/CrPC sections, precedents, and disposition status as strict JSON
- **⚖️ Dual Summaries** — Professional *Advocate Headnote* (Ratio Decidendi) + Plain-English/Hindi *Citizen Summary*
- **💬 Grounded Q&A** — Ask questions about any judgment; AI answers with exact page/paragraph citations
- **🏛️ Benchmark Cases** — 4 preloaded landmark Indian cases for zero-latency demos
- **🌐 Bilingual** — English + Hindi citizen summaries, with language switcher UI

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  React + Vite Frontend                   │
│   Upload Zone → Split-Screen Dossier → Ask Nyaya AI     │
└────────────────────────┬────────────────────────────────┘
                         │  REST API
┌────────────────────────▼────────────────────────────────┐
│                  FastAPI Backend                         │
│  PyMuPDF Parser → Gemini Flash → Pydantic Validation    │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│            PostgreSQL 16 (Docker) / SQLite               │
│         Case Dossiers stored as JSONB                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ Repository Structure

```
Hackathon3.0/
├── AGENTS.md              # AI agent instructions & coding standards
├── BACKEND.md             # Backend technical blueprint & schemas
├── FRONTEND.md            # Frontend blueprint & Stitch prompts
├── docker-compose.yml     # PostgreSQL 16 local database
├── .gitignore
├── backend/
│   ├── app/
│   │   ├── main.py        # FastAPI app, CORS, route mounts
│   │   ├── config.py      # Pydantic BaseSettings
│   │   ├── database.py    # SQLAlchemy engine & session factory
│   │   ├── models.py      # DB models (CaseRecord, QuestionLog)
│   │   ├── schemas.py     # CaseDossier Pydantic schema
│   │   ├── services/
│   │   │   ├── pdf_service.py     # PyMuPDF extraction
│   │   │   ├── llm_service.py     # Gemini Flash extractor & Q&A
│   │   │   └── sample_loader.py   # Preloads 4 benchmark cases
│   │   └── api/
│   │       └── routes.py  # REST endpoint implementations
│   ├── data/
│   │   ├── samples/       # 4 landmark Indian judgment PDFs
│   │   └── preloaded_cases.json
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── lexora/    # Core UI components
    │   ├── mock/
    │   │   └── mockCaseData.js  # Offline demo data
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.12+**
- **Node.js 18+** and npm
- **Docker Desktop** (for PostgreSQL) — or use the SQLite fallback
- A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/DaRk-KnIgHt258/Hackathon3.0.git
cd Hackathon3.0
```

---

### 2. Backend Setup

```powershell
# Create and activate virtual environment
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt
```

**Configure environment variables:**

```powershell
Copy-Item .env.example .env
```

Edit `backend/.env`:
```env
GEMINI_API_KEY="your-google-ai-studio-key-here"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nyayasutra"
# SQLite fallback (no Docker needed):
# DATABASE_URL="sqlite:///./nyayasutra.db"
```

**Start the database:**

```bash
# From repository root
docker compose up -d
```

**Start the backend server:**

```powershell
# From backend/ directory (with .venv activated)
uvicorn app.main:app --reload --port 8000
```

✅ API docs available at: **http://localhost:8000/docs**

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend available at: **http://localhost:5173**

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/document/analyze` | Upload a PDF → returns full `CaseDossier` |
| `GET` | `/api/cases` | List all processed cases |
| `GET` | `/api/cases/{case_id}` | Retrieve a specific case dossier |
| `POST` | `/api/cases/{case_id}/ask` | Grounded Q&A on a judgment |
| `GET` | `/api/cases/samples` | Fetch the 4 preloaded benchmark cases |

### Example: Upload a Judgment
```bash
curl -X POST "http://localhost:8000/api/document/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@./backend/data/samples/sample_bail_order.pdf"
```

### Example: Ask a Question
```bash
curl -X POST "http://localhost:8000/api/cases/case_01/ask" \
  -H "Content-Type: application/json" \
  -d "{\"question\": \"What conditions were imposed for granting bail?\"}"
```

---

## 🏛️ Preloaded Benchmark Cases

Four landmark Indian judgments are pre-seeded for zero-latency demo:

| # | Case | Domain | Key Statute |
|---|------|--------|-------------|
| 1 | *Arnesh Kumar vs. State of Bihar* (2014) | Criminal / Bail | Section 498-A IPC, Section 41 CrPC |
| 2 | *Dashrath Rupsingh Rathod vs. State of Maharashtra* (2014) | Commercial | Section 138, Negotiable Instruments Act |
| 3 | *K.S. Puttaswamy vs. Union of India* | Constitutional | Article 21, Right to Privacy |
| 4 | *BALCO vs. Kaiser Aluminium* | Arbitration | Arbitration & Conciliation Act |

---

## 🧠 AI Extraction Schema

The `CaseDossier` model extracted by Gemini Flash includes:

```
CaseDossier
├── title, case_number, court, judgment_date
├── coram[]              ← Bench / Judges
├── petitioner, respondent, case_type
├── disposition_status   ← ALLOWED | DISMISSED | BAIL_GRANTED | BAIL_REJECTED
│                           REMANDED | DISPOSED_WITH_DIRECTIONS | PARTLY_ALLOWED
├── verdict_summary
├── statutes_cited[]
│   ├── act             ← Full normalized name (e.g., "Indian Penal Code, 1860")
│   ├── section
│   ├── description     ← Plain-English meaning
│   └── context_in_case
├── precedents_cited[]
├── lawyer_headnote      ← Ratio Decidendi for advocates
├── citizen_summary_en   ← Plain English for citizens
└── citizen_summary_hi   ← Hindi translation
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | Async REST API framework |
| **PyMuPDF (fitz)** | High-speed PDF parsing (<100ms for 30 pages) |
| **Google Gemini 2.5 Flash** | Structured legal entity extraction & Q&A |
| **Pydantic v2** | Strict schema validation |
| **SQLAlchemy 2.0** | ORM & async database access |
| **PostgreSQL 16** | Primary database (JSONB storage) |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **Lucide React** | Icon library |
| **clsx / tailwind-merge** | Conditional class utilities |

---

## 🔒 Security Notes

> **NEVER commit API keys or secrets.** `backend/.env` is gitignored — keep it that way.

- All secrets live in `backend/.env` (gitignored)
- Use `backend/.env.example` as the sanitized template
- CORS is open (`*`) for local dev — restrict in production

---

## 📖 Additional Documentation

| File | Purpose |
|------|---------|
| [`BACKEND.md`](./BACKEND.md) | Full backend blueprint, schemas, and implementation milestones |
| [`FRONTEND.md`](./FRONTEND.md) | Frontend blueprint, Google Stitch prompts, and UX checklist |
| [`AGENTS.md`](./AGENTS.md) | AI agent instructions and Indian legal domain conventions |

---

## 👥 Team

Built by a 2-person team at the DYP Hackathon:
- **Backend Engineer** — FastAPI, Gemini AI pipeline, PDF extraction
- **Frontend Engineer** — React + Vite + Tailwind, Google Stitch UI design

---

<div align="center">

*न्यायसूत्र — Threading Justice through Technology*

</div>
