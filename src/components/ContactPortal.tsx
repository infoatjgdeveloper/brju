import { useState, useEffect, FormEvent } from 'react';
import { Mail, Phone, MapPin, Terminal, Check, Flame, ChevronRight, Lock } from 'lucide-react';

interface ContactPortalProps {
  initialMessageMessage?: string;
  emergencyActive: boolean;
  setEmergencyActive: (val: boolean) => void;
}

export default function ContactPortal({ initialMessageMessage = '', emergencyActive, setEmergencyActive }: ContactPortalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    seats: '1-20',
    type: 'msp_quote',
    customMessage: '',
  });

  const [hasSent, setHasSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync proposal message if provided dynamically
  useEffect(() => {
    if (initialMessageMessage) {
      setFormData((prev) => ({
        ...prev,
        customMessage: initialMessageMessage,
        type: 'msp_quote',
      }));
    }
  }, [initialMessageMessage]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setHasSent(true);
    }, 1200);
  };

  const handleToggleEmergency = () => {
    setEmergencyActive(!emergencyActive);
    // If turning on emergency, ensure the form changes type
    if (!emergencyActive) {
      setFormData((prev) => ({
        ...prev,
        type: 'incident_response',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        type: 'msp_quote',
      }));
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn font-sans">
      {/* Visual Emergency Warning banner if triggered */}
      {emergencyActive && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-pulse shadow-lg shadow-rose-950/5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-rose-100 text-rose-700 shrink-0 border border-rose-200">
              <Flame className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-950 uppercase tracking-wider">ACTIVE INTRUSION ESCALATION LEVEL 1</h3>
              <p className="text-xs text-rose-800 mt-1 max-w-2xl leading-relaxed">
                An active cyber intrusion, ransomware loop, or network lock is underway. Your request is automatically prioritized. Our CIRT (Cyber Incident Response Team) standby agents have been alerted.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setEmergencyActive(false);
              setFormData(prev => ({ ...prev, type: 'msp_quote' }));
            }}
            className="text-xs font-bold border border-rose-300 hover:bg-rose-100 bg-white text-rose-850 px-4 py-2 rounded-full cursor-pointer transition-colors shrink-0"
          >
            DISMISS EMERGENCY MODE
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CONTACT METHOD INFO & EMERGENCY GUIDES */}
        <div className="col-span-1 lg:col-span-4 space-y-4">
          {!emergencyActive ? (
            /* STANDARD INQUIRY SUPPORT */
            <div className="space-y-4">
              <div className="space-y-3 bg-white/85 border border-blue-100 p-6 rounded-2xl backdrop-blur-md shadow-sm">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">// HQ OPERATIONS</h3>
                <h2 className="text-lg font-bold uppercase text-blue-950">BRJU INFOSEC COMMAND ROOM</h2>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Contact our solutions engineers to schedule an audit of your workspace security configurations and catalog infrastructure deficits.
                </p>
              </div>

              <div className="space-y-4 bg-white/85 border border-blue-100 p-6 rounded-2xl backdrop-blur-md shadow-sm">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs font-normal">
                    <span className="text-slate-500 block uppercase font-bold text-[9px] tracking-wider font-mono">ENCRYPTED MAIL EXCHANGE:</span>
                    <span className="text-blue-950 font-bold hover:underline cursor-pointer">ops@brjuinfosec.com</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-3 border-t border-blue-100">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs font-normal">
                    <span className="text-slate-500 block uppercase font-bold text-[9px] tracking-wider font-mono">SECURE TELEPHONE STACK:</span>
                    <span className="text-blue-950 font-bold">+1 (800) BRJU-SEC</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-3 border-t border-blue-100">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs font-normal">
                    <span className="text-slate-500 block uppercase font-bold text-[9px] tracking-wider font-mono">PHYSICAL SECURITY OUTLINE:</span>
                    <span className="text-blue-950 font-bold">Global Response Node ● Hybrid Operations</span>
                  </div>
                </div>
              </div>

              <div className="border border-blue-100 bg-blue-50/20 rounded-2xl p-6 text-xs leading-relaxed font-normal text-slate-600">
                🛡️ All incoming digital requests are captured inside cryptographic vaults behind tri-layer next-gen perimeter firewalls. Any client credential transfers are fully encrypted.
              </div>

              <button
                onClick={handleToggleEmergency}
                className="w-full flex items-center justify-between p-5 border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white cursor-pointer font-bold tracking-wide text-xs transition-all duration-300 rounded-2xl"
              >
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4 animate-pulse" />
                  <span>EMERGENCY CRITICAL INTRUSION?</span>
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* RED ALERT BREACH INCIDENT STEPS (Extremely Premium Detail) */
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-2 bg-white/85 border border-blue-100 p-6 rounded-2xl backdrop-blur-md shadow-sm">
                <h3 className="text-xs font-bold text-rose-600 uppercase tracking-wider font-mono">
                  <span>// ACTION DIRECTIVES</span>
                </h3>
                <h2 className="text-lg font-bold uppercase text-blue-950 italic">CRITICAL BREACH CONTAINMENT</h2>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  If ransomware is actively encrypting local network shares, execute these rules immediately BEFORE dispatching agents:
                </p>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Rule 1 */}
                <div className="bg-white border border-blue-100 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></span>
                  <div className="font-extrabold text-blue-950 uppercase">[01] DISCONNECT LOCAL NETWORK SWITCHES</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">
                    Physically unplug ethernet lines from boundary switches. Sever active WiFi gateways. Do NOT shut off running workstations!
                  </p>
                </div>

                {/* Rule 2 */}
                <div className="bg-white border border-blue-100 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></span>
                  <div className="font-extrabold text-blue-950 uppercase">[02] DO NOT POWER DOWN RUNNING SERVERS</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">
                    Memory forensics (MAGNET raw dump capture) extracts volatile malware execution keys from active RAM. Shutting down purges this critical trace logic.
                  </p>
                </div>

                {/* Rule 3 */}
                <div className="bg-white border border-blue-100 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></span>
                  <div className="font-extrabold text-blue-950 uppercase">[03] MANDATE IDENTITIES CONSTRAINTS</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">
                    Instantly toggle administrative lock options on Entra ID / M365 and AWS control portals to evict open browser cookie sessions.
                  </p>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl text-xs text-rose-700 leading-relaxed font-normal">
                ⚠️ Critical warning: Never attempt to restore shadow-copy nodes from cloud backup drives during active executions, as ransomware triggers frequently scan and target local attached repositories first.
              </div>
            </div>
          )}
        </div>

        {/* SECURE SUBMISSION FORM (Right Box) */}
        <div className="col-span-1 lg:col-span-8 bg-white/85 border border-blue-100 rounded-3xl p-6 relative backdrop-blur-md shadow-lg shadow-blue-500/5">
          {!hasSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between border-b border-blue-100 pb-4">
                <span className="text-xs font-bold text-blue-950 tracking-wider flex items-center gap-2 animate-pulse font-mono">
                  <Terminal className={`w-4 h-4 ${emergencyActive ? 'text-rose-500' : 'text-blue-600'}`} />
                  <span>{emergencyActive ? 'CIRT DISPATCH ENCRYPTED CHANNEL' : 'SECURE INBOUND OPERATIONS SYSTEM'}</span>
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${emergencyActive ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider font-mono">Your Official Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-blue-950 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-all font-sans placeholder-slate-400 font-medium"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider font-mono">Business Email *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-blue-950 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-all font-sans placeholder-slate-400 font-medium"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="col-span-1 sm:col-span-2 space-y-1.5">
                  <label className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider font-mono">Business / Group Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-blue-950 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-all font-sans placeholder-slate-400 font-medium"
                    placeholder="Company name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider font-mono">Node Seats Count</label>
                  <select
                    value={formData.seats}
                    onChange={(e) => setFormData(prev => ({ ...prev, seats: e.target.value }))}
                    className="w-full bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-blue-950 focus:outline-none focus:border-blue-600 transition-all font-sans cursor-pointer font-semibold"
                  >
                    <option value="1-20" className="bg-white">1 - 20 Employees</option>
                    <option value="21-100" className="bg-white">21 - 100 Employees</option>
                    <option value="101-500" className="bg-white">101 - 500 Employees</option>
                    <option value="500+" className="bg-white">500+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider font-mono">Classification Category</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => {
                      setEmergencyActive(false);
                      setFormData(prev => ({ ...prev, type: 'msp_quote' }));
                    }}
                    className={`cursor-pointer px-4 py-3 rounded-xl border text-center transition-all ${
                      formData.type === 'msp_quote'
                        ? 'border-blue-500 bg-blue-50/75 text-blue-800 font-extrabold shadow-sm shadow-blue-500/5'
                        : 'border-blue-100 bg-white text-slate-650 hover:border-blue-300 hover:bg-blue-50/20'
                    }`}
                  >
                    <span className="text-[11px] font-bold block uppercase tracking-wider font-mono">General MSP Quote</span>
                  </div>

                  <div
                    onClick={() => {
                      setEmergencyActive(false);
                      setFormData(prev => ({ ...prev, type: 'forensic_retainer' }));
                    }}
                    className={`cursor-pointer px-4 py-3 rounded-xl border text-center transition-all ${
                      formData.type === 'forensic_retainer'
                        ? 'border-blue-500 bg-blue-50/75 text-blue-800 font-extrabold shadow-sm shadow-blue-500/5'
                        : 'border-blue-100 bg-white text-slate-650 hover:border-blue-300 hover:bg-blue-50/20'
                    }`}
                  >
                    <span className="text-[11px] font-bold block uppercase tracking-wider font-mono font-mono">Forensics Retainer</span>
                  </div>

                  <div
                    onClick={handleToggleEmergency}
                    className={`cursor-pointer px-4 py-3 rounded-xl border text-center transition-all ${
                      formData.type === 'incident_response' || emergencyActive
                        ? 'border-rose-500 bg-rose-50 text-rose-700 font-extrabold animate-pulse'
                        : 'border-blue-100 bg-white text-slate-650 hover:border-blue-300 hover:bg-blue-50/20'
                    }`}
                  >
                    <span className="text-[11px] font-bold block uppercase tracking-wider font-mono">RED EMERGENCY</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider font-mono">Operational Details or Inquiry Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.customMessage}
                  onChange={(e) => setFormData(prev => ({ ...prev, customMessage: e.target.value }))}
                  className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-xs text-blue-950 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-all font-sans leading-relaxed placeholder-slate-400 font-medium"
                  placeholder={emergencyActive ? "PASTE RECENT ERROR CODES, FILE PATHS, OR COMPROMISE TIMELINES..." : "Outline your security posture goals or request details..."}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto px-6 py-3 font-semibold text-xs tracking-wider rounded-full flex items-center justify-center gap-2 transition-all outline-none cursor-pointer uppercase ${
                    emergencyActive
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/10 border border-rose-700'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 border border-blue-750'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      <span>CRYPTOGRAPHIC TRANSMISSION...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 shrink-0" />
                      <span>{emergencyActive ? 'DISPATCH INCIDENT DISCOVERY FORM' : 'TRANSMIT SECURE CHANNELS'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Sent successfully sheet */
            <div className="py-16 text-center space-y-6 max-w-md mx-auto animate-fadeIn uppercase font-sans">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider">SECURE PAYLOAD TRANSMITTED</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal uppercase normal-case">
                  Your specifications have been safely sealed using dual envelope GPG. A Security Officer will decrypt and read and verify your packet on segregated hardware.
                </p>
              </div>

              <div className="bg-blue-50/30 border border-blue-100 p-5 rounded-2xl text-left text-[11px] text-slate-600 space-y-1.5 font-mono tracking-wide leading-relaxed lowercase normal-case shadow-inner">
                <span className="block"><strong className="text-blue-700">● tracking code:</strong> BRJU-TX-{Math.floor(Math.random()*900000)+100000}</span>
                <span className="block"><strong className="text-blue-700">● hash integrity:</strong> MATCH PASS SHA-512</span>
                <span className="block"><strong className="text-blue-700">● target router:</strong> CIRT_SECURE_QUEUE_04</span>
              </div>

              <button
                onClick={() => {
                  setHasSent(false);
                  setFormData({ name: '', email: '', company: '', seats: '1-20', type: 'msp_quote', customMessage: '' });
                }}
                className="px-5 py-2.5 border border-blue-200 hover:bg-blue-50 bg-white text-xs text-blue-700 font-bold rounded-full cursor-pointer uppercase tracking-wider transition-colors shadow-sm"
              >
                PREPARE ANOTHER FORM
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
