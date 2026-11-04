import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Award,
  Trophy,
  ExternalLink
} from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { playClickSound, playHoverSound } from '../utils/audio';

const Navbar = () => {
  const { 
    currentUser, 
    soundEnabled, 
    toggleSound, 
    setActiveModal, 
    logout,
    navigateTo 
  } = useHackathon();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pure Hackathon landing page navigation
  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Themes', href: '#themes' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Guidelines', href: '#guidelines' },
    { label: 'Judges', href: '#judges' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-2 shadow-sm' : 'bg-white/95 backdrop-blur-md py-3 border-b border-slate-200/80'
    }`}>
      {/* Top micro-bar with institutional accreditation */}
      <div className="hidden md:block border-b border-slate-200 pb-1.5 mb-2 text-[11px] text-slate-600 font-mono tracking-wider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sky-700 font-bold">ARUNAI ENGINEERING COLLEGE (AUTONOMOUS)</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-semibold">DEPT. OF COMPUTER SCIENCE & ENGINEERING</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>12HRS HACKATHON • 09 OCT 2026</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Event Title */}
        <a 
          href="#hero" 
          onClick={playClickSound}
          className="flex items-center space-x-3 group cursor-pointer shrink-0"
        >
          <div className="relative w-10 h-10 rounded-lg p-0.5 bg-gradient-to-br from-sky-400 via-blue-600 to-transparent shadow-sm">
            <img 
              src="/assets/arunai_crest.png" 
              alt="Arunai College Logo" 
              className="w-full h-full object-contain rounded bg-white p-1"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-wider font-tech text-slate-900 group-hover:text-sky-600 transition-all">
                NCORE 2026
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-100 border border-sky-300 font-mono text-sky-700 font-bold tracking-wider">
                12HRS
              </span>
            </div>
            <span className="text-[10px] text-slate-500 tracking-tight font-medium hidden sm:block">
              Presented by <strong className="text-sky-600 font-bold">POINTERS</strong>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 font-medium text-xs tracking-wider uppercase">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="px-3 py-1.5 rounded-md text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
          
        </nav>

        {/* Action Controls & Authentication */}
        <div className="flex items-center space-x-2.5 shrink-0">
          {/* Sound Effect Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
            className="p-2 rounded-lg text-slate-500 hover:text-sky-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-sky-300 transition-all cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* User Auth Buttons */}
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  playClickSound();
                  if (currentUser.role === 'admin') {
                    navigateTo('/admin');
                  } else {
                    setActiveModal('dashboard');
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-300 text-sky-800 text-xs font-semibold hover:bg-sky-100 transition-all cursor-pointer"
              >
                {currentUser.role === 'admin' ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>ADMIN PAGE</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-3.5 h-3.5 text-sky-600" />
                    <span>{currentUser.teamData?.teamName || 'TEAM WORKSPACE'}</span>
                  </>
                )}
              </button>
              <button
                onClick={logout}
                className="text-xs text-rose-500 hover:text-rose-600 px-2 py-1 transition-colors font-mono cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  playClickSound();
                  setActiveModal('login');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-sky-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 hover:border-sky-400 transition-all font-tech tracking-wider cursor-pointer"
              >
                LOGIN
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveModal('register');
                }}
                className="relative group overflow-hidden px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-md transition-all font-tech tracking-wider cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  REGISTER TEAM
                </span>
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 text-slate-700 hover:text-sky-600 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 mt-2 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded bg-slate-50 border border-slate-200 hover:border-sky-400 text-slate-700 hover:text-sky-600"
              >
                {item.label}
              </a>
            ))}
          </div>

          
        </div>
      )}
    </header>
  );
};

export default Navbar;
