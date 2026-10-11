import React from 'react';

export const INITIAL_DOSSIERS = [
  {
    id: 'dossier_01',
    cnr: 'DHC01-094821-2023',
    title: 'Arnesh Kumar v. State of Bihar',
    citation: '(2014) 8 SCC 273',
    appealNumber: 'Criminal Appeal No. 1277/2014',
    diaryNumber: 'Diary # 44921/2023',
    court: 'Supreme Court of India',
    coram: "Hon'ble Justice S.K. Kaul & B.V. Nagarathna",
    benchType: 'Division Bench',
    disposition: 'ALLOWED - ARREST SAFEGUARDS MANDATED',
    statusBadge: (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container text-on-secondary-container border border-secondary/40 shadow-2xs">
        <span className="material-symbols-outlined text-[12px] text-secondary">verified</span> Certified Copy Ready
      </span>
    ),
    tabCategory: 'certified',
    statutes: [
      { name: 'IPC Sec 498A', badgeClass: 'bg-amber-50 text-amber-900 border-amber-200' },
      { name: 'CrPC Sec 41', badgeClass: 'bg-slate-100 text-slate-700 border-slate-200' },
    ],
    stageTitle: 'Final Order Issued',
    stageSub: 'Disposed on Merits',
    stageSubClass: 'text-emerald-700 font-medium',
    stageIcon: 'check_circle',
    registrySealTag: 'DigiSeal # SC-2024-918',
    actionLabel: 'Download Signed PDF',
    actionIcon: 'picture_as_pdf',
    actionType: 'download',
    actionBtnClass: 'bg-secondary text-primary hover:bg-[#d6b46b]',
    headnote:
      'The Supreme Court held that police officers shall not automatically arrest accused persons under Section 498-A IPC without satisfying the parameters laid down under Section 41 CrPC. Magistrates must inspect the statutory checklist before authorizing detention.',
    citizenSummaryEn:
      'Police cannot arrest someone automatically merely because a domestic cruelty complaint is filed under Section 498A. They must first serve a notice to appear under Section 41A and record written reasons before any arrest.',
    citizenSummaryHi:
      'पुलिस केवल धारा 498A के तहत घरेलू उत्पीड़न की शिकायत दर्ज होने पर आरोपी को तुरंत गिरफ्तार नहीं कर सकती। गिरफ्तारी से पहले धारा 41A का नोटिस देना और कानूनी कारणों को दर्ज करना अनिवार्य है।',
    statuteDetails: [
      {
        section: 'Section 498-A IPC',
        act: 'Indian Penal Code, 1860',
        desc: 'Husband or relative of husband subjecting woman to cruelty. Non-bailable and cognizable.',
      },
      {
        section: 'Section 41 & 41A CrPC',
        act: 'Code of Criminal Procedure, 1973',
        desc: 'Notice of appearance before police officer; arrest only in specified situations with recorded reasons.',
      },
    ],
  },
  {
    id: 'dossier_02',
    cnr: 'SCI00-019284-2022',
    title: 'K.S. Puttaswamy v. Union of India',
    citation: '(2017) 10 SCC 1',
    appealNumber: 'WP (Civil) No. 494/2012',
    diaryNumber: 'Review Diary # 1902/2022',
    court: 'Supreme Court of India',
    coram: 'Constitution Bench (9 Judges)',
    benchType: 'Constitution Bench',
    disposition: 'ALLOWED - PRIVACY AFFIRMED',
    statusBadge: (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary text-on-primary border border-secondary shadow-2xs">
        <span className="material-symbols-outlined text-[12px] text-secondary">shield</span> Disposed / Allowed
      </span>
    ),
    tabCategory: 'certified',
    statutes: [
      { name: 'Const. Art 21', badgeClass: 'bg-blue-50 text-blue-900 border-blue-200' },
      { name: 'Aadhaar Act', badgeClass: 'bg-slate-100 text-slate-700 border-slate-200' },
    ],
    stageTitle: 'Landmark Precedent',
    stageSub: 'Fundamental Right',
    stageSubClass: 'text-slate-600 font-medium',
    stageIcon: 'star',
    registrySealTag: 'Registry Seal Gold #01',
    actionLabel: 'Inspect Precedent',
    actionIcon: 'auto_stories',
    actionType: 'inspect',
    actionBtnClass: 'bg-surface border border-outline-variant hover:bg-slate-100 text-primary',
    headnote:
      'A unanimous 9-judge Constitution Bench declared the Right to Privacy an intrinsic fundamental right protected under Article 21 and Part III of the Indian Constitution, subject to proportionality.',
    citizenSummaryEn:
      'Every Indian citizen has a fundamental constitutional right to privacy regarding personal data, bodily integrity, and informational autonomy against unlawful state overreach.',
    citizenSummaryHi:
      'सर्वोच्च न्यायालय की 9-न्यायाधीशों की संविधान पीठ ने फैसला सुनाया कि निजता का अधिकार (Right to Privacy) संविधान के अनुच्छेद 21 के तहत एक मौलिक अधिकार है।',
    statuteDetails: [
      {
        section: 'Article 21',
        act: 'Constitution of India',
        desc: 'Protection of life and personal liberty; privacy declared an intrinsic facet.',
      },
      {
        section: 'Section 7 & 8',
        act: 'Aadhaar (Targeted Delivery) Act, 2016',
        desc: 'Authentication standards tested against proportionality and necessity doctrines.',
      },
    ],
  },
  {
    id: 'dossier_03',
    cnr: 'BOM02-004128-2024',
    title: 'Dashrath Rupsingh Rathod v. State of Maharashtra',
    citation: '(2014) 9 SCC 129',
    appealNumber: 'Cri. Rev. App. 441/2024',
    diaryNumber: 'CIS Bombay # 2024/901',
    court: 'Bombay High Court',
    coram: 'Division Bench (Courtroom 4)',
    benchType: 'Division Bench',
    disposition: 'PENDING HEARING',
    statusBadge: (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
        <span className="material-symbols-outlined text-[12px]">pending</span> Trial In-Progress
      </span>
    ),
    tabCategory: 'hearing',
    statutes: [
      { name: 'NI Act Sec 138', badgeClass: 'bg-red-50 text-red-900 border-red-200' },
      { name: 'CrPC Sec 177', badgeClass: 'bg-slate-100 text-slate-700 border-slate-200' },
    ],
    stageTitle: 'Hearing Scheduled',
    stageSub: 'Apr 18, 2025 • Item #18',
    stageSubClass: 'text-amber-900 font-semibold',
    stageIcon: 'notification_important',
    registrySealTag: 'Cause List Verified',
    actionLabel: 'Cause List Entry',
    actionIcon: 'list_alt',
    actionType: 'causelist',
    actionBtnClass: 'bg-surface border border-outline-variant hover:bg-slate-100 text-primary',
    headnote:
      'Territorial jurisdiction for cheque dishonour complaints under Section 138 NI Act determined by the location of the drawee bank branch, subsequent to the Negotiable Instruments (Amendment) Act, 2015.',
    citizenSummaryEn:
      'In cheque bounce cases, the trial court is determined by the bank branch where the payee maintains an account and presents the cheque for clearing.',
    citizenSummaryHi:
      'चेक बाउंस के मामलों में कानूनी शिकायत उसी अदालत में दर्ज की जाती है जहां चेक प्राप्तकर्ता का बैंक खाता स्थित है।',
    statuteDetails: [
      {
        section: 'Section 138',
        act: 'Negotiable Instruments Act, 1881',
        desc: 'Dishonour of cheque for insufficiency of funds or exceeding agreed arrangement.',
      },
      {
        section: 'Section 142(2)',
        act: 'Negotiable Instruments Act, 1881',
        desc: 'Place of jurisdiction where the cheque is delivered for collection through an account.',
      },
    ],
  },
  {
    id: 'dossier_04',
    cnr: 'DHC03-088192-2024',
    title: 'Vidya Drolia & Ors. v. Durga Trading Corp.',
    citation: '(2021) 2 SCC 1',
    appealNumber: 'ARB.P. 612/2024',
    diaryNumber: 'Diary # 8829/2024',
    court: 'Delhi High Court',
    coram: "Hon'ble Justice Sanjiv Khanna",
    benchType: 'Single Judge Commercial',
    disposition: 'ORDERS RESERVED',
    statusBadge: (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-[#F9F5EB] text-[#6B5421] border border-secondary/30">
        <span className="material-symbols-outlined text-[12px] text-secondary">history_edu</span> Drafting Order
      </span>
    ),
    tabCategory: 'reserved',
    statutes: [
      { name: 'Arbitration Act Sec 8 & 11', badgeClass: 'bg-indigo-50 text-indigo-900 border-indigo-200' },
    ],
    stageTitle: 'Orders Reserved',
    stageSub: 'Bench concluded hearing',
    stageSubClass: 'text-slate-500 font-medium',
    stageIcon: 'bookmark',
    registrySealTag: 'Expected in 7-10 Days',
    actionLabel: 'Track Pronouncement',
    actionIcon: 'notifications',
    actionType: 'track',
    actionBtnClass: 'bg-surface border border-outline-variant hover:bg-slate-100 text-primary',
    headnote:
      'Four-fold test laid down for determining non-arbitrability: matters involving actions in rem, third-party rights, sovereign functions, or expressly prohibited by statutory enactment.',
    citizenSummaryEn:
      'Landmark judgment establishing clear rules on which commercial disputes can be resolved via private arbitration versus those that must go to civil courts.',
    citizenSummaryHi:
      'मध्यस्थता (Arbitration) और अदालती मुकदमों के बीच स्पष्ट सीमा रेखा तय करते हुए चार-चरणीय परीक्षण स्थापित किया गया।',
    statuteDetails: [
      {
        section: 'Section 8 & 11',
        act: 'Arbitration and Conciliation Act, 1996',
        desc: 'Power to refer parties to arbitration and appointment of arbitrators by Chief Justice.',
      },
    ],
  },
  {
    id: 'dossier_05',
    cnr: 'NCL01-002914-2024',
    title: 'Tata Sons Pvt. Ltd. v. Cyrus Investments',
    citation: '(2021) 9 SCC 449',
    appealNumber: 'Comp. App. (AT) 254/2018',
    diaryNumber: 'e-Filing # NC-99120',
    court: 'NCLAT New Delhi',
    coram: 'Appellate Tribunal Bench',
    benchType: 'Appellate Tribunal',
    disposition: 'DECREE DISPATCHED',
    statusBadge: (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container text-on-secondary-container border border-secondary/40 shadow-2xs">
        <span className="material-symbols-outlined text-[12px] text-secondary">verified</span> Certified Copy Ready
      </span>
    ),
    tabCategory: 'certified',
    statutes: [
      { name: 'Companies Act Sec 241/242', badgeClass: 'bg-purple-50 text-purple-900 border-purple-200' },
      { name: 'Oppression / Mgmt', badgeClass: 'bg-slate-100 text-slate-700 border-slate-200' },
    ],
    stageTitle: 'Decree Dispatched',
    stageSub: 'Attested by Registrar',
    stageSubClass: 'text-emerald-700 font-medium',
    stageIcon: 'check_circle',
    registrySealTag: 'DigiSeal # NCL-2024-510',
    actionLabel: 'Download Signed PDF',
    actionIcon: 'picture_as_pdf',
    actionType: 'download',
    actionBtnClass: 'bg-secondary text-primary hover:bg-[#d6b46b]',
    headnote:
      'Supreme Court set aside the NCLAT order reinstating Cyrus Mistry, holding that removal from executive chairmanship was an internal board governance decision, not oppression under Section 241.',
    citizenSummaryEn:
      'Corporate law milestone regarding executive boardroom removals and shareholder rights in multi-tier corporate conglomerates.',
    citizenSummaryHi:
      'कंपनी कानून के तहत बोर्ड प्रबंधन निर्णयों और शेयरधारक अधिकारों पर सर्वोच्च न्यायालय का ऐतिहासिक निर्णय।',
    statuteDetails: [
      {
        section: 'Section 241 & 242',
        act: 'Companies Act, 2013',
        desc: 'Application to Tribunal for relief in cases of oppression and mismanagement.',
      },
    ],
  },
];
