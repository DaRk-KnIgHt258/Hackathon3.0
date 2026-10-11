"""
High-speed PDF text extraction using PyMuPDF (fitz).
Extracts text page-by-page and annotates with page markers for citation grounding.
"""
import pymupdf as fitz  # PyMuPDF (fitz API kept for compatibility)


class PDFService:
    @staticmethod
    def extract_text_with_pages(file_bytes: bytes) -> dict:
        """
        Open a PDF from bytes and extract text with per-page markers.

        Returns:
            {
                "total_pages": int,
                "pages": [{"page": int, "text": str}, ...],
                "full_text": str   # Page-annotated concatenated text
            }
        """
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        pages_content = []
        full_text_parts = []

        for idx, page in enumerate(doc):
            page_num = idx + 1
            text = page.get_text("text").strip()
            pages_content.append({"page": page_num, "text": text})
            full_text_parts.append(f"--- PAGE {page_num} ---\n{text}")

        doc.close()

        return {
            "total_pages": len(pages_content),
            "pages": pages_content,
            "full_text": "\n\n".join(full_text_parts),
        }
