import React, { useState, useEffect, useRef } from 'react';
import { AppIcon } from '../common/AppIcon';

const NAV_ITEMS = [
  { id: 'docket',    label: 'Docket',    icon: 'account_balance',       fullLabel: 'Docket Intelligence' },
  { id: 'causelist', label: 'Cause Lists', icon: 'format_list_numbered', fullLabel: 'Cause Lists' },
  { id: 'judgments', label: 'Judgments',  icon: 'gavel',                 fullLabel: 'Judgments & Workspace' },
  { id: 'statutes',  label: 'Statutes',   icon: 'menu_book',             fullLabel: 'Statutory Codes' },
  { id: 'notices',   label: 'Notices',    icon: 'notifications_active',  fullLabel: 'Legal Notices' },
];

const FORUM_OPTIONS = [
  { id: 'all',     label: 'All Courts' },
  { id: 'supreme', label: 'Supreme Court' },
  { id: 'delhi',   label: 'Delhi HC' },
  { id: 'bombay',  label: 'Bombay HC' },
  { id: 'nclat',   label: 'NCLAT' },
];

export function TopAppBar({
  searchQuery, onSearchChange,
  activeNav, onNavChange,
  activeFilterKey, onFilterKeyChange,
  selectedForum, onSelectForum,
  onOpenNewDocket, onOpenChat,
  onOpenAdvancedSearch, onOpenNotifications,
  onOpenSupportDesk, onOpenCounselProfile,
}) {
  const searchRef = useRef(null);
  const forumRef  = useRef(null);
  const [forumOpen, setForumOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  /* ⌘K shortcut */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Close forum dropdown on outside click */
  useEffect(() => {
    const onClickOut = (e) => {
      if (forumRef.current && !forumRef.current.contains(e.target)) setForumOpen(false);
    };
    document.addEventListener('mousedown', onClickOut);
    return () => document.removeEventListener('mousedown', onClickOut);
  }, []);

  const currentForum = FORUM_OPTIONS.find((f) => f.id === selectedForum)?.label || 'All Courts';

  return (
    <header className="w-full bg-primary text-on-primary sticky top-0 z-50 shadow-md">

      {/* ── MAIN BAR ──────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 h-14 flex items-center gap-4">

        {/* Brand */}
        <button
          onClick={() => onNavChange?.('docket')}
          className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
          title="NyayaSutra Home"
        >
          <div className="w-8 h-8 rounded-lg bg-secondary/20 border border-secondary/40 flex items-center justify-center group-hover:border-secondary transition-colors duration-200">
            <AppIcon name="balance" className="w-4.5 h-4.5 text-secondary" />
          </div>
          <div className="leading-none">
            <span className="block font-headline font-bold text-white text-sm tracking-tight group-hover:text-secondary transition-colors">
              NyayaSutra
            </span>
            <span className="block text-[9px] text-slate-400 font-label tracking-wide uppercase">
              Judicial Intelligence
            </span>
          </div>
        </button>

        {/* ── SEARCH (centre, grows) ── */}
        <div className="flex-1 max-w-xl hidden md:flex items-center relative">
          <AppIcon name="search" className="absolute left-3 w-4 h-4 text-secondary pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by CNR, party name, citation, or statute…"
            className="w-full bg-white/10 text-sm text-white placeholder-slate-400 pl-9 pr-24 py-2 rounded-lg border border-white/15
                       focus:border-secondary/60 focus:bg-white/15 focus:outline-none transition-all duration-200 font-body"
          />
          <div className="absolute right-2 flex items-center gap-1.5">
            <kbd className="hidden sm:inline text-[10px] bg-white/10 text-slate-400 border border-white/10 rounded px-1.5 py-0.5 font-mono">
              ⌘K
            </kbd>
            <button
              onClick={onOpenAdvancedSearch}
              className="p-1 rounded text-slate-400 hover:text-secondary hover:bg-white/10 transition cursor-pointer"
              title="Advanced Search"
            >
              <AppIcon name="tune" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── RIGHT CLUSTER ── */}
        <div className="flex items-center gap-1.5 ml-auto shrink-0">

          {/* Forum picker */}
          <div className="relative hidden lg:block" ref={forumRef}>
            <button
              onClick={() => setForumOpen(!forumOpen)}
              className="flex items-center gap-1.5 bg-white/8 hover:bg-white/12 border border-white/12
                         px-2.5 py-1.5 rounded-lg text-xs font-label text-slate-200 transition-all duration-150 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="max-w-[120px] truncate">{currentForum}</span>
              <AppIcon name={forumOpen ? 'expand_less' : 'expand_more'} className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {forumOpen && (
              <div className="absolute right-0 mt-1.5 w-52 bg-surface text-on-surface rounded-xl shadow-xl border border-outline-variant py-1.5 z-50 animate-fade-scale">
                <p className="px-3 pb-1.5 text-[10px] uppercase tracking-wider font-semibold text-slate-400 border-b border-slate-100">
                  Judicial Forum
                </p>
                {FORUM_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { onSelectForum?.(opt.id); setForumOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition cursor-pointer
                      ${selectedForum === opt.id ? 'font-bold text-primary' : 'text-slate-700'}`}
                  >
                    {opt.label}
                    {selectedForum === opt.id && <AppIcon name="check" className="w-3.5 h-3.5 text-secondary" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nyaya AI */}
          <button
            onClick={() => onOpenChat?.('chat')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-label
                       bg-gradient-to-r from-secondary to-[#d6b46b] text-primary
                       hover:brightness-105 shadow-md active:scale-95 transition-all duration-150 group cursor-pointer"
            title="Nyaya AI Legal Copilot"
          >
            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:rotate-12 transition-transform duration-200">
              <AppIcon name="smart_toy" className="w-2.5 h-2.5 text-primary" />
            </div>
            <span className="hidden sm:inline">Nyaya AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-ping" />
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-slate-300 hover:text-secondary hover:bg-white/10 transition-colors cursor-pointer"
            title="Alerts & Notifications"
          >
            <AppIcon name="notifications" className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-primary" />
          </button>

          {/* Support */}
          <button
            onClick={onOpenSupportDesk}
            className="p-2 rounded-lg text-slate-300 hover:text-secondary hover:bg-white/10 transition-colors cursor-pointer hidden sm:flex"
            title="Registry Support Desk"
          >
            <AppIcon name="help_outline" className="w-4.5 h-4.5" />
          </button>

          {/* New Docket CTA */}
          <button
            onClick={onOpenNewDocket}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-label
                       bg-white/8 hover:bg-white/14 text-white border border-white/15 hover:border-secondary/50
                       transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <AppIcon name="add_circle" className="w-4 h-4 text-secondary" />
            New Docket
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-white/15 mx-0.5 hidden md:block" />

          {/* Counsel Profile */}
          <button
            onClick={onOpenCounselProfile}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            title="Counsel Profile"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-secondary text-primary font-bold text-xs flex items-center justify-center border-2 border-secondary/60 shadow group-hover:border-secondary transition-colors">
                RR
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-primary" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-white group-hover:text-secondary transition-colors leading-tight font-headline">
                Adv. Rajeshwar Rao
              </span>
              <span className="text-[9px] text-slate-400 font-label">Senior Advocate • SC Bar</span>
            </div>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-white/10 transition cursor-pointer"
          >
            <AppIcon name={mobileNavOpen ? 'close' : 'menu'} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── NAV TAB BAR ──────────────────────────────────────────── */}
      <nav className="hidden md:flex border-t border-white/8 px-4 sm:px-6 overflow-x-auto custom-scroll">
        {NAV_ITEMS.map((nav) => {
          const isActive = activeNav === nav.id;
          return (
            <button
              key={nav.id}
              onClick={() => onNavChange?.(nav.id)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2.5 text-[11px] font-label font-semibold
                whitespace-nowrap transition-all duration-150 cursor-pointer shrink-0 border-b-2
                ${isActive
                  ? 'text-secondary border-secondary'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-white/20'
                }`}
            >
              <AppIcon name={nav.icon} className="w-3.5 h-3.5" />
              {nav.fullLabel}
            </button>
          );
        })}

        {/* Search filter pills — right-aligned in the nav bar */}
        <div className="ml-auto flex items-center gap-1.5 py-1.5 border-l border-white/8 pl-3 shrink-0">
          {[
            { id: 'all',     label: 'All' },
            { id: 'cnr',     label: 'CNR' },
            { id: 'party',   label: 'Party' },
            { id: 'statute', label: 'Statute' },
            { id: 'court',   label: 'Court' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => onFilterKeyChange(pill.id)}
              className={`px-2 py-0.5 rounded text-[10px] font-label font-medium transition-all shrink-0 cursor-pointer
                ${activeFilterKey === pill.id
                  ? 'bg-secondary/20 text-secondary border border-secondary/40'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:text-slate-200'
                }`}
            >
              {pill.label}
            </button>
          ))}
          <span className="text-[10px] text-slate-500 hidden xl:flex items-center gap-1 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            CIS Connected
          </span>
        </div>
      </nav>

      {/* ── MOBILE NAV DRAWER ────────────────────────────────────── */}
      {mobileNavOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0D1F38] animate-fade-up">
          {/* Mobile search */}
          <div className="p-3 border-b border-white/8">
            <div className="relative">
              <AppIcon name="search" className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search dockets…"
                className="w-full bg-white/10 text-sm text-white placeholder-slate-500 pl-9 pr-3 py-2 rounded-lg border border-white/10 focus:border-secondary/50 focus:outline-none"
              />
            </div>
          </div>
          {NAV_ITEMS.map((nav) => (
            <button
              key={nav.id}
              onClick={() => { onNavChange?.(nav.id); setMobileNavOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm border-b border-white/5 cursor-pointer transition-colors
                ${activeNav === nav.id
                  ? 'text-secondary bg-white/5 font-semibold'
                  : 'text-slate-300 hover:bg-white/5'
                }`}
            >
              <AppIcon name={nav.icon} className="w-4 h-4" />
              {nav.fullLabel}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
