import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SampleCaseSelector } from './components/SampleCaseSelector';
import { DossierHeader } from './components/SplitView/DossierHeader';
import { StatutoryCards } from './components/SplitView/StatutoryCards';
import { SummaryTabs } from './components/SplitView/SummaryTabs';
import { DocumentViewer } from './components/SplitView/DocumentViewer';
import { CaseChatDrawer } from './components/SplitView/CaseChatDrawer';
import { UploadZone } from './components/UploadZone';
import { MOCK_CASES } from './mock/mockCaseData';
import { Sparkles, MessageSquare, Shield, CheckCircle2 } from 'lucide-react';

export function App() {
  const [cases, setCases] = useState(MOCK_CASES);
  const [activeCaseId, setActiveCaseId] = useState(MOCK_CASES[0].id);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const handleCaseUploaded = (newCase) => {
    setCases((prev) => [newCase, ...prev]);
    setActiveCaseId(newCase.id);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onToggleChat={() => setIsChatOpen((prev) => !prev)}
        isChatOpen={isChatOpen}
      />

      {/* Benchmark Sample Case Selector Shelf */}
      <SampleCaseSelector
        cases={cases}
        activeCaseId={activeCaseId}
        onSelectCase={(id) => setActiveCaseId(id)}
      />

      {/* Main Split-Screen Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (50% on desktop): Document Reader */}
          <div className="lg:col-span-6 w-full sticky top-20">
            <DocumentViewer activeCase={activeCase} />
          </div>

          {/* Right Column (50% on desktop): Intelligent Legal Dossier */}
          <div className="lg:col-span-6 w-full space-y-5">
            <DossierHeader activeCase={activeCase} />
            <SummaryTabs activeCase={activeCase} />
            <StatutoryCards statutes={activeCase.statutes_cited} />
          </div>
        </div>
      </main>

      {/* Floating Ask Nyaya AI button for mobile / quick access */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-200 active:scale-95"
        >
          <MessageSquare className="w-5 h-5 text-slate-950" />
          <span className="text-sm">Ask Case AI</span>
        </button>
      )}

      {/* Interactive Nyaya AI Drawer */}
      <CaseChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        activeCase={activeCase}
      />

      {/* Upload Modal */}
      <UploadZone
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleCaseUploaded}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-[#070B14]/90 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 NyayaSutra — Legal AI Judgment Triage Suite. Built for Indian Legal Excellence.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> BCI & CrPC Compliant
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> FastAPI Mock Connected
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
