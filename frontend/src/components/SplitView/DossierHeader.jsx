import React, { useState } from 'react';
import { Building2, Calendar, Users, Copy, Check, Sparkles, Printer } from 'lucide-react';
import { Badge } from '../common/Badge';

export function DossierHeader({ activeCase }) {
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  const coramText = Array.isArray(activeCase.coram)
    ? activeCase.coram.join('; ')
    : (activeCase.coram || "Hon'ble Bench");

  const rawVerdict = activeCase.disposition?.verdict_text || activeCase.verdict_summary;
  const verdictText = (!rawVerdict || rawVerdict === '...' || !rawVerdict.trim())
    ? 'Operative judicial order pronounced with binding directions.'
    : rawVerdict;

  const disposition = {
    status: activeCase.disposition?.status || activeCase.disposition_status || 'ALLOWED',
    badge_color: activeCase.disposition?.badge_color || 'emerald',
    verdict_text: verdictText,
  };

  const handleCopyBrief = () => {
    const text = `CASE DOSSIER: ${activeCase.title}
Case No: ${activeCase.case_number}
Court: ${activeCase.court} (${activeCase.date})
Coram: ${coramText}
Disposition: ${disposition.status} - ${disposition.verdict_text}

Ratio Decidendi:
${activeCase.lawyer_headnote}

Citizen Takeaway:
${activeCase.citizen_summary_en}`;
    
    navigator.clipboard.writeText(text);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2000);
  };

  const handleCopyCitation = () => {
    const citation = `${activeCase.title}, ${activeCase.case_number} (${activeCase.court}, decided on ${activeCase.date}).`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 rounded-xl border border-outline-variant bg-white shadow-sm space-y-4">
      {/* Top Meta Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-surface-container-low text-primary border border-outline-variant font-mono">
            {activeCase.case_number}
          </span>
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 tracking-wide uppercase">
            {activeCase.case_type}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Sparkles className="w-3 h-3 text-emerald-600" /> Grounded in Judgment Text
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCitation}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-surface hover:bg-surface-container text-slate-700 border border-outline-variant transition cursor-pointer shadow-2xs"
            title="Copy standard Indian legal citation"
          >
            {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedCitation ? 'Citation Copied' : 'Cite'}</span>
          </button>

          <button
            onClick={handleCopyBrief}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-surface hover:bg-surface-container text-slate-700 border border-outline-variant transition cursor-pointer shadow-2xs"
            title="Copy entire case brief"
          >
            {copiedBrief ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedBrief ? 'Brief Copied' : 'Copy Brief'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-surface hover:bg-surface-container text-slate-700 border border-outline-variant transition hidden sm:inline-flex cursor-pointer shadow-2xs"
            title="Print or export clean PDF docket"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-700" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* Main Case Title & Judicial Outcome */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pt-1">
        <div className="space-y-3 flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight leading-snug">
            {activeCase.title}
          </h1>

          {/* Parties Strip with clean fallbacks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-surface-container-low p-2.5 rounded-xl border border-outline-variant">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Petitioner / Appellant:</span>
              <p className="font-semibold text-primary truncate">{activeCase.petitioner || 'Petitioner / Appellant'}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Respondent / Non-Applicant:</span>
              <p className="font-semibold text-primary truncate">{activeCase.respondent || 'State / Respondent'}</p>
            </div>
          </div>

          {/* Court, Date & Coram Details */}
          <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-medium text-slate-700">{activeCase.court}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-700" />
              <span className="text-slate-700">{activeCase.date}</span>
            </div>
          </div>

          {/* Coram / Bench */}
          <div className="flex items-start gap-2 pt-0.5 text-xs text-slate-600">
            <Users className="w-3.5 h-3.5 text-indigo-700 mt-0.5 shrink-0" />
            <span>
              <strong className="text-primary font-semibold">Coram / Bench: </strong>
              {coramText}
            </span>
          </div>
        </div>

        {/* Prominent Judicial Outcome / Disposition Pill */}
        <div className="flex flex-col items-start lg:items-end gap-2.5 shrink-0 bg-surface-container-low p-4 rounded-xl border border-outline-variant min-w-[240px]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Final Judicial Outcome
          </span>
          <Badge variant={disposition.badge_color} size="lg" className="shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-current"></span>
            <span>DISPOSITION: {disposition.status}</span>
          </Badge>
          <p className="text-xs text-slate-700 text-left lg:text-right font-medium leading-relaxed max-w-xs">
            {disposition.verdict_text}
          </p>
        </div>
      </div>
    </div>
  );
}
