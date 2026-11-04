import React from 'react';
import { HackathonProvider, useHackathon } from './context/HackathonContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ThemesSection from './components/ThemesSection';
import PrizeSection from './components/PrizeSection';
import EventSchedule from './components/EventSchedule';
import GuidelinesSection from './components/GuidelinesSection';
import MeetTheJudges from './components/MeetTheJudges';
import Footer from './components/Footer';

// Standalone Pages
import AdminPage from './pages/AdminPage';
import JuryPage from './pages/JuryPage';

// Modals & Floating Components
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal';
import ParticipantDashboard from './components/ParticipantDashboard';
import AdminControlCenter from './components/AdminControlCenter';
import CertificateCenter from './components/CertificateCenter';

const AppContent = () => {
  const { activeModal, currentPath } = useHackathon();

  // Standalone dedicated page for Director / Admin Control
  if (currentPath === '/admin') {
    return (
      <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-sky-500 selection:text-white">
        <AdminPage />
        {activeModal === 'cert' && <CertificateCenter />}
      </div>
    );
  }

  // Standalone dedicated page for Jury Evaluation & Score Maintenance
  if (currentPath === '/jury') {
    return (
      <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-sky-500 selection:text-white">
        <JuryPage />
        {activeModal === 'cert' && <CertificateCenter />}
      </div>
    );
  }

  // Standalone dedicated page for Login
  if (currentPath === '/login') {
    return (
      <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-sky-500 selection:text-white flex flex-col justify-center items-center p-4">
        <LoginModal isStandalonePage={true} />
        {activeModal === 'dashboard' && <ParticipantDashboard />}
        {activeModal === 'cert' && <CertificateCenter />}
      </div>
    );
  }

  // Pure Hackathon Landing Page Flow (Leaderboard, Rounds & Notifications moved to Participant Portal)
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-sky-500 selection:text-white">
      {/* Main Navbar */}
      <Navbar />

      {/* Pure Hackathon Landing Page Flow */}
      <main>
        <HeroSection />
        <ThemesSection />
        <PrizeSection />
        <EventSchedule />
        <GuidelinesSection />
        <MeetTheJudges />
      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Modals according to activeModal state */}
      {activeModal === 'register' && <RegistrationModal />}
      {activeModal === 'login' && <LoginModal />}
      {activeModal === 'dashboard' && <ParticipantDashboard />}
      {activeModal === 'admin' && <AdminControlCenter />}
      {activeModal === 'cert' && <CertificateCenter />}
    </div>
  );
};

function App() {
  return (
    <HackathonProvider>
      <AppContent />
    </HackathonProvider>
  );
}

export default App;
