import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HeroSection from './components/sections/HeroSection';
import WorksSection from './components/sections/WorksSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'works', 'status', 'quest'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="w-full pt-20 bg-surface min-h-screen">
        <HeroSection />
        <WorksSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
