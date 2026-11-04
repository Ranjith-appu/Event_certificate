import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  Calendar, 
  Clock, 
  Trophy, 
  Users, 
  Layers,
  Lock,
  Radio,
  ArrowDownCircle
} from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { HACKATHON_THEMES } from '../data/ncoreData';
import { playClickSound, playHoverSound } from '../utils/audio';

const HeroSection = () => {
  const { 
    EVENT_DETAILS, 
    currentRound, 
    timerSeconds, 
    isTimerRunning, 
    roundStatus,
    currentUser,
    setActiveModal
  } = useHackathon();

  // Synchronized countdown to 09 October 2026 hackathon launch date
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const difference = EVENT_DETAILS.eventTimestamp - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [EVENT_DETAILS.eventTimestamp]);

  // Format Round Timer
  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')} : ${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden flex flex-col justify-center bg-slate-50">
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-400/10 rounded-full filter blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Top Ticker Banner */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono tracking-widest text-sky-700 mb-8 border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            <span>POINTERS CSE • 12HRS HACKATHON ARENA</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-500">
            <span>ARUNAI ENGINEERING COLLEGE (AUTONOMOUS)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>TIRUVANNAMALAI</span>
          </div>
        </div>

        {/* Hero Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography, Timing & Registration */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Round Status Badge (Admin Controlled) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-300 shadow-sm">
              {isTimerRunning ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-mono text-emerald-700 font-bold tracking-wider">
                    ● ROUND 0{currentRound} – LIVE IN PROGRESS
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-xs font-mono text-amber-700 flex items-center gap-1 font-bold">
                    <Clock className="w-3 h-3 text-amber-600" />
                    {formatTimer(timerSeconds)}
                  </span>
                </>
              ) : roundStatus === 'PAUSED' ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-mono text-amber-700 font-bold tracking-wider">
                    ● ROUND 0{currentRound} – PAUSED BY ADMIN
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-xs font-mono text-slate-600 font-semibold">
                    {formatTimer(timerSeconds)} REMAINING
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  <span className="text-xs font-mono text-slate-600 font-medium tracking-wider">
                    ○ ROUND 0{currentRound} – STANDBY
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-xs font-mono text-sky-700 flex items-center gap-1 font-bold">
                    <Lock className="w-3 h-3 text-sky-600" />
                    AWAITING ADMIN START
                  </span>
                </>
              )}
            </div>

            {/* Main Hackathon Branding */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-tech tracking-tight text-slate-900 leading-none">
                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-sky-700 bg-clip-text text-transparent">
                  NCORE 2026
                </span>
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-sky-600 text-white font-tech font-extrabold text-xl sm:text-2xl tracking-wider shadow-md">
                  12HRS HACKATHON
                </span>
                <span className="text-xs font-mono text-sky-800 border border-sky-300 px-3 py-1.5 rounded-lg bg-sky-50 font-bold">
                  09 OCTOBER 2026 • 08:30 AM IST
                </span>
              </div>

              {/* Tagline */}
              <p className="text-base sm:text-lg md:text-xl font-bold text-slate-800 tracking-wide pt-1">
                THINK. BUILD. SOLVE. <span className="text-sky-600 font-tech tracking-wider">MAKE AN IMPACT.</span>
              </p>

              {/* Presented By POINTERS */}
              <div className="pt-1 text-sm text-slate-600 flex items-center gap-2">
                <span className="text-slate-500">Presented by</span>
                <span className="text-base font-black font-tech tracking-widest text-sky-700 uppercase">
                  POINTERS
                </span>
                <span className="text-slate-400 text-xs">| Dept. of CSE, Arunai Engineering College</span>
              </div>
            </div>

            {/* Primary Action Button: ONLY Register Option (Team passkey removed) */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  playClickSound();
                  setActiveModal('register');
                }}
                onMouseEnter={playHoverSound}
                className="relative px-7 py-4 rounded-xl font-tech font-bold text-sm sm:text-base tracking-wider text-space-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-space-950" />
                <span>REGISTER TEAM (UP TO 4 MEMBERS)</span>
                <ChevronRight className="w-4 h-4 text-space-950" />
              </button>

              <a
                href="#themes"
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                className="px-5 py-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-sky-600 bg-white hover:bg-slate-100 border border-slate-300 hover:border-sky-400 shadow-sm transition-all flex items-center gap-2"
              >
                <span>EXPLORE CHALLENGE THEMES</span>
                <ArrowDownCircle className="w-4 h-4 text-sky-600" />
              </a>
            </div>

            {/* Live Timing & Telemetry Control Box */}
            <div className="pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden space-y-3">
                <div className="hud-corner-tl"></div>
                <div className="hud-corner-tr"></div>
                <div className="hud-corner-bl"></div>
                <div className="hud-corner-br"></div>

                {/* Event Launch Countdown */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-[11px] font-mono tracking-widest text-sky-800 flex items-center gap-1.5 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    HACKATHON DATE: 09 OCTOBER 2026
                  </span>
                  <div className="text-[11px] font-mono text-slate-600 flex items-center gap-2">
                    <span>LAUNCH IN:</span>
                    <strong className="text-slate-900 font-bold">
                      {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
                    </strong>
                  </div>
                </div>

                {/* Round Countdown Telemetry: Strictly Admin Controlled */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                        ROUND 0{currentRound} TELEMETRY
                      </span>
                      {isTimerRunning ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-[10px] font-mono text-emerald-800 font-bold">
                          <Radio className="w-3 h-3 text-emerald-600" />
                          COUNT RUNNING
                        </span>
                      ) : roundStatus === 'PAUSED' ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[10px] font-mono text-amber-800 font-bold">
                          PAUSED BY ADMIN
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-200/80 border border-slate-300 text-[10px] font-mono text-slate-700 flex items-center gap-1">
                          <Lock className="w-3 h-3 text-slate-500" />
                          STANDBY (AWAITING ADMIN START)
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1 font-sans">
                      {isTimerRunning 
                        ? 'Official round time is currently ticking down across all participant workspaces.' 
                        : 'Round countdown runs strictly only when triggered by the Hackathon Director.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 sm:pl-4 sm:border-l sm:border-slate-200">
                    <div className="text-left sm:text-right">
                      <div className="text-2xl sm:text-3xl font-black font-tech tracking-wider">
                        {isTimerRunning ? (
                          <span className="text-amber-600 font-extrabold">{formatTimer(timerSeconds)}</span>
                        ) : (
                          <span className="text-slate-800 font-mono font-bold">{formatTimer(timerSeconds)}</span>
                        )}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                        {isTimerRunning ? 'LIVE TIME REMAINING' : 'ROUND ALLOCATION'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Aligned Hackathon Mission Terminal */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-lg space-y-6">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-tr"></div>
              <div className="hud-corner-bl"></div>
              <div className="hud-corner-br"></div>

              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2 text-sky-700 font-mono text-xs font-bold">
                  <Terminal className="w-4 h-4 text-sky-600" />
                  <span>HACKATHON MISSION TERMINAL</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold">
                  OFFICIAL ARENA
                </span>
              </div>

              {/* Core Hackathon Highlights Matrix */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-amber-600">
                    <Trophy className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Prize Pool</span>
                  </div>
                  <div className="text-2xl font-black font-tech text-amber-600">₹20,000</div>
                  <p className="text-[10px] text-slate-500 font-mono">Cash + Trophies + Mentorship</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-sky-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Sprint Length</span>
                  </div>
                  <div className="text-2xl font-black font-tech text-sky-600">12 HOURS</div>
                  <p className="text-[10px] text-slate-500 font-mono">Non-stop Engineering</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Users className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Team Size</span>
                  </div>
                  <div className="text-2xl font-black font-tech text-emerald-600">2 - 4 MEMBERS</div>
                  <p className="text-[10px] text-slate-500 font-mono">Multidisciplinary</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Layers className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Progression</span>
                  </div>
                  <div className="text-2xl font-black font-tech text-blue-600">3 ROUNDS</div>
                  <p className="text-[10px] text-slate-500 font-mono">Iterative Milestones</p>
                </div>
              </div>

              {/* 6 Hackathon Themes Quick Pills */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                  Official Challenge Domains:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  {HACKATHON_THEMES.map(theme => (
                    <div key={theme.id} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: theme.color }}></span>
                      <span className="truncate font-medium">{theme.shortTitle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
