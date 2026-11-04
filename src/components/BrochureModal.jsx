import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, FileText, ExternalLink } from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { playClickSound } from '../utils/audio';

const BrochureModal = () => {
  const { setActiveModal } = useHackathon();
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
    playClickSound();
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
    playClickSound();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl glass-panel border-2 border-cyan-400/50 rounded-2xl p-4 sm:p-6 my-4 shadow-glow-cyan flex flex-col max-h-[92vh]">
        {/* Header Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm sm:text-base font-bold font-tech text-white">
                NCORE 2026 OFFICIAL EVENT BROCHURE
              </h3>
              <p className="text-[11px] font-mono text-cyan-300">
                Arunai Engineering College • Dept. of CSE • i-GROW & POINTERS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg bg-space-950 border border-slate-700 text-slate-300 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg bg-space-950 border border-slate-700 text-slate-300 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <a
              href="/assets/ncore_brochure_full.jpeg"
              download="NCORE_2026_Official_Brochure.jpg"
              className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-space-950 transition-all flex items-center gap-1 text-xs font-mono px-2.5"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              onClick={() => {
                playClickSound();
                setActiveModal(null);
              }}
              className="p-1.5 rounded-lg bg-space-950 border border-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brochure Image Container with Zoom */}
        <div className="overflow-auto flex-1 mt-4 rounded-xl border border-slate-800 bg-space-950 flex items-center justify-center p-2">
          <img
            src="/assets/ncore_brochure_full.jpeg"
            alt="NCORE 2026 Official Brochure"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            className="max-w-full h-auto transition-transform duration-200 rounded shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default BrochureModal;
