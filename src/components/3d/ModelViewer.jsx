import React, { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import CanvasContainer from './CanvasContainer';
import { caseStudyData } from '../../data/projects';

function ProceduralProjectMesh({ modelType = 'kunoichi', shadingMode = 'pbr', rotationStep = 0 }) {
  const groupRef = useRef();

  const material = useMemo(() => {
    if (shadingMode === 'wireframe') {
      return new THREE.MeshBasicMaterial({
        color: 0x00eefc,
        wireframe: true,
      });
    }
    if (shadingMode === 'normal') {
      return new THREE.MeshNormalMaterial({
        flatShading: false,
      });
    }
    const colorMap = {
      kunoichi: 0xff4a8e,
      mecha: 0xfde400,
      env: 0x00eefc,
      valkyrie: 0xffb1c5,
      blade: 0xdec800,
      room: 0x7df4ff,
    };
    return new THREE.MeshToonMaterial({
      color: colorMap[modelType] || 0xff4a8e,
      emissive: 0x181028,
    });
  }, [modelType, shadingMode]);

  const outlineMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.BackSide,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        clock.getElapsedTime() * 0.45 + THREE.MathUtils.degToRad(rotationStep);
    }
  });

  return (
    <group ref={groupRef}>
      {modelType === 'mecha' || modelType === 'blade' ? (
        <>
          <mesh material={material}>
            <octahedronGeometry args={[1.35, 1]} />
            {shadingMode === 'pbr' && (
              <mesh material={outlineMat} scale={[1.05, 1.05, 1.05]}>
                <octahedronGeometry args={[1.35, 1]} />
              </mesh>
            )}
          </mesh>
          <mesh material={material} rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[2.0, 0.1, 12, 36]} />
          </mesh>
        </>
      ) : modelType === 'env' || modelType === 'room' ? (
        <>
          <mesh material={material} position={[0, -0.2, 0]}>
            <boxGeometry args={[1.8, 1.4, 1.8]} />
            {shadingMode === 'pbr' && (
              <mesh material={outlineMat} scale={[1.04, 1.04, 1.04]}>
                <boxGeometry args={[1.8, 1.4, 1.8]} />
              </mesh>
            )}
          </mesh>
          <mesh material={material} position={[0, 1.0, 0]}>
            <coneGeometry args={[1.45, 0.9, 4]} />
          </mesh>
        </>
      ) : (
        <>
          <mesh material={material}>
            <torusKnotGeometry args={[1.0, 0.32, 96, 16]} />
            {shadingMode === 'pbr' && (
              <mesh material={outlineMat} scale={[1.05, 1.05, 1.05]}>
                <torusKnotGeometry args={[1.0, 0.32, 96, 16]} />
              </mesh>
            )}
          </mesh>
          <mesh material={material} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
            <torusGeometry args={[1.95, 0.06, 8, 32]} />
          </mesh>
        </>
      )}
    </group>
  );
}

export default function ModelViewer({ project, onDownloadSpec, onOpenModal }) {
  const [shadingMode, setShadingMode] = useState('pbr');
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [renderEngine, setRenderEngine] = useState('hybrid'); // 'hybrid' | 'webgl'

  const activeModeLabel = {
    pbr: 'ACTIVE: PBR FINAL COMPOSITE',
    wireframe: 'ACTIVE: TOPOLOGY WIREFRAME',
    normal: 'ACTIVE: WORLD NORMAL / MATCAP',
  }[shadingMode];

  const imageFilterStyle = {
    pbr: 'contrast(125%) saturate(110%)',
    wireframe: 'grayscale(100%) invert(20%) brightness(1.2) contrast(180%)',
    normal: 'hue-rotate(180deg) saturate(200%) contrast(140%)',
  }[shadingMode];

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 1.8));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.7));
  const handleRotateLeft = () => setRotation((r) => r - 15);
  const handleRotateRight = () => setRotation((r) => r + 15);
  const handleResetCam = () => {
    setZoom(1.0);
    setRotation(0);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
      {/* Telemetry Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-surface-container-low border-2 border-black p-space-md shadow-[4px_4px_0_#000000] gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 bg-secondary-container text-on-secondary-container border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000000]">
            <span className="material-symbols-outlined text-[24px]">view_in_ar</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-tertiary text-on-tertiary font-label-sm text-label-sm px-1.5 py-0.5 border border-black">
                LIVE_ENGINE_PREVIEW
              </span>
              <h2
                className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight"
                id="inspectorTitle"
              >
                {project.fullTitle}
              </h2>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              // REAL-TIME WEBGL VIEWPORT &amp; MATERIAL DEBUGGER
            </p>
          </div>
        </div>

        {/* Shading Mode Switchers */}
        <div className="flex flex-wrap items-center gap-space-xs">
          <button
            type="button"
            onClick={() => setShadingMode('pbr')}
            className={`font-label-sm text-label-sm px-space-md py-2 border-2 border-black shadow-[3px_3px_0_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1 ${
              shadingMode === 'pbr'
                ? 'bg-primary-container text-on-primary'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">palette</span>
            <span>PBR 最終渲染 (Final)</span>
          </button>

          <button
            type="button"
            onClick={() => setShadingMode('wireframe')}
            className={`font-label-sm text-label-sm px-space-md py-2 border-2 border-black shadow-[3px_3px_0_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1 ${
              shadingMode === 'wireframe'
                ? 'bg-primary-container text-on-primary'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">grid_4x4</span>
            <span>線框模式 (Wireframe)</span>
          </button>

          <button
            type="button"
            onClick={() => setShadingMode('normal')}
            className={`font-label-sm text-label-sm px-space-md py-2 border-2 border-black shadow-[3px_3px_0_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1 ${
              shadingMode === 'normal'
                ? 'bg-primary-container text-on-primary'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">texture</span>
            <span>法線/白模 (Matcap)</span>
          </button>
        </div>
      </div>

      {/* Main Viewer Screen & Controller Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-space-lg">
        {/* Viewer Viewport Canvas (Col 1-3) */}
        <div className="lg:col-span-3 bg-surface-container-lowest border-2 border-black relative aspect-[16/10] overflow-hidden shadow-[6px_6px_0_#000000] flex flex-col justify-between p-space-md">
          {/* Crosshair and HUD Reticles */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-secondary pointer-events-none z-20" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-secondary pointer-events-none z-20" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-secondary pointer-events-none z-20" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-secondary pointer-events-none z-20" />

          {/* Viewport Layer: Hybrid Turnaround + Interactive 3D WebGL Mesh */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {renderEngine === 'webgl' ? (
              <div
                className="w-full h-full transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              >
                <CanvasContainer cameraPosition={[0, 0.5, 4.5]}>
                  <OrbitControls enableZoom={true} enablePan={true} />
                  <ProceduralProjectMesh
                    modelType={project.modelType}
                    shadingMode={shadingMode}
                    rotationStep={rotation}
                  />
                </CanvasContainer>
              </div>
            ) : (
              <div
                className="w-full h-full flex items-center justify-center p-space-lg transition-all duration-300"
                style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
              >
                <img
                  src={project.id === 'item-001' ? caseStudyData.viewerTurnaroundImage : project.image}
                  alt={project.fullTitle}
                  className="w-full h-full object-contain transition-all duration-300"
                  style={{ filter: imageFilterStyle }}
                />
                {/* Overlay Wireframe Grid lines */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-300 halftone-grid ${
                    shadingMode === 'wireframe' ? 'opacity-40' : 'opacity-0'
                  }`}
                />
              </div>
            )}
          </div>

          {/* Top Overlay HUD Status */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
            <div className="bg-surface-container-lowest/90 border border-black px-space-sm py-1 shadow-[2px_2px_0_#000000]">
              <span className="font-label-sm text-label-sm text-tertiary-fixed">
                CAM: 50MM ORTHO // FPS: 60.0 STABLE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRenderEngine(renderEngine === 'hybrid' ? 'webgl' : 'hybrid')}
                className="bg-surface-container-high hover:bg-secondary-container hover:text-on-secondary-container text-secondary font-label-sm text-label-sm px-2 py-0.5 border border-black shadow-[2px_2px_0_#000000] transition-colors"
              >
                {renderEngine === 'webgl' ? 'SWITCH: TURNAROUND SHEET' : 'SWITCH: LIVE 3D MESH'}
              </button>
              {onOpenModal && (
                <button
                  type="button"
                  onClick={() => onOpenModal(project)}
                  className="bg-primary-container text-on-primary font-label-sm text-label-sm px-2 py-0.5 border border-black shadow-[2px_2px_0_#000000] hover:brightness-110"
                >
                  FULLSCREEN 彈窗檢視
                </button>
              )}
            </div>
          </div>

          {/* Interactive Viewport Gizmo Controls */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-space-sm pointer-events-auto">
            <div className="flex items-center gap-space-xs bg-surface-container-lowest/95 border-2 border-black p-1 shadow-[3px_3px_0_#000000]">
              <button
                type="button"
                onClick={handleRotateLeft}
                title="Rotate Left"
                className="p-1 hover:bg-surface-container text-on-surface active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">rotate_left</span>
              </button>
              <button
                type="button"
                onClick={handleRotateRight}
                title="Rotate Right"
                className="p-1 hover:bg-surface-container text-on-surface active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">rotate_right</span>
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-1 hover:bg-surface-container text-on-surface active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-1 hover:bg-surface-container text-on-surface active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_out</span>
              </button>
              <button
                type="button"
                onClick={handleResetCam}
                className="px-2 py-0.5 font-label-sm text-label-sm bg-surface-container-high text-on-surface hover:bg-tertiary hover:text-on-tertiary transition-colors border border-black"
              >
                RESET CAM
              </button>
            </div>

            {/* Current Mode Indicator Label */}
            <div className="bg-surface-container-lowest/90 border border-black px-space-sm py-1 shadow-[2px_2px_0_#000000] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary-container" />
              <span className="font-label-sm text-label-sm text-secondary-container uppercase">
                {activeModeLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry & Diagnostic Sidebar (Col 4) */}
        <div className="flex flex-col justify-between gap-space-md">
          {/* Detailed Polygon Telemetry Box */}
          <div className="bg-surface-container-low border-2 border-black p-space-md shadow-[4px_4px_0_#000000] flex flex-col gap-space-sm">
            <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-1">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                // POLYCOUNT TELEMETRY
              </span>
              <span className="material-symbols-outlined text-[16px] text-primary">query_stats</span>
            </div>
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">VERTICES:</span>
              <span className="font-bold text-on-surface">{project.verts}</span>
            </div>
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">FACES (TRIS):</span>
              <span className="font-bold text-on-surface">{project.faces}</span>
            </div>
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">DRAW CALLS:</span>
              <span className="font-bold text-tertiary-fixed">{project.drawCalls} CALLS</span>
            </div>
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">TEXTURE RESOLUTION:</span>
              <span className="font-bold text-secondary">{project.textureRes}</span>
            </div>
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">SHADOW CASTER:</span>
              <span className="font-bold text-on-surface">{project.shadowCaster}</span>
            </div>
          </div>

          {/* Real-time Shading Pipeline Diagnostic */}
          <div className="bg-surface-container-low border-2 border-black p-space-md shadow-[4px_4px_0_#000000] flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm text-secondary-container uppercase font-bold">
              // RENDER PARAMETERS
            </span>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface">
                  <span>OUTLINE WIDTH (外描邊):</span>
                  <span>{project.outlineWidth}</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest overflow-hidden border border-black">
                  <div
                    className="h-full bg-secondary-container transition-all duration-300"
                    style={{ width: project.outlinePct }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface">
                  <span>RAMP THRESHOLD (階調閾值):</span>
                  <span>{project.rampThreshold}</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest overflow-hidden border border-black">
                  <div
                    className="h-full bg-tertiary transition-all duration-300"
                    style={{ width: project.rampPct }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface">
                  <span>SPECULAR CUTOFF (高光裁切):</span>
                  <span>{project.specularCutoff}</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest overflow-hidden border border-black">
                  <div
                    className="h-full bg-primary-container transition-all duration-300"
                    style={{ width: project.specularPct }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Download Spec Sheet CTA */}
          <button
            type="button"
            onClick={() => onDownloadSpec && onDownloadSpec(project)}
            className="w-full bg-tertiary text-on-tertiary border-2 border-black py-space-sm font-label-sm text-label-sm shadow-[4px_4px_0_#000000] hover:bg-tertiary-fixed active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>下載 FBX/SPEC 規格書 (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
