import React, { useState, useEffect } from 'react';
import { ModularDossierCards } from './ModularDossierCards';
import { AppIcon } from '../common/AppIcon';

export function CourtRegistrySection({
  dossiers = [],
  onSelectDossier,
  onDownloadPdf,
  onRequestSeal,
  onBatchCheck,
  onExportSheet,
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

  // Tab filtering
  const filteredByTab = dossiers.filter((d) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'hearing') return d.tabCategory === 'hearing';
    if (activeTab === 'reserved') return d.tabCategory === 'reserved';
    if (activeTab === 'certified') return d.tabCategory === 'certified';
    return true;
  });

  // Forum filtering
  const filteredByForum = filteredByTab.filter((d) => {
    if (selectedForum === 'all') return true;
    return d.court.toLowerCase().includes(selectedForum.toLowerCase());
  });

  // Text filtering
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

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedForum, tableFilter, rowsPerPage]);

  // Real Pagination
  const pageSize = Number(rowsPerPage);
  const totalPages = Math.max(1, Math.ceil(finalDossiers.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedDossiers = finalDossiers.slice(startIndex, startIndex + pageSize);

  // Category counts
  const countAll = dossiers.length;
  const countHearing = dossiers.filter((d) => d.tabCategory === 'hearing').length;
  const countReserved = dossiers.filter((d) => d.tabCategory === 'reserved').length;
  const countCertified = dossiers.filter((d) => d.tabCategory === 'certified').length;

  const handleTabClick = (tab) => {
    setInternalTab(tab);
    if (onTabFilterChange) onTabFilterChange(tab);
  };

  return (
    <div className="space-y-4">
      {/* Controls & Section Header */}
      <div className="bg-surface rounded-lg border border-outline-variant shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <AppIcon name="folder_special" className="w-5 h-5 text-secondary" />
              <h3 className="font-headline text-lg font-bold text-primary tracking-tight">
                Court Docket Registry & Cause Intelligence
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5 font-body">
              Supreme Court & High Court Bench tracking with verified DigiSeal registry certifications
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBatchCheck}
              className="px-3 py-1.5 rounded bg-surface hover:bg-surface-container border border-outline-variant text-xs font-semibold text-on-surface flex items-center gap-1.5 shadow-2xs transition active:scale-95 cursor-pointer"
            >
              <AppIcon name="sync" className="w-4 h-4 text-slate-600" />
              Batch CNR Check
            </button>
            <button
              onClick={onExportSheet}
              className="px-3 py-1.5 rounded bg-primary text-white hover:bg-primary-container text-xs font-semibold flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
            >
              <AppIcon name="download" className="w-4 h-4 text-secondary" />
              Export Docket Sheet (.CSV)
            </button>
          </div>
        </div>

        {/* View Filter Tabs & Inputs */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs font-label overflow-x-auto custom-scroll pb-1">
            <button
              onClick={() => handleTabClick('all')}
              className={`px-3 py-1.5 transition cursor-pointer ${
                activeTab === 'all'
                  ? 'font-semibold text-primary border-b-2 border-secondary bg-secondary-container/40 rounded-t'
                  : 'text-on-surface-variant hover:text-primary font-medium'
              }`}
            >
              All Tracked Cases ({countAll})
            </button>
            <button
              onClick={() => handleTabClick('hearing')}
              className={`px-3 py-1.5 transition cursor-pointer ${
                activeTab === 'hearing'
                  ? 'font-semibold text-primary border-b-2 border-secondary bg-secondary-container/40 rounded-t'
                  : 'text-on-surface-variant hover:text-primary font-medium'
              }`}
            >
              Listed for Hearing{' '}
              <span className="bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full text-[10px] ml-1 font-semibold">
                {countHearing}
              </span>
            </button>
            <button
              onClick={() => handleTabClick('reserved')}
              className={`px-3 py-1.5 transition cursor-pointer ${
                activeTab === 'reserved'
                  ? 'font-semibold text-primary border-b-2 border-secondary bg-secondary-container/40 rounded-t'
                  : 'text-on-surface-variant hover:text-primary font-medium'
              }`}
            >
              Orders Reserved{' '}
              <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded-full text-[10px] ml-1 font-semibold">
                {countReserved}
              </span>
            </button>
            <button
              onClick={() => handleTabClick('certified')}
              className={`px-3 py-1.5 transition cursor-pointer ${
                activeTab === 'certified'
                  ? 'font-semibold text-primary border-b-2 border-secondary bg-secondary-container/40 rounded-t'
                  : 'text-on-surface-variant hover:text-primary font-medium'
              }`}
            >
              Certified Copy Dispatched{' '}
              <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full text-[10px] ml-1 font-semibold">
                {countCertified}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedForum}
              onChange={(e) => onSelectForum && onSelectForum(e.target.value)}
              className="text-xs bg-surface-container-low border border-outline-variant rounded px-2.5 py-1 text-on-surface font-medium focus:outline-none focus:border-secondary cursor-pointer"
            >
              <option value="all">All Benches & Tribunals</option>
              <option value="supreme">Supreme Court of India</option>
              <option value="delhi">Delhi High Court</option>
              <option value="bombay">Bombay High Court</option>
              <option value="nclat">NCLAT New Delhi</option>
            </select>

            <div className="relative flex-1 sm:w-44">
              <input
                type="text"
                value={tableFilter}
                onChange={(e) => setTableFilter(e.target.value)}
                placeholder="Filter current view..."
                className="w-full text-xs pl-7 pr-2 py-1 rounded border border-outline-variant bg-surface focus:outline-none focus:border-secondary font-body"
              />
              <AppIcon name="search" className="absolute left-2 top-2 w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* MODULAR CASE DOSSIER CARDS (Multi-Column Structured Grid) */}
      <ModularDossierCards
        dossiers={paginatedDossiers}
        onSelectDossier={onSelectDossier}
        onDownloadPdf={onDownloadPdf}
        onRequestSeal={onRequestSeal}
        onAskAi={onAskAi}
      />

      {/* Pagination & Summary Footer */}
      <div className="px-4 py-3 bg-white rounded-lg border border-outline-variant shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant font-label">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
            <AppIcon name="verified_user" className="w-4 h-4 text-secondary" />
            Showing {finalDossiers.length === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + pageSize, finalDossiers.length)} of {finalDossiers.length} Filtered Dockets
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-500 font-mono">Registry Hash: 0x9f8c...3e1a</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            className="bg-surface border border-outline-variant rounded px-2 py-0.5 text-xs text-on-surface cursor-pointer"
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>

          {/* Dynamic Page Buttons */}
          <div className="flex items-center ml-2 border border-outline-variant rounded overflow-hidden">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="px-2 py-1 bg-surface hover:bg-slate-100 border-r border-outline-variant disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <AppIcon name="chevron_left" className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-2.5 py-1 text-xs font-semibold cursor-pointer ${
                  safeCurrentPage === pageNum
                    ? 'bg-primary text-white'
                    : 'bg-surface hover:bg-slate-100 text-on-surface'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="px-2 py-1 bg-surface hover:bg-slate-100 border-l border-outline-variant disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Next Page"
            >
              <AppIcon name="chevron_right" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bench Announcement & Cause List Synchronizer Micro-Card */}
      <div className="p-3.5 rounded-lg bg-surface border border-outline-variant flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 border border-secondary/30">
            <AppIcon name="campaign" className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <span className="font-semibold text-primary font-headline">Supreme Court Roster Notice:</span>
            <span className="text-on-surface-variant ml-1 font-body">
              Special Constitution Bench on Digital Personal Data Protection Act appeals notified for next Tuesday (Item 1 to 5).
            </span>
          </div>
        </div>
        <button
          onClick={onOpenGazette}
          className="shrink-0 px-2.5 py-1 rounded text-primary hover:text-secondary font-semibold border border-outline-variant hover:border-secondary flex items-center gap-1.5 transition cursor-pointer"
        >
          View Official Gazette Notification
          <AppIcon name="open_in_new" className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
