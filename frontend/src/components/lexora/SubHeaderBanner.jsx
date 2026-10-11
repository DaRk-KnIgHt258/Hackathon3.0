import React, { useState } from 'react';
import { AppIcon } from '../common/AppIcon';

export function SubHeaderBanner({ activeNav = 'docket', onSyncFeed }) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    if (onSyncFeed) onSyncFeed();
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  const getBreadcrumbConfig = () => {
    switch (activeNav) {
      case 'judgments':
        return {
          icon: 'splitscreen',
          section: 'Judgments & Workspace',
          label: 'Split-Screen Judgment Review & Statutory Reasoner',
        };
      case 'causelist':
        return {
          icon: 'format_list_numbered',
          section: 'Registry Cause Lists',
          label: 'Daily Listing & Roster Intelligence Deck',
        };
      case 'statutes':
        return {
          icon: 'menu_book',
          section: 'Statutory Repository',
          label: 'Bharatiya Nyaya Sanhita & Constitutional Codes',
        };
      case 'notices':
        return {
          icon: 'notifications_active',
          section: 'Registry Dispatches',
          label: 'DigiSeal Certified Legal Notices & Summons',
        };
      case 'docket':
      default:
        return {
          icon: 'domain',
          section: 'Registry Appellate Side',
          label: 'Active Docket Intelligence Dashboard',
        };
    }
  };

  const config = getBreadcrumbConfig();

  return (
    <section className="bg-white border-b border-outline-variant px-4 sm:px-6 py-2.5 shadow-2xs">
      <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Dynamic Breadcrumb Cluster */}
        <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant overflow-x-auto">
          <AppIcon name={config.icon} className="w-4 h-4 text-primary shrink-0" />
          <a className="hover:text-primary font-medium text-slate-600 shrink-0 transition-colors" href="#sc">
            Supreme Court of India
          </a>
          <span className="text-slate-400">/</span>
          <span className="text-on-surface font-medium shrink-0">
            {config.section}
          </span>
          <span className="text-slate-400">/</span>
          <span className="text-primary font-semibold tracking-tight shrink-0 font-headline">
            {config.label}
          </span>
        </div>

        {/* Right Badges & Actions */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container border border-secondary/30 text-xs font-semibold font-label shadow-2xs">
            <AppIcon name="verified" className="w-3.5 h-3.5 text-secondary" />
            Institutional DigiSeal Enrolled
          </span>
          <button
            onClick={handleSync}
            className="px-3 py-1 rounded bg-surface hover:bg-surface-container border border-outline-variant text-xs font-medium text-on-surface flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            title="Synchronize registry feed with CIS 3.2 database"
          >
            <AppIcon
              name="cached"
              className={`w-3.5 h-3.5 text-slate-600 ${isSyncing ? 'animate-spin text-secondary' : ''}`}
            />
            {isSyncing ? 'Syncing...' : 'Sync e-Court Feed'}
          </button>
        </div>
      </div>
    </section>
  );
}
