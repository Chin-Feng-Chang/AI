import React, { useState, useRef } from 'react';

const navItems = [
  { id: 'hero', label: '01. HERO / 主視覺', href: '#hero' },
  { id: 'works', label: '02. WORKS / 精選作品', href: '#works' },
  { id: 'status', label: '03. STATUS / 角色數值', href: '#status' },
  { id: 'quest', label: '04. QUEST / 委託任務', href: '#quest' },
];

export default function Header({ activeSection = 'hero', onNavigate }) {
  const [bgmOn, setBgmOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);

  const toggleBgm = () => {
    if (bgmOn) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setBgmOn(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;
        const notes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63];
        let step = 0;

        const playBeep = (freq) => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.03, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.26);
        };

        playBeep(notes[0]);
        intervalRef.current = setInterval(() => {
          step = (step + 1) % notes.length;
          playBeep(notes[step]);
        }, 420);
        setBgmOn(true);
      } catch {
        setBgmOn(!bgmOn);
      }
    }
  };

  const handleNavClick = (e, id, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) onNavigate(id);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-low border-b-2 border-black shadow-[0_4px_0_#000000]">
      <div className="h-20 w-full px-gutter flex items-center justify-between gap-space-md">
        {/* Brand Identity Box */}
        <div className="flex items-center gap-space-md">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero', '#hero')}
            className="bg-surface-container-lowest border-2 border-black p-space-xs shadow-[2px_2px_0px_#000000] block hover:brightness-110 transition-all"
          >
            <div className="flex items-center gap-space-xs">
              <span className="bg-primary-container text-on-primary px-space-xs py-0.5 font-label-sm text-label-sm uppercase tracking-wider">
                KAI // 3D LAB
              </span>
              <div className="flex items-center gap-1 bg-surface-container px-space-xs py-0.5 border border-black">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="font-label-sm text-label-sm text-secondary tracking-widest">
                  SYSTEM: ONLINE
                </span>
              </div>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant tracking-tighter mt-0.5">
              // 作品番号・システム稼働中
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-space-xs bg-surface-container-lowest p-1 border-2 border-black shadow-[3px_3px_0px_#000000]"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id, item.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-space-md py-space-xs font-label-md text-label-md transition-all border ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-[2px_2px_0px_#000000] border-black'
                    : 'text-on-surface-variant border-transparent hover:border-black hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-space-sm">
          <div className="hidden md:flex items-center bg-tertiary text-on-tertiary px-space-sm py-1 font-label-sm text-label-sm border-2 border-black shadow-[2px_2px_0px_#000000]">
            <span>LV.99 3D ARTISAN</span>
          </div>

          <button
            type="button"
            onClick={toggleBgm}
            className={`border-2 border-black px-space-sm py-1 font-label-sm text-label-sm active:translate-x-0.5 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_#000000] ${
              bgmOn
                ? 'bg-secondary-container text-on-secondary-container'
                : 'bg-surface-container text-secondary-container hover:bg-secondary-container hover:text-on-secondary-container'
            }`}
          >
            BGM [{bgmOn ? 'ON' : 'OFF'}]
          </button>

          <div className="hidden sm:flex items-center gap-1">
            <a
              href="#status"
              onClick={(e) => handleNavClick(e, 'status', '#status')}
              title="Source Code Terminal"
              className="w-8 h-8 flex items-center justify-center bg-surface-container-high border-2 border-black text-on-surface hover:bg-primary-container hover:text-on-primary shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
            >
              <span className="material-symbols-outlined text-[18px]">terminal</span>
            </a>
            <a
              href="#works"
              onClick={(e) => handleNavClick(e, 'works', '#works')}
              title="Art Gallery Archive"
              className="w-8 h-8 flex items-center justify-center bg-surface-container-high border-2 border-black text-on-surface hover:bg-secondary-container hover:text-on-secondary-container shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
            >
              <span className="material-symbols-outlined text-[18px]">palette</span>
            </a>
          </div>

          <a
            href="#quest"
            onClick={(e) => handleNavClick(e, 'quest', '#quest')}
            title="Pilot Status & Quest"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000] hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-8 h-8 flex items-center justify-center bg-surface-container-high border-2 border-black text-on-surface shadow-[2px_2px_0px_#000000]"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-[18px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b-2 border-black px-gutter py-space-sm flex flex-col gap-space-xs shadow-[0_6px_0_#000000]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id, item.href)}
                className={`px-space-md py-space-xs font-label-md text-label-md border-2 border-black ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-[2px_2px_0px_#000000]'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
