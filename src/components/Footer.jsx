import React from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  Terminal, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Sparkles, 
  ArrowUp,
  Award,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { EVENT_DETAILS } from '../data/ncoreData';
import { playClickSound, playHoverSound } from '../utils/audio';

const Footer = () => {
  const { navigateTo } = useHackathon();
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-100/80 border-t border-slate-200 pt-16 pb-12 overflow-hidden text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          {/* Main Brand Identity & Institution */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg p-0.5 bg-gradient-to-br from-sky-400 via-blue-600 to-sky-600 shadow-xs">
                <img 
                  src="/assets/arunai_crest.png" 
                  alt="Arunai College Logo" 
                  className="w-full h-full object-contain rounded bg-white p-1"
                />
              </div>
              <div>
                <h3 className="text-xl font-black font-tech text-slate-900 tracking-wider flex items-center gap-2">
                  <span>NCORE 2026</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-sky-100 border border-sky-300 font-mono text-sky-800 font-semibold">
                    12HRS HACKATHON
                  </span>
                </h3>
                <p className="text-[11px] font-mono text-sky-700 font-semibold">
                  THINK. BUILD. SOLVE. MAKE AN IMPACT.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              National-level 12-Hour Hackathon presented by <strong className="text-sky-700 font-tech">POINTERS</strong>, Department of Computer Science and Engineering, Arunai Engineering College (Autonomous), Tiruvannamalai.
            </p>

            {/* Accreditations Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-600 shadow-xs">
                Autonomous
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-600 shadow-xs">
                NAAC 'A' Grade
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-600 shadow-xs">
                DNV ISO 9001
              </span>
              <span className="px-2.5 py-1 rounded bg-sky-50 border border-sky-200 text-[10px] font-mono text-sky-700 font-bold shadow-xs">
                34th Year in Education
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold">
              Hackathon Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { name: 'Challenge Themes', href: '#themes' },
                { name: 'Prize Pool & Honors', href: '#prizes' },
                { name: 'Event Schedule', href: '#schedule' },
                { name: 'Rules & Guidelines', href: '#guidelines' },
                { name: 'Jury & Conveners', href: '#judges' }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={playClickSound}
                    onMouseEnter={playHoverSound}
                    className="text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-sky-500 font-bold">›</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Official POINTERS Contact Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold">
              Presented by POINTERS
            </h4>

            <div className="space-y-2.5 text-xs text-slate-600 font-mono">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                <span>
                  Arunai Engineering College, Velu Nagar, Mathur, Tiruvannamalai – 606 603, Tamil Nadu, India.
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <div className="space-x-2">
                  <a href="tel:+918778970224" className="hover:text-sky-700 transition-colors font-semibold">
                    +91 87789 70224
                  </a>
                  <span>/</span>
                  <a href="tel:+919176590993" className="hover:text-sky-700 transition-colors font-semibold">
                    +91 91765 90993
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                <a href="mailto:pointers.csedept@gmail.com" className="hover:text-sky-700 transition-colors font-semibold">
                  pointers.csedept@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-sky-600 shrink-0" />
                <a 
                  href="https://pointers-2026.vercel.app" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-sky-700 transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>pointers-2026.vercel.app</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-sky-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <a 
                  href="https://instagram.com/pointers_cse" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-sky-700 transition-colors font-semibold"
                >
                  @pointers_cse
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 <strong className="text-sky-800 font-bold">NCORE 12HRS HACKATHON</strong>. All Rights Reserved. Presented by POINTERS CSE.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-sky-700 hover:border-sky-400 shadow-xs transition-all font-semibold"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
