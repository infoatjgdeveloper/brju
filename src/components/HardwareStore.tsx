import { useState } from 'react';
import { Cpu, Leaf, DollarSign, ShoppingCart, ShoppingBag, BatteryCharging } from 'lucide-react';

export default function HardwareStore() {
  const [workstations, setWorkstations] = useState(25);
  const [servers, setServers] = useState(3);

  // Math models for hardware pricing averages
  const PRICE_NEW_WORKSTATION = 1450;
  const PRICE_REFURB_WORKSTATION = 680;
  const PRICE_NEW_SERVER = 6200;
  const PRICE_REFURB_SERVER = 2900;

  // Carbon metrics: Producing one computer releases ~240kg CO2, refurbishing consumes ~15kg CO2
  const CARBON_SAVED_PER_PC = 225; // kg
  const EWASTE_SAVED_PER_PC = 9.8; // kg
  const CO2_SAVED_PER_SERVER = 1450; // kg
  const EWASTE_SAVED_PER_SERVER = 45; // kg

  const costNew = (workstations * PRICE_NEW_WORKSTATION) + (servers * PRICE_NEW_SERVER);
  const costRefurbished = (workstations * PRICE_REFURB_WORKSTATION) + (servers * PRICE_REFURB_SERVER);

  const rawSavingsCost = costNew - costRefurbished;
  const co2SavingsTons = ((workstations * CARBON_SAVED_PER_PC) + (servers * CO2_SAVED_PER_SERVER)) / 1000;
  const eWasteSavingsKg = (workstations * EWASTE_SAVED_PER_PC) + (servers * EWASTE_SAVED_PER_SERVER);

  return (
    <div className="space-y-8 animate-fadeIn font-sans">
      {/* Upper pitch */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-100 pb-5">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block font-mono">// SUSTAINABLE LIFECYCLE MANAGEMENT</span>
          <h2 className="text-2xl font-bold text-blue-950 uppercase tracking-tight mt-1 flex items-center gap-2">
            <span>HARDWARE PROCUREMENT CATALOG</span>
          </h2>
          <p className="text-xs text-slate-655 text-slate-600 mt-1 max-w-3xl leading-relaxed font-normal">
            We supply newly audited commercial equipment alongside certified refurbished enterprise setups. Prior to delivery, BRJU physically purges BIOS firmware levels to guard clients from malware supply vectors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* PROCUREMENT CALCULATOR PANEL */}
        <div className="col-span-1 lg:col-span-7 bg-white/85 border border-blue-100 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between backdrop-blur-md shadow-lg shadow-blue-500/5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/3 blur-3xl pointer-events-none"></div>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-blue-100 pb-4">
              <span className="text-xs font-bold text-blue-600 tracking-wider flex items-center gap-2 font-mono">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span className="uppercase tracking-wider">// ROI & CARBON ESTIMATOR</span>
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full font-semibold uppercase font-mono">
                ESG Audit Compliant
              </span>
            </div>

            {/* Range sliders */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-medium uppercase tracking-wide">
                  <span className="text-slate-600 font-bold">Staff Workstations Needed</span>
                  <span className="text-blue-700 font-extrabold font-mono">{workstations} Units</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={workstations}
                  onChange={(e) => setWorkstations(Number(e.target.value))}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600 outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5 PCs</span>
                  <span>150 PCs</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-medium uppercase tracking-wide">
                  <span className="text-slate-600 font-bold">Enterprise Server Nodes Needed</span>
                  <span className="text-blue-700 font-extrabold font-mono">{servers} Units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={servers}
                  onChange={(e) => setServers(Number(e.target.value))}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600 outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0 Servers</span>
                  <span>15 Servers</span>
                </div>
              </div>
            </div>

            {/* Financial vs Environmental metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-50/20 p-5 border border-blue-100/50 rounded-2xl shadow-sm">
              <div className="text-center sm:text-left space-y-1">
                <div className="text-[10px] text-slate-500 tracking-wider flex items-center justify-center sm:justify-start gap-1 font-bold uppercase font-mono">
                  <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                  <span>BUDGET SAVED</span>
                </div>
                <div className="text-2xl font-extrabold text-blue-700">
                  ${rawSavingsCost.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                  ~53% cheaper than factory brand-new
                </span>
              </div>

              <div className="text-center sm:text-left space-y-1 border-t sm:border-t-0 sm:border-l border-blue-100 sm:pl-4 pt-3 sm:pt-0">
                <div className="text-[10px] text-slate-500 tracking-wider flex items-center justify-center sm:justify-start gap-1 font-bold uppercase font-mono">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CARBON AVOIDED</span>
                </div>
                <div className="text-2xl font-extrabold text-emerald-600">
                  {co2SavingsTons.toFixed(1)} MT
                </div>
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                  Equivalent to planting {Math.floor(co2SavingsTons * 16)} saplings
                </span>
              </div>

              <div className="text-center sm:text-left space-y-1 border-t sm:border-t-0 sm:border-l border-blue-100 sm:pl-4 pt-3 sm:pt-0">
                <div className="text-[10px] text-slate-500 tracking-wider flex items-center justify-center sm:justify-start gap-1 font-bold uppercase font-mono">
                  <Cpu className="w-3.5 h-3.5 text-blue-600" />
                  <span>E-WASTE DIVERTED</span>
                </div>
                <div className="text-2xl font-extrabold text-blue-950">
                  {eWasteSavingsKg.toFixed(0)} kg
                </div>
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                  Direct structural landfill interception
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between">
            <span className="text-xs text-slate-600 leading-relaxed font-normal">
              Our pre-hardened refurbished setups deploy secure UEFI configurations, locked write-back caches, and are loaded with physical secure memory controls.
            </span>
          </div>
        </div>

        {/* PROCUREMENT CATALOG */}
        <div className="col-span-1 lg:col-span-5 space-y-4">
          <h3 className="text-[10px] font-bold text-blue-600 tracking-wider uppercase font-mono">// PROCUREMENT OPTIONS</h3>

          <div className="space-y-4">
            {/* REFURBISHED GEAR */}
            <div className="bg-white/85 backdrop-blur-md border border-blue-100 rounded-2xl p-6 space-y-4 hover:border-blue-400/50 transition-all shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-150 text-blue-600 shadow-sm">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-blue-950 leading-tight">Certified Refurbished Hardware</h4>
                    <span className="text-[10px] text-blue-600 block uppercase font-bold mt-0.5 font-mono">Purified BIOS Levels</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">Custom Order</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                We physically disassemble client-returned corporate workstations/servers, run comprehensive 40-point diagnostics, overwrite ROM caches, and flash deep firmware checks to reset hardware parameters.
              </p>

              <ul className="text-xs text-slate-700 space-y-2 bg-blue-50/25 p-4 rounded-xl border border-blue-100/50">
                <li className="flex items-center justify-between uppercase text-[10px] font-mono">
                  <span>● UEFI Secureboot Keying Support</span>
                  <span className="text-blue-600 font-bold">Standard</span>
                </li>
                <li className="flex items-center justify-between uppercase text-[10px] font-mono">
                  <span>● BRJU 3-Year Direct Swap Warranty</span>
                  <span className="text-blue-600 font-bold">Included</span>
                </li>
                <li className="flex items-center justify-between uppercase text-[10px] font-mono">
                  <span>● Cost Difference to New List Price</span>
                  <span className="text-blue-600 font-bold">-45% to -60%</span>
                </li>
              </ul>
            </div>

            {/* NEW HARDWARE */}
            <div className="bg-white/85 backdrop-blur-md border border-blue-100 rounded-2xl p-6 space-y-4 hover:border-blue-400/50 transition-all shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-150 text-blue-600 shadow-sm">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-blue-950 leading-tight">Brand-New Tier Commercial Hardware</h4>
                    <span className="text-[10px] text-slate-500 block uppercase mt-0.5 font-semibold font-mono">Authorized Sourcing</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">Authorized CSP</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Direct procurement integrations with leading tier-1 workstation and core hardware brands. Deployed with factory-to-door strict checks to guarantee tamper-free delivery.
              </p>

              <ul className="text-xs text-slate-700 space-y-1.5 bg-blue-50/25 p-4 rounded-xl border border-blue-100/50">
                <li className="flex items-center justify-between uppercase text-[10px] font-mono">
                  <span>● Brand Factory Seal Audited</span>
                  <span className="text-slate-605 text-slate-600 font-bold">Yes</span>
                </li>
                <li className="flex items-center justify-between uppercase text-[10px] font-mono">
                  <span>● Direct Manufacture Support Lines</span>
                  <span className="text-slate-605 text-slate-600 font-bold">Yes</span>
                </li>
              </ul>
            </div>

            {/* UGREEN */}
            <div className="bg-white/85 backdrop-blur-md border border-blue-100 rounded-2xl p-6 space-y-4 hover:border-amber-400/50 transition-all shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 shadow-sm">
                    <BatteryCharging className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-blue-950 leading-tight">UGreen Power & Interface Hubs</h4>
                    <span className="text-[10px] text-amber-600 block uppercase font-bold mt-0.5 font-mono">Onboarding Partner Status</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase">
                  In Process
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Enterprise power adapters, shielded ethernet ports, high-grade docking blocks, and physical connectivity devices utilized by local forensic field investigators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
