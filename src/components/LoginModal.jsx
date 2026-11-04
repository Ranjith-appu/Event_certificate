import React, { useState, useRef } from 'react';
import { 
  X, 
  KeyRound, 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Terminal, 
  Info,
  Award,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { playClickSound, playSuccessSound, playAlertSound } from '../utils/audio';

const LoginModal = ({ isStandalonePage = false }) => {
  const { 
    loginWithPasskey, 
    loginWithEmail, 
    loginWithJuryPassword,
    loginAsJuryDirect,
    loginAsAdminDirect, 
    setActiveModal,
    navigateTo 
  } = useHackathon();

  // 'passkey' | 'email' | 'secret_portal'
  const [activeTab, setActiveTab] = useState('passkey');

  // Form states
  const [teamId, setTeamId] = useState('');
  const [passkey, setPasskey] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [juryPasscode, setJuryPasscode] = useState('');
  const [selectedJuryMember, setSelectedJuryMember] = useState('Mrs. V. Umadevi');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Double-tap tracking for mobile devices
  const lastTapRef = useRef(0);

  const handleVersionDoubleTap = () => {
    playSuccessSound();
    setActiveTab(prev => (prev === 'secret_portal' ? 'passkey' : 'secret_portal'));
    setErrorMessage('');
    setSuccessMessage('Authorized Committee Access Unlocked');
  };

  const handleTouchEnd = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 350;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleVersionDoubleTap();
    }
    lastTapRef.current = now;
  };

  const handlePasskeySubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    playClickSound();

    const res = loginWithPasskey(teamId, passkey);
    if (res.success) {
      playSuccessSound();
      if (isStandalonePage) {
        navigateTo('/');
      }
      setActiveModal('dashboard');
    } else {
      playAlertSound();
      setErrorMessage(res.message || 'Invalid Team ID or Passkey.');
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    playClickSound();

    const res = loginWithEmail(email, password);
    if (res.success) {
      playSuccessSound();
      if (res.role === 'admin') {
        if (isStandalonePage) {
          navigateTo('/admin');
        } else {
          setActiveModal('admin');
        }
      } else {
        if (isStandalonePage) {
          navigateTo('/');
        }
        setActiveModal('dashboard');
      }
    } else {
      playAlertSound();
      setErrorMessage(res.message || 'Account not found. Please register first.');
    }
  };

  
  const handleJuryPasscodeSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    playClickSound();

    const res = loginWithJuryPassword(selectedJuryMember, juryPasscode);
    if (res.success) {
      playSuccessSound();
      setActiveModal(null);
      navigateTo('/jury');
    } else {
      playAlertSound();
      setErrorMessage('Incorrect Jury Password. Try jury123');
    }
  };

  const handleAdminPasscodeSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    playClickSound();

    const res = loginWithEmail('admin@ncore.in', adminPasscode);
    if (res.success) {
      playSuccessSound();
      setActiveModal(null);
      navigateTo('/admin');
    } else {
      playAlertSound();
      setErrorMessage('Incorrect Director Passcode. Try admin123');
    }
  };

  const fillDemoTeam = () => {
    setTeamId('NCORE-T101');
    setPasskey('NVG-9021-X');
    setErrorMessage('');
    playClickSound();
  };

  const modalContainerClasses = isStandalonePage
    ? 'w-full max-w-md bg-white border-2 border-sky-300 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden my-8'
    : 'relative w-full max-w-md bg-white border-2 border-sky-300 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden';

  const content = (
    <div className={modalContainerClasses}>
      <div className="hud-corner-tl !border-sky-400"></div>
      <div className="hud-corner-tr !border-sky-400"></div>
      <div className="hud-corner-bl !border-sky-400"></div>
      <div className="hud-corner-br !border-sky-400"></div>

      {/* Close button (or Return Home button if standalone) */}
      <button
        onClick={() => {
          playClickSound();
          if (isStandalonePage) {
            navigateTo('/');
          } else {
            setActiveModal(null);
          }
        }}
        className="absolute top-4 right-4 p-2 rounded-lg text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
        title="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Modal Brand Header */}
      <div className="text-center mb-6 space-y-1">
        <span className="text-[10px] font-mono tracking-widest text-sky-700 uppercase font-bold">
          {activeTab === 'secret_portal' ? 'DIRECTOR & JURY ACCESS' : 'PARTICIPANT AUTHENTICATION'}
        </span>
        <h2 className="text-2xl font-black font-tech text-slate-900 tracking-tight">
          {activeTab === 'secret_portal' ? 'COMMITTEE GATEWAY' : 'NCORE TEAM WORKSPACE'}
        </h2>
        <p className="text-xs text-slate-600 font-sans">
          {activeTab === 'secret_portal' 
            ? 'Authorized access for Hackathon Director and Evaluation Committee.'
            : 'Enter your team credentials to access submission terminals and round metrics.'}
        </p>
      </div>

      {/* TABS (Passkey vs Email) when NOT in secret portal */}
      {activeTab !== 'secret_portal' ? (
        <div className="flex rounded-xl bg-slate-100 p-1 mb-6 border border-slate-200">
          <button
            type="button"
            onClick={() => {
              setActiveTab('passkey');
              setErrorMessage('');
              playClickSound();
            }}
            className={`flex-1 py-2 text-xs font-tech font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'passkey'
                ? 'bg-white text-sky-800 shadow-xs border border-slate-200 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>TEAM PASSKEY</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('email');
              setErrorMessage('');
              playClickSound();
            }}
            className={`flex-1 py-2 text-xs font-tech font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'email'
                ? 'bg-white text-sky-800 shadow-xs border border-slate-200 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EMAIL ACCESS</span>
          </button>
        </div>
      ) : (
        /* Secret Portal Notice Banner */
        <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-mono font-bold text-amber-900">
              UNLOCKED VIA VERSION ID
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveTab('passkey');
              playClickSound();
            }}
            className="text-[11px] font-mono text-slate-600 hover:text-slate-900 underline font-semibold cursor-pointer"
          >
            ‹ Back to Team Login
          </button>
        </div>
      )}

      {/* Status Messages */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono font-medium">
          {errorMessage}
        </div>
      )}

      {successMessage && activeTab === 'secret_portal' && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-medium">
          ✓ {successMessage}
        </div>
      )}

      {/* TAB 1: TEAM PASSKEY ACCESS */}
      {activeTab === 'passkey' && (
        <form onSubmit={handlePasskeySubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">TEAM ID</label>
            <div className="relative">
              <Terminal className="w-4 h-4 text-sky-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. NCORE-T101"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-3 text-xs text-sky-900 font-mono font-semibold focus:outline-none focus:border-sky-500 focus:bg-white uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">TEAM PASSKEY</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-amber-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. NVG-9021-X"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-3 text-xs text-amber-900 font-mono font-bold focus:outline-none focus:border-sky-500 focus:bg-white uppercase tracking-wider"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-[11px] text-sky-900 flex items-start gap-2 font-sans">
            <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <span>
              All 4 team members can access their team workspace using the Team ID and Passkey.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-tech font-bold text-xs tracking-wider text-white bg-sky-600 hover:bg-sky-500 shadow-sm transition-all cursor-pointer"
          >
            ENTER TEAM WORKSPACE
          </button>

          {/* Quick Demo Autofill */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={fillDemoTeam}
              className="text-[11px] font-mono text-sky-700 hover:underline cursor-pointer font-semibold"
            >
              &gt; Autofill Demo Team (NeuralVanguard)
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: EMAIL LOGIN */}
      {activeTab === 'email' && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="leader@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-3 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">PASSWORD</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-3 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-tech font-bold text-xs tracking-wider text-white bg-sky-600 hover:bg-sky-500 shadow-sm transition-all cursor-pointer"
          >
            LOGIN WITH EMAIL
          </button>
        </form>
      )}

      {/* TAB 3: SECRET PORTAL (REVEALED ONLY VIA DOUBLE-TAP ON VERSION ID) */}
      {activeTab === 'secret_portal' && (
        <div className="space-y-4">
          {/* OPTION A: JURY EVALUATION COMMITTEE */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-300 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-600" />
              <span className="text-xs font-mono font-bold text-sky-900 uppercase">
                1. JURY EVALUATION PORTAL
              </span>
            </div>
            <p className="text-xs text-sky-800">
              Enter jury authorization password to score registered teams across Round 1, Round 2 & Round 3.
            </p>

            <form onSubmit={handleJuryPasscodeSubmit} className="space-y-2">
              <select
                value={selectedJuryMember}
                onChange={(e) => setSelectedJuryMember(e.target.value)}
                className="w-full bg-white border border-sky-300 rounded-xl p-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
              >
                <option value="Mrs. V. Umadevi">Mrs. V. Umadevi (HOD UG, CSE)</option>
                <option value="Dr. P. Anandan">Dr. P. Anandan (Professor, CSE)</option>
                <option value="Dr. S. K. Narayanan">Dr. S. K. Narayanan (Industry AI Architect)</option>
                <option value="Distinguished External Jury">Distinguished External Jury</option>
              </select>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Jury Password (jury123)"
                  value={juryPasscode}
                  onChange={(e) => setJuryPasscode(e.target.value)}
                  className="w-full bg-white border border-sky-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-tech font-bold text-xs tracking-wider bg-sky-600 hover:bg-sky-500 text-white shadow-xs transition-all cursor-pointer"
              >
                AUTHENTICATE & ENTER JURY PAGE (/jury)
              </button>
            </form>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  loginAsJuryDirect(selectedJuryMember);
                  setActiveModal(null);
                  navigateTo('/jury');
                }}
                className="text-[11px] font-mono text-sky-700 hover:underline cursor-pointer font-bold"
              >
                &gt; One-Click Jury Demo Login
              </button>
            </div>
          </div>

          {/* OPTION B: DIRECTOR / ADMIN CONTROL */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-mono font-bold text-amber-900 uppercase">
                2. DIRECTOR CONTROL CENTER
              </span>
            </div>
            <p className="text-xs text-amber-800">
              Manage live round countdowns, trigger timers, set geofence certificate release, and broadcast alerts.
            </p>

            <form onSubmit={handleAdminPasscodeSubmit} className="space-y-2">
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Director Passcode (admin123)"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-tech font-bold text-xs tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs transition-all cursor-pointer"
              >
                ENTER ADMIN PAGE (/admin)
              </button>
            </form>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  loginAsAdminDirect();
                  setActiveModal(null);
                  navigateTo('/admin');
                }}
                className="text-[11px] font-mono text-amber-800 hover:underline cursor-pointer font-bold"
              >
                &gt; One-Click Director Preview Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer: Register link + Version ID (Double-tap / double-click target) */}
      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div>
          <span>Don't have an account? </span>
          <button
            onClick={() => {
              playClickSound();
              setActiveModal('register');
            }}
            className="text-sky-700 font-bold hover:underline cursor-pointer"
          >
            REGISTER HERE
          </button>
        </div>

        {/* Secret Double-tap Target: v2.4.1 */}
        <span
          onDoubleClick={handleVersionDoubleTap}
          onTouchEnd={handleTouchEnd}
          title="Double-click or double-tap for Director & Jury Access"
          className="text-[11px] font-mono text-slate-400 hover:text-slate-700 active:text-amber-600 cursor-pointer select-none transition-colors ml-auto px-1.5 py-0.5 rounded hover:bg-slate-100"
        >
          v2.4.1
        </span>
      </div>
    </div>
  );

  if (isStandalonePage) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      {content}
    </div>
  );
};

export default LoginModal;
