import React, { useState, useEffect, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Highlighter,
  Sparkles,
  Hash
} from 'lucide-react';

export function DocumentViewer({ activeCase, activeCitation, onClearCitation }) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('annotated'); // 'annotated' | 'original' | 'split'
  const [highlightedPara, setHighlightedPara] = useState(null);
  const docContainerRef = useRef(null);

  const pages = activeCase.pages || [
    {
      pageNumber: 1,
      header: `IN THE ${activeCase.court?.toUpperCase() || 'COURT'}`,
      paragraphs: [
        { num: 1, text: activeCase.lawyer_headnote || "Order text.", highlight: true, tag: "Ratio Decidendi" },
        { num: 2, text: activeCase.verdict_text || "Disposed of with directions.", highlight: false }
      ]
    }
  ];

  const totalPages = pages.length;

  // Reset page when active case changes
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery('');
    setHighlightedPara(null);
  }, [activeCase.id]);

  // Deep-link citation highlight effect
  useEffect(() => {
    if (activeCitation) {
      // Find which page contains this citation or default to page 1 / 2
      let targetPage = 1;
      if (activeCitation.includes('Page 2') || activeCitation.includes('page 2')) {
        targetPage = Math.min(2, totalPages);
      }
      setCurrentPage(targetPage);
      setHighlightedPara(activeCitation);

      // Auto scroll container
      if (docContainerRef.current) {
        docContainerRef.current.scrollTo({ top: 120, behavior: 'smooth' });
      }

      const timer = setTimeout(() => {
        setHighlightedPara(null);
        if (onClearCitation) onClearCitation();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeCitation, totalPages, onClearCitation]);

  const activePageData = pages.find((p) => p.pageNumber === currentPage) || pages[0];

  // Search filter
  const filterParagraphs = (paras) => {
    if (!searchQuery.trim()) return paras;
    const q = searchQuery.toLowerCase();
    return paras.map((p) => {
      const match = p.text.toLowerCase().includes(q) || (p.tag && p.tag.toLowerCase().includes(q));
      return { ...p, isSearchMatch: match };
    });
  };

  const displayedParagraphs = filterParagraphs(activePageData.paragraphs || []);
  const matchCount = searchQuery.trim()
    ? displayedParagraphs.filter((p) => p.isSearchMatch).length
    : 0;

  return (
    <div className="flex flex-col h-[780px] rounded-2xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-200">
      {/* Viewer Main Header */}
      <div className="px-4 py-2.5 bg-[#0B0F19] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 shrink-0">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-200 truncate max-w-[190px] sm:max-w-xs" title={activeCase.case_number}>
            {activeCase.case_number}.pdf
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700/80 shrink-0 hidden sm:inline">
            Official Judicial Record
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5">
          <button
            onClick={() => setViewMode('annotated')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition ${
              viewMode === 'annotated'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Annotated
          </button>
          <button
            onClick={() => setViewMode('original')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition ${
              viewMode === 'original'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Clean Transcript
          </button>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom */}
          <div className="flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(80, prev - 10))}
              className="p-1 text-slate-400 hover:text-white transition disabled:opacity-40"
              disabled={zoomLevel <= 80}
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[11px] text-slate-300 font-medium min-w-[36px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(140, prev + 10))}
              className="p-1 text-slate-400 hover:text-white transition disabled:opacity-40"
              disabled={zoomLevel >= 140}
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="p-1 text-slate-500 hover:text-slate-300 transition"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Page navigation */}
          <div className="flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 transition"
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] text-slate-300 font-medium">
              Pg {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 transition"
              title="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sub-toolbar: Search within Document & Page Quick Jump */}
      <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search text in this judgment page..."
            className="w-full pl-8 pr-7 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-[10px]"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {searchQuery && (
            <span className="text-[11px] text-emerald-400 font-medium">
              {matchCount} {matchCount === 1 ? 'match' : 'matches'} found
            </span>
          )}

          {/* Quick Page Jump Pills */}
          <div className="flex items-center gap-1">
            {pages.map((p) => (
              <button
                key={p.pageNumber}
                onClick={() => setCurrentPage(p.pageNumber)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                  p.pageNumber === currentPage
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                P{p.pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deep Link Active Notification Banner */}
      {highlightedPara && (
        <div className="px-4 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border-b border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Citation Anchor Active: Focused on <strong>{highlightedPara}</strong></span>
          </div>
          <button
            onClick={() => setHighlightedPara(null)}
            className="text-[10px] text-emerald-400 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Document Canvas Body */}
      <div
        ref={docContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#070B14]/90 flex justify-center selection:bg-emerald-500/30 selection:text-white"
      >
        <div
          style={{
            maxWidth: `${Math.round(680 * (zoomLevel / 100))}px`,
            fontSize: `${0.875 * (zoomLevel / 100)}rem`
          }}
          className="w-full bg-[#0F172A] rounded-xl border border-slate-800/90 p-6 sm:p-8 shadow-2xl space-y-6 text-slate-300 font-serif leading-relaxed transition-all duration-150"
        >
          {/* Formal Court Header */}
          <div className="text-center pb-5 border-b border-slate-800 font-sans space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-2">
              <span>{activeCase.court.toUpperCase()}</span>
              <span>PAGE {currentPage} OF {totalPages}</span>
            </div>
            <h4 className="text-xs font-bold tracking-widest text-slate-300 uppercase">
              {activePageData.header || `IN THE ${activeCase.court.toUpperCase()}`}
            </h4>
            <p className="text-xs text-indigo-400 font-semibold">{activeCase.case_type} APPELLATE JURISDICTION</p>
            <p className="text-sm font-bold text-white mt-1 font-mono tracking-tight">{activeCase.case_number}</p>
            
            <div className="pt-3 text-xs text-slate-300 font-sans grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase block">Petitioner</span>
                <span className="font-semibold text-slate-200">{activeCase.petitioner}</span>
              </div>
              <div className="text-slate-400 font-semibold text-[11px] uppercase tracking-widest text-center">
                VERSUS
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase block">Respondent</span>
                <span className="font-semibold text-slate-200">{activeCase.respondent}</span>
              </div>
            </div>
          </div>

          {/* AI Extraction Banner in Annotated Mode */}
          {viewMode === 'annotated' && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-sans">
              <Highlighter className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                Verified AI Citation Layer: Highlighting statutory reasoning and pivotal ratio decidendi.
              </span>
            </div>
          )}

          {/* Paragraphs with paragraph numbering & AI annotations */}
          <div className="space-y-5 font-sans">
            {displayedParagraphs.map((para) => {
              const isAnchorMatch =
                highlightedPara &&
                (para.text.toLowerCase().includes(highlightedPara.toLowerCase()) ||
                  (para.tag && para.tag.toLowerCase().includes(highlightedPara.toLowerCase())));

              return (
                <div
                  key={para.num}
                  id={`para-${para.num}`}
                  className={`relative p-3.5 rounded-xl transition-all duration-300 ${
                    isAnchorMatch
                      ? 'bg-emerald-950/50 border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)] ring-2 ring-emerald-500/40'
                      : para.isSearchMatch
                      ? 'bg-amber-950/30 border border-amber-500/50 shadow-md'
                      : viewMode === 'annotated' && para.highlight
                      ? 'bg-slate-950/70 border-l-4 border-emerald-500 text-slate-200'
                      : 'bg-slate-950/30 border border-slate-850 hover:border-slate-700/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 font-mono">
                      <Hash className="w-3 h-3 text-slate-400" /> Para {para.num}
                    </span>

                    {viewMode === 'annotated' && para.tag && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 tracking-wide uppercase">
                        ⭐ {para.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    {para.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footnotes & Operative Seal */}
          <div className="pt-6 border-t border-slate-800 text-right text-xs font-sans text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300 tracking-wide">ORDER PRONOUNCED ACCORDINGLY</p>
            <p className="text-slate-400">{activeCase.date} • {activeCase.court}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
