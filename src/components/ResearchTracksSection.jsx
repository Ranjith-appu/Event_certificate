import React from 'react';
import { 
  Bot, 
  LineChart, 
  Network, 
  Lock, 
  Cloud, 
  Code2, 
  Atom, 
  Sparkles, 
  FileText, 
  BookOpen, 
  Calendar,
  ExternalLink 
} from 'lucide-react';
import { RESEARCH_TRACKS, EVENT_DETAILS } from '../data/ncoreData';
import { useHackathon } from '../context/HackathonContext';
import { playClickSound, playHoverSound } from '../utils/audio';

const iconMap = {
  Bot,
  LineChart,
  Network,
  Lock,
  Cloud,
  Code2,
  Atom,
  Sparkles
};

const ResearchTracksSection = () => {
  const { setActiveModal } = useHackathon();

  return (
    <section id="tracks" className="py-20 relative bg-space-900/50 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            NATIONAL CONFERENCE TRACKS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-tech text-white">
            RESEARCH & COMPUTING TRACKS
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            NCORE 2026 provides an esteemed national platform for students, researchers, and academicians to publish peer-reviewed papers.
          </p>
        </div>

        {/* 8 Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {RESEARCH_TRACKS.map((track) => {
            const IconComponent = iconMap[track.icon] || Bot;
            return (
              <div
                key={track.number}
                onMouseEnter={playHoverSound}
                className="p-5 rounded-xl glass-panel glass-panel-hover flex flex-col justify-between border-cyan-500/20 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-space-950 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:text-cyan-200 transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-cyan-400/50 font-bold">
                    TRACK {track.number}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold font-tech text-white group-hover:text-cyan-300 transition-colors">
                    {track.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 font-sans">
                    {track.sub}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] font-mono text-cyan-400/70">
                  › CALL FOR PAPERS ACTIVE
                </div>
              </div>
            );
          })}
        </div>

        {/* Publication & Important Dates Box from brochure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Google Scholar Indexed Journal Notice */}
          <div className="lg:col-span-6 p-6 rounded-2xl glass-card-gold relative overflow-hidden flex flex-col justify-between">
            <div className="hud-corner-tl !border-yellow-400"></div>
            <div className="hud-corner-tr !border-yellow-400"></div>
            <div className="hud-corner-bl !border-yellow-400"></div>
            <div className="hud-corner-br !border-yellow-400"></div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono">
                <Sparkles className="w-4 h-4" />
                <span>INDEXED PUBLICATION RECOGNITION</span>
              </div>
              <h3 className="text-xl font-bold font-tech text-white">
                TOP 3 PAPERS PUBLICATION IN PEER-REVIEWED JOURNAL
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                As stated in the official NCORE brochure: The Top 3 Papers will be considered for publication in a peer-reviewed journal (<strong className="text-amber-300">Google Scholar indexed</strong>); additional publication fees applicable upon formal acceptance.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-yellow-500/20 flex items-center justify-between">
              <span className="text-[11px] font-mono text-amber-300/80">
                Arunai Engineering College Research Board
              </span>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveModal('brochure');
                }}
                className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1"
              >
                <span>Paper Guidelines</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Important Submission Dates */}
          <div className="lg:col-span-6 p-6 rounded-2xl glass-panel border-cyan-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-3">
                <Calendar className="w-4 h-4" />
                <span>IMPORTANT CONFERENCE DATES</span>
              </div>
              <div className="space-y-3">
                {EVENT_DETAILS.importantDates.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-space-950/70 border border-slate-800">
                    <span className="text-xs text-slate-300">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-300">{item.date}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-900/40 text-cyan-400 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Submit Abstracts to:</span>
              <a href={`mailto:${EVENT_DETAILS.contact.email}`} className="text-cyan-400 hover:underline">
                {EVENT_DETAILS.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchTracksSection;
