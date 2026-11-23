import React from 'react';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t-2 border-black shadow-[0_-4px_0_#000000] py-space-lg">
      <div className="w-full px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex flex-col sm:flex-row items-center gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-container border border-black inline-block" />
            <span className="text-on-surface">© 2025 KAI MECHA LAB. ALL RIGHTS RESERVED.</span>
          </div>
          <span className="hidden sm:inline text-outline">//</span>
          <span className="text-secondary">POWERED BY THREE.JS &amp; TOON SHADERS</span>
        </div>

        <div className="flex items-center gap-space-md">
          <div className="font-label-sm text-label-sm text-on-surface-variant hidden lg:block">
            HUD_V3.8 // CEL-CORE ACTIVE
          </div>
          <a
            href="#hero"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 bg-surface-container border-2 border-black px-space-md py-1 font-label-sm text-label-sm text-on-surface hover:bg-tertiary hover:text-on-tertiary shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <span>TOP ↑ 回到頂部</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
