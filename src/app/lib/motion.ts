import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
  type Transition,
} from "motion/react";

/* ────── Spring presets ────── */
export const springs = {
  smooth:  { type: "spring", stiffness: 140, damping: 22, mass: 0.9 } as Transition,
  snappy:  { type: "spring", stiffness: 320, damping: 26, mass: 0.6 } as Transition,
  gentle:  { type: "spring", stiffness: 90,  damping: 18, mass: 1.0 } as Transition,
  bounce:  { type: "spring", stiffness: 260, damping: 14, mass: 0.8 } as Transition,
};

/* ────── Eases ────── */
export const EASE_OUT_QUART = [0.165, 0.84, 0.44, 1] as const;
export const EASE_OUT_EXPO  = [0.19, 1, 0.22, 1] as const;
export const EASE_SMOOTH    = [0.22, 1, 0.36, 1] as const;

/* ────── Stagger variants ────── */
export const staggerContainer = (delay = 0, stagger = 0.06) => ({
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: delay, staggerChildren: stagger },
  },
});

export const fadeUp = (distance = 10) => ({
  hidden:  { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_QUART as any } },
});

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_OUT_QUART as any } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE_OUT_QUART as any } },
};

/* ────── Magnetic hover hook ────── */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, x, y]);

  return { ref: ref as any, x: sx, y: sy };
}

/* ────── Count-up hook (animate number when in view) ────── */
export function useCountUp(end: number, duration = 1.6) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration,
      ease: EASE_OUT_EXPO as any,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, end, duration]);

  return { ref, val };
}

/* ────── Spotlight handler — updates CSS vars on mousemove ────── */
export function useSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current ?? (e.currentTarget as HTMLDivElement);
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };
  return { ref, onMouseMove };
}

/* ────── Parallax helper using scroll progress ────── */
export function useParallax(value: any, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
