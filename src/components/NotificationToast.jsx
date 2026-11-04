import React from 'react';
import { Bell, X, AlertTriangle, Info, Radio } from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { playClickSound } from '../utils/audio';

const NotificationToast = () => {
  const { announcements, dismissAnnouncement } = useHackathon();

  // Show top active notification
  const activeAlert = announcements.find(a => a.active);

  if (!activeAlert) return null;

  const isCritical = activeAlert.type === 'CRITICAL';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-short">
      <div className={`p-4 rounded-2xl glass-panel shadow-2xl transition-all duration-300 relative overflow-hidden border ${
        isCritical 
          ? 'border-amber-400/80 bg-space-950/95 shadow-glow-gold' 
          : 'border-cyan-400/80 bg-space-950/95 shadow-glow-cyan'
      }`}>
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-tr"></div>
        <div className="hud-corner-bl"></div>
        <div className="hud-corner-br"></div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isCritical ? 'bg-amber-500/20 text-amber-400 border border-amber-400/40' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/40'
            }`}>
              {isCritical ? <AlertTriangle className="w-5 h-5 animate-pulse" /> : <Bell className="w-5 h-5 animate-wiggle" />}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${
                  isCritical ? 'text-amber-400' : 'text-cyan-300'
                }`}>
                  ?? NEW EVENT UPDATE
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {activeAlert.timestamp}
                </span>
              </div>

              <h4 className="text-xs font-bold font-tech text-white">
                {activeAlert.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {activeAlert.message}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              dismissAnnouncement(activeAlert.id);
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white bg-space-900 border border-slate-700/60 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;
