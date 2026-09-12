import React from 'react';
import {
  Network,
  ArrowRight,
  GitBranch,
  Layers,
  Clock,
  AlertTriangle,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const PatternAnalysisView: React.FC = () => {
  const { navigateTo, setShowHiddenConnection, theme } = useInvestigation();
  const isLight = theme === 'light';
  const [selectedBrokerId, setSelectedBrokerId] = React.useState<string | null>(null);
  const [hoveredBrokerId, setHoveredBrokerId] = React.useState<string | null>(null);

  return (
    <div id="pattern-analysis-view" className="w-full p-6 lg:p-8 space-y-6 text-[#F8FAFC]">
      {/* Header Banner */}
      <div className="glass-panel border border-white/10 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#FACC15] uppercase">
              Topology &amp; Behavioral Intelligence
            </span>
            <span className="text-xs font-mono bg-[#050507]/80 text-[#FACC15] px-3 py-1 border border-[#FACC15]/40 rounded-full font-semibold shadow-xs">
              Betweenness Centrality &amp; Communities
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#F8FAFC] mt-1.5 font-mono">
            Graph Centrality, Clustering &amp; Anomaly Patterns
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1 font-sans">
            Quantitative network centrality scoring, 3 functional criminal cells, smurfing threshold evasion, and multi-hop hawala conduit tracing.
          </p>
        </div>

        <button
          onClick={() => {
            setShowHiddenConnection(true);
            navigateTo('graph', { highlightPath: true });
          }}
          className="px-5 py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#050507] text-xs font-mono uppercase tracking-wider font-bold flex items-center space-x-2 rounded-full shadow-lg transition-all shrink-0 cursor-pointer"
        >
          <Network className="w-4 h-4" />
          <span>Reveal 5-Hop Conduit on Graph</span>
        </button>
      </div>

      {/* Grid: Key Centrality Rankings + Connection Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Key Entities Connectivity Ranking (5 cols) */}
        <div className="lg:col-span-5 glass-panel border border-white/10 p-6 rounded-3xl space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FACC15]">
                Centrality Rankings
              </div>
              <h2 className="text-lg font-bold text-[#F8FAFC] mt-0.5 font-mono">Key Network Brokers</h2>
            </div>
            <span className="text-xs text-[#94A3B8] font-mono">By Betweenness</span>
          </div>

          <div className="space-y-3.5">
            {[
              {
                id: 'ent-ajay',
                rank: 1,
                name: 'Ajay Patil',
                betweenness: '0.91 (#1)',
                badgeLight: 'bg-rose-50 text-rose-600 border-rose-200',
                badgeDark: 'bg-rose-950/50 text-rose-400 border-rose-800/60',
                desc: 'The supreme bridge node connecting street cash courier operations to downstream commercial banking accounts.',
                degree: '7 Connections',
              },
              {
                id: 'ent-rahul',
                rank: 2,
                name: 'Rahul Sharma',
                betweenness: '0.82',
                badgeLight: 'bg-rose-50 text-rose-600 border-rose-200',
                badgeDark: 'bg-rose-950/50 text-rose-400 border-rose-800/60',
                desc: 'Primary field coordinator connecting transit vehicle MH-12-DE-4419, phone lines, and cash couriers.',
                degree: '6 Connections',
              },
              {
                id: 'ent-neha',
                rank: 3,
                name: 'Neha Verma',
                betweenness: '0.62',
                badgeLight: 'bg-amber-50 text-amber-600 border-amber-200',
                badgeDark: 'bg-amber-950/50 text-amber-400 border-amber-800/60',
                desc: 'Corporate bridge signatory connecting intermediate banking mules to commercial shell entity XYZ Traders.',
                degree: '4 Connections',
              },
            ].map((broker) => {
              const isSelected = selectedBrokerId === broker.id;
              const isHovered = hoveredBrokerId === broker.id;
              const isHighlighted = isSelected || isHovered;

              return (
                <div
                  key={broker.id}
                  onClick={() => {
                    setSelectedBrokerId(broker.id);
                    navigateTo('entities', { entityId: broker.id });
                  }}
                  onMouseEnter={() => setHoveredBrokerId(broker.id)}
                  onMouseLeave={() => setHoveredBrokerId(null)}
                  className={`p-4.5 rounded-2xl border cursor-pointer transition-all duration-200 shadow-sm ${
                    isHighlighted
                      ? isLight
                        ? 'border-[#4F46E5] bg-indigo-50/40 shadow-md ring-1 ring-[#4F46E5]/30'
                        : 'border-[#FACC15] bg-[#FACC15]/5 shadow-md ring-1 ring-[#FACC15]/30'
                      : isLight
                      ? 'glass-card border-slate-200 hover:border-[#4F46E5]/60'
                      : 'glass-card border-white/10 hover:border-[#FACC15]/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`w-6 h-6 rounded-lg border text-xs font-bold flex items-center justify-center font-mono transition-all duration-200 shadow-xs ${
                          isHighlighted
                            ? isLight
                              ? 'bg-[#4F46E5] border-[#4F46E5] text-white shadow-sm ring-2 ring-[#4F46E5]/20'
                              : 'bg-[#FACC15] border-[#FACC15] text-[#050507] shadow-sm'
                            : isLight
                            ? 'bg-slate-100 border-slate-300 text-slate-900'
                            : 'bg-[#0D0D11] border-white/20 text-[#94A3B8]'
                        }`}
                        style={
                          isLight
                            ? isHighlighted
                              ? { backgroundColor: '#4F46E5', color: '#FFFFFF', borderColor: '#4F46E5' }
                              : { backgroundColor: '#F1F5F9', color: '#050507', borderColor: '#CBD5E1' }
                            : isHighlighted
                            ? { backgroundColor: '#FACC15', color: '#050507', borderColor: '#FACC15' }
                            : undefined
                        }
                      >
                        <span
                          className="font-extrabold select-none"
                          style={
                            isLight
                              ? isHighlighted
                                ? { color: '#FFFFFF' }
                                : { color: '#050507' }
                              : undefined
                          }
                        >
                          {broker.rank}
                        </span>
                      </span>
                      <span
                        className={`font-bold text-base transition-colors ${
                          isHighlighted
                            ? isLight
                              ? 'text-[#4F46E5]'
                              : 'text-[#FACC15]'
                            : isLight
                            ? 'text-[#0F172A]'
                            : 'text-[#F8FAFC]'
                        }`}
                      >
                        {broker.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 border rounded-full ${
                        isLight ? broker.badgeLight : broker.badgeDark
                      }`}
                    >
                      BETWEENNESS: {broker.betweenness}
                    </span>
                  </div>
                  <div className={`text-xs mt-1.5 leading-relaxed font-sans ${isLight ? 'text-slate-600' : 'text-[#94A3B8]'}`}>
                    {broker.desc}
                  </div>
                  <div className={`text-xs font-mono mt-3 flex items-center justify-between pt-2.5 border-t ${
                    isLight ? 'border-slate-200/80 text-slate-500' : 'border-white/10 text-[#64748B]'
                  }`}>
                    <span>Degree: {broker.degree}</span>
                    <span className={`font-semibold flex items-center space-x-1 ${
                      isLight ? 'text-[#4F46E5]' : 'text-[#FACC15]'
                    }`}>
                      <span>Inspect Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Connection Paths & Multi-Hop Tracer (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Multi-Hop Path Card */}
          <div className="glass-panel border border-white/10 p-6 rounded-3xl space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2.5">
                <GitBranch className="w-4 h-4 text-[#FACC15]" />
                <h3 className="text-lg font-bold text-[#F8FAFC] font-mono">The 5-Hop Hidden Hawala Conduit</h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 border rounded-full bg-rose-950/50 text-rose-400 border-rose-800/60 uppercase">
                Zero Direct Contact
              </span>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed font-sans">
              Rahul Sharma and XYZ Traders have zero recorded telephone calls or direct banking transfers. TraceX definitively links them through this indirect 5-hop pathway:
            </p>

            {/* Visual Pathway Chain - Highlights on Hover */}
            <div className={`glass-card p-5 text-xs space-y-2 rounded-2xl border font-mono ${isLight ? 'border-slate-300' : 'border-white/10'}`}>
              <div className={`group/hop p-2.5 rounded-xl border border-transparent transition-all cursor-pointer ${isLight ? 'hover:border-[#4F46E5]/50 hover:bg-[#EEF2FF]' : 'hover:border-[#FACC15]/50 hover:bg-[#FACC15]/10'}`}>
                <div className={`flex items-center space-x-2.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                  <span className={`w-2.5 h-2.5 rounded-full border transition-all ${isLight ? 'bg-slate-300 border-slate-400 group-hover/hop:scale-125 group-hover/hop:bg-[#4F46E5] group-hover/hop:border-[#4F46E5] group-hover/hop:shadow-[0_0_10px_rgba(79,70,229,0.8)]' : 'bg-white/20 border-white/30 group-hover/hop:scale-125 group-hover/hop:bg-[#FACC15] group-hover/hop:border-[#FACC15] group-hover/hop:shadow-[0_0_10px_rgba(250, 204, 21,0.8)]'}`} />
                  <span className={`font-bold transition-colors ${isLight ? 'group-hover/hop:text-[#4F46E5]' : 'group-hover/hop:text-[#FACC15]'}`}>[Hop 1] Rahul Sharma (Primary Subject)</span>
                </div>
                <div className={`pl-5 text-xs font-sans mt-0.5 ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>↓ Physical Handover at Platform 3 (08:45 AM) &amp; 241s Encrypted CDR Call (08:55 AM) [EV-001, EV-002]</div>
              </div>
              
              <div className={`group/hop p-2.5 rounded-xl border border-transparent transition-all cursor-pointer ${isLight ? 'hover:border-[#4F46E5]/50 hover:bg-[#EEF2FF]' : 'hover:border-[#FACC15]/50 hover:bg-[#FACC15]/10'}`}>
                <div className={`flex items-center space-x-2.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                  <span className={`w-2.5 h-2.5 rounded-full border transition-all ${isLight ? 'bg-slate-300 border-slate-400 group-hover/hop:scale-125 group-hover/hop:bg-[#4F46E5] group-hover/hop:border-[#4F46E5] group-hover/hop:shadow-[0_0_10px_rgba(79,70,229,0.8)]' : 'bg-white/20 border-white/30 group-hover/hop:scale-125 group-hover/hop:bg-[#FACC15] group-hover/hop:border-[#FACC15] group-hover/hop:shadow-[0_0_10px_rgba(250, 204, 21,0.8)]'}`} />
                  <span className={`font-bold transition-colors ${isLight ? 'group-hover/hop:text-[#4F46E5]' : 'group-hover/hop:text-[#FACC15]'}`}>[Hop 2] Ajay Patil ↔ A. Patil (94% AI Entity Resolution)</span>
                </div>
                <div className={`pl-5 text-xs font-sans mt-0.5 ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>↓ Shared Mobile +91-98234-11876 &amp; Matching Green Park Address [AI_RESOLVER_V1]</div>
              </div>

              <div className={`group/hop p-2.5 rounded-xl border border-transparent transition-all cursor-pointer ${isLight ? 'hover:border-[#4F46E5]/50 hover:bg-[#EEF2FF]' : 'hover:border-[#FACC15]/50 hover:bg-[#FACC15]/10'}`}>
                <div className={`flex items-center space-x-2.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                  <span className={`w-2.5 h-2.5 rounded-full border transition-all ${isLight ? 'bg-slate-300 border-slate-400 group-hover/hop:scale-125 group-hover/hop:bg-[#4F46E5] group-hover/hop:border-[#4F46E5] group-hover/hop:shadow-[0_0_10px_rgba(79,70,229,0.8)]' : 'bg-white/20 border-white/30 group-hover/hop:scale-125 group-hover/hop:bg-[#FACC15] group-hover/hop:border-[#FACC15] group-hover/hop:shadow-[0_0_10px_rgba(250, 204, 21,0.8)]'}`} />
                  <span className={`font-bold transition-colors ${isLight ? 'group-hover/hop:text-[#4F46E5]' : 'group-hover/hop:text-[#FACC15]'}`}>[Hop 3] A/C 889922 (SBI) ➔ A/C 482701 (HDFC Mule)</span>
                </div>
                <div className={`pl-5 text-xs font-sans mt-0.5 ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>↓ Core Banking Wire: ₹50,000 Transferred via SFMS NetBanking (11:48 AM IST) [EV-003]</div>
              </div>

              <div className={`group/hop p-2.5 rounded-xl border border-transparent transition-all cursor-pointer ${isLight ? 'hover:border-[#4F46E5]/50 hover:bg-[#EEF2FF]' : 'hover:border-[#FACC15]/50 hover:bg-[#FACC15]/10'}`}>
                <div className={`flex items-center space-x-2.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                  <span className={`w-2.5 h-2.5 rounded-full border transition-all ${isLight ? 'bg-slate-300 border-slate-400 group-hover/hop:scale-125 group-hover/hop:bg-[#4F46E5] group-hover/hop:border-[#4F46E5] group-hover/hop:shadow-[0_0_10px_rgba(79,70,229,0.8)]' : 'bg-white/20 border-white/30 group-hover/hop:scale-125 group-hover/hop:bg-[#FACC15] group-hover/hop:border-[#FACC15] group-hover/hop:shadow-[0_0_10px_rgba(250, 204, 21,0.8)]'}`} />
                  <span className={`font-bold transition-colors ${isLight ? 'group-hover/hop:text-[#4F46E5]' : 'group-hover/hop:text-[#FACC15]'}`}>[Hop 4] Rapid Smurfing Dispersal ➔ Neha Verma</span>
                </div>
                <div className={`pl-5 text-xs font-sans mt-0.5 ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>↓ ₹48,200 Layered to ICICI A/C 772145 in 22 mins (12:10 PM IST) [EV-004]</div>
              </div>

              <div className={`group/hop p-2.5 rounded-xl border border-transparent transition-all cursor-pointer ${isLight ? 'hover:border-[#4F46E5]/50 hover:bg-[#EEF2FF]' : 'hover:border-[#FACC15]/50 hover:bg-[#FACC15]/10'}`}>
                <div className={`flex items-center space-x-2.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                  <span className={`w-2.5 h-2.5 rounded-full border transition-all ${isLight ? 'bg-slate-300 border-slate-400 group-hover/hop:scale-125 group-hover/hop:bg-[#4F46E5] group-hover/hop:border-[#4F46E5] group-hover/hop:shadow-[0_0_10px_rgba(79,70,229,0.8)]' : 'bg-white/20 border-white/30 group-hover/hop:scale-125 group-hover/hop:bg-[#FACC15] group-hover/hop:border-[#FACC15] group-hover/hop:shadow-[0_0_10px_rgba(250, 204, 21,0.8)]'}`} />
                  <span className={`font-bold transition-colors ${isLight ? 'group-hover/hop:text-[#4F46E5]' : 'group-hover/hop:text-[#FACC15]'}`}>[Hop 5] XYZ Traders Pvt Ltd (Commercial Shell Beneficiary)</span>
                </div>
                <div className={`pl-5 text-xs font-sans mt-0.5 ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>↓ Controlled by Offshore Beneficiary Vikram Singhania (Dubai Hub) [EV-009]</div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-[#64748B] font-mono">
                Certified Evidence: <span className="font-bold text-[#F8FAFC]">EV-001, EV-002, EV-003, EV-004</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowHiddenConnection(true);
                  navigateTo('path');
                }}
                className="px-4 py-2 bg-[#FACC15]/15 hover:bg-[#FACC15] text-[#FACC15] hover:text-white border border-[#FACC15]/40 hover:border-[#FACC15] text-xs font-mono uppercase tracking-wider font-bold rounded-full flex items-center space-x-1.5 transition-all shadow-sm hover:shadow-[0_0_20px_rgba(250, 204, 21,0.5)] cursor-pointer group"
              >
                <span>Open Path Tracer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clustered Groups & Behavioral Anomalies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Functional Cluster Communities */}
        <div className="glass-panel border border-white/10 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center space-x-2.5 border-b border-white/10 pb-4">
            <Layers className="w-4 h-4 text-[#FACC15]" />
            <h3 className="text-lg font-bold text-[#F8FAFC] font-mono">Functional Cluster Communities</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-4.5 glass-card rounded-2xl border border-white/10 space-y-1">
              <div className="font-bold text-[#FACC15] text-sm mb-1 font-mono">Cell Alpha: Ground Field Operations</div>
              <p className="text-[#94A3B8] mb-2.5 leading-relaxed font-sans">
                Rahul Sharma, Vehicle MH-12-DE-4419, Mobile +91-98765-43210, Central Bus Terminal rendezvous point, Sector 4 Warehouse Depot transit.
              </p>
              <div className="text-xs font-mono text-[#64748B]">Evidentiary Basis: EV-001 (ANPR/CCTV), EV-002 (Telecom CDR)</div>
            </div>

            <div className="p-4.5 glass-card rounded-2xl border border-white/10 space-y-1">
              <div className="font-bold text-amber-400 text-sm mb-1 font-mono">Cell Beta: Financial Conduit &amp; Mule Bridge</div>
              <p className="text-[#94A3B8] mb-2.5 leading-relaxed font-sans">
                Ajay Patil, A. Patil (Bank Alias), Phone +91-98234-11876, SBI Debit Account 889922, HDFC Rapid Mule Account 482701.
              </p>
              <div className="text-xs font-mono text-[#64748B]">Evidentiary Basis: EV-003 (SBI SFMS Wire), EV-004 (HDFC Layering)</div>
            </div>

            <div className="p-4 glass-card rounded-xl border border-white/10 space-y-1">
              <div className="font-bold text-indigo-400 text-sm mb-1 font-mono">Cell Gamma: Corporate Shells &amp; Offshore Beneficiary</div>
              <p className="text-[#94A3B8] mb-2.5 leading-relaxed font-sans">
                Neha Verma (Signatory), XYZ Traders Pvt Ltd (Shell Co.), ICICI Account 772145, Vikram Singhania (Offshore Dubai Cartel Controller).
              </p>
              <div className="text-xs font-mono text-[#64748B]">Evidentiary Basis: EV-006 (RoC Filing), EV-009 (Satellite Comms)</div>
            </div>
          </div>
        </div>

        {/* Behavioral Anomalies Flagged */}
        <div className="glass-panel border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center space-x-2.5 border-b border-white/10 pb-4">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-lg font-bold text-[#F8FAFC] font-mono">Behavioral Anomalies Flagged</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-4 glass-card rounded-xl border border-white/10 space-y-1">
              <div className="font-bold text-[#F8FAFC] text-sm mb-1 flex items-center justify-between font-mono">
                <span>Threshold Avoidance (Smurfing)</span>
                <span className="text-xs font-mono text-rose-400 bg-rose-950/50 px-2.5 py-0.5 border border-rose-800/60 font-bold rounded-full">&lt; ₹50,000 Trigger</span>
              </div>
              <p className="text-[#94A3B8] leading-relaxed font-sans">
                Transaction batches calibrated specifically below ₹50,000 (e.g. ₹50,000 and ₹48,200) to deliberately bypass mandatory Form 60 / PAN reporting thresholds under Indian tax enforcement guidelines.
              </p>
            </div>

            <div className="p-4 glass-card rounded-xl border border-white/10 space-y-1">
              <div className="font-bold text-[#F8FAFC] text-sm mb-1 flex items-center justify-between font-mono">
                <span>Disposable Burner Handset Churn</span>
                <span className="text-xs font-mono text-amber-400 bg-amber-950/50 px-2.5 py-0.5 border border-amber-800/60 font-bold rounded-full">&lt; 48h Churn</span>
              </div>
              <p className="text-[#94A3B8] leading-relaxed font-sans">
                Burner phone line +91-91230-00991 activated exclusively for tactical command bursts and discarded within 48 hours to evade regular IMSI surveillance sweeps.
              </p>
            </div>

            <div className="p-4 glass-card rounded-xl border border-white/10 space-y-1">
              <div className="font-bold text-[#F8FAFC] text-sm mb-1 flex items-center justify-between font-mono">
                <span>Cell Tower Co-Location Convergence</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2.5 py-0.5 border border-emerald-800/60 font-bold rounded-full">Sector MUM-C4-89</span>
              </div>
              <p className="text-[#94A3B8] leading-relaxed font-sans">
                Two separate mobile devices (+91-98765-43210 and +91-98234-11876) synchronized on the exact cell tower sector within 30 seconds of physical observation, followed by an immediate voice call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
