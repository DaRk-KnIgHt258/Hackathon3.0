import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertCircle, ArrowUpRight, Scale, Filter } from 'lucide-react';
import { Badge } from './common/Badge';

export function SampleCaseSelector({ cases, activeCaseId, onSelectCase }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const categories = ['ALL', 'CRIMINAL', 'COMMERCIAL', 'CONSTITUTIONAL'];

  const filteredCases = cases.filter((c) => {
    if (selectedFilter === 'ALL') return true;
    return c.case_type?.toUpperCase().includes(selectedFilter);
  });

  return (
    <div className="py-2.5 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-b border-slate-800/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        {/* Label & Category Filter */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">Landmark Benchmarks:</span>
          </div>

          <div className="flex items-center gap-1 ml-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                  selectedFilter === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Cards Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {filteredCases.map((item) => {
            const isSelected = item.id === activeCaseId;
            const disposition = item.disposition || { status: 'ALLOWED', badge_color: 'emerald' };

            return (
              <button
                key={item.id}
                onClick={() => onSelectCase(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border text-left whitespace-nowrap transition-all duration-200 group ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/60 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/40'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white hover:bg-slate-850'
                }`}
              >
                <FileText
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isSelected ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="max-w-[210px] truncate font-medium">{item.title}</span>
                <Badge variant={disposition.badge_color} size="sm">
                  {disposition.status}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
