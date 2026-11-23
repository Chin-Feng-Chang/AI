import { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

export function useModelLoader(simulatedDuration = 650) {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adaptiveDpr = Math.min(window.devicePixelRatio || 1, 1.5);
      setDpr(adaptiveDpr);
    }
  }, []);

  useEffect(() => {
    let start = null;
    let rafId;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(100, Math.round((elapsed / simulatedDuration) * 100));
      setSimulatedProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(step);
      } else {
        setIsReady(true);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [simulatedDuration]);

  const effectiveProgress = total > 0 ? Math.max(progress, simulatedProgress) : simulatedProgress;

  return {
    active: active || !isReady,
    progress: effectiveProgress,
    isReady: isReady && !active,
    errors,
    item,
    loaded,
    total,
    dpr,
  };
}
