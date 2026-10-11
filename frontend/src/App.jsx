import React, { useState, useEffect } from 'react';
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
import { fetchCases, fetchSampleCases, fetchCase } from './services/api';
import { normalizeCase, MOCK_CASES } from './mock/mockCaseData';
import AppIcon from './components/common/AppIcon';

/**
 * Maps a backend CaseListItem or SampleCase to the dossier card grid shape
 * expected by ModularDossierCards (statutes, cnr, citation, stage*, etc.).
 */
function normalizeToDossierCard(c) {
  const caseId = c.id || c.case_id || '';
  const benchmark = MOCK_CASES.find(
    (m) =>
      m.id === caseId ||
      (m.title && c.title && (
        m.title.toLowerCase().includes(c.title.toLowerCase().slice(0, 15)) ||
        c.title.toLowerCase().includes(m.title.toLowerCase().slice(0, 15))
      ))
  );

  const title = c.title || benchmark?.title || 'Court Judgment Order';
  const parts = title.split(/\s+(?:vs\.?|v\.?)\s+/i);
  const petitioner =
    c.petitioner || (parts.length > 1 ? parts[0].trim() : (benchmark?.petitioner || 'Petitioner'));
  const respondent =
    c.respondent || (parts.length > 1 ? parts[1].trim() : (benchmark?.respondent || 'Respondent'));

  const headnote =
    c.lawyer_headnote || c.headnote || benchmark?.lawyer_headnote || c.description || '';
  const citizenSummaryEn =
    c.citizen_summary_en || c.citizenSummaryEn || benchmark?.citizen_summary_en || c.description || '';
  const citizenSummaryHi =
    c.citizen_summary_hi || c.citizenSummaryHi || benchmark?.citizen_summary_hi || '';

  const statutesCited =
    Array.isArray(c.statutes_cited) && c.statutes_cited.length > 0
      ? c.statutes_cited
      : benchmark?.statutes_cited || [];

  const rawDisp =
    c.disposition_status ||
    (typeof c.disposition === 'string' ? c.disposition : c.disposition?.status) ||
    benchmark?.disposition?.status ||
    'ALLOWED';
  const isFavourable = ['ALLOWED', 'BAIL_GRANTED'].some((k) => rawDisp.includes(k));
  const isPending = ['REMANDED', 'DISPOSED_WITH_DIRECTIONS', 'PARTLY_ALLOWED', 'RESERVED'].some((k) =>
    rawDisp.includes(k)
  );

  const statutes = statutesCited.map((s) => ({
    name: s.section || s.act || 'Statute',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
  }));

  const caseNum =
    c.case_number ||
    c.appealNumber ||
    benchmark?.case_number ||
    (caseId && !caseId.startsWith('sample_')
      ? `Case #${caseId.slice(0, 8).toUpperCase()}`
      : 'Criminal Appeal No. 1277/2014');

  return {
    id: caseId || benchmark?.id || 'dossier_' + Date.now(),
    cnr: caseNum,
    title,
    citation: c.citation || benchmark?.citation || `(${c.judgment_date || c.year || benchmark?.date || '2024'})`,
    appealNumber: caseNum,
    diaryNumber: c.diaryNumber || `Diary # ${Math.floor(10000 + Math.random() * 80000)}/2024`,
    court: c.court || benchmark?.court || 'Supreme Court of India',
    coram: Array.isArray(c.coram) ? c.coram.join('; ') : (c.coram || benchmark?.coram?.join('; ') || "Hon'ble Bench"),
    benchType: c.case_type || benchmark?.case_type || 'Appellate Bench',
    disposition: rawDisp,
    statusBadge: null,
    tabCategory: isFavourable ? 'certified' : isPending ? 'reserved' : 'hearing',
    statutes,
    stageTitle: isFavourable ? 'Final Order Issued' : isPending ? 'Orders Reserved' : 'Listed for Hearing',
    stageSub: isFavourable ? 'Disposed on Merits' : isPending ? 'Judgment Awaited' : 'Next Date Assigned',
    stageSubClass: isFavourable
      ? 'text-emerald-700 font-medium'
      : isPending
      ? 'text-amber-700 font-medium'
      : 'text-sky-700 font-medium',
    stageIcon: isFavourable ? 'check_circle' : isPending ? 'hourglass_top' : 'gavel',
    registrySealTag: `DigiSeal # ${(caseId || 'SC-2024').slice(0, 12).toUpperCase()}`,
    actionLabel: 'View Dossier',
    actionIcon: 'open_in_new',
    actionType: 'view',
    actionBtnClass: 'bg-secondary text-primary hover:bg-[#d6b46b]',
    headnote,
    citizenSummaryEn,
    citizenSummaryHi,
    citizenSummaryMr: c.citizenSummaryMr || '',
    petitioner,
    respondent,
    statuteDetails: statutesCited.map((s) => ({ section: s.section, act: s.act, desc: s.description || '', page_ref: s.page_ref || null })),
    precedents_cited: c.precedents_cited || benchmark?.precedents_cited || [],
    key_facts: c.key_facts || benchmark?.key_facts || [],
    pages: c.pages || benchmark?.pages,
  };
}

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
  const [backendOnline, setBackendOnline] = useState(false);

  // ── Bootstrap: hydrate dossiers from backend on mount ──────────────────
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        // Fetch in parallel: processed cases list + landmark samples
        const [casesResp, samplesResp] = await Promise.all([
          fetchCases({ limit: 50 }),
          fetchSampleCases(),
        ]);

        if (cancelled) return;
        setBackendOnline(true);

        // Deduplicate against existing IDs and case titles
        const existingIds = new Set(INITIAL_DOSSIERS.map((d) => d.id));
        const existingTitles = new Set(
          INITIAL_DOSSIERS.map((d) =>
            d.title.toLowerCase().split(/\s+(?:vs\.?|v\.?)\s+/i)[0].trim()
          )
        );

        // Normalize case list items into dossier card shape
        const fromCases = (casesResp.cases || [])
          .map((c) => normalizeToDossierCard({ id: c.case_id, ...c }))
          .filter(
            (d) =>
              !existingIds.has(d.id) &&
              !existingTitles.has(d.title.toLowerCase().split(/\s+(?:vs\.?|v\.?)\s+/i)[0].trim())
          );

        // Normalize sample cases (hydrated with rich landmark benchmark data)
        const seenIds = new Set([...existingIds, ...fromCases.map((c) => c.id)]);
        const seenTitles = new Set([
          ...existingTitles,
          ...fromCases.map((d) =>
            d.title.toLowerCase().split(/\s+(?:vs\.?|v\.?)\s+/i)[0].trim()
          ),
        ]);

        const fromSamples = (samplesResp || [])
          .map((s) => normalizeToDossierCard({ id: s.case_id, ...s }))
          .filter(
            (d) =>
              !seenIds.has(d.id) &&
              !seenTitles.has(d.title.toLowerCase().split(/\s+(?:vs\.?|v\.?)\s+/i)[0].trim())
          );

        const backendDossiers = [...fromSamples, ...fromCases];
        if (backendDossiers.length > 0) {
          setDossiers((prev) => [...prev, ...backendDossiers]);
        }
      } catch (err) {
        // Backend offline – stay on static mock data
        console.info('Backend not reachable on startup, using static mock dossiers:', err.message);
      }
    }
    bootstrap();
    return () => { cancelled = true; };
  }, []);
  // ───────────────────────────────────────────────────────────────────────


  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Open Nyaya AI on specific tab
  const handleOpenAi = async (tab = 'chat', targetDossier = null) => {
    if (targetDossier) {
      setSelectedDossier(targetDossier);
      if (targetDossier.id && (!targetDossier.headnote || !targetDossier.statutes?.length)) {
        try {
          const res = await fetchCase(targetDossier.id);
          if (res?.dossier) {
            const enriched = {
              ...targetDossier,
              ...normalizeToDossierCard({ id: res.case_id, ...res.dossier }),
            };
            setSelectedDossier(enriched);
            setDossiers((prev) =>
              prev.map((d) => (d.id === targetDossier.id ? enriched : d))
            );
          }
        } catch (_) {}
      }
    }
    setChatDrawerInitialTab(tab);
    setIsChatDrawerOpen(true);
  };

  // Handlers
  const handleSelectDossier = async (dossier) => {
    setSelectedDossier(dossier);
    setIsDossierModalOpen(true);

    // If dossier lacks full details (loaded from list/sample stub), fetch full details
    if (dossier?.id && (!dossier.headnote || !dossier.statutes?.length)) {
      try {
        const res = await fetchCase(dossier.id);
        if (res?.dossier) {
          const enriched = {
            ...dossier,
            ...normalizeToDossierCard({ id: res.case_id, ...res.dossier }),
          };
          setSelectedDossier(enriched);
          setDossiers((prev) =>
            prev.map((d) => (d.id === dossier.id ? enriched : d))
          );
        }
      } catch (err) {
        console.debug('Using cached dossier metadata:', err);
      }
    }
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
      date: uploadedCase.date || uploadedCase.judgment_date || 'January 19, 2017',
      judgment_date: uploadedCase.date || uploadedCase.judgment_date || 'January 19, 2017',
      coram: Array.isArray(uploadedCase.coram) ? uploadedCase.coram.join('; ') : (uploadedCase.coram || "Hon'ble High Court Bench"),
      petitioner:
        uploadedCase.petitioner ||
        (uploadedCase.title?.split(/\s+(?:vs\.?|v\.?)\s+/i)[0]?.trim() || 'Petitioner / Appellant'),
      respondent:
        uploadedCase.respondent ||
        (uploadedCase.title?.split(/\s+(?:vs\.?|v\.?)\s+/i)[1]?.trim() || 'State / Respondent'),
      benchType: uploadedCase.case_type || 'High Court Bench',
      disposition: uploadedCase.disposition?.status || 'ALLOWED - INJUNCTION ISSUED',
      statusBadge: (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container text-on-secondary-container border border-secondary/40 shadow-2xs">
          <AppIcon name="verified" className="w-3 h-3 text-secondary" /> Certified Copy Ready
        </span>
      ),
      tabCategory: 'certified',
      statutes: (uploadedCase.statutes_cited || []).map((s) => ({
        name: s.section || s.act || 'Statute',
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
        page_ref: s.page_ref || null,
      })),
      statutes_cited: uploadedCase.statutes_cited || [],
      pages: uploadedCase.pages,
      precedents_cited: uploadedCase.precedents_cited || [],
      key_facts: uploadedCase.key_facts || [],
    };

    setDossiers((prev) => [newDoc, ...prev]);
    setSelectedDossier(newDoc);
    setActiveNav('judgments');
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
      return (d.cnr || '').toLowerCase().includes(q);
    }
    if (activeFilterKey === 'party') {
      return (d.title || '').toLowerCase().includes(q);
    }
    if (activeFilterKey === 'statute') {
      return d.statutes?.some((s) => s?.name?.toLowerCase().includes(q)) || false;
    }
    if (activeFilterKey === 'court') {
      return (d.court || '').toLowerCase().includes(q) || (d.coram || '').toLowerCase().includes(q);
    }

    // 'all' key matches all fields
    return (
      (d.title || '').toLowerCase().includes(q) ||
      (d.cnr || '').toLowerCase().includes(q) ||
      (d.citation || '').toLowerCase().includes(q) ||
      (d.court || '').toLowerCase().includes(q) ||
      (d.statutes?.some((s) => s?.name?.toLowerCase().includes(q)) || false)
    );
  });

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-on-surface flex flex-col font-body antialiased">
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
        onOpenUpload={() => setIsUploadZoneOpen(true)}
        onOpenChat={(tab = 'chat') => handleOpenAi(tab)}
        onOpenAdvancedSearch={() => setIsAdvancedSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSupportDesk={() => setIsSupportDeskOpen(true)}
        onOpenCounselProfile={() => setIsCounselProfileOpen(true)}
      />

      {/* 2. SUB-HEADER BREADCRUMB & CONTEXT BANNER */}
      <SubHeaderBanner
        activeNav={activeNav}
        onSyncFeed={handleSyncFeed}
      />

      {/* 3. MAIN WORKSPACE / DASHBOARD CANVAS */}
      <main className="flex-1 px-4 lg:px-6 py-6 max-w-[1720px] mx-auto w-full space-y-6">
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
              dossiers={dossiers}
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
              onOpenUpload={() => setIsUploadZoneOpen(true)}
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
      {!isChatDrawerOpen && activeNav !== 'judgments' && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">

          {/* Expandable Quick Actions */}
          {isAiFloatingExpanded && (
            <div className="flex flex-col items-end gap-1.5 mb-1 animate-fade-up">
              {[
                { label: 'Statutory Sections', icon: 'menu_book',    tab: 'statutes' },
                { label: 'Draft Legal Notice', icon: 'edit_document', tab: 'drafter' },
                { label: 'Verify DigiSeal',    icon: 'verified_user', tab: 'digiseal' },
              ].map((item) => (
                <button
                  key={item.tab}
                  onClick={() => { setIsAiFloatingExpanded(false); handleOpenAi(item.tab); }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-primary text-xs font-semibold
                             shadow-xl border border-slate-200 hover:border-secondary/60 hover:text-secondary
                             transition-all duration-150 active:scale-95 cursor-pointer backdrop-blur-sm"
                >
                  <span>{item.label}</span>
                  <AppIcon name={item.icon} className="w-3.5 h-3.5 text-secondary" />
                </button>
              ))}
            </div>
          )}

          {/* Main FAB Row */}
          <div className="flex items-center gap-2">
            {/* Expand toggle */}
            <button
              onClick={() => setIsAiFloatingExpanded(!isAiFloatingExpanded)}
              className="w-9 h-9 rounded-full bg-white text-primary border border-slate-200 shadow-lg
                         flex items-center justify-center hover:bg-slate-50 hover:border-secondary/40
                         transition-all duration-200 active:scale-95 cursor-pointer"
              title="More AI Tools"
            >
              <AppIcon
                name={isAiFloatingExpanded ? 'close' : 'apps'}
                className={`w-4 h-4 text-secondary transition-transform duration-200 ${isAiFloatingExpanded ? 'rotate-90' : ''}`}
              />
            </button>

            {/* Main AI button */}
            <button
              onClick={() => handleOpenAi('chat')}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full
                         bg-gradient-to-r from-primary via-[#162D4A] to-primary text-white
                         hover:brightness-110 border border-secondary/40 shadow-xl
                         transition-all duration-200 active:scale-95 group cursor-pointer"
              title="Open Nyaya AI Legal Assistant"
            >
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform duration-200">
                <AppIcon name="smart_toy" className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-xs font-headline font-bold text-white group-hover:text-secondary transition-colors">
                Nyaya AI
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
        onOpenSplitView={async (dossier) => {
          setSelectedDossier(dossier);
          setActiveNav('judgments');
          if (dossier?.id && (!dossier.headnote || !dossier.statutes?.length)) {
            try {
              const res = await fetchCase(dossier.id);
              if (res?.dossier) {
                const enriched = {
                  ...dossier,
                  ...normalizeToDossierCard({ id: res.case_id, ...res.dossier }),
                };
                setSelectedDossier(enriched);
                setDossiers((prev) =>
                  prev.map((d) => (d.id === dossier.id ? enriched : d))
                );
              }
            } catch (_) {}
          }
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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary/95 text-white border border-secondary/40
                        px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-label
                        animate-fade-up backdrop-blur-sm max-w-sm text-center">
          <AppIcon name="check_circle" className="w-4 h-4 text-secondary shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
