import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FlagshipAtom from '../components/FlagshipAtom';
import ProjectsSection from '../components/ProjectsSection';
import StatsSection from '../components/StatsSection';
import SkillsSection from '../components/SkillsSection';
import TimelineSection from '../components/TimelineSection';
import CertificationsSection from '../components/CertificationsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Toast from '../components/Toast';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FlagshipAtom />
        <ProjectsSection />
        <StatsSection />
        <SkillsSection />
        <TimelineSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default HomePage;
