import React, { useState } from 'react';
import { DocumentViewer } from '../SplitView/DocumentViewer';
import { DossierHeader } from '../SplitView/DossierHeader';
import { SummaryTabs } from '../SplitView/SummaryTabs';
import { StatutoryCards } from '../SplitView/StatutoryCards';
import { MOCK_CASES } from '../../mock/mockCaseData';

// Harmonize dossierData format to SplitView format
export function normalizeCaseForWorkspace(caseObj) {
  if (!caseObj) return MOCK_CASES[0];
  if (caseObj.case_number && caseObj.statutes_cited) return caseObj;

  return {
    id: caseObj.id,
    title: caseObj.title,
    case_number: caseObj.appealNumber || caseObj.cnr || 'Criminal Appeal No. 1277 of 2014',
    court: caseObj.court || 'Supreme Court of India',
    date: 'April 2025',
    coram: Array.isArray(caseObj.coram) ? caseObj.coram : [caseObj.coram || "Hon'ble Supreme Court Bench"],
    disposition: {
      status: caseObj.disposition?.includes('ALLOWED')
        ? 'ALLOWED'
        : caseObj.disposition?.includes('RESERVED')
        ? 'ORDERS RESERVED'
        : caseObj.disposition?.includes('HEARING')
        ? 'PENDING HEARING'
        : 'DISPOSED WITH DIRECTIONS',
      badge_color: caseObj.disposition?.includes('ALLOWED')
        ? 'emerald'
        : caseObj.disposition?.includes('RESERVED')
        ? 'amber'
        : 'cyan',
      verdict_text: caseObj.headnote?.slice(0, 80) + '...' || 'Procedural Guidelines Framed',
    },
    case_type: caseObj.benchType || 'APPELLATE JURISDICTION',
    statutes_cited: caseObj.statuteDetails
      ? caseObj.statuteDetails.map((st) => ({
          act: st.act,
          section: st.section,
          description: st.desc,
          context_in_case: `Statutory compliance mandated in ${caseObj.title}`,
        }))
      : (caseObj.statutes || []).map((st) => ({
          act: 'Indian Statutory Enactment',
          section: st.name,
          description: 'Procedural section scrutinized under appellate jurisdiction.',
          context_in_case: 'Applied in judgment.',
        })),
    lawyer_headnote: caseObj.headnote,
    citizen_summary_en: caseObj.citizenSummaryEn,
    citizen_summary_hi: caseObj.citizenSummaryHi,
    citizen_summary_mr: caseObj.citizenSummaryMr,
    pdf_sample_url: '#',
    highlights: [
      { page: 1, text: caseObj.headnote?.slice(0, 100) },
    ],
  };
}

export function JudgmentReviewWorkspace({
  caseData,
  onBack,
  onAskAi,
  onOpenUpload,
}) {
  const [selectedCaseId, setSelectedCaseId] = useState(caseData?.id || MOCK_CASES[0].id);

  // Active case either from benchmark list or passed-in caseData
  const activeCase =
    selectedCaseId === caseData?.id
      ? normalizeCaseForWorkspace(caseData)
      : MOCK_CASES.find((c) => c.id === selectedCaseId) || normalizeCaseForWorkspace(caseData);

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Workspace Navigation Bar */}
      <div className="bg-white rounded-lg border border-outline-variant shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-3 py-1.5 rounded-lg bg-surface hover:bg-slate-100 border border-outline-variant text-xs font-semibold text-primary flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Docket Intelligence
          </button>
          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
          <div>
            <h3 className="font-headline font-bold text-sm text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">splitscreen</span>
              Split-Screen Judgment Review Workspace
            </h3>
            <p className="text-[11px] text-slate-500 font-body">
              Side-by-side court decree text with automated statutory clause extractor & plain-language translation
            </p>
          </div>
        </div>

        {/* Benchmark Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scroll py-1">
          <span className="text-[10px] uppercase font-mono font-semibold text-slate-400 shrink-0">
            Benchmark Cases:
          </span>
          {MOCK_CASES.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCaseId(item.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition shrink-0 cursor-pointer ${
                selectedCaseId === item.id
                  ? 'bg-secondary/15 text-primary border-secondary font-bold shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:text-primary border-slate-200'
              }`}
            >
              {item.title.split('vs.')[0]}
            </button>
          ))}
          <button
            onClick={onOpenUpload}
            className="px-2.5 py-1 rounded bg-secondary text-primary font-bold text-xs hover:bg-[#d6b46b] transition flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">upload_file</span>
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

          {/* Quick Action Dock */}
          <div className="p-4 bg-white rounded-xl border border-outline-variant shadow-sm flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-500 font-label flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
              Citations linked to Official Supreme Court Gazette
            </span>
            <button
              onClick={() => onAskAi && onAskAi(activeCase)}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-secondary text-[18px]">smart_toy</span>
              Ask Nyaya AI About This Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
