import React, { useState } from 'react';
import { UploadCloud, FileCheck, X, Sparkles, Loader2, AlertCircle } from 'lucide-react';

export function UploadZone({ isOpen, onClose, onUploadSuccess }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  if (!isOpen) return null;

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
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleProcessFile = (file) => {
    setSelectedFile(file);
    setUploading(true);
    // Simulate AI parsing workflow
    setTimeout(() => {
      setUploading(false);
      onUploadSuccess({
        id: 'uploaded_doc_' + Date.now(),
        title: file.name.replace('.pdf', '') || 'Uploaded Judgment Order',
        case_number: 'WP (C) No. 4921 of 2024',
        court: 'High Court of Delhi',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        coram: ["Hon'ble Justice Prathiba M. Singh"],
        disposition: {
          status: 'ALLOWED',
          badge_color: 'emerald',
          verdict_text: 'Ad-interim Injunction Issued / Directions Framed'
        },
        case_type: 'INTELLECTUAL PROPERTY / CIVIL',
        statutes_cited: [
          {
            act: 'Trade Marks Act, 1999',
            section: 'Section 29',
            description: 'Infringement of registered trade marks.',
            context_in_case: 'Unauthorized use of deceptive domain names and digital marks.'
          },
          {
            act: 'Civil Procedure Code, 1908',
            section: 'Order XXXIX Rules 1 & 2',
            description: 'Grant of temporary injunction.',
            context_in_case: 'Prima facie case established with balance of convenience in favor of plaintiff.'
          }
        ],
        lawyer_headnote: 'High Court held that dynamic injunctions can be granted to protect digital mark proprietors against mirror websites and rogue registrars.',
        citizen_summary_en: 'The court ordered blocking of fake clone websites copying the company identity to protect ordinary users from online fraud.',
        citizen_summary_hi: 'अदालत ने आम लोगों को धोखाधड़ी से बचाने के लिए कंपनी के नाम से चल रही नकली वेबसाइटों को तुरंत ब्लॉक करने का आदेश दिया।',
        citizen_summary_mr: 'नागरिकांची ऑनलाइन फसवणूक टाळण्यासाठी कंपनीच्या नावाचा गैरवापर करणाऱ्या बनावट संकेतस्थळांवर बंदी घालण्याचे आदेश न्यायालयाने दिले.',
        pdf_sample_url: URL.createObjectURL(file),
        highlights: [
          { page: 1, text: 'Plaintiff has established irreparable injury if injunction is denied.' }
        ]
      });
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Upload Judgment PDF</h3>
              <p className="text-xs text-slate-400">AI triage & statutory extraction for Indian Court Orders</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Body */}
        <div className="mt-5">
          {uploading ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5">
              <div className="relative mb-4">
                <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
                <Sparkles className="w-4 h-4 text-cyan-400 absolute -top-1 -right-1" />
              </div>
              <p className="text-sm font-semibold text-slate-200">AI Extracting Statutory Clauses...</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs text-center">
                Parsing coram, ratio decidendi, citations, and generating plain-language translations.
              </p>
              <div className="w-48 h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 animate-pulse w-3/4"></div>
              </div>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center py-10 px-6 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer ${
                dragActive
                  ? 'border-emerald-500 bg-emerald-500/10 scale-[0.99]'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
              }`}
              onClick={() => document.getElementById('pdf-file-input').click()}
            >
              <input
                id="pdf-file-input"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileInput}
              />
              <div className="h-14 w-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-3 text-slate-300 shadow-inner">
                <UploadCloud className="w-7 h-7 text-emerald-400" />
              </div>
              <p className="text-sm font-medium text-slate-200 text-center">
                <span className="text-emerald-400 font-semibold">Click to upload</span> or drag and drop court PDF
              </p>
              <p className="text-xs text-slate-400 mt-1">Supports Supreme Court, High Court & Tribunal orders up to 50MB</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-800/60">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" /> Grounded in Official Judgment Text
          </span>
          <span>FastAPI / OCR Pipeline Ready</span>
        </div>
      </div>
    </div>
  );
}
