import { motion } from "motion/react";
import { SectionTitle } from "./section-title";
import { profile } from "../data/profile";
import { GraduationCap, Languages as LangIcon } from "lucide-react";

const EASE_OUT_QUART = [0.165, 0.84, 0.44, 1];

export function Education() {
  return (
    <section
      id="education"
      className="w-full px-5 md:px-10 py-32 md:py-40"
    >
      <div className="max-w-[1240px] mx-auto">
        <SectionTitle
          index="04"
          eyebrow="Background / academic"
          line1="What I've"
          line2="studied."
        />

        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-4 md:gap-6">
          {/* Big school card */}
          {profile.education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE_OUT_QUART as any }}
              className="col-span-12 md:col-span-8 bento-card-cobalt p-8 md:p-10 flex flex-col justify-between min-h-[280px]"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className="font-mono text-[11px] tracking-widest uppercase font-semibold inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.18)", color: "#FFFFFF" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--citron)" }}
                  />
                  {edu.period}
                </span>
                <GraduationCap className="w-8 h-8" style={{ color: "var(--citron)" }} />
              </div>

              <div className="mt-12">
                <h3
                  className="font-display font-semibold leading-[0.95]"
                  style={{
                    color: "#FFFFFF",
                    fontSize: "clamp(2rem,4.5vw,3.6rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {edu.school}
                </h3>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mt-4">
                  {edu.degree && (
                    <span
                      className="font-sans text-base font-medium"
                      style={{ color: "var(--citron)" }}
                    >
                      {edu.degree}
                    </span>
                  )}
                  <span
                    className="font-mono text-[11px] tracking-widest uppercase"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    · {edu.place}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Languages card */}
          {profile.languages && profile.languages.length > 0 && (
            <motion.aside
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: 0.1, ease: EASE_OUT_QUART as any }}
              className="col-span-12 md:col-span-4 bento-card p-7 md:p-8 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="tag-mono">Side note</span>
                <LangIcon className="w-5 h-5" style={{ color: "var(--cobalt)" }} />
              </div>

              <h4
                className="font-display font-semibold mt-6"
                style={{
                  fontSize: "clamp(1.4rem,2vw,1.8rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                }}
              >
                Languages.
              </h4>

              <div className="mt-6 flex flex-col gap-px">
                {profile.languages.map((lang, idx) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.18 + idx * 0.06,
                      duration: 0.32,
                      ease: EASE_OUT_QUART as any,
                    }}
                    className="flex items-baseline justify-between py-4 border-b"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span
                      className="font-display font-medium text-lg"
                      style={{ color: "var(--ink)", letterSpacing: "-0.02em" }}
                    >
                      {lang.name}
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: lang.level === "Native" ? "var(--citron)" : "var(--cobalt-soft)",
                        color: lang.level === "Native" ? "var(--ink)" : "var(--cobalt-deep)",
                        fontWeight: 600,
                      }}
                    >
                      {lang.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </section>
  );
}
