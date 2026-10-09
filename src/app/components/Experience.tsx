import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/context";
import { experiences } from "../data/experience";
import { profile } from "../data/profile";
import { gsap, MQ, useGSAP } from "../lib/scroll";
import { RevealText } from "./ui/RevealText";

export function Experience() {
  const { t, pick, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const edu = profile.education[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>(".xp-row", root.current).forEach((row) => {
          gsap.from(row.querySelectorAll(".xp-fade"), {
            y: 32,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  const rows = [
    ...experiences.map((x) => ({
      key: x.company,
      period: pick(x.period),
      name: x.company,
      href: x.href,
      sub: [x.role && pick(x.role), pick(x.location)].filter(Boolean).join(" · "),
      body: pick(x.description),
    })),
    {
      key: edu.school,
      period: pick(edu.period),
      name: edu.school,
      href: undefined,
      sub: `${pick(t.experience.education)} · ${pick(edu.place)}`,
      body: pick(edu.degree),
    },
  ];

  return (
    <section ref={root} id="experience" className="px-[var(--gutter)] pb-32 lg:pb-44">
      <RevealText text={pick(t.experience.heading)} className="t-title" />

      <ol className="mt-14 border-b border-line lg:mt-20">
        {rows.map((r) => (
          <li
            key={r.key}
            className="xp-row group relative grid gap-3 border-t border-line py-9 lg:grid-cols-12 lg:gap-x-[var(--gutter)] lg:py-12"
          >
            {/* Ink fill that rises behind the row on hover; bleeds a little past the text column. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-3 inset-y-0 origin-bottom lg:-inset-x-5 scale-y-0 bg-ink transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-y-100"
              style={{ borderRadius: "var(--r-md)" }}
            />
            <p className="xp-fade t-num relative text-[15px] font-medium text-ink-2 transition-colors duration-500 group-hover:text-on-ink-2 lg:col-span-2 lg:pt-2.5">
              {r.period}
            </p>
            <div className="relative transition-colors duration-500 group-hover:text-paper lg:col-span-5">
              <h3 className="xp-fade t-heading">
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2">
                    {r.name}
                    <ArrowUpRight className="mt-[0.12em] size-[0.55em] shrink-0" strokeWidth={2} />
                  </a>
                ) : (
                  r.name
                )}
              </h3>
              <p className="xp-fade mt-3 text-[16px] font-medium">{r.sub}</p>
            </div>
            <p className="xp-fade relative max-w-[60ch] text-[17px] leading-[1.65] text-ink-2 transition-colors duration-500 group-hover:text-on-ink-2 lg:col-span-5 lg:pt-2">
              {r.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
