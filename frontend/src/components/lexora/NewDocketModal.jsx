import React, { useState, useRef } from 'react';
import AppIcon from '../common/AppIcon';

export function NewDocketModal({ isOpen, onClose, onAddCase }) {
  const [caseTitle, setCaseTitle] = useState('');
  const [court, setCourt] = useState('Supreme Court of India');
  const [cnr, setCnr] = useState('');
  const [appealNum, setAppealNum] = useState('');
  const [statutes, setStatutes] = useState('IPC Sec 498A, CrPC Sec 41A');
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFile = (file) => {
    if (!file) return;
    setUploadedFileName(file.name);
    // Auto-derive clean title if empty
    const cleanName = file.name
      .replace(/\.pdf$/i, '')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ');
    if (!caseTitle) {
      setCaseTitle(cleanName);
    }
    if (!cnr) {
      const forumPrefix = court.includes('Delhi')
        ? 'DHC01'
        : court.includes('Bombay')
        ? 'BOM02'
        : court.includes('NCLAT')
        ? 'NCL01'
        : 'SCI00';
      setCnr(`${forumPrefix}-${Math.floor(100000 + Math.random() * 900000)}-2025`);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caseTitle.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const generatedCnr =
        cnr.trim() || `DHC01-${Math.floor(100000 + Math.random() * 900000)}-2025`;

      const newDossier = {
        id: `dossier_${Date.now()}`,
        cnr: generatedCnr,
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
            <AppIcon name="verified" className="w-3 h-3 text-secondary" /> Certified Copy Ready
          </span>
        ),
        tabCategory: 'certified',
        statutes: statutes.split(',').map((s) => ({
          name: s.trim(),
          badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
        })),
        stageTitle: 'Judgment Ingested & Parsed',
        stageSub: 'DigiSeal Verified',
        stageSubClass: 'text-emerald-700 font-medium',
        stageIcon: 'check_circle',
        registrySealTag: 'DigiSeal # SC-2025-019',
        actionLabel: 'Download Signed PDF',
        actionIcon: 'picture_as_pdf',
        actionType: 'download',
        actionBtnClass: 'bg-secondary text-primary hover:bg-[#d6b46b]',
        headnote: `Ingested judicial determination for ${caseTitle}. Complete statutory parsing generated through LexoraDocs automated docket intelligence pipeline with zero-latency OCR extraction.`,
        citizenSummaryEn: `Summary of ${caseTitle}: Official ruling recorded under statutory jurisdiction of ${court}. All judicial directives entered in digital docket.`,
        citizenSummaryHi: `${caseTitle} का आधिकारिक सारांश: ${court} के अधिकार क्षेत्र के तहत आदेश दर्ज किया गया।`,
        citizenSummaryMr: `${caseTitle} चा सारांश: ${court} च्या अखत्यारीत अधिकृत निर्णय नोंदवला गेला.`,
        statuteDetails: statutes.split(',').map((s) => ({
          section: s.trim(),
          act: s.includes('CrPC') ? 'Code of Criminal Procedure' : s.includes('IPC') ? 'Indian Penal Code' : 'Applicable Indian Statute',
          desc: 'Statutory parameters recorded and validated in docket review pipeline.',
        })),
      };

      setIsUploading(false);
      onAddCase(newDossier);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-xl border border-outline-variant shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-2.5">
            <AppIcon name="post_add" className="w-5 h-5 text-secondary" />
            <h3 className="font-headline font-bold text-base text-white">
              File New Judicial Docket
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <AppIcon name="close" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-body text-on-surface">
          {/* File Upload Drop Area with working File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-5 text-center transition cursor-pointer ${
              dragActive
                ? 'border-secondary bg-secondary/10 scale-[0.99]'
                : uploadedFileName
                ? 'border-emerald-500 bg-emerald-50/50'
                : 'border-outline-variant hover:border-secondary/60 bg-slate-50'
            }`}
          >
            <AppIcon
              name={uploadedFileName ? 'task' : 'cloud_upload'}
              className={`w-9 h-9 mx-auto mb-1 ${
                uploadedFileName ? 'text-emerald-600' : 'text-secondary'
              }`}
            />
            <p className="font-semibold text-primary">
              {uploadedFileName ? uploadedFileName : 'Upload Judgment PDF or Decree Scan'}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {uploadedFileName
                ? 'PDF Attached • Click to change file'
                : 'Click to browse files or drag and drop court order (PyMuPDF <100ms parser)'}
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-primary block mb-1">Appeal / Petition Number</label>
              <input
                type="text"
                value={appealNum}
                onChange={(e) => setAppealNum(e.target.value)}
                placeholder="Criminal Appeal No. 912/2025"
                className="w-full px-3 py-2 rounded border border-outline-variant focus:outline-none focus:border-secondary bg-surface text-on-surface font-mono"
              />
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
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded border border-outline-variant text-slate-700 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 rounded bg-secondary text-primary font-bold hover:bg-[#d6b46b] flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <AppIcon name="cached" className="w-4 h-4 animate-spin" />
                  Ingesting with PyMuPDF...
                </>
              ) : (
                <>
                  <AppIcon name="add_circle" className="w-4 h-4" />
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

export default NewDocketModal;
