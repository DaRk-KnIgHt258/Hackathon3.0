import React, { useState } from 'react';

export function NewDocketModal({ isOpen, onClose, onAddCase }) {
  const [caseTitle, setCaseTitle] = useState('');
  const [court, setCourt] = useState('Supreme Court of India');
  const [cnr, setCnr] = useState('');
  const [appealNum, setAppealNum] = useState('');
  const [statutes, setStatutes] = useState('IPC Sec 498A, CrPC Sec 41');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caseTitle.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const newDossier = {
        id: `dossier_${Date.now()}`,
        cnr: cnr.trim() || `DHC01-${Math.floor(100000 + Math.random() * 900000)}-2025`,
        title: caseTitle.trim(),
        citation: `(2025) ${Math.floor(1 + Math.random() * 10)} SCC ${Math.floor(100 + Math.random() * 800)}`,
        appealNumber: appealNum.trim() || 'Criminal Appeal No. 912/2025',
        diaryNumber: `Diary # ${Math.floor(10000 + Math.random() * 80000)}/2025`,
        court: court,
        coram: "Hon'ble Division Bench",
        benchType: 'Division Bench',
        disposition: 'CERTIFIED DOCKET RECORDED',
        statusBadge: (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container text-on-secondary-container border border-secondary/40 shadow-2xs">
            <span className="material-symbols-outlined text-[12px] text-secondary">verified</span> Certified Copy Ready
          </span>
        ),
        tabCategory: 'certified',
        statutes: statutes.split(',').map((s) => ({
          name: s.trim(),
          badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
        })),
        stageTitle: 'Judgment Ingested',
        stageSub: 'DigiSeal Verified',
        stageSubClass: 'text-emerald-700 font-medium',
        stageIcon: 'check_circle',
        registrySealTag: 'DigiSeal # SC-2025-019',
        actionLabel: 'Download Signed PDF',
        actionIcon: 'picture_as_pdf',
        actionType: 'download',
        actionBtnClass: 'bg-secondary text-primary hover:bg-[#d6b46b]',
        headnote: `Ingested judgment review for ${caseTitle}. Case analysis generated through LexoraDocs automated docket intelligence pipeline.`,
        citizenSummaryEn: `Summary of ${caseTitle}: Legal determination confirmed under statutory jurisdiction of ${court}.`,
        citizenSummaryHi: `${caseTitle} का संक्षिप्त सारांश: न्यायालय द्वारा कानूनी निर्धारण की पुष्टि की गई।`,
      };

      setIsUploading(false);
      onAddCase(newDossier);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl border border-outline-variant shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[22px]">post_add</span>
            <h3 className="font-headline font-bold text-base text-white">
              File New Judicial Docket
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-body">
          {/* File Upload Drop Area */}
          <div className="border-2 border-dashed border-outline-variant hover:border-secondary/60 rounded-lg p-5 text-center bg-slate-50 transition cursor-pointer">
            <span className="material-symbols-outlined text-[36px] text-secondary block mx-auto mb-1">
              cloud_upload
            </span>
            <p className="font-semibold text-primary">Upload Judgment PDF or Decree Scan</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              PyMuPDF auto-extracts Parties, Coram, and Statutory Sections in &lt;100ms
            </p>
          </div>

          <div>
            <label className="font-semibold text-primary block mb-1">Case Title / Parties</label>
            <input
              type="text"
              required
              value={caseTitle}
              onChange={(e) => setCaseTitle(e.target.value)}
              placeholder="e.g. State of Maharashtra v. Rajesh Sharma"
              className="w-full px-3 py-2 rounded border border-outline-variant focus:outline-none focus:border-secondary bg-surface text-on-surface"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-primary block mb-1">Court / Forum</label>
              <select
                value={court}
                onChange={(e) => setCourt(e.target.value)}
                className="w-full px-2.5 py-2 rounded border border-outline-variant focus:outline-none focus:border-secondary bg-surface text-on-surface"
              >
                <option>Supreme Court of India</option>
                <option>Delhi High Court</option>
                <option>Bombay High Court</option>
                <option>NCLAT New Delhi</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-primary block mb-1">CNR Number</label>
              <input
                type="text"
                value={cnr}
                onChange={(e) => setCnr(e.target.value)}
                placeholder="DHC01-094821-2025"
                className="w-full px-3 py-2 rounded border border-outline-variant focus:outline-none focus:border-secondary bg-surface text-on-surface font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-primary block mb-1">Statutory Acts & Sections</label>
            <input
              type="text"
              value={statutes}
              onChange={(e) => setStatutes(e.target.value)}
              placeholder="Comma-separated (e.g. IPC Sec 302, CrPC Sec 164)"
              className="w-full px-3 py-2 rounded border border-outline-variant focus:outline-none focus:border-secondary bg-surface text-on-surface"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded border border-outline-variant text-slate-700 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 rounded bg-secondary text-primary font-bold hover:bg-[#d6b46b] flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">cached</span>
                  Ingesting...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  Create Docket Entry
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
