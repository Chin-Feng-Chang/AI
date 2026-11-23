import React from 'react';

export default function LoadingScreen({ progress = 100, label = 'INITIALIZING CEL-SHADER PIPELINE...' }) {
  return (
    <div className="w-full h-full min-h-[260px] bg-surface-container-lowest border-2 border-black p-space-lg flex flex-col items-center justify-center gap-space-md relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 halftone-cyan pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-space-xs w-full max-w-xs">
        <div className="flex items-center justify-between w-full font-label-sm text-label-sm">
          <span className="text-secondary-container flex items-center gap-1">
            <span className="w-2 h-2 bg-secondary-container animate-ping inline-block" />
            SYS.LOAD // WEBGL 2.0
          </span>
          <span className="text-tertiary font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-surface-container-high border-2 border-black p-0.5 shadow-[2px_2px_0px_#000000]">
          <div
            className="h-full bg-primary-container transition-all duration-150"
            style={{ width: `${Math.min(100, Math.max(10, progress))}%` }}
          />
        </div>
        <div className="font-label-sm text-label-sm text-on-surface-variant tracking-widest text-center mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}
