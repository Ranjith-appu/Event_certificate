import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Trophy, 
  Terminal, 
  KeyRound, 
  Users, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  GitBranch, 
  Copy, 
  Award,
  Sparkles,
  Layers,
  Code,
  Lock,
  Bell,
  Search,
  Filter,
  Medal,
  AlertTriangle,
  Info,
  Radio,
  FileText
} from 'lucide-react';
import { HACKATHON_ROUNDS } from '../data/ncoreData';
import { useHackathon } from '../context/HackathonContext';
import { playClickSound, playSuccessSound } from '../utils/audio';

const ParticipantDashboard = () => {
  const { 
    currentUser, 
    currentRound, 
    timerSeconds, 
    isTimerRunning,
    roundStatus,
    teams,
    isLeaderboardPublished,
    announcements,
    dismissAnnouncement,
    submitProject, 
    setActiveModal, 
    setSelectedTeamForCert 
  } = useHackathon();

  const team = currentUser?.teamData;
  const [activeTab, setActiveTab] = useState('submission'); // 'submission' | 'leaderboard' | 'notifications' | 'rounds'
  const [copiedPasskey, setCopiedPasskey] = useState(false);

  // Leaderboard filter & search inside dashboard
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Submission Form State
  const [submissionForm, setSubmissionForm] = useState({
    architectureUrl: team?.submission?.architectureUrl || '',
    github: team?.submission?.github || '',
    demo: team?.submission?.demo || '',
    techStack: team?.submission?.techStack || '',
    abstract: team?.submission?.abstract || ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!team) return null;

  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyPasskey = () => {
    navigator.clipboard.writeText(team.passkey);
    setCopiedPasskey(true);
    playClickSound();
    setTimeout(() => setCopiedPasskey(false), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitProject(team.teamId, submissionForm, currentRound);
    setSubmitSuccess(true);
    playSuccessSound();
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const openCertForTeam = () => {
    setSelectedTeamForCert(team);
    setActiveModal('cert');
    playClickSound();
  };

  // Sort teams for participant leaderboard
  const sortedTeams = [...teams].sort((a, b) => (b.scores?.total || 0) - (a.scores?.total || 0));
  const filteredTeams = sortedTeams.filter((t) => {
    const matchesDomain = selectedDomain === 'all' || t.domain === selectedDomain;
    const matchesSearch = t.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const activeAlertsCount = announcements.filter(a => a.active).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border-2 border-sky-300 rounded-2xl p-6 sm:p-8 my-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="hud-corner-tl !border-sky-400"></div>
        <div className="hud-corner-tr !border-sky-400"></div>
        <div className="hud-corner-bl !border-sky-400"></div>
        <div className="hud-corner-br !border-sky-400"></div>

        {/* Close Modal Button */}
        <button
          onClick={() => {
            playClickSound();
            setActiveModal(null);
          }}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Workspace Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black font-tech text-slate-900 tracking-tight">
                NCORE 2026
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-300 text-sky-800 font-bold">
                12HRS TEAM WORKSPACE
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono mt-1">
              <strong className="text-slate-900">{team.teamName}</strong> • {team.college}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openCertForTeam}
              className="px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-300 text-sky-800 hover:bg-sky-600 hover:text-white transition-all text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Award className="w-4 h-4 text-sky-600 group-hover:text-white" />
              <span>CERTIFICATE PORTAL</span>
            </button>
          </div>
        </div>

        {/* Workspace Tabs: Submission vs Leaderboard vs Notifications vs Rounds */}
        <div className="flex items-center gap-2 border-b border-slate-200 pt-4 pb-2 my-2 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => { setActiveTab('submission'); playClickSound(); }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer ${
              activeTab === 'submission'
                ? 'bg-sky-50 text-sky-800 border border-sky-300 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GitBranch className="w-4 h-4 text-sky-600" />
            <span>PROJECT & MILESTONES</span>
          </button>

          <button
            onClick={() => { setActiveTab('leaderboard'); playClickSound(); }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-amber-50 text-amber-800 border border-amber-300 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>LIVE LEADERBOARD</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-amber-800 border border-amber-300 font-bold">
              #{team.rank || 1}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('notifications'); playClickSound(); }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-blue-50 text-blue-800 border border-blue-300 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bell className="w-4 h-4 text-blue-600" />
            <span>DIRECTOR ALERTS</span>
            {activeAlertsCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-bold">
                {activeAlertsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('rounds'); playClickSound(); }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer ${
              activeTab === 'rounds'
                ? 'bg-purple-50 text-purple-800 border border-purple-300 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-600" />
            <span>ROUNDS TIMELINE</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-purple-800 border border-purple-300 font-bold">
              R0{currentRound} ACTIVE
            </span>
          </button>
        </div>

        {/* TAB 1: MILESTONE SUBMISSION & WORKSPACE */}
        {activeTab === 'submission' && (
          <div className="space-y-6 pt-2">
            {/* Dashboard 3 Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* CARD 1: CURRENT ROUND */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative overflow-hidden shadow-xs">
                <div className="hud-corner-tl !border-sky-300"></div>
                <div className="hud-corner-tr !border-sky-300"></div>
                <div className="text-[10px] font-mono text-sky-700 tracking-wider font-bold">CURRENT ROUND</div>
                <div className="text-2xl font-black font-tech text-slate-900 mt-1">
                  ROUND 0{currentRound}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-mono font-bold">
                  {isTimerRunning ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      LIVE COUNTDOWN
                    </span>
                  ) : roundStatus === 'PAUSED' ? (
                    <span className="text-amber-700">PAUSED BY ADMIN</span>
                  ) : (
                    <span className="text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      STANDBY
                    </span>
                  )}
                </div>
              </div>

              {/* CARD 2: TIME REMAINING */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative overflow-hidden shadow-xs">
                <div className="hud-corner-tl !border-sky-300"></div>
                <div className="hud-corner-tr !border-sky-300"></div>
                <div className="text-[10px] font-mono text-sky-700 tracking-wider font-bold">TIME REMAINING</div>
                <div className="text-2xl font-black font-tech mt-1">
                  {isTimerRunning ? (
                    <span className="text-amber-700 font-mono">{formatTimer(timerSeconds)}</span>
                  ) : (
                    <span className="text-slate-500 font-mono">{formatTimer(timerSeconds)}</span>
                  )}
                </div>
                <div className="mt-2 text-[11px] font-mono text-slate-500">
                  {isTimerRunning 
                    ? 'Synchronized with Director' 
                    : roundStatus === 'PAUSED' 
                    ? 'Paused by Director' 
                    : 'Awaiting Admin Start'}
                </div>
              </div>

              {/* CARD 3: TEAM RANK */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative overflow-hidden shadow-xs">
                <div className="hud-corner-tl !border-sky-300"></div>
                <div className="hud-corner-tr !border-sky-300"></div>
                <div className="text-[10px] font-mono text-sky-700 tracking-wider font-bold">STANDINGS RANK</div>
                <div className="text-2xl font-black font-tech text-sky-800 mt-1">
                  #{team.rank < 10 ? `0${team.rank}` : team.rank}
                </div>
                <div className="mt-2 text-xs font-mono text-slate-600">
                  Total Score: <strong className="text-slate-900 font-bold">{team.scores?.total || 0} pts</strong>
                </div>
              </div>
            </div>

            {/* Team Credentials Bar */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold block">TEAM ID</span>
                  <span className="text-xs font-mono font-bold text-sky-800">{team.teamId}</span>
                </div>
                <div className="h-6 w-px bg-slate-300"></div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold block">THEME</span>
                  <span className="text-xs font-mono text-slate-800 font-medium">{team.domainName}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-300 text-xs font-mono text-amber-900 flex items-center gap-2 font-bold">
                  <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                  <span>Passkey: <strong>{team.passkey}</strong></span>
                </div>
                <button
                  onClick={handleCopyPasskey}
                  className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:text-sky-700 transition-colors cursor-pointer shadow-xs"
                  title="Copy Team Passkey for members"
                >
                  {copiedPasskey ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Roster & Project Submission Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Team Members List (Up to 4) */}
              <div className="lg:col-span-4 space-y-3">
                <h4 className="text-xs font-mono text-sky-800 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Users className="w-3.5 h-3.5 text-sky-600" />
                  <span>Registered Team Roster ({team.members?.length || 1} / 4)</span>
                </h4>
                <div className="space-y-2">
                  {team.members?.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">{m.name}</div>
                        <div className="text-[10px] text-sky-700 font-mono font-medium">{m.role}</div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold">
                        {idx === 0 ? 'LEADER' : `MEMBER ${idx + 1}`}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Scores by Round */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mt-4 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Jury Scorecard</span>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600">Round 01:</span>
                    <span className="text-sky-800 font-bold">{team.scores?.round1 || 0} / 100</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600">Round 02:</span>
                    <span className="text-sky-800 font-bold">{team.scores?.round2 || 0} / 100</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600">Round 03:</span>
                    <span className="text-sky-800 font-bold">{team.scores?.round3 || 0} / 100</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-xs font-mono font-bold text-slate-900">
                    <span>Total Points:</span>
                    <span className="text-amber-700">{team.scores?.total || 0} pts</span>
                  </div>
                </div>
              </div>

              {/* Submission Form Portal */}
              <div className="lg:col-span-8">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h4 className="text-sm font-bold font-tech text-slate-900 uppercase flex items-center gap-2">
                      <Code className="w-4 h-4 text-sky-600" />
                      <span>Round 0{currentRound} Deliverable Submission</span>
                    </h4>
                    <span className="text-[10px] font-mono text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded border border-sky-300 font-bold">
                      LIVE JURY PORTAL
                    </span>
                  </div>

                  {submitSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-xs font-mono text-emerald-800 flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>Submission recorded successfully! Jury evaluates your commit history and URLs.</span>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        System Architecture / Design Blueprint URL (Round 1)
                      </label>
                      <input
                        type="url"
                        value={submissionForm.architectureUrl}
                        onChange={(e) => setSubmissionForm({ ...submissionForm, architectureUrl: e.target.value })}
                        placeholder="https://figma.com/... or https://draw.io/..."
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                          GitHub Repository URL (Round 2) *
                        </label>
                        <input
                          type="url"
                          value={submissionForm.github}
                          onChange={(e) => setSubmissionForm({ ...submissionForm, github: e.target.value })}
                          placeholder="https://github.com/your-org/project"
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                          Live Working Demo / Prototype URL (Round 3)
                        </label>
                        <input
                          type="url"
                          value={submissionForm.demo}
                          onChange={(e) => setSubmissionForm({ ...submissionForm, demo: e.target.value })}
                          placeholder="https://your-project.vercel.app"
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        Core Tech Stack Utilized
                      </label>
                      <input
                        type="text"
                        value={submissionForm.techStack}
                        onChange={(e) => setSubmissionForm({ ...submissionForm, techStack: e.target.value })}
                        placeholder="e.g. React 19, FastAPI, PyTorch, ESP32, Docker, WebSockets"
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        Solution Abstract & Architecture Defense
                      </label>
                      <textarea
                        rows={3}
                        value={submissionForm.abstract}
                        onChange={(e) => setSubmissionForm({ ...submissionForm, abstract: e.target.value })}
                        placeholder="Detail the technical hurdles solved, engineering decisions, and live prototype capabilities..."
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 resize-none font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-tech font-bold text-xs tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT / UPDATE MILESTONE ARTIFACTS</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE LEADERBOARD INSIDE PARTICIPANT PORTAL */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-lg font-bold font-tech text-slate-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-600" />
                  <span>TOURNAMENT STANDINGS & JURY SCORES</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Real-time normalized evaluations across all 3 rounds.
                </p>
              </div>

              {/* Search & Domain Filter */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search teams..."
                  className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 font-mono shadow-xs"
                />
              </div>
            </div>

            {/* Deliberation Banner if hidden by admin */}
            {!isLeaderboardPublished && currentUser?.role !== 'admin' ? (
              <div className="p-8 rounded-xl bg-amber-50 text-center border border-amber-300 space-y-2">
                <Lock className="w-6 h-6 text-amber-600 mx-auto" />
                <h4 className="text-sm font-bold font-tech text-slate-900">OFFICIAL STANDINGS UNDER JURY DELIBERATION</h4>
                <p className="text-xs text-slate-600">
                  Jury evaluations are being normalized. Final rankings will unlock upon official publication.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-mono text-[10px] uppercase font-bold">
                      <th className="py-3 px-3">Rank</th>
                      <th className="py-3 px-3">Team & Project</th>
                      <th className="py-3 px-3">Theme</th>
                      <th className="py-3 px-2 text-center">R1</th>
                      <th className="py-3 px-2 text-center">R2</th>
                      <th className="py-3 px-2 text-center">R3</th>
                      <th className="py-3 px-3 text-right">Total Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {filteredTeams.map((t, idx) => {
                      const isUserTeam = t.teamId === team.teamId;
                      const rankNum = idx + 1;

                      return (
                        <tr 
                          key={t.teamId} 
                          className={`transition-colors ${
                            isUserTeam 
                              ? 'bg-sky-50/80 border border-sky-300 text-slate-900 font-bold' 
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <td className="py-3 px-3">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-bold text-xs ${
                              rankNum === 1 
                                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' 
                                : rankNum === 2 
                                ? 'bg-slate-200 text-slate-800 font-bold' 
                                : rankNum === 3 
                                ? 'bg-amber-100 text-amber-800 border border-amber-300 font-bold' 
                                : 'text-slate-600 bg-slate-100'
                            }`}>
                              {rankNum}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>{t.teamName}</span>
                              {isUserTeam && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-100 border border-sky-300 text-sky-800 font-bold">
                                  YOUR TEAM
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 font-sans truncate max-w-xs">{t.projectTitle}</div>
                          </td>
                          <td className="py-3 px-3 text-[11px] text-slate-600">{t.domainName}</td>
                          <td className="py-3 px-2 text-center text-slate-700">{t.scores?.round1 || 0}</td>
                          <td className="py-3 px-2 text-center text-slate-700">{t.scores?.round2 || 0}</td>
                          <td className="py-3 px-2 text-center text-slate-700">{t.scores?.round3 || 0}</td>
                          <td className="py-3 px-3 text-right font-bold text-amber-700 text-sm">
                            {t.scores?.total || 0} pts
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: NOTIFICATIONS & DIRECTOR ALERTS */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold font-tech text-slate-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-sky-600" />
                  <span>LIVE BROADCAST FEED & MILESTONE ALERTS</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Real-time communications from the Hackathon Director and Organizing Committee.
                </p>
              </div>
              <span className="text-xs font-mono text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-300 font-bold">
                {announcements.length} ALERTS RECORDED
              </span>
            </div>

            <div className="space-y-3">
              {announcements.map((alert) => {
                const isCritical = alert.type === 'CRITICAL';
                return (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-all ${
                      isCritical
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isCritical ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'
                      }`}>
                        {isCritical ? <AlertTriangle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isCritical ? 'text-amber-800' : 'text-sky-700'
                          }`}>
                            {alert.type || 'NOTICE'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {alert.timestamp}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold font-tech text-slate-900">
                          {alert.title}
                        </h4>
                        <p className="text-xs text-slate-600 font-sans leading-relaxed">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: HACKATHON ROUNDS ARCHITECTURE & DELIVERABLES */}
        {activeTab === 'rounds' && (
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
              <div>
                <h3 className="text-base font-bold font-tech text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span>12-HOUR PROGRESSION: 3 KNOCKOUT & REFINEMENT ROUNDS</span>
                </h3>
                <p className="text-xs text-slate-600 font-sans mt-0.5">
                  Understand deliverables, milestone submission requirements, and jury scoring criteria for each round.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-sky-800 bg-sky-50 px-3 py-1 rounded-lg border border-sky-300 font-bold">
                  CURRENT STAGE: ROUND 0{currentRound}
                </span>
                {isTimerRunning ? (
                  <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    COUNT ACTIVE ({formatTimer(timerSeconds)})
                  </span>
                ) : (
                  <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                    STANDBY
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {HACKATHON_ROUNDS.map((round) => {
                const isActive = currentRound === round.id;
                const isCompleted = currentRound > round.id;

                return (
                  <div
                    key={round.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isActive
                        ? 'bg-sky-50/80 border-2 border-sky-500 shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-slate-50/60 border-slate-200 opacity-80'
                    }`}
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold text-sky-700">
                          {round.roundNumber}
                        </span>

                        {isActive ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-sky-100 border border-sky-400 text-[10px] font-mono text-sky-800 font-bold animate-pulse">
                            LIVE STAGE
                          </span>
                        ) : isCompleted ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-400 text-[10px] font-mono text-emerald-800 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            COMPLETED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-[10px] font-mono text-slate-500 font-medium">
                            UPCOMING
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold font-tech text-slate-900 mb-1">
                        {round.title}
                      </h4>
                      <p className="text-xs font-mono text-sky-700 mb-3 font-semibold">
                        {round.tag}
                      </p>

                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-600 mb-4 flex items-center gap-1.5 shadow-xs">
                        <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Window: {round.timeWindow}</span>
                      </div>

                      {/* Deliverables */}
                      <div className="space-y-2 mb-4">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                          Expected Deliverables:
                        </span>
                        {round.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <span className="text-sky-600 font-bold shrink-0">&gt;</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Criteria & Action */}
                    <div className="pt-3 border-t border-slate-200 space-y-3">
                      <div className="text-[10px] font-mono text-slate-600">
                        <strong className="text-sky-800 font-bold">Scoring Weightage: </strong>
                        {round.evaluationCriteria}
                      </div>

                      {isActive ? (
                        <button
                          onClick={() => {
                            setActiveTab('submission');
                            playClickSound();
                          }}
                          className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-tech font-bold text-xs tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <GitBranch className="w-3.5 h-3.5" />
                          <span>SUBMIT ARTIFACTS FOR ROUND 0{round.id}</span>
                        </button>
                      ) : (
                        <div className="text-center py-2 text-[11px] font-mono text-slate-500">
                          {isCompleted ? '✓ Milestone Submitted' : '🔒 Unlocks in Next Stage'}
                        </div>
                      )}
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

export default ParticipantDashboard;
