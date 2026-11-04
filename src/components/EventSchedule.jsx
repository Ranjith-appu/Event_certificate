import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Edit3, Check, Plus, Trash2, Radio } from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { playClickSound, playHoverSound } from '../utils/audio';

const EventSchedule = () => {
  const { schedule, currentUser, setSchedule } = useHackathon();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ time: '', title: '', venue: '' });

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ time: item.time, title: item.title, venue: item.venue });
    playClickSound();
  };

  const saveEdit = (id) => {
    setSchedule(prev => prev.map(item => item.id === id ? { ...item, ...editForm } : item));
    setEditingId(null);
    playClickSound();
  };

  const toggleActiveSlot = (id) => {
    if (currentUser?.role !== 'admin') return;
    setSchedule(prev => prev.map(item => ({ ...item, active: item.id === id ? !item.active : false })));
    playClickSound();
  };

  return (
    <section id="schedule" className="py-20 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-semibold">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              09 OCTOBER 2026 • 12HRS TIMELINE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-tech text-slate-900 tracking-tight">
              EVENT SCHEDULE
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
              Precision synchronization from morning reporting through midnight awards ceremony at Arunai Engineering College.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono font-semibold text-sky-700">
            <MapPin className="w-4 h-4 text-sky-600" />
            <span>ARUNAI ENGINEERING COLLEGE, TIRUVANNAMALAI</span>
          </div>
        </div>

        {/* Schedule Grid List */}
        <div className="space-y-3">
          {schedule.map((slot) => {
            const isEditing = editingId === slot.id;

            return (
              <div
                key={slot.id}
                onMouseEnter={playHoverSound}
                className={`p-4 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 border ${
                  slot.active 
                    ? 'border-sky-500 bg-sky-50/80 shadow-sm ring-1 ring-sky-400/30' 
                    : 'border-slate-200 hover:border-sky-300 bg-white shadow-xs hover:bg-slate-50/50'
                }`}
              >
                {/* Time & Title */}
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border shrink-0 ${
                    slot.active 
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs' 
                      : 'bg-slate-100 text-sky-800 border-slate-200'
                  }`}>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.time} 
                        onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                        className="w-20 bg-white text-sky-900 text-xs px-1 border border-sky-400 rounded focus:outline-none"
                      />
                    ) : slot.time}
                  </div>

                  <div>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.title} 
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full bg-white text-slate-900 text-sm px-2 py-1 border border-sky-400 rounded font-tech focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`text-sm sm:text-base font-bold font-tech ${
                          slot.active ? 'text-sky-950' : 'text-slate-800'
                        }`}>
                          {slot.title}
                        </span>
                        {slot.active && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300 animate-pulse">
                            <Radio className="w-3 h-3 text-sky-600" />
                            NOW HAPPENING
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={editForm.venue} 
                          onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })}
                          className="bg-white text-slate-700 text-xs px-1 border border-slate-300 rounded focus:outline-none"
                        />
                      ) : (
                        <span>{slot.venue}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status or Admin Controls */}
                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                  {currentUser?.role === 'admin' && (
                    <>
                      {isEditing ? (
                        <button
                          onClick={() => saveEdit(slot.id)}
                          className="p-1.5 rounded bg-emerald-100 border border-emerald-400 text-emerald-800 text-xs font-semibold flex items-center gap-1 px-2"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(slot)}
                          className="p-1.5 rounded bg-slate-100 border border-slate-300 text-slate-600 hover:text-sky-600 text-xs"
                          title="Edit slot"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => toggleActiveSlot(slot.id)}
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border ${
                          slot.active 
                            ? 'bg-sky-100 text-sky-800 border-sky-400' 
                            : 'bg-slate-100 text-slate-600 border-slate-300 hover:border-sky-400'
                        }`}
                      >
                        {slot.active ? 'Current Slot' : 'Set Current'}
                      </button>
                    </>
                  )}

                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 uppercase font-semibold">
                    {slot.round}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventSchedule;
