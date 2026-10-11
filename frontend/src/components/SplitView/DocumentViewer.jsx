import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Search, ChevronLeft, ChevronRight, FileText, Highlighter, Sparkles, ExternalLink } from 'lucide-react';

export function DocumentViewer({ activeCase }) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 14;

  return (
    <div className="flex flex-col h-[740px] rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-xl overflow-hidden">
      {/* Viewer Toolbar */}
      <div className="px-4 py-2.5 bg-[#0B0F19] border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-200 truncate max-w-[180px] sm:max-w-xs">
            {activeCase.case_number}.pdf
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
            Original Court Record
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(75, prev - 10))}
              className="p-1 text-slate-400 hover:text-white transition"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[11px] text-slate-300 font-medium">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(150, prev + 10))}
              className="p-1 text-slate-400 hover:text-white transition"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Page navigation */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] text-slate-300 font-medium">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 transition"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Canvas */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#070B14]/80 flex justify-center">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="w-full max-w-2xl bg-[#0F172A] rounded-xl border border-slate-800 p-8 shadow-2xl space-y-6 text-slate-300 font-serif leading-relaxed transition-transform duration-150"
        >
          {/* Header in doc */}
          <div className="text-center pb-6 border-b border-slate-800 font-sans space-y-1">
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              IN THE {activeCase.court.toUpperCase()}
            </h4>
            <p className="text-xs text-slate-400">{activeCase.case_type} APPELLATE JURISDICTION</p>
            <p className="text-sm font-semibold text-white mt-2">{activeCase.case_number}</p>
            <div className="pt-2 text-xs text-slate-300">
              <p className="font-semibold">{activeCase.title.split('vs.')[0]} ... Appellant</p>
              <p className="text-slate-500 my-0.5">VERSUS</p>
              <p className="font-semibold">{activeCase.title.split('vs.')[1] || 'Respondents'} ... Respondent</p>
            </div>
          </div>

          {/* AI Highlight Banner */}
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-sans">
            <Highlighter className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>AI Citation Extractor active: 2 pivotal clauses highlighted in this section.</span>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 text-sm font-sans text-slate-300">
            <p>
              <strong className="text-white">1. </strong>
              The pivotal question emerging for determination before this Court concerns the unwarranted exercise of powers of arrest and subsequent mechanical remand orders under penal provisions.
            </p>

            <div className="p-3.5 rounded-lg bg-emerald-950/30 border-l-4 border-emerald-500 text-slate-200 text-sm">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                ⭐ Ratio Decidendi (Page 7, Para 11)
              </span>
              <p className="italic">
                "{activeCase.lawyer_headnote}"
              </p>
            </div>

            <p>
              <strong className="text-white">2. </strong>
              Statutory mandate under Section 41 and 41A of the Code of Criminal Procedure requires an objective satisfaction based on tangible material before personal liberty is compromised.
            </p>

            <div className="p-3.5 rounded-lg bg-cyan-950/20 border-l-4 border-cyan-500 text-slate-300 text-xs">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Relevant Provision: {activeCase.statutes_cited?.[0]?.section}
              </span>
              <p>{activeCase.statutes_cited?.[0]?.context_in_case}</p>
            </div>

            <p>
              <strong className="text-white">3. </strong>
              Accordingly, the Magistrate is obligated not to authorize detention in a casual and routine manner. The petition stands disposed of in terms of the directions formulated herein.
            </p>
          </div>

          {/* Order stamp */}
          <div className="pt-6 border-t border-slate-800 text-right text-xs font-sans text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">ORDER DIRECTED ACCORDINGLY</p>
            <p>{activeCase.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
