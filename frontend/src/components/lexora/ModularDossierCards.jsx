import React, { useState, useEffect, useRef } from 'react';
import AppIcon from '../common/AppIcon';

const DISPOSITION_COLORS = {
  ALLOWED: { bar: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  BAIL_GRANTED: { bar: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  DISMISSED: { bar: 'bg-red-400', pill: 'bg-red-50 text-red-800 border-red-200' },
  BAIL_REJECTED: { bar: 'bg-red-400', pill: 'bg-red-50 text-red-800 border-red-200' },
  REMANDED: { bar: 'bg-amber-400', pill: 'bg-amber-50 text-amber-800 border-amber-200' },
  RESERVED: { bar: 'bg-amber-400', pill: 'bg-amber-50 text-amber-800 border-amber-200' },
  DISPOSED_WITH_DIRECTIONS: { bar: 'bg-sky-400', pill: 'bg-sky-50 text-sky-800 border-sky-200' },
  PARTLY_ALLOWED: { bar: 'bg-sky-400', pill: 'bg-sky-50 text-sky-800 border-sky-200' },
};

function getDispositionStyle(disposition = '') {
  for (const [key, style] of Object.entries(DISPOSITION_COLORS)) {
    if (disposition.toUpperCase().includes(key)) return style;
  }
  return { bar: 'bg-slate-400', pill: 'bg-slate-100 text-slate-700 border-slate-200' };
}

const STAGGER_CLASSES = ['stagger-1','stagger-2','stagger-3','stagger-4','stagger-5','stagger-6'];

export function ModularDossierCards({
  dossiers = [],
  onSelectDossier,
  onDownloadPdf,
  onRequestSeal,
  onAskAi,
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClickOut = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setActiveMenuId(null);
    };
    document.addEventListener('mousedown', onClickOut);
    return () => document.removeEventListener('mousedown', onClickOut);
  }, []);

  if (dossiers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-outline-variant shadow-2xs p-12 flex flex-col items-center gap-3 text-center animate-fade-scale">
        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
          <AppIcon name="folder_open" className="w-7 h-7 text-slate-400" />
        </div>
        <div>
          <p className="font-headline font-bold text-primary text-base">No dockets found</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" ref={menuRef}>
      {dossiers.map((card, idx) => {
        const dispStyle = getDispositionStyle(card.disposition || '');
        const isMenuOpen = activeMenuId === card.id;
        const stagger = STAGGER_CLASSES[idx % STAGGER_CLASSES.length];

        return (
          <article
            key={card.id}
            className={`bg-white rounded-xl border border-outline-variant shadow-2xs
                        flex flex-col relative overflow-hidden
                        card-hover hover:border-secondary/40 group cursor-pointer
                        animate-fade-up ${stagger}`}
            onClick={() => onSelectDossier?.(card)}
          >
            {/* Disposition accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${dispStyle.bar} group-hover:opacity-100 opacity-70 transition-opacity`} />

            {/* ── CARD HEADER ── */}
            <header className="px-4 pt-4 pb-3 border-b border-slate-100">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 truncate max-w-[160px]">
                  {card.cnr}
                </span>
                {card.statusBadge || (
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold border shrink-0 ${dispStyle.pill}`}>
                    {(card.disposition || '').split('_').join(' ').slice(0, 14) || 'ACTIVE'}
                  </span>
                )}
              </div>

              <h4 className="font-headline font-bold text-sm text-primary group-hover:text-secondary transition-colors leading-snug line-clamp-2">
                {card.title}
              </h4>

              <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-500 font-mono flex-wrap">
                <span className="text-secondary font-semibold">Citation:</span>
                <span>{card.citation}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="truncate max-w-[120px]">{card.appealNumber}</span>
              </div>
            </header>

            {/* ── CARD BODY ── */}
            <div className="px-4 py-3 space-y-2.5 flex-1 bg-slate-50/50">
              {/* Court & Bench */}
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 font-label">
                  Bench & Forum
                </span>
                <div className="text-xs font-medium text-slate-700 mt-0.5 line-clamp-1">{card.coram}</div>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-primary/8 text-primary border border-primary/15">
                  {card.court}
                </span>
              </div>

              {/* Statutes */}
              {card.statutes?.length > 0 && (
                <div>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 font-label">
                    Statutes
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {card.statutes.slice(0, 3).map((st, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {st.name}
                      </span>
                    ))}
                    {card.statutes.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                        +{card.statutes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Stage */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-700">{card.stageTitle}</div>
                  <span className={`text-[10px] flex items-center gap-1 mt-0.5 ${card.stageSubClass}`}>
                    <AppIcon name={card.stageIcon} className="w-3 h-3" />
                    {card.stageSub}
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-mono text-right leading-tight max-w-[100px] truncate">
                  {card.registrySealTag}
                </span>
              </div>
            </div>

            {/* ── CARD FOOTER ── */}
            <footer
              className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-1.5">
                {/* Primary action */}
                <button
                  onClick={() => {
                    if (card.actionType === 'download') onDownloadPdf?.(card);
                    else onSelectDossier?.(card);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold text-xs
                    shadow-2xs transition-all duration-150 active:scale-95 cursor-pointer ${card.actionBtnClass}`}
                >
                  <AppIcon name={card.actionIcon} className="w-3.5 h-3.5" />
                  {card.actionLabel}
                </button>

                {/* AI Q&A */}
                <button
                  onClick={() => onAskAi?.(card)}
                  title="Ask Nyaya AI about this case"
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-secondary-container
                             text-primary hover:text-secondary border border-slate-200 hover:border-secondary/30
                             text-xs font-semibold transition-all duration-150 active:scale-95 cursor-pointer group/ai"
                >
                  <AppIcon name="smart_toy" className="w-3.5 h-3.5 text-secondary group-hover/ai:animate-pulse" />
                  <span className="hidden sm:inline">AI Q&A</span>
                </button>
              </div>

              {/* Options menu */}
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveMenuId(isMenuOpen ? null : card.id); }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors cursor-pointer"
                  title="More Options"
                >
                  <AppIcon name="more_vert" className="w-4 h-4" />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 bottom-9 w-48 bg-white border border-outline-variant rounded-xl shadow-xl py-1.5 z-30 animate-fade-scale text-xs text-slate-700">
                    {[
                      { label: 'View Case Dossier',    icon: 'visibility',    action: () => onSelectDossier?.(card) },
                      { label: 'Ask Nyaya AI',          icon: 'smart_toy',     action: () => onAskAi?.(card), className: 'text-primary' },
                      { label: 'Download Certified PDF', icon: 'download',     action: () => onDownloadPdf?.(card) },
                      { label: 'Copy Citation',         icon: 'content_copy',  action: () => navigator.clipboard.writeText(`${card.title} - ${card.citation} (${card.cnr})`) },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => { setActiveMenuId(null); item.action(); }}
                        className={`w-full text-left px-3 py-2 flex items-center gap-2.5 hover:bg-slate-50 transition-colors cursor-pointer ${item.className || ''}`}
                      >
                        <AppIcon name={item.icon} className="w-3.5 h-3.5 text-secondary shrink-0" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </footer>
          </article>
        );
      })}

      {/* ── CTA CARD: SEAL ATTESTATION ── */}
      <div className="bg-gradient-to-br from-primary via-[#162D4A] to-[#18345C] text-white rounded-xl p-5 border border-secondary/30 shadow-sm relative overflow-hidden flex flex-col justify-between animate-fade-up stagger-5 card-hover hover:border-secondary/50 animate-pulse-glow">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-secondary/8 pointer-events-none" />
        <div className="absolute -left-4 top-0 w-20 h-20 rounded-full bg-white/3 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center shrink-0 shadow-md">
              <AppIcon name="verified" className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-secondary font-semibold">
                Fast-Track Registry
              </span>
              <h5 className="font-headline text-sm font-bold text-white leading-tight mt-0.5">
                Request Urgent Court Seal Attestation
              </h5>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Direct liaison with High Court & Supreme Court Registrar e-Filing desks for priority certified copies.
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
          <button
            onClick={() => onRequestSeal?.()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-secondary hover:bg-[#d6b46b] text-primary text-xs font-bold font-label transition-all duration-150 shadow-sm active:scale-95 cursor-pointer"
          >
            <AppIcon name="how_to_reg" className="w-4 h-4" />
            Request Seal
          </button>
          <span className="text-[10px] text-slate-400 font-label">Priority processing within 48h</span>
        </div>
      </div>
    </div>
  );
}

export default ModularDossierCards;
