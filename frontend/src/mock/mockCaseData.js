/**
 * NyayaSutra Benchmark Indian Landmark Cases
 * Pre-seeded for fail-safe, zero-latency demos and high-fidelity testing.
 * Aligned with backend/data/preloaded_cases.json and BACKEND.md specifications.
 */

export const MOCK_CASES = [
  {
    id: "sample_arnesh_kumar",
    title: "Arnesh Kumar vs. State of Bihar & Anr.",
    case_number: "Criminal Appeal No. 1277 of 2014",
    court: "Supreme Court of India",
    date: "July 2, 2014",
    coram: ["Hon'ble Justice Chandramauli Kumar Prasad", "Hon'ble Justice Pinaki Chandra Ghose"],
    petitioner: "Arnesh Kumar",
    respondent: "State of Bihar & Anr.",
    case_type: "CRIMINAL",
    disposition: {
      status: "ALLOWED",
      badge_color: "emerald",
      verdict_text: "Mandatory Arrest Guidelines Formulated / Bail Safeguards Issued"
    },
    statutes_cited: [
      {
        act: "Indian Penal Code, 1860",
        section: "Section 498-A",
        description: "Husband or relative of husband subjecting woman to cruelty.",
        context_in_case: "Appellant apprehended arrest under S.498-A IPC on spouse's complaint; Court assessed whether mechanical arrest was warranted.",
        page_ref: "Page 1, Para 1"
      },
      {
        act: "Code of Criminal Procedure, 1973",
        section: "Section 41 & 41(1)(b)",
        description: "Police arrest powers without warrant – mandatory written satisfaction checklist.",
        context_in_case: "Police officers must satisfy statutory necessity checklist before detaining accused in offences punishable up to 7 years.",
        page_ref: "Page 2, Para 3"
      },
      {
        act: "Code of Criminal Procedure, 1973",
        section: "Section 41-A",
        description: "Notice of appearance before police officer in lieu of mandatory arrest.",
        context_in_case: "Mandatory issuance of notice of appearance within two weeks of FIR registration; non-compliance triggers contempt of court.",
        page_ref: "Page 2, Para 4"
      },
      {
        act: "Code of Criminal Procedure, 1973",
        section: "Section 167",
        description: "Judicial remand and detention authorization by Magistrates.",
        context_in_case: "Magistrates must independently evaluate police checklist rather than authorising routine detention mechanically.",
        page_ref: "Page 2, Para 5"
      }
    ],
    precedents_cited: [
      { title: "Joginder Kumar vs. State of U.P. (1994) 4 SCC 260", relation: "Followed", note: "Arrest cannot be made merely because it is lawful for the officer to do so." },
      { title: "D.K. Basu vs. State of West Bengal (1997) 1 SCC 416", relation: "Followed", note: "Procedural safeguards to protect personal liberty and prevent custodial excesses." },
      { title: "Lalita Kumari vs. Govt. of U.P. (2014) 2 SCC 1", relation: "Cited", note: "Mandatory registration of FIR and preliminary inquiries in matrimonial matters." }
    ],
    lawyer_headnote: "RATIO DECIDENDI – The power to arrest is not a duty to arrest. Section 41 CrPC imposes a checklist that a police officer must satisfy and record in writing before arresting an accused in cognisable offences punishable up to 7 years. A Judicial Magistrate authorising detention under Section 167 must independently satisfy himself of compliance with Section 41. Mechanical authorisation of custody violates Article 21, and defaulting officers shall face departmental action and contempt of court.",
    citizen_summary_en: "The Supreme Court ruled that the police cannot automatically arrest someone just because a dowry or domestic cruelty complaint is filed under Section 498-A. Before arresting, the police officer must fill out a specific checklist and write down valid reasons. The magistrate must inspect those reasons before sending anyone to jail. If police break these guidelines, they face disciplinary action and contempt of court.",
    citizen_summary_hi: "सुप्रीम कोर्ट ने स्पष्ट फैसला सुनाया कि पुलिस केवल दहेज या घरेलू उत्पीड़न (धारा 498-ए) की शिकायत होने पर किसी को तुरंत गिरफ्तार नहीं कर सकती। गिरफ्तारी से पहले अधिकारी को तय नियमों की जाँच सूची भरनी होगी और लिखित कारण देने होंगे। मजिस्ट्रेट को भी बिना समीक्षा के जेल भेजने की अनुमति नहीं देनी होगी।",
    key_facts: [
      "Appellant married Respondent in 2007; matrimonial dispute escalated to dowry demand allegations.",
      "High Court of Patna rejected anticipatory bail on 17.04.2014 without evaluating necessity of arrest.",
      "Supreme Court examined widespread misuse of Section 498-A IPC as a tool of harassment.",
      "Apex Court framed 9 nationwide directions binding all State Governments and High Courts."
    ],
    pages: [
      {
        pageNumber: 1,
        header: "IN THE SUPREME COURT OF INDIA (CRIMINAL APPELLATE JURISDICTION)",
        paragraphs: [
          {
            num: 1,
            text: "The petitioner apprehends arrest in a case registered under Section 498-A of the Indian Penal Code, 1860 (hereinafter referred to as 'IPC') and Section 4 of the Dowry Prohibition Act, 1961. The appellant applied for anticipatory bail under Section 438 CrPC before the High Court of Judicature at Patna, which was dismissed by order dated 17.04.2014.",
            highlight: false
          },
          {
            num: 2,
            text: "Arrest brings humiliation, curtails freedom and casts scars forever. Law makers know it, so also the police. No arrest can be made in a routine manner on a mere allegation of commission of an offence made against a person. It would be prudent and desirable that a police officer does not make arrests routinely without assessing the necessity under Section 41 CrPC.",
            highlight: true,
            tag: "Pivotal Observation"
          }
        ]
      },
      {
        pageNumber: 2,
        header: "MANDATORY STATUTORY DIRECTIONS & DISPOSITION",
        paragraphs: [
          {
            num: 3,
            text: "Section 41 of the Code of Criminal Procedure, 1973 (CrPC) clearly mandates that police officers must record reasons in writing while making an arrest where the offence carries imprisonment for a term which may be less than seven years or may extend to seven years.",
            highlight: true,
            tag: "Statutory Checklist"
          },
          {
            num: 4,
            text: "Notice of appearance under Section 41-A CrPC must be served on the accused within two weeks from the date of institution of the case. Failure to comply with Section 41 and 41-A CrPC shall render the police officer liable for contempt of court as well as departmental action.",
            highlight: true,
            tag: "Section 41-A Notice"
          },
          {
            num: 5,
            text: "Furthermore, Judicial Magistrates authorising detention under Section 167 CrPC must not act mechanically without recording satisfaction on the police officer's report. In view of the above reasons, this criminal appeal is ALLOWED. The appellant is granted interim protection from arrest.",
            highlight: true,
            tag: "Ratio Decidendi"
          }
        ]
      }
    ],
    pdf_sample_url: "https://example.com/sample_arnesh_kumar.pdf"
  },
  {
    id: "sample_dashrath_rupsingh",
    title: "Dashrath Rupsingh Rathod vs. State of Maharashtra & Anr.",
    case_number: "Criminal Appeal No. 2287 of 2009",
    court: "Supreme Court of India",
    date: "August 1, 2014",
    coram: ["Hon'ble Chief Justice R.M. Lodha", "Hon'ble Justice Kurian Joseph", "Hon'ble Justice R.F. Nariman", "Hon'ble Justice T.S. Thakur"],
    petitioner: "Dashrath Rupsingh Rathod",
    respondent: "State of Maharashtra & Anr.",
    case_type: "COMMERCIAL / CRIMINAL",
    disposition: {
      status: "ALLOWED",
      badge_color: "emerald",
      verdict_text: "Territorial Jurisdiction Settled / Remanded to Drawee Bank Forum"
    },
    statutes_cited: [
      {
        act: "Negotiable Instruments Act, 1881",
        section: "Section 138",
        description: "Dishonour of cheque for insufficiency of funds in bank account.",
        context_in_case: "Primary criminal provision invoked for bounced instrument of Rs. 5,00,000/- drawn on SBI Mumbai.",
        page_ref: "Page 1, Para 2"
      },
      {
        act: "Negotiable Instruments Act, 1881",
        section: "Section 142(2)",
        description: "Cognizance of offences and place of inquiry and trial.",
        context_in_case: "Re-interpretation of cause of action locus; held that cause crystallises solely upon return of cheque by drawee bank.",
        page_ref: "Page 2, Para 4"
      },
      {
        act: "Code of Criminal Procedure, 1973",
        section: "Section 177",
        description: "Ordinary place of inquiry and trial where offence was committed.",
        context_in_case: "Offence is committed where dishonour happens, i.e., local jurisdiction of drawee bank branch.",
        page_ref: "Page 2, Para 3"
      }
    ],
    precedents_cited: [
      { title: "K. Bhaskaran vs. Sankaran Vaidhyan Balan (1999) 7 SCC 510", relation: "Overruled in Part", note: "Earlier rule permitting trial at any of five intermediate stages overruled." },
      { title: "Harman Electronics (P) Ltd vs. National Panasonic (2009) 1 SCC 720", relation: "Followed", note: "Issuance of statutory notice alone does not confer territorial jurisdiction." }
    ],
    lawyer_headnote: "RATIO DECIDENDI – The three-judge bench overruled K. Bhaskaran and held that the 'cause of action' under Section 138 NI Act crystallises only at the place where the drawee bank returns the cheque unpaid. Therefore, exclusive territorial jurisdiction vests in the court within whose jurisdiction the bank on which the cheque is drawn (drawee bank) is situated. Complaints filed elsewhere must be returned for presentation before the competent court.",
    citizen_summary_en: "If a cheque given to you bounces, you can only file a court case in the city where the issuer's bank branch is located (where the cheque was dishonoured). You cannot file the case in your own hometown merely because you deposited the cheque there.",
    citizen_summary_hi: "यदि किसी व्यक्ति का चेक बाउंस हो जाता है, तो कानूनी मुकदमा केवल उसी बैंक शाखा के अधिकार क्षेत्र वाली अदालत में दर्ज किया जा सकता है जहाँ का वह चेक था। केवल अपने शहर में चेक जमा करने के आधार पर वहाँ मुकदमा दर्ज नहीं हो सकता।",
    key_facts: [
      "Cheque for Rs. 5,00,000/- drawn on SBI Nariman Point Branch, Mumbai.",
      "Complainant deposited cheque in Nagpur and instituted complaint before Judicial Magistrate at Nagpur.",
      "Accused challenged Nagpur court's territorial jurisdiction under CrPC Section 177.",
      "Supreme Court resolved nationwide split on multiple jurisdictional forums under Section 138."
    ],
    pages: [
      {
        pageNumber: 1,
        header: "IN THE SUPREME COURT OF INDIA (COMMERCIAL APPELLATE JURISDICTION)",
        paragraphs: [
          {
            num: 1,
            text: "This appeal raises a question of momentous significance concerning the territorial jurisdiction of Magistrate Courts in trials for offences under Section 138 of the Negotiable Instruments Act, 1881 (hereinafter referred to as the 'NI Act').",
            highlight: false
          },
          {
            num: 2,
            text: "The cheque in question for Rs. 5,00,000/- was drawn on the State Bank of India, Nariman Point Branch, Mumbai. The instrument was returned unpaid on presentation with the endorsement 'Funds Insufficient'.",
            highlight: false
          }
        ]
      },
      {
        pageNumber: 2,
        header: "RATIO DECIDENDI & JURISDICTION RULING",
        paragraphs: [
          {
            num: 3,
            text: "The complainant instituted proceedings before the Judicial Magistrate First Class at Nagpur. Clarifying the law laid down in K. Bhaskaran vs. Sankaran Vaidhyan Balan, this bench holds that territorial jurisdiction under Section 138 NI Act is restricted to the court within whose local jurisdiction the drawee bank branch is situated.",
            highlight: true,
            tag: "Overruled K. Bhaskaran"
          },
          {
            num: 4,
            text: "The offence under Section 138 is committed at the exact place where the dishonour takes place. The appeal is ALLOWED. The complaint is directed to be returned for presentation before the competent court at Mumbai having territorial jurisdiction.",
            highlight: true,
            tag: "Operative Order"
          }
        ]
      }
    ],
    pdf_sample_url: "https://example.com/sample_dashrath.pdf"
  },
  {
    id: "sample_puttaswamy",
    title: "Justice K.S. Puttaswamy (Retd.) vs. Union of India & Ors.",
    case_number: "Writ Petition (Civil) No. 494 of 2012",
    court: "Supreme Court of India",
    date: "August 24, 2017",
    coram: [
      "Chief Justice J.S. Khehar",
      "Justice J. Chelameswar",
      "Justice S.A. Bobde",
      "Justice R.K. Agrawal",
      "Justice R.F. Nariman",
      "Justice A.M. Sapre",
      "Justice D.Y. Chandrachud",
      "Justice S.K. Kaul",
      "Justice S. Abdul Nazeer"
    ],
    petitioner: "Justice K.S. Puttaswamy (Retd.) & Ors.",
    respondent: "Union of India & Ors.",
    case_type: "CONSTITUTIONAL",
    disposition: {
      status: "ALLOWED",
      badge_color: "emerald",
      verdict_text: "Unanimous 9-Judge Bench: Right to Privacy Upheld as Fundamental Right"
    },
    statutes_cited: [
      {
        act: "Constitution of India",
        section: "Article 21",
        description: "Protection of life and personal liberty.",
        context_in_case: "Privacy recognized as an intrinsic, inalienable facet of dignity and personal liberty under Article 21.",
        page_ref: "Page 1, Para 2"
      },
      {
        act: "Constitution of India",
        section: "Article 14",
        description: "Right to equality and non-arbitrariness in state action.",
        context_in_case: "State intrusion into privacy must be non-discriminatory and satisfy strict test of non-arbitrariness.",
        page_ref: "Page 2, Para 4"
      },
      {
        act: "Constitution of India",
        section: "Article 19",
        description: "Protection of core fundamental freedoms (speech, movement, conscience).",
        context_in_case: "Informational privacy enables citizens to exercise speech and autonomy free from state surveillance.",
        page_ref: "Page 2, Para 4"
      }
    ],
    precedents_cited: [
      { title: "M.P. Sharma vs. Satish Chandra (1954) SCR 1077", relation: "Overruled in Part", note: "8-judge bench observation denying fundamental right to privacy expressly overruled." },
      { title: "Kharak Singh vs. State of U.P. (1964) 1 SCR 332", relation: "Overruled in Part", note: "Domiciliary night visits held unconstitutional; earlier rejection of privacy overruled." },
      { title: "Maneka Gandhi vs. Union of India (1978) 1 SCC 248", relation: "Followed", note: "Golden triangle test uniting Articles 14, 19, and 21 applied to privacy." },
      { title: "Gobind vs. State of Madhya Pradesh (1975) 2 SCC 148", relation: "Followed", note: "Privacy can only be curtailed on showing of compelling state interest." }
    ],
    lawyer_headnote: "RATIO DECIDENDI – Privacy is not merely a statutory or common-law right; it is a constitutionally guaranteed fundamental right inhering in Articles 14, 19 and 21 of the Constitution. It encompasses decisional autonomy, bodily integrity, and informational privacy. Any State encroachment must satisfy the 4-fold test: (1) Legality (valid law), (2) Legitimate state goal, (3) Proportionality, and (4) Procedural safeguards. Decisions in M.P. Sharma and Kharak Singh are overruled to the extent they held privacy is not a fundamental right.",
    citizen_summary_en: "In a historic unanimous decision, nine Supreme Court judges declared that Privacy is your fundamental constitutional right—just like your right to life or free speech. The government cannot collect, monitor, or use your personal biometric or digital information without a lawful reason, strict safeguards, and proportionality.",
    citizen_summary_hi: "सुप्रीम कोर्ट के 9 जजों की संविधान पीठ ने सर्वसम्मति से फैसला दिया कि निजता (Privacy) प्रत्येक नागरिक का मौलिक अधिकार है। सरकार बिना किसी वैध कानून, उचित कारण और सुरक्षा नियमों के आपकी निजी या डिजिटल जानकारी एकत्र या निगरानी नहीं कर सकती।",
    key_facts: [
      "Former High Court Judge K.S. Puttaswamy challenged mandatory Aadhaar biometric integration.",
      "Union of India argued Constitution framers intentionally omitted privacy as a fundamental right.",
      "9-Judge Constitution Bench convened to reconcile conflicting precedents spanning 60 years.",
      "Benchmark test laid down for India's Digital Personal Data Protection legislation."
    ],
    pages: [
      {
        pageNumber: 1,
        header: "IN THE SUPREME COURT OF INDIA (CONSTITUTION BENCH - 9 JUDGES)",
        paragraphs: [
          {
            num: 1,
            text: "The reference to this nine-judge Constitution Bench was occasioned by doubts expressed over the correctness of previous decisions in M.P. Sharma (1954) by an eight-judge bench and Kharak Singh (1962) by a six-judge bench regarding whether the Constitution guarantees a fundamental right to privacy.",
            highlight: false
          },
          {
            num: 2,
            text: "Privacy is the constitutional core of human dignity. It is an intrinsic facet of the right to life and personal liberty enshrined under Article 21 and inures throughout the freedoms safeguarded by Part III of the Constitution.",
            highlight: true,
            tag: "Core Doctrine"
          }
        ]
      },
      {
        pageNumber: 2,
        header: "PROPORTIONALITY TEST & HISTORIC OVERRULING",
        paragraphs: [
          {
            num: 3,
            text: "The decisions in M.P. Sharma and Kharak Singh to the extent that they hold that the right to privacy is not protected by the Constitution stand expressly overruled.",
            highlight: true,
            tag: "Historic Overruling"
          },
          {
            num: 4,
            text: "An invasion of life or personal liberty must meet the threefold requirement of: (i) legality, which postulates the existence of law; (ii) need, defined in terms of a legitimate state aim; and (iii) proportionality which ensures a rational nexus between the objects and the means adopted. The writ petition is accordingly ALLOWED.",
            highlight: true,
            tag: "4-Fold Proportionality Test"
          }
        ]
      }
    ],
    pdf_sample_url: "https://example.com/sample_puttaswamy.pdf"
  },
  {
    id: "sample_balco",
    title: "Bharat Aluminium Co. (BALCO) vs. Kaiser Aluminium & Chemical Corp.",
    case_number: "Civil Appeal No. 7019 of 2005",
    court: "Supreme Court of India",
    date: "September 6, 2012",
    coram: [
      "Hon'ble Justice S.H. Kapadia (CJI)",
      "Hon'ble Justice D.K. Jain",
      "Hon'ble Justice S.S. Nijjar",
      "Hon'ble Justice Ranjana Prakash Desai",
      "Hon'ble Justice J.S. Khehar"
    ],
    petitioner: "Bharat Aluminium Co. (BALCO) & Ors.",
    respondent: "Kaiser Aluminium & Chemical Corp. & Ors.",
    case_type: "COMMERCIAL ARBITRATION",
    disposition: {
      status: "DISMISSED",
      badge_color: "coral",
      verdict_text: "5-Judge Bench: Part I Inapplicable to Foreign-Seated Arbitrations (Bhatia Overruled)"
    },
    statutes_cited: [
      {
        act: "Arbitration and Conciliation Act, 1996",
        section: "Part I (Sections 1-43)",
        description: "Domestic arbitration provisions governing arbitrations seated in India.",
        context_in_case: "Held that Part I applies exclusively where the arbitration seat is in India; cannot be extended to foreign seats.",
        page_ref: "Page 1, Para 2"
      },
      {
        act: "Arbitration and Conciliation Act, 1996",
        section: "Section 2(2)",
        description: "Territorial scope of the Arbitration Act.",
        context_in_case: "Literal interpretation reaffirmed: Part I shall apply only where place of arbitration is in India.",
        page_ref: "Page 2, Para 3"
      },
      {
        act: "Arbitration and Conciliation Act, 1996",
        section: "Section 9 & Section 34",
        description: "Interim measures by Indian courts and applications for setting aside arbitral awards.",
        context_in_case: "Indian courts have NO jurisdiction to grant interim relief (S.9) or set aside awards (S.34) for foreign-seated arbitrations.",
        page_ref: "Page 2, Para 4"
      }
    ],
    precedents_cited: [
      { title: "Bhatia International vs. Bulk Trading S.A. (2002) 4 SCC 105", relation: "Overruled", note: "Judicial expansion of Part I to foreign arbitrations overruled as contrary to statute." },
      { title: "Venture Global Engineering vs. Satyam Computer Services (2008) 4 SCC 190", relation: "Overruled", note: "Setting aside foreign arbitral award under Section 34 overruled." }
    ],
    lawyer_headnote: "RATIO DECIDENDI – A five-judge Constitution Bench overruled Bhatia International and held that Part I of the Arbitration and Conciliation Act, 1996 has no application to arbitrations seated outside India. Indian courts possess no supervisory jurisdiction to grant interim measures under Section 9, appoint arbitrators under Section 11, or set aside awards under Section 34 in respect of foreign-seated arbitrations. The seat of arbitration functions as the legal center of gravity.",
    citizen_summary_en: "If two companies agree to settle their business disputes through arbitration outside India (for example in London or Singapore), Indian courts cannot interfere or change the decision. India's domestic arbitration rules only apply when the arbitration is held inside India.",
    citizen_summary_hi: "यदि दो कम्पनियाँ भारत से बाहर (जैसे लंदन या सिंगापुर में) मध्यस्थता से विवाद निपटाने का अनुबंध करती हैं, तो भारतीय अदालतें उस विदेशी मध्यस्थता में दखल नहीं दे सकतीं। भारत का मध्यस्थता कानून केवल भारत में होने वाली मध्यस्थता पर लागू होता है।",
    key_facts: [
      "Agreement for supply of technical know-how between BALCO and Kaiser provided for arbitration in England under English law.",
      "Disputes arose and arbitral tribunal in London rendered awards.",
      "BALCO filed application under Section 34 in District Court Bilaspur to set aside foreign awards relying on Bhatia International.",
      "Supreme Court constituted 5-Judge Constitution Bench to re-examine extra-territorial application of Part I."
    ],
    pages: [
      {
        pageNumber: 1,
        header: "IN THE SUPREME COURT OF INDIA (CIVIL APPELLATE JURISDICTION)",
        paragraphs: [
          {
            num: 1,
            text: "A five-judge Constitution Bench was constituted to examine the correctness of the law laid down in Bhatia International vs. Bulk Trading S.A. and Venture Global Engineering vs. Satyam Computer Services Ltd.",
            highlight: false
          },
          {
            num: 2,
            text: "The fundamental question is whether Part I of the Arbitration and Conciliation Act, 1996 applies to an international commercial arbitration where the place or seat of arbitration is outside India.",
            highlight: false
          }
        ]
      },
      {
        pageNumber: 2,
        header: "SEAT OF ARBITRATION & PROSPECTIVE OVERRULING",
        paragraphs: [
          {
            num: 3,
            text: "Section 2(2) of the Arbitration Act explicitly declares that Part I shall apply where the place of arbitration is in India. We are unable to accept the conclusion in Bhatia International that Part I applies to all arbitrations unless parties expressly or impliedly exclude it.",
            highlight: true,
            tag: "Overruled Bhatia International"
          },
          {
            num: 4,
            text: "Indian courts have no supervisory jurisdiction over foreign-seated arbitrations. No interim relief under Section 9 or petition under Section 34 can be entertained. The appeal filed by BALCO is DISMISSED.",
            highlight: true,
            tag: "Final Disposition: Dismissed"
          }
        ]
      }
    ],
    pdf_sample_url: "https://example.com/sample_balco.pdf"
  }
];

/**
 * Universal Case Normalizer
 * Bridges backend REST API format (disposition_status, verdict_summary, judgment_date)
 * and frontend component props seamlessly.
 */
export function normalizeCase(c) {
  if (!c) return MOCK_CASES[0];

  const dispositionStatus = c.disposition?.status || c.disposition_status || "ALLOWED";
  
  // Map legal disposition to semantic color variant
  let badgeColor = c.disposition?.badge_color;
  if (!badgeColor) {
    if (["ALLOWED", "BAIL_GRANTED"].includes(dispositionStatus)) {
      badgeColor = "emerald";
    } else if (["DISMISSED", "BAIL_REJECTED"].includes(dispositionStatus)) {
      badgeColor = "coral";
    } else {
      badgeColor = "amber";
    }
  }

  const verdictText = c.disposition?.verdict_text || c.verdict_summary || "Operative order pronounced.";
  const date = c.date || c.judgment_date || "Date of Order";
  const caseType = c.case_type || "APPELLATE";

  return {
    id: c.id || c.case_id || "case_unknown",
    title: c.title || "Court Judgment Order",
    case_number: c.case_number || "Appeal / Petition",
    court: c.court || "Supreme Court of India",
    date,
    judgment_date: date,
    coram: Array.isArray(c.coram) ? c.coram : (c.coram ? [c.coram] : ["Hon'ble Bench"]),
    petitioner: c.petitioner || c.title?.split(" vs.")[0]?.trim() || "Petitioner",
    respondent: c.respondent || c.title?.split(" vs.")[1]?.trim() || "Respondent",
    case_type: caseType,
    disposition: {
      status: dispositionStatus,
      badge_color: badgeColor,
      verdict_text: verdictText
    },
    statutes_cited: Array.isArray(c.statutes_cited) ? c.statutes_cited : [],
    precedents_cited: Array.isArray(c.precedents_cited)
      ? c.precedents_cited.map((p) => (typeof p === "string" ? { title: p, relation: "Cited", note: "Case Law Reference" } : p))
      : [],
    key_facts: Array.isArray(c.key_facts) ? c.key_facts : [
      "Matter instituted before the appellate jurisdiction.",
      "Substantial questions of statutory interpretation examined by the court.",
      "Final disposition rendered in accordance with binding legal standards."
    ],
    lawyer_headnote: c.lawyer_headnote || "Legal ratio decidendi extracted from judgment text.",
    citizen_summary_en: c.citizen_summary_en || "Plain language summary of the court's final ruling.",
    citizen_summary_hi: c.citizen_summary_hi || "न्यायालय के निर्णय का सुलभ हिंदी अनुवाद।",
    citizen_summary_mr: c.citizen_summary_mr || "",
    pages: Array.isArray(c.pages) && c.pages.length > 0 ? c.pages : [
      {
        pageNumber: 1,
        header: `IN THE ${c.court?.toUpperCase() || 'COURT'}`,
        paragraphs: [
          { num: 1, text: c.lawyer_headnote || "Order operative text and legal reasoning.", highlight: true, tag: "Key Ratio" },
          { num: 2, text: c.verdict_summary || "Directions framed accordingly.", highlight: false }
        ]
      }
    ],
    pdf_sample_url: c.pdf_sample_url || ""
  };
}
