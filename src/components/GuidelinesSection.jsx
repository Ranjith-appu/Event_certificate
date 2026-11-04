import React from 'react';
import { ShieldCheck, Users, Lightbulb, CheckSquare, Scale, HelpCircle } from 'lucide-react';
import { playHoverSound } from '../utils/audio';

const GuidelinesSection = () => {
  const guidelines = [
    {
      icon: Users,
      title: "Open to All Innovators",
      desc: "Eligible for Engineering Students, Research Scholars, and Early-Career Innovators passionate about computing, software, and systems optimization."
    },
    {
      icon: CheckSquare,
      title: "Team Size: 2 – 4 Members",
      desc: "Form dynamic multidisciplinary teams of 2 to 4 members. Inter-college teams and cross-department collaborations are fully permitted."
    },
    {
      icon: Lightbulb,
      title: "Original Ideas & Working Prototype",
      desc: "Original ideas and functional working models are strongly required. Pre-built canned solutions or third-party clones will face immediate penalty."
    },
    {
      icon: ShieldCheck,
      title: "Theme Alignment & Code Ethics",
      desc: "Submissions must align with one of the 6 official Hackathon themes. Plagiarism, unethical scraping, or uncredited code copying is strictly prohibited."
    },
    {
      icon: Scale,
      title: "Jury Decision is Final",
      desc: "Evaluations follow strict criteria (Technical Rigor, Architecture, Innovation, Pitch Defense). The normalized scoring of the distinguished jury is binding and final."
    }
  ];

  return (
    <section id="guidelines" className="py-20 relative bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>REGULATORY PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-tech text-slate-900 tracking-tight">
            GENERAL GUIDELINES & ETHICS
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Adhere strictly to official conduct, intellectual property ethics, and milestone evaluation criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidelines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-400 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden"
              >
                <div className="hud-corner-tl !border-sky-300"></div>
                <div className="hud-corner-tr !border-sky-300"></div>
                <div className="hud-corner-bl !border-sky-300"></div>
                <div className="hud-corner-br !border-sky-300"></div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-tech text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Quick FAQ / Inquiries Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 via-white to-sky-50/50 border border-sky-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700 shadow-xs">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-tech text-slate-900">Have Queries?</h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Our Student Coordinators from POINTERS CSE are available 24/7 for mentorship, logistics, and environment onboarding.
              </p>
            </div>
            <div className="pt-4 border-t border-sky-100 text-xs font-mono font-bold text-sky-700">
              Helpline: +91 87789 70224
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
