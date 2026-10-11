import React from 'react';

export function ModularDossierCards({
  dossiers = [],
  onSelectDossier,
  onDownloadPdf,
  onRequestSeal,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {dossiers.map((card) => {
        return (
          <div
            key={card.id}
            className="bg-surface rounded-lg border border-outline-variant hover:border-secondary/50 shadow-sm transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
            onClick={() => onSelectDossier && onSelectDossier(card)}
          >
            {/* Card Header */}
            <div className="p-4 border-b border-slate-100 bg-white">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono">
                  {card.cnr}
                </span>
                {card.statusBadge}
              </div>

              <h4 className="font-headline font-bold text-base text-primary group-hover:text-secondary transition-colors mt-2 leading-tight">
                {card.title}
              </h4>

              <div className="text-[11px] text-on-surface-variant font-mono mt-1 flex flex-wrap items-center gap-1.5">
                <span className="text-secondary font-semibold">Citation:</span> {card.citation}
                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                <span className="text-slate-500">{card.appealNumber}</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono">{card.diaryNumber}</div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3 bg-[#FCFDFE] flex-1 text-xs">
              {/* Bench & Forum */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-label block">
                  Bench & Forum
                </span>
                <div className="font-medium text-slate-800 mt-0.5">{card.coram}</div>
                <span className="inline-block mt-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-primary border border-slate-300">
                  {card.court}
                </span>
              </div>

              {/* Statutes & Sections */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-label block">
                  Statutes & Sections
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {card.statutes.map((st, i) => (
                    <span
                      key={i}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${st.badgeClass}`}
                    >
                      {st.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stage / Hearing Date */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-800">{card.stageTitle}</div>
                  <span className={`text-[11px] flex items-center gap-1 mt-0.5 ${card.stageSubClass}`}>
                    <span className="material-symbols-outlined text-[13px]">{card.stageIcon}</span>
                    {card.stageSub}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-mono">{card.registrySealTag}</div>
                </div>
              </div>
            </div>

            {/* Card Action Footer */}
            <div
              className="px-4 py-2.5 bg-slate-50 border-t border-outline-variant flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  if (card.actionType === 'download') {
                    onDownloadPdf && onDownloadPdf(card);
                  } else {
                    onSelectDossier && onSelectDossier(card);
                  }
                }}
                className={`px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1 shadow-2xs transition active:scale-95 ${card.actionBtnClass}`}
              >
                <span className="material-symbols-outlined text-[14px]">{card.actionIcon}</span>
                {card.actionLabel}
              </button>

              <button
                onClick={() => onSelectDossier && onSelectDossier(card)}
                className="p-1 rounded text-slate-400 hover:text-primary hover:bg-slate-100 transition"
                title="More Options"
              >
                <span className="material-symbols-outlined text-[16px]">more_vert</span>
              </button>
            </div>
          </div>
        );
      })}

      {/* INSTITUTIONAL CTA CARD: SEAL ATTESTATION REQUEST */}
      <div className="bg-gradient-to-br from-primary to-[#18345C] text-white rounded-lg p-5 border border-secondary/40 shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-secondary/10 pointer-events-none"></div>
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary text-primary flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined fill-icon text-[24px]">verified</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-secondary font-semibold">
                Fast-Track Registry
              </span>
              <h5 className="font-headline text-base font-bold text-white tracking-tight">
                Request Urgent Court Seal Attestation
              </h5>
            </div>
          </div>
          <p className="text-xs text-slate-200 mt-3 leading-relaxed font-body">
            Direct liaison with High Court & Supreme Court Registrar e-Filing desks for priority certified copies and physical apostille stamp verification.
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => onRequestSeal && onRequestSeal()}
            className="px-3 py-1.5 rounded bg-secondary hover:bg-[#d6b46b] text-primary text-xs font-bold font-label transition shadow-sm flex items-center gap-1.5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
            Request Seal Verification
          </button>
          <a
            href="#guidelines"
            onClick={(e) => {
              e.preventDefault();
              onRequestSeal && onRequestSeal();
            }}
            className="text-xs text-secondary hover:underline font-label font-medium px-2 py-1"
          >
            Desk Guidelines
          </a>
        </div>
      </div>
    </div>
  );
}
