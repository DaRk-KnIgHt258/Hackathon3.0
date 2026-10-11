import React, { useState } from 'react';
import { Building2, Calendar, Users, Copy, Check, Share2, Sparkles, Printer, UserCheck, ShieldAlert, Award } from 'lucide-react';
import { Badge } from '../common/Badge';

export function DossierHeader({ activeCase }) {
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  const disposition = activeCase.disposition || {
    status: activeCase.disposition_status || 'ALLOWED',
    badge_color: 'emerald',
    verdict_text: activeCase.verdict_summary || 'Operative order pronounced.'
  };

  const handleCopyBrief = () => {
    const text = `CASE DOSSIER: ${activeCase.title}
Case No: ${activeCase.case_number}
Court: ${activeCase.court} (${activeCase.date})
Coram: ${activeCase.coram?.join('; ')}
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
    <div className="p-6 rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-900/40 backdrop-blur-xl shadow-xl space-y-4">
      {/* Top Meta Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700/80 font-mono">
            {activeCase.case_number}
          </span>
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 tracking-wide uppercase">
            {activeCase.case_type}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3 h-3" /> Grounded in Judgment Text
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCitation}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Copy standard Indian legal citation"
          >
            {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCitation ? 'Citation Copied' : 'Cite'}</span>
          </button>

          <button
            onClick={handleCopyBrief}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Copy entire case brief"
          >
            {copiedBrief ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedBrief ? 'Brief Copied' : 'Copy Brief'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition hidden sm:inline-flex"
            title="Print or export clean PDF docket"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* Main Case Title & Judicial Outcome */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pt-1">
        <div className="space-y-3 flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
            {activeCase.title}
          </h1>

          {/* Parties Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Petitioner / Appellant:</span>
              <p className="font-semibold text-slate-200 truncate">{activeCase.petitioner}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Respondent / Non-Applicant:</span>
              <p className="font-semibold text-slate-200 truncate">{activeCase.respondent}</p>
            </div>
          </div>

          {/* Court, Date & Coram Details */}
          <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium text-slate-300">{activeCase.court}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-300">{activeCase.date}</span>
            </div>
          </div>

          {/* Coram / Bench */}
          <div className="flex items-start gap-2 pt-0.5 text-xs text-slate-400">
            <Users className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
            <span>
              <strong className="text-slate-300 font-semibold">Coram / Bench: </strong>
              {activeCase.coram?.join('; ')}
            </span>
          </div>
        </div>

        {/* Prominent Judicial Outcome / Disposition Pill */}
        <div className="flex flex-col items-start lg:items-end gap-2.5 shrink-0 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 min-w-[240px]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Final Judicial Outcome
          </span>
          <Badge variant={disposition.badge_color} size="lg" className="shadow-lg">
            <span className="h-2 w-2 rounded-full bg-current animate-pulse"></span>
            <span>DISPOSITION: {disposition.status}</span>
          </Badge>
          <p className="text-xs text-slate-200 text-left lg:text-right font-medium leading-relaxed max-w-xs">
            {disposition.verdict_text}
          </p>
        </div>
      </div>
    </div>
  );
}
