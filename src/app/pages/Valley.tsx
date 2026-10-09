import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap, ScrollTrigger, useGSAP, useSmoothScroll, scrollToY } from "../lib/scroll";
import { useLang } from "../i18n/context";
import { profile } from "../data/profile";
import { BEATS, WHISPERS, TECH, STOPS, UI, TRACK_VH, SHOWCASE, CTA_AT, at, local } from "../valley/copy";
import { projects } from "../data/projects";
import { Ambience } from "../valley/sound";
import type { World } from "../valley/world";

gsap.registerPlugin(SplitText);

const BG = "#050608";
const INK = "#E9ECF1";
// the page inks: night values, and the day values they turn to at the river
const NIGHT = { ink: INK, mute: "#8d98a8", soft: "#aab4c2", bg: BG };
const DAY = { ink: "#14171c", mute: "#4a5361", soft: "#3a4350", bg: "#e6e5e1" };
const VARS = { "--ink": NIGHT.ink, "--mute": NIGHT.mute, "--soft": NIGHT.soft, "--bg": NIGHT.bg, "--shade": "rgba(0,0,0,.6)" } as CSSProperties;
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const link = (href?: string) => (href && href !== "#" ? href : null);
const pad = (n: number) => String(n).padStart(2, "0");
const mixHex = (a: string, b: string, t: number) => {
  const x = hex(a), y = hex(b);
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`;
};
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function webgl2() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

export default function Valley() {
  const { lang, pick, toggle } = useLang();
  const [still] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches || !webgl2());
  useSmoothScroll();

  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = BG;
    return () => void (document.body.style.background = prev);
  }, []);

  return still ? <Still lang={lang} pick={pick} toggle={toggle} /> : <Film lang={lang} pick={pick} toggle={toggle} />;
}

type LangProps = Pick<ReturnType<typeof useLang>, "lang" | "pick" | "toggle">;

function Film({ lang, pick, toggle }: LangProps) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const world = useRef<World | null>(null);
  const sound = useRef<Ambience | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [stop, setStop] = useState(0);

  // sound is on by default (unless the visitor turned it off before); it starts on the first gesture
  useEffect(() => {
    let off = false;
    try { off = localStorage.getItem("vadi-sound") === "off"; } catch { /* storage blocked */ }
    if (off) return;
    sound.current ??= new Ambience();
    if (!sound.current.enabled) setSoundOn(sound.current.toggle());
    const wake = () => sound.current?.wake();
    const evs = ["pointerdown", "keydown", "touchend", "wheel"] as const;
    evs.forEach((e) => addEventListener(e, wake, { passive: true }));
    return () => evs.forEach((e) => removeEventListener(e, wake));
  }, []);
  // product images load only once the film nears the clearing, so they never compete with the start
  const [near, setNear] = useState(false);
  const st = useRef<ScrollTrigger | null>(null);
  const raw = useRef(0);
  const beats = useRef({ cur: -1, target: -1, busy: false });

  // the film: progress, lantern, whispers, tech labels, cursor
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const coarse = matchMedia("(pointer: coarse)").matches;
      const whispers = q<HTMLElement>("[data-whisper]");
      const labels = q<HTMLElement>("[data-tech]");
      const hint = q<HTMLElement>("[data-hint]")[0];
      const fill = q<HTMLElement>("[data-fill]")[0];
      const vig = q<HTMLElement>("[data-vig]")[0];
      const prods = q<HTMLElement>("[data-prod]");
      const cta = q<HTMLElement>("[data-cta]")[0];
      let shown = -1;
      let wasNear = false;
      let inked = -1;
      const dot = q<HTMLElement>("[data-dot]")[0];
      const ring = q<HTMLElement>("[data-ring]")[0];

      st.current = ScrollTrigger.create({
        trigger: track.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          raw.current = self.progress;
          world.current?.setProgress(self.progress);
          sound.current?.gust(self.getVelocity());
        },
      });

      // pointer: a real mouse owns the lantern; touch borrows it while the finger is down
      const ptr = { x: innerWidth / 2, y: innerHeight / 2, real: false, down: false };
      const lens = { x: ptr.x, y: ptr.y };
      const ringPos = { x: ptr.x, y: ptr.y };
      const move = (e: PointerEvent) => {
        ptr.x = e.clientX;
        ptr.y = e.clientY;
        if (e.pointerType === "mouse") ptr.real = true;
      };
      const down = (e: PointerEvent) => { if (e.pointerType !== "mouse") { ptr.down = true; move(e); } };
      const up = () => (ptr.down = false);
      addEventListener("pointermove", move, { passive: true });
      addEventListener("pointerdown", down, { passive: true });
      addEventListener("pointerup", up);
      addEventListener("pointercancel", up);

      let spots: { pos: import("three").Vector3; at: number }[] = [];
      const rang = new Set<number>();
      const rung = new Set<string>();
      const v3 = { cur: null as import("three").Vector3 | null };

      const frame = () => {
        const w = world.current;
        const film = w ? w.progress : raw.current;
        // each act runs on its own 0..1 clock
        const p = local("valley", film), q = local("beacon", film), r = local("river", film);
        const c = local("clearing", film), h = local("horizon", film);
        const t = performance.now() / 1000;

        // dawn at the river: the page turns from light-on-dark to dark-on-light while no line is on screen
        const ink = Math.round(smooth(0.36, 0.44, r) * 50) / 50;
        sound.current?.light(smooth(0.06, 0.2, r) * (1 - 0.4 * smooth(0.6, 1, r)), w ? w.day : 0);
        if (ink !== inked && root.current) {
          inked = ink;
          const st = root.current.style;
          for (const k of ["ink", "mute", "soft", "bg"] as const) st.setProperty(`--${k}`, mixHex(NIGHT[k], DAY[k], ink));
          st.setProperty("--shade", ink < 0.5 ? `rgba(0,0,0,${0.6 * (1 - ink * 2)})` : `rgba(255,255,255,${0.7 * (ink * 2 - 1)})`);
          if (vig) vig.style.opacity = String(1 - 0.75 * ink);
        }
        const W = innerWidth, H = innerHeight;

        // until someone moves the mouse, the lantern wanders by itself and teaches the gesture
        const live = ptr.real || ptr.down;
        const tx = live ? ptr.x : W * (0.5 + 0.3 * Math.sin(t * 0.31)), ty = live ? ptr.y : H * (0.46 + 0.2 * Math.sin(t * 0.47 + 1));
        const k = live ? 0.22 : 0.06;
        lens.x += (tx - lens.x) * k;
        lens.y += (ty - lens.y) * k;
        w?.pointer(lens.x, lens.y, true);

        // beats: pick the one whose window holds p; the engine plays them strictly one after another
        const want = BEATS.findIndex((b) => film >= b.from && film < b.to);
        if (want !== beats.current.target) {
          beats.current.target = want;
          playBeats();
        }

        // whispers live only inside the cloud
        const fog = 1 - smooth(0.2, 0.34, p);
        const R = Math.min(W, H) * (coarse ? 0.32 : 0.24);
        whispers.forEach((el, i) => {
          const wx = WHISPERS[i].x * W, wy = WHISPERS[i].y * H;
          const d = Math.hypot(wx - lens.x, wy - lens.y);
          const o = fog * smooth(R, R * 0.25, d);
          el.style.opacity = o.toFixed(3);
          el.style.filter = `blur(${((1 - o) * 7).toFixed(1)}px)`;
          el.style.transform = `translate(-50%,-50%) translateY(${(Math.sin(t * 0.6 + i * 2) * 5).toFixed(1)}px)`;
        });

        if (hint) hint.style.opacity = String(1 - smooth(0.005, 0.04, p));

        // tech names ride the lattice nodes as the light wave reaches them
        if (w && spots.length) {
          const rev = w.reveal;
          const show = smooth(0.73, 0.77, p) * (1 - smooth(0.88, 0.92, p));
          labels.forEach((el, i) => {
            const s = spots[i];
            const lit = smooth(s.at - 4, s.at + 14, rev);
            if (lit > 0.5 && !rang.has(i)) { rang.add(i); sound.current?.chime(i); }
            if (lit < 0.1) rang.delete(i);
            const pr = w.project(s.pos, v3.cur!);
            // stay clear of the header and the route line
            const o = pr ? show * lit * (1 - smooth(150, 210, pr.dist)) * smooth(8, 18, pr.dist) * smooth(110, 170, pr.y) * (1 - smooth(H - 170, H - 120, pr.y)) * smooth(40, 90, pr.x) * (1 - smooth(W - 90, W - 40, pr.x)) : 0;
            el.style.opacity = o.toFixed(3);
            el.style.visibility = o > 0.01 ? "visible" : "hidden";
            if (pr && o > 0.01) el.style.transform = `translate3d(${pr.x.toFixed(1)}px,${pr.y.toFixed(1)}px,0)`;
          });
        }

        // the sign rings twice: when the Y is out of the light, and when the hexagon closes
        if (w) {
          const sg = w.sign;
          for (const [key, on, off, notes] of [["y", 0.42, 0.3, [1]], ["hex", 0.98, 0.85, [0, 3]], ["end", 2.62, 2.5, [0, 2, 4]]] as const) {
            const v = key === "end" ? 2 + h : sg;
            if (v >= on && !rung.has(key)) { rung.add(key); notes.forEach((k) => sound.current?.chime(k)); }
            if (v < off) rung.delete(key);
          }
        }

        if (!wasNear && film > at("river", 0.4)) { wasNear = true; setNear(true); }

        // the clearing: one product at a time; each comes up out of the light and is fully gone before the next
        const n = prods.length, sx = (film - SHOWCASE.from) / (SHOWCASE.to - SHOWCASE.from);
        const idx = sx >= 0 && sx < 1 ? Math.floor(sx * n) : -1;
        if (shown !== idx && shown >= 0) prods[shown].style.visibility = "hidden";
        shown = idx;
        if (idx >= 0) {
          const f = sx * n - idx, el = prods[idx];
          const inn = smooth(0, 0.2, f), out = smooth(0.8, 1, f), o = inn * (1 - out);
          const mx = ptr.real ? (ptr.x / W - 0.5) : 0;
          el.style.visibility = "visible";
          const ph = el.firstElementChild as HTMLElement, tx = el.lastElementChild as HTMLElement;
          ph.style.opacity = String(o);
          ph.style.filter = `blur(${((1 - inn) * 14 + out * 10).toFixed(1)}px) brightness(${(1 + (1 - inn) * 0.8).toFixed(2)})`;
          ph.style.transform = `translate3d(${(-mx * 14).toFixed(1)}px, ${((1 - inn) * 46 - out * 30).toFixed(1)}px, 0)`;
          const ti = smooth(0.06, 0.26, f);
          tx.style.opacity = String(ti * (1 - smooth(0.76, 0.94, f)));
          tx.style.transform = `translate3d(0, ${((1 - ti) * 18 - out * 14).toFixed(1)}px, 0)`;
          tx.style.pointerEvents = o > 0.6 ? "auto" : "none";
        }
        if (cta) {
          const o = smooth(CTA_AT, CTA_AT + 0.012, film);
          cta.style.opacity = String(o);
          cta.style.transform = `translate3d(-50%, ${((1 - o) * 16).toFixed(1)}px, 0)`;
          cta.style.pointerEvents = o > 0.6 ? "auto" : "none";
        }

        // route: each stop sits at i/5; between stops the fill keeps creeping toward the next light
        const frac =
          q <= 0 ? (p < 0.68 ? (p / 0.68) * 0.2 : 0.2 + ((p - 0.68) / 0.32) * 0.12)
          : r <= 0 ? (q < 0.5 ? 0.32 + (q / 0.5) * 0.08 : 0.4 + ((q - 0.5) / 0.5) * 0.12)
          : c <= 0 ? (r < 0.2 ? 0.52 + (r / 0.2) * 0.08 : 0.6 + ((r - 0.2) / 0.8) * 0.12)
          : h <= 0 ? (c < 0.13 ? 0.72 + (c / 0.13) * 0.08 : 0.8 + ((c - 0.13) / 0.87) * 0.12)
          : Math.min(1, 0.92 + (h / 0.6) * 0.08);
        if (fill) fill.style.transform = `scaleX(${frac.toFixed(4)})`;
        const now = h >= 0.5 ? 5 : c >= 0.12 ? 4 : r >= 0.15 ? 3 : q >= 0.45 ? 2 : p >= 0.6 ? 1 : 0;
        setStop((s) => (s === now ? s : now));

        if (!coarse && dot && ring) {
          ringPos.x += (ptr.x - ringPos.x) * 0.16;
          ringPos.y += (ptr.y - ringPos.y) * 0.16;
          dot.style.transform = `translate3d(${ptr.x}px,${ptr.y}px,0)`;
          ring.style.transform = `translate3d(${ringPos.x}px,${ringPos.y}px,0)`;
          const o = ptr.real ? "1" : "0";
          dot.style.opacity = o;
          ring.style.opacity = o;
        }
      };

      gsap.ticker.add(frame);

      // three arrives after the first line is already on screen
      let dead = false;
      const load = gsap.delayedCall(0.6, async () => {
        const mod = await import("../valley/world");
        const THREE = await import("three");
        if (dead || !canvas.current) return;
        const w = new mod.World(canvas.current);
        w.setProgress(raw.current);
        world.current = w;
        v3.cur = new THREE.Vector3();
        spots = mod.nodeSpots(TECH.map((x) => x.at));
        gsap.fromTo(canvas.current, { opacity: 0 }, { opacity: 1, duration: 2.4, ease: "power2.out" });
      });

      return () => {
        dead = true;
        load.kill();
        gsap.ticker.remove(frame);
        removeEventListener("pointermove", move);
        removeEventListener("pointerdown", down);
        removeEventListener("pointerup", up);
        removeEventListener("pointercancel", up);
        st.current?.kill();
        world.current?.dispose();
        world.current = null;
        sound.current?.dispose();
      };
    },
    { scope: root },
  );

  // beat engine: old line burns out completely before the next one is lit
  const splits = useRef<SplitText[]>([]);
  const lighting = useRef<gsap.core.Timeline | null>(null);
  const playBeats = () => {
    const b = beats.current;
    // a fast scroll must not queue stale lines: cut a line that is still lighting up
    if (b.busy && lighting.current && b.cur !== b.target) {
      lighting.current.kill();
      lighting.current = null;
      b.busy = false;
    }
    if (b.busy || b.cur === b.target) return;
    b.busy = true;
    const el = (i: number) => root.current?.querySelector<HTMLElement>(`[data-beat="${i}"]`);
    const show = () => {
      const next = b.target;
      b.cur = next;
      const node = next >= 0 ? el(next) : null;
      const sp = splits.current[next];
      if (!node || !sp) return void ((b.busy = false), playBeats());
      gsap.set(node, { autoAlpha: 1 });
      const tl = gsap.timeline({ onComplete: () => ((lighting.current = null), (b.busy = false), playBeats()) });
      lighting.current = tl;
      tl.fromTo(
        sp.chars,
        { opacity: 0, filter: "blur(14px)", textShadow: "0 0 28px rgba(255,246,228,0.95)", yPercent: 18 },
        { opacity: 1, filter: "blur(0px)", textShadow: "0 0 0px rgba(255,246,228,0)", yPercent: 0, duration: 1.3, ease: "expo.out", stagger: { each: 0.028, from: "start" } },
      );
      const small = node.querySelector("[data-small]");
      if (small) tl.fromTo(small, { opacity: 0, letterSpacing: "0.6em" }, { opacity: 1, letterSpacing: "0.32em", duration: 1.4, ease: "expo.out" }, 0);
    };
    const prev = b.cur >= 0 ? el(b.cur) : null;
    const psp = splits.current[b.cur];
    if (prev && psp) {
      gsap.to(psp.chars, {
        opacity: 0, filter: "blur(10px)", yPercent: -14, duration: 0.42, ease: "power2.in", stagger: { each: 0.01, from: "end" },
        onComplete: () => (gsap.set(prev, { autoAlpha: 0 }), show()),
      });
      const small = prev.querySelector("[data-small]");
      if (small) gsap.to(small, { opacity: 0, duration: 0.3 });
    } else show();
  };

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray<HTMLElement>("[data-beat] [data-line]", root.current);
      splits.current = nodes.map((n) => new SplitText(n, { type: "words,chars", wordsClass: "inline-block whitespace-nowrap", charsClass: "inline-block will-change-[filter,opacity]" }));
      splits.current.forEach((s) => gsap.set(s.chars, { opacity: 0 }));
      gsap.set("[data-beat]", { autoAlpha: 0 });
      beats.current = { cur: -1, target: -1, busy: false };
      lighting.current?.kill();
      lighting.current = null;
      return () => splits.current.forEach((s) => s.revert());
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  const toggleSound = () => {
    sound.current ??= new Ambience();
    const on = sound.current.toggle();
    setSoundOn(on);
    try { localStorage.setItem("vadi-sound", on ? "on" : "off"); } catch { /* storage blocked */ }
  };
  const goto = (at: number) => {
    const s = st.current;
    if (s) scrollToY(s.start + at * (s.end - s.start), { duration: 2.2 });
  };

  return (
    <div ref={root} className="valley relative text-[color:var(--ink)]" style={{ ...VARS, background: "var(--bg)" } as CSSProperties}>
      <style>{`@media (pointer: fine){ .valley, .valley * { cursor: none !important } }`}</style>
      <canvas ref={canvas} className="fixed inset-0 h-full w-full opacity-0" aria-hidden />
      <div data-vig className="pointer-events-none fixed inset-0" style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,.55))" }} aria-hidden />

      {/* whispers in the cloud */}
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        {WHISPERS.map((w, i) => (
          <span key={i} data-whisper className="absolute text-[clamp(.95rem,1.4vw,1.25rem)] font-light italic tracking-wide text-[#cfd6e0] opacity-0" style={{ left: `${w.x * 100}%`, top: `${w.y * 100}%` }}>
            {pick(w.text)}
          </span>
        ))}
      </div>

      {/* tech names on the lattice */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {TECH.map((t) => (
          <span key={t.name} lang="en" data-tech className="invisible absolute left-0 top-0 opacity-0">
            <span className="absolute bottom-0 left-0 h-9 w-px -translate-x-1/2 bg-gradient-to-t from-[#a9c0de] to-transparent" />
            <span className="absolute bottom-9 left-0 -translate-x-1/2 whitespace-nowrap pb-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#c9d6e8]">{t.name}</span>
          </span>
        ))}
      </div>

      {/* one line at a time */}
      <div className="pointer-events-none fixed inset-0 flex justify-center px-6">
        {BEATS.map((b, i) => (
          <div key={`${lang}-${b.id}`} data-beat={i} className="invisible absolute flex w-[min(92vw,1100px)] -translate-y-1/2 flex-col items-center text-center" style={{ top: `${(b.y ?? 0.4) * 100}%`, textShadow: "0 2px 30px var(--shade)" }}>
            {b.small && (
              <p data-small className="mb-5 text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--soft)] opacity-0">
                {pick(b.small)}
              </p>
            )}
            <p
              data-line
              className={`max-w-[13em] text-balance font-extralight leading-[1.08] tracking-[-0.025em] ${b.size === "xl" ? "text-[clamp(2.2rem,5.6vw,5.2rem)]" : "text-[clamp(1.7rem,3.8vw,3.4rem)]"}`}
            >
              {pick(b.text)}
            </p>
          </div>
        ))}
      </div>

      {/* the clearing: products, one at a time */}
      {projects.map((pr, i) => (
        <div key={pr.id} data-prod className="pointer-events-none invisible fixed inset-x-0 bottom-24 top-20 flex flex-col items-center justify-center gap-5 px-6 sm:flex-row-reverse sm:justify-center sm:gap-[min(9vw,140px)]">
          <img src={near ? pr.mockup : undefined} alt={pr.title} decoding="async" className="h-[min(44vh,420px)] w-auto opacity-0 sm:h-[min(64vh,620px)]" />
          <div className="max-w-[24rem] text-center opacity-0 sm:text-left">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--mute)]">
              {pad(i + 1)} / {pad(projects.length)} · {pick(pr.kind)}
            </p>
            <h3 className="mt-3 text-[clamp(2.2rem,4.6vw,4rem)] font-extralight leading-[1.02] tracking-[-0.03em]">{pr.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--soft)] sm:text-[17px]">{pick(pr.tagline)}</p>
            {pr.status && <p className="mt-2 text-[12px] text-[var(--mute)]">{pick(pr.status)}</p>}
            {link(pr.href) && (
              <a href={link(pr.href)!} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 border-b border-[var(--ink)]/30 pb-0.5 text-[13px] font-medium transition-colors hover:border-[var(--ink)]">
                {pick(UI.visit)} <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>
      ))}

      {/* the horizon: the last line is an invitation, with a plain way to answer it */}
      <div data-cta className="pointer-events-none fixed left-1/2 top-[56%] flex flex-col items-center gap-5 opacity-0" style={{ transform: "translate3d(-50%,16px,0)" }}>
        <a href={`mailto:${profile.email}`} className="rounded-full bg-[var(--ink)] px-7 py-3.5 text-[14px] font-medium text-[var(--bg)] transition-transform hover:scale-[1.03]">
          {pick(UI.write)}
        </a>
        <p className="text-[13px] text-[var(--soft)]">{profile.email}</p>
        <nav className="flex gap-6 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--mute)]">
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--ink)]">LinkedIn</a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--ink)]">GitHub</a>
        </nav>
      </div>

      <Chrome lang={lang} pick={pick} toggle={toggle} stop={stop} goto={goto} soundOn={soundOn} toggleSound={toggleSound} />

      <div data-hint className="pointer-events-none fixed bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--mute)]">
        {pick(UI.scroll)}
        <span className="relative h-10 w-px overflow-hidden bg-[var(--ink)]/10">
          <span className="absolute inset-x-0 top-0 h-4 animate-[valley-drip_2.2s_cubic-bezier(.7,0,.3,1)_infinite] bg-[var(--ink)]/70" />
        </span>
        <style>{`@keyframes valley-drip{0%{transform:translateY(-100%)}100%{transform:translateY(260%)}}`}</style>
      </div>

      <div data-dot className="pointer-events-none fixed left-0 top-0 z-50 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[var(--ink)] opacity-0" aria-hidden />
      <div data-ring className="pointer-events-none fixed left-0 top-0 z-50 -ml-[17px] -mt-[17px] h-[34px] w-[34px] rounded-full border border-[var(--ink)]/40 opacity-0" aria-hidden />

      <div ref={track} style={{ height: `${TRACK_VH}vh` }} aria-hidden />
    </div>
  );
}

function Chrome({ lang, pick, toggle, stop, goto, soundOn, toggleSound }: LangProps & { stop: number; goto?: (at: number) => void; soundOn?: boolean; toggleSound?: () => void }) {
  const btn = "pointer-events-auto transition-colors hover:text-[var(--ink)]";
  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between gap-6 px-5 pt-5 text-[13px] sm:px-8 sm:pt-7">
        <p className="leading-snug">
          <span className="block font-medium text-[var(--ink)]">{UI.name}</span>
          <span className="block text-[var(--mute)]">{pick(UI.role)}</span>
        </p>
        <nav className="flex shrink-0 items-center gap-4 text-[var(--soft)] sm:gap-5">
          <button type="button" onClick={toggle} className={`${btn} uppercase tracking-[0.14em]`} aria-label={lang === "tr" ? "Switch to English" : "Türkçeye geç"}>
            <span className={lang === "tr" ? "text-[var(--ink)]" : ""}>TR</span>
            <span className="px-1 text-[var(--ink)]/25">/</span>
            <span className={lang === "en" ? "text-[var(--ink)]" : ""}>EN</span>
          </button>
          <a href={`mailto:${profile.email}`} className={`${btn} whitespace-nowrap border-b border-[var(--ink)]/25 pb-0.5 text-[var(--ink)]`}>
            {pick(UI.contact)}
          </a>
        </nav>
      </header>

      <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-end justify-between gap-4 px-5 pb-5 sm:px-8 sm:pb-7">
        <span className="w-14 sm:w-20" />
        <ol className="relative flex w-[min(560px,78vw)] items-start justify-between">
          <span className="absolute left-[5px] right-[5px] top-[5px] h-px bg-[var(--ink)]/12" />
          <span data-fill className="absolute left-[5px] right-[5px] top-[5px] h-px origin-left scale-x-0 bg-[var(--ink)]/70" />
          {STOPS.map((s, i) => {
            const on = i === stop, ready = s.at !== null;
            return (
              <li key={s.id} className="relative flex flex-col items-center">
                <button
                  type="button"
                  disabled={!ready}
                  onClick={() => ready && goto?.(s.at!)}
                  className={`pointer-events-auto flex flex-col items-center gap-2 ${ready ? "" : "cursor-default"}`}
                  aria-current={on ? "step" : undefined}
                >
                  <span className={`block h-[11px] w-[11px] rounded-full border transition-all duration-700 ${on ? "border-[var(--ink)] bg-[var(--ink)] shadow-[0_0_14px_rgba(255,255,255,.7)]" : ready ? "border-[var(--ink)]/60 bg-[var(--bg)]" : "border-[var(--ink)]/20 bg-[var(--bg)]"}`} />
                  <span className={`whitespace-nowrap text-[10px] uppercase tracking-[0.18em] transition-colors duration-700 ${on ? "text-[var(--ink)]" : ready ? "text-[var(--mute)] max-sm:hidden" : "text-[var(--ink)]/25 max-sm:hidden"}`}>
                    {pick(s.name)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        {toggleSound ? (
          <button type="button" onClick={toggleSound} className={`${btn} flex w-14 items-center justify-end gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--soft)] sm:w-20`} aria-pressed={soundOn}>
            <span className="flex h-3 items-end gap-[2px]" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="w-[2px] bg-current" style={{ height: soundOn ? undefined : 2, animation: soundOn ? `valley-eq 1.${i + 1}s ease-in-out ${i * 0.17}s infinite alternate` : "none" }} />
              ))}
            </span>
            {pick(UI.sound)}
            <style>{`@keyframes valley-eq{0%{height:2px}100%{height:12px}}`}</style>
          </button>
        ) : (
          <span className="w-14 sm:w-20" />
        )}
      </footer>
    </>
  );
}

/** Reduced motion or no WebGL: the same lines, read top to bottom on the dark ground. */
function Still({ lang, pick, toggle }: LangProps) {
  return (
    <div className="relative min-h-screen text-[#E9ECF1]" style={{ ...VARS, background: BG }}>
      <Chrome lang={lang} pick={pick} toggle={toggle} stop={0} />
      {BEATS.map((b) => (
        <section key={b.id} className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
          {b.small && <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--soft)]">{pick(b.small)}</p>}
          <p className="max-w-[18ch] text-[clamp(2rem,5vw,4.5rem)] font-extralight leading-[1.08] tracking-[-0.025em]">{pick(b.text)}</p>
          {b.id === "brand" && (
            <svg viewBox="-15 -15 30 30" className="order-first mb-10 h-24 w-24 text-[#f3ece0]" fill="none" stroke="currentColor" strokeWidth="0.6" aria-hidden>
              <path d="M0 0L11.26 -6.5M0 0L-11.26 -6.5M0 0V13M0 -13L11.26 -6.5V6.5L0 13L-11.26 6.5V-6.5Z" />
            </svg>
          )}
          {b.id === "quality" && (
            <ul className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
              {projects.map((pr) => (
                <li key={pr.id} className="flex flex-col items-center gap-3">
                  <img src={pr.mockup} alt={pr.title} loading="lazy" className="h-64 w-auto" />
                  <span className="text-lg font-light">{pr.title}</span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--mute)]">{pick(pr.kind)}</span>
                </li>
              ))}
            </ul>
          )}
          {b.id === "invite" && (
            <a href={`mailto:${profile.email}`} className="mt-10 rounded-full bg-[#E9ECF1] px-7 py-3.5 text-[14px] font-medium text-[#050608]">
              {pick(UI.write)}
            </a>
          )}
          {b.id === "ground" && (
            <ul className="mt-10 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-[var(--mute)]">
              {TECH.map((t) => <li key={t.name}>{t.name}</li>)}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
