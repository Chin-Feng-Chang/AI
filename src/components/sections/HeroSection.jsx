import React, { useState } from 'react';
import CanvasContainer from '../3d/CanvasContainer';
import HeroScene from '../3d/HeroScene';
import Modal from '../common/Modal';
import { heroQuotes, heroMetrics } from '../../data/skills';

export default function HeroSection() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [burstCount, setBurstCount] = useState(0);
  const [resumeOpen, setResumeOpen] = useState(false);

  const cycleQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % heroQuotes.length);
  };

  return (
    <section id="hero" className="flex flex-col w-full relative overflow-hidden">
      <div className="w-full px-gutter py-space-xl relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-center">
          {/* Left Column / Foreground Diegetic UI */}
          <div className="xl:col-span-6 flex flex-col gap-space-md relative">
            {/* Overhead Japanese / System Coordinate Tape */}
            <div className="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm">
              <div className="bg-primary text-on-primary border border-black px-space-xs py-0.5 shadow-manga-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">terminal</span>
                <span>// CODE NAME: KAI_01</span>
              </div>
              <div className="bg-surface-container-highest text-secondary border border-black px-space-xs py-0.5 shadow-manga-sm">
                <span>サイバーモデラー [CYBER-MODELER]</span>
              </div>
              <div className="bg-surface-container-high text-tertiary border border-black px-space-xs py-0.5 shadow-manga-sm">
                <span>SYS.LOC // TOKYO_NEO_SECTOR_07</span>
              </div>
            </div>

            {/* Telemetry & Character Status Chips */}
            <div className="flex flex-wrap items-center gap-space-sm">
              <div className="inline-flex items-center gap-2 bg-surface-container-high border-2 border-black px-space-sm py-1 shadow-manga-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-container" />
                </span>
                <span className="font-label-sm text-label-sm text-secondary tracking-wider font-bold">
                  STATUS: AVAILABLE FOR WORK
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-surface-container border-2 border-black px-space-sm py-1 shadow-manga-sm">
                <span className="material-symbols-outlined text-tertiary text-[16px]">stars</span>
                <span className="font-label-sm text-label-sm text-on-surface">EXP LEVEL: 99</span>
                <span className="text-outline-variant font-label-sm text-label-sm">//</span>
                <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold tracking-tight">
                  CLASS: TECH-TOON SCULPTOR
                </span>
              </div>
            </div>

            {/* Kinetic Headline Block with Manga Halftone Dot Overlay */}
            <div className="relative bg-surface-container-lowest border-2 border-black p-space-lg shadow-manga-lg overflow-hidden">
              {/* Manga Halftone Dot Pattern Accent Background */}
              <div className="absolute inset-0 opacity-15 pointer-events-none halftone-cyan" />
              {/* Diagonal Speed Accent Ribbons */}
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-primary-container opacity-20 rotate-45 pointer-events-none" />
              <div className="absolute right-0 bottom-0 w-16 h-1 bg-secondary-container" />

              <div className="relative z-10 flex flex-col gap-space-xs">
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-secondary-container">
                  <span className="material-symbols-outlined text-[16px]">token</span>
                  <span>SPECIALIZED IN MECHA ART &amp; REALTIME CEL-SHADING</span>
                </div>
                <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface tracking-tight uppercase leading-none">
                  二次元與賽博機械
                  <br />
                  <span className="text-primary-container drop-shadow-md">的交匯點</span>
                </h1>
                <div className="font-headline-sm text-headline-sm text-on-surface-variant font-bold tracking-normal mt-1">
                  // HIGH-TECH CEL-SHADED 3D CREATOR
                </div>
              </div>
            </div>

            {/* Manga Comic Speech Dialogue Bubble */}
            <div
              onClick={cycleQuote}
              title="點擊切換台詞 (Click to switch quote)"
              className="relative bg-surface-container-high border-2 border-black p-space-md shadow-manga cursor-pointer hover:bg-surface-container-highest transition-colors"
            >
              <div className="flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">
                  chat_bubble
                </span>
                <div className="flex flex-col gap-0.5 w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-bold">
                      KAI // ARTISAN STATEMENT
                    </span>
                    <span className="font-label-sm text-label-sm text-tertiary">
                      [CLICK QUOTE {quoteIdx + 1}/{heroQuotes.length}]
                    </span>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface italic font-medium leading-snug">
                    {heroQuotes[quoteIdx]}
                  </p>
                  <div className="font-label-sm text-label-sm text-secondary-container mt-1">
                    &gt; DEPLOYING PROCEDURAL TOON INK CONTOURS &amp; CUSTOM VERTEX NORMALS...
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive CTAs with Manga Ink Drop Shadow & Hover Shifts */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              {/* Primary CTA Button */}
              <a
                href="#works"
                className="group relative inline-flex items-center justify-center gap-space-sm bg-primary-container text-on-primary border-2 border-black font-label-lg text-label-lg px-space-lg py-space-md shadow-[4px_4px_0px_#000000] transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#ffe600] active:translate-x-0 active:translate-y-0 active:shadow-manga-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-45">
                  auto_awesome
                </span>
                <span className="tracking-wide">進入作品展示 (EXPLORE WORKS)</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>

              {/* Secondary CTA Button */}
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="group relative inline-flex items-center justify-center gap-space-sm bg-surface-container-highest text-secondary-container border-2 border-black font-label-lg text-label-lg px-space-lg py-space-md shadow-[4px_4px_0px_#000000] transition-all duration-150 hover:bg-secondary-container hover:text-on-secondary-container hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] active:translate-x-0 active:translate-y-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-tertiary-container group-hover:text-on-secondary-container">
                  bolt
                </span>
                <span className="tracking-wide">召喚履歷 (SUMMON RESUME)</span>
                <span className="font-label-sm text-label-sm bg-surface-container-lowest px-1.5 py-0.5 text-secondary group-hover:bg-on-secondary-container group-hover:text-secondary border border-black">
                  PDF
                </span>
              </button>
            </div>

            {/* System Pipeline & Graceful Degradation HUD banner */}
            <div className="bg-surface-container-lowest border-2 border-black p-space-sm shadow-manga-sm mt-space-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary" />
                  <span className="text-on-surface font-bold">DPR: 1.5 ADAPTIVE</span>
                  <span className="text-outline-variant">//</span>
                  <span className="text-secondary">SUSPENSE CEL-SHADER ENGINE READY</span>
                </div>
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-outlined text-[14px]">tune</span>
                  <span>RENDER PASS: OK (60 FPS)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column / 3D Canvas Showcase Embed */}
          <div className="xl:col-span-6 relative flex flex-col">
            <div className="relative bg-surface-container-lowest border-2 border-black shadow-manga-lg p-space-xs overflow-hidden">
              {/* Outer Comic Panel Frame Details */}
              <div className="w-full bg-surface-container-high border-b-2 border-black px-space-md py-space-xs flex items-center justify-between">
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm">
                  <span className="text-primary-container font-bold">VIEWPORT // 01</span>
                  <span className="text-outline-variant">//</span>
                  <span className="text-on-surface">REALTIME TOON RIG INSPECTOR</span>
                </div>
                <div className="flex items-center gap-1 font-label-sm text-label-sm text-secondary">
                  <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                  <span>WEBGL 2.0 CEL-PASS</span>
                </div>
              </div>

              {/* 3D Scene Viewport Canvas with Floating Telemetry HUD */}
              <div className="relative w-full h-[520px] md:h-[620px] bg-surface-container-lowest flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
                <CanvasContainer
                  cameraPosition={[0, 1.5, 6]}
                  fov={45}
                  className="w-full h-full"
                  onCanvasClick={() => setBurstCount((c) => c + 1)}
                >
                  <HeroScene burstTrigger={burstCount} />
                </CanvasContainer>

                {/* Manga Halftone Accent Lines (Corner Decorators) */}
                <div className="absolute top-4 left-4 pointer-events-none opacity-25 halftone-pink w-16 h-16" />
                <div className="absolute bottom-4 right-4 pointer-events-none opacity-25 halftone-cyan w-16 h-16" />

                {/* Floating Top-Left 3D Spec Tag */}
                <div className="absolute top-space-md left-space-md bg-surface-container-high/90 border border-black p-space-xs shadow-manga-sm backdrop-blur-sm pointer-events-none">
                  <div className="font-label-sm text-label-sm text-secondary-container font-bold tracking-wide flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">grid_4x4</span>
                    <span>VERTICES: 48,290</span>
                  </div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant text-[9px] mt-0.5">
                    TRIANGLES: 96,580 // QUAD-FLOW OPTIMIZED
                  </div>
                </div>

                {/* Floating Top-Right 3D Spec Tag */}
                <div className="absolute top-space-md right-space-md bg-surface-container-high/90 border border-black p-space-xs shadow-manga-sm backdrop-blur-sm pointer-events-none text-right">
                  <div className="font-label-sm text-label-sm text-primary font-bold tracking-wide flex items-center justify-end gap-1">
                    <span>SHADING: CEL-TOON + OUTLINE PASS</span>
                    <span className="material-symbols-outlined text-[14px]">brush</span>
                  </div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant text-[9px] mt-0.5">
                    INVERTED HULL INK // 1.8PX NORMAL BIAS
                  </div>
                </div>

                {/* Floating Bottom-Left Lighting Callout */}
                <div className="absolute bottom-space-lg left-space-md bg-surface-container-high/90 border border-black p-space-xs shadow-manga-sm backdrop-blur-sm pointer-events-none hidden sm:block">
                  <div className="font-label-sm text-label-sm text-tertiary-fixed font-bold tracking-wide flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">wb_sunny</span>
                    <span>LIGHTING: 3-POINT TOON</span>
                  </div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant text-[9px] mt-0.5">
                    KEY + RIM HIGHLIGHT + AMBIENT BOUNCE
                  </div>
                </div>

                {/* Interactive HUD Controller Guide Overlay Badge */}
                <button
                  type="button"
                  onClick={() => setBurstCount((c) => c + 1)}
                  className="absolute bottom-space-md right-space-md bg-primary-container text-on-primary border-2 border-black px-space-sm py-1 shadow-manga flex items-center gap-2 hover:brightness-110 active:translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  <span className="font-label-sm text-label-sm tracking-widest font-bold">
                    DRAG TO ROTATE // CLICK CORE FOR PULSE TRIGGER
                  </span>
                </button>

                {/* Diegetic HUD Reticle Overlay Crosshairs */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                  <div className="w-48 h-48 border border-secondary-container/40 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-secondary-container" />
                  </div>
                </div>
              </div>

              {/* Bottom Viewport Telemetry Data Strip */}
              <div className="w-full bg-surface-container border-t-2 border-black px-space-md py-space-xs flex flex-wrap items-center justify-between gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
                <div className="flex items-center gap-space-sm">
                  <span className="text-secondary font-bold">CAM: ORBIT_FREE</span>
                  <span>FOV: 42°</span>
                  <span className="hidden sm:inline">EXPOSURE: 1.15 EV</span>
                </div>
                <div className="flex items-center gap-space-sm text-tertiary">
                  <span>TEX: 4K HAND-PAINTED ALBEDO</span>
                  <span className="hidden sm:inline">SHADER: CUSTOM HLSL/GLSL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Asymmetric Manga Showcase Metric Grid */}
        <div className="mt-space-xl grid grid-cols-2 md:grid-cols-4 gap-space-md">
          {heroMetrics.map((metric) => (
            <div
              key={metric.code}
              className="bg-surface-container-low border-2 border-black p-space-md shadow-manga relative overflow-hidden group hover:bg-surface-container hover:-translate-y-0.5 transition-all"
            >
              <div className="font-label-sm text-label-sm text-outline uppercase font-bold">
                {metric.code}
              </div>
              <div
                className={`font-display-hero text-headline-lg ${metric.valueColor} font-bold mt-1`}
              >
                {metric.value}
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {metric.desc}
              </div>
              <div className={`w-6 h-0.5 ${metric.barColor} mt-2`} />
            </div>
          ))}
        </div>
      </div>

      {/* Summon Resume Modal */}
      <Modal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        title="PILOT DOSSIER // KAI_01 履歷檔案"
        headerIcon="badge"
        headerBg="bg-secondary-container text-on-secondary-container"
        maxWidth="max-w-2xl"
      >
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-surface-container p-space-md border-2 border-black">
            <div>
              <div className="font-headline-sm text-headline-sm text-on-surface">
                KAI (カイ) — 資深 3D 角色與賽博機械美術師
              </div>
              <div className="font-label-sm text-label-sm text-secondary mt-0.5">
                7+ YEARS EXP // TOKYO &amp; TAIPEI // CEL-SHADING SPECIALIST
              </div>
            </div>
            <span className="bg-tertiary text-on-tertiary px-space-sm py-1 font-label-sm text-label-sm border border-black">
              SSR RANK
            </span>
          </div>

          <div className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
            <div className="bg-surface-container-low p-space-sm border border-black">
              <div className="font-label-sm text-label-sm text-primary mb-1">
                // 2022 - PRESENT : LEAD 3D CHARACTER &amp; SHADER ARTIST @ NEO-TOKYO STUDIO
              </div>
              <p>
                主導次世代動漫風動作遊戲角色管線，開發自訂 HLSL 多重色階 Toon Shader 與逆向法線外描邊系統，降低 35% 行動端 GPU 渲染負載。
              </p>
            </div>
            <div className="bg-surface-container-low p-space-sm border border-black">
              <div className="font-label-sm text-label-sm text-secondary mb-1">
                // 2019 - 2022 : SENIOR HARD-SURFACE &amp; MECHA MODELER @ CYBER CORE LAB
              </div>
              <p>
                負責大型機甲、浮游武裝與賽博場景資產製作，交付超過 32 件商業級遊戲與動畫專案。
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-space-sm pt-2">
            <button
              type="button"
              onClick={() => setResumeOpen(false)}
              className="px-space-md py-space-xs bg-surface-container text-on-surface border-2 border-black font-label-sm text-label-sm"
            >
              關閉視窗 (CLOSE)
            </button>
            <a
              href="#quest"
              onClick={() => setResumeOpen(false)}
              className="px-space-md py-space-xs bg-primary-container text-on-primary border-2 border-black font-label-sm text-label-sm shadow-manga-sm"
            >
              立即發送委託 (HIRE PILOT)
            </a>
          </div>
        </div>
      </Modal>
    </section>
  );
}
