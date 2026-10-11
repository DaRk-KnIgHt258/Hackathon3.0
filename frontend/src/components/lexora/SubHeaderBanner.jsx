import React, { useState } from 'react';
import { AppIcon } from '../common/AppIcon';

const SECTION_CONFIG = {
  judgments: {
    icon: 'splitscreen',
    title: 'Judgments & Workspace',
    desc: 'Split-screen review, statutory reasoning, and document analysis',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  causelist: {
    icon: 'format_list_numbered',
    title: 'Registry Cause Lists',
    desc: 'Daily listings and roster intelligence across all benches',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  statutes: {
    icon: 'menu_book',
    title: 'Statutory Repository',
    desc: 'Bharatiya Nyaya Sanhita, CrPC, CPC and constitutional codes',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  notices: {
    icon: 'notifications_active',
    title: 'Legal Notices Radar',
    desc: 'DigiSeal certified notices, limitation countdown & dispatch tracking',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  docket: {
    icon: 'account_balance',
    title: 'Docket Intelligence Dashboard',
    desc: 'Active matters, certified decrees and cause intelligence across India\'s courts',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
};

export function SubHeaderBanner({ activeNav = 'docket', onSyncFeed }) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    onSyncFeed?.();
    setTimeout(() => setIsSyncing(false), 1200);
  };

  const cfg = SECTION_CONFIG[activeNav] || SECTION_CONFIG.docket;

  return (
    <div className="bg-white border-b border-outline-variant shadow-2xs">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">

        {/* Left: section identity */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-7 h-7 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
            <AppIcon name={cfg.icon} className={`w-4 h-4 ${cfg.color}`} />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-headline font-bold text-primary truncate">{cfg.title}</span>
            <span className="block text-[10px] text-slate-500 truncate hidden sm:block">{cfg.desc}</span>
          </div>
        </div>

        {/* Right: status + sync */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-secondary-container text-on-secondary-container border border-secondary/20 text-[10px] font-semibold font-label">
            <AppIcon name="verified" className="w-3 h-3 text-secondary" />
            DigiSeal Enrolled
          </span>
          <button
            onClick={handleSync}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface hover:bg-surface-container border border-outline-variant
                       text-xs font-medium text-on-surface transition-all duration-150 active:scale-95 cursor-pointer"
            title="Sync with CIS 3.2 e-Courts"
          >
            <AppIcon
              name="sync"
              className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-500 ${isSyncing ? 'animate-spin text-secondary' : ''}`}
            />
            <span className="hidden sm:inline">{isSyncing ? 'Syncing…' : 'Sync Feed'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
