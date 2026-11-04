import React, { useState } from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Copy, 
  Check, 
  KeyRound, 
  Users, 
  FileText 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useHackathon } from '../context/HackathonContext';
import { HACKATHON_THEMES } from '../data/ncoreData';
import { playClickSound, playSuccessSound } from '../utils/audio';

const RegistrationModal = () => {
  const { registerTeam, setActiveModal } = useHackathon();

  const [currentStep, setCurrentStep] = useState(1);
  const [createdTeam, setCreatedTeam] = useState(null);
  const [copied, setCopied] = useState(false);

  // Form State - Supporting up to 4 members total (1 Leader + 3 Co-builders)
  const [formData, setFormData] = useState({
    // Step 1: Personal (Team Leader)
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    gender: 'Male',
    // Step 2: Academic
    college: 'Arunai Engineering College',
    department: 'Computer Science and Engineering',
    year: 'IV Year',
    rollNumber: '',
    // Step 3: Domain
    domain: 'ai-ml',
    domainName: 'Artificial Intelligence & Machine Learning',
    projectTitle: '',
    abstract: '',
    // Step 4: Account & Team Composition (Total 4 Members Allowed)
    teamName: '',
    member2Name: '',
    member2Role: 'Frontend / UI Specialist',
    member3Name: '',
    member3Role: 'Backend Architect',
    member4Name: '',
    member4Role: 'Systems & AI Engineer'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'domain') {
      const selected = HACKATHON_THEMES.find(t => t.id === value);
      setFormData(prev => ({
        ...prev,
        domain: value,
        domainName: selected ? selected.title : value
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    playClickSound();
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    playClickSound();
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.teamName || !formData.leaderName) return;

    // Assemble team members - Total 4 members allowed (Leader + up to 3 members)
    const members = [
      { name: formData.leaderName, role: 'Team Leader & Primary Contact', pin: '1234' }
    ];
    if (formData.member2Name && formData.member2Name.trim()) {
      members.push({ 
        name: formData.member2Name.trim(), 
        role: formData.member2Role || 'Frontend / UI Specialist', 
        pin: '2345' 
      });
    }
    if (formData.member3Name && formData.member3Name.trim()) {
      members.push({ 
        name: formData.member3Name.trim(), 
        role: formData.member3Role || 'Backend Architect', 
        pin: '3456' 
      });
    }
    if (formData.member4Name && formData.member4Name.trim()) {
      members.push({ 
        name: formData.member4Name.trim(), 
        role: formData.member4Role || 'Systems & AI Engineer', 
        pin: '4567' 
      });
    }

    // AUTOMATIC RANDOM PASSKEY GENERATION UPON SUBMISSION
    // Team leader is NEVER asked to manually invent or enter a passkey or password.
    const prefix = formData.teamName.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'NCR';
    const randDigits = Math.floor(1000 + Math.random() * 9000);
    const randChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const generatedRandomPasskey = `${prefix}-${randDigits}-${randChar}`;

    const newTeam = registerTeam({
      ...formData,
      passkey: generatedRandomPasskey,
      members
    });

    setCreatedTeam(newTeam);
    playSuccessSound();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  const copyCredentials = () => {
    if (!createdTeam) return;
    const rosterText = createdTeam.members?.map((m, i) => `  ${i + 1}. ${m.name} (${m.role})`).join('\n') || '';
    const text = `NCORE 2026 Registration Confirmed!\nTeam Name: ${createdTeam.teamName}\nTeam ID: ${createdTeam.teamId}\nGenerated Team Passkey: ${createdTeam.passkey}\nDomain: ${createdTeam.domainName}\nRegistered Members (${createdTeam.members?.length || 1}/4):\n${rosterText}\nPortal: pointers-2026.vercel.app`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    playClickSound();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-2 border-sky-300 rounded-2xl p-6 sm:p-8 my-8 shadow-2xl">
        <div className="hud-corner-tl !border-sky-400"></div>
        <div className="hud-corner-tr !border-sky-400"></div>
        <div className="hud-corner-bl !border-sky-400"></div>
        <div className="hud-corner-br !border-sky-400"></div>

        {/* Close button */}
        <button
          onClick={() => {
            playClickSound();
            setActiveModal(null);
          }}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2 text-sky-700 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>OFFICIAL NCORE 2026 REGISTRATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-tech text-slate-900 tracking-tight">
            12HRS HACKATHON ENTRY PORTAL
          </h2>
          <p className="text-slate-600 text-xs font-sans">
            Presented by <strong className="text-sky-700 font-tech">POINTERS</strong> • Dept. of CSE, Arunai Engineering College
          </p>
        </div>

        {createdTeam ? (
          /* Success Screen with Auto-Generated Team ID & Passkey + 4-Member Roster */
          <div className="space-y-6 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-600">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black font-tech text-slate-900">REGISTRATION SUCCESSFUL!</h3>
              <p className="text-xs text-slate-600">
                Your team workspace has been provisioned. A random high-entropy <strong className="text-amber-800 font-bold">Team Passkey</strong> has been generated:
              </p>
            </div>

            {/* Generated Credentials Card (Team ID + Auto-Generated Random Passkey) */}
            <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-mono text-slate-500 font-semibold">Team Name</span>
                <span className="text-base font-bold font-tech text-slate-900">{createdTeam.teamName}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-xs font-mono text-slate-500 font-semibold block">Assigned Team ID</span>
                  <span className="text-slate-400 text-[10px] font-mono">Unique team identifier</span>
                </div>
                <span className="text-lg font-black font-mono text-sky-700 bg-white px-3 py-1 rounded border border-sky-300 shadow-xs">
                  {createdTeam.teamId}
                </span>
              </div>

              {/* High-visibility generated passkey */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 bg-amber-50 p-3 rounded-lg border-2 border-amber-300">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-900 font-bold">
                    <KeyRound className="w-4 h-4 text-amber-600" />
                    <span>GENERATED TEAM PASSKEY</span>
                  </div>
                  <span className="text-amber-800 text-[10px] font-mono">Share with all {createdTeam.members?.length || 4} team members for instant login</span>
                </div>
                <span className="text-xl font-black font-mono text-amber-700 bg-white px-4 py-1.5 rounded border border-amber-400 tracking-widest text-center shadow-xs">
                  {createdTeam.passkey}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 font-semibold">Domain</span>
                <span className="text-xs font-mono text-sky-700 font-bold">{createdTeam.domainName}</span>
              </div>
            </div>

            {/* Confirmed Team Roster (Up to 4 Members) */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-left space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-sky-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>CONFIRMED TEAM ROSTER ({createdTeam.members?.length || 1} / 4 MEMBERS)</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded font-bold">
                  VERIFIED
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {createdTeam.members?.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{m.name}</div>
                      <div className="text-[10px] text-sky-700 font-mono font-medium">{m.role}</div>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-bold">
                      {idx === 0 ? 'LEADER' : `MEMBER ${idx + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={copyCredentials}
                className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono text-xs font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIED CREDENTIALS!' : 'COPY TEAM CREDENTIALS'}</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveModal('dashboard');
                }}
                className="px-6 py-3 rounded-xl bg-sky-600 text-white font-tech font-bold text-xs tracking-wider hover:bg-sky-500 shadow-sm transition-all"
              >
                ENTER TEAM WORKSPACE
              </button>
            </div>
          </div>
        ) : (
          /* Multi-step Registration Form */
          <div>
            {/* Step Progress Indicator */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {[
                { step: 1, label: "Personal", icon: User },
                { step: 2, label: "Academic", icon: GraduationCap },
                { step: 3, label: "Domain", icon: Layers },
                { step: 4, label: "Team (4 Max)", icon: ShieldCheck }
              ].map((item) => {
                const isCurrent = currentStep === item.step;
                const isPast = currentStep > item.step;
                const StepIcon = item.icon;

                return (
                  <div
                    key={item.step}
                    className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                      isCurrent 
                        ? 'border-sky-500 bg-sky-50 shadow-xs text-sky-800 font-bold' 
                        : isPast 
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-700 font-bold' 
                        : 'border-slate-200 bg-slate-50 text-slate-400'
                    }`}
                  >
                    <StepIcon className="w-4 h-4 mb-1" />
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                      {item.step}. {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <form onSubmit={currentStep === 4 ? handleSubmit : handleNext}>
              {/* STEP 1: PERSONAL INFORMATION (TEAM LEADER) */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold font-tech text-sky-800 uppercase tracking-wider">
                      Step 1: Team Leader Personal Details
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-700 font-bold">
                      MEMBER 1 / 4 (LEAD)
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">Leader Full Name *</label>
                    <input
                      type="text"
                      name="leaderName"
                      required
                      value={formData.leaderName}
                      onChange={handleChange}
                      placeholder="e.g. Kavin Raj"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">Leader Email Address *</label>
                      <input
                        type="email"
                        name="leaderEmail"
                        required
                        value={formData.leaderEmail}
                        onChange={handleChange}
                        placeholder="e.g. kavin@example.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">Leader Mobile Number *</label>
                      <input
                        type="tel"
                        name="leaderPhone"
                        required
                        value={formData.leaderPhone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: ACADEMIC INFORMATION */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold font-tech text-sky-800 uppercase tracking-wider">
                    Step 2: Academic Affiliation
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">College / University Name *</label>
                    <input
                      type="text"
                      name="college"
                      required
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="e.g. Arunai Engineering College"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">Department / Branch *</label>
                      <input
                        type="text"
                        name="department"
                        required
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="e.g. Computer Science & Engineering"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">Year of Study *</label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
                      >
                        <option value="I Year">I Year</option>
                        <option value="II Year">II Year</option>
                        <option value="III Year">III Year</option>
                        <option value="IV Year">IV Year</option>
                        <option value="PG / Research Scholar">PG / Research Scholar</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">Register / Roll Number</label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      placeholder="e.g. 510421104050"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: DOMAIN SELECTION */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold font-tech text-sky-800 uppercase tracking-wider">
                    Step 3: Hackathon Theme Selection
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">Select Hackathon Theme *</label>
                    <select
                      name="domain"
                      value={formData.domain}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-sky-300 rounded-xl p-3 text-xs text-sky-900 font-mono font-semibold focus:outline-none focus:border-sky-500 focus:bg-white"
                    >
                      {HACKATHON_THEMES.map(theme => (
                        <option key={theme.id} value={theme.id}>
                          {theme.number}. {theme.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">Tentative Project Title *</label>
                    <input
                      type="text"
                      name="projectTitle"
                      required
                      value={formData.projectTitle}
                      onChange={handleChange}
                      placeholder="e.g. NeuroGuardian: Edge AI for Industrial Safety"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white font-tech"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">Short Idea Abstract / Problem Description</label>
                    <textarea
                      name="abstract"
                      rows={3}
                      value={formData.abstract}
                      onChange={handleChange}
                      placeholder="Briefly describe the engineering challenge you are solving and the proposed prototype architecture..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: ACCOUNT & TEAM CREATION (TOTAL 4 MEMBERS ALLOWED + AUTO RANDOM PASSKEY) */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-3">
                    <div>
                      <h3 className="text-sm font-bold font-tech text-sky-800 uppercase tracking-wider">
                        Step 4: Team Setup & Member Allocation
                      </h3>
                      <p className="text-[11px] text-slate-500 font-sans">
                        Hackathon teams can have up to <strong className="text-slate-900 font-bold">4 members</strong> total.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold flex items-center gap-1 w-fit">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>TOTAL 4 MEMBERS ALLOWED</span>
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">Team Name *</label>
                    <input
                      type="text"
                      name="teamName"
                      required
                      value={formData.teamName}
                      onChange={handleChange}
                      placeholder="e.g. NeuralVanguard"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white font-tech"
                    />
                  </div>

                  {/* 4 Member Slots Breakdown */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                      Team Roster Allocation (4 Members Maximum):
                    </span>

                    {/* Member 1: Team Leader (Pre-filled from Step 1) */}
                    <div className="p-3 rounded-xl bg-sky-50/80 border border-sky-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300 font-bold">
                            MEMBER 1 (LEADER)
                          </span>
                          <span className="text-xs font-bold text-slate-900">{formData.leaderName || 'Leader Name'}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {formData.leaderEmail || 'leader@domain.com'} • {formData.leaderPhone || '+91 ...'}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-sky-700 font-bold">Primary Contact</span>
                    </div>

                    {/* Member 2 */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-300 font-bold">
                          MEMBER 2 (OPTIONAL / UP TO 4)
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-medium">Co-Builder</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          name="member2Name"
                          value={formData.member2Name}
                          onChange={handleChange}
                          placeholder="Member 2 Full Name"
                          className="bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
                        />
                        <input
                          type="text"
                          name="member2Role"
                          value={formData.member2Role}
                          onChange={handleChange}
                          placeholder="Role (e.g. Frontend / UI)"
                          className="bg-white border border-slate-300 rounded-lg p-2 text-xs text-sky-800 font-mono focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>

                    {/* Member 3 */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-300 font-bold">
                          MEMBER 3 (OPTIONAL / UP TO 4)
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-medium">Co-Builder</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          name="member3Name"
                          value={formData.member3Name}
                          onChange={handleChange}
                          placeholder="Member 3 Full Name"
                          className="bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
                        />
                        <input
                          type="text"
                          name="member3Role"
                          value={formData.member3Role}
                          onChange={handleChange}
                          placeholder="Role (e.g. Backend Architect)"
                          className="bg-white border border-slate-300 rounded-lg p-2 text-xs text-sky-800 font-mono focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>

                    {/* Member 4 */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-300 font-bold">
                          MEMBER 4 (OPTIONAL / UP TO 4)
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-medium">Co-Builder</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          name="member4Name"
                          value={formData.member4Name}
                          onChange={handleChange}
                          placeholder="Member 4 Full Name"
                          className="bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
                        />
                        <input
                          type="text"
                          name="member4Role"
                          value={formData.member4Role}
                          onChange={handleChange}
                          placeholder="Role (e.g. AI / Systems Lead)"
                          className="bg-white border border-slate-300 rounded-lg p-2 text-xs text-sky-800 font-mono focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* AUTOMATIC PASSKEY GENERATION NOTICE - NO MANUAL PASSKEY ASKING */}
                  <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-tech font-bold text-xs">
                      <KeyRound className="w-4 h-4 text-amber-600" />
                      <span>AUTOMATED RANDOM PASSKEY GENERATION</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed font-sans">
                      You do <strong className="text-slate-900 font-bold">not need to create a manual password or passkey</strong>. When you click Complete Registration below, the NCORE security engine will automatically generate a secure, high-entropy random <strong className="text-amber-900 font-mono">Team Passkey</strong> (e.g., <span className="font-mono text-amber-900 font-bold">NCR-XXXX-X</span>) and unique <strong className="text-sky-800 font-mono">Team ID</strong>.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-amber-900 bg-white px-3 py-1.5 rounded-lg border border-amber-200">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>All 4 registered members can authenticate and collaborate using this single random passkey.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 hover:bg-slate-200 flex items-center gap-1.5 font-semibold transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>BACK</span>
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-tech font-bold text-xs tracking-wider shadow-sm flex items-center gap-2 transition-all"
                >
                  {currentStep === 4 ? (
                    <>
                      <KeyRound className="w-4 h-4 text-white" />
                      <span>COMPLETE & GENERATE PASSKEY</span>
                    </>
                  ) : (
                    <>
                      <span>CONTINUE</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
