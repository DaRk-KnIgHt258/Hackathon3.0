import React, { useState } from 'react';
import AppIcon from '../common/AppIcon';

export function CaseDossierModal({
  dossier,
  isOpen,
  onClose,
  onAskAi,
  onDownloadPdf,
  onOpenSplitView,
}) {
  const [activeLang, setActiveLang] = useState('en');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !dossier) return null;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(`${dossier.title} - ${dossier.citation} (${dossier.cnr})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCitizenSummaryText = () => {
    if (activeLang === 'hi') return dossier.citizenSummaryHi || dossier.citizenSummaryEn;
    if (activeLang === 'mr') return dossier.citizenSummaryMr || dossier.citizenSummaryHi || dossier.citizenSummaryEn;
    return dossier.citizenSummaryEn;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-xl border border-outline-variant shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-primary text-white flex items-start justify-between gap-4 border-b border-outline/30">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono bg-[#172D4E] text-secondary border border-secondary/40 px-2 py-0.5 rounded font-semibold">
                {dossier.cnr}
              </span>
              <span className="text-[11px] font-mono bg-white/10 text-slate-200 px-2 py-0.5 rounded">
                {dossier.citation}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full">
                <AppIcon name="verified" className="w-3.5 h-3.5 text-emerald-300" /> DigiSeal Attested
              </span>
            </div>
            <h3 className="font-headline text-lg sm:text-xl font-bold text-white mt-2 leading-tight">
              {dossier.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-body">
              {dossier.court} • {dossier.coram}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            title="Close Dossier"
          >
            <AppIcon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-scroll space-y-5 text-on-surface bg-[#F8FAFC]">
          {/* Executive Disposition Banner */}
          <div className="p-3.5 rounded-lg bg-surface border border-outline-variant shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-label block">
                Official Court Disposition
              </span>
              <div className="font-headline font-bold text-sm text-primary mt-0.5">
                {dossier.disposition}
              </div>
            </div>
            <div className="text-xs text-slate-500 font-mono sm:text-right">
              {dossier.registrySealTag}
            </div>
          </div>

          {/* Dual-Mode Summary Switcher (Advocate Ratio Decidendi vs Citizen Mode) */}
          <div className="bg-surface rounded-lg p-4 border border-outline-variant shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <AppIcon name="gavel" className="w-4 h-4 text-secondary" />
                <h4 className="font-headline font-bold text-sm text-primary">
                  Advocate Headnote & Ratio Decidendi
                </h4>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                Judicial Summary
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-body bg-slate-50 p-3 rounded border border-slate-200">
              {dossier.headnote}
            </p>
          </div>

          {/* Tri-Lingual Citizen Summary (English / Hindi / Marathi) */}
          <div className="bg-surface rounded-lg p-4 border border-outline-variant shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <AppIcon name="translate" className="w-4 h-4 text-amber-600" />
                <h4 className="font-headline font-bold text-sm text-primary">
                  Citizen-Facing Plain Language Summary
                </h4>
              </div>

              {/* Language Pills */}
              <div className="flex items-center gap-1">
                {[
                  { id: 'en', label: 'English' },
                  { id: 'hi', label: 'हिंदी (Hindi)' },
                  { id: 'mr', label: 'मराठी (Marathi)' },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setActiveLang(lang.id)}
                    className={`px-2.5 py-0.5 rounded text-xs font-semibold transition cursor-pointer ${
                      activeLang === lang.id
                        ? 'bg-secondary text-primary shadow-2xs font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-secondary/20 text-xs text-slate-800 leading-relaxed">
              {getCitizenSummaryText()}
            </div>
          </div>

          {/* Statutory Sections Applied */}
          {dossier.statuteDetails && (
            <div className="bg-surface rounded-lg p-4 border border-outline-variant shadow-2xs space-y-3">
              <h4 className="font-headline font-bold text-sm text-primary flex items-center gap-2">
                <AppIcon name="menu_book" className="w-4 h-4 text-secondary" />
                Statutory Codes & Procedural Impact
              </h4>
              <div className="space-y-2">
                {dossier.statuteDetails.map((st, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary font-mono">{st.section}</span>
                      <div className="flex items-center gap-1.5">
                        {st.page_ref && (
                          <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded">
                            {st.page_ref}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 font-semibold">{st.act}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 font-body">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-outline-variant flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onDownloadPdf) onDownloadPdf(dossier);
              }}
              className="px-3.5 py-2 rounded-lg bg-secondary text-primary font-bold text-xs hover:bg-[#d6b46b] transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
            >
              <AppIcon name="download" className="w-4 h-4" />
              Download Certified PDF
            </button>
            <button
              onClick={handleCopyCitation}
              className="px-3 py-2 rounded-lg bg-surface hover:bg-slate-100 border border-outline-variant text-primary text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <AppIcon name={copied ? 'check' : 'content_copy'} className="w-3.5 h-3.5" />
              {copied ? 'Citation Copied!' : 'Copy Citation'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onOpenSplitView && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSplitView(dossier);
                }}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Open Split-Screen Document Review Workspace"
              >
                <AppIcon name="splitscreen" className="w-4 h-4 text-primary" />
                Split-Screen Workspace
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                if (onAskAi) onAskAi(dossier);
              }}
              className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
            >
              <AppIcon name="smart_toy" className="w-4 h-4 text-secondary" />
              Ask Nyaya AI about Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseDossierModal;
