import React, { useState } from 'react';
import { BookMarked, ChevronDown, ChevronUp, Scale, Info } from 'lucide-react';
import { Badge } from '../common/Badge';

export function StatutoryCards({ statutes }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-5 shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <BookMarked className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Statutory Acts & Sections Cited</h3>
            <p className="text-[11px] text-slate-400">Automatic extraction with plain-language contextual rationale</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          {statutes?.length || 0} Sections
        </span>
      </div>

      <div className="space-y-3">
        {statutes?.map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'border-emerald-500/40 bg-slate-850/90 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full flex items-center justify-between p-3.5 text-left transition"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="cyan" size="sm">
                    {item.section}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-200">{item.act}</span>
                </div>
                <div className="text-slate-400 p-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-3.5 pb-3.5 pt-1 text-xs space-y-2 border-t border-slate-800/60 bg-slate-900/40 animate-in fade-in duration-150">
                  <div className="flex items-start gap-2 text-slate-300">
                    <Info className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <p><strong className="text-slate-200">Statutory Meaning:</strong> {item.description}</p>
                  </div>
                  <div className="flex items-start gap-2 text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40">
                    <Scale className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <p><strong className="text-slate-300">Application in this Judgment:</strong> {item.context_in_case}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
