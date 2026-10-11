import React from 'react';
import { FileText, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Badge } from './common/Badge';

export function SampleCaseSelector({ cases, activeCaseId, onSelectCase }) {
  return (
    <div className="py-3 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Benchmark Test Judgments:</span>
          <span className="text-[11px] text-slate-500 lowercase hidden sm:inline">(Click to instant-load dossier)</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {cases.map((item) => {
            const isSelected = item.id === activeCaseId;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCase(item.id)}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium border text-left whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <FileText className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="max-w-[190px] truncate">{item.title}</span>
                <Badge variant={item.disposition.badge_color} size="sm">
                  {item.disposition.status}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
