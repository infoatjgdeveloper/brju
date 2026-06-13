import { useState } from 'react';
import { PARTNERS } from '../data/partners';
import { Shield, Sparkles, Building2, Terminal, CheckCircle2, ChevronRight, Server, UserCheck } from 'lucide-react';

interface SolutionArchitectProps {
  onContactFormRedirect: (customMessage: string) => void;
}

export default function SolutionArchitect({ onContactFormRedirect }: SolutionArchitectProps) {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState('regulatory-nist');
  const [seats, setSeats] = useState<'small' | 'medium' | 'enterprise'>('small');
  
  // Selected subsystems
  const [systems, setSystems] = useState({
    erp: true,
    email: true,
    voip: false,
    remote: true,
    firewall: true,
    hardware: false,
    forensics: false,
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [proposalId, setProposalId] = useState('');

  const handleSystemToggle = (key: keyof typeof systems) => {
    setSystems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Pricing calculator engine based on parameters
  const calculateEstimate = () => {
    let basePerSeatPrice = 120; // Default Core standard pricing per seat
    if (industry === 'regulatory-nist') basePerSeatPrice = 180; // NIST compliance audits and strict policies cost more
    if (industry === 'regulatory-hipaa') basePerSeatPrice = 150; // HIPAA medical compliance layers

    let seatMultiplier = 15;
    if (seats === 'medium') seatMultiplier = 60;
    if (seats === 'enterprise') seatMultiplier = 250;

    let subtotal = basePerSeatPrice * seatMultiplier;

    // Add modular components flat rates
    if (systems.erp) subtotal += 450;
    if (systems.email) subtotal += 250;
    if (systems.voip) subtotal += 350;
    if (systems.remote) subtotal += 300;
    if (systems.firewall) subtotal += 500;
    if (systems.hardware) subtotal += 800; // provisioning layer
    if (systems.forensics) subtotal += 600; // retainers

    return {
      monthly: Math.floor(subtotal),
      seatCount: seatMultiplier,
      perSeatPrice: basePerSeatPrice,
    };
  };

  const currentPricing = calculateEstimate();

  // Pick which partners apply to this configuration
  const getDeployedPartners = () => {
    const list: string[] = ['jgai']; // JGAI is core AI for all
    if (systems.erp) list.push('odoo');
    if (systems.email) list.push('proofpoint');
    if (systems.voip) {
      list.push('nuso');
      list.push('ooma');
    }
    if (systems.remote) {
      list.push('kzero');
      list.push('openvpn');
      list.push('microsoft');
      list.push('aws');
    }
    if (systems.firewall) {
      list.push('checkpoint');
      list.push('solarwinds');
      list.push('kaseya');
    }
    if (systems.hardware) {
      list.push('refurbish_it');
      list.push('new_it');
      list.push('ugreen');
    }
    if (systems.forensics) {
      list.push('magnet_forensics');
    }
    return PARTNERS.filter(p => list.includes(p.id));
  };

  const deployedPartners = getDeployedPartners();

  const handleGenerateProposal = () => {
    const randId = `BRJU-PROP-${Math.floor(Math.random() * 90000) + 10000}`;
    setProposalId(randId);
    setHasSubmitted(true);
  };

  const handleLaunchInboundMessage = () => {
    const activeSelectedSystems = Object.keys(systems)
      .filter(k => systems[k as keyof typeof systems])
      .map(k => k.toUpperCase())
      .join(', ');

    const msg = `Hi BRJU Infosec Sales Team,\nI just finished generating customized proposal ${proposalId} on your site's Solution Architect.\n\nSector: ${industry.replace('regulatory-', '').toUpperCase()}\nSeats Scale: ${seats.toUpperCase()} (${currentPricing.seatCount} projected nodes)\nSubsystems Requested: ${activeSelectedSystems}\nProjected Monthly Range: $${currentPricing.monthly.toLocaleString()}/mo\n\nPlease reach out to arrange an audit of our primary infrastructure.`;
    
    onContactFormRedirect(msg);
  };

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-3xl overflow-hidden relative shadow-lg shadow-blue-500/5 border border-blue-100 font-sans">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 blur-[100px] pointer-events-none"></div>

      <div className="bg-blue-50/40 p-6 border-b border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold tracking-widest text-blue-600 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>MSP STRUCTURAL SOLUTION ARCHITECT</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Build your secure enterprise baseline stack. Real-time partner mapping and continuous cost auditing.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-700 px-3 py-1 rounded-full uppercase font-semibold">
            v3.4 Automated System
          </span>
        </div>
      </div>

      <div className="p-6">
        {!hasSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Step-by-Step Configurator Controls */}
            <div className="col-span-1 lg:col-span-7 space-y-6">
              {/* Step indicator pills */}
              <div className="flex border-b border-blue-100 pb-4">
                <button
                  onClick={() => setStep(1)}
                  className={`flex-1 text-center py-2.5 text-xs font-semibold border-b-2 tracking-wider transition-colors cursor-pointer uppercase ${
                    step === 1 ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-500 hover:text-blue-600'
                  }`}
                >
                  01. REGULATORY BASIS
                </button>
                <button
                  onClick={() => setStep(2)}
                  className={`flex-1 text-center py-2.5 text-xs font-semibold border-b-2 tracking-wider transition-colors cursor-pointer uppercase ${
                    step === 2 ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-500 hover:text-blue-600'
                  }`}
                >
                  02. TARGET SIZE
                </button>
                <button
                  onClick={() => setStep(3)}
                  className={`flex-1 text-center py-2.5 text-xs font-semibold border-b-2 tracking-wider transition-colors cursor-pointer uppercase ${
                    step === 3 ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-500 hover:text-blue-600'
                  }`}
                >
                  03. CORE SUBSYSTEMS
                </button>
              </div>

              {/* Step 1 Content: Industry Sector Selection */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">// Select Governance Basis or Guideline:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setIndustry('regulatory-nist')}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all ${
                        industry === 'regulatory-nist'
                          ? 'border-blue-500/50 bg-blue-50/60 shadow-sm shadow-blue-500/5'
                          : 'border-blue-100 bg-white/50 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-950">NIST SP 800-171 Defense Compliance</span>
                        {industry === 'regulatory-nist' && <CheckCircle2 className="w-4 h-4 text-blue-600 animate-scaleIn" />}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                        Imposes high-grade storage systems, physical hardware chain-of-custodians, and MAGNET forensic preservation mandates.
                      </p>
                    </div>

                    <div
                      onClick={() => setIndustry('regulatory-hipaa')}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all ${
                        industry === 'regulatory-hipaa'
                          ? 'border-blue-500/50 bg-blue-50/60 shadow-sm shadow-blue-500/5'
                          : 'border-blue-100 bg-white/50 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-950">HIPAA Healthcare Shielding</span>
                        {industry === 'regulatory-hipaa' && <CheckCircle2 className="w-4 h-4 text-blue-600 animate-scaleIn" />}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                        Focuses heavily on encrypted Odoo data stores, secure e-prescribe tunnels, and KZero biometric ID loops.
                      </p>
                    </div>

                    <div
                      onClick={() => setIndustry('regulatory-general')}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all ${
                        industry === 'regulatory-general'
                          ? 'border-blue-500/50 bg-blue-50/60 shadow-sm shadow-blue-500/5'
                          : 'border-blue-100 bg-white/50 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-950">FIDO2 Commercial Baseline</span>
                        {industry === 'regulatory-general' && <CheckCircle2 className="w-4 h-4 text-blue-600 animate-scaleIn" />}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                        Enforces comprehensive SSO protection controls, secure unified VOIP terminals, and basic packet routers.
                      </p>
                    </div>

                    <div
                      onClick={() => setIndustry('regulatory-essential')}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all ${
                        industry === 'regulatory-essential'
                          ? 'border-blue-500/50 bg-blue-50/60 shadow-sm shadow-blue-500/5'
                          : 'border-blue-100 bg-white/50 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-950">Essential Business Protection</span>
                        {industry === 'regulatory-essential' && <CheckCircle2 className="w-4 h-4 text-blue-600 animate-scaleIn" />}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                        Standard network security layers suited for companies looking to lock down primary portals and email.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 bg-blue-50 border border-blue-200 hover:border-blue-400 hover:bg-blue-100/50 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1.5 cursor-pointer uppercase transition-all shadow-sm"
                    >
                      <span>Next Parameters</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 Content: Scalability Seats Tier */}
              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">// Select Target Seat Scale:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                      onClick={() => setSeats('small')}
                      className={`cursor-pointer p-5 rounded-2xl border text-center transition-all ${
                        seats === 'small'
                          ? 'border-blue-500/50 bg-blue-50/60 shadow-sm shadow-blue-500/5'
                          : 'border-blue-100 bg-white/50 hover:border-blue-350'
                      }`}
                    >
                      <Building2 className="w-7 h-7 text-blue-600 mx-auto mb-3" />
                      <div className="text-xs font-bold text-blue-950 uppercase tracking-wider">1 - 20 Employees</div>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed font-normal">
                        Core coverage with priority helpdesk triage paths.
                      </p>
                    </div>

                    <div
                      onClick={() => setSeats('medium')}
                      className={`cursor-pointer p-5 rounded-2xl border text-center transition-all ${
                        seats === 'medium'
                          ? 'border-blue-500/50 bg-blue-50/60 shadow-sm shadow-blue-500/5'
                          : 'border-blue-100 bg-white/50 hover:border-blue-350'
                      }`}
                    >
                      <Server className="w-7 h-7 text-blue-600 mx-auto mb-3" />
                      <div className="text-xs font-bold text-blue-950 uppercase tracking-wider">21 - 100 Employees</div>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed font-normal">
                        Full operations monitoring, integrated RMM patching, and quarterly sweeps.
                      </p>
                    </div>

                    <div
                      onClick={() => setSeats('enterprise')}
                      className={`cursor-pointer p-5 rounded-2xl border text-center transition-all ${
                        seats === 'enterprise'
                          ? 'border-blue-500/50 bg-blue-50/60 shadow-sm shadow-blue-500/5'
                          : 'border-blue-100 bg-white/50 hover:border-blue-350'
                      }`}
                    >
                      <UserCheck className="w-7 h-7 text-blue-600 mx-auto mb-3" />
                      <div className="text-xs font-bold text-blue-950 uppercase tracking-wider">101 - 500+ Enterprise</div>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed font-normal">
                        Dedicated vCISO allocation, intrusion red teaming, and MAGNET forensic retainer.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-2 border border-blue-100 hover:bg-blue-50 text-slate-650 text-xs rounded-full cursor-pointer uppercase transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 bg-blue-50 border border-blue-200 hover:border-blue-400 hover:bg-blue-100/50 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1.5 cursor-pointer uppercase transition-all shadow-sm"
                    >
                      <span>Next Parameters</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 Content: Toggle active business requirements */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">// Configure Component Requirements:</h3>
                  <div className="space-y-3">
                    <div
                      onClick={() => handleSystemToggle('erp')}
                      className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-white/50 hover:border-blue-400/50 cursor-pointer transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="checkbox"
                          checked={systems.erp}
                          readOnly
                          className="rounded border-blue-200 text-blue-600 focus:ring-0 bg-white w-4 h-4 pointer-events-none"
                        />
                        <div>
                          <div className="text-xs font-semibold text-blue-950">Custom Hardened Odoo ERP/CRM Suite</div>
                          <p className="text-[11px] text-slate-600 font-normal">Integrated database structure, secure sales logs, accounts tracking validation.</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-600/70 font-mono tracking-wider shrink-0">// Odoo ERP</span>
                    </div>

                    <div
                      onClick={() => handleSystemToggle('email')}
                      className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-white/50 hover:border-blue-400/50 cursor-pointer transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="checkbox"
                          checked={systems.email}
                          readOnly
                          className="rounded border-blue-200 text-blue-600 focus:ring-0 bg-white w-4 h-4 pointer-events-none"
                        />
                        <div>
                          <div className="text-xs font-semibold text-blue-950">Advanced Email Sanitization Gateway</div>
                          <p className="text-[11px] text-slate-600 font-normal">Reroute organizational mx records to scan and contain inbound phishing payloads.</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-600/70 font-mono tracking-wider shrink-0">// Proofpoint</span>
                    </div>

                    <div
                      onClick={() => handleSystemToggle('voip')}
                      className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-white/50 hover:border-blue-400/50 cursor-pointer transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="checkbox"
                          checked={systems.voip}
                          readOnly
                          className="rounded border-blue-200 text-blue-600 focus:ring-0 bg-white w-4 h-4 pointer-events-none"
                        />
                        <div>
                          <div className="text-xs font-semibold text-blue-950">Secure Encrypted Unified Voice/VoIP Solutions</div>
                          <p className="text-[11px] text-slate-600 font-normal">Cloud-hosted telephone endpoints, physical handsets mapping, caller SIP validation.</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-600/70 font-mono tracking-wider shrink-0">// NUSO & Ooma</span>
                    </div>

                    <div
                      onClick={() => handleSystemToggle('remote')}
                      className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-white/50 hover:border-blue-400/50 cursor-pointer transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="checkbox"
                          checked={systems.remote}
                          readOnly
                          className="rounded border-blue-200 text-blue-600 focus:ring-0 bg-white w-4 h-4 pointer-events-none"
                        />
                        <div>
                          <div className="text-xs font-semibold text-blue-950">Zero Trust Secure Remote Access Suite</div>
                          <p className="text-[11px] text-slate-600 font-normal">Establish encrypted OpenVPN tunnels combined with KZero biometric MFA & Azure ID.</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-600/70 font-mono tracking-wider shrink-0">// Trust Network</span>
                    </div>

                    <div
                      onClick={() => handleSystemToggle('firewall')}
                      className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-white/50 hover:border-blue-400/50 cursor-pointer transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="checkbox"
                          checked={systems.firewall}
                          readOnly
                          className="rounded border-blue-200 text-blue-600 focus:ring-0 bg-white w-4 h-4 pointer-events-none"
                        />
                        <div>
                          <div className="text-xs font-semibold text-blue-950">Boundary Firewall & RMM Patching Infrastructure</div>
                          <p className="text-[11px] text-slate-600 font-normal">Checkpoint next-gen state filters backed by SolarWinds configurations monitoring.</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-600/70 font-mono tracking-wider shrink-0">// SecOps Stack</span>
                    </div>

                    <div
                      onClick={() => handleSystemToggle('hardware')}
                      className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-white/50 hover:border-blue-400/50 cursor-pointer transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="checkbox"
                          checked={systems.hardware}
                          readOnly
                          className="rounded border-blue-200 text-blue-600 focus:ring-0 bg-white w-4 h-4 pointer-events-none"
                        />
                        <div>
                          <div className="text-xs font-semibold text-blue-950">Pre-Hardened IT Hardware Provisioning</div>
                          <p className="text-[11px] text-slate-600 font-normal">Provide warrantied refurbished or brand-new office machines audited by BRJU agents.</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-600/70 font-mono tracking-wider shrink-0">// Procurement</span>
                    </div>

                    <div
                      onClick={() => handleSystemToggle('forensics')}
                      className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-white/50 hover:border-blue-400/50 cursor-pointer transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="checkbox"
                          checked={systems.forensics}
                          readOnly
                          className="rounded border-blue-200 text-blue-600 focus:ring-0 bg-white w-4 h-4 pointer-events-none"
                        />
                        <div>
                          <div className="text-xs font-semibold text-blue-950">Incident Response & Incident Forensic Retainer</div>
                          <p className="text-[11px] text-slate-600 font-normal">Guaranteed 2-hour response window during active breaches using specialized MAGNET toolsets.</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-600/70 font-mono tracking-wider shrink-0">// Forensic Wing</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="px-4 py-2 border border-blue-100 hover:bg-blue-50 text-slate-650 text-xs rounded-full cursor-pointer uppercase transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleGenerateProposal}
                      className="px-6 py-2.5 bg-blue-600 border border-blue-700 hover:bg-blue-700 text-white font-bold text-xs rounded-full flex items-center gap-2 shadow-md shadow-blue-500/10 tracking-wider cursor-pointer transition-all"
                    >
                      <Shield className="w-4 h-4" />
                      <span>GENERATE BLUEPRINT</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Live Pricing & Summary HUD panel (Right Box) */}
            <div className="col-span-1 lg:col-span-12 xl:col-span-12 lg:col-start-1 bg-blue-50/50 rounded-2xl p-6 border border-blue-100 shadow-sm flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">// SYSTEM ARCHITECTURE SPEC</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-650">Industry governance:</span>
                    <span className="text-blue-950 capitalize font-bold">{industry.replace('regulatory-', '')} compliance</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-650">Node user volume:</span>
                    <span className="text-blue-600 font-bold">{currentPricing.seatCount} Active Nodes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-650">Base SLA Tier Rate:</span>
                    <span className="text-blue-950 font-medium">${currentPricing.perSeatPrice} / node</span>
                  </div>
                </div>

                <div className="bg-white border border-blue-100 p-5 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="text-[10px] text-slate-500 tracking-wider uppercase font-semibold">// Projected Monthly Rate</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-blue-950 tracking-tight">${currentPricing.monthly.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal mt-1 italic">
                    *Excludes hardware acquisitions, subject to physical architecture sweeps.
                  </p>
                </div>

                {/* Animated lists of deployed Partner badges */}
                <div className="space-y-2.5">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">// Consolidated Vendor Shields:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {deployedPartners.map(p => (
                      <span
                        key={p.id}
                        className={`text-[10px] px-2.5 py-0.5 rounded-full border uppercase font-medium ${
                          p.status === 'active'
                            ? 'text-emerald-700 bg-emerald-50 border-emerald-250'
                            : p.status === 'in-progress'
                            ? 'text-amber-700 bg-amber-50 border-amber-250'
                            : 'text-slate-600 bg-white border-blue-100'
                        }`}
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-100">
                <div className="text-xs text-slate-600 leading-relaxed font-normal">
                  Our unified platform integrates these high-end cloud systems, managing automated firewall protocols natively so you stay 100% compliant.
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Proposed Success Sheet */
          <div className="p-4 sm:p-8 text-center space-y-6 max-w-2xl mx-auto animate-fadeIn uppercase font-sans">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-550 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] text-emerald-700 tracking-wider block font-bold">// MSP DEPLOYMENT KEY GENERATED</span>
              <h3 className="text-2xl font-bold text-blue-950 tracking-wide">{proposalId}</h3>
              <p className="text-xs text-slate-600 normal-case leading-relaxed font-normal">
                A custom security architecture blueprint proposal has been compiled for your enterprise.
              </p>
            </div>

            <div className="bg-white border border-blue-100 p-6 rounded-2xl text-left space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 border-b border-blue-100 pb-3">
                <Terminal className="text-blue-600 w-4 h-4" />
                <span>SPECIFICATION METRIC CHECKSUMS</span>
              </div>
              <ul className="text-xs text-slate-650 space-y-2.5 font-normal lowercase normal-case">
                <li className="flex items-start gap-2"><span className="text-blue-600 font-mono tracking-wider font-bold">// 01:</span> <span>Primary Core System: BRJU Anomaly Heuristics (JGAI AI-Engine Enabled)</span></li>
                <li className="flex items-start gap-2"><span className="text-blue-600 font-mono tracking-wider font-bold">// 02:</span> <span>Perimeter Filtration: Checkpoint Firewalls + Proofpoint SaaS Clean Gateways</span></li>
                <li className="flex items-start gap-2"><span className="text-blue-600 font-mono tracking-wider font-bold">// 03:</span> <span>Staff Count Enrolled: {currentPricing.seatCount} Dedicated Identity Nodes</span></li>
                <li className="flex items-start gap-2"><span className="text-blue-600 font-mono tracking-wider font-bold">// 04:</span> <span>Monthly Quote Bracket: ${currentPricing.monthly.toLocaleString()} USD / mo</span></li>
                <li className="flex items-start gap-2"><span className="text-blue-600 font-mono tracking-wider font-bold">// 05:</span> <span>SLA integrations: {deployedPartners.length} vendor software interfaces authorized</span></li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleLaunchInboundMessage}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-full tracking-wider cursor-pointer transition-all uppercase shadow-md shadow-blue-500/15"
              >
                Request Design Review
              </button>
              <button
                onClick={() => {
                  setHasSubmitted(false);
                  setStep(1);
                }}
                className="w-full sm:w-auto px-6 py-2 border border-blue-100 hover:bg-blue-50 text-blue-700 text-xs rounded-full cursor-pointer transition-colors uppercase"
              >
                Re-Architect Matrix
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
