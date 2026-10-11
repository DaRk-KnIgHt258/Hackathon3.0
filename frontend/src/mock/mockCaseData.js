export const MOCK_CASES = [
  {
    id: "case_01",
    title: "Arnesh Kumar vs. State of Bihar & Anr.",
    case_number: "Criminal Appeal No. 1277 of 2014",
    court: "Supreme Court of India",
    date: "July 2, 2014",
    coram: ["Hon'ble Justice Chandramauli Kumar Prasad", "Hon'ble Justice Pinaki Chandra Ghose"],
    disposition: {
      status: "ALLOWED",
      badge_color: "emerald",
      verdict_text: "Arrest Guidelines Mandated / Bail Safeguards Issued"
    },
    case_type: "CRIMINAL",
    statutes_cited: [
      {
        act: "Indian Penal Code, 1860",
        section: "Section 498-A",
        description: "Husband or relative of husband subjecting woman to cruelty.",
        context_in_case: "Allegations of harassment and dowry demand without preliminary inquiry."
      },
      {
        act: "Code of Criminal Procedure, 1973",
        section: "Section 41 & 41A",
        description: "Notice of appearance before police officer instead of mandatory arrest.",
        context_in_case: "Police must satisfy necessity of arrest before taking accused into custody."
      }
    ],
    lawyer_headnote: "The Supreme Court held that police officers shall not automatically arrest accused persons under Section 498-A IPC without satisfying the parameters laid down under Section 41 CrPC. Magistrates must inspect the checklist before authorizing detention.",
    citizen_summary_en: "Police cannot arrest someone automatically just because a dowry or domestic harassment complaint is filed. They must give a notice to appear first and only arrest if strictly necessary.",
    citizen_summary_hi: "पुलिस सिर्फ दहेज या उत्पीड़न की शिकायत दर्ज होने पर किसी को तुरंत गिरफ्तार नहीं कर सकती। पहले पेशी का नोटिस देना अनिवार्य है।",
    citizen_summary_mr: "हुंडा किंवा घरगुती छळाची तक्रार दाखल होताच पोलीस कोणालाही थेट अटक करू शकत नाहीत. प्रथम नोटीस देणे अनिवार्य आहे.",
    pdf_sample_url: "https://example.com/sample_arnesh_kumar.pdf",
    highlights: [
      { page: 1, text: "No arrest should be made merely because it is lawful for the police officer to do so." },
      { page: 4, text: "Notice of appearance in terms of Section 41A CrPC be served on the accused." }
    ]
  },
  {
    id: "case_02",
    title: "Dashrath Rupsingh Rathod vs. State of Maharashtra",
    case_number: "Criminal Appeal No. 2287 of 2009",
    court: "Supreme Court of India",
    date: "August 1, 2014",
    coram: ["Hon'ble Chief Justice R.M. Lodha", "Hon'ble Justice Kurian Joseph", "Hon'ble Justice R.F. Nariman"],
    disposition: {
      status: "DISPOSED OF WITH DIRECTIONS",
      badge_color: "amber",
      verdict_text: "Jurisdiction Determined / Remanded to Appropriate Forum"
    },
    case_type: "COMMERCIAL / CRIMINAL",
    statutes_cited: [
      {
        act: "Negotiable Instruments Act, 1881",
        section: "Section 138",
        description: "Dishonour of cheque for insufficiency of funds in the bank account.",
        context_in_case: "Determining where a cheque bounce complaint can be legally filed."
      }
    ],
    lawyer_headnote: "Territorial jurisdiction for initiating complaint under Section 138 NI Act lies exclusively at the place where the drawee bank is located.",
    citizen_summary_en: "If a cheque bounces, the legal case must be filed in the court where the payee's bank branch is located, not anywhere else.",
    citizen_summary_hi: "यदि चेक बाउंस होता है, तो कानूनी मामला उसी बैंक शाखा के अधिकार क्षेत्र वाली अदालत में दर्ज किया जाएगा।",
    citizen_summary_mr: "धनादेश अनादर (चेक बाउंस) प्रकरणात खटला फक्त संबंधित बँक शाखा असलेल्या न्यायालयाच्या अखत्यारीत दाखल करावा.",
    pdf_sample_url: "https://example.com/sample_dashrath.pdf",
    highlights: [
      { page: 2, text: "The presentation of the cheque is a condition precedent for fastening liability." }
    ]
  },
  {
    id: "case_03",
    title: "Amazon NV Investment Holdings vs. Future Retail Ltd.",
    case_number: "Civil Appeal Nos. 4492-4493 of 2021",
    court: "Supreme Court of India",
    date: "August 6, 2021",
    coram: ["Hon'ble Justice R.F. Nariman", "Hon'ble Justice B.R. Gavai"],
    disposition: {
      status: "ALLOWED",
      badge_color: "emerald",
      verdict_text: "Emergency Arbitrator Award Upheld as Enforceable in India"
    },
    case_type: "COMMERCIAL ARBITRATION",
    statutes_cited: [
      {
        act: "Arbitration and Conciliation Act, 1996",
        section: "Section 17(1) & 17(2)",
        description: "Interim measures ordered by an arbitral tribunal.",
        context_in_case: "Enforceability of Singapore Emergency Arbitrator interim order under Indian law."
      }
    ],
    lawyer_headnote: "An Emergency Arbitrator's award rendered under the SIAC Rules is an order under Section 17(1) of the Arbitration Act and is enforceable in India under Section 17(2).",
    citizen_summary_en: "International emergency arbitration rulings are legally binding and enforceable in India to stop unauthorized business transfers.",
    citizen_summary_hi: "अंतर्राष्ट्रीय आपातकालीन मध्यस्थता के फैसले भारत में वैध और लागू करने योग्य हैं।",
    citizen_summary_mr: "आंतरराष्ट्रीय लवाद निर्णय भारतात कायदेशीरदृष्ट्या बंधनकारक आणि लागू करण्यास पात्र आहेत.",
    pdf_sample_url: "https://example.com/sample_amazon.pdf",
    highlights: [
      { page: 7, text: "No appeal lies under Section 37 of the Arbitration Act against an enforcement order." }
    ]
  }
];
