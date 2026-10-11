import React, { useState, useEffect } from 'react';
import { ModularDossierCards } from './ModularDossierCards';
import { AppIcon } from '../common/AppIcon';

const TAB_ITEMS = [
  { id: 'all',       label: 'All Cases',        countKey: 'all',       badgeBg: '' },
  { id: 'hearing',   label: 'Listed for Hearing', countKey: 'hearing',   badgeBg: 'bg-amber-100 text-amber-900' },
  { id: 'reserved',  label: 'Orders Reserved',   countKey: 'reserved',  badgeBg: 'bg-slate-100 text-slate-700' },
  { id: 'certified', label: 'Certified Copy',    countKey: 'certified', badgeBg: 'bg-emerald-100 text-emerald-800' },
];

export function CourtRegistrySection({
  dossiers = [],
  onSelectDossier,
  onDownloadPdf,
  onRequestSeal,
  onBatchCheck,
  onExportSheet,
  onOpenUpload,
  onOpenGazette,
  onAskAi,
  selectedForum = 'all',
  onSelectForum,
  activeTabFilter = 'all',
  onTabFilterChange,
}) {
  const [internalTab, setInternalTab] = useState('all');
  const activeTab = activeTabFilter !== 'all' ? activeTabFilter : internalTab;
  const [tableFilter, setTableFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState('6');
  const [currentPage, setCurrentPage] = useState(1);

  const countAll       = dossiers.length;
  const countHearing   = dossiers.filter((d) => d.tabCategory === 'hearing').length;
  const countReserved  = dossiers.filter((d) => d.tabCategory === 'reserved').length;
  const countCertified = dossiers.filter((d) => d.tabCategory === 'certified').length;

  const COUNTS = { all: countAll, hearing: countHearing, reserved: countReserved, certified: countCertified };

  /* Filtering */
  const filteredByTab = dossiers.filter((d) => {
    if (activeTab === 'all') return true;
    return d.tabCategory === activeTab;
  });
  const filteredByForum = filteredByTab.filter((d) =>
    selectedForum === 'all' ? true : d.court.toLowerCase().includes(selectedForum.toLowerCase())
  );
  const finalDossiers = filteredByForum.filter((d) => {
    if (!tableFilter.trim()) return true;
    const q = tableFilter.toLowerCase();
    return (
      (d.title || '').toLowerCase().includes(q) ||
      (d.cnr || '').toLowerCase().includes(q) ||
      (d.citation || '').toLowerCase().includes(q) ||
      (d.court || '').toLowerCase().includes(q) ||
      (d.statutes?.some((s) => s?.name?.toLowerCase().includes(q)) || false)
    );
  });

  useEffect(() => { setCurrentPage(1); }, [activeTab, selectedForum, tableFilter, rowsPerPage]);

  const pageSize       = Number(rowsPerPage);
  const totalPages     = Math.max(1, Math.ceil(finalDossiers.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex     = (safeCurrentPage - 1) * pageSize;
  const paginatedDossiers = finalDossiers.slice(startIndex, startIndex + pageSize);

  const handleTabClick = (tab) => {
    setInternalTab(tab);
    onTabFilterChange?.(tab);
  };

  return (
    <div className="space-y-4 animate-fade-up stagger-4">

      {/* ── SECTION HEADER ─────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-outline-variant shadow-2xs overflow-hidden">
        {/* Title row */}
        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center">
              <AppIcon name="folder_special" className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-base font-bold text-primary tracking-tight">
                Court Docket Registry
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Supreme Court & High Court bench tracking with verified DigiSeal certifications
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onOpenUpload && (
              <button
                onClick={onOpenUpload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-primary hover:bg-[#d6b46b]
                           text-xs font-bold shadow-2xs transition-all duration-150 active:scale-95 cursor-pointer"
                title="Upload Court Judgment PDF"
              >
                <AppIcon name="upload_file" className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">Upload Judgment</span>
              </button>
            )}
            <button
              onClick={onBatchCheck}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-slate-100 border border-outline-variant
                         text-xs font-semibold text-on-surface transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <AppIcon name="sync" className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Batch CNR Check</span>
            </button>
            <button
              onClick={onExportSheet}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary-container
                         text-xs font-semibold shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <AppIcon name="download" className="w-3.5 h-3.5 text-secondary" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Tab bar + filter controls */}
        <div className="px-4 sm:px-5 pt-2 pb-3 flex flex-wrap items-center justify-between gap-3">
          {/* Pill tabs */}
          <div className="flex items-center gap-1 overflow-x-auto custom-scroll pb-0.5">
            {TAB_ITEMS.map((tab) => {
              const isActive = activeTab === tab.id;
              const count = COUNTS[tab.countKey];
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-label font-medium whitespace-nowrap
                    transition-all duration-150 cursor-pointer shrink-0
                    ${isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                    }`}
                >
                  {tab.label}
                  {count > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold
                      ${isActive ? 'bg-white/20 text-white' : (tab.badgeBg || 'bg-slate-200 text-slate-700')}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Forum select + text filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedForum}
              onChange={(e) => onSelectForum?.(e.target.value)}
              className="text-xs bg-surface-container-low border border-outline-variant rounded-lg px-2.5 py-1.5
                         text-on-surface font-medium focus:outline-none focus:border-secondary cursor-pointer transition-colors"
            >
              <option value="all">All Benches</option>
              <option value="supreme">Supreme Court</option>
              <option value="delhi">Delhi HC</option>
              <option value="bombay">Bombay HC</option>
              <option value="nclat">NCLAT</option>
            </select>
            <div className="relative">
              <AppIcon name="search" className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={tableFilter}
                onChange={(e) => setTableFilter(e.target.value)}
                placeholder="Filter view…"
                className="text-xs pl-7 pr-3 py-1.5 rounded-lg border border-outline-variant bg-surface
                           focus:outline-none focus:border-secondary font-body w-36 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── CASE CARDS GRID ──────────────────────────────────── */}
      <ModularDossierCards
        dossiers={paginatedDossiers}
        onSelectDossier={onSelectDossier}
        onDownloadPdf={onDownloadPdf}
        onRequestSeal={onRequestSeal}
        onAskAi={onAskAi}
      />

      {/* ── PAGINATION FOOTER ─────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-outline-variant shadow-2xs px-4 py-3
                      flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-label">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 font-semibold text-primary">
            <AppIcon name="verified_user" className="w-4 h-4 text-secondary" />
            Showing {finalDossiers.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, finalDossiers.length)} of {finalDossiers.length} dockets
          </span>
          <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
            Registry Hash: 0x9f8c…3e1a
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            className="bg-surface border border-outline-variant rounded-lg px-2 py-1 text-xs text-on-surface cursor-pointer focus:outline-none focus:border-secondary"
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-outline-variant bg-surface hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <AppIcon name="chevron_left" className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors cursor-pointer
                  ${safeCurrentPage === pageNum
                    ? 'bg-primary text-white'
                    : 'bg-surface border border-outline-variant hover:bg-slate-100 text-on-surface'
                  }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-outline-variant bg-surface hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <AppIcon name="chevron_right" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── BENCH ANNOUNCEMENT STRIP ──────────────────────────── */}
      <div className="bg-white rounded-xl border border-outline-variant shadow-2xs px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary-container border border-secondary/30 flex items-center justify-center shrink-0">
            <AppIcon name="campaign" className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-xs text-on-surface-variant">
            <span className="font-semibold text-primary font-headline">SC Roster Notice: </span>
            Special Constitution Bench on Digital Personal Data Protection Act — notified for next Tuesday (Items 1–5).
          </p>
        </div>
        <button
          onClick={onOpenGazette}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant hover:border-secondary/50
                     text-xs font-semibold text-primary hover:text-secondary transition-all duration-150 active:scale-95 cursor-pointer"
        >
          View Official Gazette
          <AppIcon name="open_in_new" className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
