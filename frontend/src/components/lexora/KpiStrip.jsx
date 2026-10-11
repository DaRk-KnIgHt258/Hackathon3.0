import React from 'react';

export function KpiStrip({ totalCases = 1248 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Active Tracked Dockets */}
      <div className="bg-surface rounded-lg p-4 border border-outline-variant shadow-sm hover:border-secondary/40 transition-all flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute -right-3 -top-3 w-16 h-16 bg-primary/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform"></div>
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-label font-semibold text-on-surface-variant uppercase tracking-wider text-[11px]">
              Docket Intelligence
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="material-symbols-outlined text-[13px]">trending_up</span> +14 this wk
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">
              {totalCases.toLocaleString()}
            </h2>
            <span className="text-xs text-on-surface-variant font-medium">Active Matters</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-on-surface-variant">
          <span className="flex items-center gap-1 text-primary font-medium">
            <span className="material-symbols-outlined text-[15px] text-secondary">event_note</span>
            <strong>3 Listed Today</strong> (Bench 4 & 9)
          </span>
          <span className="text-[11px] text-slate-400">98.4% On-Track</span>
        </div>
      </div>

      {/* Card 2: Certified Judgments */}
      <div className="bg-surface rounded-lg p-4 border border-outline-variant shadow-sm hover:border-secondary/40 transition-all flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute -right-3 -top-3 w-16 h-16 bg-secondary/10 rounded-full pointer-events-none group-hover:scale-110 transition-transform"></div>
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-label font-semibold text-on-surface-variant uppercase tracking-wider text-[11px]">
              Decrees & Rulings
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold bg-secondary-container text-on-secondary-container border border-secondary/30">
              <span className="material-symbols-outlined text-[13px]">verified</span> Watermarked
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">842</h2>
            <span className="text-xs text-on-surface-variant font-medium">Certified Copies</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-on-surface-variant">
          <span className="flex items-center gap-1 text-primary font-medium">
            <span className="material-symbols-outlined text-[15px] text-secondary">military_tech</span>
            DigiSeal Attested Copies
          </span>
          <span className="text-[11px] text-slate-400">12 Pending Seal</span>
        </div>
      </div>

      {/* Card 3: Pending Legal Notices */}
      <div className="bg-surface rounded-lg p-4 border border-outline-variant shadow-sm hover:border-secondary/40 transition-all flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute -right-3 -top-3 w-16 h-16 bg-amber-500/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform"></div>
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-label font-semibold text-on-surface-variant uppercase tracking-wider text-[11px]">
              Statutory Notices
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-300">
              <span className="material-symbols-outlined text-[13px]">timer</span> 4 Expiring &lt;48h
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">29</h2>
            <span className="text-xs text-on-surface-variant font-medium">Limitation Watch</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-on-surface-variant">
          <span className="flex items-center gap-1 text-on-surface">
            <span className="material-symbols-outlined text-[15px] text-amber-600">mark_email_unread</span>
            Postal Ack. Delivered: <strong>21</strong>
          </span>
          <span className="text-[11px] text-slate-400">8 In-Transit</span>
        </div>
      </div>

      {/* Card 4: Available PDF Downloads */}
      <div className="bg-surface rounded-lg p-4 border border-outline-variant shadow-sm hover:border-secondary/40 transition-all flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute -right-3 -top-3 w-16 h-16 bg-primary-container/10 rounded-full pointer-events-none group-hover:scale-110 transition-transform"></div>
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-label font-semibold text-on-surface-variant uppercase tracking-wider text-[11px]">
              Repository Vault
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              <span className="material-symbols-outlined text-[13px]">cloud_done</span> 3.2 GB Cached
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">3,410</h2>
            <span className="text-xs text-on-surface-variant font-medium">Archived Files</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-on-surface-variant">
          <span className="flex items-center gap-1 text-primary font-medium">
            <span className="material-symbols-outlined text-[15px] text-secondary">file_download_done</span>
            Instant One-Click Ready
          </span>
          <span className="text-[11px] text-slate-400">SHA-256 Hashed</span>
        </div>
      </div>
    </div>
  );
}
