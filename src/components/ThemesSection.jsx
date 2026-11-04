import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Cpu, 
  ShieldCheck, 
  BarChart3, 
  Leaf, 
  Lightbulb, 
  Users, 
  ChevronRight, 
  ArrowUpRight,
  Code2
} from 'lucide-react';
import { HACKATHON_THEMES } from '../data/ncoreData';
import { useHackathon } from '../context/HackathonContext';
import { playClickSound, playHoverSound } from '../utils/audio';

const iconMap = {
  BrainCircuit: BrainCircuit,
  Cpu: Cpu,
  ShieldCheck: ShieldCheck,
  BarChart3: BarChart3,
  Leaf: Leaf,
  Lightbulb: Lightbulb
};

const ThemesSection = () => {
  const { setActiveModal, teams } = useHackathon();
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Calculate live count from registered teams
  const getThemeTeamCount = (themeId, defaultCount) => {
    const live = teams.filter(t => t.domain === themeId).length;
    return defaultCount + live;
  };

  return (
    <section id="themes" className="py-20 relative overflow-hidden bg-slate-50/60 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-semibold text-xs font-mono">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              12HRS HACKATHON TRACKS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-tech tracking-tight text-slate-900">
              HACKATHON THEMES
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Choose your domain of impact. Prototype original, scalable solutions evaluated on technical soundness, innovation, and practical viability.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs font-mono font-semibold text-sky-700">6 THEMES AVAILABLE</span>
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
          </div>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HACKATHON_THEMES.map((theme) => {
            const IconComponent = iconMap[theme.iconName] || BrainCircuit;
            const liveTeamCount = getThemeTeamCount(theme.id, theme.registeredTeamsCount);

            return (
              <div
                key={theme.id}
                onMouseEnter={playHoverSound}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-400 flex flex-col justify-between transition-all duration-300"
              >
                {/* Tech Bracket HUD on Hover */}
                <div className="hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="hud-corner-tr opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="hud-corner-bl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="hud-corner-br opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div>
                  {/* Top bar with Domain Number and Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:text-white group-hover:bg-sky-600 shadow-xs transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black font-tech text-slate-300 group-hover:text-sky-600 transition-colors">
                        {theme.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-tech text-slate-900 group-hover:text-sky-700 transition-colors mb-2">
                    {theme.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {theme.description}
                  </p>

                  {/* Sample Challenges Preview */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-mono text-sky-700 font-bold uppercase tracking-wider block">
                      Sample Focus Areas:
                    </span>
                    {theme.sampleChallenges.slice(0, 2).map((challenge, cIdx) => (
                      <div key={cIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <span className="text-sky-600 font-bold">�</span>
                        <span>{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{liveTeamCount} Teams Registered</span>
                  </div>

                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveModal('register');
                    }}
                    className="p-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-600 hover:text-white transition-all flex items-center gap-1 text-xs font-bold"
                  >
                    <span>SELECT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThemesSection;
