import { useState, useEffect, useRef } from 'react';
import { SecurityThreat } from '../types';
import { ShieldCheck, Terminal, Play, Pause, Activity, RefreshCw } from 'lucide-react';
import { PARTNERS } from '../data/partners';


interface ThreatMapProps {
  onIntegrationsClick: () => void;
  onArchitectClick: () => void;
}

const SAMPLE_THREAT_TYPES = [
  { type: 'Phishing Payload Detonated', partner: 'ProofPoint & Vircom', severity: 'high' as const },
  { type: 'External Port Scan Deflected', partner: 'CheckPoint & Vircom', severity: 'medium' as const },
  { type: 'Ransomware Extension Blocked', partner: 'TrendMicro', severity: 'critical' as const },
  { type: 'Brute-Force Attack Halted', partner: 'KZero Identity', severity: 'high' as const },
  { type: 'Unapproved Configuration Drift Reset', partner: 'SolarWinds', severity: 'low' as const },
  { type: 'Unauthorized Endpoint VPN Attempt Blocked', partner: 'OpenVPN Enterprise', severity: 'high' as const },
  { type: 'Rogue Process Behavioral Override', partner: 'JGAI', severity: 'critical' as const },
];

const SAMPLE_SOURCES = [
  '84.22.109.13 (Rogue Proxy)',
  '203.0.113.88 (Botnet Node)',
  '198.51.100.24 (Tor Exit Node)',
  '45.92.21.105 (Suspicious Hosting)',
  'Mail Relay gateway-v1.com',
];

const SAMPLE_TARGETS = [
  'Corp Odoo Financial Database',
  'Primary VoIP Switchboard v4',
  'Exchange Cloud Mailbox Suite',
  'Domain Controller WAN Gateway',
  'Endpoint WORKSTATION-B603',
];

export default function ThreatMap({ onIntegrationsClick, onArchitectClick }: ThreatMapProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [threats, setThreats] = useState<SecurityThreat[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({
    deflectedToday: 1384,
    socLoad: 41,
    avgResponse: '14.2s',
  });
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Generate initial list of past threat event blocks
  useEffect(() => {
    const initialThreats: SecurityThreat[] = Array.from({ length: 8 }).map((_, i) => {
      const typeObj = SAMPLE_THREAT_TYPES[Math.floor(Math.random() * SAMPLE_THREAT_TYPES.length)];
      return {
        id: `TX-${Math.floor(Math.random() * 900000) + 100000}`,
        type: typeObj.type,
        source: SAMPLE_SOURCES[Math.floor(Math.random() * SAMPLE_SOURCES.length)],
        target: SAMPLE_TARGETS[Math.floor(Math.random() * SAMPLE_TARGETS.length)],
        status: ['intercepted', 'analyzed', 'neutralized'][Math.floor(Math.random() * 3)] as any,
        partnerMatched: typeObj.partner,
        timestamp: new Date(Date.now() - (8 - i) * 60000).toLocaleTimeString(),
        severity: typeObj.severity,
      };
    });
    setThreats(initialThreats);
  }, []);

  // Set up threat generator ticker
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const typeObj = SAMPLE_THREAT_TYPES[Math.floor(Math.random() * SAMPLE_THREAT_TYPES.length)];
      const newThreat: SecurityThreat = {
        id: `TX-${Math.floor(Math.random() * 900000) + 100000}`,
        type: typeObj.type,
        source: SAMPLE_SOURCES[Math.floor(Math.random() * SAMPLE_SOURCES.length)],
        target: SAMPLE_TARGETS[Math.floor(Math.random() * SAMPLE_TARGETS.length)],
        status: 'neutralized',
        partnerMatched: typeObj.partner,
        timestamp: new Date().toLocaleTimeString(),
        severity: typeObj.severity,
      };

      setThreats((prev) => [...prev.slice(1), newThreat]);

      // Randomly update metrics a bit for realism
      setMetrics((prev) => ({
        deflectedToday: prev.deflectedToday + 1,
        socLoad: Math.floor(Math.random() * 20) + 30,
        avgResponse: `${(Math.random() * 4 + 11).toFixed(1)}s`,
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const filteredThreats = selectedPartner
    ? threats.filter((t) => t.partnerMatched === selectedPartner)
    : threats;

  const severityColors = {
    low: 'text-blue-700 bg-blue-50 border-blue-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    high: 'text-orange-700 bg-orange-50 border-orange-200',
    critical: 'text-rose-700 bg-rose-50 border-rose-250 animate-pulse',
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Metrics Banner HUD - Bento Grid Format */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/80 border border-blue-100/70 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md shadow-sm shadow-blue-500/5">
          <div>
            <div className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">// DEFLECTED INTRUSIONS (24h)</div>
            <div className="text-3xl font-bold text-blue-950 mt-1">
              {metrics.deflectedToday}
            </div>
            <div className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Perimeter Protection Active</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/80 border border-blue-100/70 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md shadow-sm shadow-blue-500/5">
          <div>
            <div className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">// PIPELINE LOAD</div>
            <div className="text-3xl font-bold text-amber-600 mt-1">
              {metrics.socLoad}%
            </div>
            <div className="text-[10px] text-slate-500 mt-1">● Nominal operational capacity</div>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-amber-600 shadow-sm">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        <div className="bg-white/80 border border-blue-100/70 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md shadow-sm shadow-blue-500/5">
          <div>
            <div className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">// AVG RESPONSE SLA</div>
            <div className="text-3xl font-bold text-emerald-700 mt-1">
              {metrics.avgResponse}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">● Standard target limit: 1h</div>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-emerald-600 shadow-sm">
            <RefreshCw className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Simulated SVG Map Grid */}
        <div className="col-span-1 lg:col-span-7 bg-white/85 border border-blue-100 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[440px] backdrop-blur-md shadow-sm shadow-blue-500/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.03)_0%,transparent_70%)] pointer-events-none"></div>
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-blue-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-blue-950 tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
                <span>INTEGRATION TELESCOPE VIEW</span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Diagram detailing real-time orchestration mitigated by BRJU layers
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3.5 py-1.5 border border-blue-100 hover:bg-blue-50 bg-white rounded-full text-xs text-slate-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-600" />
                    <span>PAUSE LIVE INTUITION</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-blue-500" />
                    <span>RESUME OPERATIONS</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Graphical Nodes Stage */}
          <div className="relative h-64 my-4 flex items-center justify-center">
            {/* Center Hub - BRJU INFOSEC */}
            <div className="relative z-20 group">
              <div className="absolute -inset-6 rounded-full bg-blue-500/5 blur-lg group-hover:bg-blue-500/15 transition-all duration-500"></div>
              <div className="w-24 h-24 rounded-full bg-blue-50 border-2 border-blue-400 flex flex-col items-center justify-center p-3 text-center shadow-md shadow-blue-500/10 transition-transform duration-300 group-hover:scale-105">
                <span className="text-[9px] font-mono tracking-widest text-blue-900/60">BRJU Core</span>
                <span className="text-xs font-black text-blue-700 mt-0.5">SOC CONTROL</span>
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[9px] text-slate-600 bg-white px-3 py-1 rounded-full border border-blue-100 shadow-sm">
                Operational
              </div>
            </div>

            {/* Satellite Nodes - Integrations */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Draw connection pathways */}
                <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="rgba(37,99,235,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="rgba(37,99,235,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="85%" y1="75%" x2="50%" y2="50%" stroke="rgba(37,99,235,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="15%" y1="75%" x2="50%" y2="50%" stroke="rgba(37,99,235,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="50%" y1="12%" x2="50%" y2="50%" stroke="rgba(37,99,235,0.2)" strokeWidth="1.5" />

                {/* Animated defensive pulsing packets under state */}
                {isPlaying && (
                  <>
                    <circle r="4.5" fill="#2563eb" className="animate-pulse">
                      <animateMotion dur="3.5s" repeatCount="indefinite" path="M 120,60 L 250,128" />
                    </circle>
                    <circle r="3.5" fill="#d97706" className="animate-pulse">
                      <animateMotion dur="2.8s" repeatCount="indefinite" path="M 450,230 L 250,128" />
                    </circle>
                    <circle r="4.5" fill="#dc2626" className="animate-pulse">
                      <animateMotion dur="4.2s" repeatCount="indefinite" path="M 480,60 L 250,128" />
                    </circle>
                  </>
                )}
              </svg>

              {/* Node 1: Apex Endpoint Defense (TrendMicro) */}
              <div
                style={{ top: '15%', left: '15%' }}
                className="absolute pointer-events-auto cursor-pointer group flex flex-col items-center"
                onClick={() => setSelectedPartner('TrendMicro')}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white border ${selectedPartner === 'TrendMicro' ? 'border-blue-500 ring-2 ring-blue-500/10 text-blue-700 shadow-sm' : 'border-blue-100'} flex items-center justify-center p-2 group-hover:border-blue-300 transition-all shadow-sm`}>
                  <span className="text-[10px] font-bold text-rose-700 font-mono">Trend</span>
                </div>
                <span className="text-[9px] text-slate-500 mt-1.5">Endpoint</span>
              </div>

              {/* Node 2: NextGen Gateway (Checkpoint) */}
              <div
                style={{ top: '15%', right: '15%' }}
                className="absolute pointer-events-auto cursor-pointer group flex flex-col items-center"
                onClick={() => setSelectedPartner('CheckPoint & Vircom')}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white border ${selectedPartner === 'CheckPoint & Vircom' ? 'border-blue-500 ring-2 ring-blue-500/10 text-blue-700 shadow-sm' : 'border-blue-100'} flex items-center justify-center p-2 group-hover:border-blue-300 transition-all shadow-sm`}>
                  <span className="text-[9px] font-bold text-cyan-705 text-blue-700 font-mono text-center">Check<br/>Point</span>
                </div>
                <span className="text-[9px] text-slate-500 mt-1.5">Edge</span>
              </div>

              {/* Node 3: Zero-Trust Identity (KZero) */}
              <div
                style={{ bottom: '15%', right: '15%' }}
                className="absolute pointer-events-auto cursor-pointer group flex flex-col items-center"
                onClick={() => setSelectedPartner('KZero Identity')}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white border ${selectedPartner === 'KZero Identity' ? 'border-blue-500 ring-2 ring-blue-500/10 text-blue-700 shadow-sm' : 'border-blue-100'} flex items-center justify-center p-2 group-hover:border-blue-300 transition-all shadow-sm`}>
                  <span className="text-[10px] font-bold text-amber-700 font-mono">KZero</span>
                </div>
                <span className="text-[9px] text-slate-500 mt-1.5">Identity</span>
              </div>

              {/* Node 4: Secure Sandbox Mail (ProofPoint) */}
              <div
                style={{ bottom: '15%', left: '15%' }}
                className="absolute pointer-events-auto cursor-pointer group flex flex-col items-center"
                onClick={() => setSelectedPartner('ProofPoint & Vircom')}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white border ${selectedPartner === 'ProofPoint & Vircom' ? 'border-blue-500 ring-2 ring-blue-500/10 text-blue-700 shadow-sm' : 'border-blue-100'} flex items-center justify-center p-2 group-hover:border-blue-300 transition-all shadow-sm`}>
                  <span className="text-[9px] font-mono font-bold text-orange-700 text-center">Proof<br />pt</span>
                </div>
                <span className="text-[9px] text-slate-500 mt-1.5">Email</span>
              </div>

              {/* Node 5: Threat Predictive AI (JGAI) */}
              <div
                style={{ top: '5%', left: '46%' }}
                className="absolute pointer-events-auto cursor-pointer group flex flex-col items-center"
                onClick={() => setSelectedPartner('JGAI')}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white border ${selectedPartner === 'JGAI' ? 'border-blue-500 ring-2 ring-blue-500/10 text-blue-700 shadow-sm' : 'border-blue-100'} flex items-center justify-center p-2 group-hover:border-blue-300 transition-all shadow-sm`}>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono">JGAI</span>
                </div>
                <span className="text-[9px] text-slate-500 mt-1.5">Predictive AI</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-650 bg-blue-50/40 p-3 rounded-2xl border border-blue-100/60 flex flex-wrap justify-between items-center gap-2">
            <span>💡 Click integration nodes to lock in telemetry and view filtered partner operations.</span>
            {selectedPartner && (
              <button
                onClick={() => setSelectedPartner(null)}
                className="text-blue-600 hover:underline hover:text-blue-700 font-bold ml-2 cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Real-Time Live Security Logs HUD */}
        <div className="col-span-1 lg:col-span-5 flex flex-col bg-white/85 border border-blue-100 rounded-3xl p-6 backdrop-blur-md shadow-sm shadow-blue-500/5">
          <div className="flex items-center justify-between border-b border-blue-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-600" />
              <h2 className="text-xs font-bold tracking-wider text-blue-950">TACTICAL TELEMETRY STREAM</h2>
            </div>
            <span className="text-[9px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-700 px-2.5 py-0.5 rounded-full uppercase font-bold text-xs">
              {selectedPartner ? `Telemetry: ${selectedPartner.split(' ')[0]}` : 'Global Stream'}
            </span>
          </div>

          {/* Scrolling log stack */}
          <div className="flex-1 min-h-[290px] max-h-[300px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
            {filteredThreats.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-400 uppercase tracking-wide">
                No telemetry recorded in current telemetry buffer.
              </div>
            ) : (
              filteredThreats.map((t) => (
                <div
                  key={t.id}
                  className="bg-blue-50/25 border border-blue-100/50 rounded-2xl p-4 text-[11px] font-mono transition-all hover:bg-blue-50/50 hover:border-blue-400/50 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-1 mb-2 bg-white px-2.5 py-1 rounded-xl border border-blue-100/40">
                    <span className="text-blue-600 font-bold">{t.id}</span>
                    <span className="text-slate-500 text-[10px]">{t.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wide ${severityColors[t.severity]}`}>
                      {t.severity}
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-600">
                    <div className="flex items-start gap-1">
                      <span className="text-slate-400 font-medium w-16 shrink-0 select-none uppercase text-[10px] tracking-wide">Threat:</span>
                      <span className="text-slate-900 font-semibold">{t.type}</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-slate-400 font-medium w-16 shrink-0 select-none uppercase text-[10px] tracking-wide">Source:</span>
                      <span className="text-amber-850 break-all text-amber-700">{t.source}</span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="text-slate-400 font-medium w-16 shrink-0 select-none uppercase text-[10px] tracking-wide">Target:</span>
                      <span className="text-slate-600 break-all">{t.target}</span>
                    </div>
                    <div className="flex items-start gap-1 pt-2 border-t border-blue-100/50 mt-2">
                      <span className="text-slate-400 font-medium w-16 shrink-0 select-none uppercase text-[10px] tracking-wide">Mitigated:</span>
                      <span className="text-blue-600 hover:underline cursor-pointer font-bold" onClick={() => setSelectedPartner(t.partnerMatched)}>
                        {t.partnerMatched}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={terminalEndRef} />
          </div>

          <div className="mt-5 pt-3.5 border-t border-blue-100 space-y-3">
            <button
              onClick={onIntegrationsClick}
              className="w-full text-center py-2.5 bg-blue-600 border border-blue-700 hover:bg-blue-700 rounded-full text-xs font-semibold text-white tracking-wide transition-all cursor-pointer shadow-md shadow-blue-600/10"
            >
              EXPLORE ALL {PARTNERS.length} INTEGRATIONS
            </button>
            <button
              onClick={onArchitectClick}
              className="w-full text-center py-2.5 bg-white border border-blue-100 hover:bg-blue-50/50 text-xs font-semibold text-blue-700 tracking-wide transition-all cursor-pointer rounded-full shadow-sm"
            >
              ESTIMATE YOUR ARCHITECTURE COST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
