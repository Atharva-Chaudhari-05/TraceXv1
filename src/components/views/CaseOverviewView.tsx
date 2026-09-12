import React, { useState } from 'react';
import {
  Users,
  CreditCard,
  MapPin,
  FileSpreadsheet,
  BrainCircuit,
  AlertTriangle,
  GitMerge,
  ArrowRight,
  Clock,
  Shield,
  Activity,
  CheckCircle2,
  Sparkles,
  Network,
  ChevronRight,
  Building,
  Car,
  Phone,
  Server,
  Database,
  Cpu,
  Search,
  ExternalLink,
  Lock,
  Layers,
  FileText,
  UserCheck,
  Zap,
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

// ==========================================
// 1. INVESTIGATOR DASHBOARD ("What needs my attention?")
// ==========================================
const InvestigatorDashboard: React.FC = () => {
  const { caseData, navigateTo, setSelectedEntityId, theme } = useInvestigation();
  const isLight = theme === 'light';

  const activeCasesList = [
    {
      id: 'CASE-NX-2026-001',
      title: 'Operation Nexus: Hawala & Organized Extortion',
      priority: 'HIGH',
      status: 'Active',
      lastActivity: '4 min ago',
      entitiesSummary: '15 Entities | 9 Records | ₹50L Dispersal',
      assignedTeam: 'Special Task Force (Central Command)',
      lastUpdated: '12 May 2026, 14:32 IST',
      isCurrent: true,
    },
    {
      id: 'CASE-01591',
      title: 'Organized Coastal Smuggling & Cargo Transit',
      priority: 'HIGH',
      status: 'Active',
      lastActivity: '12 min ago',
      entitiesSummary: '174 Persons | 240 Transactions',
      assignedTeam: 'Maritime Narcotics & Cyber Bureau',
      lastUpdated: '12 May 2026, 14:20 IST',
      isCurrent: false,
    },
    {
      id: 'CASE-01482',
      title: 'Interstate Cyber Financial Phishing Ring',
      priority: 'MEDIUM',
      status: 'In Review',
      lastActivity: '1 hr ago',
      entitiesSummary: '48 Entities | 110 CDR Intercepts',
      assignedTeam: 'Cyber Cell Mumbai Sub-Division',
      lastUpdated: '12 May 2026, 13:15 IST',
      isCurrent: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Role Banner / Context */}
      <div className="glass-panel border border-white/10 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.25em] text-[#FACC15] font-semibold">
            <span>Investigative Command Console</span>
            <span>•</span>
            <span className="text-[#10B981]">Case-Centric Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight mt-1">
            Investigator Workspace
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl">
            Focus on what needs your operational decision: prioritize high-confidence entity matches, review urgent intelligence alerts, and coordinate case evidence.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('resolution')}
          className="px-5 py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] font-mono font-bold text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center space-x-2 transition-all shrink-0 cursor-pointer"
        >
          <GitMerge className="w-4 h-4" />
          <span>Review Resolution Queue (18)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card border border-white/10 p-5 rounded-2xl shadow-lg">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Active Cases</div>
          <div className="text-3xl font-bold font-mono text-[#F8FAFC] mt-2">12</div>
          <div className="text-[10px] font-mono text-[#FACC15] mt-1 flex items-center space-x-1">
            <span>3 pending priority actions</span>
          </div>
        </div>

        <div className="glass-card border border-white/10 p-5 rounded-2xl shadow-lg">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">High Priority</div>
          <div className="text-3xl font-bold font-mono text-[#EF4444] mt-2">4</div>
          <div className="text-[10px] font-mono text-[#EF4444] mt-1">Direct supervisor assignment</div>
        </div>

        <div
          onClick={() => navigateTo('resolution')}
          className="glass-card border border-white/10 hover:border-[#FACC15]/50 p-5 rounded-2xl shadow-lg cursor-pointer transition-all group"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] flex items-center justify-between">
            <span>Pending Resolutions</span>
            <GitMerge className="w-3.5 h-3.5 text-[#FACC15] group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-3xl font-bold font-mono text-[#FACC15] mt-2">18</div>
          <div className="text-[10px] font-mono text-[#94A3B8] mt-1">7 High • 11 Medium confidence</div>
        </div>

        <div
          onClick={() => navigateTo('insights')}
          className="glass-card border border-white/10 hover:border-[#FACC15]/50 p-5 rounded-2xl shadow-lg cursor-pointer transition-all group"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] flex items-center justify-between">
            <span>New Intelligence</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FACC15] animate-pulse" />
          </div>
          <div className="text-3xl font-bold font-mono text-emerald-400 mt-2">7</div>
          <div className="text-[10px] font-mono text-emerald-400/80 mt-1">Incoming AI cross-case alerts</div>
        </div>
      </div>

      {/* Main Grid: Left (Active Cases + Alerts) & Right (AI Highlights, ER Queue, Network Snapshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. My Active Cases */}
          <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-[#FACC15]" />
                <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                  My Active Cases
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#64748B]">Showing 3 Assigned</span>
            </div>

            <div className="space-y-3">
              {activeCasesList.map((c) => (
                <div
                  key={c.id}
                  className={`p-4 glass-card border rounded-2xl transition-all ${
                    c.isCurrent
                      ? 'border-[#FACC15]/50 bg-[#FACC15]/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono font-bold text-xs text-[#FACC15] bg-[#050507] px-2.5 py-1 border border-white/10 rounded-lg">
                        {c.id}
                      </span>
                      <span className="text-xs font-bold text-[#F8FAFC]">{c.title}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          c.priority === 'HIGH'
                            ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                            : 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                        }`}
                      >
                        {c.priority}
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                        {c.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-[#94A3B8] mt-2 font-mono flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>{c.entitiesSummary}</span>
                    <span>•</span>
                    <span className="text-[#64748B]">Last updated: {c.lastActivity}</span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-[#64748B] font-mono">{c.assignedTeam}</span>
                    <button
                      type="button"
                      onClick={() => navigateTo('graph')}
                      className="px-3.5 py-1.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] font-mono font-bold text-[11px] uppercase rounded-full shadow-xs flex items-center space-x-1.5 cursor-pointer transition-all"
                    >
                      <span>Open Investigation</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Investigation Alerts / Items Requiring Attention */}
          <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                  Investigation Alerts / Items Requiring Attention
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#F59E0B] animate-pulse">4 Immediate Items</span>
            </div>

            <div className="space-y-2.5">
              <div
                onClick={() => navigateTo('resolution')}
                className="p-3.5 glass-card hover:bg-white/10 border border-[#F59E0B]/30 rounded-2xl flex items-center justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">⚠</span>
                  <div>
                    <div className="text-xs font-bold text-[#F8FAFC] group-hover:text-[#FACC15] transition-colors">
                      5 high-confidence entity matches awaiting review
                    </div>
                    <div className="text-[10px] text-[#94A3B8] font-mono">
                      Probabilistic score &gt; 92% • Ajay Patil alias candidate match ready for legal merge
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#FACC15] transition-colors" />
              </div>

              <div
                onClick={() => navigateTo('graph', { highlightPath: true })}
                className="p-3.5 glass-card hover:bg-white/10 border border-[#FACC15]/30 rounded-2xl flex items-center justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">⚠</span>
                  <div>
                    <div className="text-xs font-bold text-[#F8FAFC] group-hover:text-[#FACC15] transition-colors">
                      New connection detected in CASE-01591
                    </div>
                    <div className="text-[10px] text-[#94A3B8] font-mono">
                      Indirect 2-hop transaction link established between Person-1842 and Account-8291
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#FACC15] transition-colors" />
              </div>

              <div
                onClick={() => navigateTo('patterns')}
                className="p-3.5 glass-card hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl flex items-center justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">⚠</span>
                  <div>
                    <div className="text-xs font-bold text-[#F8FAFC] group-hover:text-[#FACC15] transition-colors">
                      3 anomalous transaction patterns detected
                    </div>
                    <div className="text-[10px] text-[#94A3B8] font-mono">
                      High velocity layering: ₹48,200 routed to A/C 772145 in under 22 minutes
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#FACC15] transition-colors" />
              </div>

              <div
                onClick={() => navigateTo('records')}
                className="p-3.5 glass-card hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl flex items-center justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">⚠</span>
                  <div>
                    <div className="text-xs font-bold text-[#F8FAFC] group-hover:text-[#FACC15] transition-colors">
                      New document processed for CASE-01482
                    </div>
                    <div className="text-[10px] text-[#94A3B8] font-mono">
                      CCTNS FIR diary received from Bandra PS • 8 NLP entities extracted
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#FACC15] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 3. AI / Intelligence Highlights */}
          <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#FACC15]" />
                <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                  AI / Intelligence Highlights
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#FACC15]">Curated Digest</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-[#050507]/80 border border-white/10 rounded-2xl space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Key Individual</div>
                <div className="text-xs font-bold text-[#F8FAFC]">Person-1842 (Vikram Singhania)</div>
                <div className="text-[10px] font-mono text-emerald-400">Network centrality: High (0.94)</div>
              </div>

              <div className="p-3.5 bg-[#050507]/80 border border-white/10 rounded-2xl space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">New Connection</div>
                <div className="text-xs font-bold text-[#F8FAFC]">Person-1842 ↔ Account-8291</div>
                <div className="text-[10px] font-mono text-[#FACC15]">Offshore Hawala Flow (Hawala Layering)</div>
              </div>

              <div className="p-3.5 bg-[#050507]/80 border border-white/10 rounded-2xl space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Anomaly</div>
                <div className="text-xs font-bold text-[#EF4444]">Unusual transaction cluster detected</div>
                <div className="text-[10px] font-mono text-[#94A3B8]">Rapid cash-in followed by ₹48.2k dispersal within 22m</div>
              </div>
            </div>
          </div>

          {/* 4. Resolution Queue */}
          <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <GitMerge className="w-4 h-4 text-[#FACC15]" />
                <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                  Resolution Queue
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#FACC15]">18 Awaiting</span>
            </div>

            <div className="p-4 bg-[#050507]/80 border border-white/10 rounded-2xl space-y-3">
              <div className="text-xs font-bold text-[#F8FAFC]">
                Pending Entity Resolution
              </div>
              <p className="text-[11px] text-[#94A3B8]">
                18 matches awaiting investigator review based on probabilistic phonetic matching.
              </p>

              <div className="space-y-1.5 font-mono text-xs pt-1">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-xl">
                  <span className="text-[#FACC15]">High confidence</span>
                  <span className="font-bold text-[#F8FAFC]">7</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-xl">
                  <span className="text-[#F59E0B]">Medium confidence</span>
                  <span className="font-bold text-[#F8FAFC]">11</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('resolution')}
                className="w-full py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] font-mono font-bold text-xs uppercase rounded-full shadow-md transition-all cursor-pointer"
              >
                Review Queue
              </button>
            </div>
          </div>

          {/* 5. Case Network Snapshot */}
          <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Network className="w-4 h-4 text-[#FACC15]" />
                <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                  Case Network Snapshot
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#64748B]">15 Nodes</span>
            </div>

            <div className="p-4 bg-[#050507]/80 border border-white/10 rounded-2xl space-y-3">
              <div className="p-3 font-mono text-[11px] text-[#FACC15] bg-black/40 rounded-xl border border-white/5 text-center leading-relaxed">
                <div className="text-[#F8FAFC] font-bold">Person A (Rahul Sharma)</div>
                <div className="text-[#64748B]">/   |    \</div>
                <div className="text-[#94A3B8]">Phone  Account  Vehicle</div>
                <div className="text-[#64748B]">|       |       |</div>
                <div className="text-[#F8FAFC] font-bold">Person B  Person C  Location</div>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('graph')}
                className={`w-full py-2.5 font-mono font-bold text-xs uppercase rounded-full shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer ${isLight ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-[0_4px_14px_rgba(79,70,229,0.3)] border border-[#4F46E5]' : 'bg-transparent border border-white/20 text-[#F8FAFC] hover:bg-[#FACC15] hover:text-[#050507] hover:border-[#FACC15]'}`}
              >
                <span>Open Full Network</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. ANALYST DASHBOARD ("What does the data tell me?")
// ==========================================
const AnalystDashboard: React.FC = () => {
  const { navigateTo, theme } = useInvestigation();
  const isLight = theme === 'light';
  const [analystSearch, setAnalystSearch] = useState('');

  return (
    <div className="space-y-6">
      {/* Role Banner / Context */}
      <div className="glass-panel border border-white/10 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.25em] text-[#FACC15] font-semibold">
            <span>Intelligence Analytics Console</span>
            <span>•</span>
            <span className="text-[#A855F7]">Pattern Discovery &amp; Graph Mining</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight mt-1">
            Analyst Intelligence Hub
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl">
            Uncover hidden patterns, multi-hop syndicates, behavioral anomalies, and cross-source intelligence across the master dataset.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => navigateTo('graph')}
            className="px-4 py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] font-mono font-bold text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Network className="w-4 h-4" />
            <span>Interactive Graph</span>
          </button>
          <button
            type="button"
            onClick={() => navigateTo('patterns')}
            className="px-4 py-2.5 glass-card hover:bg-white/10 border border-white/10 text-[#F8FAFC] font-mono font-bold text-xs uppercase tracking-wider rounded-full shadow-sm flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <BrainCircuit className="w-4 h-4 text-[#A855F7]" />
            <span>Patterns</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card border border-white/10 p-5 rounded-2xl shadow-lg">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Cases Analyzed</div>
          <div className="text-3xl font-bold font-mono text-[#F8FAFC] mt-2">24</div>
          <div className="text-[10px] font-mono text-[#FACC15] mt-1">Cross-jurisdictional scope</div>
        </div>

        <div className="glass-card border border-white/10 p-5 rounded-2xl shadow-lg">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Key Individuals</div>
          <div className="text-3xl font-bold font-mono text-[#FACC15] mt-2">86</div>
          <div className="text-[10px] font-mono text-[#FACC15] mt-1">High eigenvector centrality</div>
        </div>

        <div
          onClick={() => navigateTo('patterns')}
          className="glass-card border border-white/10 hover:border-[#FACC15]/50 p-5 rounded-2xl shadow-lg cursor-pointer transition-all"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Clusters</div>
          <div className="text-3xl font-bold font-mono text-[#A855F7] mt-2">31</div>
          <div className="text-[10px] font-mono text-[#A855F7] mt-1">Louvain community partitions</div>
        </div>

        <div
          onClick={() => navigateTo('patterns')}
          className="glass-card border border-white/10 hover:border-[#FACC15]/50 p-5 rounded-2xl shadow-lg cursor-pointer transition-all"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Anomalies</div>
          <div className="text-3xl font-bold font-mono text-[#EF4444] mt-2">14</div>
          <div className="text-[10px] font-mono text-[#EF4444] mt-1">Isolation Forest triggers</div>
        </div>
      </div>

      {/* 5. Prominent Analytical Search & Exploration Area */}
      <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-[#FACC15]" />
          <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
            Analytical Search &amp; Exploratory Intelligence
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#FACC15] absolute left-4 top-3.5" />
            <input
              type="text"
              value={analystSearch}
              onChange={(e) => setAnalystSearch(e.target.value)}
              placeholder="Search / Explore [ Person, Phone, Account, Location, Syndicate Hash... ]"
              className="w-full pl-11 pr-4 py-3 glass-search-bar rounded-full text-xs font-mono text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => navigateTo('entities')}
              className="px-4 py-2.5 glass-card hover:bg-white/10 border border-white/20 text-xs font-mono font-bold text-[#F8FAFC] rounded-full transition-all cursor-pointer"
            >
              Compare Entities
            </button>
            <button
              type="button"
              onClick={() => navigateTo('path')}
              className="px-4 py-2.5 glass-card hover:bg-white/10 border border-white/20 text-xs font-mono font-bold text-[#F8FAFC] rounded-full transition-all cursor-pointer"
            >
              Find Path
            </button>
            <button
              type="button"
              onClick={() => navigateTo('graph')}
              className="px-4 py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] text-xs font-mono font-bold rounded-full transition-all shadow-md cursor-pointer"
            >
              Explore Network
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Network Intelligence */}
        <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <Network className="w-4 h-4 text-[#FACC15]" />
              <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                Network Intelligence
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#64748B]">Top Degree Centrality</span>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-[#94A3B8] uppercase font-mono">Most Connected Entities</div>

            <div className="space-y-2">
              <div className="p-3 bg-[#050507]/80 border border-white/10 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#F8FAFC]">1. Person-1842 (Vikram "Bhai" Singhania)</div>
                  <div className="text-[10px] font-mono text-[#FACC15]">Cartel Kingpin &amp; Shadow Beneficiary</div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">126 connections</span>
              </div>

              <div className="p-3 bg-[#050507]/80 border border-white/10 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#F8FAFC]">2. Person-9281 (Rahul Sharma)</div>
                  <div className="text-[10px] font-mono text-[#FACC15]">Field Target &amp; Cash Courier</div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">98 connections</span>
              </div>

              <div className="p-3 bg-[#050507]/80 border border-white/10 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#F8FAFC]">3. Account-2918 (XYZ Traders Pvt Ltd)</div>
                  <div className="text-[10px] font-mono text-[#FACC15]">Commercial Shell Conduit</div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">91 connections</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('graph')}
              className="w-full py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] font-mono font-bold text-xs uppercase rounded-full shadow-md transition-all cursor-pointer"
            >
              Explore Network
            </button>
          </div>
        </div>

        {/* 2. Detected Clusters */}
        <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#A855F7]" />
              <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                Detected Clusters
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#A855F7]">Community Detection</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-[#050507]/80 border border-white/10 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#F8FAFC]">Cluster A (Hawala Smurfing Ring)</div>
                <div className="text-[10px] text-[#64748B] font-mono">Layered IMPS/SFMS transfers &lt; ₹50,000</div>
              </div>
              <span className="text-xs font-mono font-bold text-[#FACC15]">42 entities</span>
            </div>

            <div className="p-3 bg-[#050507]/80 border border-white/10 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#F8FAFC]">Cluster B (Burner Telephony Fleet)</div>
                <div className="text-[10px] text-[#64748B] font-mono">Cell tower hop correlation across Dadar hub</div>
              </div>
              <span className="text-xs font-mono font-bold text-[#FACC15]">27 entities</span>
            </div>

            <div className="p-3 bg-[#050507]/80 border border-white/10 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#F8FAFC]">Cluster C (Corporate Shell Entities)</div>
                <div className="text-[10px] text-[#64748B] font-mono">Shared dummy directors registered under MCA21</div>
              </div>
              <span className="text-xs font-mono font-bold text-[#FACC15]">19 entities</span>
            </div>

            <button
              onClick={() => navigateTo('patterns')}
              className={`w-full py-3 font-mono font-bold text-xs uppercase rounded-full shadow-lg transition-all cursor-pointer ${isLight ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-[0_4px_14px_rgba(79,70,229,0.3)] border border-[#4F46E5]' : 'bg-transparent border border-white/20 text-[#F8FAFC] hover:bg-[#FACC15] hover:text-[#050507] hover:border-[#FACC15]'}`}
            >
              Explore Clusters
            </button>
          </div>
        </div>

        {/* 3. Anomaly Detection (Isolation Forest) */}
        <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
              <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                Anomaly Detection (M8 Isolation Forest)
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#EF4444]">14 Anomalies</span>
          </div>

          <div className="p-4 bg-[#050507]/80 border border-white/10 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-xs font-bold text-[#F8FAFC]">Behavioral Anomalies</span>
              <span className="text-xs font-mono font-bold text-[#EF4444]">14 detected</span>
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono text-center">
              <div className="p-2.5 bg-white/5 rounded-xl">
                <div className="text-[10px] text-[#64748B] uppercase">Transactions</div>
                <div className="text-lg font-bold text-[#F8FAFC] mt-0.5">8</div>
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl">
                <div className="text-[10px] text-[#64748B] uppercase">Communications</div>
                <div className="text-lg font-bold text-[#F8FAFC] mt-0.5">4</div>
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl">
                <div className="text-[10px] text-[#64748B] uppercase">Network Activity</div>
                <div className="text-lg font-bold text-[#F8FAFC] mt-0.5">2</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('patterns')}
              className="w-full py-2.5 bg-[#EF4444]/15 hover:bg-[#EF4444]/25 text-[#EF4444] border border-[#EF4444]/40 font-mono font-bold text-xs uppercase rounded-full transition-all cursor-pointer"
            >
              Investigate Anomalies
            </button>
          </div>
        </div>

        {/* 4. AI Intelligence */}
        <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-4 h-4 text-[#FACC15]" />
              <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                AI Intelligence &amp; Findings
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#FACC15]">Automated Synthesis</span>
          </div>

          <div className="p-4 bg-[#050507]/80 border border-white/10 rounded-2xl space-y-3 font-mono text-xs">
            <div className="text-xs font-bold text-[#F8FAFC] font-sans">
              AI-generated findings:
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-xl">
                <span className="text-[#94A3B8]">High network centrality</span>
                <span className="font-bold text-[#FACC15]">12</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-xl">
                <span className="text-[#94A3B8]">Unusual behavior</span>
                <span className="font-bold text-[#EF4444]">8</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-xl">
                <span className="text-[#94A3B8]">Potential relationships</span>
                <span className="font-bold text-emerald-400">23</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-xl">
                <span className="text-[#94A3B8]">Potential entity matches</span>
                <span className="font-bold text-[#F59E0B]">18</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('insights')}
              className="w-full py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] font-mono font-bold text-xs uppercase rounded-full shadow-md transition-all cursor-pointer"
            >
              Explore Findings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. ADMIN DASHBOARD ("Is the system working?")
// ==========================================
const AdminDashboard: React.FC = () => {
  const { caseData, theme, navigateTo } = useInvestigation();
  const isLight = theme === 'light';

  return (
    <div className="space-y-6">
      {/* Role Banner / Context */}
      <div className="glass-panel border border-white/10 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.25em] text-[#FACC15] font-semibold">
            <span>Infrastructure &amp; Governance Console</span>
            <span>•</span>
            <span className="text-[#FACC15]">Platform Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight mt-1">
            System Administration
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl">
            Monitor infrastructure health, ETL data ingestion pipelines, ISO/IEC 27037 compliance audit seals, and law enforcement user role allocations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('audit')}
          className="px-5 py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] font-mono font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] flex items-center space-x-2 transition-all shrink-0 cursor-pointer"
        >
          <Shield className="w-4 h-4 text-[#050507]" />
          <span>Audit Logs &amp; Integrity</span>
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card border border-white/10 p-5 rounded-2xl shadow-lg">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Users</div>
          <div className="text-3xl font-bold font-mono text-[#F8FAFC] mt-2">42</div>
          <div className="text-[10px] font-mono text-[#FACC15] mt-1">18 Inv • 22 Ana • 2 Adm</div>
        </div>

        <div className="glass-card border border-white/10 p-5 rounded-2xl shadow-lg">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Active Cases</div>
          <div className="text-3xl font-bold font-mono text-[#F8FAFC] mt-2">1,842</div>
          <div className="text-[10px] font-mono text-[#FACC15] mt-1">Across 14 state police wings</div>
        </div>

        <div
          onClick={() => navigateTo('datasources')}
          className="glass-card border border-white/10 hover:border-[#FACC15]/50 p-5 rounded-2xl shadow-lg cursor-pointer transition-all"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Data Jobs</div>
          <div className="text-3xl font-bold font-mono text-[#FACC15] mt-2">6</div>
          <div className="text-[10px] font-mono text-[#FACC15] mt-1">Active batch extractions</div>
        </div>

        <div className="glass-card border border-emerald-500/30 bg-emerald-950/10 p-5 rounded-2xl shadow-lg">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">System Status</div>
          <div className="text-2xl font-bold font-mono text-[#10B981] mt-2 flex items-center space-x-1.5">
            <span>HEALTHY</span>
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          </div>
          <div className="text-[10px] font-mono text-[#10B981]/80 mt-1">All 4 core clusters operational</div>
        </div>
      </div>

      {/* Main Grid: Left (System Health + Data Processing) & Right (User Access, System Alerts, Audit) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. System Health */}
          <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4 text-[#FACC15]" />
                <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                  System Health &amp; Microservices
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2.5 py-0.5 rounded-full font-bold">
                100% Uptime
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 bg-[#050507]/80 border border-white/10 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="w-4 h-4 text-[#FACC15]" />
                  <div>
                    <div className="font-bold text-[#F8FAFC]">PostgreSQL Database</div>
                    <div className="text-[10px] text-[#64748B]">Port 5432 • Latency: 2ms • Connections: 18/100</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 text-[#10B981] font-bold bg-[#10B981]/10 border border-[#10B981]/30 px-2.5 py-1 rounded-full text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Healthy</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#050507]/80 border border-white/10 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Network className="w-4 h-4 text-[#FACC15]" />
                  <div>
                    <div className="font-bold text-[#F8FAFC]">Neo4j Knowledge Graph</div>
                    <div className="text-[10px] text-[#64748B]">Bolt 7687 • 1.42M Nodes • Latency: 4ms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 text-[#10B981] font-bold bg-[#10B981]/10 border border-[#10B981]/30 px-2.5 py-1 rounded-full text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Healthy</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#050507]/80 border border-white/10 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Cpu className="w-4 h-4 text-[#FACC15]" />
                  <div>
                    <div className="font-bold text-[#F8FAFC]">Backend API (FastAPI)</div>
                    <div className="text-[10px] text-[#64748B]">Port 8000 • 8 Workers • P99: 18ms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 text-[#10B981] font-bold bg-[#10B981]/10 border border-[#10B981]/30 px-2.5 py-1 rounded-full text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Healthy</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#050507]/80 border border-white/10 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Activity className="w-4 h-4 text-[#FACC15]" />
                  <div>
                    <div className="font-bold text-[#F8FAFC]">Frontend SPA (Vite/React)</div>
                    <div className="text-[10px] text-[#64748B]">Glassmorphism Engine • Memory: 18MB</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 text-[#10B981] font-bold bg-[#10B981]/10 border border-[#10B981]/30 px-2.5 py-1 rounded-full text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Healthy</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Data Processing */}
          <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#FACC15]" />
                <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                  Data Processing Pipelines
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#FACC15]">7 Input Factors</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 bg-[#050507]/80 border border-white/10 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#F8FAFC]">Stream Ingestion Pipeline</span>
                  <span className="text-[#FACC15] text-[10px] bg-[#FACC15]/10 border border-[#FACC15]/30 px-2 py-0.5 rounded-full font-bold">Last run: Completed</span>
                </div>
                <div className="text-[11px] text-[#94A3B8] space-y-0.5">
                  <div>Records processed: <strong className="text-[#F8FAFC]">4,750,500</strong></div>
                  <div>Errors: <strong className="text-[#FACC15]">0</strong></div>
                </div>
              </div>

              <div className="p-3.5 bg-[#050507]/80 border border-white/10 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#F8FAFC]">NLP &amp; Entity Extraction</span>
                  <span className="text-[#FACC15] text-[10px] bg-[#FACC15]/10 border border-[#FACC15]/30 px-2 py-0.5 rounded-full font-bold">Last run: Completed</span>
                </div>
                <div className="text-[11px] text-[#94A3B8] space-y-0.5">
                  <div>Documents processed: <strong className="text-[#F8FAFC]">8,000</strong></div>
                  <div>Candidates generated: <strong className="text-[#FACC15]">34,120</strong></div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('datasources')}
                className="w-full py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] font-mono font-bold text-xs uppercase rounded-full shadow-md transition-all cursor-pointer"
              >
                Manage Processing
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 3. User & Access Overview */}
          <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#FACC15]" />
                <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                  User &amp; Access Overview
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#FACC15]">3 RBAC Tiers</span>
            </div>

            <div className="p-4 bg-[#050507]/80 border border-white/10 rounded-2xl space-y-3 font-mono text-xs">
              <div className="text-xs font-bold text-[#F8FAFC] font-sans">Active User Tiers:</div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-white/5 rounded-xl flex items-center justify-between">
                  <span className="text-[#94A3B8]">Administrators</span>
                  <span className="font-bold text-[#FACC15]">2</span>
                </div>
                <div className="p-2.5 bg-white/5 rounded-xl flex items-center justify-between">
                  <span className="text-[#94A3B8]">Investigators</span>
                  <span className="font-bold text-[#FACC15]">18</span>
                </div>
                <div className="p-2.5 bg-white/5 rounded-xl flex items-center justify-between">
                  <span className="text-[#94A3B8]">Analysts</span>
                  <span className="font-bold text-[#FACC15]">22</span>
                </div>
                <div className="p-2.5 bg-white/5 rounded-xl flex items-center justify-between">
                  <span className="text-[#64748B]">Inactive users</span>
                  <span className="font-bold text-[#64748B]">3</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert('User Management: 42 Officers registered under Cyber Crime Wing Directory.')}
                className={`w-full py-2.5 font-mono font-bold text-xs uppercase rounded-full shadow-lg transition-all cursor-pointer ${isLight ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-[0_4px_14px_rgba(79,70,229,0.3)] border border-[#4F46E5]' : 'bg-[#FACC15]/10 border border-white/20 hover:border-[#FACC15]/50 text-[#F8FAFC] hover:text-[#FACC15]'}`}
              >
                Manage Users
              </button>
            </div>
          </div>

          {/* 4. System Alerts */}
          <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-[#FACC15]" />
                <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                  System Alerts
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#FACC15]">Non-Critical</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 bg-[#050507]/80 border border-[#FACC15]/30 rounded-2xl flex items-start space-x-2.5">
                <span className="text-[#FACC15]">⚠</span>
                <div>
                  <div className="font-bold text-[#F8FAFC]">2 failed ingestion records</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">Corrupted CSV header in telecom tower dump • Queued for retry</div>
                </div>
              </div>

              <div className="p-3 bg-[#050507]/80 border border-[#FACC15]/30 rounded-2xl flex items-start space-x-2.5">
                <span className="text-[#FACC15]">⚠</span>
                <div>
                  <div className="font-bold text-[#F8FAFC]">Extraction batch requires attention</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">Low OCR confidence on scanned FIR #2026/091 • Manual review flagged</div>
                </div>
              </div>

              <div className="p-3 bg-[#050507]/80 border border-[#FACC15]/30 rounded-2xl flex items-start space-x-2.5">
                <span className="text-[#FACC15]">✓</span>
                <div>
                  <div className="font-bold text-[#FACC15]">No critical system errors</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">ISO/IEC 27037 audit seal unbroken across all 14 active views</div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Recent Administrative Activity */}
          <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#FACC15]" />
                <h2 className="font-bold text-sm text-[#F8FAFC] font-mono uppercase tracking-wider">
                  Recent Administrative Activity
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#FACC15]">Audit Feed</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 bg-[#050507]/80 border border-white/5 rounded-xl flex items-center justify-between">
                <span className="text-[#FACC15] font-bold">18:32</span>
                <span className="text-[#F8FAFC] flex-1 px-3 truncate">Admin created user (DSP Ananya Deshmukh)</span>
                <span className="text-[10px] text-[#FACC15] bg-[#FACC15]/10 border border-[#FACC15]/30 px-2 py-0.5 rounded">Auth</span>
              </div>

              <div className="p-2.5 bg-[#050507]/80 border border-white/5 rounded-xl flex items-center justify-between">
                <span className="text-[#FACC15] font-bold">18:20</span>
                <span className="text-[#F8FAFC] flex-1 px-3 truncate">Ingestion completed (4.75M records)</span>
                <span className="text-[10px] text-[#FACC15] bg-[#FACC15]/10 border border-[#FACC15]/30 px-2 py-0.5 rounded">Success</span>
              </div>

              <div className="p-2.5 bg-[#050507]/80 border border-white/5 rounded-xl flex items-center justify-between">
                <span className="text-[#FACC15] font-bold">18:04</span>
                <span className="text-[#F8FAFC] flex-1 px-3 truncate">Analyst account deactivated (USR-OLD-99)</span>
                <span className="text-[10px] text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2 py-0.5 rounded">Deact</span>
              </div>

              <div className="p-2.5 bg-[#050507]/80 border border-white/5 rounded-xl flex items-center justify-between">
                <span className="text-[#FACC15] font-bold">17:51</span>
                <span className="text-[#F8FAFC] flex-1 px-3 truncate">Extraction batch completed (CCTNS Diaries)</span>
                <span className="text-[10px] text-[#FACC15] bg-[#FACC15]/10 border border-[#FACC15]/30 px-2 py-0.5 rounded">Success</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('audit')}
              className="w-full py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] font-mono font-bold text-xs uppercase rounded-full shadow-md transition-all cursor-pointer"
            >
              View Audit Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN CASE OVERVIEW VIEW (Switches dashboard based on currentUser.role)
// ==========================================
export const CaseOverviewView: React.FC = () => {
  const { currentUser } = useInvestigation();

  const role = currentUser?.role || 'Investigator';

  return (
    <div id="case-overview-view" className="w-full p-6 lg:p-8 space-y-6 text-[#F8FAFC]">
      {role === 'System Administrator' ? (
        <AdminDashboard />
      ) : role === 'Intelligence Analyst' ? (
        <AnalystDashboard />
      ) : (
        <InvestigatorDashboard />
      )}
    </div>
  );
};
