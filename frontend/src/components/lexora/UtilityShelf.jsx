import React, { useState } from 'react';
import AppIcon from '../common/AppIcon';

const VAULT_ITEMS = [
  {
    id: 'causelist',
    icon: 'picture_as_pdf',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    iconBorder: 'border-red-200',
    tag: 'Attested',
    tagColor: 'text-emerald-700',
    title: 'SC Daily Cause List – Bench 1 & 2',
    meta: 'PDF • 4.2 MB',
    hash: 'SHA: 4a9e88b…19ff02',
    btnVariant: 'outline',
    downloadLabel: 'Supreme Court Daily Cause List',
    downloadSize: '4.2 MB',
  },
  {
    id: 'arnesh',
    icon: 'workspace_premium',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-700',
    iconBorder: 'border-amber-200',
    tag: 'Gold Seal',
    tagColor: 'text-secondary',
    title: 'Certified Judgment – Arnesh Kumar',
    meta: 'DigiSeal • 1.8 MB',
    hash: 'SHA: c370a2d…98e411',
    btnVariant: 'gold',
    downloadLabel: 'Certified Judgment (Arnesh Kumar)',
    downloadSize: '1.8 MB',
  },
  {
    id: 'caveat',
    icon: 'edit_document',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-700',
    iconBorder: 'border-blue-200',
    tag: 'e-Filing',
    tagColor: 'text-slate-600',
    title: 'Caveat Petition Lodgment Format',
    meta: 'Fillable • 840 KB',
    hash: 'SHA: ee1892f…76ba32',
    btnVariant: 'outline',
    downloadLabel: 'Caveat Petition Format',
    downloadSize: '840 KB',
  },
];

const NOTICE_ITEMS = [
  {
    id: '#LN-2025-0842',
    title: 'Statutory Notice under Sec 138 NI Act',
    served: 'Global Mercantile Ltd. & MD',
    timeLeft: '6 Days Remaining',
    timeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    status: 'Delivered (Ack Due)',
    statusColor: 'text-emerald-700',
    action: 'pod',
    actionLabel: 'POD Slip',
  },
  {
    id: '#LN-2025-0839',
    title: 'Demand & Cease-Desist (Trademark)',
    served: 'Apex Retail & Logistics LLP',
    timeLeft: '11 Days',
    timeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    status: 'In-Transit (#ED81249)',
    statusColor: 'text-amber-700',
    action: 'track',
    actionLabel: 'Track',
  },
  {
    id: '#LN-2025-0821',
    title: 'Sec 80 CPC Statutory Notice (UOI)',
    served: 'Ministry of Corporate Affairs',
    timeLeft: 'Response Received',
    timeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    status: 'Delivered & Docketed',
    statusColor: 'text-slate-600',
    action: 'response_pdf',
    actionLabel: 'View PDF',
  },
];

export function UtilityShelf({ onDownloadItem, onNoticeAction }) {
  const [vaultOpen, setVaultOpen] = useState(true);
  const [noticesOpen, setNoticesOpen] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-up stagger-2">

      {/* ── PRIORITY DOWNLOAD VAULT ─────────────────────────── */}
      <div className="bg-white rounded-xl border border-outline-variant shadow-2xs overflow-hidden">
        {/* Panel header */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 border-b border-slate-100 hover:bg-slate-50/60 transition-colors cursor-pointer group"
          onClick={() => setVaultOpen(!vaultOpen)}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-secondary-container border border-secondary/30 flex items-center justify-center">
              <AppIcon name="download" className="w-4.5 h-4.5 text-secondary" />
            </div>
            <div className="text-left">
              <span className="block text-sm font-headline font-bold text-primary">Priority Download Vault</span>
              <span className="block text-[10px] text-slate-500">SHA-256 verified certified documents</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-secondary/15 text-secondary border border-secondary/30 text-[10px] font-mono px-2 py-0.5 rounded font-semibold hidden sm:inline">
              Live Vault
            </span>
            <AppIcon
              name={vaultOpen ? 'expand_less' : 'expand_more'}
              className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors"
            />
          </div>
        </button>

        {/* Panel body */}
        {vaultOpen && (
          <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 animate-fade-scale">
            {VAULT_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                className={`rounded-lg border border-outline-variant bg-slate-50/50 p-3 flex flex-col justify-between card-hover animate-fade-up stagger-${idx + 1}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-7 h-7 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center border ${item.iconBorder}`}>
                      <AppIcon name={item.icon} className="w-3.5 h-3.5" />
                    </span>
                    <span className={`text-[9px] font-semibold font-mono ${item.tagColor}`}>{item.tag}</span>
                  </div>
                  <h5 className="text-xs font-semibold text-primary font-headline leading-snug line-clamp-2 mb-1">
                    {item.title}
                  </h5>
                  <p className="text-[10px] text-slate-500 font-mono">{item.meta}</p>
                  <p className="text-[9px] text-slate-400 font-mono truncate">{item.hash}</p>
                </div>
                <button
                  onClick={() => onDownloadItem?.(item.downloadLabel, item.downloadSize)}
                  className={`mt-2.5 w-full py-1.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5
                    transition-all duration-150 active:scale-95 cursor-pointer
                    ${item.btnVariant === 'gold'
                      ? 'bg-secondary text-primary hover:bg-[#d6b46b] shadow-sm'
                      : 'bg-surface hover:bg-secondary-container text-primary border border-outline-variant hover:border-secondary/40'
                    }`}
                >
                  <AppIcon name="download" className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── ACTIVE LIMITATION TIMELINES ─────────────────────── */}
      <div className="bg-white rounded-xl border border-outline-variant shadow-2xs overflow-hidden">
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <button
            className="flex items-center gap-2.5 flex-1 text-left group cursor-pointer"
            onClick={() => setNoticesOpen(!noticesOpen)}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <AppIcon name="timer" className="w-4.5 h-4.5 text-amber-600" />
            </div>
            <div>
              <span className="block text-sm font-headline font-bold text-primary">Legal Notices Radar</span>
              <span className="block text-[10px] text-slate-500">Active limitation countdown timelines</span>
            </div>
            <AppIcon
              name={noticesOpen ? 'expand_less' : 'expand_more'}
              className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors ml-auto"
            />
          </button>
          <button
            onClick={() => onNoticeAction?.('issue')}
            className="ml-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-semibold border border-secondary/20 transition-all duration-150 active:scale-95 cursor-pointer shrink-0"
          >
            <AppIcon name="add" className="w-3.5 h-3.5" />
            Issue Notice
          </button>
        </div>

        {/* Panel body */}
        {noticesOpen && (
          <div className="divide-y divide-slate-100 animate-fade-scale">
            {NOTICE_ITEMS.map((notice, idx) => (
              <div
                key={notice.id}
                className={`px-4 py-3 hover:bg-slate-50/60 transition-colors group animate-fade-up stagger-${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-[10px] font-bold text-primary">{notice.id}</span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${notice.timeColor}`}>
                        {notice.timeLeft}
                      </span>
                    </div>
                    <h5 className="text-xs font-semibold text-slate-800 font-headline leading-tight truncate">
                      {notice.title}
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                      Served to: <strong className="text-slate-700">{notice.served}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => onNoticeAction?.(notice.action, notice.id)}
                    className="shrink-0 px-2.5 py-1 rounded-lg bg-surface hover:bg-secondary-container border border-outline-variant
                               hover:border-secondary/40 text-[11px] font-semibold text-primary hover:text-secondary
                               transition-all duration-150 active:scale-95 cursor-pointer"
                  >
                    {notice.actionLabel}
                  </button>
                </div>
                <div className="mt-1.5 flex items-center gap-1">
                  <span className={`text-[10px] font-medium ${notice.statusColor}`}>{notice.status}</span>
                </div>
              </div>
            ))}
            <div className="px-4 py-2.5">
              <button
                onClick={() => onNoticeAction?.('browse_archives')}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-secondary transition-colors cursor-pointer"
              >
                Browse all 3,410 certified PDF archives
                <AppIcon name="arrow_forward" className="w-3.5 h-3.5 text-secondary" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UtilityShelf;
