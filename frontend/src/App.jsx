import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SampleCaseSelector } from './components/SampleCaseSelector';
import { DossierHeader } from './components/SplitView/DossierHeader';
import { StatutoryCards } from './components/SplitView/StatutoryCards';
import { SummaryTabs } from './components/SplitView/SummaryTabs';
import { DocumentViewer } from './components/SplitView/DocumentViewer';
import { CaseChatDrawer } from './components/SplitView/CaseChatDrawer';
import { UploadZone } from './components/UploadZone';
import { MOCK_CASES, normalizeCase } from './mock/mockCaseData';
import { Sparkles, MessageSquare, Shield, CheckCircle2, Wifi, WifiOff } from 'lucide-react';

export function App() {
  const [cases, setCases] = useState(() => MOCK_CASES.map(normalizeCase));
  const [activeCaseId, setActiveCaseId] = useState(MOCK_CASES[0].id);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeCitation, setActiveCitation] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);

  // Check if live FastAPI backend is running
  useEffect(() => {
    let isMounted = true;
    async function checkBackend() {
      try {
        const res = await fetch('http://localhost:8000/health', { method: 'GET' });
        if (res.ok && isMounted) {
          setBackendConnected(true);
        }
      } catch {
        if (isMounted) setBackendConnected(false);
      }
    }
    checkBackend();
    const interval = setInterval(checkBackend, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const activeCase =
    cases.find((c) => c.id === activeCaseId) || cases[0] || normalizeCase(MOCK_CASES[0]);

  const handleCaseUploaded = (newCase) => {
    const normalized = normalizeCase(newCase);
    setCases((prev) => [normalized, ...prev]);
    setActiveCaseId(normalized.id);
  };

  const handleCitationSelect = (citationText) => {
    setActiveCitation(citationText);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-white">
      {/* Top Navbar with Live Search */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onToggleChat={() => setIsChatOpen((prev) => !prev)}
        isChatOpen={isChatOpen}
        cases={cases}
        onSelectCase={(id) => setActiveCaseId(id)}
      />

      {/* Benchmark Landmark Cases Selector Shelf */}
      <SampleCaseSelector
        cases={cases}
        activeCaseId={activeCaseId}
        onSelectCase={(id) => {
          setActiveCaseId(id);
          setActiveCitation(null);
        }}
      />

      {/* Main Split-Screen Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Legal Document Reader */}
          <div className="lg:col-span-6 w-full lg:sticky lg:top-20">
            <DocumentViewer
              activeCase={activeCase}
              activeCitation={activeCitation}
              onClearCitation={() => setActiveCitation(null)}
            />
          </div>

          {/* Right Column: Intelligent Legal Dossier */}
          <div className="lg:col-span-6 w-full space-y-5">
            <DossierHeader activeCase={activeCase} />

            <SummaryTabs
              activeCase={activeCase}
              onSelectCitation={handleCitationSelect}
            />

            <StatutoryCards
              statutes={activeCase.statutes_cited}
              onSelectCitation={handleCitationSelect}
            />
          </div>
        </div>
      </main>

      {/* Floating Ask Nyaya AI button for quick access */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-200 active:scale-95"
        >
          <MessageSquare className="w-5 h-5 text-slate-950" />
          <span className="text-sm">Ask Nyaya AI</span>
        </button>
      )}

      {/* Interactive Nyaya AI Drawer */}
      <CaseChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        activeCase={activeCase}
        onSelectCitation={handleCitationSelect}
      />

      {/* Upload Modal */}
      <UploadZone
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleCaseUploaded}
      />

      {/* Footer with compliance & status indicators */}
      <footer className="mt-auto border-t border-slate-900 bg-[#070B14]/90 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p>© 2026 NyayaSutra — Legal AI Judgment Triage Suite. Built for Indian Judicial Excellence.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> BCI & CrPC Compliant
            </span>
            <span className="flex items-center gap-1.5">
              {backendConnected ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">FastAPI Server Connected</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300">Fail-Safe Benchmark Mode</span>
                </>
              )}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
