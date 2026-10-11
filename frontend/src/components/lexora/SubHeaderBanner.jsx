import React, { useState } from 'react';

export function SubHeaderBanner({ onSyncFeed }) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    if (onSyncFeed) onSyncFeed();
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <section className="bg-white border-b border-outline-variant px-4 sm:px-6 py-2.5 shadow-xs">
      <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant overflow-x-auto">
          <span className="material-symbols-outlined text-[16px] text-primary shrink-0">domain</span>
          <a className="hover:text-primary font-medium shrink-0" href="#sc">
            Supreme Court of India
          </a>
          <span className="text-slate-400">/</span>
          <a className="hover:text-primary font-medium shrink-0" href="#registry">
            Registry Appellate Side
          </a>
          <span className="text-slate-400">/</span>
          <span className="text-primary font-semibold tracking-tight shrink-0">
            Active Docket Intelligence Dashboard
          </span>
        </div>

        {/* Right Badges & Actions */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container border border-secondary/30 text-xs font-semibold font-label shadow-2xs">
            <span className="material-symbols-outlined text-[15px] text-secondary">verified</span>
            Institutional DigiSeal Enrolled
          </span>
          <button
            onClick={handleSync}
            className="px-3 py-1 rounded bg-surface hover:bg-surface-container border border-outline-variant text-xs font-medium text-on-surface flex items-center gap-1.5 transition active:scale-95"
          >
            <span
              className={`material-symbols-outlined text-[16px] text-slate-600 ${
                isSyncing ? 'animate-spin text-secondary' : ''
              }`}
            >
              cached
            </span>
            {isSyncing ? 'Syncing...' : 'Sync e-Court Feed'}
          </button>
        </div>
      </div>
    </section>
  );
}
