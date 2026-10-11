import React, { useState, useRef, useEffect } from 'react';
import {
  Scale,
  Search,
  UploadCloud,
  ShieldCheck,
  Sparkles,
  BookOpen,
  X,
  ArrowRight,
  FileText
} from 'lucide-react';
import { Badge } from './common/Badge';

export function Navbar({ onOpenUpload, onToggleChat, isChatOpen, cases = [], onSelectCase }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter cases across titles, case numbers, acts & sections
  const matchingCases = searchQuery.trim()
    ? cases.filter((c) => {
        const q = searchQuery.toLowerCase();
        const titleMatch = c.title?.toLowerCase().includes(q);
        const numberMatch = c.case_number?.toLowerCase().includes(q);
        const courtMatch = c.court?.toLowerCase().includes(q);
        const statuteMatch = c.statutes_cited?.some(
          (s) =>
            s.section?.toLowerCase().includes(q) ||
            s.act?.toLowerCase().includes(q) ||
            s.description?.toLowerCase().includes(q)
        );
        const headnoteMatch = c.lawyer_headnote?.toLowerCase().includes(q);
        return titleMatch || numberMatch || courtMatch || statuteMatch || headnoteMatch;
      })
    : [];

  const handleSelectResult = (caseId) => {
    if (onSelectCase) onSelectCase(caseId);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#070B14]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 shrink-0">
            <div className="h-full w-full bg-[#070B14] rounded-[10px] flex items-center justify-center">
              <Scale className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                NyayaSutra
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                <Sparkles className="w-2.5 h-2.5" /> Legal AI Core
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
              Indian Court Judgment Triage & Statutory Intelligence
            </p>
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search sections (Sec 41, 138, Art 21), acts, cases..."
              className="w-full pl-9 pr-8 py-1.5 bg-slate-900/90 border border-slate-800 rounded-lg text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Results Dropdown */}
          {isDropdownOpen && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-slate-800 bg-[#0B0F19] shadow-2xl overflow-hidden z-50 animate-in fade-in duration-150 max-h-80 overflow-y-auto">
              <div className="p-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Matching Judgments & Sections ({matchingCases.length})</span>
                <span className="text-slate-500">Esc to close</span>
              </div>

              {matchingCases.length > 0 ? (
                <div className="divide-y divide-slate-800/60">
                  {matchingCases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectResult(c.id)}
                      className="w-full text-left p-3 hover:bg-slate-850/80 transition flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                            {c.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {c.case_number} • {c.court}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {c.statutes_cited?.slice(0, 3).map((st, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700/80"
                            >
                              {st.section}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        <Badge variant={c.disposition?.badge_color || 'emerald'} size="sm">
                          {c.disposition?.status || 'ALLOWED'}
                        </Badge>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  No judgments found matching "{searchQuery}". Try searching "Section 41", "138", or "Privacy".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleChat}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
              isChatOpen
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Ask Case AI</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-200 active:scale-95 shrink-0"
          >
            <UploadCloud className="w-4 h-4 text-slate-950" />
            <span className="hidden xs:inline">Upload Judgment</span>
            <span className="xs:hidden">Upload</span>
          </button>
        </div>
      </div>
    </header>
  );
}
