import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/context";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { gsap, MQ, ScrollTrigger, scrollToId, scrollToY, useGSAP } from "../lib/scroll";
import { DESKTOP, useMedia } from "../lib/useMedia";
import { useMagnet } from "../lib/useMagnet";
import { RevealText } from "./ui/RevealText";
import { Roll } from "./ui/Roll";

const N = projects.length;
const clamp = gsap.utils.clamp(-1, 1);
const clampI = gsap.utils.clamp(0, N - 1);
const pad = (n: number) => String(n).padStart(2, "0");

// Set by the mounted track so other sections (the hero) can open a product.
let jump: ((i: number) => void) | null = null;

/** Bring product `i` into view. */
export function scrollToProduct(i: number) {
  if (jump) jump(i);
  else scrollToId("work");
}

/*
 * A row of product cards. On desktop the section pins and scrolling moves the whole row
 * to the left; on phones (and with reduced motion) the row is a plain swipeable strip.
 * Every card is always whole: nothing is cut, stacked or faded over another card.
 */
export function Products() {
  const { t, pick } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const shown = useRef(0);
  const desk = useMedia(DESKTOP);

  const show = (i: number) => {
    if (i === shown.current) return;
    shown.current = i;
    setActive(i);
  };

  // Fit the device sets to the card size: one scale for every card.
  useLayoutEffect(() => {
    const el = root.current!;
    const panel = el.querySelector<HTMLElement>(".pc-panel")!;
    // The visible pieces fill less than the drawing box, so fit to their real extent.
    const [w, h] = desk ? [780, 450] : [CW, CH];
    const fit = () => {
      const s = Math.min(panel.clientWidth / (w + 48), panel.clientHeight / (h + 64));
      el.style.setProperty("--s", String(Math.round(s * 1000) / 1000));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(panel);
    return () => ro.disconnect();
  }, [desk]);

  useGSAP(
    () => {
      const el = root.current!;
      const track = el.querySelector<HTMLElement>(".pc-track")!;
      const bar = el.querySelector<HTMLElement>(".pc-bar")!;
      const cards = gsap.utils.toArray<HTMLElement>(".pc", el);
      const pars = gsap.utils.toArray<HTMLElement>(".pc-par", el);
      const gutter = () => parseFloat(getComputedStyle(el).getPropertyValue("--gutter")) || 24;

      const mm = gsap.matchMedia();
      // `free` always matches, so the callback also runs for phones and reduced motion.
      mm.add({ pin: MQ.desktop, motion: MQ.motion, free: "all" }, (ctx) => {
        const { pin, motion } = ctx.conditions as { pin: boolean; motion: boolean };

        if (motion) {
          gsap.from(el.querySelectorAll(".pc-panel"), {
            y: 70,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        }

        if (!pin) {
          // Native swipe strip: follow its scroll position.
          const offs = () => cards.map((c) => c.offsetLeft - cards[0].offsetLeft);
          const onScroll = () => {
            const max = track.scrollWidth - track.clientWidth;
            gsap.set(bar, { scaleX: max > 0 ? track.scrollLeft / max : 1 });
            const o = offs();
            let best = 0;
            o.forEach((x, i) => {
              if (Math.abs(x - track.scrollLeft) < Math.abs(o[best] - track.scrollLeft)) best = i;
            });
            show(track.scrollLeft >= max - 2 ? N - 1 : best);
          };
          onScroll();
          track.addEventListener("scroll", onScroll, { passive: true });
          jump = (i) => {
            const k = clampI(i);
            track.scrollTo({ left: offs()[k], behavior: motion ? "smooth" : "auto" });
            const r = el.getBoundingClientRect();
            if (r.top > window.innerHeight * 0.5 || r.bottom < window.innerHeight * 0.5) scrollToId("work");
          };
          return () => {
            track.removeEventListener("scroll", onScroll);
            jump = null;
          };
        }

        // Pinned row: vertical scroll distance equals the horizontal travel.
        let D = 0;
        let pts: number[] = [];
        const measure = () => {
          const last = cards[N - 1];
          D = Math.max(1, last.offsetLeft + last.offsetWidth + gutter() - el.clientWidth);
          pts = cards.map((c) => Math.min(c.offsetLeft - cards[0].offsetLeft, D));
        };
        measure();

        const setX = gsap.quickSetter(track, "x", "px");
        const parX = pars.map((p) => gsap.quickSetter(p, "x", "px"));
        const draw = (x: number) => {
          setX(-x);
          gsap.set(bar, { scaleX: x / D });
          const mid = el.clientWidth / 2;
          // The devices drift a little against the card, so the row reads as depth, not a slide.
          cards.forEach((c, i) => {
            const d = clamp((c.offsetLeft - x + c.offsetWidth / 2 - mid) / el.clientWidth);
            parX[i](d * -48);
          });
          let best = 0;
          pts.forEach((p, i) => {
            // Ties go to the later card: at the very end the last two can share a stop.
            if (Math.abs(p - x) <= Math.abs(pts[best] - x)) best = i;
          });
          show(best);
        };

        const r = { x: 0 };
        draw(0);
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: () => `+=${D}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
          animation: gsap.to(r, { x: () => D, ease: "none", onUpdate: () => draw(r.x) }),
        });
        jump = (i) => scrollToY(st.start + pts[clampI(i)], { duration: 1.2 });

        // Settle on the nearest card in the direction of travel once scrolling stops.
        const settle = () => {
          if (st.progress <= 0.001 || st.progress >= 0.999) return;
          const x = st.progress * D;
          const k = pts.findIndex((p, i) => i === N - 1 || (p <= x && x < pts[i + 1]));
          if (k < 0 || k >= N - 1) return;
          const f = (x - pts[k]) / (pts[k + 1] - pts[k] || 1);
          if (f < 0.01 || f > 0.99) return;
          const fwd = st.direction > 0 ? f > 0.2 : f > 0.8;
          scrollToY(st.start + pts[fwd ? k + 1 : k], { duration: 0.8 });
        };
        ScrollTrigger.addEventListener("scrollEnd", settle);

        // Sections above can still change height after mount (fonts, images), which would leave
        // the pin start stale, so measure again whenever the page height changes.
        let refresh: gsap.core.Tween | undefined;
        const ro = new ResizeObserver(() => {
          refresh?.kill();
          refresh = gsap.delayedCall(0.15, () => ScrollTrigger.refresh());
        });
        ro.observe(document.body);

        return () => {
          ScrollTrigger.removeEventListener("scrollEnd", settle);
          ro.disconnect();
          refresh?.kill();
          jump = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Warm every product image before the section arrives, so no card shows up empty.
  useEffect(() => {
    const el = root.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        projects.forEach((p) =>
          [p.mockup, p.mockupAngled, p.webShots?.[0]].forEach((src) => {
            if (!src) return;
            const img = new Image();
            img.src = src;
            img.decode?.().catch(() => {});
          }),
        );
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" className="pt-32 lg:pt-44">
      <RevealText text={pick(t.work.heading)} className="t-heading px-[var(--gutter)]" />
      <div
        ref={root}
        className="relative mt-10 lg:mt-14 lg:motion-safe:mt-6 lg:motion-safe:flex lg:motion-safe:h-[100svh] lg:motion-safe:flex-col lg:motion-safe:justify-center lg:motion-safe:overflow-hidden lg:motion-safe:pt-[var(--header-h)]"
      >
        <div className="flex items-center justify-between gap-6 px-[var(--gutter)]">
          <nav aria-label={pick(t.work.heading)} className="hidden flex-wrap gap-x-6 gap-y-2 lg:flex">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollToProduct(i)}
                aria-current={i === active ? "true" : undefined}
                className={`text-[14px] font-medium transition-colors ${i === active ? "text-ink" : "text-ink-3 hover:text-ink"}`}
              >
                {p.title}
              </button>
            ))}
          </nav>
          <p className="t-num shrink-0 text-[14px] font-medium text-ink-3" aria-live="polite">
            <span className="text-ink">{pad(active + 1)}</span> / {pad(N)}
          </p>
        </div>
        <div className="mx-[var(--gutter)] mt-3 h-px bg-line">
          <div className="pc-bar h-full origin-left scale-x-0 bg-ink" />
        </div>

        <div className="pc-track relative mt-6 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] lg:gap-6 lg:motion-safe:snap-none lg:motion-safe:overflow-visible lg:motion-safe:pb-0 [&::-webkit-scrollbar]:hidden">
          {projects.map((p, i) => (
            <Card key={p.id} p={p} i={i} compact={!desk} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Device sets are drawn at a fixed size and scaled to the card (`--s`). */
const BW = 840;
const BH = 520;
const CW = 460;
const CH = 470;

type Piece = { key: "web" | "flat" | "angled"; x: number; y: number; h: number };

function piecesOf(p: Project, compact: boolean): Piece[] {
  const items: Piece[] = [];
  const angled = !!p.mockupAngled;
  if (compact) {
    // Phones only: two devices read better than three on a narrow card.
    if (p.mockup) items.push(angled ? { key: "flat", h: 400, x: -82, y: -6 } : { key: "flat", h: 440, x: 0, y: 0 });
    if (angled) items.push({ key: "angled", h: 400, x: 92, y: 10 });
    if (!items.length && p.webShots?.length) items.push({ key: "web", h: 0, x: 0, y: 0 });
    return items;
  }
  if (p.webShots?.length) {
    items.push({ key: "web", h: 0, x: -132, y: 0 });
    if (p.mockup) items.push(angled ? { key: "flat", h: 300, x: 110, y: -30 } : { key: "flat", h: 380, x: 140, y: 10 });
    if (angled) items.push({ key: "angled", h: 360, x: 228, y: 14 });
    return items;
  }
  if (p.mockup) items.push(angled ? { key: "flat", h: 360, x: -120, y: -16 } : { key: "flat", h: 430, x: 0, y: 0 });
  if (angled) items.push({ key: "angled", h: 430, x: 70, y: 10 });
  return items;
}

function Scene({ p, compact }: { p: Project; compact: boolean }) {
  const [w, h] = compact ? [CW, CH] : [BW, BH];
  return (
    <div
      className="absolute left-1/2 top-1/2 flex items-center justify-center"
      style={{ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2, transform: "translateY(12px) scale(var(--s, 0.5))" }}
    >
      {piecesOf(p, compact).map((it) => (
        <div key={it.key} className="absolute" style={{ transform: `translate(${it.x}px, ${it.y}px)` }}>
          {it.key === "web" ? (
            <BrowserWindow src={p.webShots![0]} dark={p.mode === "dark"} width={410} />
          ) : (
            <img
              src={it.key === "flat" ? p.mockup : p.mockupAngled}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="block w-auto max-w-none select-none"
              style={{ height: it.h }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/** Desktop window in ink with grey toolbar dots, so colour comes only from the capture. */
function BrowserWindow({ src, dark, width }: { src: string; dark: boolean; width: number }) {
  const bar = Math.round(width * 0.058);
  const dot = Math.max(6, Math.round(width * 0.018));
  return (
    <div className="select-none" style={{ width, padding: 4, borderRadius: 16, background: "var(--ink)" }}>
      <div className="overflow-hidden" style={{ borderRadius: 12, background: dark ? "var(--ink)" : "var(--paper)" }}>
        <div className="flex items-center gap-2 px-3" style={{ height: bar, background: dark ? "#1a1a1d" : "var(--stone)" }}>
          {[0, 1, 2].map((k) => (
            <span
              key={k}
              className="rounded-full"
              style={{ width: dot, height: dot, background: dark ? "#3a3a3f" : "var(--line-strong)" }}
            />
          ))}
        </div>
        <img src={src} alt="" loading="lazy" decoding="async" draggable={false} className="block h-auto w-full" />
      </div>
    </div>
  );
}

function Card({ p, i, compact }: { p: Project; i: number; compact: boolean }) {
  const { t, pick } = useLang();
  const visit = useMagnet<HTMLAnchorElement>(0.2);
  const canVisit = !!p.href && p.href !== "#";

  return (
    <article
      id={p.id}
      className="pc w-[min(84vw,420px)] shrink-0 snap-start lg:w-[min(62vw,calc((100svh-360px)*1.615))]"
    >
      <div className="pc-panel relative aspect-[20/21] overflow-hidden rounded-[var(--r-lg)] bg-stone lg:aspect-[21/13]">
        <p className="absolute left-5 top-4 z-10 text-[14px] font-medium text-ink-2 lg:left-6 lg:top-5">
          <span className="t-num mr-3 text-ink">{pad(i + 1)}</span>
          {pick(p.kind)}
        </p>
        <div className="pc-par absolute inset-0" aria-hidden="true">
          <Scene p={p} compact={compact} />
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-[clamp(1.75rem,1rem+1.6vw,2.75rem)] font-semibold leading-none tracking-[-0.045em]">{p.title}</h3>
          <p className="mt-2 text-[17px] leading-[1.4] text-ink-2 lg:text-[18px]">{pick(p.tagline)}</p>
          <p className="mt-3 text-[14px] font-medium">
            {pick(p.role)}
            {p.status && (
              <>
                <span aria-hidden="true" className="mx-2 text-ink-3">
                  ·
                </span>
                {pick(p.status)}
              </>
            )}
          </p>
          {p.techStack.length > 0 && (
            <p className="mt-1 hidden text-[14px] text-ink-3 lg:block">{p.techStack.join(" · ")}</p>
          )}
        </div>
        {canVisit && (
          <a
            ref={visit}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            aria-label={pick(t.work.visit).replace("{title}", p.title)}
            className="btn btn-ink group shrink-0 max-lg:px-3!"
          >
            {p.icon && <img src={p.icon} alt="" className="size-5 rounded-[6px] bg-paper" />}
            <span className="max-lg:hidden">
              <Roll text={pick(t.work.visit).replace("{title}", p.title)} />
            </span>
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </a>
        )}
      </div>
    </article>
  );
}
