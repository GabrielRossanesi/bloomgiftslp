"use client";

import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type MouseParallaxOptions = {
  damping?: number;
  stiffness?: number;
};

const desktopPointerQuery = "(hover: hover) and (pointer: fine) and (min-width: 768px)";

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

export function useMouseParallax({ damping = 26, stiffness = 58 }: MouseParallaxOptions = {}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping, stiffness, mass: 0.42 });
  const y = useSpring(rawY, { damping, stiffness, mass: 0.42 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const media = window.matchMedia(desktopPointerQuery);
    let frame = 0;

    const syncEnabled = () => {
      if (!media.matches) {
        rawX.set(0);
        rawY.set(0);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!media.matches) {
        return;
      }

      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        rawX.set(clamp((event.clientX / window.innerWidth - 0.5) * 2));
        rawY.set(clamp((event.clientY / window.innerHeight - 0.5) * 2));
        frame = 0;
      });
    };

    const reset = () => {
      rawX.set(0);
      rawY.set(0);
    };

    syncEnabled();
    media.addEventListener("change", syncEnabled);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      media.removeEventListener("change", syncEnabled);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, [rawX, rawY, reducedMotion]);

  return { x, y };
}
