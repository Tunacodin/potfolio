import { useEffect } from "react";
import type { MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** Shared media conditions for gsap.matchMedia. */
export const MQ = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
};

let lenis: Lenis | null = null;

/** Smooth scroll driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);
}

export function scrollToId(id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(id === "top" ? 0 : el, { offset: id === "top" ? 0 : -64, duration: 1.4 });
  } else {
    const y = id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

/** Click handler for in-page anchors (`href="#id"`). */
export function onAnchor(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href");
  if (!href?.startsWith("#")) return;
  e.preventDefault();
  scrollToId(href.slice(1) || "top");
}

/** Scroll to an absolute page offset (used to step pinned timelines). `immediate` jumps without easing. */
export function scrollToY(y: number, { immediate = false, duration = 1.1 }: { immediate?: boolean; duration?: number } = {}) {
  if (lenis) lenis.scrollTo(y, immediate ? { immediate: true, force: true } : { duration, force: true });
  else window.scrollTo({ top: y, behavior: immediate ? "instant" : "smooth" });
}
