import React, { useState, useEffect, useRef } from 'react';

export function TopAppBar({
  searchQuery,
  onSearchChange,
  activeNav,
  onNavChange,
  activeFilterKey,
  onFilterKeyChange,
  selectedForum,
  onSelectForum,
  onOpenNewDocket,
  onOpenChat,
  onOpenAdvancedSearch,
  onOpenNotifications,
  onOpenSupportDesk,
  onOpenCounselProfile,
}) {
  const searchInputRef = useRef(null);
  const [isForumDropdownOpen, setIsForumDropdownOpen] = useState(false);
  const forumDropdownRef = useRef(null);

  // Keyboard shortcut ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.select();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close forum dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (forumDropdownRef.current && !forumDropdownRef.current.contains(e.target)) {
        setIsForumDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const forumOptions = [
    { id: 'all', label: 'Supreme Court & High Courts' },
    { id: 'supreme', label: 'Supreme Court of India' },
    { id: 'delhi', label: 'Delhi High Court' },
    { id: 'bombay', label: 'Bombay High Court' },
    { id: 'nclat', label: 'NCLAT New Delhi' },
  ];

  const currentForumLabel =
    forumOptions.find((f) => f.id === selectedForum)?.label || 'Supreme Court & High Courts';

  return (
    <header className="w-full bg-primary text-on-primary sticky top-0 z-50 shadow-sm border-b border-outline/20">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 lg:gap-6">
        {/* Left Brand & Badge Cluster */}
        <div className="flex items-center gap-6 shrink-0">
          <div
            onClick={() => onNavChange && onNavChange('docket')}
            className="font-headline text-xl font-bold text-on-primary tracking-tight flex items-center gap-2.5 group cursor-pointer"
            title="LexoraDocs - Bench v4.2"
          >
            <div className="w-9 h-9 rounded bg-[#162A4D] border border-secondary/50 flex items-center justify-center text-secondary shadow-inner group-hover:border-secondary transition">
              <span className="material-symbols-outlined fill-icon text-[22px]">balance</span>
            </div>
            <div className="flex flex-col">
              <span className="leading-tight text-white flex items-center gap-1.5 font-bold tracking-tight">
                LexoraDocs
                <span className="text-[9px] uppercase tracking-wider bg-secondary/20 text-secondary px-1.5 py-0.5 rounded font-label font-semibold border border-secondary/40">
                  Bench v4.2
                </span>
              </span>
              <span className="text-[10px] text-slate-300 font-label tracking-normal font-normal">
                Judicial Docket Intelligence
              </span>
            </div>
          </div>

          {/* Global Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 pl-4 border-l border-white/10 text-sm">
            {[
              { id: 'docket', label: 'Docket Intelligence', icon: 'account_balance' },
              { id: 'causelist', label: 'Cause Lists', icon: 'format_list_numbered' },
              { id: 'judgments', label: 'Judgments & Workspace', icon: 'gavel' },
              { id: 'statutes', label: 'Statutory Codes', icon: 'menu_book' },
              { id: 'notices', label: 'Legal Notices', icon: 'notifications_active' },
            ].map((nav) => {
              const isActive = activeNav === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => onNavChange && onNavChange(nav.id)}
                  className={`pb-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-secondary border-b-2 border-secondary font-semibold'
                      : 'text-on-primary/80 hover:text-on-primary font-medium border-b-2 border-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">{nav.icon}</span>
                  {nav.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* CNR / Docket Universal Search */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-secondary">
              <span className="material-symbols-outlined text-[19px]">search</span>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by CNR (e.g. DHC01-094821-2023), Party Name, Citation, or Act..."
              className="w-full bg-[#0B1A30] text-sm text-white placeholder-slate-400 pl-10 pr-28 py-2 rounded-lg border border-slate-700 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all shadow-inner font-body"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <span
                onClick={() => searchInputRef.current?.focus()}
                className="text-[10px] bg-slate-800 text-secondary border border-secondary/30 rounded px-1.5 py-0.5 font-label font-mono cursor-pointer hover:bg-slate-700 transition"
                title="Press Ctrl+K or Cmd+K to search"
              >
                ⌘K
              </span>
              <button
                type="button"
                onClick={onOpenAdvancedSearch}
                className="text-slate-400 hover:text-secondary text-xs px-1.5 py-1 rounded hover:bg-white/10 transition"
                title="Advanced Search Filter"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Utility Cluster & Counsel Profile */}
        <div className="flex items-center gap-2.5 lg:gap-3 shrink-0">
          {/* Forum Switcher with Interactive Dropdown */}
          <div className="relative hidden lg:block" ref={forumDropdownRef}>
            <button
              onClick={() => setIsForumDropdownOpen(!isForumDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#172D4E] hover:bg-[#1D3557] border border-slate-700/80 px-2.5 py-1.5 rounded-lg text-xs font-label text-slate-200 transition cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium max-w-[150px] truncate">{currentForumLabel}</span>
              <span className="material-symbols-outlined text-slate-400 text-[16px]">
                {isForumDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {isForumDropdownOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-surface text-on-surface rounded-lg shadow-xl border border-outline-variant py-1 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
                <div className="px-3 py-1.5 font-semibold text-slate-400 text-[10px] uppercase tracking-wider border-b border-slate-100">
                  Select Judicial Forum
                </div>
                {forumOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (onSelectForum) onSelectForum(opt.id);
                      setIsForumDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition ${
                      selectedForum === opt.id ? 'font-bold text-primary bg-secondary-container/30' : 'text-slate-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selectedForum === opt.id && (
                      <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DEDICATED NYAYA AI BUTTON */}
          <button
            onClick={() => onOpenChat && onOpenChat('chat')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-label bg-gradient-to-r from-secondary to-[#d6b46b] text-primary hover:brightness-105 transition-all shadow-md active:scale-95 group cursor-pointer"
            title="Open Nyaya AI Legal Copilot & Tools"
          >
            <div className="w-5 h-5 rounded-full bg-primary text-secondary flex items-center justify-center text-[12px] shadow-xs group-hover:rotate-12 transition-transform">
              <span className="material-symbols-outlined text-[14px]">smart_toy</span>
            </div>
            <span className="tracking-tight">Nyaya AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
          </button>

          {/* Alerts & Notifications */}
          <button
            onClick={onOpenNotifications}
            className="p-2 rounded-lg text-slate-300 hover:text-secondary hover:bg-primary-container/50 transition-colors relative cursor-pointer"
            title="Docket Alerts & Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-primary"></span>
          </button>

          {/* Registry Support Desk */}
          <button
            onClick={onOpenSupportDesk}
            className="p-2 rounded-lg text-slate-300 hover:text-secondary hover:bg-primary-container/50 transition-colors cursor-pointer"
            title="Registry & e-Filing Support Desk"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>

          {/* CTA File New Docket */}
          <button
            onClick={onOpenNewDocket}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-label bg-[#172D4E] hover:bg-[#1D3557] text-white border border-slate-700 transition-colors shadow-xs active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">add_circle</span>
            File New Docket
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-700 mx-0.5"></div>

          {/* Senior Judicial Counsel Profile */}
          <div
            onClick={onOpenCounselProfile}
            className="flex items-center gap-2 pl-1 group cursor-pointer hover:opacity-90 transition"
            title="View Counsel Profile & Bar Credentials"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-secondary text-primary font-bold flex items-center justify-center border-2 border-secondary/60 text-xs shadow">
                RR
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-primary"></div>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-white group-hover:text-secondary transition-colors leading-tight font-headline">
                Adv. Rajeshwar Rao
              </span>
              <span className="text-[10px] text-slate-300 font-label">
                Senior Advocate • SC Bar
              </span>
            </div>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-white text-[16px]">
              arrow_drop_down
            </span>
          </div>
        </div>
      </div>

      {/* Quick Search Pill Bar */}
      <div className="bg-[#0D1F38] px-4 sm:px-6 py-1.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto custom-scroll py-0.5">
          <span className="text-slate-400 font-label text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1 shrink-0">
            <span className="material-symbols-outlined text-[14px] text-secondary">filter_alt</span> Index Keys:
          </span>
          {[
            { id: 'all', label: 'All Fields' },
            { id: 'cnr', label: 'CNR Number' },
            { id: 'party', label: 'Party / Petitioner' },
            { id: 'statute', label: 'Statute & Section' },
            { id: 'court', label: 'Court / Coram' },
          ].map((pill) => {
            const isSelected = activeFilterKey === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => onFilterKeyChange(pill.id)}
                className={`px-2.5 py-0.5 rounded text-[11px] transition shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-secondary/15 text-secondary border border-secondary/40 font-semibold shadow-2xs'
                    : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-300 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> CIS e-Courts Node: <strong>Connected</strong>
          </span>
          <span className="text-slate-500">|</span>
          <span>Last Registry Sync: <strong>Today, 14:32 IST</strong></span>
        </div>
      </div>
    </header>
  );
}
