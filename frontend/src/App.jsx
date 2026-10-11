import React, { useState } from 'react';
import { TopAppBar } from './components/lexora/TopAppBar';
import { SubHeaderBanner } from './components/lexora/SubHeaderBanner';
import { KpiStrip } from './components/lexora/KpiStrip';
import { UtilityShelf } from './components/lexora/UtilityShelf';
import { CourtRegistrySection } from './components/lexora/CourtRegistrySection';
import { InstitutionalFooter } from './components/lexora/InstitutionalFooter';
import { CaseDossierModal } from './components/lexora/CaseDossierModal';
import { AskAiDrawer } from './components/lexora/AskAiDrawer';
import { NewDocketModal } from './components/lexora/NewDocketModal';
import { INITIAL_DOSSIERS } from './components/lexora/dossierData';

export function App() {
  const [dossiers, setDossiers] = useState(INITIAL_DOSSIERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('docket');
  const [activeFilterKey, setActiveFilterKey] = useState('cnr');

  // Modals & Drawers
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [isNewDocketModalOpen, setIsNewDocketModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handlers
  const handleSelectDossier = (dossier) => {
    setSelectedDossier(dossier);
    setIsDossierModalOpen(true);
  };

  const handleDownloadPdf = (dossier) => {
    showToast(`Downloading DigiSeal Verified PDF for ${dossier.title} (SHA-256 Attested)`);
  };

  const handleDownloadVaultItem = (itemTitle, size) => {
    showToast(`Downloading ${itemTitle} (${size}) from Priority Live Vault`);
  };

  const handleNoticeAction = (action, noticeId) => {
    if (action === 'issue') {
      showToast('Opening Statutory Legal Notice Drafting Wizard under Section 138 NI Act / CPC 80');
    } else if (action === 'pod') {
      showToast(`Fetching India Post Speed Post Delivery Ack Slip for ${noticeId}`);
    } else if (action === 'track') {
      showToast(`Consignment Tracking #ED81249: Out for Delivery in Mumbai`);
    } else if (action === 'response_pdf') {
      showToast(`Opening Official Ministry of Corporate Affairs Response PDF for ${noticeId}`);
    } else {
      showToast('Accessing all 3,410 Certified PDF Archives in Central Judicial Vault');
    }
  };

  const handleRequestSeal = () => {
    showToast('Registry Seal Request Desk: Supreme Court e-Filing fast-track portal initiated.');
  };

  const handleBatchCheck = () => {
    showToast('Batch CNR Check: 5 High Courts & Supreme Court Registry checked. All dockets synchronized.');
  };

  const handleExportSheet = () => {
    showToast('Exporting Cause Docket Sheet (CSV/XLSX) with DigiSeal verification hashes...');
  };

  const handleSyncFeed = () => {
    showToast('Live CIS e-Courts Node sync completed. All cause lists updated.');
  };

  const handleAddNewCase = (newCase) => {
    setDossiers((prev) => [newCase, ...prev]);
    showToast(`New Docket Created: ${newCase.title} (${newCase.cnr})`);
  };

  // Global search filtering across all cards
  const displayedDossiers = dossiers.filter((d) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.cnr.toLowerCase().includes(q) ||
      d.citation.toLowerCase().includes(q) ||
      d.court.toLowerCase().includes(q) ||
      d.statutes.some((s) => s.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-on-surface flex flex-col font-body antialiased">
      {/* 1. TOP APP BAR */}
      <TopAppBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNav={activeNav}
        onNavChange={(nav) => {
          setActiveNav(nav);
          showToast(`Switched view to ${nav.toUpperCase()}`);
        }}
        activeFilterKey={activeFilterKey}
        onFilterKeyChange={(key) => {
          setActiveFilterKey(key);
          showToast(`Filtered search key by ${key.toUpperCase()}`);
        }}
        onOpenNewDocket={() => setIsNewDocketModalOpen(true)}
        onOpenChat={() => setIsChatDrawerOpen(true)}
      />

      {/* 2. SUB-HEADER BREADCRUMB & CONTEXT BANNER */}
      <SubHeaderBanner onSyncFeed={handleSyncFeed} />

      {/* 3. MAIN DASHBOARD CANVAS */}
      <main className="flex-1 px-4 lg:px-6 py-5 max-w-[1720px] mx-auto w-full space-y-5">
        {/* KPI Strip (4 High-Density Cards) */}
        <KpiStrip totalCases={dossiers.length * 250} />

        {/* Priority Download Vault & Statutory Notices Radar */}
        <UtilityShelf
          onDownloadItem={handleDownloadVaultItem}
          onNoticeAction={handleNoticeAction}
        />

        {/* Court Docket Registry & Cause Intelligence Deck */}
        <CourtRegistrySection
          dossiers={displayedDossiers}
          onSelectDossier={handleSelectDossier}
          onDownloadPdf={handleDownloadPdf}
          onRequestSeal={handleRequestSeal}
          onBatchCheck={handleBatchCheck}
          onExportSheet={handleExportSheet}
        />
      </main>

      {/* 4. INSTITUTIONAL FOOTER */}
      <InstitutionalFooter />

      {/* Floating Ask Nyaya AI button */}
      {!isChatDrawerOpen && (
        <button
          onClick={() => setIsChatDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-white hover:bg-primary-container border border-secondary/50 shadow-xl transition-all duration-200 active:scale-95 group"
        >
          <div className="w-6 h-6 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-xs shadow-xs">
            <span className="material-symbols-outlined text-[15px]">smart_toy</span>
          </div>
          <span className="text-xs font-headline font-semibold text-white group-hover:text-secondary transition-colors">
            Ask Docket AI
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      )}

      {/* Modals & Drawers */}
      <CaseDossierModal
        dossier={selectedDossier}
        isOpen={isDossierModalOpen}
        onClose={() => setIsDossierModalOpen(false)}
        onAskAi={(dossier) => {
          setSelectedDossier(dossier);
          setIsChatDrawerOpen(true);
        }}
      />

      <AskAiDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => setIsChatDrawerOpen(false)}
        selectedCase={selectedDossier}
      />

      <NewDocketModal
        isOpen={isNewDocketModalOpen}
        onClose={() => setIsNewDocketModalOpen(false)}
        onAddCase={handleAddNewCase}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-primary text-white border border-secondary/50 px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2.5 text-xs font-label animate-in slide-in-from-bottom duration-200">
          <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
