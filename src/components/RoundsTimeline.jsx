import React from 'react';
import { 
  GitBranch, 
  CheckCircle2, 
  Clock, 
  Target, 
  FileCode, 
  Layers, 
  Award, 
  ChevronRight,
  Sparkles,
  Play,
  Lock
} from 'lucide-react';
import { HACKATHON_ROUNDS } from '../data/ncoreData';
import { useHackathon } from '../context/HackathonContext';
import { playClickSound, playHoverSound } from '../utils/audio';

const RoundsTimeline = () => {
  const { currentRound, timerSeconds, isTimerRunning, roundStatus, currentUser, setActiveModal } = useHackathon();

  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')} : ${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="rounds" className="py-20 relative bg-space-950/70 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            12-HOUR PROGRESSION TIMELINE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-tech text-white">
            HACKATHON ROUNDS ARCHITECTURE
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Three progressive knockout & refinement checkpoints. Each milestone tests technical mastery, engineering rigor, and execution speed.
          </p>
        </div>

        {/* 3 Large Futuristic Cards Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connecting line behind cards */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/30 via-blue-500/50 to-cyan-500/30 -translate-y-1/2 z-0" />

          {HACKATHON_ROUNDS.map((round) => {
            const isActive = currentRound === round.id;
            const isCompleted = currentRound > round.id;

            return (
              <div
                key={round.id}
                onMouseEnter={playHoverSound}
                className={`relative z-10 p-6 sm:p-8 rounded-2xl glass-panel transition-all duration-300 flex flex-col justify-between ${
                  isActive 
                    ? 'border-2 border-cyan-400 shadow-glow-cyan bg-space-900/90' 
                    : isCompleted 
                    ? 'border border-emerald-500/40 bg-space-950/80 opacity-90' 
                    : 'border border-slate-800 bg-space-950/60 opacity-75'
                }`}
              >
                {/* Tech Bracket HUD on active */}
                {isActive && (
                  <>
                    <div className="hud-corner-tl"></div>
                    <div className="hud-corner-tr"></div>
                    <div className="hud-corner-bl"></div>
                    <div className="hud-corner-br"></div>
                  </>
                )}

                <div>
                  {/* Top Round Header with Active Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-400">
                      {round.roundNumber}
                    </span>

                    {isActive ? (
                      isTimerRunning ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-400 text-[10px] font-mono text-emerald-300 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle"></span>
                          LIVE IN PROGRESS
                        </span>
                      ) : roundStatus === 'PAUSED' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-400 text-[10px] font-mono text-amber-300 font-bold">
                          PAUSED BY ADMIN
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-space-900 border border-slate-700 text-[10px] font-mono text-slate-300">
                          <Lock className="w-3 h-3 text-slate-400" />
                          STANDBY (AWAITING ADMIN)
                        </span>
                      )
                    ) : isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        COMPLETED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-mono text-slate-400">
                        UPCOMING
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-tech text-white mb-1">
                    {round.title}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-300 font-mono mb-4">
                    {round.tag}
                  </div>

                  {/* Active Countdown Display if this is the active round */}
                  {isActive && (
                    <div className="mb-5 p-3 rounded-xl bg-space-950/90 border border-cyan-500/40 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>{isTimerRunning ? 'TIME REMAINING:' : 'ALLOCATED DURATION:'}</span>
                      </div>
                      <div className="font-tech font-extrabold text-base sm:text-lg text-amber-300 glow-text-gold">
                        {formatTimer(timerSeconds)}
                      </div>
                    </div>
                  )}

                  {/* Time Window */}
                  <div className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Slot: {round.timeWindow}</span>
                  </div>

                  {/* Required Deliverables */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-mono text-slate-300 font-semibold uppercase tracking-wider block">
                      Key Deliverables:
                    </span>
                    {round.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-cyan-400 font-bold">›</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Evaluation & Action */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="text-[11px] text-slate-400">
                    <span className="font-mono text-cyan-400">Weightage: </span>
                    {round.evaluationCriteria}
                  </div>

                  <button
                    onClick={() => {
                      playClickSound();
                      if (currentUser) {
                        setActiveModal('dashboard');
                      } else {
                        setActiveModal('login');
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl font-tech text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-space-950 hover:from-cyan-300 hover:to-blue-400 shadow-glow-cyan-sm' 
                        : 'bg-space-900 border border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isActive ? 'SUBMIT ROUND ARTIFACTS' : 'VIEW REQUIREMENTS'}</span>
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

export default RoundsTimeline;
