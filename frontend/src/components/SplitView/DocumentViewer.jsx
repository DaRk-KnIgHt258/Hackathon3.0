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

  const defaultPages = [
    {
      pageNumber: 1,
      header: `IN THE ${(activeCase.court || 'SUPREME COURT OF INDIA').toUpperCase()} (${(activeCase.case_type || 'CRIMINAL').toUpperCase()} APPELLATE JURISDICTION)`,
      paragraphs: [
        {
          num: 1,
          text: `This proceeding is instituted by ${activeCase.petitioner || 'the Petitioner'} against ${activeCase.respondent || 'the Respondent'} challenging the impugned order and praying for relief under appellate jurisdiction.`,
          highlight: false,
        },
        {
          num: 2,
          text:
            activeCase.lawyer_headnote ||
            'The court scrutinized the statutory provisions and mandated that procedural compliance and judicial checklists must be strictly enforced.',
          highlight: true,
          tag: 'Ratio Decidendi',
        },
        {
          num: 3,
          text:
            activeCase.disposition?.verdict_text ||
            activeCase.verdict_text ||
            'The appeal is disposed of with nationwide binding guidelines issued to all concerned judicial authorities.',
          highlight: false,
        },
      ],
    },
  ];

  const pages = (Array.isArray(activeCase.pages) && activeCase.pages.length > 0)
    ? activeCase.pages
    : defaultPages;

  const totalPages = pages.length;

  // Reset page when active case changes
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery('');
  }, [activeCase.id]);

  // Deep-link citation highlight
  useEffect(() => {
    if (activeCitation) {
      if (activeCitation.page && activeCitation.page <= totalPages) {
        setCurrentPage(activeCitation.page);
      }
      setHighlightedPara(activeCitation.anchor || activeCitation.section || activeCitation.term);
      
      const timer = setTimeout(() => {
        const targetElement = document.getElementById(`para-${activeCitation.paraNum || 2}`);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);

      return () => clearTimeout(timer);
    } else {
      setHighlightedPara(null);
    }
  }, [activeCitation, totalPages]);

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
    <div className="flex flex-col h-[780px] rounded-xl border border-outline-variant bg-white shadow-sm overflow-hidden transition-all duration-200">
      {/* Viewer Main Header */}
      <div className="px-4 py-2.5 bg-surface-container-low border-b border-outline-variant flex flex-wrap items-center justify-between gap-2.5 text-xs text-on-surface">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-primary truncate max-w-[220px] sm:max-w-xs font-mono" title={activeCase.case_number}>
            {(activeCase.case_number || 'Judicial_Decree').replace(/[\s/]/g, '_')}.pdf
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface text-on-surface-variant border border-outline-variant shrink-0 hidden sm:inline">
            Official Judicial Record
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center rounded-lg bg-surface border border-outline-variant p-0.5 shadow-2xs">
          <button
            onClick={() => setViewMode('annotated')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
              viewMode === 'annotated'
                ? 'bg-primary text-white font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            AI Annotated
          </button>
          <button
            onClick={() => setViewMode('original')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
              viewMode === 'original'
                ? 'bg-primary text-white font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Clean Transcript
          </button>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom */}
          <div className="flex items-center rounded-lg bg-surface border border-outline-variant p-0.5 shadow-2xs">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(80, prev - 10))}
              className="p-1 text-slate-500 hover:text-primary transition disabled:opacity-40 cursor-pointer"
              disabled={zoomLevel <= 80}
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[11px] text-slate-700 font-medium min-w-[36px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(140, prev + 10))}
              className="p-1 text-slate-500 hover:text-primary transition disabled:opacity-40 cursor-pointer"
              disabled={zoomLevel >= 140}
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="p-1 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Page navigation */}
          <div className="flex items-center rounded-lg bg-surface border border-outline-variant p-0.5 shadow-2xs">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 text-slate-500 hover:text-primary disabled:opacity-30 transition cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] text-slate-700 font-medium">
              Pg {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 text-slate-500 hover:text-primary disabled:opacity-30 transition cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sub-toolbar: Search within Document & Page Quick Jump */}
      <div className="px-4 py-2 bg-white border-b border-outline-variant flex items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search text in this judgment page..."
            className="w-full pl-8 pr-7 py-1 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder-slate-400 focus:outline-none focus:border-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[10px]"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {searchQuery && (
            <span className="text-[11px] text-emerald-700 font-medium">
              {matchCount} {matchCount === 1 ? 'match' : 'matches'} found
            </span>
          )}

          {/* Quick Page Jump Pills */}
          <div className="flex items-center gap-1">
            {pages.map((p) => (
              <button
                key={p.pageNumber}
                onClick={() => setCurrentPage(p.pageNumber)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition cursor-pointer ${
                  p.pageNumber === currentPage
                    ? 'bg-primary text-white shadow-2xs'
                    : 'bg-surface hover:bg-surface-container text-slate-600 border border-outline-variant'
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
        <div className="px-4 py-1.5 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between text-xs text-emerald-800 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Citation Anchor Active: Focused on <strong>{highlightedPara}</strong></span>
          </div>
          <button
            onClick={() => setHighlightedPara(null)}
            className="text-[10px] text-emerald-700 hover:underline font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Document Canvas Body */}
      <div
        ref={docContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/70 flex justify-center selection:bg-secondary/30 selection:text-primary"
      >
        <div
          style={{
            maxWidth: `${Math.round(680 * (zoomLevel / 100))}px`,
            fontSize: `${0.875 * (zoomLevel / 100)}rem`
          }}
          className="w-full bg-white rounded-xl border border-outline-variant p-6 sm:p-8 shadow-sm space-y-6 text-slate-800 font-serif leading-relaxed transition-all duration-150"
        >
          {/* Formal Court Header */}
          <div className="text-center pb-5 border-b border-outline-variant font-sans space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-2">
              <span>{activeCase.court.toUpperCase()}</span>
              <span>PAGE {currentPage} OF {totalPages}</span>
            </div>
            <h4 className="text-xs font-bold tracking-widest text-primary uppercase">
              {activePageData.header || `IN THE ${activeCase.court.toUpperCase()}`}
            </h4>
            <p className="text-xs text-indigo-700 font-semibold">{activeCase.case_type} APPELLATE JURISDICTION</p>
            <p className="text-sm font-bold text-primary mt-1 font-mono tracking-tight">{activeCase.case_number}</p>
            
            <div className="pt-3 text-xs text-slate-700 font-sans grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-surface-container-low p-2.5 rounded-lg border border-outline-variant">
              <div className="text-left">
                <span className="text-[10px] text-slate-500 uppercase block">Petitioner</span>
                <span className="font-semibold text-primary">{activeCase.petitioner || 'Petitioner / Appellant'}</span>
              </div>
              <div className="text-slate-400 font-semibold text-[11px] uppercase tracking-widest text-center">
                VERSUS
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase block">Respondent</span>
                <span className="font-semibold text-primary">{activeCase.respondent || 'State / Respondent'}</span>
              </div>
            </div>
          </div>

          {/* AI Extraction Banner in Annotated Mode */}
          {viewMode === 'annotated' && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-sans">
              <Highlighter className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                Verified AI Citation Layer: Highlighting statutory reasoning and pivotal ratio decidendi.
              </span>
            </div>
          )}

          {/* Paragraphs with paragraph numbering & AI annotations */}
          <div className="space-y-4 font-sans">
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
                      ? 'bg-emerald-50 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-300/40'
                      : para.isSearchMatch
                      ? 'bg-amber-50 border border-amber-300 shadow-xs'
                      : viewMode === 'annotated' && para.highlight
                      ? 'bg-amber-50/70 border-l-4 border-secondary text-slate-900 border border-outline-variant/60'
                      : 'bg-surface-container-lowest border border-outline-variant hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 font-mono">
                      <Hash className="w-3 h-3 text-slate-400" /> Para {para.num}
                    </span>

                    {viewMode === 'annotated' && para.tag && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-container text-on-secondary-container border border-secondary/30 tracking-wide uppercase">
                        ⭐ {para.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-800 leading-relaxed font-sans">
                    {para.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footnotes & Operative Seal */}
          <div className="pt-6 border-t border-outline-variant text-right text-xs font-sans text-slate-500 space-y-1">
            <p className="font-semibold text-primary tracking-wide">ORDER PRONOUNCED ACCORDINGLY</p>
            <p className="text-slate-500">{activeCase.date} • {activeCase.court}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
