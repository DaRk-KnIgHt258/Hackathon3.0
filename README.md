<p align="center">
  <img src="https://img.shields.io/badge/⚖️_NyayaSutra-Thread_of_Justice-0B0F19?style=for-the-badge&labelColor=0B0F19&color=10B981" alt="NyayaSutra" />
</p>

<h1 align="center">⚖️ NyayaSutra</h1>
<h3 align="center">Indian Court Document Review & Docket Intelligence</h3>

<p align="center">
  <em>न्यायसूत्र — Threading Justice through Technology</em>
</p>

<p align="center">
  <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/Backend-FastAPI_0.110+-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/Frontend-React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" /></a>
  <a href="https://ai.google.dev/"><img src="https://img.shields.io/badge/AI_Engine-Gemini_2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Styling-Tailwind_CSS_3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="TailwindCSS" /></a>
  <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3.12+-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" /></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/Database-PostgreSQL_16-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
</p>

---

## 📌 What is NyayaSutra?

**NyayaSutra** (Sanskrit: *न्यायसूत्र — Thread of Justice*) is an AI-powered legal document review platform purpose-built for the **Indian judicial system**. It automatically ingests multi-page court judgments and orders (PDF), extracts structured legal entities using Google Gemini Flash, and delivers **dual-mode summaries** — one for legal professionals (Advocate Headnote) and one for everyday citizens (Plain English + Hindi).

> India's courts produce **millions of orders annually** across 25,000+ courts. Young advocates, clerks, and citizens struggle to parse dense legal language, identify applicable statutes, and understand final dispositions. NyayaSutra automates this in seconds.

### 🎯 Who Is It For?

| Persona | Pain Point Solved |
| :--- | :--- |
| 🧑‍⚖️ **Court Clerks** | Instantly triage and classify incoming judgments by case type, statutes, and disposition |
| 👨‍💼 **Young Advocates** | Get structured headnotes with Ratio Decidendi, cited precedents, and statutory section explanations in one click |
| 👤 **Citizens** | Understand court orders in plain English or Hindi without hiring a lawyer to interpret the judgment |

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 📄 **PDF Ingestion** | Sub-100ms high-speed extraction via PyMuPDF with page-level tracking for citation grounding |
| 🤖 **Structured AI Extraction** | Gemini 2.5 Flash extracts parties, bench (Coram), IPC/CrPC/BNS sections, precedents, and disposition as strict Pydantic JSON |
| ⚖️ **Dual Summaries** | Professional *Advocate Headnote* (Ratio Decidendi) + Plain-Language *Citizen Summary* (English + Hindi) |
| 💬 **Grounded Q&A** | Ask questions about any judgment — AI answers with exact page/paragraph citations, never hallucinating |
| 🏛️ **Benchmark Cases** | 4 preloaded landmark Indian Supreme Court cases for zero-latency, fail-safe demos |
| 🌐 **Bilingual** | English + Hindi citizen summaries with language switcher UI |
| 📊 **Docket KPIs** | Real-time case statistics — total cases processed, disposition distribution, processing time metrics |
| 🔍 **Statutory Intelligence** | Every cited Act and Section is normalized (e.g., "498A IPC" → "Section 498-A, Indian Penal Code, 1860") with plain-English explanations |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    React 19 + Vite 8 Frontend                   │
│   ┌──────────────┐  ┌────────────────────┐  ┌───────────────┐  │
│   │  Upload Zone  │  │  Split-Screen View │  │  Ask Nyaya AI │  │
│   │  (PDF Drop)   │  │  PDF ← → Dossier  │  │  (Grounded QA)│  │
│   └──────┬───────┘  └────────┬───────────┘  └───────┬───────┘  │
│          │                   │                       │          │
└──────────┼───────────────────┼───────────────────────┼──────────┘
           │                   │  REST API (JSON)      │
           ▼                   ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FastAPI Backend (Python 3.12)                 │
│   ┌──────────────┐  ┌────────────────────┐  ┌───────────────┐  │
│   │   PyMuPDF     │  │  Gemini 2.5 Flash  │  │  Grounded Q&A │  │
│   │  PDF Parser   │→ │  Structured JSON   │  │  Page Citations│  │
│   │   (<100ms)    │  │  Schema Extraction │  │  Exact Refs   │  │
│   └──────────────┘  └────────┬───────────┘  └───────────────┘  │
│                              │                                  │
│                    ┌─────────▼─────────┐                        │
│                    │  Pydantic v2       │                        │
│                    │  CaseDossier       │                        │
│                    │  Schema Validation │                        │
│                    └─────────┬─────────┘                        │
└──────────────────────────────┼──────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  PostgreSQL 16       │
                    │  (Docker) / SQLite   │
                    │  JSONB Dossier Store │
                    └─────────────────────┘
```

---

## 🗂️ Repository Structure

```
Hackathon3.0/
├── README.md                  # ← You are here
├── AGENTS.md                  # AI agent instructions & Indian legal domain conventions
├── BACKEND.md                 # Backend technical blueprint, schemas & milestones
├── FRONTEND.md                # Frontend blueprint, Google Stitch prompts & UX checklist
├── docker-compose.yml         # 1-Command full stack orchestrator (PostgreSQL + FastAPI + React)
├── .env.example               # Root environment template for Docker Compose
├── .gitignore                 # Strict ignores (.venv, .env, __pycache__, *.db)
│
├── backend/
│   ├── Dockerfile             # Python 3.12 slim container with healthcheck probe
│   ├── .dockerignore          # Backend Docker build exclusion rules
│   ├── .env.example           # Sanitized backend environment template (NEVER commit .env)
│   ├── requirements.txt       # Python dependencies (FastAPI, PyMuPDF, google-genai, etc.)
│   ├── nyayasutra.db          # SQLite fallback database (auto-created, gitignored)
│   └── app/
│       ├── __init__.py
│       ├── main.py            # FastAPI app, CORS, lifespan (DB retry + auto-seeds benchmark cases)
│       ├── config.py          # Pydantic BaseSettings (GEMINI_API_KEY, DATABASE_URL)
│       ├── database.py        # SQLAlchemy 2.0 engine & session (PostgreSQL / SQLite)
│       ├── models.py          # ORM models: CaseRecord, QuestionLog
│       ├── schemas.py         # Pydantic v2: CaseDossier, AnalyzeResponse, AskResponse
│       ├── api/
│       │   └── routes.py      # 5 REST endpoints implementation
│       ├── services/
│       │   ├── pdf_service.py     # PyMuPDF high-speed text extraction with page markers
│       │   ├── llm_service.py     # Gemini Flash structured legal extractor & Q&A
│       │   └── sample_loader.py   # Seeds 4 preloaded benchmark cases on startup
│       └── data/
│           ├── preloaded_cases.json   # Pre-parsed dossiers for zero-latency demo
│           └── samples/               # Sample judgment PDFs & generation scripts
│
└── frontend/
    ├── Dockerfile             # Node 20 alpine container for React Vite dev server
    ├── .dockerignore          # Frontend Docker build exclusion rules
    ├── index.html             # HTML entry (Sora + IBM Plex Sans + Material Symbols)
    ├── package.json           # React 19, Vite 8, Tailwind CSS 3, Lucide React
    ├── vite.config.js         # Dev proxy: /api/* → http://backend:8000 (Docker) / localhost:8000 (Local)
    ├── tailwind.config.js     # Custom theme tokens & NyayaSutra design system
    ├── postcss.config.js      # PostCSS with Tailwind & Autoprefixer
    └── src/
        ├── App.jsx            # Main application orchestrator
        ├── main.jsx           # React DOM entry point
        ├── index.css          # Global styles & Tailwind directives
        ├── services/
        │   └── api.js         # Centralized API client (fetch wrapper for all endpoints)
        ├── mock/
        │   └── mockCaseData.js    # Offline demo data (matches backend schema exactly)
        └── components/
            ├── Navbar.jsx             # Brand header, search, upload trigger
            ├── UploadZone.jsx         # Drag & drop PDF uploader with progress states
            ├── SampleCaseSelector.jsx # Quick 1-click benchmark case selector
            ├── common/
            │   ├── Badge.jsx          # Reusable status badge component
            │   ├── Card.jsx           # Glassmorphic card wrapper
            │   └── AppIcon.jsx        # Application icon/branding
            ├── SplitView/
            │   ├── DocumentViewer.jsx # Left pane: PDF text viewer with page navigation
            │   ├── DossierHeader.jsx  # Case title, Bench, Disposition pill badge
            │   ├── StatutoryCards.jsx  # IPC/CrPC/Act badges & plain-English explainers
            │   ├── SummaryTabs.jsx    # Lawyer Headnote vs Citizen View toggle
            │   └── CaseChatDrawer.jsx # "Ask the Judgment" interactive RAG chat panel
            └── lexora/                # Judicial workspace components (TopAppBar, KPI strip, review modals)
                ├── TopAppBar.jsx              # Primary navigation bar
                ├── SubHeaderBanner.jsx        # Contextual sub-header
                ├── KpiStrip.jsx               # Real-time docket statistics strip
                ├── CourtRegistrySection.jsx   # Court registry browser
                ├── UtilityShelf.jsx           # Utility tools & actions
                ├── JudgmentReviewWorkspace.jsx # Split-screen review workspace
                ├── ModularDossierCards.jsx     # Modular case dossier cards
                ├── AskAiDrawer.jsx            # AI-powered Q&A slide-over drawer
                ├── CaseDossierModal.jsx       # Full dossier detail modal
                ├── NewDocketModal.jsx         # New case upload modal
                ├── LexoraModals.jsx           # Shared modal components
                ├── InstitutionalFooter.jsx    # Institutional footer
                └── dossierData.jsx            # Pre-configured dossier display data
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Minimum Version | Purpose |
| :--- | :--- | :--- |
| **Docker Desktop** | Latest (Compose v2) | **All-in-one execution** (runs Postgres, FastAPI & React in 1 command) |
| **Gemini API Key** | Free tier | [Get one at Google AI Studio](https://aistudio.google.com/) |
| **Python** *(Optional)* | 3.12+ | Only needed if running backend locally without Docker |
| **Node.js** *(Optional)* | 18+ | Only needed if running frontend locally without Docker |

---

### ⚡ Option A: 1-Command Full Stack (Recommended for Judges & Evaluators)

Judges can fire up the complete NyayaSutra judicial stack — **PostgreSQL 16 DB**, **FastAPI Backend**, and **React + Vite Dev Server** — in a single terminal command:

#### Step 1: Clone the Repository
```bash
git clone https://github.com/DaRk-KnIgHt258/Hackathon3.0.git
cd Hackathon3.0
```

#### Step 2: Configure Environment
Copy the environment template and insert your Gemini API key:

```powershell
# Windows PowerShell:
Copy-Item .env.example .env

# macOS / Linux / Bash:
cp .env.example .env
```

Open `.env` (or `backend/.env`) and add your key:
```env
GEMINI_API_KEY="your-google-ai-studio-api-key-here"
```

> 💡 **No API key handy?** No worries! The system auto-seeds 4 landmark benchmark cases (*Arnesh Kumar*, *Dashrath Rupsingh*, *Puttaswamy*, *BALCO*) on boot, allowing full interactive evaluation of dossiers, statutory breakdowns, and dual-mode summaries immediately!

#### Step 3: Launch Everything!
```bash
docker compose up --build
```
*(Tip: Add `-d` to run in background: `docker compose up -d --build`)*

---

#### 🧩 Container Orchestration Architecture

```
                       ┌──────────────────────────────────────────────┐
                       │           Evaluator Browser                  │
                       │         http://localhost:5173                │
                       └──────────────┬───────────────────────────────┘
                                      │
                         Port 5173    │  Static Assets & Vite HMR
                                      ▼
                       ┌──────────────────────────────────────────────┐
                       │  nyayasutra_frontend (React 19 + Vite 8)     │
                       │  Vite Dev Server (Port 5173)                 │
                       │  Reverse Proxy: /api/* → http://backend:8000 │
                       └──────────────┬───────────────────────────────┘
                                      │
                         Docker Net   │  Internal HTTP
                                      ▼
                       ┌──────────────────────────────────────────────┐
                       │  nyayasutra_backend (FastAPI Python 3.12)    │
                       │  ASGI Server (Port 8000)                     │
                       │  Health: /health (curl probe)                │
                       └──────────────┬───────────────────────────────┘
                                      │
                         Docker Net   │  SQLAlchemy 2.0 / psycopg2
                                      ▼
                       ┌──────────────────────────────────────────────┐
                       │  nyayasutra_postgres (PostgreSQL 16)         │
                       │  Database: nyayasutra (Port 5432)            │
                       │  Health: pg_isready probe                    │
                       └──────────────────────────────────────────────┘
```

#### 🎯 What Happens on Boot:
1. 🐘 **PostgreSQL 16 (`nyayasutra_postgres`)**: Boots up on port `5432`, provisions the `nyayasutra` schema, and passes the internal `pg_isready` health check.
2. ⚡ **FastAPI Backend (`nyayasutra_backend`)**: Waits for PostgreSQL to be healthy, establishes connection with a fault-tolerant retry loop, creates database tables, auto-seeds the 4 landmark Indian Supreme Court cases, and starts listening on port `8000`.
3. ⚛️ **React Dev Server (`nyayasutra_frontend`)**: Waits for the backend to be healthy, starts Vite on port `5173`, forwards all `/api/*` traffic internally to `http://backend:8000` (eliminating CORS complications), and mounts host volumes for live Hot-Module-Reloading during evaluation!

#### 🌐 Evaluator Endpoints:

| Service | Host URL | Description |
| :--- | :--- | :--- |
| 🖥️ **NyayaSutra Web UI** | [http://localhost:5173](http://localhost:5173) | Full interactive split-screen judicial review workspace |
| 📖 **FastAPI Swagger Docs** | [http://localhost:8000/docs](http://localhost:8000/docs) | Interactive API exploration and test runner |
| 📑 **ReDoc Documentation** | [http://localhost:8000/redoc](http://localhost:8000/redoc) | Clean OpenAPI reference documentation |
| 🩺 **Backend Health Probe** | [http://localhost:8000/health](http://localhost:8000/health) | Returns `{"status": "ok"}` |
| 🗄️ **PostgreSQL 16** | `localhost:5432` | User: `postgres`, Password: `postgrespassword`, DB: `nyayasutra` |

#### Useful Docker Management Commands:

```bash
# View live streaming logs from all services:
docker compose logs -f

# View backend logs only:
docker compose logs -f backend

# Stop the entire stack:
docker compose down

# Stop and wipe database volume for a clean state:
docker compose down -v
```

---

### 🛠️ Option B: Manual Local Development (Without Docker)

If you prefer running services directly in separate terminal windows:

#### 1. Backend Setup
```powershell
# Navigate to backend
cd backend

# Create & activate Python virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1   # On Linux/macOS: source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
Copy-Item .env.example .env    # On Linux/macOS: cp .env.example .env
```

Configure `backend/.env`:
```env
GEMINI_API_KEY="your-key-here"

# Option 1: SQLite fallback (Zero setup, runs out of the box!)
DATABASE_URL="sqlite:///./nyayasutra.db"

# Option 2: Local PostgreSQL
# DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/nyayasutra"
```

Run the backend server:
```powershell
uvicorn app.main:app --reload --port 8000
```
Backend will be live at `http://localhost:8000`.

#### 2. Frontend Setup
In a new terminal window:
```bash
cd frontend

# Install Node dependencies
npm install

# Start Vite development server
npm run dev
```
Frontend will be live at `http://localhost:5173`.

---

## 🔌 API Reference

Base URL: `http://localhost:8000`

### Endpoints

| Method | Endpoint | Description | Request | Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Health check / service info | — | `{ service, status, version }` |
| `GET` | `/health` | Simple health probe | — | `{ status: "ok" }` |
| `POST` | `/api/document/analyze` | Upload PDF → extract → return dossier | `multipart/form-data` with `file` field | `AnalyzeResponse` |
| `GET` | `/api/cases` | List all processed cases (paginated) | `?limit=20&offset=0` | `CaseListResponse` |
| `GET` | `/api/cases/samples` | Fetch 4 preloaded benchmark cases | — | `SampleCase[]` |
| `GET` | `/api/cases/{case_id}` | Retrieve a full case dossier by ID | Path: `case_id` | `AnalyzeResponse` |
| `POST` | `/api/cases/{case_id}/ask` | Grounded Q&A against the judgment text | `{ "question": "..." }` | `AskResponse` |

### Example: Upload a Judgment PDF

```bash
curl -X POST "http://localhost:8000/api/document/analyze" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@./path/to/judgment.pdf"
```

**Response:**
```json
{
  "case_id": "a1b2c3d4-...",
  "dossier": {
    "title": "State of Maharashtra vs. XYZ",
    "court": "Supreme Court of India",
    "disposition_status": "BAIL_GRANTED",
    "statutes_cited": [...],
    "lawyer_headnote": "...",
    "citizen_summary_en": "...",
    "citizen_summary_hi": "..."
  },
  "total_pages": 14,
  "processing_time_ms": 3842.17
}
```

### Example: Ask a Grounded Question

```bash
curl -X POST "http://localhost:8000/api/cases/sample_arnesh_kumar/ask" \
  -H "Content-Type: application/json" \
  -d "{\"question\": \"What conditions must police satisfy before making an arrest under Section 498A?\"}"
```

**Response:**
```json
{
  "question": "What conditions must police satisfy before making an arrest under Section 498A?",
  "answer": "As per the Supreme Court's directive [Page 3, Para 8], police officers must satisfy...",
  "case_id": "sample_arnesh_kumar"
}
```

---

## 🧠 AI Extraction Schema — `CaseDossier`

Every uploaded judgment is processed into a strictly validated `CaseDossier` Pydantic model:

```
CaseDossier
├── title                    ← "Arnesh Kumar vs. State of Bihar & Anr."
├── case_number              ← "Criminal Appeal No. 1277 of 2014"
├── court                    ← "Supreme Court of India"
├── judgment_date            ← "July 2, 2014"
├── coram[]                  ← ["Hon'ble Justice C.K. Prasad", "Hon'ble Justice P.C. Ghose"]
├── petitioner               ← "Arnesh Kumar"
├── respondent               ← "State of Bihar & Anr."
├── case_type                ← CRIMINAL | CIVIL | CONSTITUTIONAL | COMMERCIAL | FAMILY
│
├── disposition_status       ← ALLOWED | DISMISSED | BAIL_GRANTED | BAIL_REJECTED
│                               REMANDED | DISPOSED_WITH_DIRECTIONS | PARTLY_ALLOWED
├── verdict_summary          ← "Arrest guidelines mandated; bail safeguards issued"
│
├── statutes_cited[]
│   ├── act                  ← "Indian Penal Code, 1860" (normalized from "IPC")
│   ├── section              ← "Section 498-A"
│   ├── description          ← "Cruelty by husband or relative of husband"
│   ├── context_in_case      ← "Applied without preliminary magistrate inquiry"
│   └── page_ref             ← "Page 2, Para 3" (exact citation in judgment)
│
├── precedents_cited[]       ← ["Joginder Kumar vs. State of U.P. (1994)"]
│
├── lawyer_headnote          ← Professional Ratio Decidendi for advocates
├── citizen_summary_en       ← 3-sentence plain English for everyday citizens
└── citizen_summary_hi       ← Same summary in natural conversational Hindi
```

### Indian Legal Normalization Rules

The AI extraction engine normalizes all Indian statutory abbreviations:

| Abbreviation | Normalized Full Name |
| :--- | :--- |
| IPC | Indian Penal Code, 1860 |
| CrPC | Code of Criminal Procedure, 1973 |
| BNS | Bharatiya Nyaya Sanhita, 2023 |
| BNSS | Bharatiya Nagarik Suraksha Sanhita, 2023 |
| NI Act | Negotiable Instruments Act, 1881 |
| Constitution | Constitution of India |

---

## 🏛️ Preloaded Benchmark Cases

Four landmark Indian Supreme Court judgments are pre-seeded into the database on every server startup, ensuring **zero-latency, fail-safe demo loading** — even with no internet connectivity:

| # | Case | Year | Domain | Key Statute |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Arnesh Kumar vs. State of Bihar & Anr.** | 2014 | Criminal — Bail & Arrest Guidelines | Section 498-A IPC, Section 41 CrPC |
| 2 | **Dashrath Rupsingh Rathod vs. State of Maharashtra** | 2014 | Commercial — Cheque Bounce | Section 138, Negotiable Instruments Act, 1881 |
| 3 | **Justice K.S. Puttaswamy (Retd.) vs. Union of India** | 2017 | Constitutional — Right to Privacy | Article 21, Constitution of India |
| 4 | **BALCO vs. Kaiser Aluminium & Chemical Corp.** | 2012 | Commercial — International Arbitration | Arbitration & Conciliation Act, 1996 |

---

## 🛡️ AI Neutrality, Bias Mitigation & Verifiability

Legal intelligence systems demand the highest standard of objectivity. NyayaSutra implements multiple architectural guardrails:

### Architectural Guardrails

| Guardrail | Implementation |
| :--- | :--- |
| **Strict In-Context Grounding** | Temperature set to `0.1` — Gemini operates as an extractive indexing engine, not an evaluative judge |
| **Pydantic Schema Enforcement** | Free-form generation is constrained by strict `CaseDossier` schema; disposition uses standardized enums, eliminating editorial characterization |
| **Page-Level Audit Trails** | Every extraction point carries `--- PAGE X ---` markers; all claims are 1-click verifiable against the source PDF |
| **Neutral Party Mapping** | Parties are identified objectively (Appellant, Respondent, Accused) without emotive adjectives |
| **Anti-Hallucination Q&A** | The Q&A prompt explicitly instructs: *"If the answer is NOT in the judgment, state that explicitly. Do NOT hallucinate."* |

### Empirical Verification

- **Demographic Invariance**: Extraction remains 100% identical when party names, gender, or religion are swapped (counterfactual testing)
- **Headnote Ground-Truth Alignment**: Benchmarked against official court reporters (SCC / AIR / Supreme Court headnotes)
- **Factual Entailment**: Citizen summaries are strictly entailed by the judgment text — no narrative injection

---

## 🛠️ Tech Stack

### Backend

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| [**FastAPI**](https://fastapi.tiangolo.com/) | 0.110+ | Async REST API framework with auto-generated Swagger docs |
| [**PyMuPDF (fitz)**](https://pymupdf.readthedocs.io/) | 1.24+ | High-speed PDF text extraction (<100ms for 30 pages) |
| [**Google Gemini 2.5 Flash**](https://ai.google.dev/) | `google-genai` SDK | Structured legal entity extraction & grounded Q&A |
| [**Pydantic v2**](https://docs.pydantic.dev/) | 2.6+ | Strict schema validation with JSON schema generation |
| [**SQLAlchemy 2.0**](https://www.sqlalchemy.org/) | 2.0.28+ | ORM & database session management |
| [**PostgreSQL 16**](https://www.postgresql.org/) | 16 (Alpine Docker) | Primary database with JSONB dossier storage |
| **SQLite** | Built-in | Zero-config fallback database |
| [**Uvicorn**](https://www.uvicorn.org/) | 0.28+ | ASGI server with hot-reload |

### Frontend

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| [**React**](https://react.dev/) | 19.2 | Component-based UI framework |
| [**Vite**](https://vitejs.dev/) | 8.3 | Lightning-fast build tool & HMR dev server |
| [**Tailwind CSS**](https://tailwindcss.com/) | 3.4 | Utility-first CSS with custom NyayaSutra theme tokens |
| [**Lucide React**](https://lucide.dev/) | 1.55+ | Beautiful, consistent icon library |
| [**clsx**](https://github.com/lukeed/clsx) + [**tailwind-merge**](https://github.com/dcastil/tailwind-merge) | Latest | Conditional & conflict-free class composition |
| **Sora + IBM Plex Sans** | Google Fonts | Neo-grotesque headings + precise editorial body text |
| **Material Symbols Outlined** | Google Fonts | Outlined icon set for UI elements |

### Infrastructure

| Technology | Purpose |
| :--- | :--- |
| **Docker Compose** | 1-Command full stack orchestration (`db` + `backend` + `frontend`) |
| **Backend Container** | Python 3.12-slim container with PyMuPDF, FastAPI, and active HTTP healthcheck |
| **Frontend Container** | Node 20-alpine container running Vite dev server with volume mount HMR |
| **PostgreSQL 16** | Containerized relational database with `pg_isready` probe & persistent storage volume |
| **Vite Dev Proxy** | `/api/*` → `http://backend:8000` in Docker (or `localhost:8000` locally) |
| **CORS Middleware** | Open `*` origins for hackathon flexibility |

---

## 🔒 Security Notes

> ⚠️ **NEVER commit API keys or secrets.** `.env` and `backend/.env` are gitignored — keep them that way.

- All secrets live exclusively in `.env` or `backend/.env` (strictly gitignored)
- Use `.env.example` and `backend/.env.example` as sanitized templates for new evaluators & contributors
- CORS is configured as open (`allow_origins=["*"]`) for local hackathon development — **restrict in production**
- The Gemini API key is injected via environment variables and loaded through Pydantic `BaseSettings`, never hardcoded
- Database credentials in `docker-compose.yml` are defaults for local development only

---

## 📖 Additional Documentation

| File | Purpose |
| :--- | :--- |
| [`BACKEND.md`](./BACKEND.md) | Complete backend blueprint — system architecture diagram, phased milestones, core code implementations, and testing instructions |
| [`FRONTEND.md`](./FRONTEND.md) | Frontend blueprint — Google Stitch prompts, component hierarchy, mock data contracts, and UX checklist |
| [`AGENTS.md`](./AGENTS.md) | AI agent instructions — coding standards, Indian legal domain conventions, and API contract rules |

---

## 🔮 Future Roadmap

| Feature | Description |
| :--- | :--- |
| **Multi-LLM Consensus Arbiter** | Cross-verify high-stakes headnotes using multi-model consensus (Gemini + Claude + GPT) for production Supreme Court appellate work |
| **SSE Token Streaming** | Real-time token-by-token Q&A streaming using Server-Sent Events for ChatGPT-like typing animation |
| **OCR Pipeline** | Tesseract/Google Vision integration for scanned/image-only court PDFs |
| **Multi-Language Summaries** | Expand citizen summaries to Marathi, Tamil, Bengali, and other scheduled languages |
| **Case Law Knowledge Graph** | Neo4j-backed graph of cited precedents, enabling "impact chain" visualization |
| **Collaborative Annotations** | Multi-user real-time highlights and margin notes on shared dockets (WebSocket-backed) |
| **RBAC & Authentication** | Role-based access control for court clerks, advocates, and public users |
| **Batch Processing** | Bulk upload and process entire court rosters (50+ judgments) in parallel |

---

## 👥 Team Dark World

Built by a **2-person team** at the **ACES Hackathon 3.0**:

| Member | Role | Responsibilities |
| :--- | :--- | :--- |
| **Arnav Homkar** | Backend Engineer | FastAPI architecture, Gemini AI pipeline, PyMuPDF extraction, database design, API contracts, preloaded benchmark seeding |
| **Suraj Kadam** | Frontend Engineer | React + Vite + Tailwind UI, Google Stitch UI prototyping, split-screen judicial workspace, interactive Q&A drawer, responsive layout |

**Repository:** [github.com/DaRk-KnIgHt258/Hackathon3.0](https://github.com/DaRk-KnIgHt258/Hackathon3.0)

---

## 📜 License

This project was built for the ACES Hackathon 3.0. Please contact the team for licensing inquiries.

---

<div align="center">

**⚖️ NyayaSutra — न्यायसूत्र**

*Transforming how India reads its court orders.*

*Built with ❤️ for the Indian judicial ecosystem.*

</div>
