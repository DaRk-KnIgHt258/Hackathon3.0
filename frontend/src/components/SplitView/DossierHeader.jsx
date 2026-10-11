import React, { useState } from 'react';
import { Building2, Calendar, Users, Copy, Check, Share2, Sparkles, Download } from 'lucide-react';
import { Badge } from '../common/Badge';

export function DossierHeader({ activeCase }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${activeCase.title}\n${activeCase.case_number}\n${activeCase.court}\n\nDisposition: ${activeCase.disposition.status}\n${activeCase.disposition.verdict_text}\n\nHeadnote:\n${activeCase.lawyer_headnote}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-900/40 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Case Meta & Title */}
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {activeCase.case_number}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {activeCase.case_type}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {activeCase.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeCase.court}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{activeCase.date}</span>
            </div>
          </div>

          {/* Bench / Coram */}
          <div className="flex items-start gap-2 pt-1 text-xs text-slate-400">
            <Users className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
            <span className="text-slate-400">
              <strong className="text-slate-300 font-medium">Coram: </strong>
              {activeCase.coram?.join('; ')}
            </span>
          </div>
        </div>

        {/* Prominent Disposition Pill & Action Bar */}
        <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
              Judicial Outcome / Verdict
            </span>
            <Badge variant={activeCase.disposition.badge_color} size="lg" className="shadow-lg">
              <span className="h-2 w-2 rounded-full bg-current animate-pulse"></span>
              <span>DISPOSITION: {activeCase.disposition.status}</span>
            </Badge>
          </div>

          <p className="text-xs text-slate-300 max-w-xs text-left md:text-right font-medium">
            {activeCase.disposition.verdict_text}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Copy Case Brief"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Brief' : 'Copy Brief'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
