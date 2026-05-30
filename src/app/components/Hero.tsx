import { motion } from "motion/react";
import { Fragment, useRef } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "../data/profile";
import {
  EASE_OUT_EXPO,
  staggerContainer,
  fadeUp,
  useCountUp,
} from "../lib/motion";
import { useLang } from "../i18n/context";
import { MagneticButton } from "./ui/MagneticButton";

/** Render text with simple __HL__...__/HL__ (citron highlight) and __INK__...__/INK__ (ink color) markers. */
function RichText({ source }: { source: string }) {
  // tokenize markers
  const re = /(__HL__|__\/HL__|__INK__|__\/INK__)/g;
  const parts = source.split(re);
  let mode: "default" | "hl" | "ink" = "default";
  return (
    <>
      {parts.map((p, i) => {
        if (p === "__HL__")    { mode = "hl";      return null; }
        if (p === "__/HL__")   { mode = "default"; return null; }
        if (p === "__INK__")   { mode = "ink";     return null; }
        if (p === "__/INK__")  { mode = "default"; return null; }
        if (!p) return null;
        if (mode === "hl") {
          return (
            <span key={i} className="highlight-citron font-medium">
              {p}
            </span>
          );
        }
        if (mode === "ink") {
          return (
            <span key={i} style={{ color: "var(--ink)" }}>
              {p}
            </span>
          );
        }
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

export const CV_DOWNLOAD_PATH = "/Tuna_Bostancibasi_CV_EN_Minimal.pdf";

function WordReveal({
  text,
  delay = 0,
  color,
  className,
}: {
  text: string;
  delay?: number;
  color?: string;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: EASE_OUT_EXPO as any,
      }}
      className={`inline-block ${className ?? ""}`}
      style={{ color }}
    >
      {text}
    </motion.span>
  );
}

function StatCell({
  end,
  suffix,
  label,
  index,
}: {
  end: number;
  suffix?: string;
  label: string;
  index: number;
}) {
  const { ref, val } = useCountUp(end, 1.4);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: EASE_OUT_EXPO as any,
      }}
      className="flex flex-col gap-1 px-5 md:px-7 py-3.5"
      style={{
        borderLeft: index === 0 ? "none" : "1px solid var(--line)",
      }}
    >
      <span className="num-stamp" style={{ color: "var(--ink-4)" }}>
        / {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className="font-display font-semibold leading-none tabular-nums mt-1"
        style={{
          fontSize: "clamp(1.6rem,3vw,2.2rem)",
          letterSpacing: "-0.05em",
          color: "var(--ink)",
        }}
      >
        <span ref={ref}>{Math.round(val)}</span>
        {suffix && <span style={{ color: "var(--cobalt)" }}>{suffix}</span>}
      </div>
      <div
        className="font-sans text-[11px] mt-1"
        style={{ color: "var(--ink-3)" }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t, pick } = useLang();

  return (
    <section ref={ref} id="top" className="relative w-full px-5 md:px-10 pb-6">
      <div className="absolute inset-x-0 top-0 h-[420px] grid-bg pointer-events-none" aria-hidden />

      <div className="max-w-[1240px] mx-auto relative">
        {/* Hero grid — compact */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 pt-4 md:pt-8">
          {/* Headline */}
          <div className="col-span-12 lg:col-span-8">
            <h1
              key={`${pick(t.hero.line1)}-${pick(t.hero.line3Accent)}`}
              className="display-headline"
              style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)" }}
            >
              <span className="block">
                <WordReveal text={pick(t.hero.line1)} />
              </span>
              <span className="block" style={{ color: "var(--ink-3)" }}>
                <WordReveal text={pick(t.hero.line2)} delay={0.16} />
              </span>
              <span className="block">
                {pick(t.hero.line3Prefix) && (
                  <>
                    <WordReveal text={pick(t.hero.line3Prefix)} delay={0.34} />{" "}
                  </>
                )}
                <span
                  className="font-display font-semibold"
                  style={{ color: "var(--cobalt)" }}
                >
                  <WordReveal text={pick(t.hero.line3Accent)} delay={0.44} />
                </span>
              </span>
            </h1>

            {/* Intro — shorter */}
            <motion.p
              key={pick(t.hero.intro)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT_EXPO as any }}
              className="font-sans text-[clamp(0.95rem,1.2vw,1.1rem)] leading-relaxed mt-6 md:mt-8 max-w-xl"
              style={{ color: "var(--ink-2)" }}
            >
              <RichText source={pick(t.hero.intro)} />
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.55, 0.05)}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <motion.div variants={fadeUp(8)}>
                <MagneticButton
                  href={CV_DOWNLOAD_PATH}
                  download
                  strength={0.28}
                  className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-sans text-sm font-medium"
                  style={{ background: "var(--ink)", color: "var(--paper)" }}
                >
                  <Download className="w-4 h-4" />
                  <span>{pick(t.hero.ctaDownloadCV)}</span>
                  <span
                    className="ml-1 inline-flex items-center justify-center w-6 h-6 rounded-full"
                    style={{ background: "var(--cobalt)" }}
                  >
                    <ArrowUpRight className="w-3 h-3 arrow-go" />
                  </span>
                </MagneticButton>
              </motion.div>

              <motion.div variants={fadeUp(8)}>
                <MagneticButton
                  href="#work"
                  strength={0.18}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border font-sans text-sm font-medium"
                  style={{
                    borderColor: "var(--line-strong)",
                    color: "var(--ink)",
                    background: "var(--card-soft)",
                  }}
                >
                  <span>{pick(t.hero.ctaSeeWork)}</span>
                  <span aria-hidden>→</span>
                </MagneticButton>
              </motion.div>

              <motion.a
                variants={fadeUp(8)}
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="tag-mono link-underline ml-1"
              >
                github / @Tunacodin
              </motion.a>
            </motion.div>
          </div>

          {/* Right: portrait card */}
          <div className="col-span-12 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT_EXPO as any }}
              className="bento-card aspect-[4/5] md:aspect-auto md:h-full md:min-h-[420px] relative overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src="/removedbg.png"
                  alt={profile.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                  }}
                />
              </div>
              <div
                className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between"
                style={{
                  background:
                    "linear-gradient(to top, rgba(250,250,247,0.97), transparent)",
                }}
              >
                <div>
                  <div className="tag-mono mb-0.5" style={{ color: "var(--ink-3)" }}>
                    Portrait · 2026
                  </div>
                  <div
                    className="font-display font-semibold text-lg"
                    style={{ color: "var(--ink)", letterSpacing: "-0.03em" }}
                  >
                    Tuna B.
                  </div>
                </div>
                <span
                  className="num-stamp px-2 py-1 rounded"
                  style={{ background: "var(--card)", color: "var(--ink-2)" }}
                >
                  #001
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats — single unified band, sits within same hero grid gap */}
        <div className="mt-4 md:mt-5 grid grid-cols-12 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO as any }}
            className="col-span-12 bento-card grid grid-cols-3 overflow-hidden"
          >
            <StatCell index={0} end={5}  suffix="+" label={pick(t.hero.stats.yearsRn)} />
            <StatCell index={1} end={4}              label={pick(t.hero.stats.appsShipped)} />
            <StatCell index={2} end={2}              label={pick(t.hero.stats.internships)} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
