import React from 'react';
import AppIcon from '../common/AppIcon';

const FOOTER_LINKS = [
  { key: 'bar-council',       label: 'Bar Council Standards' },
  { key: 'api-gateway',       label: 'Registry API Gateway' },
  { key: 'digiseal',          label: 'DigiSeal Compliance' },
  { key: 'registry-settings', label: 'Court Registry Settings' },
];

export function InstitutionalFooter({ onOpenInstitutional }) {
  return (
    <footer className="bg-primary border-t border-white/8 mt-auto">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <AppIcon name="balance" className="w-4 h-4 text-secondary shrink-0" />
          <div>
            <span className="block text-xs font-headline font-bold text-white">NyayaSutra Jurisprudence Intelligence</span>
            <span className="block text-[10px] text-slate-500">
              Certified under Supreme Court CIS 3.2 Electronic Case Management Guidelines
            </span>
          </div>
        </div>

        {/* Links + status */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {FOOTER_LINKS.map((link) => (
            <button
              key={link.key}
              onClick={() => onOpenInstitutional?.(link.key)}
              className="text-[11px] text-slate-500 hover:text-secondary transition-colors cursor-pointer font-label"
            >
              {link.label}
            </button>
          ))}
          <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 font-mono bg-white/5 border border-white/10 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            All 25 High Courts Operational
          </span>
        </div>
      </div>
    </footer>
  );
}

export default InstitutionalFooter;
