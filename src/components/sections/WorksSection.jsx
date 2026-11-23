import React, { useState, useRef } from 'react';
import { categories, projects, caseStudyData } from '../../data/projects';
import ModelViewer from '../3d/ModelViewer';
import Modal from '../common/Modal';

export default function WorksSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [modalProject, setModalProject] = useState(null);
  const [specToast, setSpecToast] = useState(null);
  const [sliderPct, setSliderPct] = useState(50);

  const inspectorRef = useRef(null);
  const comparisonRef = useRef(null);
  const isDraggingRef = useRef(false);

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const handleInspect = (project) => {
    setActiveProject(project);
    if (inspectorRef.current) {
      inspectorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadSpec = (project) => {
    setSpecToast(`已打包下載規格書：${project.fullTitle} [SPEC_V4.2.pdf]`);
    setTimeout(() => setSpecToast(null), 3500);
  };

  const updateSliderFromEvent = (clientX) => {
    if (!comparisonRef.current) return;
    const rect = comparisonRef.current.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;
    setSliderPct((offsetX / rect.width) * 100);
  };

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateSliderFromEvent(clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateSliderFromEvent(clientX);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div id="works" className="flex flex-col w-full">
      {/* Top Command & Status Ribbon */}
      <section className="w-full bg-surface-container-lowest border-y-2 border-black px-gutter py-space-md shadow-[0_4px_0_#000000] relative z-20">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          {/* Section Title & Japanese Indexing */}
          <div className="flex items-center gap-space-md">
            <div className="bg-primary-container border-2 border-black px-space-sm py-1 shadow-[3px_3px_0_#000000]">
              <span className="font-label-sm text-label-sm text-on-primary font-bold uppercase tracking-wider">
                SEC_02 // ARCHIVE
              </span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight flex flex-wrap items-center gap-space-xs">
                精選作品庫{' '}
                <span className="text-tertiary-fixed font-label-md text-label-md bg-surface-container border border-black px-2 py-0.5">
                  PROD. SPEC V4.2
                </span>
              </h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant tracking-widest">
                // MODELING, TEXTURING &amp; REAL-TIME CEL SHADERS
              </p>
            </div>
          </div>

          {/* Filter Controls: Anime Category Tabs */}
          <div className="flex flex-wrap items-center gap-space-xs">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-space-md py-1.5 font-label-sm text-label-sm border-2 border-black shadow-[3px_3px_0_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`bg-surface-container-lowest px-1.5 py-0.5 text-label-sm border border-black ${
                      isSelected ? 'text-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Showcase Manga Panel Grid */}
      <section className="w-full px-gutter py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card group relative bg-surface-container-low border-2 border-black p-space-md shadow-[6px_6px_0_#000000] flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[10px_10px_0_#000000]"
            >
              {/* Comic Sound Badge (Appears & Pops on Hover) */}
              <div className="absolute -top-4 -right-3 z-30 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-200">
                <div
                  className={`${project.sfxColor} border-2 border-black font-headline-sm text-headline-sm px-3 py-1 shadow-[4px_4px_0_#000000] transform select-none`}
                >
                  {project.sfx}
                </div>
              </div>

              <div>
                {/* Header Meta Strip */}
                <div className="flex items-center justify-between bg-surface-container-lowest border border-black p-space-xs mb-space-sm shadow-[2px_2px_0_#000000]">
                  <span className={`font-label-sm text-label-sm ${project.accentColor} tracking-wider`}>
                    {project.code}
                  </span>
                  <span className="bg-surface-bright text-on-surface font-label-sm text-label-sm px-1.5 py-0.5 border border-black">
                    {project.polys}
                  </span>
                </div>

                {/* Thumbnail with Manga Framing */}
                <div
                  onClick={() => handleInspect(project)}
                  className="relative overflow-hidden w-full aspect-square bg-surface-container-highest border-2 border-black shadow-[4px_4px_0_#000000] mb-space-md group-hover:brightness-105 transition-all cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent" />
                  {/* In-viewport HUD Elements */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-surface-container-lowest/90 border border-black px-2 py-1 shadow-[2px_2px_0_#000000]">
                    <span className={`w-2 h-2 rounded-full ${project.statusDotColor}`} />
                    <span className="font-label-sm text-label-sm text-on-surface">
                      {project.statusTag}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-surface-container-lowest/90 border border-black px-2 py-0.5 font-label-sm text-label-sm text-tertiary-fixed">
                    {project.shaderTag}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight mb-space-xs">
                  {project.title}{' '}
                  <span className={`block ${project.accentColor} font-label-md text-label-md`}>
                    {project.subtitle}
                  </span>
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">
                  {project.description}
                </p>
              </div>

              {/* Footer Data & Action Button */}
              <div className="bg-surface-container border-2 border-black p-space-sm flex items-center justify-between shadow-[2px_2px_0_#000000]">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {project.footerLabel}
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">
                    {project.footerValue}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleInspect(project)}
                  className={`${project.btnColor} border-2 border-black px-space-md py-1.5 font-label-sm text-label-sm shadow-[3px_3px_0_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1`}
                >
                  <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                  <span>檢視 3D</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Real-time 3D Model Viewer Inspector Drawer / Section */}
      <section
        ref={inspectorRef}
        className="w-full px-gutter py-space-xl bg-surface-container-lowest border-y-2 border-black shadow-[0_4px_0_#000000] relative"
      >
        {specToast && (
          <div className="max-w-7xl mx-auto mb-space-md bg-tertiary text-on-tertiary border-2 border-black px-space-md py-space-xs font-label-md text-label-md shadow-manga flex items-center justify-between">
            <span>{specToast}</span>
            <button type="button" onClick={() => setSpecToast(null)}>
              ✕
            </button>
          </div>
        )}
        <ModelViewer
          project={activeProject}
          onDownloadSpec={handleDownloadSpec}
          onOpenModal={(proj) => setModalProject(proj)}
        />
      </section>

      {/* Case Study Detail Section (案例研究深度解析) */}
      <section className="w-full px-gutter py-space-xl">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          {/* Section Manga Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b-2 border-black pb-space-md">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-primary text-on-primary border border-black font-label-sm text-label-sm px-2 py-0.5 shadow-[2px_2px_0_#000000]">
                  {caseStudyData.code}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {caseStudyData.tag}
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface uppercase tracking-tight">
                {caseStudyData.title}{' '}
                <span className="text-primary-container font-label-lg text-label-lg block md:inline">
                  {caseStudyData.subtitle}
                </span>
              </h2>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant max-w-sm">
              {caseStudyData.summary}
            </div>
          </div>

          {/* Tool Stack Badges with Comic Borders */}
          <div className="flex flex-wrap items-center gap-space-md">
            <span className="font-label-sm text-label-sm text-on-surface uppercase font-bold tracking-wider">
              // PIPELINE TOOLS:
            </span>
            {caseStudyData.tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-2 bg-surface-container-low border-2 border-black px-space-md py-1.5 shadow-[3px_3px_0_#000000]"
              >
                <span className={`w-2.5 h-2.5 ${tool.color} rotate-45`} />
                <span className="font-label-sm text-label-sm text-on-surface font-bold">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Before / After Split Screen Comparison */}
          <div className="relative bg-surface-container-lowest border-2 border-black p-space-md shadow-[8px_8px_0_#000000] overflow-hidden">
            {/* Header Info Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-space-md">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-label-md text-label-md text-tertiary-fixed font-bold">
                  FIG 1.1 COMPARISON
                </span>
                <span className="text-on-surface-variant font-label-sm text-label-sm">
                  // 2D 原畫 CONCEPT ART vs 3D CEL-SHADED RENDER
                </span>
              </div>
              <span className="font-label-sm text-label-sm bg-surface-container border border-black px-2 py-0.5 text-secondary">
                SLIDER ACTIVE ({Math.round(sliderPct)}%)
              </span>
            </div>

            {/* Interactive Comparison Container */}
            <div
              ref={comparisonRef}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              className="relative w-full aspect-[16/9] md:aspect-[21/9] select-none overflow-hidden cursor-ew-resize border-2 border-black shadow-[4px_4px_0_#000000]"
            >
              {/* Image Layer B: 3D Cel-Shaded Render (Background) */}
              <div className="absolute inset-0 w-full h-full bg-surface-container-high">
                <img
                  src={caseStudyData.afterImage}
                  alt="3D Cel-Shaded Render"
                  className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute bottom-4 right-4 bg-surface-container-lowest/90 border border-black px-3 py-1 font-label-sm text-label-sm text-secondary-container shadow-[2px_2px_0_#000000]">
                  [ AFTER: 3D CEL-SHADED RENDER ]
                </div>
              </div>

              {/* Image Layer A: 2D Concept Art (Clipped Foreground) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-4 border-primary bg-surface-container-lowest"
                style={{ width: `${sliderPct}%` }}
              >
                <img
                  src={caseStudyData.beforeImage}
                  alt="2D Concept Art"
                  className="h-full max-w-none object-cover pointer-events-none"
                  style={{
                    width: comparisonRef.current
                      ? `${comparisonRef.current.clientWidth}px`
                      : '100vw',
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 border border-black px-3 py-1 font-label-sm text-label-sm text-primary shadow-[2px_2px_0_#000000]">
                  [ BEFORE: 2D 原畫 CONCEPT ART ]
                </div>
              </div>

              {/* Drag Handle Bar Indicator */}
              <div
                className="absolute top-0 bottom-0 -ml-4 w-8 flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPct}%` }}
              >
                <div className="w-8 h-8 bg-primary text-on-primary border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000000] rotate-45">
                  <span className="material-symbols-outlined text-[16px] -rotate-45">code</span>
                </div>
              </div>
            </div>

            {/* Slider Instructions */}
            <div className="mt-space-sm flex flex-wrap items-center justify-between gap-2 font-label-sm text-label-sm text-on-surface-variant">
              <span>← 左右拖曳滑塊以檢視 2D 與 3D 的還原度對比 →</span>
              <span className="text-tertiary">ACCURACY: 99.4% SILHOUETTE MATCH</span>
            </div>
          </div>

          {/* Technical Highlight Cards (3-Column Bento) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {caseStudyData.techSpecs.map((spec) => (
              <div
                key={spec.id}
                className="bg-surface-container-low border-2 border-black p-space-lg shadow-[5px_5px_0_#000000] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform"
              >
                <div className="space-y-space-sm">
                  <div
                    className={`w-10 h-10 ${spec.iconBg} border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000000]`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{spec.icon}</span>
                  </div>
                  <div className={`font-label-sm text-label-sm ${spec.codeColor} font-bold tracking-widest`}>
                    // {spec.id}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    {spec.title}
                  </h3>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">
                    {spec.subtitle}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant pt-space-xs">
                    {spec.description}
                  </p>
                </div>
                <div className="mt-space-md pt-space-sm border-t-2 border-black flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">{spec.footerLabel}</span>
                  <span className={`${spec.footerColor} font-bold`}>{spec.footerValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen 3D Inspector Modal */}
      <Modal
        isOpen={Boolean(modalProject)}
        onClose={() => setModalProject(null)}
        title={modalProject ? `3D INSPECTOR // ${modalProject.fullTitle}` : '3D INSPECTOR'}
        headerIcon="view_in_ar"
        headerBg="bg-primary-container text-on-primary"
        maxWidth="max-w-5xl"
      >
        {modalProject && (
          <ModelViewer
            project={modalProject}
            onDownloadSpec={handleDownloadSpec}
          />
        )}
      </Modal>
    </div>
  );
}
