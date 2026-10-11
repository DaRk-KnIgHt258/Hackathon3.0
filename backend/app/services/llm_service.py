"""
Gemini Flash legal extractor & grounded Q&A service.

Uses google-genai SDK with strict JSON schema output for structured extraction
and free-text generation for grounded Q&A.
"""
from google import genai
from google.genai import types
from app.schemas import CaseDossier
from app.config import get_settings

settings = get_settings()

# Shared prompt prefix capturing Indian legal nuances
_EXTRACTION_SYSTEM = """\
You are an expert Indian Supreme Court & High Court legal research clerk with 20 years of experience.
Analyze the following multi-page Indian court judgment carefully and extract all structured details
strictly matching the provided JSON schema.

Critical guidelines:
1. Accurately identify the FINAL operative disposition only (ALLOWED, DISMISSED, BAIL_GRANTED,
   BAIL_REJECTED, REMANDED, DISPOSED_WITH_DIRECTIONS, PARTLY_ALLOWED).
2. Distinguish core legal principle (Ratio Decidendi) from passing observations (Obiter Dicta).
3. Normalize all Indian Act abbreviations:
   - "IPC" → "Indian Penal Code, 1860"
   - "CrPC" → "Code of Criminal Procedure, 1973"
   - "BNSS" → "Bharatiya Nagarik Suraksha Sanhita, 2023"
   - "BNS"  → "Bharatiya Nyaya Sanhita, 2023"
   - "NI Act" → "Negotiable Instruments Act, 1881"
   - "Constitution" → "Constitution of India"
4. Identify ALL judges on the bench for the 'coram' list.
5. Provide jargon-free citizen summaries in BOTH English and natural, conversational Hindi.
6. The lawyer_headnote must emphasize the Ratio Decidendi and its precedential value, citing the exact page or paragraph where the principle is articulated (e.g., "[Page 3, Para 8]").
7. For every item in statutes_cited, ALWAYS specify the page_ref indicating where the statute was addressed in the judgment text (e.g. "Page 1, Para 2").
"""


class LLMService:
    def __init__(self):
        self.client = genai.Client(api_key=settings.gemini_api_key)
        self._model = "gemini-2.5-flash"

    # ── Structured Extraction ──────────────────────────────────────────────
    def extract_case_dossier(self, judgment_text: str) -> CaseDossier:
        """
        Send the raw judgment text to Gemini Flash and receive a fully-validated
        CaseDossier Pydantic model.
        """
        prompt = (
            f"{_EXTRACTION_SYSTEM}\n\n"
            f"--- JUDGMENT TEXT ---\n"
            f"{judgment_text[:50000]}"  # Stay within token budget
        )
        response = self.client.models.generate_content(
            model=self._model,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=CaseDossier,
                temperature=0.1,
            ),
        )
        return CaseDossier.model_validate_json(response.text)

    # ── Grounded Q&A ──────────────────────────────────────────────────────
    def ask_judgment(self, judgment_text: str, question: str) -> str:
        """
        Answer a question STRICTLY from the judgment text, citing exact pages/paragraphs.
        """
        prompt = f"""\
You are a precise legal research assistant. Answer the question below STRICTLY using the \
provided Indian court judgment text.

Rules:
- Cite the exact PAGE number(s) and paragraph where you found the answer.
- If the answer is NOT in the judgment, state: "This information is not mentioned in the provided judgment text."
- Do NOT hallucinate or add information from outside the judgment.
- Use formal legal language appropriate for an advocate.

Question: {question}

--- JUDGMENT TEXT ---
{judgment_text[:40000]}
"""
        response = self.client.models.generate_content(
            model=self._model,
            contents=prompt,
        )
        return response.text
