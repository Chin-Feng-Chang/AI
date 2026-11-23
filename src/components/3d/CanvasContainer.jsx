import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import LoadingScreen from '../common/LoadingScreen';
import { useModelLoader } from '../../hooks/useModelLoader';

export default function CanvasContainer({
  children,
  cameraPosition = [0, 1.5, 6],
  fov = 45,
  className = 'w-full h-full',
  onCanvasClick,
}) {
  const { active, progress, dpr } = useModelLoader(500);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className={`${className} flex items-center justify-center bg-surface-container-lowest p-space-lg text-center`}>
        <div className="border-2 border-black bg-surface-container p-space-md shadow-[4px_4px_0_#000000]">
          <p className="font-label-md text-secondary">WEBGL FALLBACK MODE ACTIVE</p>
          <p className="font-body-sm text-on-surface-variant mt-1">
            Cel-Shaded 3D Engine running in 2D compatibility mode.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} onClick={onCanvasClick}>
      {active && (
        <div className="absolute inset-0 z-20">
          <LoadingScreen progress={progress} />
        </div>
      )}
      <Suspense fallback={<LoadingScreen progress={progress} />}>
        <Canvas
          dpr={[1, dpr]}
          camera={{ position: cameraPosition, fov, near: 0.1, far: 1000 }}
          gl={{ alpha: true, antialias: true }}
        >
          {/* 3-Point Toon Lighting Setup */}
          <ambientLight color="#1a2035" intensity={1.6} />
          <directionalLight color="#00f0ff" intensity={2.5} position={[5, 8, 5]} />
          <directionalLight color="#ff2a85" intensity={3.5} position={[-6, -2, -4]} />
          <pointLight color="#ffe600" intensity={2.0} distance={12} position={[0, 3, 2]} />
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
