import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroTerminal from "../components/HeroTerminal";
import StatsSection from "../components/StatsSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import ResumeSection from "../components/ResumeSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Portfolio = () => {
  // Easter egg console message
  useEffect(() => {
    console.log(
      "%cWarning: Unauthorized access detected... just kidding. Hi there! 👋",
      "color: #00FF41; font-family: monospace; font-size: 14px;"
    );
    console.log(
      "%cLooking for flags? Try: flag{nice_try_recruiter}",
      "color: #FFD700; font-family: monospace; font-size: 12px;"
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0]">
      <Header />
      <main>
        <HeroTerminal />
        <StatsSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;