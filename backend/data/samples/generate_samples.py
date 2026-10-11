import pymupdf as fitz
from pathlib import Path

DATA_DIR = Path(__file__).parent

def create_pdf(filename: str, header: str, pages: list[str]):
    doc = fitz.open()
    for idx, page_text in enumerate(pages):
        page = doc.new_page(width=595, height=842) # standard A4
        text_content = f"{header} - Page {idx + 1}\n" + ("=" * 45) + "\n\n" + page_text.strip()
        page.insert_text((50, 60), text_content, fontsize=10, fontname="helv")
    
    out_path = DATA_DIR / filename
    doc.save(str(out_path))
    doc.close()
    print(f"Generated: {out_path}")

# Case 1: Arnesh Kumar Bail Guidelines (Criminal)
arnesh_p1 = """
REPORTABLE
IN THE SUPREME COURT OF INDIA
CRIMINAL APPELLATE JURISDICTION
CRIMINAL APPEAL NO. 1277 OF 2014

Arnesh Kumar                                 ... Appellant
                              VERSUS
State of Bihar & Anr.                         ... Respondents

CORAM:
HON'BLE MR. JUSTICE CHANDRAMAULI KR. PRASAD
HON'BLE MR. JUSTICE PINAKI CHANDRA GHOSE

JUDGMENT
Chandramauli Kr. Prasad, J.

1. The petitioner apprehends arrest in a case registered under Section 498-A of the Indian Penal Code, 1860 (hereinafter referred to as 'IPC') and Section 4 of the Dowry Prohibition Act, 1961. The appellant applied for anticipatory bail under Section 438 CrPC before the High Court of Judicature at Patna, which was dismissed by order dated 17.04.2014.

2. Arrest brings humiliation, curtails freedom and casts scars forever. Law makers know it so also the police. No arrest can be made in a routine manner on a mere allegation of commission of an offence made against a person. It would be prudent and desirable that a police officer does not make arrests routinely without assessing the necessity under Section 41 CrPC.
"""

arnesh_p2 = """
3. Section 41 of the Code of Criminal Procedure, 1973 (CrPC) clearly mandates that police officers must record reasons in writing while making an arrest where the offence carries imprisonment for a term which may be less than seven years or may extend to seven years.

4. Notice of appearance under Section 41-A CrPC must be served on the accused within two weeks from the date of institution of the case, and failure to comply with Section 41 and 41-A CrPC shall render the police officer liable for contempt of court as well as departmental action.

5. Furthermore, Judicial Magistrates authorizing detention under Section 167 CrPC must not act mechanically without recording satisfaction on the police officer's report.

6. In view of the above reasons, this criminal appeal is ALLOWED. The appellant is granted interim protection from arrest subject to cooperation with the investigating agency.
"""

# Case 2: Commercial Cheque Bounce (Section 138 NI Act)
dashrath_p1 = """
REPORTABLE
IN THE SUPREME COURT OF INDIA
CRIMINAL APPELLATE JURISDICTION
CRIMINAL APPEAL NO. 2287 OF 2009

Dashrath Rupsingh Rathod                     ... Appellant
                              VERSUS
State of Maharashtra & Anr.                   ... Respondents

CORAM:
HON'BLE MR. JUSTICE T.S. THAKUR
HON'BLE MR. JUSTICE VIKRAMAJIT SEN
HON'BLE MR. JUSTICE C. NAGAPPAN

JUDGMENT
T.S. Thakur, J.

1. This appeal raises an important question of territorial jurisdiction concerning trials for offences under Section 138 of the Negotiable Instruments Act, 1881 (NI Act).

2. The cheque in question for Rs. 5,00,000/- was drawn on the State Bank of India, Nariman Point Branch, Mumbai. The cheque was presented for clearance through the drawee bank and was returned unpaid due to 'Funds Insufficient'.
"""

dashrath_p2 = """
3. The complainant instituted proceedings before the Judicial Magistrate First Class at Nagpur under Section 138 read with Section 142 of the Negotiable Instruments Act, 1881. The appellant raised preliminary objection citing Section 177 of the Code of Criminal Procedure, 1973.

4. Clarifying the law laid down in K. Bhaskaran vs. Sankaran Vaidhyan Balan, this three-judge bench holds that territorial jurisdiction under Section 138 NI Act is restricted to the court within whose local jurisdiction the drawee bank branch is situated.

5. The appeal is ALLOWED. The complaint is directed to be returned for presentation before the competent court at Mumbai having territorial jurisdiction.
"""

if __name__ == "__main__":
    create_pdf("arnesh_kumar_bail_order.pdf", "SUPREME COURT OF INDIA", [arnesh_p1, arnesh_p2])
    create_pdf("dashrath_rupsingh_cheque_bounce.pdf", "SUPREME COURT OF INDIA", [dashrath_p1, dashrath_p2])
