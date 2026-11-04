import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Radio, 
  Send, 
  Users, 
  Award, 
  Trophy, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  KeyRound, 
  Calendar, 
  Edit3, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  Lock, 
  LogOut, 
  ChevronRight, 
  Sparkles,
  MapPin,
  RefreshCw,
  Eye
} from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { HACKATHON_ROUNDS, HACKATHON_THEMES, INITIAL_SCHEDULE } from '../data/ncoreData';
import { playClickSound, playSuccessSound, playAlertSound } from '../utils/audio';

const AdminPage = () => {
  const { 
    currentUser, 
    currentRound, 
    setRound, 
    setRoundDuration,
    timerSeconds, 
    isTimerRunning, 
    roundStatus, 
    startRoundTimer, 
    pauseRoundTimer, 
    toggleTimer, 
    resetRoundTimer, 
    teams, 
    schedule, 
    setSchedule,
    announcements, 
    broadcastAnnouncement, 
    dismissAnnouncement, 
    isLeaderboardPublished, 
    toggleLeaderboardPublication, 
    isCertificateEnabled, 
    toggleCertificateIssuance, 
    loginWithEmail, 
    loginAsAdminDirect, 
    logout, 
    navigateTo 
  } = useHackathon();

  // Admin Tab selection
  const [activeTab, setActiveTab] = useState('rounds'); // 'rounds' | 'features' | 'broadcast' | 'teams' | 'schedule'

  // Director Auth Form State
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Announcement Form State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState('CRITICAL');

  // Custom Timer duration input in minutes
  const [customMinutes, setCustomMinutes] = useState('120');

  // Teams search in admin
  const [teamSearch, setTeamSearch] = useState('');

  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    playClickSound();

    const res = loginWithEmail('admin@ncore.in', passwordInput);
    if (!res.success) {
      setAuthError('Incorrect Director Passcode. Please enter admin123.');
    }
  };

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;
    broadcastAnnouncement({
      title: broadcastTitle.toUpperCase(),
      message: broadcastMessage,
      type: broadcastType
    });
    setBroadcastTitle('');
    setBroadcastMessage('');
    playAlertSound();
  };

  const handleApplyCustomMinutes = (e) => {
    e.preventDefault();
    const mins = parseInt(customMinutes, 10);
    if (!isNaN(mins) && mins > 0) {
      setRoundDuration(mins * 60);
      playSuccessSound();
    }
  };

  const toggleActiveScheduleSlot = (id) => {
    setSchedule(prev => prev.map(item => ({ ...item, active: item.id === id ? !item.active : false })));
    playClickSound();
  };

  // Schedule Time & Details Editing State
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const [editScheduleTime, setEditScheduleTime] = useState('');
  const [editScheduleTitle, setEditScheduleTitle] = useState('');
  const [editScheduleVenue, setEditScheduleVenue] = useState('');
  const [scheduleNotice, setScheduleNotice] = useState('');

  // Add new milestone state
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [newSlotTime, setNewSlotTime] = useState('');
  const [newSlotTitle, setNewSlotTitle] = useState('');
  const [newSlotVenue, setNewSlotVenue] = useState('');

  const handleStartEditSchedule = (slot) => {
    setEditingScheduleId(slot.id);
    setEditScheduleTime(slot.time);
    setEditScheduleTitle(slot.title);
    setEditScheduleVenue(slot.venue || '');
    playClickSound();
  };

  const handleSaveScheduleEdit = (id) => {
    if (!editScheduleTime.trim()) {
      playAlertSound();
      return;
    }
    setSchedule(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          time: editScheduleTime.trim(),
          title: editScheduleTitle.trim() || item.title,
          venue: editScheduleVenue.trim() || item.venue
        };
      }
      return item;
    }));
    setEditingScheduleId(null);
    playSuccessSound();
    setScheduleNotice(`Updated milestone time to "${editScheduleTime.trim()}"`);
    setTimeout(() => setScheduleNotice(''), 3500);
  };

  const handleCancelScheduleEdit = () => {
    setEditingScheduleId(null);
    playClickSound();
  };

  const handleDeleteScheduleSlot = (id) => {
    if (window.confirm('Are you sure you want to remove this milestone slot?')) {
      setSchedule(prev => prev.filter(item => item.id !== id));
      playAlertSound();
      setScheduleNotice('Milestone slot removed');
      setTimeout(() => setScheduleNotice(''), 3000);
    }
  };

  const handleAddNewSlot = (e) => {
    e.preventDefault();
    if (!newSlotTime.trim() || !newSlotTitle.trim()) return;

    const newSlot = {
      id: 's_' + Date.now(),
      time: newSlotTime.trim(),
      title: newSlotTitle.trim(),
      venue: newSlotVenue.trim() || 'Central Computing Lab',
      round: 'Milestone',
      active: false
    };

    setSchedule(prev => [...prev, newSlot]);
    setNewSlotTime('');
    setNewSlotTitle('');
    setNewSlotVenue('');
    setIsAddingSlot(false);
    playSuccessSound();
    setScheduleNotice(`Added new milestone scheduled at "${newSlot.time}"`);
    setTimeout(() => setScheduleNotice(''), 3500);
  };

  const handleResetSchedule = () => {
    if (window.confirm('Reset all schedule milestones and times back to default?')) {
      setSchedule(INITIAL_SCHEDULE);
      playSuccessSound();
      setScheduleNotice('Schedule timeline restored to default brochure hours');
      setTimeout(() => setScheduleNotice(''), 3000);
    }
  };

  // Filtered teams for admin overview
  const filteredTeams = teams.filter(t => 
    t.teamName.toLowerCase().includes(teamSearch.toLowerCase()) ||
    t.teamId.toLowerCase().includes(teamSearch.toLowerCase()) ||
    t.leaderName.toLowerCase().includes(teamSearch.toLowerCase()) ||
    t.domainName.toLowerCase().includes(teamSearch.toLowerCase())
  );

  const totalParticipants = teams.reduce((acc, t) => acc + (t.members?.length || 1), 0);
  const totalSubmissions = teams.filter(t => t.submission?.github || t.submission?.round1Submitted).length;

  // 1. AUTHENTICATION GATE IF NOT ADMIN
  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-4">
        {/* Top Back link */}
        <div className="w-full max-w-md mb-6 flex items-center justify-between">
          <button
            onClick={() => navigateTo('/')}
            className="text-xs font-mono text-slate-600 hover:text-sky-700 flex items-center gap-1.5 font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO PUBLIC PORTAL</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              navigateTo('/jury');
            }}
            className="text-xs font-mono text-sky-700 hover:text-sky-800 flex items-center gap-1.5 font-bold transition-colors cursor-pointer bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 shadow-xs"
          >
            <Award className="w-3.5 h-3.5 text-sky-600" />
            <span>JURY LOGIN ›</span>
          </button>
        </div>

        <div className="w-full max-w-md bg-white border-2 border-amber-300 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="hud-corner-tl !border-amber-400"></div>
          <div className="hud-corner-tr !border-amber-400"></div>
          <div className="hud-corner-bl !border-amber-400"></div>
          <div className="hud-corner-br !border-amber-400"></div>

          <div className="text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-center mx-auto text-amber-600 shadow-xs">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-800 uppercase font-bold bg-amber-100/70 px-2.5 py-0.5 rounded">
                RESTRICTED COMMAND ACCESS
              </span>
              <h1 className="text-2xl font-black font-tech text-slate-900 mt-2">
                HACKATHON DIRECTOR CONTROL
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Enter director authorization passcode to access live round timing triggers, geofence switches, and telemetry.
              </p>
            </div>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono font-medium">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                DIRECTOR PASSCODE
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="admin123"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-tech font-bold text-xs tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-all cursor-pointer"
            >
              AUTHENTICATE & ENTER CONTROL CENTER
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={loginAsAdminDirect}
                className="text-[11px] font-mono text-amber-800 hover:underline font-bold cursor-pointer"
              >
                &gt; One-Click Director Demo Login
              </button>
            </div>
          </form>

          {/* Option to Switch to Jury Login */}
          <div className="mt-6 pt-5 border-t border-slate-200 text-center space-y-2">
            <span className="text-xs font-mono text-slate-500 font-semibold block">
              Evaluation Committee & Jury Member?
            </span>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                navigateTo('/jury');
              }}
              className="w-full py-3 px-4 rounded-xl border-2 border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 font-tech font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Award className="w-4 h-4 text-sky-600" />
              <span>ACCESS JURY EVALUATION LOGIN & SCORING</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN DIRECTOR CONTROL DASHBOARD PAGE
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Top Director Command Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black font-tech text-slate-900 tracking-wider">
                  NCORE 2026 DIRECTOR COMMAND
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-800 font-bold">
                  ADMIN CONSOLE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Department of Computer Science & Engineering • Arunai Engineering College
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
            {/* Jump to Jury Scoring Portal */}
            <button
              onClick={() => navigateTo('/jury')}
              className="px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-300 text-sky-800 hover:bg-sky-600 hover:text-white font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-sky-600" />
              <span>JURY SCORING PORTAL</span>
            </button>

            {/* Jump to Public Landing Page */}
            <button
              onClick={() => navigateTo('/')}
              className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>PUBLIC PORTAL</span>
            </button>

            {/* Logout button */}
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
              title="Logout from Director Command"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Telemetry & Master Countdown Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-white border-2 border-amber-300 shadow-md relative overflow-hidden">
          <div className="hud-corner-tl !border-amber-400"></div>
          <div className="hud-corner-tr !border-amber-400"></div>
          <div className="hud-corner-bl !border-amber-400"></div>
          <div className="hud-corner-br !border-amber-400"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Active Round & Status */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-amber-800 uppercase font-bold bg-amber-100 px-2.5 py-0.5 rounded">
                LIVE TIMING TELEMETRY
              </span>
              <h2 className="text-3xl font-black font-tech text-slate-900 tracking-tight">
                ROUND 0{currentRound}
              </h2>
              <p className="text-xs text-slate-600 font-mono">
                {HACKATHON_ROUNDS.find(r => r.id === currentRound)?.title || '12HRS Hackathon Stage'}
              </p>

              <div className="pt-2 flex items-center gap-2">
                {isTimerRunning ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    LIVE COUNTDOWN ACTIVE
                  </span>
                ) : roundStatus === 'PAUSED' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    <Pause className="w-3.5 h-3.5" />
                    PAUSED BY DIRECTOR
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-300">
                    <Lock className="w-3.5 h-3.5" />
                    STANDBY (AWAITING START)
                  </span>
                )}
              </div>
            </div>

            {/* Middle: Big Countdown Clock */}
            <div className="lg:col-span-4 text-center space-y-1 bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                REMAINING ROUND TIME
              </span>
              <div className="text-5xl sm:text-6xl font-black font-tech text-amber-600 tracking-tight">
                {formatTimer(timerSeconds)}
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                {isTimerRunning ? 'Synchronized across all participant screens' : 'Clock will tick only when Started'}
              </span>
            </div>

            {/* Right: Master Start / Pause Trigger Controls */}
            <div className="lg:col-span-4 space-y-2.5">
              <button
                onClick={toggleTimer}
                className={`w-full py-4 rounded-2xl font-tech font-bold text-sm tracking-wider flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer ${
                  isTimerRunning 
                    ? 'bg-amber-100 text-amber-900 border-2 border-amber-400 hover:bg-amber-200' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-500 border-2 border-emerald-500'
                }`}
              >
                {isTimerRunning ? <Pause className="w-5 h-5 text-amber-800" /> : <Play className="w-5 h-5 text-white" />}
                <span>
                  {isTimerRunning ? 'PAUSE ROUND COUNTDOWN' : `START ROUND 0${currentRound} LIVE COUNTDOWN`}
                </span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => resetRoundTimer()}
                  className="flex-1 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>RESET STANDARD TIMER</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Global Metric KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <span className="text-[10px] font-mono text-slate-500 block font-bold uppercase">ACTIVE ROUND</span>
            <span className="text-xl font-black font-tech text-amber-600">ROUND 0{currentRound}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <span className="text-[10px] font-mono text-slate-500 block font-bold uppercase">REGISTERED TEAMS</span>
            <span className="text-xl font-black font-tech text-sky-700">{teams.length}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <span className="text-[10px] font-mono text-slate-500 block font-bold uppercase">TOTAL PARTICIPANTS</span>
            <span className="text-xl font-black font-tech text-sky-700">{totalParticipants}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <span className="text-[10px] font-mono text-slate-500 block font-bold uppercase">SUBMISSIONS</span>
            <span className="text-xl font-black font-tech text-emerald-700">{totalSubmissions}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <span className="text-[10px] font-mono text-slate-500 block font-bold uppercase">CERTIFICATES</span>
            <span className={`text-xl font-black font-tech ${isCertificateEnabled ? 'text-emerald-700' : 'text-rose-700'}`}>
              {isCertificateEnabled ? 'ENABLED' : 'LOCKED'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <span className="text-[10px] font-mono text-slate-500 block font-bold uppercase">LEADERBOARD</span>
            <span className={`text-xl font-black font-tech ${isLeaderboardPublished ? 'text-emerald-700' : 'text-amber-600'}`}>
              {isLeaderboardPublished ? 'LIVE' : 'DRAFT'}
            </span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pt-8 pb-3 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => { setActiveTab('rounds'); playClickSound(); }}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer ${
              activeTab === 'rounds'
                ? 'bg-amber-100 text-amber-900 border border-amber-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-600" />
            <span>ROUND SETTINGS & TIMING</span>
          </button>

          <button
            onClick={() => { setActiveTab('features'); playClickSound(); }}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer ${
              activeTab === 'features'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-600" />
            <span>CAMPUS CERTIFICATES & GEOFENCE</span>
          </button>

          <button
            onClick={() => { setActiveTab('broadcast'); playClickSound(); }}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer ${
              activeTab === 'broadcast'
                ? 'bg-sky-100 text-sky-900 border border-sky-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Radio className="w-4 h-4 text-sky-600" />
            <span>BROADCAST ALERTS</span>
            {announcements.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-sky-200 text-sky-800 text-[10px] font-bold">
                {announcements.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('teams'); playClickSound(); }}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer ${
              activeTab === 'teams'
                ? 'bg-blue-100 text-blue-900 border border-blue-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>REGISTERED TEAMS ({teams.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('schedule'); playClickSound(); }}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-purple-100 text-purple-900 border border-purple-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>EVENT SCHEDULE MANAGER</span>
          </button>
        </div>

        {/* TAB 1: ROUND SETTINGS & TIMING (CORE REQUIREMENT) */}
        {activeTab === 'rounds' && (
          <div className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Round 1 Card */}
              <div className={`p-6 rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                currentRound === 1 
                  ? 'bg-amber-50/70 border-amber-400 shadow-md ring-2 ring-amber-300/50' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      ROUND 01
                    </span>
                    {currentRound === 1 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold animate-pulse">
                        ACTIVE STAGE
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold font-tech text-slate-900">
                    System Architecture & Design Blueprint
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Teams create formal system flowcharts, database ERDs, hardware/software interface schemas, and technical approach documentation.
                  </p>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Standard Duration:</span>
                      <strong className="text-slate-900">2 Hours (120 min)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Deliverable:</span>
                      <strong className="text-sky-700">Figma / Draw.io / PDF</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200">
                  <button
                    onClick={() => setRound(1)}
                    disabled={currentRound === 1}
                    className={`w-full py-2.5 rounded-xl font-tech font-bold text-xs tracking-wider transition-all cursor-pointer ${
                      currentRound === 1 
                        ? 'bg-amber-500 text-slate-950 shadow-xs' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                    }`}
                  >
                    {currentRound === 1 ? 'CURRENT ACTIVE ROUND' : 'ACTIVATE ROUND 01'}
                  </button>
                </div>
              </div>

              {/* Round 2 Card */}
              <div className={`p-6 rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                currentRound === 2 
                  ? 'bg-amber-50/70 border-amber-400 shadow-md ring-2 ring-amber-300/50' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      ROUND 02
                    </span>
                    {currentRound === 2 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold animate-pulse">
                        ACTIVE STAGE
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold font-tech text-slate-900">
                    Prototype Development & GitHub Submission
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Intensive coding block. Teams implement API endpoints, train AI models, push frequent Git commits, and prepare an intermediate milestone pitch.
                  </p>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Standard Duration:</span>
                      <strong className="text-slate-900">3.5 Hours (210 min)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Deliverable:</span>
                      <strong className="text-sky-700">GitHub Repo + PPT Slides</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200">
                  <button
                    onClick={() => setRound(2)}
                    disabled={currentRound === 2}
                    className={`w-full py-2.5 rounded-xl font-tech font-bold text-xs tracking-wider transition-all cursor-pointer ${
                      currentRound === 2 
                        ? 'bg-amber-500 text-slate-950 shadow-xs' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                    }`}
                  >
                    {currentRound === 2 ? 'CURRENT ACTIVE ROUND' : 'ACTIVATE ROUND 02'}
                  </button>
                </div>
              </div>

              {/* Round 3 Card */}
              <div className={`p-6 rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                currentRound === 3 
                  ? 'bg-amber-50/70 border-amber-400 shadow-md ring-2 ring-amber-300/50' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      ROUND 03
                    </span>
                    {currentRound === 3 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold animate-pulse">
                        ACTIVE STAGE
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold font-tech text-slate-900">
                    Live Demo & Grand Jury Pitch Defense
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Final refinement, production deployment, and live 5-minute prototype demo in front of distinguished industry jury.
                  </p>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Standard Duration:</span>
                      <strong className="text-slate-900">2.5 Hours (150 min)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Deliverable:</span>
                      <strong className="text-sky-700">Live URL + Defense</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200">
                  <button
                    onClick={() => setRound(3)}
                    disabled={currentRound === 3}
                    className={`w-full py-2.5 rounded-xl font-tech font-bold text-xs tracking-wider transition-all cursor-pointer ${
                      currentRound === 3 
                        ? 'bg-amber-500 text-slate-950 shadow-xs' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                    }`}
                  >
                    {currentRound === 3 ? 'CURRENT ACTIVE ROUND' : 'ACTIVATE ROUND 03'}
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Timer Duration Override */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-sm font-bold font-tech text-slate-900 uppercase">
                    CUSTOM COUNTDOWN DURATION OVERRIDE
                  </h3>
                  <p className="text-xs text-slate-500">
                    Extend or set a customized time limit for the active round.
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 font-bold">
                  ACTIVE: {Math.round(timerSeconds / 60)} MINUTES
                </span>
              </div>

              <form onSubmit={handleApplyCustomMinutes} className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-mono text-slate-700 font-semibold">Set Duration (Minutes):</label>
                  <input
                    type="number"
                    min="1"
                    max="1440"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(e.target.value)}
                    className="w-32 bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-xs cursor-pointer"
                >
                  APPLY NEW DURATION
                </button>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => { setCustomMinutes('30'); setRoundDuration(30 * 60); }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    +30m
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCustomMinutes('60'); setRoundDuration(60 * 60); }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    +60m
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCustomMinutes('120'); setRoundDuration(120 * 60); }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    +120m
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: CAMPUS CERTIFICATES & GEOFENCE */}
        {activeTab === 'features' && (
          <div className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campus Geofence Certificate Switch */}
              <div className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                isCertificateEnabled 
                  ? 'bg-emerald-50/80 border-emerald-400 shadow-md' 
                  : 'bg-white border-slate-200'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      GEOFENCE VERIFIED CERTIFICATES
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
                      isCertificateEnabled 
                        ? 'bg-emerald-200 text-emerald-900 border-emerald-400' 
                        : 'bg-rose-100 text-rose-800 border-rose-300'
                    }`}>
                      {isCertificateEnabled ? 'ISSUANCE ACTIVE' : 'LOCKED BY ADMIN'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-tech text-slate-900">
                    Physical Campus Coordinates: (12.1922, 79.0833)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    When enabled, only participants physically located inside the Arunai Engineering College campus radius (2.5 km) can generate their official signed participation certificates.
                  </p>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 space-y-1 shadow-xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>Arunai Engineering College, Tiruvannamalai</span>
                    </div>
                    <div className="text-[11px] text-slate-500 pl-6">
                      Strict Haversine Geofence: 2,500m radius
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200">
                  <button
                    onClick={toggleCertificateIssuance}
                    className={`w-full py-3 rounded-xl font-tech font-bold text-xs tracking-wider transition-all shadow-xs cursor-pointer ${
                      isCertificateEnabled
                        ? 'bg-rose-100 text-rose-800 border border-rose-300 hover:bg-rose-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500 border border-emerald-500'
                    }`}
                  >
                    {isCertificateEnabled ? 'LOCK CERTIFICATE ISSUANCE' : 'ENABLE CAMPUS CERTIFICATE GENERATION'}
                  </button>
                </div>
              </div>

              {/* Leaderboard Publication Mode */}
              <div className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                isLeaderboardPublished 
                  ? 'bg-sky-50/80 border-sky-400 shadow-md' 
                  : 'bg-amber-50/70 border-amber-300'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                      PUBLIC LEADERBOARD VISIBILITY
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
                      isLeaderboardPublished 
                        ? 'bg-sky-200 text-sky-900 border-sky-400' 
                        : 'bg-amber-200 text-amber-900 border-amber-400'
                    }`}>
                      {isLeaderboardPublished ? 'LIVE ON PARTICIPANT PORTALS' : 'UNDER DELIBERATION (DRAFT)'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-tech text-slate-900">
                    Live Tournament Standings Release
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Keep the leaderboard locked in Draft mode during jury evaluation deliberations. Toggle Live to officially broadcast final normalized rankings and scores to all participant dashboards.
                  </p>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 space-y-1 shadow-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Current Top Team:</span>
                      <strong className="text-slate-900">{teams[0]?.teamName || 'N/A'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Top Points:</span>
                      <strong className="text-amber-700">{teams[0]?.scores?.total || 0} pts</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200">
                  <button
                    onClick={toggleLeaderboardPublication}
                    className={`w-full py-3 rounded-xl font-tech font-bold text-xs tracking-wider transition-all shadow-xs cursor-pointer ${
                      isLeaderboardPublished
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                        : 'bg-sky-600 text-white hover:bg-sky-500 border border-sky-500'
                    }`}
                  >
                    {isLeaderboardPublished ? 'SWITCH TO JURY DELIBERATION (DRAFT)' : 'PUBLISH STANDINGS TO TEAMS'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BROADCAST ALERTS */}
        {activeTab === 'broadcast' && (
          <div className="space-y-6 pt-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold font-tech text-slate-900 uppercase flex items-center gap-2">
                  <Radio className="w-4 h-4 text-sky-600" />
                  <span>TRANSMIT LIVE ANNOUNCEMENT TO ALL PARTICIPANTS</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Alerts display immediately on participant dashboards and live feeds.
                </p>
              </div>

              <form onSubmit={handleBroadcastSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    ANNOUNCEMENT TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ROUND 01 MILESTONE EXTENDED BY 15 MINUTES"
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-mono font-bold uppercase focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    DETAILED INSTRUCTIONS *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide specific instructions regarding GitHub push deadlines, jury presentation order, or campus venue notices..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-none font-sans"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-mono text-slate-600 font-semibold">PRIORITY LEVEL:</label>
                    <select
                      value={broadcastType}
                      onChange={(e) => setBroadcastType(e.target.value)}
                      className="bg-white text-xs text-slate-800 border border-slate-300 rounded-lg px-3 py-1.5 font-mono font-bold"
                    >
                      <option value="CRITICAL">Critical Alert (Pulsing Red)</option>
                      <option value="INFO">Standard Information (Blue)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs tracking-wider shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>TRANSMIT BROADCAST</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Broadcast History */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-mono text-slate-600 font-bold uppercase tracking-wider">
                  ACTIVE BROADCAST LOG ({announcements.length})
                </span>
              </div>

              {announcements.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-2xl border flex items-start justify-between gap-4 transition-all ${
                    alert.type === 'CRITICAL' 
                      ? 'bg-amber-50/80 border-amber-300 text-amber-950' 
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        alert.type === 'CRITICAL' ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {alert.type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{alert.timestamp}</span>
                    </div>
                    <h4 className="text-xs font-bold font-tech text-slate-900">{alert.title}</h4>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">{alert.message}</p>
                  </div>

                  <button
                    onClick={() => dismissAnnouncement(alert.id)}
                    className="text-xs font-mono text-slate-400 hover:text-rose-600 cursor-pointer"
                    title="Dismiss alert"
                  >
                    Dismiss
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REGISTERED TEAMS OVERSIGHT */}
        {activeTab === 'teams' && (
          <div className="space-y-6 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold font-tech text-slate-900 uppercase">
                  REGISTERED TEAMS & CREDENTIAL OVERVIEW
                </h3>
                <p className="text-xs text-slate-500">
                  Inspect allocated members, contact numbers, generated passkeys, and artifact links.
                </p>
              </div>

              <input
                type="text"
                placeholder="Search team, leader, or theme..."
                value={teamSearch}
                onChange={(e) => setTeamSearch(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 font-mono w-full sm:w-64 shadow-xs"
              />
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-mono text-[10px] uppercase font-bold">
                    <th className="py-3 px-3">Team</th>
                    <th className="py-3 px-3">Theme</th>
                    <th className="py-3 px-3">Leader & Contact</th>
                    <th className="py-3 px-3">Members (4 Max)</th>
                    <th className="py-3 px-3">Generated Passkey</th>
                    <th className="py-3 px-3">Artifacts</th>
                    <th className="py-3 px-3 text-right">Score / Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredTeams.map((t) => (
                    <tr key={t.teamId} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{t.teamName}</div>
                        <div className="text-[10px] text-sky-700 font-mono">{t.teamId}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] text-slate-700">
                          {t.domainName}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-slate-900 font-semibold">{t.leaderName}</div>
                        <div className="text-[10px] text-slate-500">{t.leaderEmail}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          {t.members?.length || 1} / 4 Registered
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-1 rounded bg-amber-50 border border-amber-300 text-amber-900 font-mono font-bold text-xs">
                          {t.passkey}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1 text-[10px]">
                          {t.submission?.github ? (
                            <a href={t.submission.github} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                              Git
                            </a>
                          ) : <span className="text-slate-400">-</span>}
                          <span>•</span>
                          {t.submission?.demo ? (
                            <a href={t.submission.demo} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                              Demo
                            </a>
                          ) : <span className="text-slate-400">-</span>}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="font-bold text-amber-700 text-xs">{t.scores?.total || 0} pts</div>
                        <div className="text-[10px] text-slate-400">Rank #{t.rank}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: EVENT SCHEDULE MANAGER */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 pt-6">
            {/* Header with Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold font-tech text-slate-900 uppercase tracking-wider">
                    EVENT SCHEDULE & TIME MANAGER
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust schedule times, rename milestones, broadcast live active slots, or add custom agenda slots.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleResetSchedule}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  title="Reset to default brochure schedule"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset Default</span>
                </button>

                <button
                  onClick={() => {
                    setIsAddingSlot(!isAddingSlot);
                    playClickSound();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-tech font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingSlot ? 'Close Form' : 'Add Milestone'}</span>
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            {scheduleNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>✓ {scheduleNotice}</span>
              </div>
            )}

            {/* Form to Add New Milestone */}
            {isAddingSlot && (
              <form onSubmit={handleAddNewSlot} className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-300 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                  <span className="text-xs font-mono font-bold text-amber-900 flex items-center gap-1.5 uppercase">
                    <Plus className="w-4 h-4 text-amber-700" />
                    CREATE NEW SCHEDULE MILESTONE
                  </span>
                  <span className="text-[11px] font-mono text-amber-700">Appears on public agenda</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                      TIME WINDOW *
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. 02:00 PM - 03:30 PM"
                        value={newSlotTime}
                        onChange={(e) => setNewSlotTime(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 font-mono font-semibold focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                      MILESTONE TITLE *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mid-Sprint Code Review"
                      value={newSlotTitle}
                      onChange={(e) => setNewSlotTitle(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                      VENUE / LOCATION
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Central Computing Lab"
                      value={newSlotVenue}
                      onChange={(e) => setNewSlotVenue(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingSlot(false)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-600 text-xs font-mono font-semibold hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-tech font-bold cursor-pointer shadow-xs"
                  >
                    Save New Milestone
                  </button>
                </div>
              </form>
            )}

            {/* Schedule List */}
            <div className="space-y-3">
              {schedule.map((slot) => {
                const isEditing = editingScheduleId === slot.id;

                if (isEditing) {
                  return (
                    <div
                      key={slot.id}
                      className="p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-400 shadow-md space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                        <span className="text-xs font-mono font-bold text-amber-900 flex items-center gap-1.5">
                          <Edit3 className="w-4 h-4 text-amber-700" />
                          EDITING TIME & MILESTONE
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">ID: {slot.id}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        {/* Time Edit Input */}
                        <div className="sm:col-span-4">
                          <label className="block text-xs font-mono text-slate-700 font-bold mb-1 flex items-center justify-between">
                            <span>EVENT TIME *</span>
                            <span className="text-[10px] text-amber-800 font-normal">e.g. 09:30 AM</span>
                          </label>
                          <div className="relative">
                            <Clock className="w-4 h-4 text-amber-600 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={editScheduleTime}
                              onChange={(e) => setEditScheduleTime(e.target.value)}
                              className="w-full bg-white border-2 border-amber-400 rounded-xl pl-9 pr-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                              placeholder="09:30 AM"
                              autoFocus
                            />
                          </div>

                          {/* Quick Time Formats */}
                          <div className="flex gap-1.5 mt-1.5 overflow-x-auto">
                            {['+15m', '+30m', '+1h'].map((adj) => (
                              <button
                                key={adj}
                                type="button"
                                onClick={() => {
                                  // append note or quick helper
                                  setEditScheduleTime(prev => prev ? `${prev} (${adj})` : adj);
                                }}
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 cursor-pointer"
                              >
                                {adj}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Title Edit Input */}
                        <div className="sm:col-span-5">
                          <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                            MILESTONE TITLE
                          </label>
                          <input
                            type="text"
                            value={editScheduleTitle}
                            onChange={(e) => setEditScheduleTitle(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
                            placeholder="Milestone title"
                          />
                        </div>

                        {/* Venue Edit Input */}
                        <div className="sm:col-span-3">
                          <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                            VENUE
                          </label>
                          <input
                            type="text"
                            value={editScheduleVenue}
                            onChange={(e) => setEditScheduleVenue(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                            placeholder="Venue"
                          />
                        </div>
                      </div>

                      {/* Edit Form Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-amber-200">
                        <button
                          type="button"
                          onClick={() => handleDeleteScheduleSlot(slot.id)}
                          className="text-xs font-mono text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Slot</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleCancelScheduleEdit}
                            className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-mono font-semibold hover:bg-slate-100 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveScheduleEdit(slot.id)}
                            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-tech font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Save Time</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={slot.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      slot.active
                        ? 'bg-amber-50/90 border-2 border-amber-400 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Clickable time badge with edit icon */}
                      <button
                        onClick={() => handleStartEditSchedule(slot)}
                        className={`group px-3 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                          slot.active 
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs' 
                            : 'bg-slate-100 hover:bg-amber-100 text-slate-800 border-slate-200 hover:border-amber-300'
                        }`}
                        title="Click to edit schedule time"
                      >
                        <Clock className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-800" />
                        <span>{slot.time}</span>
                        <Edit3 className="w-3 h-3 opacity-60 group-hover:opacity-100 text-slate-600 group-hover:text-amber-800" />
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold font-tech text-slate-900">{slot.title}</h4>
                          {slot.active && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold animate-pulse">
                              NOW HAPPENING
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{slot.venue}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Explicit Edit Time Button */}
                      <button
                        onClick={() => handleStartEditSchedule(slot)}
                        className="px-3 py-1.5 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                        title="Edit schedule time and details"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-sky-600" />
                        <span>Edit Time</span>
                      </button>

                      {/* Active Live Broadcast Slot Toggle */}
                      <button
                        onClick={() => toggleActiveScheduleSlot(slot.id)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                          slot.active
                            ? 'bg-amber-200 text-amber-900 border border-amber-400'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {slot.active ? 'Active Live Slot' : 'Set as Current'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
