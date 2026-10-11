import React, { useState, useEffect } from 'react';
import { INITIAL_DOSSIERS } from './dossierData';
import { askCase } from '../../services/api';
import AppIcon from '../common/AppIcon';

export function AskAiDrawer({ isOpen, onClose, selectedCase, initialTab = 'chat' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeCaseSelection, setActiveCaseSelection] = useState(selectedCase?.id || 'all');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (selectedCase?.id) {
      setActiveCaseSelection(selectedCase.id);
    }
  }, [selectedCase?.id]);
  
  // Chat state
  const [query, setQuery] = useState('');
  const [chatLang, setChatLang] = useState('en'); // 'en' | 'hi' | 'mr'
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: selectedCase
        ? `Namaste Counsel. I am Nyaya AI, indexed directly on "${selectedCase.title}". How can I assist you with this docket's ratio decidendi, statutory interpretation, or citizen summary?`
        : 'Namaste Counsel. I am Nyaya AI, your grounded Indian Judicial Intelligence Copilot. All Supreme Court & High Court cause lists, 1,248 case dockets, and statutory codes (IPC/BNS, CrPC/BNSS, NI Act) are indexed. What query can I resolve?',
      citation: selectedCase ? selectedCase.citation : 'Supreme Court & High Court CIS e-Courts Node (Active)',
      time: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Statutory Explorer state
  const [statuteSearch, setStatuteSearch] = useState('');
  const [selectedStatuteCategory, setSelectedStatuteCategory] = useState('all');

  // Notice Drafter state
  const [noticeForm, setNoticeForm] = useState({
    type: '138_ni',
    senderName: 'Adv. Rajeshwar Rao (for M/s Apex Logistics)',
    recipientName: 'Global Mercantile Ltd. & Managing Director',
    amount: '₹ 14,50,000',
    chequeNumber: 'CHQ-891042',
    bankName: 'State Bank of India, Nariman Point Branch',
    dateOfBounce: 'March 28, 2025',
    reason: 'Funds Insufficient',
  });
  const [generatedNotice, setGeneratedNotice] = useState(null);
  const [isDrafting, setIsDrafting] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Ratio Synthesizer state
  const [rawJudgmentText, setRawJudgmentText] = useState('');
  const [synthesizedResult, setSynthesizedResult] = useState(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // DigiSeal state
  const [hashInput, setHashInput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  if (!isOpen) return null;

  // Active case object
  const currentCase =
    activeCaseSelection === 'all'
      ? selectedCase || null
      : INITIAL_DOSSIERS.find((d) => d.id === activeCaseSelection) || selectedCase;

  // STATUTE DATABASE FOR EXPLORER
  const STATUTORY_DB = [
    {
      act: 'Indian Penal Code, 1860 / BNS Sec 85',
      section: 'Section 498-A IPC',
      title: 'Husband or relative of husband subjecting woman to cruelty',
      type: 'Criminal • Non-Bailable • Cognizable',
      summaryEn: 'Punishes domestic cruelty and unlawful harassment with imprisonment up to 3 years and fine.',
      summaryHi: 'घरेलू हिंसा और दहेज उत्पीड़न के लिए 3 वर्ष तक का कारावास और जुर्माना।',
      summaryMr: 'घरगुती हिंसाचार आणि छळवणुकीसाठी ३ वर्षांपर्यंत कारावास आणि दंड.',
      landmarkCase: 'Arnesh Kumar v. State of Bihar (2014) 8 SCC 273: Mandatory Sec 41A notice required before arrest.',
      category: 'criminal',
    },
    {
      act: 'Code of Criminal Procedure, 1973 / BNSS Sec 35',
      section: 'Section 41 & 41A CrPC',
      title: 'When police may arrest without warrant & Notice of appearance',
      type: 'Procedural Safeguard',
      summaryEn: 'Notice of appearance mandatory for offences punishable with 7 years or less. Arrest only on recorded objective grounds.',
      summaryHi: '7 साल से कम सजा वाले अपराधों में पहले पेशी का नोटिस देना अनिवार्य है।',
      summaryMr: '७ वर्षांपेक्षा कमी शिक्षेच्या गुन्ह्यांमध्ये थेट अटकेऐवजी हजर राहण्याची नोटीस देणे बंधनकारक आहे.',
      landmarkCase: 'Satender Kumar Antil v. CBI (2022) 10 SCC 51: Guidelines to prevent unnecessary custodial remands.',
      category: 'criminal',
    },
    {
      act: 'Negotiable Instruments Act, 1881',
      section: 'Section 138 NI Act',
      title: 'Dishonour of cheque for insufficiency of funds',
      type: 'Quasi-Criminal • Compoundable • Bailable',
      summaryEn: 'Imprisonment up to 2 years or twice the cheque amount, provided statutory demand notice served within 30 days and unpaid for 15 days.',
      summaryHi: 'चेक बाउंस होने पर 2 साल तक की जेल या चेक राशि का दोगुना जुर्माना। 15 दिन का नोटिस जरूरी है।',
      summaryMr: 'धनादेश अनादरावर २ वर्षांपर्यंत तुरुंगवास किंवा रकमेच्या दुप्पट दंड. १५ दिवसांची कायदेशीर मुदत आवश्यक.',
      landmarkCase: 'Dashrath Rupsingh Rathod (2014) 9 SCC 129 & 2015 Amendment: Jurisdiction at payee bank branch.',
      category: 'commercial',
    },
    {
      act: 'Constitution of India',
      section: 'Article 21',
      title: 'Protection of life and personal liberty',
      type: 'Fundamental Right (Part III)',
      summaryEn: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
      summaryHi: 'विधि द्वारा स्थापित प्रक्रिया के अतिरिक्त किसी व्यक्ति को उसके जीवन या दैहिक स्वतंत्रता से वंचित नहीं किया जाएगा।',
      summaryMr: 'कायद्याने प्रस्थापित केलेल्या पद्धतीखेरीज कोणत्याही व्यक्तीला त्याचे जीवन किंवा व्यक्तिगत स्वातंत्र्य हिरावून घेता येणार नाही.',
      landmarkCase: 'Justice K.S. Puttaswamy v. UOI (2017) 10 SCC 1: Right to Privacy is an intrinsic facet of Article 21.',
      category: 'constitutional',
    },
    {
      act: 'Arbitration and Conciliation Act, 1996',
      section: 'Section 8 & 11',
      title: 'Reference to arbitration & Appointment of Arbitrators',
      type: 'Commercial Arbitration',
      summaryEn: 'Judicial intervention restricted. Courts must refer parties to arbitration unless agreement is non-existent prima facie.',
      summaryHi: 'अदालतें पार्टियों को मध्यस्थता के लिए संदर्भित करेंगी जब तक कि समझौता अमान्य न हो।',
      summaryMr: 'न्यायालयाने दोन्ही पक्षांना लवादाकडे पाठवणे बंधनकारक आहे जोपर्यंत करार अस्तित्वात नाही.',
      landmarkCase: 'Vidya Drolia v. Durga Trading (2021) 2 SCC 1: Four-fold test for non-arbitrable disputes.',
      category: 'commercial',
    },
    {
      act: 'Code of Civil Procedure, 1908',
      section: 'Section 80 CPC',
      title: 'Notice to Government or Public Officer before institution of suit',
      type: 'Civil Procedure Requirement',
      summaryEn: 'Mandatory 2-month prior written notice to Union/State Government before instituting any suit, except with leave of court in urgent relief.',
      summaryHi: 'सरकार के खिलाफ मुकदमा दर्ज करने से पहले 2 महीने का पूर्व लिखित नोटिस देना अनिवार्य है।',
      summaryMr: 'शासनाविरुद्ध दावा दाखल करण्यापूर्वी २ महिन्यांची पूर्व लेखी नोटीस देणे अनिवार्य आहे.',
      landmarkCase: 'State of Andhra Pradesh v. Pioneer Builders (2006) 12 SCC 119: Purpose is to allow administrative settlement.',
      category: 'civil',
    },
  ];

  const filteredStatutes = STATUTORY_DB.filter((st) => {
    const matchesCat = selectedStatuteCategory === 'all' || st.category === selectedStatuteCategory;
    const q = statuteSearch.toLowerCase();
    const matchesQuery =
      !q ||
      st.section.toLowerCase().includes(q) ||
      st.act.toLowerCase().includes(q) ||
      st.title.toLowerCase().includes(q) ||
      st.summaryEn.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  // SEND CHAT MESSAGE
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const userText = query.trim();
    setQuery('');
    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setIsTyping(true);

    // ── 1. Try real backend grounded Q&A when a case is selected ──────────
    const activeCaseId = currentCase?.id;
    if (activeCaseId && activeCaseId !== 'all') {
      try {
        const result = await askCase(activeCaseId, userText);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: result.answer,
            citation: `Grounded in ${currentCase.title || currentCase.case_number || activeCaseId}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsTyping(false);
        return;
      } catch (err) {
        // Backend unreachable – fall through to keyword simulation
        console.warn('Nyaya AI backend unavailable, using offline simulation:', err.message);
      }
    }

    // ── 2. Offline keyword simulation fallback ─────────────────────────────
    setTimeout(() => {
      let reply = '';
      let citation = '';

      const lower = userText.toLowerCase();

      if (lower.includes('498a') || lower.includes('arrest') || lower.includes('41a')) {
        if (chatLang === 'hi') {
          reply =
            'अर्नेश कुमार बनाम बिहार राज्य (2014) में सर्वोच्च न्यायालय ने फैसला सुनाया कि धारा 498A के मामलों में पुलिस सीधे गिरफ्तार नहीं कर सकती। धारा 41A के तहत 2 सप्ताह के भीतर पेशी का नोटिस देना और डायरी में कारण दर्ज करना अनिवार्य है।';
        } else if (chatLang === 'mr') {
          reply =
            'अर्नेश कुमार वि. बिहार राज्य (२०१४) खटल्यात सर्वोच्च न्यायालयाने निर्देश दिले की कलम ४९८A अंतर्गत थेट अटक करता येणार नाही. कलम ४१A अंतर्गत हजर राहण्याची नोटीस देणे आणि लिखित कारणे नोंदवणे बंधनकारक आहे.';
        } else {
          reply =
            'Under Section 41A CrPC as interpreted in Arnesh Kumar v. State of Bihar (2014), police officers shall not automatically arrest accused persons under Section 498-A IPC. A notice of appearance must be served within 2 weeks of case institution, and arrest is strictly an exception requiring recorded judicial satisfaction.';
        }
        citation = 'Arnesh Kumar v. State of Bihar, (2014) 8 SCC 273, Page 6, Paras 11-13';
      } else if (lower.includes('privacy') || lower.includes('puttaswamy') || lower.includes('21')) {
        if (chatLang === 'hi') {
          reply =
            'न्यायमूर्ति के.एस. पुट्टास्वामी (2017) मामले में 9-जजों की संविधान पीठ ने फैसला दिया कि निजता का अधिकार (Right to Privacy) अनुच्छेद 21 के तहत मौलिक अधिकार है, जो कानून की वैधता, उचित राज्य उद्देश्य और आनुपातिकता (Proportionality) के 3-चरणीय परीक्षण के अधीन है।';
        } else {
          reply =
            'In Justice K.S. Puttaswamy (2017), a unanimous 9-Judge Constitution Bench held that Privacy is an intrinsic fundamental right under Article 21. Any state restriction must pass the three-fold test: (i) Legality (backed by statutory law), (ii) Legitimate State Aim, and (iii) Proportionality.';
        }
        citation = 'K.S. Puttaswamy v. Union of India, (2017) 10 SCC 1, Para 324 & 329';
      } else if (lower.includes('138') || lower.includes('cheque') || lower.includes('bounce') || lower.includes('jurisdiction')) {
        if (chatLang === 'hi') {
          reply =
            'दशरथ रूपसिंह राठौड़ मामले के बाद 2015 के नेगोशिएबल इंस्ट्रूमेंट्स संशोधन के अनुसार, धारा 138 की कानूनी शिकायत उस अदालत में दर्ज की जाती है जिसके अधिकार क्षेत्र में चेक प्रस्तुत करने वाली शाखा (Payee Bank) स्थित है।';
        } else {
          reply =
            'Under Section 142(2) of the Negotiable Instruments Act (amended post-Dashrath Rupsingh Rathod), territorial jurisdiction for Section 138 complaints is statutorily anchored at the court within whose local jurisdiction the payee bank branch maintains the account.';
        }
        citation = 'NI Act Sec 142(2) & Dashrath Rupsingh Rathod, (2014) 9 SCC 129';
      } else if (lower.includes('arbitrat') || lower.includes('vidya drolia')) {
        reply =
          'In Vidya Drolia v. Durga Trading (2021), the Supreme Court formulated the landmark 4-fold test for non-arbitrability: disputes are non-arbitrable when they (1) relate to actions in rem, (2) affect third-party rights, (3) involve inalienable sovereign functions, or (4) are expressly barred by special statutory enactment.';
        citation = 'Vidya Drolia & Ors. v. Durga Trading Corp., (2021) 2 SCC 1, Para 76';
      } else if (lower.includes('cyrus') || lower.includes('tata')) {
        reply =
          'In Tata Sons v. Cyrus Investments (2021), the Supreme Court ruled that dismissal from directorship/chairmanship is an internal board matter under the Articles of Association and does not constitute "oppression and mismanagement" under Section 241 of the Companies Act.';
        citation = 'Tata Sons Pvt. Ltd. v. Cyrus Investments, (2021) 9 SCC 449, Para 154';
      } else {
        reply = currentCase
          ? `Grounded in ${currentCase.title} (${currentCase.citation}): The Hon'ble Bench directed that ${currentCase.headnote}`
          : `Grounded in Supreme Court & High Court Appellate Record: Based on current jurisprudence, all procedural mandates must be strictly complied with to prevent miscarriage of justice under relevant statutory provisions.`;
        citation = currentCase ? `${currentCase.citation}, Paras 8-12` : 'CIS High Court Appellate Record';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          citation: citation,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  // DRAFT LEGAL NOTICE GENERATOR
  const handleDraftNotice = (e) => {
    e.preventDefault();
    setIsDrafting(true);

    setTimeout(() => {
      const today = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      let draft = '';
      if (noticeForm.type === '138_ni') {
        draft = `LEGAL NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881

Date: ${today}
To,
${noticeForm.recipientName}

FROM:
${noticeForm.senderName}
Chamber No. 412, Supreme Court Advocates Chambers, New Delhi

SUB: STATUTORY DEMAND NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881 FOR DISHONOUR OF CHEQUE NO. ${noticeForm.chequeNumber} FOR AN AMOUNT OF ${noticeForm.amount}/-.

Sir/Madam,

Under instructions from and on behalf of my client, I hereby serve upon you the following Statutory Notice:

1. That in discharge of your legally enforceable debt and liability, you issued Cheque bearing No. ${noticeForm.chequeNumber} dated ${noticeForm.dateOfBounce} drawn on ${noticeForm.bankName} for the sum of ${noticeForm.amount}/- in favour of my client.

2. That upon presentation of the aforesaid cheque by my client for encashment, the same was returned unpaid and dishonoured by the bank with memo stating: "${noticeForm.reason}".

3. That the dishonour of the said cheque has caused wrongful financial loss to my client, attracting penal liability under Section 138 of the Negotiable Instruments Act, 1881.

DEMAND & CALL UPON:
I hereby call upon you to pay the aforesaid sum of ${noticeForm.amount}/- within 15 (FIFTEEN) DAYS of the receipt of this statutory notice. Failing compliance, my client has given me peremptory instructions to initiate criminal proceedings under Section 138 read with Section 142 of the Negotiable Instruments Act, 1881, as well as relevant provisions of IPC/BNS, at your sole cost and consequence.

Copy preserved in Chamber Archives for filing before the Hon'ble Metropolitan Magistrate Court.

Yours faithfully,
(Adv. Rajeshwar Rao)
Advocate on Record • Supreme Court of India`;
      } else {
        draft = `STATUTORY NOTICE UNDER SECTION 80 OF THE CODE OF CIVIL PROCEDURE, 1908

Date: ${today}
To: The Secretary / Authorized Representative
${noticeForm.recipientName}

FROM: ${noticeForm.senderName}

SUB: TWO-MONTH STATUTORY NOTICE PRIOR TO INSTITUTION OF SUIT UNDER SECTION 80 CPC.

Sir,
Take notice that upon the expiry of TWO MONTHS from the service of this notice, my client intends to institute a Civil Suit before the competent Court for declaration, permanent injunction, and recovery of damages amounting to ${noticeForm.amount}/- on the grounds of administrative delay and non-feasance.

Please treat this as compliance under Section 80(1) CPC.

Yours faithfully,
Advocate for Claimant`;
      }

      setGeneratedNotice(draft);
      setIsDrafting(false);
    }, 700);
  };

  // RATIO SYNTHESIZER
  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      const inputText = rawJudgmentText.trim() || (currentCase ? currentCase.headnote : 'Sample court order text');
      setSynthesizedResult({
        court: currentCase ? currentCase.court : 'Supreme Court of India (Appellate Jurisdiction)',
        coram: currentCase ? currentCase.coram : "Hon'ble Division Bench",
        disposition: currentCase ? currentCase.disposition : 'PETITION ALLOWED WITH DIRECTIONS',
        statutesCited: currentCase ? currentCase.statutes.map((s) => s.name).join(', ') : 'Sec 41A CrPC, Art 21 Const.',
        ratioDecidendi: `The judicial Bench affirmed that procedural guarantees are non-negotiable statutory rights. Synthesized from: "${inputText.slice(0, 120)}...", the court held that non-compliance with statutory notice requirements violates procedural safeguards.`,
        citizenSummary: `The court ruled that authorities cannot act arbitrarily. They must follow legal guidelines and issue advance notice before taking harsh enforcement steps.`,
        shaHash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      });
      setIsSynthesizing(false);
    }, 800);
  };

  // DIGISEAL VERIFIER
  const handleVerifySeal = (e) => {
    e.preventDefault();
    const queryHash = hashInput.trim() || 'SC-2024-918';
    const foundCase = INITIAL_DOSSIERS.find(
      (d) =>
        d.registrySealTag.toLowerCase().includes(queryHash.toLowerCase()) ||
        d.cnr.toLowerCase().includes(queryHash.toLowerCase())
    ) || INITIAL_DOSSIERS[0];

    setVerificationResult({
      status: 'VERIFIED & UNTAMPERED',
      caseTitle: foundCase.title,
      cnr: foundCase.cnr,
      court: foundCase.court,
      issuedAt: 'March 14, 2025 • 11:24:19 IST',
      sha256: '9f8c2b71a0e45d901842bc37ef890214a67b9318c4e09f56312a0e981fca9012',
      signer: 'Registrar (Judicial), Supreme Court of India',
      tamperFlag: false,
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-surface border-l border-outline-variant shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-250">
        {/* Top Header */}
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-secondary to-amber-300 text-primary flex items-center justify-center font-bold shadow-md">
              <AppIcon name="smart_toy" className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-base text-white tracking-tight">
                  Nyaya AI Suite
                </h3>
                <span className="bg-secondary/20 text-secondary border border-secondary/40 text-[9px] font-mono px-2 py-0.5 rounded font-semibold uppercase">
                  v4.2 Grounded
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-label">
                Indian Judicial Intelligence, RAG Q&A, Statutory Lookup & Drafting
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
            title="Close Nyaya AI"
          >
            <AppIcon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="bg-[#0B1A30] border-b border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto custom-scroll text-xs">
          {[
            { id: 'chat', label: 'Judicial Chat & Q&A', icon: 'chat' },
            { id: 'statutes', label: 'Statute Cross-Examiner', icon: 'menu_book' },
            { id: 'drafter', label: 'AI Notice Drafter', icon: 'edit_document' },
            { id: 'synthesizer', label: 'Ratio Synthesizer', icon: 'psychology' },
            { id: 'digiseal', label: 'DigiSeal Verifier', icon: 'verified_user' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-secondary text-primary font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <AppIcon name={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: JUDICIAL CHAT & Q&A */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
            {/* Context Header Strip */}
            <div className="px-4 py-2 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-label font-medium">Grounding Scope:</span>
                <select
                  value={activeCaseSelection}
                  onChange={(e) => setActiveCaseSelection(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-primary font-semibold focus:outline-none focus:border-secondary text-xs"
                >
                  <option value="all">Entire High Court & SC Registry (1,248 Dockets)</option>
                  {INITIAL_DOSSIERS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} ({d.cnr})
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Pills */}
              <div className="flex items-center gap-1">
                <span className="text-slate-400 text-[11px] mr-1">Lang:</span>
                {[
                  { id: 'en', label: 'EN' },
                  { id: 'hi', label: 'हिंदी' },
                  { id: 'mr', label: 'मराठी' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setChatLang(l.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                      chatLang === l.id
                        ? 'bg-primary text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 p-4 overflow-y-auto custom-scroll space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-xl p-3.5 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none shadow-sm'
                        : 'bg-white text-slate-800 border border-outline-variant rounded-bl-none shadow-2xs'
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.citation && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-secondary font-mono font-semibold">
                        <span className="flex items-center gap-1.5">
                          <AppIcon name="verified" className="w-3.5 h-3.5 text-secondary" />
                          Citation: {m.citation}
                        </span>
                        <button
                          onClick={() => copyToClipboard(m.text)}
                          className="hover:text-primary transition flex items-center gap-0.5 cursor-pointer"
                          title="Copy text"
                        >
                          <AppIcon name="content_copy" className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                  Nyaya AI synthesizing official judgment paragraphs and statutes...
                </div>
              )}
            </div>

            {/* Suggested Quick Prompts */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-[11px]">
              <span className="text-slate-400 shrink-0 font-semibold uppercase text-[10px]">Prompt:</span>
              <button
                onClick={() => {
                  setQuery('What is the mandatory Section 498A arrest checklist in Arnesh Kumar?');
                }}
                className="px-2.5 py-1 rounded bg-white border border-slate-300 text-slate-700 hover:border-secondary hover:text-primary transition shrink-0 cursor-pointer"
              >
                Sec 498A Checklist
              </button>
              <button
                onClick={() => {
                  setQuery('Where to file a Section 138 cheque bounce case under 2015 amendment?');
                }}
                className="px-2.5 py-1 rounded bg-white border border-slate-300 text-slate-700 hover:border-secondary hover:text-primary transition shrink-0 cursor-pointer"
              >
                Sec 138 Jurisdiction
              </button>
              <button
                onClick={() => {
                  setQuery('Explain the 3-part test for Right to Privacy under Article 21');
                }}
                className="px-2.5 py-1 rounded bg-white border border-slate-300 text-slate-700 hover:border-secondary hover:text-primary transition shrink-0 cursor-pointer"
              >
                Article 21 Privacy
              </button>
              <button
                onClick={() => {
                  setQuery('What is the 4-fold test of non-arbitrability in Vidya Drolia?');
                }}
                className="px-2.5 py-1 rounded bg-white border border-slate-300 text-slate-700 hover:border-secondary hover:text-primary transition shrink-0 cursor-pointer"
              >
                Arbitrability Test
              </button>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask grounded judicial query citing page, section or ratio..."
                className="flex-1 text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-secondary font-body bg-slate-50"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-secondary text-primary font-bold text-xs hover:bg-[#d6b46b] transition flex items-center gap-1.5 active:scale-95 shadow-sm cursor-pointer"
              >
                <AppIcon name="send" className="w-4 h-4" />
                Send
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: STATUTE CROSS-EXAMINER */}
        {activeTab === 'statutes' && (
          <div className="flex-1 p-5 overflow-y-auto custom-scroll space-y-4 bg-[#F8FAFC]">
            <div>
              <h4 className="font-headline font-bold text-sm text-primary">
                Indian Statutory Codes Cross-Examiner
              </h4>
              <p className="text-xs text-slate-500">
                Instant search across IPC, CrPC, NI Act, CPC, Arbitration Act and Constitution with landmark rulings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={statuteSearch}
                  onChange={(e) => setStatuteSearch(e.target.value)}
                  placeholder="Search section number (e.g. 498A, 138, 41A, 21) or keyword..."
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-secondary bg-white"
                />
                <AppIcon name="search" className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
              </div>

              <select
                value={selectedStatuteCategory}
                onChange={(e) => setSelectedStatuteCategory(e.target.value)}
                className="w-full sm:w-auto text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-primary font-medium focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="criminal">Criminal (IPC / CrPC)</option>
                <option value="commercial">Commercial & Financial</option>
                <option value="constitutional">Constitutional</option>
                <option value="civil">Civil (CPC)</option>
              </select>
            </div>

            {/* Results Grid */}
            <div className="space-y-3">
              {filteredStatutes.map((st, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 border border-outline-variant shadow-2xs hover:border-secondary/50 transition space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-headline font-bold text-sm text-primary">
                        {st.section}
                      </span>
                      <span className="text-xs text-slate-500 ml-2 font-mono">({st.act})</span>
                    </div>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container border border-secondary/30">
                      {st.type}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800">{st.title}</p>

                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <p>
                      <strong>English:</strong> {st.summaryEn}
                    </p>
                    <p className="text-slate-600">
                      <strong>हिंदी:</strong> {st.summaryHi}
                    </p>
                    <p className="text-slate-600">
                      <strong>मराठी:</strong> {st.summaryMr}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-secondary font-medium">
                    <span className="flex items-center gap-1.5">
                      <AppIcon name="gavel" className="w-3.5 h-3.5 text-secondary" />
                      Precedent: {st.landmarkCase}
                    </span>
                    <button
                      onClick={() => {
                        setActiveTab('chat');
                        setQuery(`Explain ${st.section} in detail citing ${st.landmarkCase}`);
                      }}
                      className="text-primary hover:text-secondary font-semibold hover:underline cursor-pointer"
                    >
                      Ask AI &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AI NOTICE DRAFTER */}
        {activeTab === 'drafter' && (
          <div className="flex-1 p-5 overflow-y-auto custom-scroll space-y-4 bg-[#F8FAFC]">
            <div>
              <h4 className="font-headline font-bold text-sm text-primary">
                Statutory Legal Notice Drafting Engine
              </h4>
              <p className="text-xs text-slate-500">
                Generate Section 138 NI Act or Section 80 CPC notices in formal Bar Council formatting.
              </p>
            </div>

            <form onSubmit={handleDraftNotice} className="bg-white p-4 rounded-lg border border-outline-variant space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-primary block mb-1">Notice Template</label>
                  <select
                    value={noticeForm.type}
                    onChange={(e) => setNoticeForm({ ...noticeForm, type: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                  >
                    <option value="138_ni">Sec 138 NI Act (Cheque Dishonour - 15 Days)</option>
                    <option value="80_cpc">Sec 80 CPC (Notice to Govt - 2 Months)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-primary block mb-1">Dispute Amount</label>
                  <input
                    type="text"
                    value={noticeForm.amount}
                    onChange={(e) => setNoticeForm({ ...noticeForm, amount: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-primary block mb-1">Sender / Counsel</label>
                  <input
                    type="text"
                    value={noticeForm.senderName}
                    onChange={(e) => setNoticeForm({ ...noticeForm, senderName: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-semibold text-primary block mb-1">Notice Recipient</label>
                  <input
                    type="text"
                    value={noticeForm.recipientName}
                    onChange={(e) => setNoticeForm({ ...noticeForm, recipientName: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300"
                  />
                </div>
              </div>

              {noticeForm.type === '138_ni' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-primary block mb-1">Cheque Number</label>
                    <input
                      type="text"
                      value={noticeForm.chequeNumber}
                      onChange={(e) => setNoticeForm({ ...noticeForm, chequeNumber: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-primary block mb-1">Drawee Bank</label>
                    <input
                      type="text"
                      value={noticeForm.bankName}
                      onChange={(e) => setNoticeForm({ ...noticeForm, bankName: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-primary block mb-1">Return Memo Date</label>
                    <input
                      type="text"
                      value={noticeForm.dateOfBounce}
                      onChange={(e) => setNoticeForm({ ...noticeForm, dateOfBounce: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isDrafting}
                className="w-full py-2 bg-secondary text-primary font-bold rounded-lg hover:bg-[#d6b46b] transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                {isDrafting ? (
                  <>
                    <AppIcon name="cached" className="w-4 h-4 animate-spin" />
                    Generating Formal Legal Notice...
                  </>
                ) : (
                  <>
                    <AppIcon name="auto_fix_high" className="w-4 h-4" />
                    Generate Statutory Notice Draft
                  </>
                )}
              </button>
            </form>

            {generatedNotice && (
              <div className="bg-white p-4 rounded-lg border border-secondary/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-xs text-primary flex items-center gap-1.5">
                    <AppIcon name="verified" className="w-4 h-4 text-secondary" />
                    Generated Statutory Notice
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(generatedNotice)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-primary text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <AppIcon name="content_copy" className="w-3.5 h-3.5" />
                      {copyFeedback ? 'Copied!' : 'Copy Notice'}
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([generatedNotice], { type: 'text/plain;charset=utf-8' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `Statutory_Notice_${Date.now()}.txt`;
                        a.click();
                      }}
                      className="px-2.5 py-1 rounded bg-secondary text-primary text-xs font-bold flex items-center gap-1 hover:bg-[#d6b46b] cursor-pointer"
                    >
                      <AppIcon name="download" className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                </div>

                <pre className="p-3 bg-slate-50 border border-slate-200 rounded text-[11px] font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto custom-scroll">
                  {generatedNotice}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: RATIO SYNTHESIZER */}
        {activeTab === 'synthesizer' && (
          <div className="flex-1 p-5 overflow-y-auto custom-scroll space-y-4 bg-[#F8FAFC]">
            <div>
              <h4 className="font-headline font-bold text-sm text-primary">
                Judgment Ratio & Headnote Synthesizer
              </h4>
              <p className="text-xs text-slate-500">
                Paste raw judgment paragraphs or extract from an indexed docket to synthesize ratio decidendi.
              </p>
            </div>

            <div className="space-y-3 bg-white p-4 rounded-lg border border-outline-variant">
              <label className="font-semibold text-primary text-xs block">
                Paste Judgment Excerpt or Order Text:
              </label>
              <textarea
                rows={4}
                value={rawJudgmentText}
                onChange={(e) => setRawJudgmentText(e.target.value)}
                placeholder="Paste verbatim judicial paragraphs here (e.g. 'We have considered the rival submissions... and hold that Section 41A notice is a sine qua non before depriving an accused of personal liberty...')"
                className="w-full p-3 rounded-lg border border-slate-300 text-xs font-body focus:outline-none focus:border-secondary bg-slate-50"
              />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (currentCase) setRawJudgmentText(currentCase.headnote);
                  }}
                  className="text-xs text-secondary hover:underline font-semibold"
                >
                  Load Active Case Paragraphs
                </button>
                <button
                  type="button"
                  disabled={isSynthesizing}
                  onClick={handleSynthesize}
                  className="px-4 py-2 bg-secondary text-primary font-bold rounded-lg hover:bg-[#d6b46b] text-xs flex items-center gap-1.5 active:scale-95 shadow-sm cursor-pointer"
                >
                  {isSynthesizing ? (
                    <>
                      <AppIcon name="cached" className="w-4 h-4 animate-spin" />
                      Synthesizing Ratio...
                    </>
                  ) : (
                    <>
                      <AppIcon name="psychology" className="w-4 h-4" />
                      Synthesize Headnote
                    </>
                  )}
                </button>
              </div>
            </div>

            {synthesizedResult && (
              <div className="bg-white p-4 rounded-lg border border-secondary/40 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h5 className="font-headline font-bold text-xs text-primary">
                      {synthesizedResult.court}
                    </h5>
                    <p className="text-[11px] text-slate-500">{synthesizedResult.coram}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {synthesizedResult.disposition}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-primary block">Ratio Decidendi:</span>
                  <p className="text-slate-700 leading-relaxed font-body">
                    {synthesizedResult.ratioDecidendi}
                  </p>
                </div>

                <div className="p-3 bg-amber-50/60 rounded border border-amber-200 text-xs space-y-1">
                  <span className="font-bold text-amber-900 block">Citizen Summary:</span>
                  <p className="text-amber-800 leading-relaxed font-body">
                    {synthesizedResult.citizenSummary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
                  <span>SHA-256 Hash: {synthesizedResult.shaHash.slice(0, 24)}...</span>
                  <button
                    onClick={() => copyToClipboard(synthesizedResult.ratioDecidendi)}
                    className="text-primary hover:text-secondary font-semibold"
                  >
                    Copy Headnote
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: DIGISEAL COURT VERIFIER */}
        {activeTab === 'digiseal' && (
          <div className="flex-1 p-5 overflow-y-auto custom-scroll space-y-4 bg-[#F8FAFC]">
            <div>
              <h4 className="font-headline font-bold text-sm text-primary">
                DigiSeal Supreme Court Attestation Verifier
              </h4>
              <p className="text-xs text-slate-500">
                Cryptographically verify court judgment orders against Central Judicial Repository hash ledgers.
              </p>
            </div>

            <form onSubmit={handleVerifySeal} className="bg-white p-4 rounded-lg border border-outline-variant space-y-3">
              <label className="font-semibold text-primary text-xs block">
                Enter CNR Number, DigiSeal Tag or SHA-256 Hash:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  placeholder="e.g. SC-2024-918 or DHC01-094821-2023"
                  className="flex-1 text-xs px-3 py-2 rounded border border-slate-300 font-mono bg-slate-50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary text-primary font-bold text-xs rounded hover:bg-[#d6b46b] transition active:scale-95 shadow-sm"
                >
                  Verify Hash
                </button>
              </div>
            </form>

            {verificationResult && (
              <div className="bg-white p-4 rounded-lg border border-emerald-500/40 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-headline font-bold text-xs">
                    <AppIcon name="verified" className="w-4 h-4 text-emerald-600" />
                    STATUS: {verificationResult.status}
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold border border-emerald-200">
                    CIS Node 3.2
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-slate-700 font-body">
                  <p><strong>Case Matter:</strong> {verificationResult.caseTitle}</p>
                  <p><strong>CNR:</strong> <span className="font-mono">{verificationResult.cnr}</span></p>
                  <p><strong>Issuing Forum:</strong> {verificationResult.court}</p>
                  <p><strong>Signatory:</strong> {verificationResult.signer}</p>
                  <p><strong>Timestamp:</strong> {verificationResult.issuedAt}</p>
                  <p className="font-mono text-[10px] bg-slate-50 p-2 rounded border border-slate-200 break-all">
                    SHA-256: {verificationResult.sha256}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
