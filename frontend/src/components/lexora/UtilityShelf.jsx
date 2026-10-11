import React from 'react';
import AppIcon from '../common/AppIcon';

export function UtilityShelf({ onDownloadItem, onNoticeAction }) {
  return (
    <div className="bg-surface rounded-lg border border-outline-variant shadow-sm p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 border border-secondary/30">
            <AppIcon name="verified" className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h4 className="font-headline text-sm font-bold text-primary tracking-tight">
              Quick Certified Downloads & Legal Notices Radar
            </h4>
            <p className="text-[11px] text-on-surface-variant">
              Instant 1-Click with SHA-256 Court Verification & limitation countdown overview
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="bg-secondary/20 text-secondary border border-secondary/40 text-[10px] font-mono px-2 py-0.5 rounded font-semibold">
            Live Vault
          </span>
          <button
            onClick={() => onNoticeAction && onNoticeAction('issue')}
            className="text-xs text-secondary hover:underline font-semibold font-label transition"
          >
            + Issue Notice
          </button>
        </div>
      </div>

      {/* Horizontal Split Shelf for Vault Items & Statutory Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3.5">
        {/* Priority Download Vault */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 font-label flex items-center gap-1.5">
            <AppIcon name="download" className="w-3.5 h-3.5 text-secondary" /> Priority Download Vault
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Download Card 1 */}
            <div className="p-2.5 rounded bg-surface-container-low border border-outline-variant hover:border-secondary/40 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="w-6 h-6 rounded bg-red-50 text-red-700 flex items-center justify-center border border-red-200">
                    <AppIcon name="picture_as_pdf" className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[9px] text-emerald-700 font-semibold font-mono flex items-center gap-1">
                    <AppIcon name="verified" className="w-3 h-3 text-emerald-600" /> Attested
                  </span>
                </div>
                <h5 className="text-xs font-semibold text-primary font-headline leading-tight line-clamp-2">
                  Supreme Court Daily Cause List – Bench 1 & 2
                </h5>
                <p className="text-[10px] text-on-surface-variant font-mono mt-1">PDF • 4.2 MB</p>
                <p className="text-[9px] text-slate-400 font-mono truncate">SHA: 4a9e88b...19ff02</p>
              </div>
              <button
                onClick={() => onDownloadItem && onDownloadItem('Supreme Court Daily Cause List', '4.2 MB')}
                className="mt-2 w-full py-1 rounded bg-secondary-container hover:bg-secondary text-primary font-semibold text-xs border border-secondary/40 transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
              >
                <AppIcon name="download" className="w-3.5 h-3.5" /> Get
              </button>
            </div>

            {/* Download Card 2 */}
            <div className="p-2.5 rounded bg-surface-container-low border border-outline-variant hover:border-secondary/40 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="w-6 h-6 rounded bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                    <AppIcon name="workspace_premium" className="w-3.5 h-3.5 text-amber-700" />
                  </span>
                  <span className="text-[9px] text-secondary font-semibold font-mono">Gold Seal</span>
                </div>
                <h5 className="text-xs font-semibold text-primary font-headline leading-tight line-clamp-2">
                  Certified Decreed Judgment (Arnesh Kumar)
                </h5>
                <p className="text-[10px] text-on-surface-variant font-mono mt-1">DigiSeal Signed • 1.8 MB</p>
                <p className="text-[9px] text-slate-400 font-mono truncate">SHA: c370a2d...98e411</p>
              </div>
              <button
                onClick={() => onDownloadItem && onDownloadItem('Certified Judgment (Arnesh Kumar)', '1.8 MB')}
                className="mt-2 w-full py-1 rounded bg-secondary text-primary font-semibold text-xs hover:bg-[#d6b46b] transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
              >
                <AppIcon name="download" className="w-3.5 h-3.5" /> Get
              </button>
            </div>

            {/* Download Card 3 */}
            <div className="p-2.5 rounded bg-surface-container-low border border-outline-variant hover:border-secondary/40 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="w-6 h-6 rounded bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                    <AppIcon name="edit_document" className="w-3.5 h-3.5 text-blue-700" />
                  </span>
                  <span className="text-[9px] text-slate-600 font-mono">e-Filing Ready</span>
                </div>
                <h5 className="text-xs font-semibold text-primary font-headline leading-tight line-clamp-2">
                  Caveat Petition Lodgment Notice Format
                </h5>
                <p className="text-[10px] text-on-surface-variant font-mono mt-1">Fillable Form • 840 KB</p>
                <p className="text-[9px] text-slate-400 font-mono truncate">SHA: ee1892f...76ba32</p>
              </div>
              <button
                onClick={() => onDownloadItem && onDownloadItem('Caveat Petition Format', '840 KB')}
                className="mt-2 w-full py-1 rounded bg-surface hover:bg-slate-100 text-primary font-semibold text-xs border border-outline-variant transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
              >
                <AppIcon name="download" className="w-3.5 h-3.5" /> Get
              </button>
            </div>
          </div>
        </div>

        {/* Notices Mini-Strip */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 font-label flex items-center gap-1.5">
              <AppIcon name="timer" className="w-3.5 h-3.5 text-amber-600" /> Active Limitation Timelines
            </span>
            <button
              onClick={() => onNoticeAction && onNoticeAction('browse_archives')}
              className="text-primary hover:text-secondary font-semibold text-[11px] flex items-center gap-1 transition"
            >
              Browse All 3,410 Certified PDF Archives
              <AppIcon name="arrow_forward" className="w-3 h-3 text-secondary" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Notice Card 1 */}
            <div className="p-2.5 rounded bg-surface-container-low border border-outline-variant hover:border-secondary/40 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="font-mono font-bold text-primary">#LN-2025-0842</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    6 Days Remaining
                  </span>
                </div>
                <h5 className="text-xs font-semibold text-slate-800 leading-snug font-headline line-clamp-1">
                  Statutory Notice under Sec 138 NI Act
                </h5>
                <p className="text-[10px] text-on-surface-variant mt-1 line-clamp-1">
                  Served to: <strong>Global Mercantile Ltd. & MD</strong>
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
                <span className="text-emerald-700 font-medium truncate">Delivered (Ack Due)</span>
                <button
                  onClick={() => onNoticeAction && onNoticeAction('pod', '#LN-2025-0842')}
                  className="text-primary hover:text-secondary font-semibold shrink-0 ml-1 cursor-pointer"
                >
                  POD Slip
                </button>
              </div>
            </div>

            {/* Notice Card 2 */}
            <div className="p-2.5 rounded bg-surface-container-low border border-outline-variant hover:border-secondary/40 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="font-mono font-bold text-primary">#LN-2025-0839</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-blue-50 text-blue-800 border border-blue-200">
                    11 Days Remaining
                  </span>
                </div>
                <h5 className="text-xs font-semibold text-slate-800 leading-snug font-headline line-clamp-1">
                  Demand & Cease-Desist Notice (Trademark)
                </h5>
                <p className="text-[10px] text-on-surface-variant mt-1 line-clamp-1">
                  Served to: <strong>Apex Retail & Logistics LLP</strong>
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
                <span className="text-amber-700 font-medium truncate">In-Transit (#ED81249)</span>
                <button
                  onClick={() => onNoticeAction && onNoticeAction('track', '#LN-2025-0839')}
                  className="text-primary hover:text-secondary font-semibold shrink-0 ml-1 cursor-pointer"
                >
                  Track
                </button>
              </div>
            </div>

            {/* Notice Card 3 */}
            <div className="p-2.5 rounded bg-surface-container-low border border-outline-variant hover:border-secondary/40 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="font-mono font-bold text-primary">#LN-2025-0821</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Response Received
                  </span>
                </div>
                <h5 className="text-xs font-semibold text-slate-800 leading-snug font-headline line-clamp-1">
                  Sec 80 CPC Statutory Notice (UOI)
                </h5>
                <p className="text-[10px] text-on-surface-variant mt-1 line-clamp-1">
                  Respondent: <strong>Ministry of Corporate Affairs</strong>
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
                <span className="text-slate-600 font-medium truncate">Delivered & Docketed</span>
                <button
                  onClick={() => onNoticeAction && onNoticeAction('response_pdf', '#LN-2025-0821')}
                  className="text-primary hover:text-secondary font-bold shrink-0 ml-1 flex items-center gap-1 cursor-pointer"
                >
                  <AppIcon name="description" className="w-3 h-3 text-secondary" /> PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UtilityShelf;
