import { useState } from 'react';
import Navbar from './components/Navbar';
import ThreatMap from './components/ThreatMap';
import SolutionArchitect from './components/SolutionArchitect';
import ForensicDemo from './components/ForensicDemo';
import HardwareStore from './components/HardwareStore';
import ContactPortal from './components/ContactPortal';
import ConnectedDotsBackground from './components/ConnectedDotsBackground';
import ChatWidget from './components/ChatWidget';
import { PARTNERS } from './data/partners';
import {
  ShieldAlert, ShieldCheck, Terminal, Filter, Search, Check,
  ArrowUpRight, Cpu, Radio, Network, FileClock, PhoneCall, Award
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [proposalDraftMessage, setProposalDraftMessage] = useState('');
  const [emergencyActive, setEmergencyActive] = useState(false);

  // Filter Categories mappings
  const categories = [
    'All', 'Security', 'Network', 'Identity', 'Communication', 'Hardware', 'Business Systems', 'Forensics'
  ];

  const handleApplyArchitectPlan = (proposedDraft: string) => {
    setProposalDraftMessage(proposedDraft);
    setActiveTab('contact');
  };

  const handleEmergencyTrigger = () => {
    setEmergencyActive(true);
    setActiveTab('contact');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Filter the core 17 partners based on search query plus category matches
  const filteredPartners = PARTNERS.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || partner.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950/5 flex flex-col selection:bg-blue-500/20 selection:text-blue-900 antialiased relative">
      {/* Dynamic Background of Animated Particle Connected Tunnels */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ConnectedDotsBackground />
      </div>

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onEmergencyTrigger={handleEmergencyTrigger}
      />

      {/* Cybernetic Grid Background Header Cover - Modern High-End Layout */}
      <div className="relative pt-32 pb-16 bg-gradient-to-b from-blue-50/20 to-white overflow-hidden border-b border-blue-100 z-10">
        {/* Soft elegant glows and premium tech grid */}
        <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] glow-spot-indigo pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-[300px] h-[300px] glow-spot-emerald opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-blue-700 tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Enterprise NIST Compliant MSP Consortium</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-blue-950">
                BRJU <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800 bg-clip-text text-transparent">INFOSEC</span>
              </h1>

              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
                Autonomous Cybersecurity, Deep Memory Forensics, and Enterprise Managed Solutions.
                We orchestrate and safeguard <span className="text-blue-900 font-bold">{PARTNERS.length} high-end cloud and physical integrations</span> into a single, unified corporate shield.
              </p>
            </div>

            {/* Quick KPIs Grid - Bento Boxes style */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 shrink-0">
              <div className="bg-white/80 border border-blue-100/70 p-5 rounded-2xl flex flex-col justify-between backdrop-blur-md min-w-[150px] shadow-sm shadow-blue-500/5">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block">Vendor Stack</span>
                <span className="text-2xl font-bold text-blue-950 mt-1.5">{PARTNERS.length} Core Systems</span>
              </div>
              <div className="bg-white/80 border border-blue-100/70 p-5 rounded-2xl flex flex-col justify-between backdrop-blur-md min-w-[150px] shadow-sm shadow-blue-500/5">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block">SOC Security</span>
                <span className="text-emerald-600 text-sm font-bold flex items-center gap-2 mt-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                  Active 24/7
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white/80 border border-blue-100/70 p-5 rounded-2xl flex flex-col justify-between backdrop-blur-md min-w-[150px] shadow-sm shadow-blue-500/5">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block">Guaranteed SLA</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mt-1.5">99.98%</span>
              </div>
            </div>
          </div>

          {/* Scrolling Compliance Ticker Banner */}
          <div className="border-t border-blue-100 pt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="font-semibold text-slate-500">Compliance Alignments Accredited:</span>
            <div className="flex flex-wrap gap-5 text-blue-600 font-semibold">
              {/* <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-blue-600"></span> NIST SP 800-171</span> */}
              {/* <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-blue-600"></span> FIDO2 MFA</span> */}
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-blue-600"></span> HIPAA Protected</span>
              {/* <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-blue-600"></span> SOC 2 Type II</span> */}
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-blue-600"></span> GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container Stage */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 relative z-10">

        {/* VIEW CONDITIONAL RENDERS */}
        {activeTab === 'overview' && (
          <div className="space-y-16">
            {/* Live Interactive Map simulation (Main Visual) */}
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-blue-100 pb-3.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 font-mono tracking-wider">// Tactical Monitor Console</span>
                <h3 className="text-xl font-bold tracking-tight text-blue-950 mt-1">Global Threat & Telemetry Command</h3>
              </div>
              <ThreatMap
                onIntegrationsClick={() => setActiveTab('partners')}
                onArchitectClick={() => setActiveTab('architect')}
              />
            </div>

            {/* Quick MSP Value Pitch Grid */}
            <div className="space-y-8">
              <div className="border-b border-blue-100 pb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 font-mono tracking-wider">// Unified Multi-Layer Defense</span>
                <h3 className="text-2xl font-bold tracking-tight text-blue-950 mt-1">The BRJU Infosec Strategic Difference</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="premium-card p-6 rounded-2xl space-y-4 hover:translate-y-[-2px] transition-all relative overflow-hidden group">
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 rounded-xl">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <h4 className="text-base font-bold text-blue-950 leading-tight">Continuous Threat Telemetry SOC</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Rather than operating in isolation, we feed diagnostic firewall logs from Checkpoint, email sandboxing flags from Proofpoint, and identity tokens from KZero directly into our custom JGAI AI analyzer models.
                  </p>
                </div>

                <div className="premium-card p-6 rounded-2xl space-y-4 hover:translate-y-[-2px] transition-all relative overflow-hidden group">
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 rounded-xl">
                    <FileClock className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-blue-950 leading-tight">Specialized Computer Forensics</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Most standard MSP houses restore from cloud backups and reset passwords immediately. We preserve evidence, perform physical memory RAM captures, and compile court-admissible chronologies using MAGNET Forensics Axiom.
                  </p>
                </div>

                <div className="premium-card p-6 rounded-2xl space-y-4 hover:translate-y-[-2px] transition-all relative overflow-hidden group">
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 rounded-xl">
                    <Network className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-blue-950 leading-tight">Unified Multi-Vendor Integrator</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    We do not play favorites or lock you into single-vendor silos. We manage, audit, and sell support services across {PARTNERS.length} distinct technologies, including Odoo ERP, OpenVPN connections, and warranted refurbished systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Integrations Header with category tabs */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-blue-100 pb-6">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 font-mono block">// Ecosystem Matrix</span>
                  <h3 className="text-2xl font-bold tracking-tight text-blue-950 mt-1">{PARTNERS.length} Strategic Platform Partnerships</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    We sell, custom-engineer, and manage these systems natively. Select target categories to review specific integration features and active statuses.
                  </p>
                </div>

                {/* Search Bar matching key values */}
                <div className="relative w-full md:w-80">
                  <span className="absolute left-3.5 top-3.5 text-slate-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stack (e.g., Odoo, Vircom)..."
                    className="w-full bg-white/85 border border-blue-100 hover:border-blue-200 rounded-xl px-4 py-2.5 pl-10 text-xs font-mono text-blue-950 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-3.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Categorization tabs navigation row */}
              <div className="flex flex-wrap gap-2.5 pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-[11px] font-semibold border tracking-wide transition-all uppercase cursor-pointer ${selectedCategory === cat
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-700 font-bold shadow-sm shadow-blue-500/5'
                        : 'border-blue-100/50 bg-white/60 text-slate-600 hover:text-blue-700 hover:bg-blue-50/50'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Partners */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.length === 0 ? (
                <div className="col-span-full text-center py-24 premium-card rounded-2xl">
                  <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-sm font-medium text-slate-600">No partner match identified in ecosystem for query "{searchQuery}".</p>
                </div>
              ) : (
                filteredPartners.map((p) => {
                  const isProcess = p.status === 'in-progress';
                  const isUpcoming = p.status === 'planned';
                  return (
                    <div
                      key={p.id}
                      className="premium-card rounded-2xl p-6 flex flex-col justify-between hover:translate-y-[-2px] transition-all relative overflow-hidden group shadow-md"
                    >
                      <div className="space-y-5">
                        <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                          {p.website ? (
                            <a
                              href={p.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-bold text-blue-950 hover:text-blue-600 transition-colors flex items-center gap-1 group/link"
                            >
                              <span>{p.name}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-blue-600 transition-colors" />
                            </a>
                          ) : (
                            <span className="text-sm font-bold text-blue-950 group-hover:text-blue-600 transition-colors">
                              {p.name}
                            </span>
                          )}

                          {/* status tags */}
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                              {p.category}
                            </span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase border ${isProcess
                                ? 'text-amber-700 bg-amber-50 border-amber-200'
                                : isUpcoming
                                  ? 'text-slate-600 bg-slate-50 border-slate-200'
                                  : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                              }`}>
                              {p.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed font-normal min-h-[45px]">
                          {p.description}
                        </p>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-semibold text-blue-900/60 block uppercase tracking-wider">// Support Level & Integration Span</span>
                          <p className="text-xs text-slate-700 bg-blue-50/20 p-3 rounded-xl border border-blue-100/50 leading-relaxed italic font-normal">
                            "{p.brjuValue}"
                          </p>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-semibold text-blue-900/60 block uppercase tracking-wider">// Core Coverage Standard</span>
                          <div className="space-y-1.5 text-xs text-slate-600">
                            {p.features.map((f, i) => (
                              <div key={i} className="flex items-start gap-2 text-slate-600 font-normal">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 uppercase font-mono text-[9px]">ID: {p.id.toUpperCase()}</span>
                          {p.website && (
                            <a
                              href={p.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[9px] text-blue-500 hover:text-blue-700 font-mono flex items-center gap-0.5 hover:underline"
                            >
                              <span>[Visit Site]</span>
                            </a>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setProposalDraftMessage(`Hi BRJU Infosec,\nI would like more information on installing and managing the ${p.name} integration.`);
                            setActiveTab('contact');
                          }}
                          className="text-blue-600 hover:text-blue-800 font-semibold tracking-wide flex items-center gap-1 transition-all group/btn cursor-pointer"
                        >
                          <span>Request Intel</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-all group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {activeTab === 'architect' && (
          <SolutionArchitect onContactFormRedirect={handleApplyArchitectPlan} />
        )}

        {activeTab === 'forensic' && (
          <ForensicDemo />
        )}

        {activeTab === 'hardware' && (
          <HardwareStore />
        )}

        {activeTab === 'contact' && (
          <ContactPortal
            initialMessageMessage={proposalDraftMessage}
            emergencyActive={emergencyActive}
            setEmergencyActive={setEmergencyActive}
          />
        )}
      </main>

      {/* Main Footer Block */}
      <footer className="bg-slate-900/5 backdrop-blur-sm border-t border-blue-100 py-12 mt-16 text-slate-500 font-mono text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3.5 md:col-span-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded border border-blue-500/20 flex items-center justify-center text-blue-600">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-sm font-extrabold tracking-widest text-blue-950">BRJU INFOSEC</span>
              </div>
              <p className="text-[11px] text-slate-600 max-w-sm leading-relaxed">
                Premium multi-vendor Managed Service Provider offering deep analytical forensics, certified IT hardware procurement, and secure voice environments. Registered incident code CIRT-9923.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-blue-950 block uppercase tracking-wider mb-2.5">Operations Centers</span>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li className="hover:text-blue-700 cursor-pointer">Security Center</li>
                <li className="hover:text-blue-700 cursor-pointer">Hardware Depot</li>
                <li className="hover:text-blue-700 cursor-pointer">Forensics Labs</li>
                <li className="hover:text-blue-700 cursor-pointer">Support Desk</li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-bold text-blue-950 block uppercase tracking-wider mb-2.5">Inbound Red Triage</span>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li className="text-rose-600 font-bold hover:underline cursor-pointer flex items-center space-x-1" onClick={handleEmergencyTrigger}>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block animate-ping"></span>
                  <span>Escalate Incident</span>
                </li>
                <li>Call: +1 (800) BRJU-SEC</li>
                <li className="text-[10px]">90-Sec Automated Route</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
            <span>© 2026 BRJU Infosec MSP Consortium. All proprietary rights reserved.</span>
            <div className="flex flex-wrap gap-4">
              <span>Third-party product logos referenced herein hold registered copyrights of respective patent holders.</span>
            </div>
          </div>

        </div>
      </footer>
      <ChatWidget />
    </div>
  );
}
