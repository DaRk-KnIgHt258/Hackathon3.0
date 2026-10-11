import React from 'react';
import { AppIcon } from '../common/AppIcon';

const KPI_DATA = [
  {
    key: 'all',
    label: 'Active Dockets',
    icon: 'account_balance',
    iconBg: 'bg-primary/8',
    iconColor: 'text-primary',
    badge: { text: '+14 this week', bg: 'bg-emerald-50', text2: 'text-emerald-700', border: 'border-emerald-200' },
    footer: { icon: 'calendar_today', text: '3 Listed Today', sub: '98.4% On-Track', iconColor: 'text-secondary' },
    accentBar: 'bg-primary',
  },
  {
    key: 'certified',
    label: 'Certified Copies',
    value: '842',
    icon: 'verified',
    iconBg: 'bg-secondary/15',
    iconColor: 'text-secondary',
    badge: { text: 'DigiSeal Attested', bg: 'bg-secondary-container', text2: 'text-on-secondary-container', border: 'border-secondary/30' },
    footer: { icon: 'workspace_premium', text: 'Gold Seal Ready', sub: '12 Pending Seal', iconColor: 'text-secondary' },
    accentBar: 'bg-secondary',
  },
  {
    key: 'notices',
    label: 'Limitation Watch',
    value: '29',
    icon: 'timer',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-700',
    badge: { text: '4 Expiring <48h', bg: 'bg-amber-50', text2: 'text-amber-800', border: 'border-amber-300' },
    footer: { icon: 'mail', text: 'Postal Ack: 21 Delivered', sub: '8 In-Transit', iconColor: 'text-amber-600' },
    accentBar: 'bg-amber-500',
  },
  {
    key: 'vault',
    label: 'Archived Files',
    value: '3,410',
    icon: 'folder_open',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-700',
    badge: { text: '3.2 GB Cached', bg: 'bg-blue-50', text2: 'text-blue-800', border: 'border-blue-200' },
    footer: { icon: 'download', text: 'One-Click Ready', sub: 'SHA-256 Hashed', iconColor: 'text-secondary' },
    accentBar: 'bg-blue-500',
  },
];

const STAGGER = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4'];

export function KpiStrip({ totalCases = 1248, onKpiClick }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {KPI_DATA.map((kpi, i) => (
        <button
          key={kpi.key}
          onClick={() => onKpiClick?.(kpi.key)}
          className={`bg-white text-left rounded-xl border border-outline-variant shadow-2xs p-4
                      card-hover hover:border-secondary/40 relative overflow-hidden group
                      animate-fade-up ${STAGGER[i]} focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50`}
          title={`View ${kpi.label}`}
        >
          {/* Accent bar top */}
          <div className={`absolute top-0 left-0 right-0 h-0.5 ${kpi.accentBar} opacity-60 group-hover:opacity-100 transition-opacity`} />

          {/* Background decoration */}
          <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-current opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-300" />

          {/* Top row */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className={`w-9 h-9 rounded-lg ${kpi.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}>
              <AppIcon name={kpi.icon} className={`w-5 h-5 ${kpi.iconColor}`} />
            </div>
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold border ${kpi.badge.bg} ${kpi.badge.text2} ${kpi.badge.border} shrink-0`}>
              {kpi.badge.text}
            </span>
          </div>

          {/* Value */}
          <div className="animate-count-up">
            <div className="font-headline text-2xl sm:text-3xl font-bold text-primary tracking-tight leading-none">
              {kpi.key === 'all' ? totalCases.toLocaleString() : kpi.value}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">{kpi.label}</div>
          </div>

          {/* Footer */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className={`flex items-center gap-1 font-medium text-slate-700`}>
              <AppIcon name={kpi.footer.icon} className={`w-3.5 h-3.5 ${kpi.footer.iconColor}`} />
              {kpi.footer.text}
            </span>
            <span className="text-slate-400">{kpi.footer.sub}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
