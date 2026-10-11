import React, { useState, useEffect, useMemo } from 'react';
import { DocumentViewer } from '../SplitView/DocumentViewer';
import { DossierHeader } from '../SplitView/DossierHeader';
import { SummaryTabs } from '../SplitView/SummaryTabs';
import { StatutoryCards } from '../SplitView/StatutoryCards';
import { MOCK_CASES } from '../../mock/mockCaseData';
import { AppIcon } from '../common/AppIcon';

// Harmonize dossierData format to SplitView format
export function normalizeCaseForWorkspace(caseObj) {
  if (!caseObj) return MOCK_CASES[0];

  const caseId = caseObj.id || caseObj.case_id || '';
  
  // Find matching benchmark landmark case if available
  const benchmark = MOCK_CASES.find(
    (m) =>
      m.id === caseId ||
      (m.title && caseObj.title && (
        m.title.toLowerCase().includes(caseObj.title.toLowerCase().slice(0, 15)) ||
        caseObj.title.toLowerCase().includes(m.title.toLowerCase().slice(0, 15))
      ))
  );

  const titleStr = caseObj.title || benchmark?.title || 'Court Judgment Order';

  // Extract petitioner and respondent
  const parts = titleStr.split(/\s+(?:vs\.?|v\.?)\s+/i);
  const petitioner =
    caseObj.petitioner ||
    (parts.length > 1 ? parts[0].trim() : (benchmark?.petitioner || 'Petitioner / Appellant'));
  const respondent =
    caseObj.respondent ||
    (parts.length > 1 ? parts[1].trim() : (benchmark?.respondent || 'State / Respondent'));

  const headnote =
    caseObj.headnote ||
    caseObj.lawyer_headnote ||
    benchmark?.lawyer_headnote ||
    caseObj.description ||
    '';

  const citizenEn =
    caseObj.citizenSummaryEn ||
    caseObj.citizen_summary_en ||
    benchmark?.citizen_summary_en ||
    caseObj.description ||
    '';

  const citizenHi =
    caseObj.citizenSummaryHi ||
    caseObj.citizen_summary_hi ||
    benchmark?.citizen_summary_hi ||
    '';

  const citizenMr =
    caseObj.citizenSummaryMr ||
    caseObj.citizen_summary_mr ||
    benchmark?.citizen_summary_mr ||
    '';

  // Statutes normalization
  let statutes_cited = [];
  if (Array.isArray(caseObj.statuteDetails) && caseObj.statuteDetails.length > 0) {
    statutes_cited = caseObj.statuteDetails.map((st) => ({
      act: st.act || 'Indian Statutory Enactment',
      section: st.section || 'Statute',
      description: st.desc || 'Procedural section scrutinized under appellate jurisdiction.',
      context_in_case: `Statutory compliance mandated in ${titleStr}`,
    }));
  } else if (Array.isArray(caseObj.statutes_cited) && caseObj.statutes_cited.length > 0) {
    statutes_cited = caseObj.statutes_cited;
  } else if (Array.isArray(caseObj.statutes) && caseObj.statutes.length > 0) {
    statutes_cited = caseObj.statutes.map((st) => ({
      act: 'Indian Statutory Enactment',
      section: st.name || 'Statute',
      description: 'Procedural section scrutinized under appellate jurisdiction.',
      context_in_case: 'Applied in judgment.',
    }));
  } else if (benchmark?.statutes_cited?.length > 0) {
    statutes_cited = benchmark.statutes_cited;
  }

  // Precedents normalization
  let precedents_cited = caseObj.precedents_cited || benchmark?.precedents_cited || [];
  if (Array.isArray(precedents_cited)) {
    precedents_cited = precedents_cited.map((p) => {
      if (typeof p === 'string') {
        return { title: p, relation: 'Cited', note: 'Referred to during appellate determination.' };
      }
      return p;
    });
  }

  // Key facts
  const key_facts =
    Array.isArray(caseObj.key_facts) && caseObj.key_facts.length > 0
      ? caseObj.key_facts
      : benchmark?.key_facts || [
          `${petitioner} filed appeal before the appellate court.`,
          `Proceedings instituted concerning statutory compliance and constitutional relief.`,
          `Judicial evaluation conducted regarding statutory powers and procedural checklists.`,
          `Decree pronounced with binding directions.`,
        ];

  // Verdict text (prevent empty "..." bug)
  const rawVerdict =
    caseObj.disposition?.verdict_text ||
    caseObj.verdict_summary ||
    benchmark?.disposition?.verdict_text;

  let verdict_text = rawVerdict;
  if (!verdict_text || verdict_text === '...' || verdict_text.trim() === '') {
    if (headnote && headnote.length > 10) {
      verdict_text = headnote.length > 90 ? headnote.slice(0, 90) + '...' : headnote;
    } else {
      verdict_text = 'Operative judicial order pronounced with binding directions.';
    }
  }

  // Disposition mapping
  const rawDisp =
    typeof caseObj.disposition === 'string'
      ? caseObj.disposition
      : caseObj.disposition?.status ||
        caseObj.disposition_status ||
        benchmark?.disposition?.status ||
        'ALLOWED';

  const isAllowed = rawDisp.includes('ALLOWED') || rawDisp.includes('GRANTED');
  const isReserved = rawDisp.includes('RESERVED');
  const isHearing = rawDisp.includes('HEARING') || rawDisp.includes('PENDING');

  // Pages normalization
  let pages = caseObj.pages || benchmark?.pages;
  if (!pages || pages.length === 0) {
    pages = [
      {
        pageNumber: 1,
        header: `IN THE ${(caseObj.court || benchmark?.court || 'SUPREME COURT OF INDIA').toUpperCase()}`,
        paragraphs: [
          {
            num: 1,
            text: `This appeal is instituted by ${petitioner} against ${respondent} seeking judicial determination and relief under appellate jurisdiction.`,
            highlight: false,
          },
          {
            num: 2,
            text:
              headnote ||
              'The court examined the relevant statutory provisions and observed that mandatory procedural safeguards and judicial scrutiny cannot be dispensed with mechanically.',
            highlight: true,
            tag: 'Ratio Decidendi',
          },
          {
            num: 3,
            text:
              verdict_text ||
              'Having heard learned counsel for the parties, the order is pronounced accordingly with operative directions.',
            highlight: false,
          },
        ],
      },
    ];
  }

  const case_number =
    caseObj.appealNumber ||
    caseObj.case_number ||
    (caseObj.cnr && !caseObj.cnr.startsWith('CASE-SAMPLE') ? caseObj.cnr : null) ||
    benchmark?.case_number ||
    caseObj.cnr ||
    'Criminal Appeal No. 1277 of 2014';

  return {
    id: caseId || benchmark?.id || 'sample_arnesh_kumar',
    title: titleStr,
    case_number,
    court: caseObj.court || benchmark?.court || 'Supreme Court of India',
    date: caseObj.judgment_date || caseObj.date || benchmark?.date || 'July 2014',
    coram: Array.isArray(caseObj.coram)
      ? caseObj.coram
      : caseObj.coram
      ? [caseObj.coram]
      : benchmark?.coram || ["Hon'ble Supreme Court Bench"],
    petitioner,
    respondent,
    case_type: caseObj.benchType || caseObj.case_type || benchmark?.case_type || 'CRIMINAL',
    disposition: {
      status: isAllowed
        ? 'ALLOWED'
        : isReserved
        ? 'ORDERS RESERVED'
        : isHearing
        ? 'PENDING HEARING'
        : 'DISPOSED WITH DIRECTIONS',
      badge_color: isAllowed ? 'emerald' : isReserved ? 'amber' : 'cyan',
      verdict_text,
    },
    statutes_cited,
    precedents_cited,
    key_facts,
    lawyer_headnote: headnote,
    citizen_summary_en: citizenEn,
    citizen_summary_hi: citizenHi,
    citizen_summary_mr: citizenMr,
    pdf_sample_url: caseObj.pdf_sample_url || benchmark?.pdf_sample_url || '#',
    pages,
    highlights: benchmark?.highlights || [{ page: 1, text: headnote.slice(0, 100) }],
  };
}

export function JudgmentReviewWorkspace({
  caseData,
  onBack,
  onAskAi,
  onOpenUpload,
}) {
  const [selectedCaseId, setSelectedCaseId] = useState(caseData?.id || MOCK_CASES[0].id);

  // Sync selectedCaseId when caseData prop changes
  useEffect(() => {
    if (caseData?.id) {
      setSelectedCaseId(caseData.id);
    }
  }, [caseData?.id]);

  // Compute active case cleanly
  const activeCase = useMemo(() => {
    // If user clicked one of benchmark cases directly
    const benchmark = MOCK_CASES.find((c) => c.id === selectedCaseId);
    if (benchmark && selectedCaseId !== caseData?.id) {
      return normalizeCaseForWorkspace(benchmark);
    }
    // If viewing the passed-in caseData
    return normalizeCaseForWorkspace(caseData || benchmark || MOCK_CASES[0]);
  }, [selectedCaseId, caseData]);

  return (
    <div className="space-y-4 animate-in fade-in duration-200 pb-12">
      {/* Top Workspace Navigation Bar - Cohesive Light Institutional Theme */}
      <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-container border border-outline-variant text-xs font-semibold text-primary flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-2xs"
          >
            <AppIcon name="arrow_back" className="w-3.5 h-3.5 text-primary" />
            Back to Docket Intelligence
          </button>
          <div className="h-5 w-px bg-outline-variant hidden sm:block"></div>
          <div>
            <h3 className="font-headline font-bold text-sm text-primary flex items-center gap-1.5">
              <AppIcon name="splitscreen" className="w-4 h-4 text-secondary" />
              Split-Screen Judgment Review Workspace
            </h3>
            <p className="text-[11px] text-on-surface-variant font-body">
              Side-by-side court decree text with automated statutory clause extractor & plain-language translation
            </p>
          </div>
        </div>

        {/* Benchmark Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scroll py-1">
          <span className="text-[10px] uppercase font-mono font-semibold text-on-surface-variant shrink-0">
            Benchmark Cases:
          </span>
          {MOCK_CASES.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCaseId(item.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition shrink-0 cursor-pointer ${
                selectedCaseId === item.id
                  ? 'bg-secondary-container text-on-secondary-container border-secondary/50 font-bold shadow-2xs'
                  : 'bg-surface hover:bg-surface-container text-slate-700 border-outline-variant'
              }`}
            >
              {item.title.split(/\s+(?:vs\.?|v\.?)\s+/i)[0]}
            </button>
          ))}
          <button
            onClick={onOpenUpload}
            className="px-2.5 py-1 rounded bg-secondary text-primary font-bold text-xs hover:bg-[#d6b46b] transition flex items-center gap-1 shrink-0 cursor-pointer shadow-xs active:scale-95"
          >
            <AppIcon name="upload_file" className="w-3.5 h-3.5" />
            Upload Custom PDF
          </button>
        </div>
      </div>

      {/* Main Split Grid: 50% Left (Document Viewer) & 50% Right (Dossier Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Interactive Original Court Record Viewer */}
        <div className="space-y-4">
          <DocumentViewer activeCase={activeCase} />
        </div>

        {/* Right Column: Case Dossier & Intelligence Tabs */}
        <div className="space-y-4">
          <DossierHeader activeCase={activeCase} />

          <SummaryTabs activeCase={activeCase} />

          <StatutoryCards statutes={activeCase.statutes_cited} />

          {/* Quick Action Dock - Cohesive Light Institutional Palette */}
          <div className="p-4 bg-white rounded-xl border border-outline-variant shadow-sm flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-on-surface-variant font-label flex items-center gap-1.5">
              <AppIcon name="verified" className="w-4 h-4 text-secondary" />
              Citations linked to Official Supreme Court Gazette
            </span>
            <button
              onClick={() => onAskAi && onAskAi(activeCase)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-[#d6b46b] hover:brightness-105 text-primary text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
            >
              <AppIcon name="smart_toy" className="w-4 h-4 text-primary" />
              Ask Nyaya AI About This Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
