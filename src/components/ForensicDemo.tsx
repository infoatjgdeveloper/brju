import { useState } from 'react';
import { ForensicStep } from '../types';
import { Terminal, Shield, Play, Lock, FileSearch, RefreshCcw } from 'lucide-react';

const SIMULATION_STEPS: ForensicStep[] = [
  {
    id: 1,
    phase: 'ACQUISITION',
    title: 'Acquire Volatile RAM Dump',
    description: 'In an active breach, files of malicious processes can reside strictly in RAM. We run custom physical extraction kernels to capture memory registers before power-down.',
    toolUsed: 'BRJU Live Forensic Dump tool & MAGNET RAM Capture',
    evidenceType: 'MEM_IMAGE_043.raw (32GB system memory)',
    outcome: 'Discovered high-privileged process running arbitrary code injected into winlogon.exe.'
  },
  {
    id: 2,
    phase: 'STABILIZATION',
    title: 'Create Non-Writable Disk Image',
    description: 'Establish read-only hardware block-write dampers to safely image the primary storage sectors without overwriting single byte metrics.',
    toolUsed: 'MAGNET Axiom & Hardware write-block hubs',
    evidenceType: 'E01 Forensic Disk Archetype',
    outcome: 'Completed raw sector mirror image, verifying identical SHA-256 hash validation logs.'
  },
  {
    id: 3,
    phase: 'DEEP PARSING',
    title: 'Extract Registry Modification Timelines',
    description: 'Construct complete chronology mapping file creation dates, registry modifications, deleted temp folders, and shadow-copy purging commands.',
    toolUsed: 'MAGNET Axiom Analysis console alongside TrendMicro telemetry',
    evidenceType: 'USN Journal & Master File Table (MFT)',
    outcome: 'Isolated automated batch script executing at 03:14:22 UTC with target root administrative overrides.'
  },
  {
    id: 4,
    phase: 'REPORTING',
    title: 'Generate Court-Admissible Forensic Chronology',
    description: 'Synthesize all cryptographic file validation checks, memory-dump maps, and intrusion log chronologies into an immutable legal report format.',
    toolUsed: 'BRJU Forensics Incident Ledger compiler',
    evidenceType: 'Case_Ref_982-DF.pdf',
    outcome: 'Successfully established bulletproof attribution pointing to precise spear-phishing mail delivery vector.'
  }
];

export default function ForensicDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeScenario, setActiveScenario] = useState<'ransomware' | 'dataExfil'>('ransomware');
  const [simRating, setSimRating] = useState<'idle' | 'running' | 'completed'>('idle');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const handleRunAnalysis = () => {
    setSimRating('running');
    setConsoleLogs([]);
    
    const logs = activeScenario === 'ransomware' ? [
      'Initializing BRJU Forensic Core v1.9...',
      'Binding cryptographic read-only blocker to drive partition index /dev/sdb1...',
      'Target System SHA-256 Checksum: c2b8c9a9d77e...',
      'Scanning volatile corrupt system files for later file metadata...',
      'ALERT: Located hidden directory in C:\\Users\\Public\\Roaming\\temp_proc.exe',
      'ALERT: Discovered modified Registry key: HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce',
      'CROSS-REF: Matching behavior with TRENDMICRO Apex Threat Intelligence database...',
      'RESULT: Flagged signature matches WastedLocker Ransomware strain.',
      'Analyzing Memory Core... Root injector identified. Isolating evidence file offsets...',
      'SUCCESS: Cryptographic timeline generated on local sector. Job complete.'
    ] : [
      'Establishing Secure Connection to Target Cloud Office Tenant...',
      'Downloading Azure Directory Audit trails & OpenVPN Client Connection timestamps...',
      'Parsing 1,489 VPN handshakes matching target employee IDs...',
      'ALERT: Discovered VPN administrative connection from IP 45.92.21.10 from non-standard routing node.',
      'ALERT: Cross-referencing against KZero Identity biometrics server logins logs...',
      'RESULT: Non-biometric override verified. FIDO2 login bypassed via phishing session token interception.',
      'SUCCESS: Pinpointed active unauthorized browser cookie session originating from mail relay portal.',
      'Triggered automated token eviction. Target access revoked.'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setConsoleLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setSimRating('completed');
      }
    }, 450);
  };

  const handleResetSim = () => {
    setSimRating('idle');
    setConsoleLogs([]);
  };

  return (
    <div className="space-y-8 animate-fadeIn font-sans">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-100 pb-5">
        <div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block font-mono">// SPECIALIZED TECHNICAL ANALYSIS</span>
          <h2 className="text-2xl font-bold text-text-title uppercase tracking-tight mt-1 flex items-center gap-2">
            <span>FORENSICS & INCIDENT LAB</span>
          </h2>
          <p className="text-xs text-slate-650 mt-1 max-w-3xl leading-relaxed">
            When standard defenses are audited or breached, computer forensics proves what happened, which records were touched, and compiles evidence suitable for court prosecution or insurance payout validation.
          </p>
        </div>
        <div>
          <span className="text-[10px] font-mono bg-rose-50 text-rose-700 border border-rose-200 px-3.5 py-1.5 rounded-full inline-block font-semibold uppercase tracking-wider">
            🚨 MAGNET Forensics Partner Channel
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Playbook Carousel (Progress steps) */}
        <div className="col-span-1 lg:col-span-6 space-y-4">
          <h3 className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase font-mono">// BRJU FORENSIC PLAYBOOK CHRONOLOGY</h3>
          
          <div className="space-y-3">
            {SIMULATION_STEPS.map((step, idx) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  activeStep === idx
                    ? 'border-blue-500/50 bg-blue-50/30 shadow-sm shadow-blue-500/5'
                    : 'border-blue-100 bg-white/40 hover:border-blue-200 hover:bg-blue-50/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full border uppercase font-semibold ${
                    activeStep === idx ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/15 border-blue-200 dark:border-blue-500/30' : 'text-slate-400 bg-slate-950 border-slate-800'
                  }`}>
                    PHASE 0{step.id} — {step.phase}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Click to inspect</span>
                </div>
                
                <h4 className="text-xs font-bold text-blue-950 mt-2.5 tracking-wide">{step.title}</h4>
                
                {activeStep === idx && (
                  <div className="mt-4 pt-3.5 border-t border-blue-100/55 space-y-4 text-xs text-slate-650 animate-slideDown">
                    <p className="leading-relaxed font-normal text-slate-600">{step.description}</p>
                    <div className="grid grid-cols-2 gap-3 text-[10px] bg-white p-4 rounded-xl border border-blue-100/50 shadow-sm">
                      <div>
                        <span className="text-slate-400 block uppercase font-bold text-[9px] mb-0.5 tracking-wider">TOOL UTILIZED:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{step.toolUsed}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block uppercase font-bold text-[9px] mb-0.5 tracking-wider">PRIMARY ARTIFACT:</span>
                        <span className="text-slate-600 break-all">{step.evidenceType}</span>
                      </div>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-2.5">
                      <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-emerald-700 font-bold block text-[10px] uppercase tracking-wider">ANALYZER OUTCOME:</span>
                        <span className="text-slate-700 text-xs font-normal leading-relaxed">{step.outcome}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Investigative Sandbox Console emulator */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-between bg-white/85 border border-blue-100 rounded-3xl p-6 min-h-[460px] relative overflow-hidden backdrop-blur-md shadow-lg shadow-blue-500/5">
          {/* subtle background scanline */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/5 animate-scanline pointer-events-none"></div>

          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="text-blue-600 dark:text-blue-400 w-4 h-4" />
                <span className="text-xs font-bold text-text-title tracking-wider font-mono">// ARTIFACT SCANNER UNIT</span>
              </div>
              
              <div className="flex bg-blue-50 p-1 rounded-full border border-blue-100">
                <button
                  onClick={() => {
                    setActiveScenario('ransomware');
                    handleResetSim();
                  }}
                  className={`px-3 py-1 text-[10px] rounded-full uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    activeScenario === 'ransomware' ? 'bg-blue-600 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-blue-700'
                  }`}
                >
                  Ransomware Injector
                </button>
                <button
                  onClick={() => {
                    setActiveScenario('dataExfil');
                    handleResetSim();
                  }}
                  className={`px-3 py-1 text-[10px] rounded-full uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    activeScenario === 'dataExfil' ? 'bg-blue-600 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-blue-700'
                  }`}
                >
                  Credential Bypass
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950">
                {activeScenario === 'ransomware'
                  ? 'Scenario 01: Multi-Vector Volatile Memory Ransomware Injector'
                  : 'Scenario 02: Unauthorized SaaS Client Credential Bypass'}
              </h4>
              <p className="text-xs text-slate-600 leading-normal font-normal">
                {activeScenario === 'ransomware'
                  ? 'An automated server triggered encryption sequences across corporate local folder shares. We deploy forensic block tools and MAGNET raw captures to find the active memory state offsets.'
                  : 'Critical database records downloaded from remote hosts under staff session keys. We audit identity logs from Cloud environments (M365/Entra, AWS) matched against OpenVPN secure routing records.'}
              </p>
            </div>

            {/* Simulated terminal screen */}
            <div className="bg-slate-950 rounded-2xl border border-slate-900 p-5 min-h-[200px] max-h-[220px] overflow-y-auto space-y-2 font-mono text-[11px] text-emerald-400 shadow-inner shadow-black/40 scrollbar-thin">
              {simRating === 'idle' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-2 text-slate-500 font-sans">
                  <FileSearch className="w-8 h-8 opacity-40 animate-pulse text-blue-500" />
                  <div>
                    <span className="font-bold text-slate-400 block uppercase tracking-wider text-[11px]">Forensic Core Awaiting Launch</span>
                    <span className="text-[10px] text-slate-500 uppercase">Select target scenario above, then execute toolchain analyzer to parse evidence.</span>
                  </div>
                </div>
              ) : (
                <>
                  {consoleLogs.map((log, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-slate-600 select-none mr-2">[{index + 1}]</span>
                      <span className={log.startsWith('ALERT:') ? 'text-rose-400 font-semibold' : log.startsWith('SUCCESS:') ? 'text-sky-300 font-bold' : 'text-emerald-400'}>
                        {log}
                      </span>
                    </div>
                  ))}
                  {simRating === 'running' && (
                    <div className="flex items-center gap-2 text-blue-400 font-bold animate-pulse pt-1">
                      <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>PARSING CRYPTOGRAPHIC SECTORS...</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[10px] text-slate-500 leading-normal max-w-sm font-normal">
              🛠️ Includes core MAGNET Axiom procedures, purposed to yield forensics reports matching state regulatory requirements.
            </span>
            <div className="flex gap-2">
              {simRating !== 'idle' && (
                <button
                  onClick={handleResetSim}
                  className="px-4 py-1.5 border border-border-main hover:bg-bg-adaptive-850 bg-bg-adaptive-900 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full cursor-pointer transition-colors shadow-sm"
                >
                  RESET
                </button>
              )}
              <button
                disabled={simRating === 'running'}
                onClick={handleRunAnalysis}
                className="px-5 py-2 bg-blue-600 border border-blue-700 hover:bg-blue-700 disabled:bg-slate-200 text-white font-bold rounded-full text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10 transition-all uppercase"
              >
                <Play className="w-3.5 h-3.5 text-white fill-white" />
                <span>Execute Forensic Scan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
