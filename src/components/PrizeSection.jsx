import React from 'react';
import { 
  Trophy, 
  Sparkles, 
  Lightbulb, 
  Code2, 
  Rocket, 
  Users, 
  ShieldCheck, 
  MapPin,
  Zap
} from 'lucide-react';
import { playHoverSound } from '../utils/audio';

const PrizeSection = () => {
  // Grammatical encouraging phrases & core pillars replacing the 1st/2nd/3rd detail cards
  const encouragingPillars = [
    {
      icon: Lightbulb,
      badge: "THINK BOLDLY",
      title: "Pioneer Unconventional Architectures",
      quote: "Every monumental breakthrough started as an improbable idea.",
      description: "Step beyond familiar patterns. Harness synthetic intelligence, decentralized ledgers, and edge computing to sculpt solutions that anticipate the technological demands of the next decade.",
      borderColor: "border-sky-200",
      accentColor: "text-sky-600",
      bgGradient: "from-sky-50 to-white"
    },
    {
      icon: Code2,
      badge: "BUILD WITH RIGOR",
      title: "Craft Resilient & Scalable Systems",
      quote: "True craftsmanship lies in the elegance of robust execution.",
      description: "Transform conceptual diagrams into rock-solid code. Optimize performance budgets, write deterministic contracts, and build resilient architectures capable of weathering real production loads.",
      borderColor: "border-blue-200",
      accentColor: "text-blue-600",
      bgGradient: "from-blue-50 to-white"
    },
    {
      icon: Rocket,
      badge: "MAKE AN IMPACT",
      title: "Solve for Authentic Real-World Impact",
      quote: "Technology attains its highest virtue when it elevates human potential.",
      description: "Direct your talent toward challenges that genuinely matter. Whether revolutionizing clean energy routing, safeguarding digital identity, or optimizing healthcare telemetry, create software that leaves a lasting positive footprint.",
      borderColor: "border-amber-200",
      accentColor: "text-amber-600",
      bgGradient: "from-amber-50 to-white"
    },
    {
      icon: Users,
      badge: "RISE TOGETHER",
      title: "Collaborate, Grow & Transcend as a Team",
      quote: "Great innovations emerge at the intersection of diverse perspectives.",
      description: "Combine multidisciplinary strengths across design, systems, AI, and hardware. Learn from distinguished industry jury critiques, master rapid iteration, and forge enduring bonds that extend far beyond the 12-hour arena.",
      borderColor: "border-emerald-200",
      accentColor: "text-emerald-600",
      bgGradient: "from-emerald-50 to-white"
    }
  ];

  return (
    <section id="prizes" className="py-24 relative overflow-hidden bg-slate-100/70 border-t border-slate-200">
      {/* Subtle radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-sky-200/40 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>EMPOWERING EVERY PARTICIPANT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-tech text-slate-900 tracking-tight">
            TRANSCEND THE ORDINARY
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            NCORE 2026 is an empowering arena designed to foster fearless curiosity, engineering grit, and groundbreaking solutions. Here is what guides our innovators:
          </p>
        </div>

        {/* Central Total Rewards & Recognition Banner */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-50/60 relative overflow-hidden shadow-md mb-16 border-2 border-amber-300">
          <div className="hud-corner-tl !border-amber-400"></div>
          <div className="hud-corner-tr !border-amber-400"></div>
          <div className="hud-corner-bl !border-amber-400"></div>
          <div className="hud-corner-br !border-amber-400"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Vector Trophy Icon Container */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-36 h-36 rounded-2xl bg-white border-2 border-amber-400/80 flex flex-col items-center justify-center p-4 text-center relative shadow-sm">
                <Trophy className="w-16 h-16 text-amber-500 mb-2" />
                <span className="text-[10px] font-mono text-amber-800 font-bold uppercase tracking-wider bg-amber-100/90 px-2 py-0.5 rounded">
                  ₹20,000 PRIZE POOL
                </span>
              </div>
            </div>

            {/* Total Recognition Information */}
            <div className="md:col-span-8 space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-mono font-semibold">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>EXCELLENCE & IMPACT HONORS</span>
              </div>

              <h3 className="text-xs sm:text-sm font-mono tracking-widest text-slate-600 uppercase font-semibold">
                TOTAL REWARDS & RECOGNITION POOL
              </h3>

              <div className="text-5xl sm:text-6xl font-black font-tech text-amber-600 tracking-tight">
                ₹20,000
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Honoring outstanding teams with cash awards, championship trophies, medals of distinction, and direct incubation mentorship. Every team is judged on technical rigor, architecture soundness, and pitch defense.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Encouraging Phrases & Pillars Grid (Replacing 1st/2nd/3rd detail cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {encouragingPillars.map((pillar, idx) => {
            const PillarIcon = pillar.icon;

            return (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className={`p-7 rounded-2xl relative overflow-hidden bg-gradient-to-br ${pillar.bgGradient} border ${pillar.borderColor} shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="hud-corner-tl !border-sky-400"></div>
                <div className="hud-corner-tr !border-sky-400"></div>
                <div className="hud-corner-bl !border-sky-400"></div>
                <div className="hud-corner-br !border-sky-400"></div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md text-[10px] font-mono font-bold tracking-widest uppercase bg-white border border-slate-200 text-slate-700 shadow-xs">
                      {pillar.badge}
                    </span>
                    <PillarIcon className={`w-6 h-6 ${pillar.accentColor}`} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-tech text-slate-900">
                      {pillar.title}
                    </h3>
                    <div className="mt-2 text-xs font-mono text-sky-800 italic border-l-2 border-sky-500 pl-3 py-1 bg-sky-50/50 rounded-r">
                      "{pillar.quote}"
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans pt-1">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Universal Participation & Certification Assurance */}
        <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold font-tech text-slate-900 uppercase tracking-wider">
                EQUAL ARENA & AUTHENTICATED CERTIFICATION FOR ALL TEAMS
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                Every verified on-campus participant receives official cryptographic certificates and direct jury appraisal.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-sky-700 shrink-0 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>CAMPUS VERIFIED</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizeSection;
