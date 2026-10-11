/**
 * NyayaSutra Frontend API Service
 *
 * Centralises all communication with the FastAPI backend.
 * Base URL: http://localhost:8000  (override via VITE_API_BASE_URL env var)
 *
 * Endpoints:
 *   POST /api/document/analyze       → upload PDF, returns AnalyzeResponse
 *   GET  /api/cases                  → list all cases (paginated)
 *   GET  /api/cases/samples          → 4 preloaded landmark benchmark cases
 *   GET  /api/cases/{case_id}        → single full CaseDossier
 *   POST /api/cases/{case_id}/ask    → grounded Q&A against judgment text
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// ---------------------------------------------------------------------------
// Low-level fetch helper
// ---------------------------------------------------------------------------

async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      // Don't set Content-Type for FormData – browser sets multipart boundary
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let detail = `HTTP ${response.status}`;
    try {
      const err = await response.json();
      detail = err.detail || detail;
    } catch (_) {
      // ignore JSON parse failure
    }
    throw new Error(detail);
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// POST /api/document/analyze
// ---------------------------------------------------------------------------

/**
 * Upload a PDF file for Gemini Flash extraction.
 * @param {File} file - The PDF file object from a file input / drop zone.
 * @returns {Promise<AnalyzeResponse>} { case_id, dossier, total_pages, processing_time_ms }
 */
export async function analyzeDocument(file) {
  const formData = new FormData();
  formData.append('file', file);
  return apiFetch('/api/document/analyze', {
    method: 'POST',
    body: formData,
  });
}

// ---------------------------------------------------------------------------
// GET /api/cases/samples
// ---------------------------------------------------------------------------

/**
 * Fetch the 4 preloaded landmark Indian benchmark cases (instant, no LLM).
 * @returns {Promise<SampleCase[]>} Array of { case_id, title, description, court, year, topic }
 */
export async function fetchSampleCases() {
  return apiFetch('/api/cases/samples');
}

// ---------------------------------------------------------------------------
// GET /api/cases
// ---------------------------------------------------------------------------

/**
 * List all processed cases, newest first.
 * @param {{ limit?: number, offset?: number }} params
 * @returns {Promise<CaseListResponse>} { cases: CaseListItem[], total: number }
 */
export async function fetchCases({ limit = 20, offset = 0 } = {}) {
  return apiFetch(`/api/cases?limit=${limit}&offset=${offset}`);
}

// ---------------------------------------------------------------------------
// GET /api/cases/{case_id}
// ---------------------------------------------------------------------------

/**
 * Retrieve a full CaseDossier by its ID.
 * @param {string} caseId
 * @returns {Promise<AnalyzeResponse>} { case_id, dossier, total_pages, processing_time_ms }
 */
export async function fetchCase(caseId) {
  return apiFetch(`/api/cases/${encodeURIComponent(caseId)}`);
}

// ---------------------------------------------------------------------------
// POST /api/cases/{case_id}/ask
// ---------------------------------------------------------------------------

/**
 * Ask a legal question grounded in the judgment text.
 * @param {string} caseId
 * @param {string} question - The legal question (min 5 chars)
 * @returns {Promise<AskResponse>} { question, answer, case_id }
 */
export async function askCase(caseId, question) {
  return apiFetch(`/api/cases/${encodeURIComponent(caseId)}/ask`, {
    method: 'POST',
    body: JSON.stringify({ question }),
  });
}

// ---------------------------------------------------------------------------
// Health check (optional – used by App on startup)
// ---------------------------------------------------------------------------

/**
 * Ping the backend to check if it's reachable.
 * @returns {Promise<boolean>}
 */
export async function isBackendAlive() {
  try {
    const target = BASE_URL || 'http://localhost:8000';
    const res = await fetch(`${target}/api/cases/samples`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000),
    });
    return res.ok;
  } catch (_) {
    return false;
  }
}
