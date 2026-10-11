import React, { useState } from 'react';
import { ModularDossierCards } from './ModularDossierCards';

export function CourtRegistrySection({
  dossiers = [],
  onSelectDossier,
  onDownloadPdf,
  onRequestSeal,
  onBatchCheck,
  onExportSheet,
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedForum, setSelectedForum] = useState('all');
  const [tableFilter, setTableFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState('10');
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
      d.title.toLowerCase().includes(q) ||
      d.cnr.toLowerCase().includes(q) ||
      d.citation.toLowerCase().includes(q) ||
      d.court.toLowerCase().includes(q) ||
      d.statutes.some((s) => s.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-4">
      {/* Controls & Section Header */}
      <div className="bg-surface rounded-lg border border-outline-variant shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">folder_special</span>
              <h3 className="font-headline text-lg font-bold text-primary tracking-tight">
                Court Docket Registry & Cause Intelligence
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5 font-body">
              High Court & Supreme Court Bench tracking with verified registry certifications
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBatchCheck}
              className="px-3 py-1.5 rounded bg-surface hover:bg-surface-container border border-outline-variant text-xs font-semibold text-on-surface flex items-center gap-1.5 shadow-2xs transition active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-600">file_upload</span>
              Batch CNR Check
            </button>
            <button
              onClick={onExportSheet}
              className="px-3 py-1.5 rounded bg-primary text-white hover:bg-primary-container text-xs font-semibold flex items-center gap-1.5 shadow-xs transition active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">download</span>
              Export Docket Sheet
            </button>
          </div>
        </div>

        {/* View Filter Tabs & Inputs */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs font-label overflow-x-auto custom-scroll pb-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 transition ${
                activeTab === 'all'
                  ? 'font-semibold text-primary border-b-2 border-secondary bg-secondary-container/40 rounded-t'
                  : 'text-on-surface-variant hover:text-primary font-medium'
              }`}
            >
              All Tracked Cases (1,248)
            </button>
            <button
              onClick={() => setActiveTab('hearing')}
              className={`px-3 py-1.5 transition ${
                activeTab === 'hearing'
                  ? 'font-semibold text-primary border-b-2 border-secondary bg-secondary-container/40 rounded-t'
                  : 'text-on-surface-variant hover:text-primary font-medium'
              }`}
            >
              Listed for Hearing{' '}
              <span className="bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full text-[10px] ml-1 font-semibold">
                12
              </span>
            </button>
            <button
              onClick={() => setActiveTab('reserved')}
              className={`px-3 py-1.5 transition ${
                activeTab === 'reserved'
                  ? 'font-semibold text-primary border-b-2 border-secondary bg-secondary-container/40 rounded-t'
                  : 'text-on-surface-variant hover:text-primary font-medium'
              }`}
            >
              Orders Reserved{' '}
              <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded-full text-[10px] ml-1 font-semibold">
                5
              </span>
            </button>
            <button
              onClick={() => setActiveTab('certified')}
              className={`px-3 py-1.5 transition ${
                activeTab === 'certified'
                  ? 'font-semibold text-primary border-b-2 border-secondary bg-secondary-container/40 rounded-t'
                  : 'text-on-surface-variant hover:text-primary font-medium'
              }`}
            >
              Certified Copy Dispatched{' '}
              <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full text-[10px] ml-1 font-semibold">
                48
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedForum}
              onChange={(e) => setSelectedForum(e.target.value)}
              className="text-xs bg-surface-container-low border border-outline-variant rounded px-2.5 py-1 text-on-surface font-medium focus:outline-none focus:border-secondary"
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
                placeholder="Filter rows..."
                className="w-full text-xs pl-7 pr-2 py-1 rounded border border-outline-variant bg-surface focus:outline-none focus:border-secondary font-body"
              />
              <span className="material-symbols-outlined absolute left-2 top-1.5 text-[14px] text-slate-400">
                search
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MODULAR CASE DOSSIER CARDS (Multi-Column Structured Grid) */}
      <ModularDossierCards
        dossiers={finalDossiers}
        onSelectDossier={onSelectDossier}
        onDownloadPdf={onDownloadPdf}
        onRequestSeal={onRequestSeal}
      />

      {/* Pagination & Institutional Footer Summary */}
      <div className="px-4 py-3 bg-white rounded-lg border border-outline-variant shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant font-label">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 font-semibold text-primary">
            <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
            Showing 1–{finalDossiers.length} of 1,248 Verified Dockets
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-500 font-mono">Registry Hash: 0x9f8c...3e1a</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Rows per bench:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            className="bg-surface border border-outline-variant rounded px-2 py-0.5 text-xs text-on-surface"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>

          <div className="flex items-center ml-2 border border-outline-variant rounded overflow-hidden">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 bg-surface hover:bg-slate-100 border-r border-outline-variant disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[15px]">chevron_left</span>
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`px-2.5 py-1 text-xs font-semibold ${
                currentPage === 1 ? 'bg-primary text-white' : 'bg-surface hover:bg-slate-100 text-on-surface'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`px-2.5 py-1 text-xs font-medium ${
                currentPage === 2 ? 'bg-primary text-white' : 'bg-surface hover:bg-slate-100 text-on-surface'
              }`}
            >
              2
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className={`px-2.5 py-1 text-xs font-medium ${
                currentPage === 3 ? 'bg-primary text-white' : 'bg-surface hover:bg-slate-100 text-on-surface'
              }`}
            >
              3
            </button>
            <span className="px-2 py-1 bg-surface text-slate-400 text-xs">...</span>
            <button
              onClick={() => setCurrentPage(125)}
              className="px-2.5 py-1 bg-surface hover:bg-slate-100 text-on-surface text-xs font-medium"
            >
              125
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-2.5 py-1 bg-surface hover:bg-slate-100 border-l border-outline-variant"
            >
              <span className="material-symbols-outlined text-[15px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bench Announcement & Cause List Synchronizer Micro-Card */}
      <div className="p-3.5 rounded-lg bg-surface border border-outline-variant flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 border border-secondary/30">
            <span className="material-symbols-outlined text-[18px] text-secondary">campaign</span>
          </div>
          <div>
            <span className="font-semibold text-primary font-headline">Supreme Court Roster Notice:</span>
            <span className="text-on-surface-variant ml-1 font-body">
              Special Constitution Bench on Digital Personal Data Protection Act appeals notified for next Tuesday (Item 1 to 5).
            </span>
          </div>
        </div>
        <button
          onClick={() => alert('Opening Supreme Court Gazette Notification No. SC/ROSTER/2025/44B')}
          className="shrink-0 px-2.5 py-1 rounded text-primary hover:text-secondary font-semibold border border-outline-variant hover:border-secondary flex items-center gap-1 transition"
        >
          View Official Notification
          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </button>
      </div>
    </div>
  );
}
