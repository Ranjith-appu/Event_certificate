import React from 'react';
import { ShieldCheck, Award, FileText, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { playClickSound, playHoverSound } from '../utils/audio';

const BrochureShowcase = () => {
  const { setActiveModal } = useHackathon();

  const accreditations = [
    {
      img: '/assets/arunai_crest.png',
      title: 'Arunai Engineering College',
      sub: 'Autonomous Institution, Tiruvannamalai'
    },
    {
      img: '/assets/dnv_iso.png',
      title: 'DNV ISO 9001',
      sub: 'Quality System Certified'
    },
    {
      img: '/assets/34th_year.png',
      title: 'Stepping into 34th Year',
      sub: 'Excellence in Education (1993-2026)'
    },
    {
      img: '/assets/igrow_logo.jpeg',
      title: 'i-GROW Student Wing',
      sub: 'Information Global Reach Objective Wing'
    }
  ];

  return (
    <section className="py-12 relative border-y border-cyan-500/20 bg-space-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            ACCREDITED INSTITUTIONAL EXCELLENCE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-tech tracking-tight text-white">
            ORGANIZED BY DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            In association with <strong className="text-cyan-300">i-GROW</strong> (Student Association) & <strong className="text-cyan-400">POINTERS</strong> at Arunai Engineering College
          </p>
        </div>

        {/* Institutional Accreditation Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center">
          {accreditations.map((item, idx) => (
            <div 
              key={idx}
              onMouseEnter={playHoverSound}
              className="p-4 rounded-xl glass-panel glass-panel-hover flex flex-col items-center text-center space-y-2 group"
            >
              <div className="w-16 h-16 rounded-lg bg-white/5 p-2 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-400/60 transition-colors">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="max-h-full max-w-full object-contain filter drop-shadow" 
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Brochure Banner CTA */}
        <div className="mt-8 p-6 rounded-2xl glass-panel border-cyan-400/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow-cyan-sm">
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-tr"></div>
          <div className="hud-corner-bl"></div>
          <div className="hud-corner-br"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-tech text-white flex items-center gap-2">
                <span>OFFICIAL NCORE 2026 EVENT BROCHURE</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  DIGITAL ARCHIVE
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Inspect the authentic conference tracks, hackathon themes, cash prize structure, organizing committee faculty list, and submission guidelines.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              setActiveModal('brochure');
            }}
            onMouseEnter={playHoverSound}
            className="px-5 py-2.5 rounded-xl font-tech text-xs font-bold text-space-950 bg-cyan-400 hover:bg-cyan-300 shadow-glow-cyan-sm transition-all flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIEW BROCHURE POSTER</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrochureShowcase;
