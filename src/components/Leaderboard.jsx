import React, { useState } from 'react';
import { Trophy, Medal, Award, Search, Filter, ShieldCheck, Sparkles, ExternalLink, Lock } from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { playClickSound, playHoverSound } from '../utils/audio';

const Leaderboard = () => {
  const { teams, isLeaderboardPublished, currentUser, toggleLeaderboardPublication } = useHackathon();
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sort teams by total score descending
  const sortedTeams = [...teams].sort((a, b) => (b.scores?.total || 0) - (a.scores?.total || 0));

  const filteredTeams = sortedTeams.filter((team) => {
    const matchesDomain = selectedDomain === 'all' || team.domain === selectedDomain;
    const matchesSearch = team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          team.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          team.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const top3 = sortedTeams.slice(0, 3);

  return (
    <section id="leaderboard" className="py-20 relative bg-space-950/90 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              LIVE TOURNAMENT STANDINGS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-tech text-white flex items-center gap-3">
              <span>?? NCORE LEADERBOARD</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Real-time jury normalized scores across Round 1, Round 2, and Round 3.
            </p>
          </div>

          {/* Admin publication toggle */}
          {currentUser?.role === 'admin' && (
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <button
                onClick={toggleLeaderboardPublication}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border flex items-center gap-2 ${
                  isLeaderboardPublished
                    ? 'bg-emerald-600/30 text-emerald-300 border-emerald-400'
                    : 'bg-amber-600/30 text-amber-300 border-amber-400'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isLeaderboardPublished ? 'LEADERBOARD: PUBLISHED' : 'LEADERBOARD: DRAFT / HIDDEN'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Notice if draft mode and user is not admin */}
        {!isLeaderboardPublished && currentUser?.role !== 'admin' ? (
          <div className="p-12 rounded-2xl glass-panel text-center max-w-xl mx-auto border-amber-500/30 space-y-3">
            <Lock className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold font-tech text-white">STANDINGS UNDER JURY DELIBERATION</h3>
            <p className="text-xs text-slate-400">
              The official scores are currently being verified and normalized by the distinguished jury. Standings will be published during the Valedictory Ceremony.
            </p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium Cards (Rank 2 left, Rank 1 center, Rank 3 right) */}
            {top3.length >= 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-end">
                {/* 2nd Place (Silver) */}
                <div 
                  onMouseEnter={playHoverSound}
                  className="p-6 rounded-2xl glass-panel border border-cyan-400/40 bg-space-900/80 shadow-glow-cyan-sm text-center flex flex-col justify-between order-2 md:order-1 h-[340px]"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-tech font-extrabold text-xl">
                      #2
                    </div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
                      FIRST RUNNER UP
                    </div>
                    <h3 className="text-xl font-bold font-tech text-white">{top3[1].teamName}</h3>
                    <p className="text-xs text-cyan-300 font-mono">{top3[1].projectTitle}</p>
                    <p className="text-[11px] text-slate-400">{top3[1].college}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800">
                    <div className="text-3xl font-black font-tech text-cyan-300 glow-text-cyan">
                      {top3[1].scores?.total || 0} <span className="text-xs text-slate-400 font-mono">PTS</span>
                    </div>
                  </div>
                </div>

                {/* 1st Place (Gold Championship) */}
                <div 
                  onMouseEnter={playHoverSound}
                  className="p-8 rounded-3xl glass-card-gold border-2 border-yellow-400 shadow-glow-gold text-center flex flex-col justify-between order-1 md:order-2 h-[390px] relative overflow-hidden"
                >
                  <div className="hud-corner-tl !border-yellow-400"></div>
                  <div className="hud-corner-tr !border-yellow-400"></div>
                  <div className="hud-corner-bl !border-yellow-400"></div>
                  <div className="hud-corner-br !border-yellow-400"></div>

                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 border-2 border-yellow-400 flex items-center justify-center text-yellow-300 font-tech font-black text-3xl shadow-glow-gold">
                      ??
                    </div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400 text-xs font-mono font-bold text-yellow-300">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                      GRAND CHAMPION (#1)
                    </div>
                    <h3 className="text-2xl font-black font-tech text-white">{top3[0].teamName}</h3>
                    <p className="text-xs text-amber-200 font-mono">{top3[0].projectTitle}</p>
                    <p className="text-xs text-slate-300 font-medium">{top3[0].college}</p>
                  </div>

                  <div className="pt-4 border-t border-yellow-500/30">
                    <div className="text-4xl font-black font-tech text-yellow-400 glow-text-gold">
                      {top3[0].scores?.total || 0} <span className="text-xs text-yellow-300 font-mono">PTS</span>
                    </div>
                  </div>
                </div>

                {/* 3rd Place (Bronze) */}
                <div 
                  onMouseEnter={playHoverSound}
                  className="p-6 rounded-2xl glass-panel border border-amber-600/40 bg-space-900/80 text-center flex flex-col justify-between order-3 md:order-3 h-[320px]"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-amber-700/20 border border-amber-500 flex items-center justify-center text-amber-400 font-tech font-extrabold text-xl">
                      #3
                    </div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-600/40 text-[10px] font-mono text-amber-300">
                      SECOND RUNNER UP
                    </div>
                    <h3 className="text-lg font-bold font-tech text-white">{top3[2].teamName}</h3>
                    <p className="text-xs text-amber-300 font-mono">{top3[2].projectTitle}</p>
                    <p className="text-[11px] text-slate-400">{top3[2].college}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800">
                    <div className="text-2xl font-black font-tech text-amber-400">
                      {top3[2].scores?.total || 0} <span className="text-xs text-slate-400 font-mono">PTS</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-xl glass-panel mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search team or college..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-space-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <Filter className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="bg-space-950 text-cyan-300 text-xs border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">All Themes (6)</option>
                  <option value="ai-ml">AI & ML</option>
                  <option value="iot-smart">IoT & Smart Systems</option>
                  <option value="cyber-blockchain">Cyber & Blockchain</option>
                  <option value="data-science">Data Science</option>
                  <option value="green-tech">Green Technology</option>
                  <option value="open-innovation">Open Innovation</option>
                </select>
              </div>
            </div>

            {/* Complete Standings Table */}
            <div className="rounded-xl glass-panel overflow-hidden border border-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-space-950/90 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3 pl-4">RANK</th>
                      <th className="p-3">TEAM NAME & PROJECT</th>
                      <th className="p-3">INSTITUTION</th>
                      <th className="p-3">THEME</th>
                      <th className="p-3 text-center">R1</th>
                      <th className="p-3 text-center">R2</th>
                      <th className="p-3 text-center">R3</th>
                      <th className="p-3 pr-4 text-right">TOTAL SCORE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {filteredTeams.map((team, idx) => (
                      <tr 
                        key={team.teamId}
                        className="hover:bg-cyan-500/5 transition-colors group"
                      >
                        <td className="p-3 pl-4 font-mono font-bold">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded ${
                            idx === 0 ? 'bg-yellow-400 text-space-950 font-black' :
                            idx === 1 ? 'bg-cyan-400 text-space-950 font-black' :
                            idx === 2 ? 'bg-amber-600 text-white font-black' :
                            'text-slate-400 bg-space-900 border border-slate-800'
                          }`}>
                            {idx + 1}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-white group-hover:text-cyan-300 transition-colors font-tech">
                            {team.teamName}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-xs">
                            {team.projectTitle}
                          </div>
                        </td>
                        <td className="p-3 text-slate-300">{team.college}</td>
                        <td className="p-3">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-space-900 border border-slate-700 text-cyan-300">
                            {team.domainName || team.domain}
                          </span>
                        </td>
                        <td className="p-3 text-center font-mono text-slate-300">{team.scores?.round1 || '-'}</td>
                        <td className="p-3 text-center font-mono text-slate-300">{team.scores?.round2 || '-'}</td>
                        <td className="p-3 text-center font-mono text-slate-300">{team.scores?.round3 || '-'}</td>
                        <td className="p-3 pr-4 text-right font-tech font-extrabold text-sm text-cyan-300">
                          {team.scores?.total || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
