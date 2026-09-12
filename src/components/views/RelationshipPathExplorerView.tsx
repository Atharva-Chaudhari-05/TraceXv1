import React, { useState, useMemo } from 'react';
import {
  GitPullRequest,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Search,
  CheckCircle2,
  ExternalLink,
  Clock,
  Layers,
  FileSpreadsheet,
  Phone,
  CreditCard,
  Building,
  User,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

interface RelationshipPathExplorerViewProps {
  caseId?: string;
  initialEntityA?: string;
  initialEntityB?: string;
}

export const RelationshipPathExplorerView: React.FC<RelationshipPathExplorerViewProps> = ({
  caseId,
  initialEntityA,
  initialEntityB,
}) => {
  const {
    entities,
    navigateTo,
    showHiddenConnection,
    setShowHiddenConnection,
    setSelectedEntityId,
    setSelectedRecordId,
    saveAuditLog,
    theme,
  } = useInvestigation();
  const isLight = theme === 'light';

  const [sourceId, setSourceId] = useState<string>(initialEntityA || 'ent-rahul');
  const [targetId, setTargetId] = useState<string>(initialEntityB || 'ent-xyz');
  const [isTraversing, setIsTraversing] = useState<boolean>(false);

  const sourceEntity = entities.find((e) => e.id === sourceId) || entities[0];
  const targetEntity = entities.find((e) => e.id === targetId) || entities[entities.length - 1];

  // Defined 5-Hop Hidden Conduit Pathway from Master Report Section 5.4
  const hawala5HopPath = useMemo(
    () => [
      {
        hop: 1,
        sourceName: 'Rahul Sharma',
        sourceId: 'ent-rahul',
        sourceType: 'person',
        sourceRole: 'Primary Subject / SUBJ-NX-01',
        targetName: 'Ajay Patil',
        targetId: 'ent-ajay',
        targetType: 'person',
        targetRole: 'Financial Conduit / Cash Broker',
        mechanism: 'Physical Handover & Cellular Trigger',
        details: 'Meeting on Platform 3 (08:45 AM) & 241s Encrypted CDR Call (08:55 AM)',
        evidenceId: 'EV-001 & EV-002',
        provenance: 'source-backed',
        time: '08:45 - 08:55 IST',
        confidence: '98% Verified',
      },
      {
        hop: 2,
        sourceName: 'Ajay Patil',
        sourceId: 'ent-ajay',
        sourceType: 'person',
        sourceRole: 'Ground Courier (CCTNS Surveillance)',
        targetName: 'A. Patil (SBI Account Holder)',
        targetId: 'ent-apatil',
        targetType: 'person',
        targetRole: 'Bank Wire Account Signatory',
        mechanism: 'AI Entity Resolution & KYC Deduplication',
        details: '94% Probabilistic Match: Identical phone +91-98234-11876, matching Green Park Enclave KYC, 173-min temporal gap',
        evidenceId: 'AI_ENTITY_RESOLVER_V1',
        provenance: 'synthetic',
        time: '11:20 IST',
        confidence: '94% AI Match',
      },
      {
        hop: 3,
        sourceName: 'A. Patil (A/C 889922)',
        sourceId: 'ent-acc-889922',
        sourceType: 'account',
        sourceRole: 'SBI Commercial Debit Account',
        targetName: 'A/C 482701 (HDFC Mule Ledger)',
        targetId: 'ent-acc-482701',
        targetType: 'account',
        targetRole: 'Rapid Intermediary Conduit',
        mechanism: 'Primary Banking Wire Dispersal',
        details: '₹50,000.00 debited via NetBanking Mobile (IP: 103.42.19.82) to HDFC mule ledger',
        evidenceId: 'EV-003',
        provenance: 'source-backed',
        time: '11:48 IST',
        confidence: '99% Verified',
      },
      {
        hop: 4,
        sourceName: 'A/C 482701 (HDFC)',
        sourceId: 'ent-acc-482701',
        sourceType: 'account',
        sourceRole: 'Intermediate Mule Ledger',
        targetName: 'Neha Verma',
        targetId: 'ent-neha',
        targetType: 'person',
        targetRole: 'Authorized Corporate Signatory / DIN-0941294',
        mechanism: 'Intermediate Mule Layering & Smurfing',
        details: 'Rapid IMPS Smurfing: ₹48,200 pushed within 22 minutes, retaining ₹1,800 mule commission',
        evidenceId: 'EV-004',
        provenance: 'source-backed',
        time: '12:10 IST',
        confidence: '95% Verified',
      },
      {
        hop: 5,
        sourceName: 'Neha Verma',
        sourceId: 'ent-neha',
        sourceType: 'person',
        sourceRole: 'Authorized Director (40% Shareholder)',
        targetName: 'XYZ Traders Pvt Ltd',
        targetId: 'ent-xyz',
        targetType: 'organisation',
        targetRole: 'Commercial Shell Beneficiary',
        mechanism: 'Corporate Shell Beneficiary Absorption',
        details: 'Commercial account ownership & destination pooling in ICICI A/C 772145',
        evidenceId: 'EV-006',
        provenance: 'source-backed',
        time: '12:30 IST',
        confidence: '98% Verified',
      },
    ],
    []
  );

  const isHawalaDemoPath =
    (sourceId === 'ent-rahul' || sourceId === 'Rahul Sharma') &&
    (targetId === 'ent-xyz' || targetId === 'XYZ Traders');

  const handleCompute = () => {
    setIsTraversing(true);
    setTimeout(() => {
      setIsTraversing(false);
      saveAuditLog(
        'PATHFINDING_QUERY',
        `Executed indirect path query between ${sourceEntity.name} and ${targetEntity.name}. Result: 5-hop hawala conduit identified.`
      );
    }, 400);
  };

  const handleViewOnGraph = () => {
    setShowHiddenConnection(true);
    navigateTo('graph');
  };

  const [sourceSearch, setSourceSearch] = useState<string>('');
  const [targetSearch, setTargetSearch] = useState<string>('');
  const [isSourceOpen, setIsSourceOpen] = useState<boolean>(false);
  const [isTargetOpen, setIsTargetOpen] = useState<boolean>(false);

  const filteredSourceEntities = useMemo(() => {
    if (!sourceSearch.trim()) return entities.slice(0, 6);
    return entities.filter(
      (e) =>
        e.name.toLowerCase().includes(sourceSearch.toLowerCase()) ||
        e.type.toLowerCase().includes(sourceSearch.toLowerCase()) ||
        (e.role && e.role.toLowerCase().includes(sourceSearch.toLowerCase()))
    );
  }, [entities, sourceSearch]);

  const filteredTargetEntities = useMemo(() => {
    if (!targetSearch.trim()) return entities.slice(0, 6);
    return entities.filter(
      (e) =>
        e.name.toLowerCase().includes(targetSearch.toLowerCase()) ||
        e.type.toLowerCase().includes(targetSearch.toLowerCase()) ||
        (e.role && e.role.toLowerCase().includes(targetSearch.toLowerCase()))
    );
  }, [entities, targetSearch]);

  return (
    <div id="path-explorer-view" className="w-full p-6 lg:p-8 space-y-6 text-[#F8FAFC]">
      {/* Top Header Card */}
      <div className="glass-panel border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-widest text-[#FACC15] font-bold">
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Multi-Hop Traversal Engine • Dijkstra Conduit Tracer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight mt-1 flex items-center space-x-3">
            <span>Path Explorer</span>
            <span className="text-xs font-mono bg-[#050507]/80 text-[#10B981] px-3 py-1 border border-[#10B981]/30 rounded-full font-semibold">
              5-Hop Conduit Discovered
            </span>
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1.5 max-w-3xl leading-relaxed">
            Calculates multi-hop indirect relationships between seemingly unconnected subjects, exposing covert cash handovers, KYC deduplication bridges, and rapid mule layering.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleViewOnGraph}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#FACC15]/15 hover:bg-[#FACC15] text-[#FACC15] hover:text-[#050507] border border-[#FACC15]/40 hover:border-[#FACC15] rounded-full text-xs font-mono font-bold transition-all shadow-sm hover:shadow-[0_0_20px_rgba(250, 204, 21,0.5)] cursor-pointer group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FACC15] group-hover:text-[#050507] transition-colors" />
            <span>Illuminate in 2D Graph</span>
          </button>
        </div>
      </div>

      {/* Query Selector Container with Direct Search Bars - High Stacking Context Above Results */}
      <div className="glass-card border border-white/10 p-6 rounded-3xl shadow-xl space-y-4 relative z-40 overflow-visible">
        <div className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider flex items-center justify-between">
          <span>Forensic Path Parameters</span>
          <span className="text-[10px] text-[#FACC15]">Algorithm: Multi-Constraint Dijkstra + KYC Resolution</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start relative z-50">
          {/* Direct Search: Source Entity */}
          <div className="relative z-50">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-semibold mb-1.5">
              Originating Entity (Ground Zero):
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#FACC15] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={isSourceOpen ? sourceSearch : `${sourceEntity.name} (${sourceEntity.type.toUpperCase()})`}
                onFocus={() => {
                  setIsSourceOpen(true);
                  setSourceSearch('');
                }}
                onChange={(e) => {
                  setSourceSearch(e.target.value);
                  setIsSourceOpen(true);
                }}
                placeholder="Search originating entity name, type, phone..."
                className="w-full pl-10 pr-10 py-2.5 bg-[#050507]/90 border border-white/10 focus:border-[#FACC15] rounded-2xl text-xs font-mono text-[#F8FAFC] focus:outline-none shadow-inner transition-all"
              />
              {isSourceOpen ? (
                <button
                  type="button"
                  onClick={() => setIsSourceOpen(false)}
                  className="absolute right-3 text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-bold"
                >
                  ✕
                </button>
              ) : (
                <span className="absolute right-3.5 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#FACC15] border border-white/10 pointer-events-none">
                  {sourceEntity.risk}
                </span>
              )}
            </div>

            {/* Instant Suggestions Dropdown */}
            {isSourceOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#0A0A0E]/95 backdrop-blur-2xl border border-[#FACC15]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 max-h-64 overflow-y-auto p-2 space-y-1 ring-1 ring-[#FACC15]/30">
                {filteredSourceEntities.map((ent) => (
                  <div
                    key={`src-${ent.id}`}
                    onClick={() => {
                      setSourceId(ent.id);
                      setIsSourceOpen(false);
                      setSourceSearch('');
                    }}
                    className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-between text-xs font-mono transition-all ${
                      sourceId === ent.id
                        ? 'bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/40'
                        : 'hover:bg-white/5 text-[#F8FAFC]'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center space-x-2">
                        <span>{ent.name}</span>
                        <span className="text-[10px] text-[#64748B] uppercase">({ent.type})</span>
                      </div>
                      <div className="text-[11px] text-[#94A3B8] font-sans truncate max-w-xs mt-0.5">
                        {ent.role || ent.identifier}
                      </div>
                    </div>
                    <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-black/40 text-[#94A3B8] border border-white/10">
                      {ent.risk}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Direct Search: Destination Entity */}
          <div className="relative z-50">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-semibold mb-1.5">
              Destination Entity (Target Beneficiary):
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#FACC15] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={isTargetOpen ? targetSearch : `${targetEntity.name} (${targetEntity.type.toUpperCase()})`}
                onFocus={() => {
                  setIsTargetOpen(true);
                  setTargetSearch('');
                }}
                onChange={(e) => {
                  setTargetSearch(e.target.value);
                  setIsTargetOpen(true);
                }}
                placeholder="Search target entity, account, organisation..."
                className="w-full pl-10 pr-10 py-2.5 bg-[#050507]/90 border border-white/10 focus:border-[#FACC15] rounded-2xl text-xs font-mono text-[#F8FAFC] focus:outline-none shadow-inner transition-all"
              />
              {isTargetOpen ? (
                <button
                  type="button"
                  onClick={() => setIsTargetOpen(false)}
                  className="absolute right-3 text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-bold"
                >
                  ✕
                </button>
              ) : (
                <span className="absolute right-3.5 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#FACC15] border border-white/10 pointer-events-none">
                  {targetEntity.risk}
                </span>
              )}
            </div>

            {/* Instant Suggestions Dropdown */}
            {isTargetOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#0A0A0E]/95 backdrop-blur-2xl border border-[#FACC15]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 max-h-64 overflow-y-auto p-2 space-y-1 ring-1 ring-[#FACC15]/30">
                {filteredTargetEntities.map((ent) => (
                  <div
                    key={`tgt-${ent.id}`}
                    onClick={() => {
                      setTargetId(ent.id);
                      setIsTargetOpen(false);
                      setTargetSearch('');
                    }}
                    className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-between text-xs font-mono transition-all ${
                      targetId === ent.id
                        ? 'bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/40'
                        : 'hover:bg-white/5 text-[#F8FAFC]'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center space-x-2">
                        <span>{ent.name}</span>
                        <span className="text-[10px] text-[#64748B] uppercase">({ent.type})</span>
                      </div>
                      <div className="text-[11px] text-[#94A3B8] font-sans truncate max-w-xs mt-0.5">
                        {ent.role || ent.identifier}
                      </div>
                    </div>
                    <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-black/40 text-[#94A3B8] border border-white/10">
                      {ent.risk}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[10px] uppercase text-[#64748B] font-bold mr-1">Demo Presets:</span>
            <button
              type="button"
              onClick={() => {
                setSourceId('ent-rahul');
                setTargetId('ent-xyz');
                setIsSourceOpen(false);
                setIsTargetOpen(false);
              }}
              className="px-3 py-1.5 glass-card hover:bg-white/10 border border-white/10 hover:border-[#FACC15]/40 rounded-full text-[11px] text-[#FACC15] font-mono transition-all cursor-pointer"
            >
              Rahul Sharma ➔ XYZ Traders (5 Hops)
            </button>
            <button
              type="button"
              onClick={() => {
                setSourceId('ent-rahul');
                setTargetId('ent-acc-772145');
                setIsSourceOpen(false);
                setIsTargetOpen(false);
              }}
              className="px-3 py-1.5 glass-card hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-[11px] text-[#94A3B8] font-mono transition-all cursor-pointer"
            >
              Rahul ➔ Beneficiary A/C 772145
            </button>
          </div>

          <button
            type="button"
            onClick={handleCompute}
            disabled={isTraversing}
            className="px-5 py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] text-xs font-mono font-bold tracking-wide uppercase rounded-full shadow-lg transition-all flex items-center space-x-2 cursor-pointer shrink-0"
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>{isTraversing ? 'Tracing Indirect Conduits...' : 'Trace Path'}</span>
          </button>
        </div>
      </div>

      {/* Path Results & Hop Visualizer */}
      <div className="space-y-4">
        {/* Investigative Impact Card */}
        <div className="p-5 glass-panel border border-[#10B981]/40 rounded-3xl text-xs space-y-2 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between font-mono gap-1">
            <span className="font-bold text-[#10B981] uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Investigative Breakthrough: Indirect Hawala Nexus Proved</span>
            </span>
            <span className="text-[#64748B] text-[11px]">Total Indirect Distance: 5 Hops • Zero Direct Contact</span>
          </div>
          <p className="text-[#94A3B8] leading-relaxed">
            <strong className="text-[#F8FAFC]">Judicial Significance:</strong> Rahul Sharma and XYZ Traders have{' '}
            <span className="text-[#EF4444] font-semibold">zero recorded telephone calls</span> or direct banking transfers. Under single-hop querying, no connection exists. TraceX fuses physical CCTV surveillance, cellular tower colocation, AI entity deduplication, and banking transfer telemetry to prove criminal conspiracy under Section 120B IPC.
          </p>
        </div>

        {/* Step-by-Step 5-Hop Cards */}
        <div className="space-y-3.5">
          {hawala5HopPath.map((hopItem) => (
            <div
              key={hopItem.hop}
              className={`p-5 glass-card border rounded-3xl transition-all shadow-md ${
                isLight
                  ? 'border-slate-200/80 hover:border-slate-300'
                  : hopItem.provenance === 'synthetic'
                  ? 'border-dashed border-[#F59E0B]/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] bg-[#F59E0B]/5'
                  : 'border-white/10 hover:border-[#FACC15]/50'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono font-bold text-xs shadow-inner ${
                    isLight ? 'bg-slate-100 border-slate-200 text-[#4F46E5]' : 'bg-[#050507] border-white/15 text-[#FACC15]'
                  }`}>
                    0{hopItem.hop}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-[#F8FAFC]'}`}>{hopItem.mechanism}</span>
                      <span
                        className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${
                          hopItem.provenance === 'synthetic'
                            ? isLight
                              ? 'bg-amber-50 text-amber-700 border-dashed border-amber-300'
                              : 'bg-[#F59E0B]/15 text-[#F59E0B] border-dashed border-[#F59E0B]'
                            : isLight
                            ? 'bg-emerald-50 text-emerald-700 border-solid border-emerald-300'
                            : 'bg-[#10B981]/15 text-[#10B981] border-solid border-[#10B981]'
                        }`}
                      >
                        {hopItem.provenance === 'synthetic' ? 'AI-Synthesized Match' : 'Source-Backed Fact'}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[#64748B] mt-0.5">
                      Timestamp: {hopItem.time} • Confidence: {hopItem.confidence}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[11px] font-mono text-[#64748B]">Evidence Anchor:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRecordId('EV-001');
                      navigateTo('records');
                    }}
                    className={`text-xs font-mono px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                      isLight
                        ? 'text-[#4F46E5] hover:underline bg-slate-100 border border-slate-200'
                        : 'text-[#FACC15] hover:underline bg-[#050507] border border-white/10'
                    }`}
                  >
                    {hopItem.evidenceId}
                  </button>
                </div>
              </div>

              {/* Hop Linkage Strip */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center pt-3 text-xs">
                <div className={`md:col-span-5 p-3.5 border rounded-2xl ${
                  isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-[#050507]/80 border border-white/10'
                }`}>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">From Entity</div>
                  <div className={`font-bold text-sm mt-0.5 ${isLight ? 'text-slate-900' : 'text-[#F8FAFC]'}`}>{hopItem.sourceName}</div>
                  <div className={`text-[11px] font-mono mt-0.5 ${isLight ? 'text-slate-600' : 'text-[#94A3B8]'}`}>{hopItem.sourceRole}</div>
                </div>

                <div className="md:col-span-2 flex flex-col items-center justify-center text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xs ${
                    isLight ? 'bg-indigo-50 border border-indigo-200 text-[#4F46E5]' : 'bg-[#FACC15]/15 border border-[#FACC15]/40 text-[#FACC15]'
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] mt-1 font-semibold">Hop {hopItem.hop}</span>
                </div>

                <div className={`md:col-span-5 p-3.5 border rounded-2xl ${
                  isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-[#050507]/80 border border-white/10'
                }`}>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">To Entity</div>
                  <div className={`font-bold text-sm mt-0.5 ${isLight ? 'text-slate-900' : 'text-[#F8FAFC]'}`}>{hopItem.targetName}</div>
                  <div className={`text-[11px] font-mono mt-0.5 ${isLight ? 'text-slate-600' : 'text-[#94A3B8]'}`}>{hopItem.targetRole}</div>
                </div>
              </div>

              {/* Mechanism Description */}
              <div className={`mt-3 p-3 border rounded-2xl text-xs font-sans leading-relaxed ${
                isLight ? 'bg-slate-50/60 border-slate-200 text-slate-600' : 'bg-[#050507]/60 border border-white/10 text-[#94A3B8]'
              }`}>
                <strong className={`font-mono text-[11px] ${isLight ? 'text-slate-800' : 'text-[#F8FAFC]'}`}>Evidentiary Breakdown: </strong>
                {hopItem.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
