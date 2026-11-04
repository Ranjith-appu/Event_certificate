import React, { useState } from 'react';
import { Shield, Sparkles, UserCheck, Plus, Trash2, Edit2, Check } from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { EVENT_DETAILS } from '../data/ncoreData';
import { playClickSound, playHoverSound } from '../utils/audio';

const MeetTheJudges = () => {
  const { judges, currentUser, setJudges } = useHackathon();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newJudge, setNewJudge] = useState({
    name: '',
    designation: '',
    organization: '',
    expertise: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  });

  const handleAddJudge = (e) => {
    e.preventDefault();
    if (!newJudge.name) return;
    const judge = {
      id: 'j_' + Date.now(),
      ...newJudge
    };
    setJudges(prev => [...prev, judge]);
    setShowAddModal(false);
    setNewJudge({ name: '', designation: '', organization: '', expertise: '', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' });
    playClickSound();
  };

  const handleDeleteJudge = (id) => {
    setJudges(prev => prev.filter(j => j.id !== id));
    playClickSound();
  };

  return (
    <section id="judges" className="py-20 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-semibold">
              <UserCheck className="w-3.5 h-3.5 text-sky-600" />
              DISTINGUISHED EVALUATION PANEL
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-tech text-slate-900 tracking-tight">
              MEET THE JUDGES & CONVENERS
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
              Industry leaders, academic researchers, and domain experts evaluating architectural feasibility, technical complexity, and real-world impact.
            </p>
          </div>

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => {
                setShowAddModal(true);
                playClickSound();
              }}
              className="mt-4 md:mt-0 px-4 py-2 rounded-lg bg-sky-50 border border-sky-300 text-sky-700 text-xs font-semibold hover:bg-sky-600 hover:text-white transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Judge</span>
            </button>
          )}
        </div>

        {/* Official Conveners Card from Brochure */}
        <div className="mb-12 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative">
          <div className="flex items-center gap-2 text-sky-700 text-xs font-mono font-bold mb-4">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>ACADEMIC CONVENERS & LEADERSHIP</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {EVENT_DETAILS.conveners.map((conv, cIdx) => (
              <div key={cIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700 font-tech font-bold text-lg">
                  {conv.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold font-tech text-slate-900">{conv.name}</h4>
                  <p className="text-xs text-sky-700 font-mono font-medium">{conv.role}</p>
                  <p className="text-[10px] text-slate-500">{conv.title}, Arunai Engg. College</p>
                </div>
              </div>
            ))}

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700 font-tech font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="text-sm font-bold font-tech text-slate-900">{EVENT_DETAILS.leadStudentCoordinator.name}</h4>
                <p className="text-xs text-sky-700 font-mono font-medium">{EVENT_DETAILS.leadStudentCoordinator.year}</p>
                <p className="text-[10px] text-slate-500">Lead Student Coordinator, POINTERS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Distinguished Jury Cards Grid with 3D Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {judges.map((judge) => (
            <div
              key={judge.id}
              onMouseEnter={playHoverSound}
              className="group relative p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Corner HUD */}
              <div className="hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity !border-sky-400"></div>
              <div className="hud-corner-tr opacity-0 group-hover:opacity-100 transition-opacity !border-sky-400"></div>
              <div className="hud-corner-bl opacity-0 group-hover:opacity-100 transition-opacity !border-sky-400"></div>
              <div className="hud-corner-br opacity-0 group-hover:opacity-100 transition-opacity !border-sky-400"></div>

              <div>
                {/* Judge Photo with subtle zoom */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200 group-hover:border-sky-400/40 transition-colors">
                  <img
                    src={judge.image}
                    alt={judge.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Delete button if admin */}
                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteJudge(judge.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-500 text-xs shadow-xs"
                      title="Remove judge"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <h3 className="text-base font-bold font-tech text-slate-900 group-hover:text-sky-700 transition-colors">
                  {judge.name}
                </h3>
                
                <p className="text-xs text-sky-700 font-mono mt-0.5 font-semibold">
                  {judge.designation}
                </p>

                <p className="text-xs text-slate-600 font-medium mt-1">
                  {judge.organization}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-medium">Area of Expertise:</span>
                <span className="text-xs font-mono text-amber-700 font-semibold">
                  {judge.expertise}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Judge Modal for Admin */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-2xl border-2 border-sky-300 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-tech text-slate-900">Add Distinguished Judge</h3>
            <form onSubmit={handleAddJudge} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Judge Name</label>
                <input
                  type="text"
                  required
                  value={newJudge.name}
                  onChange={(e) => setNewJudge({ ...newJudge, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  placeholder="e.g. Dr. Jane Doe"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Designation</label>
                <input
                  type="text"
                  required
                  value={newJudge.designation}
                  onChange={(e) => setNewJudge({ ...newJudge, designation: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  placeholder="e.g. Lead AI Architect"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Organization</label>
                <input
                  type="text"
                  required
                  value={newJudge.organization}
                  onChange={(e) => setNewJudge({ ...newJudge, organization: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  placeholder="e.g. Google DeepMind"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Area of Expertise</label>
                <input
                  type="text"
                  required
                  value={newJudge.expertise}
                  onChange={(e) => setNewJudge({ ...newJudge, expertise: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                  placeholder="e.g. Large Language Models & Vision"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Photo URL</label>
                <input
                  type="url"
                  value={newJudge.image}
                  onChange={(e) => setNewJudge({ ...newJudge, image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-500 transition-colors shadow-xs"
                >
                  Save Judge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default MeetTheJudges;
