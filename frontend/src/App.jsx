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
import { JudgmentReviewWorkspace } from './components/lexora/JudgmentReviewWorkspace';
import {
  AdvancedSearchModal,
  NotificationsFlyout,
  SupportDeskModal,
  CounselProfileModal,
  GazetteModal,
  NoticeTimelineModal,
  DeskGuidelinesModal,
  BatchCnrModal,
  InstitutionalInfoModal,
} from './components/lexora/LexoraModals';
import { UploadZone } from './components/UploadZone';
import { INITIAL_DOSSIERS } from './components/lexora/dossierData';

export function App() {
  const [dossiers, setDossiers] = useState(INITIAL_DOSSIERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('docket');
  const [activeFilterKey, setActiveFilterKey] = useState('all');
  const [selectedForum, setSelectedForum] = useState('all');
  const [activeTabFilter, setActiveTabFilter] = useState('all');

  // Modals & Drawers
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [chatDrawerInitialTab, setChatDrawerInitialTab] = useState('chat');
  const [isNewDocketModalOpen, setIsNewDocketModalOpen] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSupportDeskOpen, setIsSupportDeskOpen] = useState(false);
  const [isCounselProfileOpen, setIsCounselProfileOpen] = useState(false);
  const [isGazetteModalOpen, setIsGazetteModalOpen] = useState(false);
  const [noticeModalState, setNoticeModalState] = useState({ isOpen: false, action: null, id: null });
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
  const [isBatchCnrOpen, setIsBatchCnrOpen] = useState(false);
  const [institutionalTopic, setInstitutionalTopic] = useState(null);
  const [isUploadZoneOpen, setIsUploadZoneOpen] = useState(false);
  const [isAiFloatingExpanded, setIsAiFloatingExpanded] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Open Nyaya AI on specific tab
  const handleOpenAi = (tab = 'chat', targetDossier = null) => {
    if (targetDossier) {
      setSelectedDossier(targetDossier);
    }
    setChatDrawerInitialTab(tab);
    setIsChatDrawerOpen(true);
  };

  // Handlers
  const handleSelectDossier = (dossier) => {
    setSelectedDossier(dossier);
    setIsDossierModalOpen(true);
  };

  const handleDownloadPdf = (dossier) => {
    showToast(`Downloading DigiSeal Verified PDF for ${dossier.title} (SHA-256 Attested)`);
    // Simulated verified file download
    const element = document.createElement('a');
    const file = new Blob(
      [
        `SUPREME COURT OF INDIA / HIGH COURT APPELLATE ORDER\n\nCNR: ${dossier.cnr}\nCitation: ${dossier.citation}\nCase: ${dossier.title}\nCourt: ${dossier.court}\nCoram: ${dossier.coram}\n\nDisposition: ${dossier.disposition}\n\nRatio Decidendi:\n${dossier.headnote}\n\nDigiSeal Electronic Verification:\nHash: 0x9f8c2b71a0e45d901842bc37ef890214a67b9318\nStatus: Certified Authentic Copy\nAttestation: Registrar (Judicial)`,
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${dossier.cnr}_Certified_Decree.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadVaultItem = (itemTitle, size) => {
    showToast(`Downloading ${itemTitle} (${size}) from Priority Live Vault...`);
    const element = document.createElement('a');
    const file = new Blob(
      [
        `CENTRAL JUDICIAL VAULT ARCHIVE\nItem: ${itemTitle}\nSize: ${size}\nVerification: SHA-256 Court Ledger Verified\nTimestamp: ${new Date().toISOString()}`,
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${itemTitle.replace(/\s+/g, '_')}_Official.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleNoticeAction = (action, noticeId) => {
    if (action === 'issue') {
      handleOpenAi('drafter');
      showToast('Opening Nyaya AI Statutory Legal Notice Drafter (Sec 138 NI Act / Sec 80 CPC)');
    } else if (action === 'pod' || action === 'track') {
      setNoticeModalState({ isOpen: true, action, id: noticeId });
    } else if (action === 'response_pdf') {
      showToast(`Opening Official Ministry of Corporate Affairs Response PDF for ${noticeId}`);
      handleDownloadVaultItem('MCA_Statutory_Response_Order', '1.2 MB');
    } else if (action === 'browse_archives') {
      showToast('Central Judicial Vault: 3,410 Certified PDF Archives filtered.');
      setActiveTabFilter('certified');
    } else {
      showToast('Accessing all Certified PDF Archives in Central Judicial Vault');
    }
  };

  const handleRequestSeal = () => {
    setIsGuidelinesModalOpen(true);
  };

  const handleBatchCheck = () => {
    setIsBatchCnrOpen(true);
  };

  const handleExportSheet = () => {
    const headers = [
      'CNR Number',
      'Case Title',
      'Citation',
      'Court',
      'Coram',
      'Disposition',
      'Statutes Cited',
      'Registry Seal Tag',
    ];
    const rows = displayedDossiers.map((d) => [
      `"${d.cnr}"`,
      `"${d.title.replace(/"/g, '""')}"`,
      `"${d.citation}"`,
      `"${d.court}"`,
      `"${d.coram}"`,
      `"${d.disposition}"`,
      `"${d.statutes.map((s) => s.name).join('; ')}"`,
      `"${d.registrySealTag}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const exportTime = Date.now();
    link.setAttribute('download', `NyayaSutra_Cause_Docket_Sheet_${exportTime}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Exported Cause Docket Sheet (CSV) with DigiSeal verification hashes!');
  };

  const handleSyncFeed = () => {
    showToast('Live CIS e-Courts Node sync completed. All 25 High Court cause lists synchronized.');
  };

  const handleAddNewCase = (newCase) => {
    setDossiers((prev) => [newCase, ...prev]);
    showToast(`New Docket Created: ${newCase.title} (${newCase.cnr})`);
  };

  const handleUploadSuccess = (uploadedCase) => {
    // Convert from UploadZone mock format to dossier format
    const newDoc = {
      id: uploadedCase.id,
      cnr: `DHC01-${Math.floor(100000 + Math.random() * 900000)}-2025`,
      title: uploadedCase.title,
      citation: `(2025) 4 SCC ${Math.floor(100 + Math.random() * 800)}`,
      appealNumber: uploadedCase.case_number,
      diaryNumber: `Diary # ${Math.floor(10000 + Math.random() * 80000)}/2025`,
      court: uploadedCase.court,
      coram: uploadedCase.coram?.join('; ') || "Hon'ble High Court Bench",
      benchType: 'High Court Bench',
      disposition: 'ALLOWED - INJUNCTION ISSUED',
      statusBadge: (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container text-on-secondary-container border border-secondary/40 shadow-2xs">
          <span className="material-symbols-outlined text-[12px] text-secondary">verified</span> Certified Copy Ready
        </span>
      ),
      tabCategory: 'certified',
      statutes: (uploadedCase.statutes_cited || []).map((s) => ({
        name: s.section,
        badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      })),
      stageTitle: 'Judgment Ingested & Analyzed',
      stageSub: 'DigiSeal Verified',
      stageSubClass: 'text-emerald-700 font-medium',
      stageIcon: 'check_circle',
      registrySealTag: 'DigiSeal # DHC-2025-812',
      actionLabel: 'Download Signed PDF',
      actionIcon: 'picture_as_pdf',
      actionType: 'download',
      actionBtnClass: 'bg-secondary text-primary hover:bg-[#d6b46b]',
      headnote: uploadedCase.lawyer_headnote,
      citizenSummaryEn: uploadedCase.citizen_summary_en,
      citizenSummaryHi: uploadedCase.citizen_summary_hi,
      citizenSummaryMr: uploadedCase.citizen_summary_mr,
      statuteDetails: (uploadedCase.statutes_cited || []).map((s) => ({
        section: s.section,
        act: s.act,
        desc: s.description,
      })),
    };

    setDossiers((prev) => [newDoc, ...prev]);
    setSelectedDossier(newDoc);
    showToast(`Uploaded & Parsed Judgment: ${uploadedCase.title}`);
  };

  const handleApplyAdvancedFilters = ({ forum, disposition, year, statute, onlyDigiSeal }) => {
    if (forum !== 'all') setSelectedForum(forum);
    if (disposition === 'allowed') setActiveTabFilter('certified');
    if (disposition === 'hearing') setActiveTabFilter('hearing');
    if (disposition === 'reserved') setActiveTabFilter('reserved');
    if (statute) setSearchQuery(statute);
    if (year !== 'all') showToast(`Filtered by year: ${year}`);
    if (onlyDigiSeal) showToast('Filtered to DigiSeal Attested orders only');
    showToast('Applied Advanced Search Filters across all judicial benches.');
  };

  const handleResetFilters = () => {
    setSelectedForum('all');
    setActiveTabFilter('all');
    setSearchQuery('');
    showToast('Reset all filters to default.');
  };

  const handleNavChange = (nav) => {
    setActiveNav(nav);
    if (nav === 'docket') {
      setActiveTabFilter('all');
    } else if (nav === 'causelist') {
      setActiveTabFilter('hearing');
      showToast('Switched to Cause Lists (Listed for Hearing)');
    } else if (nav === 'judgments') {
      showToast('Opened Split-Screen Judgment Review Workspace');
    } else if (nav === 'statutes') {
      handleOpenAi('statutes');
      showToast('Opened Nyaya AI Statutory Cross-Examiner');
    } else if (nav === 'notices') {
      showToast('Switched to Legal Notices Radar');
      const el = document.getElementById('utility-shelf-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKpiClick = (type) => {
    if (type === 'all') {
      setActiveNav('docket');
      setActiveTabFilter('all');
    } else if (type === 'certified') {
      setActiveNav('docket');
      setActiveTabFilter('certified');
      showToast('Filtered to Certified Decree Judgments');
    } else if (type === 'notices') {
      handleNavChange('notices');
    } else if (type === 'vault') {
      const el = document.getElementById('utility-shelf-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      showToast('Showing Central Priority Vault downloads');
    }
  };

  // Search filtering across index keys
  const displayedDossiers = dossiers.filter((d) => {
    // 1. Forum check
    if (selectedForum !== 'all' && !d.court.toLowerCase().includes(selectedForum.toLowerCase())) {
      return false;
    }

    // 2. Query check
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();

    if (activeFilterKey === 'cnr') {
      return d.cnr.toLowerCase().includes(q);
    }
    if (activeFilterKey === 'party') {
      return d.title.toLowerCase().includes(q);
    }
    if (activeFilterKey === 'statute') {
      return d.statutes.some((s) => s.name.toLowerCase().includes(q));
    }
    if (activeFilterKey === 'court') {
      return d.court.toLowerCase().includes(q) || d.coram.toLowerCase().includes(q);
    }

    // 'all' key matches all fields
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
        onNavChange={handleNavChange}
        activeFilterKey={activeFilterKey}
        onFilterKeyChange={(key) => {
          setActiveFilterKey(key);
          showToast(`Filtered search key by ${key.toUpperCase()}`);
        }}
        selectedForum={selectedForum}
        onSelectForum={(forum) => {
          setSelectedForum(forum);
          showToast(`Filtered forum to ${forum.toUpperCase()}`);
        }}
        onOpenNewDocket={() => setIsNewDocketModalOpen(true)}
        onOpenChat={(tab = 'chat') => handleOpenAi(tab)}
        onOpenAdvancedSearch={() => setIsAdvancedSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSupportDesk={() => setIsSupportDeskOpen(true)}
        onOpenCounselProfile={() => setIsCounselProfileOpen(true)}
      />

      {/* 2. SUB-HEADER BREADCRUMB & CONTEXT BANNER */}
      <SubHeaderBanner onSyncFeed={handleSyncFeed} />

      {/* 3. MAIN WORKSPACE / DASHBOARD CANVAS */}
      <main className="flex-1 px-4 lg:px-6 py-5 max-w-[1720px] mx-auto w-full space-y-5">
        {/* VIEW A: SPLIT-SCREEN JUDGMENT REVIEW WORKSPACE */}
        {activeNav === 'judgments' ? (
          <JudgmentReviewWorkspace
            caseData={selectedDossier || dossiers[0]}
            onBack={() => setActiveNav('docket')}
            onAskAi={(c) => handleOpenAi('chat', c)}
            onOpenUpload={() => setIsUploadZoneOpen(true)}
          />
        ) : (
          /* VIEW B: FULL DOCKET INTELLIGENCE DASHBOARD */
          <>
            {/* KPI Strip (4 High-Density Cards) */}
            <KpiStrip
              totalCases={dossiers.length * 250}
              onKpiClick={handleKpiClick}
            />

            {/* Priority Download Vault & Statutory Notices Radar */}
            <div id="utility-shelf-section">
              <UtilityShelf
                onDownloadItem={handleDownloadVaultItem}
                onNoticeAction={handleNoticeAction}
              />
            </div>

            {/* Court Docket Registry & Cause Intelligence Deck */}
            <CourtRegistrySection
              dossiers={displayedDossiers}
              onSelectDossier={handleSelectDossier}
              onDownloadPdf={handleDownloadPdf}
              onRequestSeal={handleRequestSeal}
              onBatchCheck={handleBatchCheck}
              onExportSheet={handleExportSheet}
              onOpenGazette={() => setIsGazetteModalOpen(true)}
              onAskAi={(dossier) => handleOpenAi('chat', dossier)}
              selectedForum={selectedForum}
              onSelectForum={setSelectedForum}
              activeTabFilter={activeTabFilter}
              onTabFilterChange={setActiveTabFilter}
            />
          </>
        )}
      </main>

      {/* 4. INSTITUTIONAL FOOTER */}
      <InstitutionalFooter
        onOpenInstitutional={(topic) => setInstitutionalTopic(topic)}
      />

      {/* 5. FLOATING NYAYA AI ACTION DOCK */}
      {!isChatDrawerOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
          {/* Expandable Quick Actions */}
          {isAiFloatingExpanded && (
            <div className="flex flex-col items-end gap-1.5 animate-in slide-in-from-bottom-3 duration-150 mb-1">
              <button
                onClick={() => {
                  setIsAiFloatingExpanded(false);
                  handleOpenAi('statutes');
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-primary text-xs font-semibold shadow-lg border border-slate-200 hover:border-secondary hover:text-secondary transition active:scale-95 cursor-pointer"
              >
                <span>Statutory Sections</span>
                <span className="material-symbols-outlined text-[16px] text-secondary">menu_book</span>
              </button>
              <button
                onClick={() => {
                  setIsAiFloatingExpanded(false);
                  handleOpenAi('drafter');
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-primary text-xs font-semibold shadow-lg border border-slate-200 hover:border-secondary hover:text-secondary transition active:scale-95 cursor-pointer"
              >
                <span>Draft Legal Notice</span>
                <span className="material-symbols-outlined text-[16px] text-secondary">edit_document</span>
              </button>
              <button
                onClick={() => {
                  setIsAiFloatingExpanded(false);
                  handleOpenAi('digiseal');
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-primary text-xs font-semibold shadow-lg border border-slate-200 hover:border-secondary hover:text-secondary transition active:scale-95 cursor-pointer"
              >
                <span>Verify DigiSeal</span>
                <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
              </button>
            </div>
          )}

          {/* Main Floating Button */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsAiFloatingExpanded(!isAiFloatingExpanded)}
              className="p-2.5 rounded-full bg-white text-primary hover:bg-slate-50 border border-slate-200 shadow-lg text-xs font-bold transition active:scale-95 cursor-pointer"
              title="More AI Tools"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">
                {isAiFloatingExpanded ? 'expand_more' : 'apps'}
              </span>
            </button>

            <button
              onClick={() => handleOpenAi('chat')}
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-[#162D4D] text-white hover:brightness-110 border border-secondary/50 shadow-xl transition-all duration-200 active:scale-95 group cursor-pointer"
              title="Open Nyaya AI Legal Assistant"
            >
              <div className="w-6 h-6 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-xs shadow-xs group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-[15px]">smart_toy</span>
              </div>
              <span className="text-xs font-headline font-semibold text-white group-hover:text-secondary transition-colors">
                Nyaya AI Assistant
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </div>
        </div>
      )}

      {/* 6. MODALS & DRAWERS */}
      {/* Case Dossier Modal */}
      <CaseDossierModal
        dossier={selectedDossier}
        isOpen={isDossierModalOpen}
        onClose={() => setIsDossierModalOpen(false)}
        onAskAi={(dossier) => handleOpenAi('chat', dossier)}
        onDownloadPdf={handleDownloadPdf}
        onOpenSplitView={(dossier) => {
          setSelectedDossier(dossier);
          setActiveNav('judgments');
        }}
      />

      {/* Nyaya AI Suite Drawer (Chat, Statutes, Drafter, Synthesizer, DigiSeal) */}
      <AskAiDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => setIsChatDrawerOpen(false)}
        selectedCase={selectedDossier}
        initialTab={chatDrawerInitialTab}
      />

      {/* New Docket Modal */}
      <NewDocketModal
        isOpen={isNewDocketModalOpen}
        onClose={() => setIsNewDocketModalOpen(false)}
        onAddCase={handleAddNewCase}
      />

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
        onApplyFilters={handleApplyAdvancedFilters}
        onResetFilters={handleResetFilters}
      />

      {/* Notifications Flyout */}
      <NotificationsFlyout
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectAlert={(alert) => {
          setIsNotificationsOpen(false);
          if (alert.type === 'roster') {
            setIsGazetteModalOpen(true);
          } else if (alert.type === 'limitation') {
            setNoticeModalState({ isOpen: true, action: 'track', id: '#LN-2025-0842' });
          } else if (alert.type === 'seal') {
            handleDownloadPdf(dossiers[0]);
          } else {
            handleSelectDossier(dossiers[2]);
          }
        }}
      />

      {/* Registry Support Desk Modal */}
      <SupportDeskModal
        isOpen={isSupportDeskOpen}
        onClose={() => setIsSupportDeskOpen(false)}
      />

      {/* Senior Counsel Profile Modal */}
      <CounselProfileModal
        isOpen={isCounselProfileOpen}
        onClose={() => setIsCounselProfileOpen(false)}
      />

      {/* Official Gazette Notification Modal */}
      <GazetteModal
        isOpen={isGazetteModalOpen}
        onClose={() => setIsGazetteModalOpen(false)}
      />

      {/* Notice Timeline & Tracking Modal */}
      <NoticeTimelineModal
        isOpen={noticeModalState.isOpen}
        onClose={() => setNoticeModalState({ isOpen: false, action: null, id: null })}
        noticeAction={noticeModalState.action}
        noticeId={noticeModalState.id}
      />

      {/* Desk Guidelines Modal */}
      <DeskGuidelinesModal
        isOpen={isGuidelinesModalOpen}
        onClose={() => setIsGuidelinesModalOpen(false)}
      />

      {/* Batch CNR Synchronizer Modal */}
      <BatchCnrModal
        isOpen={isBatchCnrOpen}
        onClose={() => setIsBatchCnrOpen(false)}
      />

      {/* Institutional Info Modal (Footer Links) */}
      <InstitutionalInfoModal
        isOpen={Boolean(institutionalTopic)}
        onClose={() => setInstitutionalTopic(null)}
        topic={institutionalTopic}
      />

      {/* Judgment PDF Upload Zone */}
      <UploadZone
        isOpen={isUploadZoneOpen}
        onClose={() => setIsUploadZoneOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* 7. TOAST NOTIFICATION */}
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
