import React, { useState } from 'react';
import { characterProfile, radarSkills, inventorySlots } from '../../data/skills';

export default function AboutSection() {
  const [avatarMode, setAvatarMode] = useState('2d');
  const [selectedTool, setSelectedTool] = useState(inventorySlots[0]);

  const getBadgeStyle = (colorType) => {
    if (colorType === 'primary-container') return 'bg-primary-container text-on-primary';
    if (colorType === 'tertiary') return 'bg-tertiary text-on-tertiary';
    return 'bg-secondary-container text-on-secondary';
  };

  return (
    <div id="status" className="flex flex-col w-full">
      {/* HUD Top Banner Data Strip */}
      <section className="w-full px-gutter py-space-md bg-surface-container-lowest border-y-2 border-black">
        <div className="flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-sm">
            <span className="px-space-xs py-0.5 bg-primary-container text-on-primary border border-black font-label-sm text-label-sm uppercase">
              SYS_LOG // 0x7E3
            </span>
            <span className="font-label-sm text-label-sm text-secondary tracking-widest">
              UNIT: KAI_PROTOTYPE_01
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              // STATUS: SYNCHRONIZED [99.8%]
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-space-md">
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm">
              <span className="text-tertiary">SERVER:</span>
              <span className="text-on-surface">NEO-TOKYO-GRID#09</span>
            </div>
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm">
              <span className="text-primary">LATENCY:</span>
              <span className="text-on-surface">1.2ms</span>
            </div>
            <div className="px-space-xs py-0.5 bg-surface-container-high border border-black text-secondary-container font-label-sm text-label-sm">
              ENCRYPT: ON
            </div>
          </div>
        </div>
      </section>

      {/* Master Status Viewport Grid */}
      <section className="w-full px-gutter py-space-xl">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
          {/* Left Column: Character Profile, Dialogue & Avatar Flip (xl:col-span-5) */}
          <div className="xl:col-span-5 flex flex-col gap-space-lg">
            {/* Comic Speech Dialogue Card */}
            <div className="relative bg-surface-container-low border-2 border-black p-space-lg shadow-manga-lg">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-xs py-0.5 bg-secondary-container text-on-secondary border border-black font-label-sm text-label-sm">
                    DIALOGUE_BOX
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary font-bold tracking-wider">
                    // CH.03 PILOT VOICE
                  </span>
                </div>
                <span className="material-symbols-outlined text-secondary-container text-sm">
                  record_voice_over
                </span>
              </div>

              {/* Stylized Manga Speech Box */}
              <div className="relative mt-space-xs bg-surface-container-lowest border-2 border-black p-space-md shadow-manga-sm">
                <div className="flex items-start gap-space-sm">
                  <span className="font-display-hero text-headline-lg text-primary-container leading-none select-none">
                    「
                  </span>
                  <p className="font-body-lg text-body-lg text-on-surface leading-relaxed pt-1">
                    {characterProfile.pilotVoice}
                  </p>
                  <span className="font-display-hero text-headline-lg text-primary-container leading-none self-end select-none">
                    」
                  </span>
                </div>
                <div className="mt-space-sm pt-space-xs border-t border-surface-container-high flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span>{characterProfile.voiceFreq}</span>
                  <span className="text-tertiary">{characterProfile.translation}</span>
                </div>
              </div>
            </div>

            {/* Avatar Card with 2D / 3D Mode Switcher */}
            <div className="relative bg-surface-container border-2 border-black shadow-manga-lg p-space-lg flex flex-col">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="w-3 h-3 bg-primary-container border border-black inline-block" />
                  <span className="font-headline-sm text-headline-sm text-on-surface tracking-wider">
                    {characterProfile.unitName}
                  </span>
                </div>

                {/* Mode Switcher Buttons */}
                <div className="flex items-center bg-surface-container-lowest border-2 border-black p-1 shadow-manga-sm">
                  <button
                    type="button"
                    onClick={() => setAvatarMode('2d')}
                    className={`px-space-sm py-1 font-label-sm text-label-sm transition-all ${
                      avatarMode === '2d'
                        ? 'bg-primary-container text-on-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    2D CEL
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarMode('3d')}
                    className={`px-space-sm py-1 font-label-sm text-label-sm transition-all ${
                      avatarMode === '3d'
                        ? 'bg-tertiary text-on-tertiary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    3D MESH
                  </button>
                </div>
              </div>

              {/* Avatar Image Display Box */}
              <div
                onClick={() => setAvatarMode(avatarMode === '2d' ? '3d' : '2d')}
                title="點擊切換 2D / 3D 頭像模式"
                className="relative w-full h-80 bg-surface-container-lowest border-2 border-black overflow-hidden shadow-manga cursor-pointer group"
              >
                {/* 2D Anime Avatar Plane */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
                    avatarMode === '2d' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={characterProfile.avatar2d}
                    alt="Anime cyberpunk character portrait of Kai"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 px-space-xs py-0.5 bg-surface-container-high border border-black text-secondary font-label-sm text-label-sm">
                    PORTRAIT: ORIGINAL_INK_VER
                  </div>
                </div>

                {/* 3D Mesh Wireframe Avatar Plane */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
                    avatarMode === '3d' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={characterProfile.avatar3d}
                    alt="High poly 3D topology wireframe of Kai"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 px-space-xs py-0.5 bg-surface-container-high border border-black text-tertiary font-label-sm text-label-sm">
                    RENDER: SUBDIVISION_LV3_WIRE
                  </div>
                </div>

                {/* Floating Stamp Badge */}
                <div className="absolute top-3 right-3 px-space-xs py-1 bg-tertiary text-on-tertiary border-2 border-black font-label-sm text-label-sm shadow-manga-sm">
                  {characterProfile.rankBadge}
                </div>
              </div>

              {/* Character Vital Gauges & Titles */}
              <div className="mt-space-md flex flex-col gap-space-sm">
                {/* HP Gauge */}
                <div>
                  <div className="flex items-center justify-between font-label-sm text-label-sm mb-1">
                    <span className="text-primary-container font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">favorite</span> HP (CREATIVE VITALITY)
                    </span>
                    <span className="text-on-surface">100 / 100 [MAX]</span>
                  </div>
                  <div className="w-full h-3 bg-surface-container-lowest border border-black p-0.5 flex gap-0.5">
                    <div className="h-full w-1/4 bg-primary-container" />
                    <div className="h-full w-1/4 bg-primary-container" />
                    <div className="h-full w-1/4 bg-primary-container" />
                    <div className="h-full w-1/4 bg-primary-container" />
                  </div>
                </div>

                {/* MP Gauge */}
                <div>
                  <div className="flex items-center justify-between font-label-sm text-label-sm mb-1">
                    <span className="text-secondary-container font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">bolt</span> MP (TECHNICAL MANA)
                    </span>
                    <span className="text-on-surface">999 / 999 [MAX]</span>
                  </div>
                  <div className="w-full h-3 bg-surface-container-lowest border border-black p-0.5 flex gap-0.5">
                    <div className="h-full w-1/4 bg-secondary-container" />
                    <div className="h-full w-1/4 bg-secondary-container" />
                    <div className="h-full w-1/4 bg-secondary-container" />
                    <div className="h-full w-1/4 bg-secondary-container" />
                  </div>
                </div>

                {/* Titles & Badges */}
                <div className="mt-space-xs pt-space-xs flex flex-wrap gap-space-xs">
                  {characterProfile.badges.map((badge) => (
                    <span
                      key={badge.label}
                      className={`px-space-sm py-1 bg-surface-container-high border border-black ${badge.color} font-label-sm text-label-sm shadow-manga-sm flex items-center gap-1`}
                    >
                      <span className="material-symbols-outlined text-xs">{badge.icon}</span>{' '}
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Radar Chart + Tool Inventory Board (xl:col-span-7) */}
          <div className="xl:col-span-7 flex flex-col gap-space-lg">
            {/* Hexagon Radar Chart Section */}
            <div className="bg-surface-container-low border-2 border-black p-space-lg shadow-manga-lg">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-xs py-0.5 bg-tertiary text-on-tertiary border border-black font-label-sm text-label-sm">
                    RADAR_STATS
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-wide">
                    能力數值六角雷達圖 // METRICS
                  </h2>
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping" />
                  LIVE_ANALYSIS
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
                {/* SVG Hexagon Radar Display (md:col-span-7) */}
                <div className="md:col-span-7 relative flex items-center justify-center p-space-sm bg-surface-container-lowest border-2 border-black shadow-manga">
                  <svg
                    className="w-full max-w-[320px] aspect-square overflow-visible"
                    viewBox="0 0 360 360"
                  >
                    {/* Level 1 (20%) */}
                    <polygon
                      className="text-surface-bright"
                      fill="none"
                      points="180,144 211,162 211,198 180,216 149,198 149,162"
                      stroke="currentColor"
                      strokeDasharray="2,2"
                      strokeWidth="1"
                    />
                    {/* Level 2 (40%) */}
                    <polygon
                      className="text-surface-bright"
                      fill="none"
                      points="180,108 242,144 242,216 180,252 118,216 118,144"
                      stroke="currentColor"
                      strokeDasharray="2,2"
                      strokeWidth="1"
                    />
                    {/* Level 3 (60%) */}
                    <polygon
                      className="text-surface-bright"
                      fill="none"
                      points="180,72 274,126 274,234 180,288 86,234 86,126"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    {/* Level 4 (80%) */}
                    <polygon
                      className="text-surface-bright"
                      fill="none"
                      points="180,36 305,108 305,252 180,324 55,252 55,108"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    {/* Level 5 (100% outer rim) */}
                    <polygon
                      className="text-outline-variant"
                      fill="none"
                      points="180,10 327,95 327,265 180,350 33,265 33,95"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    {/* Axis Lines */}
                    <line className="text-surface-bright" stroke="currentColor" strokeWidth="1" x1="180" x2="180" y1="180" y2="10" />
                    <line className="text-surface-bright" stroke="currentColor" strokeWidth="1" x1="180" x2="327" y1="180" y2="95" />
                    <line className="text-surface-bright" stroke="currentColor" strokeWidth="1" x1="180" x2="327" y1="180" y2="265" />
                    <line className="text-surface-bright" stroke="currentColor" strokeWidth="1" x1="180" x2="180" y1="180" y2="350" />
                    <line className="text-surface-bright" stroke="currentColor" strokeWidth="1" x1="180" x2="33" y1="180" y2="265" />
                    <line className="text-surface-bright" stroke="currentColor" strokeWidth="1" x1="180" x2="33" y1="180" y2="95" />

                    {/* Dynamic Data Polygon Area (95, 98, 92, 88, 90, 86) */}
                    <polygon
                      fill="rgba(0, 238, 252, 0.25)"
                      points="180,18.5 304,108 297,247 180,329.6 65,246 70,116"
                      stroke="#00eefc"
                      strokeWidth="2.5"
                    />
                    {/* Inner Neon Contrast Core */}
                    <polygon
                      fill="rgba(255, 74, 142, 0.2)"
                      points="180,48 270,122 260,225 180,285 95,225 100,130"
                      stroke="#ff4a8e"
                      strokeDasharray="4,2"
                      strokeWidth="1.5"
                    />

                    {/* Data Vertex Nodes */}
                    <circle cx="180" cy="18.5" fill="#dec800" r="4.5" stroke="#000000" strokeWidth="1.5" />
                    <circle cx="304" cy="108" fill="#00eefc" r="4.5" stroke="#000000" strokeWidth="1.5" />
                    <circle cx="297" cy="247" fill="#ff4a8e" r="4.5" stroke="#000000" strokeWidth="1.5" />
                    <circle cx="180" cy="329.6" fill="#00eefc" r="4.5" stroke="#000000" strokeWidth="1.5" />
                    <circle cx="65" cy="246" fill="#dec800" r="4.5" stroke="#000000" strokeWidth="1.5" />
                    <circle cx="70" cy="116" fill="#ff4a8e" r="4.5" stroke="#000000" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Stats List / Legend with Progress Bars (md:col-span-5) */}
                <div className="md:col-span-5 flex flex-col gap-space-xs font-label-sm text-label-sm">
                  {radarSkills.map((stat) => (
                    <div
                      key={stat.id}
                      className="bg-surface-container border border-black p-space-xs shadow-manga-sm"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={stat.textColor}>{stat.label}</span>
                        <span className="text-on-surface font-bold">{stat.value}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-lowest">
                        <div
                          className={`h-full ${stat.barColor}`}
                          style={{ width: `${stat.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tool Inventory Grid (遊戲背包裝備欄 3x4 layout) */}
            <div className="bg-surface-container-low border-2 border-black p-space-lg shadow-manga-lg flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-xs py-0.5 bg-primary-container text-on-primary border border-black font-label-sm text-label-sm">
                    EQUIPMENT
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-wide">
                    道具背包 // TOOL INVENTORY
                  </h2>
                </div>
                <div className="flex items-center gap-space-sm font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">SLOTS: 6/12 LOADED</span>
                  <span className="px-space-xs py-0.5 bg-surface-container-high border border-black text-tertiary font-bold">
                    LOAD: 50%
                  </span>
                </div>
              </div>

              {/* Master Inventory 3x4 Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-space-sm">
                {inventorySlots.map((item) => {
                  if (!item.equipped) {
                    return (
                      <div
                        key={item.slot}
                        className="relative bg-surface-container-lowest border border-black p-space-sm shadow-sm flex flex-col items-center justify-center min-h-[140px] opacity-40"
                      >
                        <span className="font-label-sm text-label-sm text-outline mb-1">
                          SLOT {item.slot}
                        </span>
                        <span className="material-symbols-outlined text-outline text-xl">lock</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                          [EMPTY]
                        </span>
                      </div>
                    );
                  }

                  const isActive = selectedTool.slot === item.slot;
                  return (
                    <div
                      key={item.slot}
                      onMouseEnter={() => setSelectedTool(item)}
                      onClick={() => setSelectedTool(item)}
                      className={`relative bg-surface-container border-2 ${
                        isActive ? 'border-secondary-container' : 'border-black'
                      } p-space-sm shadow-manga-sm hover:bg-surface-container-high transition-all cursor-pointer group`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-space-xs py-0.5 ${item.rarityBadgeClass} font-label-sm text-label-sm font-bold`}
                        >
                          {item.rarity}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                          {item.slot}
                        </span>
                      </div>
                      <div className="w-full h-20 bg-surface-container-lowest border border-black flex flex-col items-center justify-center p-2 text-center group-hover:scale-95 transition-transform">
                        <span className={`material-symbols-outlined ${item.iconColor} text-2xl mb-1`}>
                          {item.icon}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface text-xs font-bold leading-tight">
                          {item.shortName}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                        <span>{item.level}</span>
                        <span className={item.masteryColor}>{item.mastery}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Master Tooltip / Equipped Skill Detail Box */}
              <div
                id="inventory-tooltip-panel"
                className="mt-space-md p-space-md bg-surface-container-lowest border-2 border-black shadow-manga flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm transition-all"
              >
                <div className="flex items-center gap-space-sm">
                  <div
                    className={`px-space-sm py-1 border border-black font-label-sm text-label-sm uppercase ${getBadgeStyle(
                      selectedTool.colorType
                    )}`}
                  >
                    {selectedTool.rarity}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      {selectedTool.name} // SELECTED ITEM
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      {selectedTool.description}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm">
                  <span className="text-tertiary">EQUIP STATUS:</span>
                  <span className="text-secondary-container">ACTIVE / READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
