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
    <div className="rounded-xl border border-outline-variant bg-white p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            <BookMarked className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary tracking-wide">Statutory Acts & Sections Cited</h3>
            <p className="text-[11px] text-on-surface-variant">Extracted Indian penal, procedural & constitutional enactments</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExpandAll}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-surface hover:bg-surface-container text-slate-700 border border-outline-variant transition cursor-pointer shadow-2xs"
          >
            <ChevronsUpDown className="w-3 h-3" />
            <span>{expandedIndices.length === safeStatutes.length ? 'Collapse All' : 'Expand All'}</span>
          </button>

          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-surface-container-low text-slate-700 border border-outline-variant">
            {safeStatutes.length} Sections
          </span>
        </div>
      </div>

      {/* Filter search if multiple sections */}
      {statutes.length > 2 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter sections (e.g. S.41, IPC, Article 21)..."
            className="w-full pl-8 pr-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-slate-400 focus:outline-none focus:border-primary"
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
                  ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                  : 'border-outline-variant bg-surface hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center justify-between p-3.5">
                <button
                  onClick={() => toggleExpand(index)}
                  className="flex flex-1 items-center gap-2.5 text-left transition cursor-pointer"
                >
                  <Badge variant="cyan" size="sm">
                    {item.section}
                  </Badge>
                  <span className="text-xs font-semibold text-primary">{item.act}</span>
                </button>

                <div className="flex items-center gap-2">
                  {onSelectCitation && (
                    <button
                      onClick={() => onSelectCitation(item.section)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition cursor-pointer"
                      title="Jump to this statutory section in judgment text"
                    >
                      <span>Jump</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  )}

                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-slate-500 p-1 hover:text-primary cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-3.5 pb-3.5 pt-1 text-xs space-y-2 border-t border-outline-variant bg-surface-container-low/70 animate-in fade-in duration-150">
                  <div className="flex items-start gap-2 text-slate-700">
                    <Info className="w-3.5 h-3.5 text-cyan-700 mt-0.5 shrink-0" />
                    <p>
                      <strong className="text-primary font-semibold">Statutory Definition:</strong> {item.description}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700 bg-white p-2.5 rounded-lg border border-outline-variant">
                    <Scale className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                    <p>
                      <strong className="text-emerald-800 font-semibold">Application in this Judgment:</strong>{' '}
                      {item.context_in_case}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredStatutes.length === 0 && (
          <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-surface border border-outline-variant flex items-center justify-center mx-auto text-emerald-700">
              <BookMarked className="w-5 h-5" />
            </div>
            <p className="text-xs text-primary font-semibold">No statutory sections identified</p>
            <p className="text-[11px] text-on-surface-variant max-w-sm mx-auto">
              Indian Penal Code (IPC), CrPC, and special enactments referenced in this order appear here with real-time statutory annotations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
