import React, { useState } from 'react';
import { Gavel, HeartHandshake, Languages, Sparkles, BookOpenCheck } from 'lucide-react';

export function SummaryTabs({ activeCase }) {
  const [activeTab, setActiveTab] = useState('lawyer'); // 'lawyer' | 'citizen'
  const [lang, setLang] = useState('en'); // 'en' | 'hi' | 'mr'

  const getCitizenText = () => {
    if (lang === 'hi') return activeCase.citizen_summary_hi || activeCase.citizen_summary_en;
    if (lang === 'mr') return activeCase.citizen_summary_mr || activeCase.citizen_summary_en;
    return activeCase.citizen_summary_en;
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-5 shadow-lg">
      {/* Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
          <button
            onClick={() => setActiveTab('lawyer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'lawyer'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gavel className="w-3.5 h-3.5" />
            <span>Advocate Headnotes (Ratio Decidendi)</span>
          </button>

          <button
            onClick={() => setActiveTab('citizen')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'citizen'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Citizen Plain Language Mode</span>
          </button>
        </div>

        {/* Multilingual Selector for Citizen Mode */}
        {activeTab === 'citizen' && (
          <div className="flex items-center gap-1.5 self-end sm:self-auto animate-in fade-in duration-200">
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <div className="flex items-center rounded-lg bg-slate-950/80 border border-slate-800 p-0.5 text-xs font-medium">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-md transition ${lang === 'en' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 rounded-md transition ${lang === 'hi' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLang('mr')}
                className={`px-2.5 py-1 rounded-md transition ${lang === 'mr' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                मराठी
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-4">
        {activeTab === 'lawyer' ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <BookOpenCheck className="w-4 h-4" />
              <span>Legal Point of Law (Precedent Value)</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
              {activeCase.lawyer_headnote}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Simplified for Everyday Citizens & Litigants</span>
            </div>
            <p className="text-sm text-slate-100 leading-relaxed bg-cyan-950/20 p-4 rounded-xl border border-cyan-800/30 font-medium">
              {getCitizenText()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
