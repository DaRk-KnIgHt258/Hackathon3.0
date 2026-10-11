import React from 'react';

export function InstitutionalFooter() {
  return (
    <footer className="bg-primary text-white border-t border-slate-800 mt-auto py-5 px-4 sm:px-6">
      <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-label text-slate-400">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-white font-bold font-headline">
            <span className="material-symbols-outlined text-secondary text-[18px]">balance</span>
            LexoraDocs Jurisprudence Intelligence
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-center sm:text-left">
            Certified under Supreme Court Electronic Case Management Guidelines (CIS 3.2)
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <a className="hover:text-secondary transition" href="#bar-council">
            Bar Council Security Standards
          </a>
          <a className="hover:text-secondary transition" href="#api-gateway">
            Registry API Gateway
          </a>
          <a className="hover:text-secondary transition" href="#digiseal">
            DigiSeal Compliance
          </a>
          <a className="hover:text-secondary transition" href="#registry-settings">
            Court Registry Settings
          </a>
          <span className="text-slate-400 font-mono text-[11px] bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/60 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            All 25 High Courts Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
