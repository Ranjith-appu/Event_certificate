import React, { useState } from 'react';
import { 
  Lock,
  LogOut,
  Trophy, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Send, 
  Users, 
  FileText, 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  GitBranch, 
  Code, 
  Sliders, 
  Check, 
  Download, 
  Radio, 
  UserCheck, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { HACKATHON_ROUNDS, HACKATHON_THEMES, EVENT_DETAILS } from '../data/ncoreData';
import { playClickSound, playSuccessSound, playAlertSound } from '../utils/audio';

const JURY_PROFILES = [
  { id: 'j_umadevi', name: 'Mrs. V. Umadevi', role: 'Convener & HOD (UG), CSE' },
  { id: 'j_anandan', name: 'Dr. P. Anandan', role: 'Convener & Professor, CSE' },
  { id: 'j_industry', name: 'Dr. S. K. Narayanan', role: 'Industry Lead AI Architect' },
  { id: 'j_guest', name: 'Distinguished External Jury', role: 'Evaluation Committee' }
];

const JuryPage = () => {
  const { 
    currentUser,
    loginWithJuryPassword,
    loginAsJuryDirect,
    logout,
    teams, 
    currentRound, 
    timerSeconds, 
    isTimerRunning, 
    roundStatus, 
    saveJuryEvaluation, 
    navigateTo 
  } = useHackathon();

  // Evaluator Profile
  const [selectedJury, setSelectedJury] = useState(() => currentUser?.name || JURY_PROFILES[0].name);
  const [juryPasswordInput, setJuryPasswordInput] = useState('');
  const [juryAuthError, setJuryAuthError] = useState('');

  const handleJuryAuthSubmit = (e) => {
    e.preventDefault();
    setJuryAuthError('');
    playClickSound();

    const res = loginWithJuryPassword(selectedJury, juryPasswordInput);
    if (!res.success) {
      setJuryAuthError(res.message || 'Invalid password. Try jury123.');
    }
  };

  // Selected team for scoring
  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.teamId || '');

  // Filter & Search
  const [domainFilter, setDomainFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [evalFilter, setEvalFilter] = useState('all'); // 'all' | 'evaluated' | 'pending'

  // View state: 'workbench' | 'scoreboard'
  const [activeView, setActiveView] = useState('workbench');

  const selectedTeam = teams.find(t => t.teamId === selectedTeamId) || teams[0];

  // Scoring form state initialized from selected team
  const [r1Score, setR1Score] = useState(selectedTeam?.scores?.round1 || 0);
  const [r2Score, setR2Score] = useState(selectedTeam?.scores?.round2 || 0);
  const [r3Score, setR3Score] = useState(selectedTeam?.scores?.round3 || 0);
  const [juryRemarks, setJuryRemarks] = useState(
    selectedTeam?.juryFeedback?.[selectedJury]?.notes || ''
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  // When selected team changes, update form fields
  const handleSelectTeam = (teamId) => {
    setSelectedTeamId(teamId);
    const t = teams.find(item => item.teamId === teamId);
    if (t) {
      setR1Score(t.scores?.round1 || 0);
      setR2Score(t.scores?.round2 || 0);
      setR3Score(t.scores?.round3 || 0);
      setJuryRemarks(t.juryFeedback?.[selectedJury]?.notes || '');
    }
    setSaveSuccess(false);
    playClickSound();
  };

  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveEvaluation = (e) => {
    e.preventDefault();
    if (!selectedTeam) return;

    saveJuryEvaluation(selectedTeam.teamId, {
      round1: r1Score,
      round2: r2Score,
      round3: r3Score,
      feedback: juryRemarks,
      evaluatorName: selectedJury
    });

    setSaveSuccess(true);
    playSuccessSound();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Filtered teams list
  const filteredTeams = teams.filter(t => {
    const matchesDomain = domainFilter === 'all' || t.domain === domainFilter;
    const matchesSearch = t.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.teamId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isEvaluated = (t.scores?.total || 0) > 0;
    const matchesEval = evalFilter === 'all' || 
                        (evalFilter === 'evaluated' && isEvaluated) || 
                        (evalFilter === 'pending' && !isEvaluated);

    return matchesDomain && matchesSearch && matchesEval;
  });

  const evaluatedCount = teams.filter(t => (t.scores?.total || 0) > 0).length;
  const pendingCount = teams.length - evaluatedCount;
  const activeRoundInfo = HACKATHON_ROUNDS.find(r => r.id === currentRound) || HACKATHON_ROUNDS[0];

  const currentTotal = (parseInt(r1Score, 10) || 0) + (parseInt(r2Score, 10) || 0) + (parseInt(r3Score, 10) || 0);

  
  // 1. AUTHENTICATION GATE IF NOT JURY OR ADMIN
  if (currentUser?.role !== 'jury' && currentUser?.role !== 'admin') {
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
        </div>

        <div className="w-full max-w-md bg-white border-2 border-sky-300 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="hud-corner-tl !border-sky-400"></div>
          <div className="hud-corner-tr !border-sky-400"></div>
          <div className="hud-corner-bl !border-sky-400"></div>
          <div className="hud-corner-br !border-sky-400"></div>

          <div className="text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-300 flex items-center justify-center mx-auto text-sky-600 shadow-xs">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-sky-800 uppercase font-bold bg-sky-100/80 px-2.5 py-0.5 rounded">
                RESTRICTED EVALUATION COMMITTEE GATE
              </span>
              <h1 className="text-2xl font-black font-tech text-slate-900 mt-2">
                JURY SCORING ACCESS
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Select your evaluator profile and enter committee password to score teams and maintain tournament standings.
              </p>
            </div>
          </div>

          {juryAuthError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono font-medium">
              {juryAuthError}
            </div>
          )}

          <form onSubmit={handleJuryAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                EVALUATOR PROFILE
              </label>
              <select
                value={selectedJury}
                onChange={(e) => setSelectedJury(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500 focus:bg-white"
              >
                {JURY_PROFILES.map(j => (
                  <option key={j.id} value={j.name}>
                    {j.name} ({j.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                JURY ACCESS PASSWORD
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="jury123"
                  value={juryPasswordInput}
                  onChange={(e) => setJuryPasswordInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-3 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-tech font-bold text-xs tracking-wider bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-all cursor-pointer"
            >
              AUTHENTICATE & ENTER JURY WORKBENCH
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  loginAsJuryDirect(selectedJury);
                  playSuccessSound();
                }}
                className="text-[11px] font-mono text-sky-700 hover:underline font-bold cursor-pointer"
              >
                &gt; One-Click Jury Demo Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Top Jury Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700 font-bold shadow-xs">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black font-tech text-slate-900 tracking-wider">
                  NCORE 2026 JURY PORTAL
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 border border-sky-300 text-sky-800 font-bold">
                  EVALUATION WORKBENCH
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Department of Computer Science & Engineering • Arunai Engineering College
              </p>
            </div>
          </div>

          {/* Evaluator Selector & Nav actions */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <UserCheck className="w-3.5 h-3.5 text-sky-600" />
              <span className="text-slate-500 font-bold">JURY:</span>
              <select
                value={selectedJury}
                onChange={(e) => setSelectedJury(e.target.value)}
                className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
              >
                {JURY_PROFILES.map(j => (
                  <option key={j.id} value={j.name}>
                    {j.name} ({j.role})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => navigateTo('/')}
              className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>RETURN HOME</span>
            </button>

            <button
              onClick={() => navigateTo('/admin')}
              className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>DIRECTOR CONSOLE</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Active Round Notice Bar (Synchronized with Admin) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-600 text-white shadow-xs">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-sky-900">
                  CURRENT STAGE CONTROLLED BY DIRECTOR:
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-200 text-sky-900 font-mono font-bold text-xs">
                  ROUND 0{currentRound} - {activeRoundInfo.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-mono mt-0.5">
                Evaluation criteria: {activeRoundInfo.evaluationCriteria}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-500 block uppercase">Round Remaining</span>
              <span className="text-xl font-black font-tech text-amber-700">
                {formatTimer(timerSeconds)}
              </span>
            </div>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
              isTimerRunning 
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                : 'bg-slate-100 text-slate-600 border-slate-300'
            }`}>
              {isTimerRunning ? 'COUNT ACTIVE' : 'TIMER STANDBY'}
            </span>
          </div>
        </div>

        {/* 4 Jury KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">REGISTERED TEAMS</span>
            <span className="text-2xl font-black font-tech text-slate-900">{teams.length}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">EVALUATED TEAMS</span>
            <span className="text-2xl font-black font-tech text-emerald-700">{evaluatedCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">PENDING EVALUATION</span>
            <span className="text-2xl font-black font-tech text-amber-600">{pendingCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">TOURNAMENT LEADER</span>
            <span className="text-lg font-black font-tech text-sky-700 truncate block">
              {teams[0]?.teamName || 'N/A'} ({teams[0]?.scores?.total || 0} pts)
            </span>
          </div>
        </div>

        {/* View Switcher: Workbench vs Scoreboard */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveView('workbench'); playClickSound(); }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeView === 'workbench'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              EVALUATION WORKBENCH
            </button>

            <button
              onClick={() => { setActiveView('scoreboard'); playClickSound(); }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeView === 'scoreboard'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              FULL COMPARATIVE SCOREBOARD
            </button>
          </div>

          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            Showing {filteredTeams.length} of {teams.length} teams
          </span>
        </div>

        {/* VIEW 1: EVALUATION WORKBENCH */}
        {activeView === 'workbench' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Team Selector & Filter list */}
            <div className="lg:col-span-4 space-y-3">
              {/* Search & Domain Filter Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search teams or projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 font-bold uppercase block">
                    Domain / Track Filter:
                  </label>
                  <select
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800 font-mono font-semibold focus:border-sky-500"
                  >
                    <option value="all">All 6 Challenge Themes</option>
                    {HACKATHON_THEMES.map(theme => (
                      <option key={theme.id} value={theme.id}>
                        {theme.number}. {theme.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter buttons */}
                <div className="flex gap-1.5 pt-1">
                  {['all', 'pending', 'evaluated'].map(status => (
                    <button
                      key={status}
                      onClick={() => setEvalFilter(status)}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                        evalFilter === status 
                          ? 'bg-sky-100 text-sky-800 border border-sky-300' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Team Card List */}
              <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                {filteredTeams.map((t) => {
                  const isSelected = t.teamId === selectedTeam?.teamId;
                  const isDone = (t.scores?.total || 0) > 0;

                  return (
                    <div
                      key={t.teamId}
                      onClick={() => handleSelectTeam(t.teamId)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-sky-50/90 border-2 border-sky-500 shadow-sm ring-1 ring-sky-300' 
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-bold text-sky-800">
                          {t.teamId}
                        </span>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                          isDone 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {isDone ? 'EVALUATED' : 'PENDING'}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold font-tech text-slate-900 leading-snug">
                        {t.teamName}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate font-mono mt-0.5">
                        {t.projectTitle}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                        <span className="text-[10px] text-slate-500">{t.domainName}</span>
                        <span className="font-bold text-amber-700">
                          {t.scores?.total || 0} pts (Rank #{t.rank})
                        </span>
                      </div>
                    </div>
                  );
                })}

                {filteredTeams.length === 0 && (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs font-mono">
                    No registered teams found matching filters.
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Full Team Evaluation Sheet */}
            <div className="lg:col-span-8">
              {selectedTeam ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                  {/* Team Profile Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black font-tech text-slate-900">
                          {selectedTeam.teamName}
                        </span>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-50 border border-sky-300 text-sky-800">
                          {selectedTeam.teamId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-mono">
                        {selectedTeam.college} • {selectedTeam.department}
                      </p>
                      <p className="text-xs text-sky-700 font-tech font-bold pt-1">
                        Theme: {selectedTeam.domainName}
                      </p>
                    </div>

                    <div className="text-right font-mono bg-amber-50 p-3 rounded-2xl border border-amber-200 shrink-0">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">CURRENT SCORE</span>
                      <span className="text-3xl font-black font-tech text-amber-700">
                        {currentTotal} <span className="text-xs font-mono text-slate-400">/ 300</span>
                      </span>
                      <div className="text-[10px] text-slate-500 font-semibold">Tournament Rank #{selectedTeam.rank}</div>
                    </div>
                  </div>

                  {/* Registered Members Roster (Up to 4) */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-sky-600" />
                      <span>TEAM ROSTER ({selectedTeam.members?.length || 1} / 4 MEMBERS):</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedTeam.members?.map((m, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono">
                          <div>
                            <div className="font-bold text-slate-900">{m.name}</div>
                            <div className="text-[10px] text-sky-700">{m.role}</div>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white text-slate-500 border border-slate-200 font-bold">
                            {idx === 0 ? 'LEADER' : `MEMBER ${idx + 1}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submitted Artifacts Inspection Station */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-xs font-mono text-slate-800 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-sky-600" />
                      <span>SUBMITTED MILESTONE DELIVERABLES:</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-800 font-tech">
                        Project: {selectedTeam.projectTitle}
                      </h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        {selectedTeam.submission?.abstract || 'No abstract provided yet.'}
                      </p>
                    </div>

                    {/* Deliverable Action Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                      {/* Round 1 Blueprint */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono space-y-1">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Round 1: Architecture</span>
                        {selectedTeam.submission?.architectureUrl ? (
                          <a
                            href={selectedTeam.submission.architectureUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 hover:underline"
                          >
                            <span>Open Blueprint</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Not submitted</span>
                        )}
                      </div>

                      {/* Round 2 GitHub */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono space-y-1">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Round 2: Git Repository</span>
                        {selectedTeam.submission?.github ? (
                          <a
                            href={selectedTeam.submission.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 hover:underline"
                          >
                            <span>GitHub Source</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Not submitted</span>
                        )}
                      </div>

                      {/* Round 3 Prototype */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono space-y-1">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Round 3: Live Demo</span>
                        {selectedTeam.submission?.demo ? (
                          <a
                            href={selectedTeam.submission.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 hover:underline"
                          >
                            <span>Launch Live App</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Not submitted</span>
                        )}
                      </div>
                    </div>

                    {selectedTeam.submission?.techStack && (
                      <div className="pt-2 text-[11px] font-mono text-slate-500">
                        <strong className="text-slate-700">Tech Stack: </strong>
                        {selectedTeam.submission.techStack}
                      </div>
                    )}
                  </div>

                  {/* SCORING & RUBRIC MAINTENANCE FORM */}
                  <form onSubmit={handleSaveEvaluation} className="space-y-6 pt-2">
                    <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                      <h3 className="text-sm font-bold font-tech text-slate-900 uppercase flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-sky-600" />
                        <span>JURY EVALUATION RUBRIC & SCORING SLOTS</span>
                      </h3>
                      <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded font-bold border border-amber-200">
                        ACTIVE EVALUATOR: {selectedJury}
                      </span>
                    </div>

                    {saveSuccess && (
                      <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-xs font-mono text-emerald-900 font-bold flex items-center gap-2 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Evaluation saved successfully! Leaderboard rankings and total points have been recalculated.</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Round 1 Score Input */}
                      <div className={`p-4 rounded-2xl border transition-all ${
                        currentRound === 1 ? 'bg-amber-50/50 border-amber-300' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-slate-900">
                            ROUND 01
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">MAX 100</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-sans mb-3">
                          Architecture, Flowcharts, System Modeling & Feasibility
                        </p>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={r1Score}
                            onChange={(e) => setR1Score(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-lg font-black font-tech text-slate-900 focus:outline-none focus:border-sky-500 text-center"
                          />
                          <span className="text-xs font-mono text-slate-400 font-bold">/ 100</span>
                        </div>
                      </div>

                      {/* Round 2 Score Input */}
                      <div className={`p-4 rounded-2xl border transition-all ${
                        currentRound === 2 ? 'bg-amber-50/50 border-amber-300' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-slate-900">
                            ROUND 02
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">MAX 100</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-sans mb-3">
                          Code Rigor, Git Commits, Prototype Progress & Mid-Check
                        </p>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={r2Score}
                            onChange={(e) => setR2Score(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-lg font-black font-tech text-slate-900 focus:outline-none focus:border-sky-500 text-center"
                          />
                          <span className="text-xs font-mono text-slate-400 font-bold">/ 100</span>
                        </div>
                      </div>

                      {/* Round 3 Score Input */}
                      <div className={`p-4 rounded-2xl border transition-all ${
                        currentRound === 3 ? 'bg-amber-50/50 border-amber-300' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-slate-900">
                            ROUND 03
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">MAX 100</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-sans mb-3">
                          Live Working Demo, Impact, Pitch Quality & Q&A Defense
                        </p>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={r3Score}
                            onChange={(e) => setR3Score(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-lg font-black font-tech text-slate-900 focus:outline-none focus:border-sky-500 text-center"
                          />
                          <span className="text-xs font-mono text-slate-400 font-bold">/ 100</span>
                        </div>
                      </div>
                    </div>

                    {/* Qualitative Remarks & Jury Feedback */}
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        JURY EVALUATION CRITIQUE & REVIEWER NOTES:
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Provide constructive feedback on technical architecture, originality, execution hurdles, or commendations..."
                        value={juryRemarks}
                        onChange={(e) => setJuryRemarks(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white resize-none font-sans"
                      />
                    </div>

                    {/* Action Save Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <div className="text-xs font-mono text-slate-600">
                        Cumulative points for <strong className="text-slate-900">{selectedTeam.teamName}</strong>: <span className="font-bold text-amber-700 text-base">{currentTotal} pts</span>
                      </div>

                      <button
                        type="submit"
                        className="px-8 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-tech font-bold text-xs tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>SAVE & FINALIZE TEAM EVALUATION</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
                  Select a team from the left sidebar to begin scoring.
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: FULL COMPARATIVE SCOREBOARD */}
        {activeView === 'scoreboard' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold font-tech text-slate-900 uppercase">
                  COMPLETE HACKATHON TOURNAMENT STANDINGS
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time normalized points table across all 3 knockout and refinement rounds.
                </p>
              </div>

              <div className="text-xs font-mono text-slate-600 font-bold">
                JURY DELIBERATION MATRIX
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[10px] uppercase font-bold">
                    <th className="py-3 px-3">Rank</th>
                    <th className="py-3 px-3">Team & Project</th>
                    <th className="py-3 px-3">Theme</th>
                    <th className="py-3 px-2 text-center">Round 01</th>
                    <th className="py-3 px-2 text-center">Round 02</th>
                    <th className="py-3 px-2 text-center">Round 03</th>
                    <th className="py-3 px-3 text-right">Total Score</th>
                    <th className="py-3 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {teams.map((t, idx) => {
                    const rankNum = idx + 1;
                    return (
                      <tr key={t.teamId} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-bold text-xs ${
                            rankNum === 1 
                              ? 'bg-amber-400 text-slate-950 shadow-xs' 
                              : rankNum === 2 
                              ? 'bg-slate-200 text-slate-800' 
                              : rankNum === 3 
                              ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {rankNum}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{t.teamName}</div>
                          <div className="text-[10px] text-slate-500 font-sans truncate max-w-xs">{t.projectTitle}</div>
                        </td>
                        <td className="py-3 px-3 text-[11px] text-slate-600">{t.domainName}</td>
                        <td className="py-3 px-2 text-center font-bold text-slate-700">{t.scores?.round1 || 0}</td>
                        <td className="py-3 px-2 text-center font-bold text-slate-700">{t.scores?.round2 || 0}</td>
                        <td className="py-3 px-2 text-center font-bold text-slate-700">{t.scores?.round3 || 0}</td>
                        <td className="py-3 px-3 text-right font-bold text-amber-700 text-sm">
                          {t.scores?.total || 0} pts
                        </td>
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => {
                              handleSelectTeam(t.teamId);
                              setActiveView('workbench');
                            }}
                            className="px-2.5 py-1 rounded bg-sky-50 border border-sky-300 text-sky-700 hover:bg-sky-600 hover:text-white text-[10px] font-bold cursor-pointer transition-all"
                          >
                            Score
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JuryPage;
