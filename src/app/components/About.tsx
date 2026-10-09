import { useRef } from "react";
import { useLang } from "../i18n/context";
import { gsap, MQ, useGSAP } from "../lib/scroll";

export function About() {
  const { t, pick, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const words = pick(t.about.intro).split(" ");

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // The sentence inks in word by word as it is read. GSAP cannot blend var() colours, so read the real values.
        const css = getComputedStyle(root.current!);
        gsap.fromTo(
          q(".about-word"),
          { color: css.getPropertyValue("--line-strong").trim() },
          {
            color: css.getPropertyValue("--ink").trim(),
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: q(".about-copy")[0], start: "top 80%", end: "bottom 45%", scrub: 0.6 },
          },
        );

        gsap.from(q(".about-photo"), {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: q(".about-box")[0], start: "top bottom", end: "bottom 60%", scrub: 0.6 },
        });

        q(".about-num").forEach((el) => {
          const counter = { v: 0 };
          gsap.to(counter, {
            v: Number(el.dataset.value),
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(counter.v));
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      id="about"
      className="grid items-end gap-x-[var(--gutter)] gap-y-14 px-[var(--gutter)] pb-32 pt-36 lg:grid-cols-[5fr_7fr] lg:pb-44 lg:pt-52"
    >
      <div
        className="about-box relative aspect-[4/5] w-full overflow-hidden bg-stone"
        style={{ borderRadius: "var(--r-lg)" }}
      >
        <img
          src="/portrait.webp"
          alt={pick(t.about.portraitAlt)}
          width={546}
          height={685}
          loading="lazy"
          decoding="async"
          className="about-photo absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2"
        />
      </div>

      <div className="lg:pb-2 lg:pl-4">
        <p className="about-copy t-lead" aria-label={pick(t.about.intro)}>
          {words.map((w, i) => (
            <span key={`${lang}-${i}`} aria-hidden="true">
              <span className="about-word">{w}</span>
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </p>

        <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-line pt-8 lg:mt-24">
          {t.about.stats.map((s, i) => (
            <div key={i}>
              <dt className="sr-only">{pick(s.label)}</dt>
              <dd className="t-num text-[clamp(3rem,1.6rem+4.4vw,6.5rem)] font-semibold leading-none tracking-[-0.06em]">
                <span className="about-num" data-value={s.value}>
                  {s.value}
                </span>
                {s.suffix}
              </dd>
              <dd aria-hidden="true" className="mt-3 text-[15px] leading-snug text-ink-2">
                {pick(s.label)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
