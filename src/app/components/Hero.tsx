import { useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent, MouseEvent } from "react";
import { ArrowDown, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useLang } from "../i18n/context";
import { projects } from "../data/projects";
import { gsap, MQ, ScrollTrigger, onAnchor, scrollToY, useGSAP } from "../lib/scroll";
import { cvPath } from "../lib/cv";
import { DESKTOP } from "../lib/useMedia";
import { useMagnet } from "../lib/useMagnet";
import { RevealText } from "./ui/RevealText";
import { Roll } from "./ui/Roll";
import { Plinth, PLINTH_FLOOR, RING, TILT, drawPlinth } from "./ui/Plinth";
import { scrollToProduct } from "./Products";

const N = projects.length;
const STEP = (Math.PI * 2) / N;
const PHONE = 523 / 1080;
const pad = (n: number) => String(n).padStart(2, "0");
const wrap = gsap.utils.wrap(0, N);
const clampI = gsap.utils.clamp(0, N - 1);

/** Turntable sizes as fractions of the stage box: podium width, phone height, floor line, size of the phone at the back. */
const GEO = {
  wide: { plinth: 0.84, phone: 0.62, floor: 0.79, back: 0.52 },
  narrow: { plinth: 0.96, phone: 0.56, floor: 0.8, back: 0.5 },
};

type Ctl = { go: (i: number) => void; step: (d: number) => void; active: number; moved: boolean };

/**
 * Name, one line of intro and a round podium carrying every product.
 * Desktop: the section pins and scrolling turns the podium one product at a time.
 * Phones and reduced motion: the podium turns on its own, by swipe or with the arrows.
 */
export function Hero() {
  const { t, pick, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const cta = useMagnet<HTMLAnchorElement>(0.25);
  const cv = useMagnet<HTMLAnchorElement>(0.25);
  const ctl = useRef<Ctl>({ go: () => {}, step: () => {}, active: 0, moved: false });
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [view, setView] = useState(false);

  const name = pick(t.hero.name);
  const [first, ...rest] = name.split(" ");
  const p = projects[active];

  useGSAP(
    () => {
      const b = box.current!;
      const s = stage.current!;
      const phones = gsap.utils.toArray<HTMLElement>(".tt-phone", b);
      const rows = gsap.utils.toArray<HTMLElement>(".gn", s);
      const r = { v: 0 };
      const spin = { v: 0 };
      let geo = { w: 1, rx: 0, ry: 0, lift: 0, back: 0.5 };
      let shown = 0;
      let last = 0;
      let entered = false;

      rows.forEach((row, i) => i && gsap.set(row.children, { yPercent: 110 }));
      gsap.set(phones, { xPercent: -50, yPercent: -100, transformOrigin: "50% 100%" });

      // The giant name behind the phones rolls letter by letter to the product in front.
      const showName = (next: number, prev: number, dir: number) => {
        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const out = rows[prev].children;
        const inn = rows[next].children;
        if (still) {
          gsap.set(out, { yPercent: 110 });
          gsap.set(inn, { yPercent: 0 });
          return;
        }
        gsap.to(out, { yPercent: -110 * dir, duration: 0.5, ease: "power3.in", stagger: 0.018, overwrite: true });
        gsap.fromTo(
          inn,
          { yPercent: 110 * dir },
          { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.025, delay: 0.12, overwrite: true },
        );
      };

      const setFront = (next: number, dir: number) => {
        if (next === shown) return;
        showName(next, shown, dir);
        shown = next;
        ctl.current.active = next;
        setActive(next);
      };

      // Per frame only transforms change; sizes come from `measure`.
      const layout = () => {
        const rot = r.v + spin.v;
        phones.forEach((el, i) => {
          const a = (i - rot) * STEP;
          const depth = (Math.cos(a) + 1) / 2;
          const lift = Math.max(0, (depth - 0.9) / 0.1) * geo.lift;
          gsap.set(el, {
            x: Math.sin(a) * geo.rx,
            y: Math.cos(a) * geo.ry - lift,
            scale: geo.back + (1 - geo.back) * depth,
            zIndex: Math.round(depth * 100),
          });
        });
        if (svg.current) drawPlinth(svg.current, rot, N);
        setFront(wrap(Math.round(r.v)), r.v >= last ? 1 : -1);
        last = r.v;
      };

      const measure = () => {
        const w = b.clientWidth;
        const h = b.clientHeight;
        if (!w || !h) return;
        const g = window.matchMedia(DESKTOP).matches ? GEO.wide : GEO.narrow;
        const sw = w * g.plinth;
        const floor = h * g.floor;
        const ph = h * g.phone;
        const rx = sw * 0.49 * RING;
        geo = { w, rx, ry: rx * TILT, lift: w * 0.012, back: g.back };
        gsap.set(svg.current, { width: sw, left: (w - sw) / 2, top: floor - sw * PLINTH_FLOOR });
        gsap.set(phones, { top: floor, height: ph, width: ph * PHONE });
        layout();
      };
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(b);

      // Cursor: a black disc that says what a press will do.
      const fine = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
      const d = dot.current!;
      const offCursor: (() => void)[] = [];
      if (fine) {
        s.style.cursor = "none";
        gsap.set(d, { xPercent: -50, yPercent: -50, scale: 0 });
        const xTo = gsap.quickTo(d, "x", { duration: 0.45, ease: "power3" });
        const yTo = gsap.quickTo(d, "y", { duration: 0.45, ease: "power3" });
        const move = (e: PointerEvent) => {
          const rect = s.getBoundingClientRect();
          xTo(e.clientX - rect.left);
          yTo(e.clientY - rect.top);
          const ph = (e.target as Element).closest<HTMLElement>(".tt-phone");
          setView(!!ph && Number(ph.dataset.i) === ctl.current.active);
        };
        const enter = (e: PointerEvent) => {
          const rect = s.getBoundingClientRect();
          gsap.set(d, { x: e.clientX - rect.left, y: e.clientY - rect.top });
          gsap.to(d, { scale: 1, duration: 0.5, ease: "expo.out", overwrite: "auto" });
        };
        const leave = () => gsap.to(d, { scale: 0, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        s.addEventListener("pointermove", move);
        s.addEventListener("pointerenter", enter);
        s.addEventListener("pointerleave", leave);
        offCursor.push(() => {
          s.removeEventListener("pointermove", move);
          s.removeEventListener("pointerenter", enter);
          s.removeEventListener("pointerleave", leave);
          s.style.cursor = "";
        });
      }

      /** Calls `onMove(dx)` once a horizontal drag passes 6px, `onEnd(dx)` on release. */
      const dragger = (onStart: () => void, onMove: (dx: number) => void, onEnd: (dx: number) => void) => {
        const down = (e: PointerEvent) => {
          if (e.button !== 0) return;
          const x0 = e.clientX;
          const y0 = e.clientY;
          let on = false;
          ctl.current.moved = false;
          const move = (ev: PointerEvent) => {
            const dx = ev.clientX - x0;
            if (!on) {
              if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(ev.clientY - y0)) return;
              on = true;
              ctl.current.moved = true;
              onStart();
            }
            onMove(dx);
          };
          const up = (ev: PointerEvent) => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
            window.removeEventListener("pointercancel", up);
            if (on) onEnd(ev.type === "pointercancel" ? 0 : ev.clientX - x0);
          };
          window.addEventListener("pointermove", move);
          window.addEventListener("pointerup", up);
          window.addEventListener("pointercancel", up);
        };
        b.addEventListener("pointerdown", down);
        return () => b.removeEventListener("pointerdown", down);
      };

      const mm = gsap.matchMedia();
      // `still` keeps the callback running when neither of the others matches.
      mm.add({ pin: MQ.desktop, motion: MQ.motion, still: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        const { pin, motion } = ctx.conditions as { pin: boolean; motion: boolean };
        r.v = 0;
        spin.v = 0;
        last = 0;
        setFront(0, -1);
        setPinned(pin);
        let off: () => void;

        if (pin) {
          const st = ScrollTrigger.create({
            trigger: root.current,
            start: "top top",
            end: `+=${(N - 1) * 30}%`,
            pin: true,
            scrub: 0.9,
            refreshPriority: 1,
            animation: gsap.to(r, { v: N - 1, ease: "none", onUpdate: layout }),
          });
          const yAt = (v: number) => st.start + ((st.end - st.start) * v) / (N - 1);
          let target: number | null = null;
          let dragging = false;
          const stepTo = (i: number) => {
            target = clampI(i);
            scrollToY(yAt(target), { duration: 0.9 });
          };
          ctl.current.go = stepTo;
          ctl.current.step = (dd) => stepTo((target ?? Math.round(st.progress * (N - 1))) + dd);

          // Settle on the nearest product in the direction of travel once scrolling stops inside the pin.
          const settle = () => {
            target = null;
            if (dragging || st.progress <= 0.001 || st.progress >= 0.999) return;
            const v = st.progress * (N - 1);
            const f = v - Math.floor(v);
            if (f < 0.01 || f > 0.99) return;
            const fwd = st.direction > 0 ? f > 0.2 : f > 0.8;
            stepTo(fwd ? Math.ceil(v) : Math.floor(v));
          };
          ScrollTrigger.addEventListener("scrollEnd", settle);

          let v0 = 0;
          let dv = 0;
          const offDrag = dragger(
            () => {
              dragging = true;
              v0 = st.progress * (N - 1);
            },
            (dx) => {
              dv = clampI(v0 - dx / (geo.w * 0.22));
              scrollToY(yAt(dv), { immediate: true });
            },
            () => {
              dragging = false;
              stepTo(Math.round(dv));
            },
          );
          off = () => {
            ScrollTrigger.removeEventListener("scrollEnd", settle);
            offDrag();
          };
        } else {
          const dur = motion ? 1.1 : 0;
          let goal = 0;
          let tw: gsap.core.Tween | null = null;
          let auto: gsap.core.Tween | null = null;
          let stopped = !motion;

          const to = (v: number) => {
            goal = v;
            tw?.kill();
            tw = gsap.to(r, { v, duration: dur, ease: "power3.inOut", onUpdate: layout });
            if (!dur) layout();
          };
          const halt = () => {
            stopped = true;
            auto?.kill();
          };
          const tick = () => {
            auto = gsap.delayedCall(2.8, () => {
              to(Math.round(goal) + 1);
              tick();
            });
          };
          ctl.current.go = (i) => {
            halt();
            let dd = (((i - goal) % N) + N) % N;
            if (dd > N / 2) dd -= N;
            to(goal + dd);
          };
          ctl.current.step = (dd) => {
            halt();
            to(Math.round(goal) + dd);
          };
          if (!stopped) tick();

          // No turning while nobody can see it.
          const seen = ScrollTrigger.create({
            trigger: s,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              if (!stopped) (self.isActive ? auto?.resume() : auto?.pause());
            },
          });

          let v0 = 0;
          const offDrag = dragger(
            () => {
              halt();
              tw?.kill();
              v0 = r.v;
            },
            (dx) => {
              r.v = v0 - dx / (geo.w * 0.5);
              layout();
            },
            (dx) => {
              if (Math.abs(dx) > 30) to(dx < 0 ? Math.ceil(r.v) : Math.floor(r.v));
              else to(Math.round(r.v));
            },
          );
          off = () => {
            halt();
            seen.kill();
            offDrag();
          };
        }

        if (motion && !entered) {
          entered = true;
          gsap.fromTo(spin, { v: -1.4 }, { v: 0, duration: 1.9, ease: "expo.out", delay: 0.1, onUpdate: layout });
          gsap.from(b.querySelector(".tt-phones"), { yPercent: 14, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.1 });
          gsap.from(svg.current, { scaleX: 0.82, opacity: 0, duration: 1.4, ease: "expo.out", transformOrigin: "50% 30%" });
          gsap.from(root.current!.querySelectorAll(".hi-fade"), {
            y: 24,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.08,
            delay: 0.45,
          });
        }
        layout();

        return () => {
          off();
          spin.v = 0;
        };
      });

      return () => {
        ro.disconnect();
        offCursor.forEach((f) => f());
        mm.revert();
      };
    },
    { scope: root },
  );

  const onPhone = (e: MouseEvent<HTMLAnchorElement>, i: number) => {
    e.preventDefault();
    if (ctl.current.moved) {
      ctl.current.moved = false;
      return;
    }
    if (i === ctl.current.active) scrollToProduct(i);
    else ctl.current.go(i);
  };

  // Keyboard focus brings a phone to the front; mouse focus is left to the click.
  const onPhoneFocus = (e: FocusEvent<HTMLAnchorElement>, i: number) => {
    if (i !== ctl.current.active && e.currentTarget.matches(":focus-visible")) ctl.current.go(i);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    ctl.current.step(e.key === "ArrowRight" ? 1 : -1);
  };

  return (
    <section
      ref={root}
      id="top"
      className="flex flex-col px-[var(--gutter)] pb-6 lg:h-[100svh] lg:pb-5"
      style={{ paddingTop: "calc(var(--header-h) + 24px)" }}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="min-w-0">
          <h1 className="t-hero" aria-label={name}>
            <RevealText as="span" text={first} immediate className="block lg:inline" />
            <span className="hidden lg:inline"> </span>
            <RevealText as="span" text={rest.join(" ")} immediate delay={0.08} className="block lg:inline" />
          </h1>
          <p className="hi-fade t-sub mt-4 max-w-[34ch] text-ink-2 lg:mt-3 lg:max-w-none">
            {pick(t.hero.sub).replace("{n}", String(N))}
          </p>
        </div>
        <div className="hi-fade flex shrink-0 flex-wrap gap-3">
          <a ref={cta} href="#work" onClick={onAnchor} className="btn btn-ink group">
            <Roll text={pick(t.hero.cta)} />
            <ArrowDown className="size-4" strokeWidth={2.25} />
          </a>
          <a ref={cv} href={cvPath(lang)} download className="btn btn-line group">
            <Roll text={pick(t.nav.cv)} />
            <Download className="size-4" strokeWidth={2.25} />
          </a>
        </div>
      </div>

      <div
        ref={stage}
        onKeyDown={onKey}
        className="relative mt-8 aspect-[1/1.05] select-none lg:mt-4 lg:aspect-auto lg:min-h-0 lg:flex-1"
        style={{ containerType: "size" }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[2cqh] font-semibold text-mist">
          {projects.map((pr) => (
            <div
              key={pr.id}
              className="gn leading-none tracking-[-0.06em]"
              style={{ inset: "0 0 auto 0", fontSize: `min(30cqh, ${(92 / (pr.title.length * 0.62)).toFixed(1)}cqw)` }}
            >
              {Array.from(pr.title).map((c, i) => (
                <span key={i} className="gn-l">
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div
          ref={box}
          className="absolute inset-x-0 bottom-0 mx-auto h-full touch-pan-y lg:h-[min(100cqh,calc(100cqw/1.8))] lg:w-[min(100cqw,calc(100cqh*1.8))]"
        >
          <Plinth count={N} svgRef={svg} className="absolute h-auto" />
          <div className="tt-phones absolute inset-0">
            {projects.map((pr, i) => (
              <a
                key={pr.id}
                href={`#${pr.id}`}
                data-i={i}
                draggable={false}
                onClick={(e) => onPhone(e, i)}
                onFocus={(e) => onPhoneFocus(e, i)}
                aria-label={pick(t.hero.open).replace("{title}", pr.title)}
                className="tt-phone absolute left-1/2 block cursor-[inherit] will-change-transform"
              >
                {pr.mockup && (
                  <img
                    src={pr.mockup}
                    alt=""
                    width={523}
                    height={1080}
                    draggable={false}
                    decoding="async"
                    fetchPriority={i < 2 ? "high" : "low"}
                    className="block h-full w-full"
                  />
                )}
              </a>
            ))}
          </div>
        </div>

        <div
          ref={dot}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-[200] grid size-[84px] place-items-center rounded-full bg-ink text-[13px] font-semibold tracking-[-0.01em] text-paper"
          style={{ transform: "scale(0)" }}
        >
          {pick(view ? t.hero.view : t.hero.drag)}
        </div>
      </div>

      <div className="hi-fade mt-4 flex items-center justify-between gap-4 lg:mt-3">
        <a href={`#${p.id}`} onClick={onAnchor} className="group flex min-w-0 items-baseline gap-3">
          <span className="t-num shrink-0 text-[15px] font-medium text-ink-2">
            {pad(active + 1)} / {pad(N)}
          </span>
          <span key={p.id} className="shrink-0 text-[20px] font-semibold tracking-[-0.025em]">
            <Roll text={p.title} />
          </span>
          <span className="hidden truncate text-[16px] text-ink-2 sm:inline">{pick(p.kind)}</span>
        </a>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => ctl.current.step(-1)}
            disabled={pinned && active === 0}
            aria-label={pick(t.hero.prev)}
            className="btn btn-line btn-round disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="size-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => ctl.current.step(1)}
            disabled={pinned && active === N - 1}
            aria-label={pick(t.hero.next)}
            className="btn btn-line btn-round disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
