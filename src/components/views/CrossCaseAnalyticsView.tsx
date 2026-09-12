import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  BrainCircuit,
  Users,
  Network,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  ShieldAlert,
  FolderGit2,
  ExternalLink,
  CreditCard,
  Phone,
  Building,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  UserCheck,
  RotateCcw,
  Tag,
  Hash,
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const CrossCaseAnalyticsView: React.FC = () => {
  const { navigateTo, switchCase, currentCaseId, currentUser, theme } = useInvestigation();
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState<'matrix' | 'shared_mules' | 'hardware' | 'beneficiaries'>('matrix');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Scroll Container State
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const syndicates = [
    {
      caseId: 'CASE-NX-2026-001',
      name: 'Operation Nexus: Hawala & Financial Structuring',
      jurisdiction: 'Special Task Force (STF) - Central Command',
      classification: 'RESTRICTED // LAW ENFORCEMENT SENSITIVE',
      leadOfficer: 'Insp. V. Kulkarni',
      status: 'ACTIVE',
      entitiesCount: 15,
      muleAccounts: ['A/C 482701', 'A/C 889922'],
      burnerSims: ['+91-91230-00991'],
      modus: 'Smurfing tranches < ₹50,000 via IMPS, shell corporate pools',
      tags: ['Hawala', 'IMPS Smurfing', 'Shell Accounts'],
    },
    {
      caseId: 'CASE-FL-2026-042',
      name: 'Operation Falcon: Maritime Transit & Arms Trafficking',
      jurisdiction: 'Coastal Intelligence Wing - Western Command',
      classification: 'SECRET // EYES ONLY',
      leadOfficer: 'Cmdr. R. Deshmukh',
      status: 'SURVEILLANCE',
      entitiesCount: 28,
      muleAccounts: ['A/C 991823'],
      burnerSims: ['+91-91230-00991 (Hardware Match)'],
      modus: 'Dhow transfers off Gujarat coast, container billing front entities',
      tags: ['Maritime', 'Contraband', 'Hardware IMEI'],
    },
    {
      caseId: 'CASE-PG-2026-109',
      name: 'Syndicate Pegasus: Mule Account Farming & Crypto',
      jurisdiction: 'National I4C - Cyber Crime Coordination Centre',
      classification: 'CONFIDENTIAL // LEA',
      leadOfficer: 'DySP A. Sengupta',
      status: 'UNDER INDICTMENT',
      entitiesCount: 42,
      muleAccounts: ['A/C 482701 (Direct Overlap)', 'A/C 334109'],
      burnerSims: ['+91-98777-11223'],
      modus: 'Bulk student KYC acquisition, instant crypto OTC gateway conversion',
      tags: ['Crypto OTC', 'Mule Farming', 'Shared Conduit'],
    },
    {
      caseId: 'CASE-CY-2026-312',
      name: 'Syndicate Cerberus: Ransomware & Dark Web Exfiltration',
      jurisdiction: 'Directorate of Forensic Intelligence & Cyber Forensics',
      classification: 'TOP SECRET // FORENSIC TELEMETRY',
      leadOfficer: 'DSP Ananya Deshmukh',
      status: 'ACTIVE',
      entitiesCount: 34,
      muleAccounts: ['A/C 772145 (ICICI Overlap)', 'A/C 482701 (Layer 3)'],
      burnerSims: ['+91-98221-55443'],
      modus: 'Double-extortion lockbit payloads, Monero tumbling via non-KYC decentralized bridges',
      tags: ['Ransomware', 'Darknet', 'Crypto Tumbler'],
    },
    {
      caseId: 'CASE-VD-2026-088',
      name: 'Operation Vajra: Shell Company Invoice Padding & GST Fraud',
      jurisdiction: 'Special Task Force (STF) - Central Command',
      classification: 'CONFIDENTIAL // ECONOMIC ENFORCEMENT',
      leadOfficer: 'Insp. V. Kulkarni',
      status: 'UNDER INDICTMENT',
      entitiesCount: 19,
      muleAccounts: ['A/C 889922 (Direct Match)', 'A/C 102938'],
      burnerSims: ['+91-91230-00991 (SIM Clone)'],
      modus: 'Circular billing through 12 fake SEZ entities, synthetic ITC credits routed off-shore',
      tags: ['GST Hawala', 'Invoice Padding', 'Corporate Pools'],
    },
    {
      caseId: 'CASE-OR-2026-501',
      name: 'Operation Orion: High-Frequency SIM Box & OTP Intercept Ring',
      jurisdiction: 'National Cyber Coordination Centre (I4C), New Delhi',
      classification: 'SECRET // SIGINT',
      leadOfficer: 'DSP Ananya Deshmukh',
      status: 'SURVEILLANCE',
      entitiesCount: 52,
      muleAccounts: ['A/C 334109', 'A/C 990112'],
      burnerSims: ['+91-98777-11223 (Hardware Cluster)', '+91-97766-33441'],
      modus: 'Distributed VoIP-to-GSM termination boxes routing illicit 2FA token compromises',
      tags: ['SIM Box', 'OTP Intercept', 'VoIP Gateway'],
    },
    {
      caseId: 'CASE-KR-2026-177',
      name: 'Syndicate Kronos: Cross-Border Crypto Arbitrage & Hawala Pool',
      jurisdiction: 'National I4C - Cyber Crime Coordination Centre',
      classification: 'RESTRICTED // ENFORCEMENT NOTICE',
      leadOfficer: 'DySP A. Sengupta',
      status: 'FROZEN',
      entitiesCount: 23,
      muleAccounts: ['A/C 482701 (Frozen Node)', 'A/C 661290'],
      burnerSims: ['+91-91230-00991'],
      modus: 'USDT cash-in cash-out nodes operating in tri-junction border corridors',
      tags: ['USDT Arbitrage', 'Cross-Border', 'Frozen Funds'],
    },
    {
      caseId: 'CASE-SY-2026-405',
      name: 'Project Aegis: HSM Key Integrity & Evidence Custody Audit',
      jurisdiction: 'Central Security Operations Centre (CSOC), Bengaluru',
      classification: 'ROOT CLEARANCE // SYSTEM AUDIT',
      leadOfficer: 'Admin S. K. Nambiar',
      status: 'ACTIVE',
      entitiesCount: 11,
      muleAccounts: ['A/C 482701 (Custody Flag)'],
      burnerSims: ['+91-91230-00991'],
      modus: 'Section 65B hash corroboration for cross-case tamper prevention & chain of custody',
      tags: ['System Integrity', 'Sec 65B', 'Cryptographic Audit'],
    },
    {
      caseId: 'CASE-TR-2026-224',
      name: 'Syndicate Trident: Container Smuggling & Hawala Clearing',
      jurisdiction: 'Coastal Intelligence Wing - Western Command',
      classification: 'SECRET // MARITIME INTEL',
      leadOfficer: 'Cmdr. R. Deshmukh',
      status: 'SURVEILLANCE',
      entitiesCount: 31,
      muleAccounts: ['A/C 991823 (Vessel Charter)'],
      burnerSims: ['+91-98221-55443'],
      modus: 'Under-invoiced container manifests with differential payment through Dubai hawala hubs',
      tags: ['Maritime Smuggling', 'Under-Invoicing', 'Hawala Hub'],
    },
  ];

  // Officer / User filter options
  const officers = [
    { id: 'ALL', label: 'All Officers' },
    { id: 'MY_CASES', label: `My Cases (${currentUser?.name ? currentUser.name.split(' ')[0] : 'My'})` },
    { id: 'Insp. V. Kulkarni', label: 'Insp. V. Kulkarni' },
    { id: 'DSP Ananya Deshmukh', label: 'DSP Ananya Deshmukh' },
    { id: 'DySP A. Sengupta', label: 'DySP A. Sengupta' },
    { id: 'Cmdr. R. Deshmukh', label: 'Cmdr. R. Deshmukh' },
    { id: 'Admin S. K. Nambiar', label: 'Admin S. K. Nambiar' },
  ];

  // Filtered Syndicates
  const filteredSyndicates = useMemo(() => {
    return syndicates.filter((syn) => {
      // Officer filter
      if (selectedOfficer !== 'ALL') {
        if (selectedOfficer === 'MY_CASES') {
          const userLastName = currentUser?.name?.split(' ').slice(-1)[0]?.toLowerCase() || '';
          if (!syn.leadOfficer.toLowerCase().includes(userLastName)) {
            return false;
          }
        } else if (!syn.leadOfficer.toLowerCase().includes(selectedOfficer.toLowerCase())) {
          return false;
        }
      }

      // Status filter
      if (selectedStatus !== 'ALL' && syn.status !== selectedStatus) {
        return false;
      }

      // Text query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = syn.name.toLowerCase().includes(q);
        const matchesId = syn.caseId.toLowerCase().includes(q);
        const matchesOfficer = syn.leadOfficer.toLowerCase().includes(q);
        const matchesJurisdiction = syn.jurisdiction.toLowerCase().includes(q);
        const matchesModus = syn.modus.toLowerCase().includes(q);
        const matchesClassification = syn.classification.toLowerCase().includes(q);
        const matchesMule = syn.muleAccounts.some((m) => m.toLowerCase().includes(q));
        const matchesSim = syn.burnerSims.some((s) => s.toLowerCase().includes(q));
        const matchesTags = syn.tags?.some((t) => t.toLowerCase().includes(q));

        return (
          matchesName ||
          matchesId ||
          matchesOfficer ||
          matchesJurisdiction ||
          matchesModus ||
          matchesClassification ||
          matchesMule ||
          matchesSim ||
          matchesTags
        );
      }

      return true;
    });
  }, [syndicates, selectedOfficer, selectedStatus, searchQuery, currentUser]);

  // Handle scroll detection
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    setIsScrolled(scrollTop > 40);
    setCanScrollDown(scrollHeight - scrollTop - clientHeight > 50);
  };

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        setIsScrolled(scrollTop > 40);
        setCanScrollDown(scrollHeight - scrollTop - clientHeight > 50);
      }
    };
    checkScroll();
    const timer = setTimeout(checkScroll, 120);
    return () => clearTimeout(timer);
  }, [filteredSyndicates]);

  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 380, behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedOfficer('ALL');
    setSelectedStatus('ALL');
  };

  return (
    <div id="cross-case-analytics-view" className="w-full p-6 lg:p-8 space-y-6 text-[#F8FAFC]">
      {/* Header */}
      <div className="glass-panel border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center space-x-2.5">
            <BrainCircuit className="w-5 h-5 text-[#FACC15]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#FACC15] uppercase">
              Multi-Jurisdictional Intelligence
            </span>
            <span className="text-xs font-mono bg-rose-950/50 text-rose-400 px-3 py-1 border border-rose-800/60 rounded-full font-bold">
              3 Correlated Syndicates Flagged
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#F8FAFC] mt-1.5 font-mono">
            Cross-Case Intelligence &amp; Syndicate Correlation Matrix
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1 font-sans">
            Automated entity overlap detection linking Operation Nexus, Operation Falcon, and Syndicate Pegasus via shared banking mules and recurring hardware.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 glass-card p-1.5 rounded-full border border-white/10 text-xs font-mono shadow-xs">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-[#FACC15] text-[#050507] font-bold shadow-[0_0_12px_rgba(250, 204, 21,0.4)]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
            }`}
          >
            Syndicate Matrix
          </button>
          <button
            onClick={() => setActiveTab('shared_mules')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'shared_mules'
                ? 'bg-[#FACC15] text-[#050507] font-bold shadow-[0_0_12px_rgba(250, 204, 21,0.4)]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
            }`}
          >
            Shared Mules (A/C 482701)
          </button>
          <button
            onClick={() => setActiveTab('hardware')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'hardware'
                ? 'bg-[#FACC15] text-[#050507] font-bold shadow-[0_0_12px_rgba(250, 204, 21,0.4)]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
            }`}
          >
            Hardware IMEI Overlaps
          </button>
        </div>
      </div>

      {/* Critical Cross-Case Alert Ribbon - Premium Rounded Glassmorphism */}
      <div className={`glass-panel rounded-3xl border ${isLight ? 'border-rose-400 bg-rose-50' : 'border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-[#050507]/80'} backdrop-blur-2xl p-6 sm:p-7 flex items-start space-x-4 shadow-[0_0_30px_rgba(244,63,94,0.18)] relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="p-3 bg-rose-500/20 border border-rose-500/50 rounded-2xl shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
          <ShieldAlert className="w-6 h-6 text-rose-400 animate-pulse" />
        </div>
        <div className="text-xs space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-mono font-black text-sm uppercase tracking-widest block drop-shadow-sm ${isLight ? 'text-rose-700' : 'text-rose-300'}`}>
              Critical Multi-Jurisdictional Cross-Match Detected
            </span>
            <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase animate-pulse border ${isLight ? 'bg-rose-100 text-rose-600 border-rose-400' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'}`}>
              Red Alert
            </span>
          </div>
          <p className={`leading-relaxed font-sans text-xs sm:text-sm ${isLight ? 'text-slate-800' : 'text-[#F8FAFC]'}`}>
            HDFC Mule Account <strong className={`font-mono px-2 py-0.5 rounded-lg border ${isLight ? 'text-rose-600 bg-rose-100/50 border-rose-300' : 'text-rose-400 bg-black/40 border-rose-500/30'}`}>482701</strong> (Dinesh Kumar / Rapid Layering Mule in Operation Nexus) has been positively indexed as an active conduit receiving ₹1.82 Cr from cyber ransom operations under <strong className={`font-mono px-2 py-0.5 rounded-lg border ${isLight ? 'text-amber-600 bg-amber-100/50 border-amber-300' : 'text-amber-400 bg-black/40 border-amber-500/30'}`}>Syndicate Pegasus (CASE-PG-2026-109)</strong>.
          </p>
        </div>
      </div>

      {/* Sub-View Content */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* Search and Officer Filtering Controls - Positioned above Syndicates Matrix */}
          <div className="glass-panel border border-white/10 p-5 rounded-3xl space-y-4 shadow-xl">
            {/* Search Bar Input (Full Width, No Scroll Down Button) */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`w-4 h-4 ${isLight ? 'text-[#4F46E5]' : 'text-[#FACC15]'}`} />
              </div>
              <input
                type="text"
                id="cross-case-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cases by title, CASE ID, lead officer, jurisdiction, modus, mule account..."
                className={`w-full pl-11 pr-10 py-3 rounded-2xl text-xs sm:text-sm font-mono transition-all shadow-inner focus:outline-none ${
                  isLight
                    ? 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20'
                    : 'bg-[#09090D] border border-[#FACC15]/30 focus:border-[#FACC15] text-[#F8FAFC] placeholder-[#64748B] focus:ring-2 focus:ring-[#FACC15]/20'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={`absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer ${
                    isLight ? 'text-slate-400 hover:text-slate-700' : 'text-[#94A3B8] hover:text-[#FACC15]'
                  }`}
                  title="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter by Officer / User (Dropdown) and Extended Status Bar */}
            <div className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-3 border-t ${
              isLight ? 'border-slate-200' : 'border-white/10'
            }`}>
              {/* Left: Officer/User Dropdown Menu */}
              <div className="flex items-center space-x-2 shrink-0">
                <div className="flex items-center space-x-1.5 text-xs font-mono shrink-0">
                  <UserCheck className={`w-3.5 h-3.5 ${isLight ? 'text-[#4F46E5]' : 'text-[#FACC15]'}`} />
                  <span className={`font-semibold ${isLight ? 'text-slate-700' : 'text-[#94A3B8]'}`}>Officer / User:</span>
                </div>
                <div className="relative">
                  <select
                    id="officer-select-dropdown"
                    value={selectedOfficer}
                    onChange={(e) => setSelectedOfficer(e.target.value)}
                    className={`pl-3 pr-8 py-1.5 text-xs font-mono font-medium rounded-xl border appearance-none cursor-pointer transition-all focus:outline-none shadow-xs ${
                      isLight
                        ? 'bg-white text-slate-900 border-slate-300 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/30'
                        : 'bg-[#09090D] text-[#F8FAFC] border-white/20 focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15]/30'
                    }`}
                  >
                    {officers.map((off) => (
                      <option 
                        key={off.id} 
                        value={off.id}
                        className={isLight ? 'bg-white text-slate-900 py-1' : 'bg-[#0D0D14] text-[#F8FAFC] py-1'}
                      >
                        {off.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={`w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                    isLight ? 'text-slate-500' : 'text-[#94A3B8]'
                  }`} />
                </div>
              </div>

              {/* Extended Status Filter Bar utilizing free space */}
              <div className={`flex flex-wrap items-center gap-1.5 flex-1 md:pl-4 md:border-l ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}>
                <span className={`text-[11px] font-mono font-semibold mr-1 shrink-0 ${
                  isLight ? 'text-slate-600' : 'text-[#64748B]'
                }`}>
                  Status:
                </span>
                {['ALL', 'ACTIVE', 'SURVEILLANCE', 'UNDER INDICTMENT', 'FROZEN'].map((st) => {
                  const isSelected = selectedStatus === st;
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStatus(st)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? isLight
                            ? 'bg-[#4F46E5] text-white shadow-xs font-bold'
                            : 'bg-[#FACC15] text-[#050507] shadow-xs font-bold'
                          : isLight
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200'
                          : 'bg-white/5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>

              {/* Count & Reset Controls */}
              <div className={`flex items-center space-x-2 shrink-0 md:pl-3 md:border-l ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}>
                <span className={`text-xs font-mono ${isLight ? 'text-slate-600' : 'text-[#94A3B8]'}`}>
                  <strong className={isLight ? 'text-[#4F46E5]' : 'text-[#FACC15]'}>{filteredSyndicates.length}</strong> / {syndicates.length}
                </span>
                {(searchQuery || selectedOfficer !== 'ALL' || selectedStatus !== 'ALL') && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs text-rose-500 hover:text-rose-600 flex items-center space-x-1 cursor-pointer font-bold ml-1 transition-colors"
                    title="Reset filters"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Header row with active count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] ${
                isLight ? 'text-[#4F46E5]' : 'text-[#FACC15]'
              }`}>
                Active Investigation Syndicates Matrix
              </div>
              <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                isLight ? 'bg-indigo-50 text-[#4F46E5] border-indigo-200' : 'bg-[#0D0D11] text-[#94A3B8] border-white/10'
              }`}>
                {filteredSyndicates.length} Cases Indexed
              </span>
            </div>
            {isScrolled && (
              <button
                onClick={handleScrollToTop}
                className="text-[#94A3B8] hover:text-[#F8FAFC] flex items-center space-x-1 bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-white/10 transition-all cursor-pointer"
                title="Scroll to top"
              >
                <span>Top</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Scrollable Container for Cases */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="max-h-[640px] overflow-y-auto pr-2 pb-6 space-y-4 custom-scrollbar scroll-smooth"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: isLight ? '#4F46E5 transparent' : '#EAB308 rgba(14, 14, 18, 0.8)',
              }}
            >
              {filteredSyndicates.length === 0 ? (
                <div className="glass-panel border border-white/10 p-12 rounded-3xl text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-[#FACC15]">
                    <Search className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold font-mono text-[#F8FAFC]">No Matching Syndicates Found</h3>
                    <p className="text-xs text-[#94A3B8] max-w-md mx-auto font-sans">
                      No active cross-case intelligence matches query{' '}
                      <span className="text-[#FACC15] font-mono">"{searchQuery}"</span> or selected officer filter.
                    </p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-[#FACC15] text-[#050507] hover:bg-[#EAB308] font-mono text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer"
                  >
                    Clear Search &amp; Show All Cases
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSyndicates.map((syn) => {
                    const isCurrent = syn.caseId === currentCaseId;
                    const isUserAssigned =
                      currentUser?.name &&
                      (syn.leadOfficer.toLowerCase().includes(currentUser.name.split(' ').slice(-1)[0].toLowerCase()) ||
                        currentUser.name.toLowerCase().includes(syn.leadOfficer.split(' ').slice(-1)[0].toLowerCase()));

                    return (
                      <div
                        key={syn.caseId}
                        className={`glass-panel border p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between transition-all ${
                          isCurrent
                            ? 'border-[#FACC15] ring-1 ring-[#FACC15]/40 shadow-[0_0_25px_rgba(250,204,21,0.2)]'
                            : 'border-white/10 hover:border-[#FACC15]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center space-x-1.5">
                              <span className="text-[10px] font-mono font-bold text-[#FACC15] bg-[#050507] px-2.5 py-0.5 border border-[#FACC15]/40 rounded-full">
                                {syn.caseId}
                              </span>
                              {isUserAssigned && (
                                <span className="text-[10px] font-mono bg-[#FACC15]/10 text-[#FACC15] px-2 py-0.5 rounded-full border border-[#FACC15]/30 flex items-center space-x-1 font-semibold">
                                  <UserCheck className="w-2.5 h-2.5" />
                                  <span>My Case</span>
                                </span>
                              )}
                            </div>
                            <span
                              className={`text-[10px] font-mono font-bold px-3 py-0.5 rounded-full border ${
                                syn.status === 'ACTIVE'
                                  ? 'bg-rose-950/50 text-rose-400 border-rose-800/60'
                                  : syn.status === 'SURVEILLANCE'
                                  ? 'bg-amber-950/50 text-amber-400 border-amber-800/60'
                                  : syn.status === 'FROZEN'
                                  ? 'bg-cyan-950/50 text-cyan-400 border-cyan-800/60'
                                  : 'bg-indigo-950/50 text-indigo-400 border-indigo-800/60'
                              }`}
                            >
                              {syn.status}
                            </span>
                          </div>

                          <h2 className="text-base font-bold text-[#F8FAFC] font-mono leading-tight">
                            {syn.name}
                          </h2>

                          <div className="text-xs text-[#94A3B8] font-sans space-y-1">
                            <div>
                              <strong className="text-[#64748B] font-mono text-[11px]">Command:</strong>{' '}
                              {syn.jurisdiction}
                            </div>
                            <div className="flex items-center space-x-1">
                              <strong className="text-[#64748B] font-mono text-[11px]">Lead:</strong>{' '}
                              <span className={isUserAssigned ? 'text-[#FACC15] font-semibold font-mono' : ''}>
                                {syn.leadOfficer}
                              </span>
                            </div>
                            <div>
                              <strong className="text-[#64748B] font-mono text-[11px]">Modus:</strong> {syn.modus}
                            </div>
                          </div>

                          {/* Tags */}
                          {syn.tags && syn.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {syn.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#94A3B8] border border-white/5 flex items-center space-x-1"
                                >
                                  <span className="text-[#FACC15]/70">#</span>
                                  <span>{tag}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-[#94A3B8] font-mono">
                            <span>Indexed Entities:</span>
                            <strong className="text-[#F8FAFC]">{syn.entitiesCount}</strong>
                          </div>
                          {isCurrent ? (
                            <div className="w-full py-2 bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 text-center font-mono font-bold text-xs uppercase rounded-full">
                              Current Active Case
                            </div>
                          ) : (
                            <button
                              onClick={() => switchCase(syn.caseId)}
                              className="w-full py-2.5 glass-card hover:bg-white/10 text-[#FACC15] hover:text-white border border-white/10 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 rounded-full transition-all cursor-pointer"
                            >
                              <FolderGit2 className="w-3.5 h-3.5" />
                              <span>Switch Investigation Context</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bottom indicator with scroll to top button */}
              {filteredSyndicates.length > 0 && (
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#64748B]">
                  <span>All {filteredSyndicates.length} multi-jurisdictional syndicate records loaded</span>
                  <button
                    onClick={handleScrollToTop}
                    className="text-[#94A3B8] hover:text-[#FACC15] flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Scroll to Top</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Floating Scroll Down helper button when more cases exist below */}
            {canScrollDown && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-auto z-20">
                <button
                  onClick={handleScrollDown}
                  className="px-4 py-2 bg-[#09090D]/90 hover:bg-[#121218] border border-[#FACC15]/60 text-[#FACC15] hover:text-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.85)] backdrop-blur-md text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer hover:scale-105 active:scale-95 group"
                >
                  <span>Scroll Down For More Cases</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-[#FACC15]" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'shared_mules' && (
        <div className="glass-panel border border-white/10 p-6 rounded-3xl space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2.5">
              <CreditCard className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-[#F8FAFC] font-mono">Shared Mule Account Analysis: HDFC A/C 482701</h2>
            </div>
            <span className="text-xs font-mono text-rose-400 bg-rose-950/50 px-3 py-1 border border-rose-800/60 rounded-full font-bold">
              Multi-Case Interlock
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
              <span className="text-[#FACC15] font-bold text-sm block">1. Operation Nexus Trail (CASE-NX-2026-001)</span>
              <p className="text-[#94A3B8] font-sans leading-relaxed">
                Debited ₹50,000 from SBI A/C 889922 (Ajay Patil) at 11:48 AM IST. Inflow routed into HDFC A/C 482701. In 22 minutes, ₹48,200 pushed into XYZ Traders corporate account.
              </p>
              <div className="text-[#64748B]">Mule Cut Retained: ₹1,800.00</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
              <span className="text-amber-400 font-bold text-sm block">2. Syndicate Pegasus Trail (CASE-PG-2026-109)</span>
              <p className="text-[#94A3B8] font-sans leading-relaxed">
                Same HDFC account received ₹1,82,40,000 in 34 structured tranches over 14 days originating from an unauthorized cryptocurrency bridge in Bangalore.
              </p>
              <div className="text-[#64748B]">Action: Joint Asset Freezing Order Dispatched</div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-[#94A3B8] font-mono">Cross-Jurisdiction Mutual Legal Assistance Request: MLA-2026-STF-09</span>
            <button
              onClick={() => navigateTo('evidence', { evidenceId: 'EV-004' })}
              className="px-4 py-2.5 bg-[#FACC15] text-[#050507] hover:bg-[#EAB308] font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 rounded-full shadow-lg transition-all cursor-pointer"
            >
              <span>Inspect Wire Record EV-004</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'hardware' && (
        <div className="glass-panel border border-white/10 p-6 rounded-3xl space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2.5">
              <Phone className="w-5 h-5 text-[#FACC15]" />
              <h2 className="text-lg font-bold text-[#F8FAFC] font-mono">Hardware IMEI Interlock: Burner SIM +91-91230-00991</h2>
            </div>
            <span className="text-xs font-mono text-rose-400 bg-rose-950/50 px-3 py-1 border border-rose-800/60 rounded-full font-bold">
              Physical Handset Reuse
            </span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 text-xs space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[#FACC15] font-bold">Handset Hardware Signature (IMEI):</span>
              <span className="text-[#F8FAFC] bg-[#0D0D11] px-2.5 py-0.5 rounded-full border border-white/10">358921094819201</span>
            </div>
            <p className="text-[#94A3B8] font-sans leading-relaxed">
              While burner SIM +91-91230-00991 was activated on 11 May 2026 for Operation Nexus, the physical IMEI handset was logged transmitting coordinates for a clandestine dhow landing off the Porbandar coast on 18 March 2026 under Operation Falcon.
            </p>
            <div className="text-emerald-400 pt-2 border-t border-white/10">
              Corroboration: Proves single shared tactical communications supply chain across both syndicates.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
