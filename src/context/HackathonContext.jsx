import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  EVENT_DETAILS, 
  HACKATHON_ROUNDS, 
  INITIAL_SCHEDULE, 
  INITIAL_JUDGES, 
  INITIAL_TEAMS, 
  INITIAL_ANNOUNCEMENTS 
} from '../data/ncoreData';
import { 
  playClickSound, 
  playSuccessSound, 
  playAlertSound, 
  playWarpSound, 
  setSoundEnabled as setAudioSoundEnabled 
} from '../utils/audio';

const HackathonContext = createContext();

export const HackathonProvider = ({ children }) => {
  // Routing State: '/' | '/admin' | '/jury'
  const normalizePath = (p) => {
    if (!p) return '/';
    const clean = p.split('?')[0].split('#')[0].toLowerCase();
    if (clean.startsWith('/admin')) return '/admin';
    if (clean.startsWith('/jury')) return '/jury';
    if (clean.startsWith('/login')) return '/login';
    if (window.location.hash.toLowerCase().includes('admin')) return '/admin';
    if (window.location.hash.toLowerCase().includes('jury')) return '/jury';
    if (window.location.hash.toLowerCase().includes('login')) return '/login';
    return '/';
  };

  const [currentPath, setCurrentPath] = useState(() => {
    return normalizePath(window.location.pathname || window.location.hash);
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname || window.location.hash));
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (path) => {
    const norm = normalizePath(path);
    window.history.pushState({}, '', norm);
    setCurrentPath(norm);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
  };

  // 1. Current Round State (1, 2, 3, or 'ended')
  const [currentRound, setCurrentRoundState] = useState(() => {
    const saved = localStorage.getItem('ncore_current_round');
    return saved ? parseInt(saved, 10) : 1;
  });

  // 2. Active Round Timer (seconds remaining)
  const [timerSeconds, setTimerSeconds] = useState(() => {
    const saved = localStorage.getItem('ncore_timer_seconds');
    return saved ? parseInt(saved, 10) : 7200; // 2 hours default for Round 1
  });

  // Timer only runs when admin starts it! Default: false
  const [isTimerRunning, setIsTimerRunning] = useState(() => {
    const saved = localStorage.getItem('ncore_is_timer_running');
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Round status: 'STANDBY' | 'ACTIVE' | 'PAUSED' | 'COMPLETED'
  const [roundStatus, setRoundStatus] = useState(() => {
    const saved = localStorage.getItem('ncore_round_status');
    return saved || 'STANDBY';
  });

  // 3. Teams Data
  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('ncore_teams');
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  // 4. Current User Session
  // { role: 'admin' | 'team' | 'jury', teamId: string, teamData: object, member: object }
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ncore_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // 5. Announcements / Broadcasts
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('ncore_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  // 6. Schedule & Judges
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('ncore_schedule');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });

  const [judges, setJudges] = useState(() => {
    const saved = localStorage.getItem('ncore_judges');
    return saved ? JSON.parse(saved) : INITIAL_JUDGES;
  });

  // 7. Leaderboard publication status
  const [isLeaderboardPublished, setIsLeaderboardPublished] = useState(() => {
    const saved = localStorage.getItem('ncore_lb_published');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // 8. Admin Certificate Issuance Switch (Admin-enabled only)
  const [isCertificateEnabled, setIsCertificateEnabled] = useState(() => {
    const saved = localStorage.getItem('ncore_is_cert_enabled');
    return saved !== null ? JSON.parse(saved) : false;
  });

  // 9. Accessibility & Audio
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // 10. Active Modal
  const [activeModal, setActiveModal] = useState(null); // 'register' | 'login' | 'dashboard' | 'admin' | 'cert'
  const [selectedTeamForCert, setSelectedTeamForCert] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ncore_current_round', currentRound);
  }, [currentRound]);

  useEffect(() => {
    localStorage.setItem('ncore_timer_seconds', timerSeconds);
  }, [timerSeconds]);

  useEffect(() => {
    localStorage.setItem('ncore_is_timer_running', JSON.stringify(isTimerRunning));
  }, [isTimerRunning]);

  useEffect(() => {
    localStorage.setItem('ncore_round_status', roundStatus);
  }, [roundStatus]);

  useEffect(() => {
    localStorage.setItem('ncore_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('ncore_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ncore_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('ncore_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('ncore_judges', JSON.stringify(judges));
  }, [judges]);

  useEffect(() => {
    localStorage.setItem('ncore_lb_published', JSON.stringify(isLeaderboardPublished));
  }, [isLeaderboardPublished]);

  useEffect(() => {
    localStorage.setItem('ncore_is_cert_enabled', JSON.stringify(isCertificateEnabled));
  }, [isCertificateEnabled]);

  // Timer Tick: strictly runs ONLY if isTimerRunning === true AND timerSeconds > 0
  useEffect(() => {
    if (!isTimerRunning || timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          setRoundStatus('COMPLETED');
          broadcastAnnouncement({
            title: `ROUND 0${currentRound} TIME EXPIRED!`,
            message: `The timer for Round ${currentRound} has concluded. Please finalize all artifact submissions immediately.`,
            type: 'CRITICAL'
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, currentRound]);

  // Audio mute handler
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setAudioSoundEnabled(next);
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
  };

  // Set Current Round by Admin
  const setRound = (roundNum) => {
    setCurrentRoundState(roundNum);
    // Reset standard duration for selected round
    let secs = 7200; // Round 1: 2 hours
    if (roundNum === 2) secs = 12600; // Round 2: 3.5 hours
    if (roundNum === 3) secs = 9000; // Round 3: 2.5 hours
    setTimerSeconds(secs);
    setIsTimerRunning(false);
    setRoundStatus('STANDBY');
    playWarpSound();
    broadcastAnnouncement({
      title: `ROUND 0${roundNum} ACTIVATED`,
      message: `The Hackathon Director has transitioned the competition to Round ${roundNum}. Timer is on Standby.`,
      type: 'INFO'
    });
  };

  // Set Custom Round Timer
  const setRoundDuration = (seconds) => {
    setTimerSeconds(seconds);
    setIsTimerRunning(false);
    setRoundStatus('STANDBY');
    playClickSound();
  };

  // Admin Starts the Round Timer
  const startRoundTimer = () => {
    setIsTimerRunning(true);
    setRoundStatus('ACTIVE');
    playSuccessSound();
    broadcastAnnouncement({
      title: `ROUND 0${currentRound} LIVE COUNTDOWN STARTED!`,
      message: `The Hackathon Director has started the live countdown for Round ${currentRound}. Submissions window is now active.`,
      type: 'CRITICAL'
    });
  };

  // Admin Pauses the Round Timer
  const pauseRoundTimer = () => {
    setIsTimerRunning(false);
    setRoundStatus('PAUSED');
    playClickSound();
    broadcastAnnouncement({
      title: `ROUND 0${currentRound} TIMER PAUSED`,
      message: `The countdown timer for Round ${currentRound} has been paused by the Hackathon Director.`,
      type: 'INFO'
    });
  };

  const toggleTimer = () => {
    if (isTimerRunning) {
      pauseRoundTimer();
    } else {
      startRoundTimer();
    }
  };

  const resetRoundTimer = (newSeconds) => {
    const sec = newSeconds !== undefined ? newSeconds : (currentRound === 1 ? 7200 : (currentRound === 2 ? 12600 : 9000));
    setTimerSeconds(sec);
    setIsTimerRunning(false);
    setRoundStatus('STANDBY');
    playClickSound();
  };

  // Broadcast announcement
  const broadcastAnnouncement = ({ title, message, type = 'INFO' }) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAlert = {
      id: 'a_' + Date.now(),
      timestamp: timeStr,
      title,
      message,
      type,
      active: true
    };
    setAnnouncements(prev => [newAlert, ...prev]);
    playAlertSound();
  };

  const dismissAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  // Register Team
  const registerTeam = (teamFormData) => {
    const newTeamIndex = teams.length + 101;
    const teamId = `NCORE-T${newTeamIndex}`;
    const prefix = teamFormData.teamName.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'NCR';
    const rand = Math.floor(1000 + Math.random() * 9000);
    const passkey = teamFormData.passkey || `${prefix}-${rand}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;

    const newTeam = {
      teamId,
      teamName: teamFormData.teamName,
      leaderName: teamFormData.leaderName,
      leaderEmail: teamFormData.leaderEmail,
      college: teamFormData.college,
      department: teamFormData.department,
      year: teamFormData.year,
      domain: teamFormData.domain,
      domainName: teamFormData.domainName,
      projectTitle: teamFormData.projectTitle,
      passkey,
      password: passkey,
      members: teamFormData.members || [
        { name: teamFormData.leaderName, role: 'Team Leader', pin: '1234' }
      ],
      submission: {
        architectureUrl: '',
        github: '',
        demo: '',
        techStack: '',
        abstract: teamFormData.abstract || '',
        round1Submitted: false,
        round2Submitted: false,
        round3Submitted: false
      },
      scores: {
        round1: 0,
        round2: 0,
        round3: 0,
        total: 0
      },
      juryFeedback: {},
      rank: teams.length + 1
    };

    setTeams(prev => [...prev, newTeam]);
    setCurrentUser({
      role: 'team',
      teamId: newTeam.teamId,
      teamData: newTeam
    });

    playSuccessSound();
    return newTeam;
  };

  // Login with Team ID and Passkey
  const loginWithPasskey = (teamId, passkey) => {
    const cleanId = teamId.trim().toUpperCase();
    const cleanPasskey = passkey.trim().toUpperCase();
    const found = teams.find(t => t.teamId.toUpperCase() === cleanId && t.passkey.toUpperCase() === cleanPasskey);
    if (found) {
      setCurrentUser({
        role: 'team',
        teamId: found.teamId,
        teamData: found
      });
      playSuccessSound();
      return { success: true, team: found };
    }
    return { success: false, message: "Invalid Team ID or Team Passkey. Please verify credentials." };
  };

  // Login with Email & Password
  const loginWithEmail = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    // Admin check
    if (cleanEmail === 'admin@ncore.in' || cleanEmail === 'pointers.csedept@gmail.com') {
      if (password === 'admin123' || password === 'ncore2026') {
        setCurrentUser({ role: 'admin', teamId: null, teamData: { name: 'Hackathon Director' } });
        playSuccessSound();
        return { success: true, role: 'admin' };
      }
      return { success: false, message: 'Invalid Admin Password.' };
    }

    // Team Leader Check
    const found = teams.find(t => t.leaderEmail.toLowerCase() === cleanEmail);
    if (found) {
      setCurrentUser({
        role: 'team',
        teamId: found.teamId,
        teamData: found
      });
      playSuccessSound();
      return { success: true, role: 'team', team: found };
    }

    return { success: false, message: 'Account not found. Please register your team first.' };
  };

  
  // Login with Jury Password
  const loginWithJuryPassword = (juryName, password) => {
    const cleanPass = password ? password.trim() : '';
    if (cleanPass === 'jury123' || cleanPass === 'ncore2026' || cleanPass === 'admin123') {
      const userObj = {
        role: 'jury',
        name: juryName || 'Mrs. V. Umadevi',
        juryId: 'j_' + Date.now()
      };
      setCurrentUser(userObj);
      playSuccessSound();
      return { success: true, user: userObj };
    }
    return { success: false, message: 'Invalid Jury Access Password. Please enter jury123.' };
  };

  const loginAsJuryDirect = (juryName) => {
    const userObj = {
      role: 'jury',
      name: juryName || 'Mrs. V. Umadevi',
      juryId: 'j_demo'
    };
    setCurrentUser(userObj);
    playSuccessSound();
    return userObj;
  };

  const loginAsAdminDirect = () => {
    setCurrentUser({ role: 'admin', teamId: null, teamData: { name: 'Hackathon Director' } });
    playSuccessSound();
  };

  const logout = () => {
    setCurrentUser(null);
    playClickSound();
  };

  // Update Team Project Submission
  const submitProject = (teamId, submissionData, roundNum) => {
    setTeams(prev => prev.map(team => {
      if (team.teamId === teamId) {
        const updatedSub = {
          ...team.submission,
          ...submissionData,
          [`round${roundNum}Submitted`]: true
        };
        const updated = { ...team, submission: updatedSub };
        if (currentUser && currentUser.teamId === teamId) {
          setCurrentUser({ ...currentUser, teamData: updated });
        }
        return updated;
      }
      return team;
    }));
    playSuccessSound();
  };

  // Score a team (Admin simple score)
  const scoreTeam = (teamId, roundNum, score) => {
    setTeams(prev => {
      const updated = prev.map(t => {
        if (t.teamId === teamId) {
          const newScores = {
            ...t.scores,
            [`round${roundNum}`]: parseInt(score, 10) || 0
          };
          newScores.total = (newScores.round1 || 0) + (newScores.round2 || 0) + (newScores.round3 || 0);
          return { ...t, scores: newScores };
        }
        return t;
      });

      const sorted = [...updated].sort((a, b) => b.scores.total - a.scores.total);
      return sorted.map((t, idx) => ({ ...t, rank: idx + 1 }));
    });
    playSuccessSound();
  };

  // Save full Jury Evaluation (Maintained by Jury for registered teams)
  const saveJuryEvaluation = (teamId, evaluation) => {
    // evaluation: { round1, round2, round3, feedback, evaluatorName, timestamp }
    setTeams(prev => {
      const updated = prev.map(t => {
        if (t.teamId === teamId) {
          const r1 = evaluation.round1 !== undefined ? parseInt(evaluation.round1, 10) || 0 : (t.scores?.round1 || 0);
          const r2 = evaluation.round2 !== undefined ? parseInt(evaluation.round2, 10) || 0 : (t.scores?.round2 || 0);
          const r3 = evaluation.round3 !== undefined ? parseInt(evaluation.round3, 10) || 0 : (t.scores?.round3 || 0);
          
          const newScores = {
            round1: r1,
            round2: r2,
            round3: r3,
            total: r1 + r2 + r3
          };

          const evaluator = evaluation.evaluatorName || 'Distinguished Jury';
          const updatedFeedback = {
            ...(t.juryFeedback || {}),
            [evaluator]: {
              notes: evaluation.feedback || '',
              rubric: evaluation.rubric || null,
              lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          };

          return {
            ...t,
            scores: newScores,
            juryFeedback: updatedFeedback,
            evaluated: true
          };
        }
        return t;
      });

      const sorted = [...updated].sort((a, b) => b.scores.total - a.scores.total);
      return sorted.map((t, idx) => ({ ...t, rank: idx + 1 }));
    });
    playSuccessSound();
  };

  const toggleLeaderboardPublication = () => {
    setIsLeaderboardPublished(prev => !prev);
    playClickSound();
  };

  const toggleCertificateIssuance = () => {
    setIsCertificateEnabled(prev => {
      const next = !prev;
      if (next) {
        broadcastAnnouncement({
          title: 'OFFICIAL CERTIFICATE GENERATION ENABLED',
          message: 'The Hackathon Director has officially enabled campus certificate generation for all participating teams.',
          type: 'CRITICAL'
        });
      } else {
        broadcastAnnouncement({
          title: 'CERTIFICATE GENERATION PAUSED',
          message: 'Certificate issuance has been locked by the Hackathon Director.',
          type: 'INFO'
        });
      }
      return next;
    });
    playClickSound();
  };

  return (
    <HackathonContext.Provider value={{
      EVENT_DETAILS,
      currentPath,
      navigateTo,
      currentRound,
      timerSeconds,
      isTimerRunning,
      roundStatus,
      teams,
      currentUser,
      announcements,
      schedule,
      judges,
      isLeaderboardPublished,
      isCertificateEnabled,
      soundEnabled,
      reducedMotion,
      activeModal,
      selectedTeamForCert,
      setSelectedTeamForCert,
      setActiveModal,
      toggleSound,
      toggleReducedMotion,
      setRound,
      setRoundDuration,
      startRoundTimer,
      pauseRoundTimer,
      resetRoundTimer,
      toggleTimer,
      broadcastAnnouncement,
      dismissAnnouncement,
      registerTeam,
      loginWithPasskey,
      loginWithEmail,
      loginWithJuryPassword,
    loginAsJuryDirect,
    loginAsAdminDirect,
      logout,
      submitProject,
      scoreTeam,
      saveJuryEvaluation,
      setSchedule,
      setJudges,
      toggleLeaderboardPublication,
      toggleCertificateIssuance
    }}>
      {children}
    </HackathonContext.Provider>
  );
};

export const useHackathon = () => {
  const context = useContext(HackathonContext);
  if (!context) {
    throw new Error('useHackathon must be used within a HackathonProvider');
  }
  return context;
};
