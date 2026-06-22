import { useState, useEffect } from 'react';
import { Shield, Radio, Flame, Award, Cpu, FileClock, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onEmergencyTrigger: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onEmergencyTrigger }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Command Center', icon: Radio },
    { id: 'partners', label: 'Partner Ecosystem', icon: Cpu },
    { id: 'architect', label: 'Solution Architect', icon: Award },
    { id: 'forensic', label: 'Forensic Lab', icon: FileClock },
    { id: 'hardware', label: 'Hardware Procurement', icon: Shield },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-[0_4px_24px_rgba(37,99,235,0.04)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo element */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => { setActiveTab('overview'); setIsOpen(false); }}>
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-xl flex items-center justify-center text-white font-extrabold text-base shadow-lg shadow-blue-500/25">
              B
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-blue-950 flex items-center gap-1.5">
                BRJU <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent italic font-extrabold">INFOSEC</span>
              </span>
              <div className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-medium">
                Autonomous Security Operations
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-white/70 border border-blue-100 p-1.5 rounded-full backdrop-blur-md shadow-sm shadow-blue-500/2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-blue-500/10 border border-blue-500/20 text-blue-700 shadow-sm shadow-blue-550/5'
                      : 'border border-transparent text-slate-600 hover:text-blue-600'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Button & Hamburger Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                onEmergencyTrigger();
                setIsOpen(false);
              }}
              className="relative overflow-hidden flex items-center space-x-1.5 px-4 py-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold text-[11px] rounded-full tracking-wide transition-all duration-300 shadow-lg shadow-rose-500/15 cursor-pointer"
            >
              <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>EMERGENCY SOS</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl border border-blue-100 bg-white/70 backdrop-blur-md text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-blue-100 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-500/10 border border-blue-500/20 text-blue-700'
                      : 'border border-transparent text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
