import React, { useState } from 'react';
import {
  Gavel,
  HeartHandshake,
  Languages,
  Sparkles,
  BookOpenCheck,
  Scale,
  History,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  ListOrdered
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function SummaryTabs({ activeCase, onSelectCitation }) {
  const [activeTab, setActiveTab] = useState('lawyer'); // 'lawyer' | 'citizen' | 'precedents' | 'facts'
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [copied, setCopied] = useState(false);

  const getCitizenText = () => {
    if (lang === 'hi') return activeCase.citizen_summary_hi || activeCase.citizen_summary_en;
    return activeCase.citizen_summary_en;
  };

  const handleCopyHeadnote = () => {
    navigator.clipboard.writeText(activeCase.lawyer_headnote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-5 shadow-lg space-y-4">
      {/* Tab Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
          <button
            onClick={() => setActiveTab('lawyer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'lawyer'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gavel className="w-3.5 h-3.5" />
            <span>Advocate Headnote</span>
          </button>

          <button
            onClick={() => setActiveTab('citizen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'citizen'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Citizen Mode</span>
          </button>

          <button
            onClick={() => setActiveTab('precedents')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'precedents'
                ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Precedents Cited ({activeCase.precedents_cited?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('facts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'facts'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Key Facts</span>
          </button>
        </div>

        {/* Multilingual Selector for Citizen Mode */}
        {activeTab === 'citizen' && (
          <div className="flex items-center gap-2 self-end sm:self-auto animate-in fade-in duration-200">
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <div className="flex items-center rounded-lg bg-slate-950/80 border border-slate-800 p-0.5 text-xs font-medium">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-md transition ${
                  lang === 'en'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 rounded-md transition ${
                  lang === 'hi'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी (Hindi)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tab Panels */}
      <div>
        {/* Tab 1: Advocate Headnote (Ratio Decidendi) */}
        {activeTab === 'lawyer' && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <BookOpenCheck className="w-4 h-4" />
                <span>Binding Legal Rule (Ratio Decidendi)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyHeadnote}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Ratio'}</span>
                </button>
                {onSelectCitation && (
                  <button
                    onClick={() => onSelectCitation('Ratio Decidendi')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition"
                  >
                    <span>View in Judgment</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 leading-relaxed text-sm text-slate-200 space-y-2">
              <p className="font-serif italic text-slate-100">
                "{activeCase.lawyer_headnote}"
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Target Users:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Advocates</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Law Clerks</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Judicial Officers</span>
            </div>
          </div>
        )}

        {/* Tab 2: Citizen Plain Language Mode */}
        {activeTab === 'citizen' && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>Plain-Language Explanation for Everyday Citizens</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Language: {lang === 'en' ? 'English' : 'हिंदी'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30 leading-relaxed text-sm text-slate-100 font-sans space-y-3">
              <p className="font-medium text-[15px]">
                {getCitizenText()}
              </p>
              
              <div className="pt-2 border-t border-cyan-900/30 flex items-center gap-2 text-xs text-cyan-300">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero Legal Jargon: Designed for litigants navigating court proceedings.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Precedents Cited */}
        {activeTab === 'precedents' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4" />
                <span>Prior Case Precedents Analysed by Court</span>
              </div>
              <span className="text-slate-400">{activeCase.precedents_cited?.length || 0} citations indexed</span>
            </div>

            <div className="space-y-2.5">
              {activeCase.precedents_cited && activeCase.precedents_cited.length > 0 ? (
                activeCase.precedents_cited.map((item, idx) => {
                  const isOverruled = item.relation?.toLowerCase().includes('overruled');
                  const isFollowed = item.relation?.toLowerCase().includes('followed');

                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 hover:border-slate-700 transition space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-200">
                          {item.title}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                            isOverruled
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : isFollowed
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}
                        >
                          {item.relation || 'Cited'}
                        </span>
                      </div>
                      {item.note && (
                        <p className="text-xs text-slate-400">
                          {item.note}
                        </p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-500 italic p-3">No major prior precedents recorded for this order.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Key Facts & Timeline */}
        {activeTab === 'facts' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <ListOrdered className="w-4 h-4" />
              <span>Procedural Facts & Timeline of Litigation</span>
            </div>

            <div className="space-y-2">
              {activeCase.key_facts?.map((fact, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-300"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed mt-0.5">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
