import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { useLang } from "../i18n/context";
import { profile } from "../data/profile";
import { gsap, MQ, useGSAP } from "../lib/scroll";
import { cvPath } from "../lib/cv";
import { useMagnet } from "../lib/useMagnet";
import { RevealText } from "./ui/RevealText";
import { Roll } from "./ui/Roll";

export function Contact() {
  const { t, pick, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const copyBtn = useMagnet<HTMLButtonElement>(0.25);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(q(".ct-box"), {
          clipPath: "inset(6% 4% 6% 4% round 28px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 35%", scrub: 0.6 },
        });
        gsap.from(q(".ct-fade"), {
          y: 32,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: q(".ct-body")[0], start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, external: false },
    { label: "LinkedIn", href: profile.links.linkedin, external: true },
    { label: "GitHub", href: profile.links.github, external: true },
  ];

  return (
    <section ref={root} id="contact" className="px-[var(--gutter)]">
      <div
        className="ct-box bg-ink px-[var(--cp)] pb-10 pt-16 text-paper [--cp:22px] lg:pb-12 lg:pt-24 lg:[--cp:48px]"
        style={{ borderRadius: "var(--r-lg)", clipPath: "inset(0% 0% 0% 0% round 28px)" }}
      >
        <RevealText text={pick(t.contact.heading)} className="t-title max-w-[13ch]" />

        <div className="ct-body">
          <p className="ct-fade t-sub mt-8 max-w-[46ch] text-on-ink-2 lg:mt-10">{pick(t.contact.intro)}</p>

          {/* Sized from the box width so the address always stays on one line. */}
          <a
            href={`mailto:${profile.email}`}
            className="ct-fade group mt-16 block whitespace-nowrap font-semibold leading-none tracking-[-0.05em] lg:mt-28"
            style={{ fontSize: "min(9.5rem, calc((100vw - 2 * var(--gutter) - 2 * var(--cp)) / 10.1))" }}
          >
            <Roll text={profile.email} />
          </a>

          <div className="mt-10 flex flex-col gap-6 border-t border-white/25 pt-8 lg:mt-14 lg:flex-row lg:items-center lg:justify-between">
            <div className="ct-fade flex flex-wrap gap-3">
              <button ref={copyBtn} type="button" onClick={copy} className="btn btn-white btn-sm group" aria-live="polite">
                {copied ? <Check className="size-4" strokeWidth={2.5} /> : <Copy className="size-4" strokeWidth={2.25} />}
                <Roll text={pick(copied ? t.contact.copied : t.contact.copy)} />
              </button>
              <a href={cvPath(lang)} download className="btn btn-white-line btn-sm group">
                <Roll text={pick(t.nav.cv)} />
                <Download className="size-4" strokeWidth={2.25} />
              </a>
            </div>

            <ul className="ct-fade flex flex-wrap items-center gap-x-8 gap-y-3 text-[17px] font-medium">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noreferrer" : undefined}
                    className="roll-host inline-flex items-center gap-1"
                  >
                    <Roll text={l.label} />
                    {l.external && <ArrowUpRight className="size-4" strokeWidth={2.25} />}
                  </a>
                </li>
              ))}
              <li className="text-on-ink-2">{pick(profile.location)}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
