import React, { useState } from 'react';
import { BookMarked, ChevronDown, ChevronUp, Scale, Info, Search, ExternalLink, ChevronsUpDown } from 'lucide-react';
import { Badge } from '../common/Badge';

export function StatutoryCards({ statutes = [], onSelectCitation }) {
  const [expandedIndices, setExpandedIndices] = useState([0]);
  const [filterQuery, setFilterQuery] = useState('');

  const toggleExpand = (idx) => {
    setExpandedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const safeStatutes = Array.isArray(statutes) ? statutes : [];

  const handleExpandAll = () => {
    if (expandedIndices.length === safeStatutes.length) {
      setExpandedIndices([]);
    } else {
      setExpandedIndices(safeStatutes.map((_, i) => i));
    }
  };

  const filteredStatutes = safeStatutes.filter(
    (item) =>
      item.section?.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.act?.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BookMarked className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Statutory Acts & Sections Cited</h3>
            <p className="text-[11px] text-slate-400">Extracted Indian penal, procedural & constitutional enactments</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExpandAll}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <ChevronsUpDown className="w-3 h-3" />
            <span>{expandedIndices.length === safeStatutes.length ? 'Collapse All' : 'Expand All'}</span>
          </button>

          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {safeStatutes.length} Sections
          </span>
        </div>
      </div>

      {/* Filter search if multiple sections */}
      {statutes.length > 2 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter sections (e.g. S.41, IPC, Article 21)..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      )}

      {/* Section List */}
      <div className="space-y-3">
        {filteredStatutes.map((item, index) => {
          const isExpanded = expandedIndices.includes(index);
          return (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'border-emerald-500/40 bg-slate-850/90 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between p-3.5">
                <button
                  onClick={() => toggleExpand(index)}
                  className="flex flex-1 items-center gap-2.5 text-left transition"
                >
                  <Badge variant="cyan" size="sm">
                    {item.section}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-200">{item.act}</span>
                </button>

                <div className="flex items-center gap-2">
                  {onSelectCitation && (
                    <button
                      onClick={() => onSelectCitation(item.section)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition"
                      title="Jump to this statutory section in judgment text"
                    >
                      <span>Jump</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  )}

                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-slate-400 p-1 hover:text-white"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-3.5 pb-3.5 pt-1 text-xs space-y-2 border-t border-slate-800/60 bg-slate-900/50 animate-in fade-in duration-150">
                  <div className="flex items-start gap-2 text-slate-300">
                    <Info className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <p>
                      <strong className="text-slate-200">Statutory Definition:</strong> {item.description}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/50">
                    <Scale className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <p>
                      <strong className="text-emerald-300">Application in this Judgment:</strong>{' '}
                      {item.context_in_case}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredStatutes.length === 0 && (
          <p className="text-xs text-slate-500 text-center py-4">No matching statutory sections found.</p>
        )}
      </div>
    </div>
  );
}
