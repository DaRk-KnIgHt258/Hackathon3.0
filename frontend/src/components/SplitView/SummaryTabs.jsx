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
  ChevronRight,
  ShieldCheck,
  ListOrdered
} from 'lucide-react';

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
    <div className="rounded-xl border border-outline-variant bg-white p-5 shadow-sm space-y-4">
      {/* Tab Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface-container-low border border-outline-variant">
          <button
            onClick={() => setActiveTab('lawyer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'lawyer'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-slate-600 hover:text-primary'
            }`}
          >
            <Gavel className="w-3.5 h-3.5" />
            <span>Advocate Headnote</span>
          </button>

          <button
            onClick={() => setActiveTab('citizen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'citizen'
                ? 'bg-cyan-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-primary'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Citizen Mode</span>
          </button>

          <button
            onClick={() => setActiveTab('precedents')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'precedents'
                ? 'bg-indigo-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-primary'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Precedents Cited ({activeCase.precedents_cited?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('facts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'facts'
                ? 'bg-amber-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-primary'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Key Facts</span>
          </button>
        </div>

        {/* Multilingual Selector for Citizen Mode */}
        {activeTab === 'citizen' && (
          <div className="flex items-center gap-2 self-end sm:self-auto animate-in fade-in duration-200">
            <Languages className="w-3.5 h-3.5 text-cyan-700" />
            <div className="flex items-center rounded-lg bg-surface-container-low border border-outline-variant p-0.5 text-xs font-medium">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  lang === 'en'
                    ? 'bg-cyan-700 text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  lang === 'hi'
                    ? 'bg-cyan-700 text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-primary'
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
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <BookOpenCheck className="w-4 h-4 text-emerald-700" />
                <span>Binding Legal Rule (Ratio Decidendi)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyHeadnote}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-surface hover:bg-surface-container text-slate-700 border border-outline-variant transition cursor-pointer shadow-2xs"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                  <span>{copied ? 'Copied' : 'Copy Ratio'}</span>
                </button>
                {onSelectCitation && (
                  <button
                    onClick={() => onSelectCitation('Ratio Decidendi')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition cursor-pointer"
                  >
                    <span>View in Judgment</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant leading-relaxed text-sm text-slate-800 space-y-2">
              {activeCase.lawyer_headnote && activeCase.lawyer_headnote.trim() ? (
                <p className="font-serif italic text-slate-900 leading-relaxed">
                  "{activeCase.lawyer_headnote}"
                </p>
              ) : (
                <div className="py-3 text-center space-y-1.5 text-slate-500">
                  <Gavel className="w-6 h-6 text-secondary mx-auto" />
                  <p className="text-xs font-medium text-slate-700">Statutory ratio decidendi under extraction</p>
                  <p className="text-[11px] text-slate-500">Nyaya AI identifies the binding rule of law upon full docket ingestion.</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
              <span className="font-medium text-slate-700">Target Users:</span>
              <span className="px-2 py-0.5 rounded bg-surface border border-outline-variant text-slate-700">Advocates</span>
              <span className="px-2 py-0.5 rounded bg-surface border border-outline-variant text-slate-700">Law Clerks</span>
              <span className="px-2 py-0.5 rounded bg-surface border border-outline-variant text-slate-700">Judicial Officers</span>
            </div>
          </div>
        )}

        {/* Tab 2: Citizen Plain Language Mode */}
        {activeTab === 'citizen' && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-800">
                <Sparkles className="w-4 h-4 text-cyan-700" />
                <span>Plain-Language Explanation for Everyday Citizens</span>
              </div>
              <span className="text-[11px] text-slate-500">
                Language: {lang === 'en' ? 'English' : 'हिंदी'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 leading-relaxed text-sm text-cyan-950 font-sans space-y-3">
              <p className="font-medium text-[15px] leading-relaxed">
                {getCitizenText() || (
                  <span className="text-slate-500 text-xs italic">
                    Plain-language citizen summary is generated across English, Hindi, and regional languages for judicial transparency.
                  </span>
                )}
              </p>
              
              <div className="pt-2 border-t border-cyan-200 flex items-center gap-2 text-xs text-cyan-800">
                <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-700" />
                <span>Zero Legal Jargon: Designed for litigants navigating court proceedings.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Precedents Cited */}
        {activeTab === 'precedents' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs text-indigo-800 font-semibold">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-indigo-700" />
                <span>Prior Case Precedents Analysed by Court</span>
              </div>
              <span className="text-slate-500">{activeCase.precedents_cited?.length || 0} citations indexed</span>
            </div>

            <div className="space-y-2.5">
              {activeCase.precedents_cited && activeCase.precedents_cited.length > 0 ? (
                activeCase.precedents_cited.map((item, idx) => {
                  const itemTitle = typeof item === 'string' ? item : (item.title || item.name || 'Prior Precedent');
                  const itemRelation = typeof item === 'string' ? 'Cited' : (item.relation || 'Cited');
                  const itemNote = typeof item === 'string' ? 'Referred to during appellate determination.' : item.note;

                  const isOverruled = itemRelation?.toLowerCase().includes('overruled');
                  const isFollowed = itemRelation?.toLowerCase().includes('followed');

                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-surface-container-low border border-outline-variant hover:border-slate-400 transition space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-primary">
                          {itemTitle}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                            isOverruled
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : isFollowed
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          }`}
                        >
                          {itemRelation}
                        </span>
                      </div>
                      {itemNote && (
                        <p className="text-xs text-slate-600">
                          {itemNote}
                        </p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-500 italic p-3">No prior precedents recorded for this order.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Key Facts & Timeline */}
        {activeTab === 'facts' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
              <ListOrdered className="w-4 h-4 text-amber-700" />
              <span>Procedural Facts & Timeline of Litigation</span>
            </div>

            <div className="space-y-2">
              {activeCase.key_facts && activeCase.key_facts.length > 0 ? (
                activeCase.key_facts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant text-xs text-slate-800"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold shrink-0 text-[11px] border border-amber-300">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed mt-0.5 text-slate-800">{fact}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic p-3">Procedural timeline and key litigation facts not indexed.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
