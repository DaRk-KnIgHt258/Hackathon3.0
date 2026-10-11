import React from 'react';
import { AppIcon } from '../common/AppIcon';

const STAGGER = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4'];

export function KpiStrip({ dossiers = [], totalCases, onKpiClick }) {
  const totalCount = typeof totalCases === 'number' ? totalCases : dossiers.length;
  const certifiedCount = dossiers.filter((d) => d.tabCategory === 'certified' || d.disposition?.includes('ALLOWED') || d.stageTitle?.toLowerCase().includes('final')).length;
  const hearingCount = dossiers.filter((d) => d.tabCategory === 'hearing' || d.stageTitle?.toLowerCase().includes('hearing')).length;
  const reservedCount = dossiers.filter((d) => d.tabCategory === 'reserved' || d.stageTitle?.toLowerCase().includes('reserved')).length;

  const kpis = [
    {
      key: 'all',
      label: 'Active Dockets',
      value: totalCount,
      icon: 'account_balance',
      iconBg: 'bg-primary/8',
      iconColor: 'text-primary',
      badge: {
        text: totalCount > 0 ? `${totalCount} Tracked` : '0 Active',
        bg: 'bg-emerald-50',
        text2: 'text-emerald-700',
        border: 'border-emerald-200',
      },
      footer: {
        icon: 'calendar_today',
        text: hearingCount > 0 ? `${hearingCount} Listed Today` : 'Registry Synced',
        sub: reservedCount > 0 ? `${reservedCount} Reserved` : 'Up to Date',
        iconColor: 'text-secondary',
      },
      accentBar: 'bg-primary',
    },
    {
      key: 'certified',
      label: 'Certified Copies',
      value: certifiedCount,
      icon: 'verified',
      iconBg: 'bg-secondary/15',
      iconColor: 'text-secondary',
      badge: {
        text: 'DigiSeal Verified',
        bg: 'bg-secondary-container',
        text2: 'text-on-secondary-container',
        border: 'border-secondary/30',
      },
      footer: {
        icon: 'workspace_premium',
        text: 'Registry Sealed',
        sub: `${certifiedCount} Ready`,
        iconColor: 'text-secondary',
      },
      accentBar: 'bg-secondary',
    },
    {
      key: 'notices',
      label: 'Limitation Watch',
      value: '3',
      icon: 'timer',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-700',
      badge: {
        text: 'Active Timelines',
        bg: 'bg-amber-50',
        text2: 'text-amber-800',
        border: 'border-amber-300',
      },
      footer: {
        icon: 'mail',
        text: 'Statutory Radar',
        sub: 'Track Lim. Acts',
        iconColor: 'text-amber-600',
      },
      accentBar: 'bg-amber-500',
    },
    {
      key: 'vault',
      label: 'Priority Vault',
      value: '3',
      icon: 'folder_open',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-700',
      badge: {
        text: 'Ready for DL',
        bg: 'bg-blue-50',
        text2: 'text-blue-800',
        border: 'border-blue-200',
      },
      footer: {
        icon: 'download',
        text: 'Encrypted Vault',
        sub: 'SHA-256 Verified',
        iconColor: 'text-secondary',
      },
      accentBar: 'bg-blue-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {kpis.map((kpi, i) => (
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
              {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
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
