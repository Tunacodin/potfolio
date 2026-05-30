import { motion } from "motion/react";
import { premiumTools } from "../data/tools";
import type { ToolItem } from "../data/tools";
import {
  EASE_OUT_EXPO,
  staggerContainer,
  fadeUp,
  useSpotlight,
} from "../lib/motion";
import { useLang } from "../i18n/context";

type Variant = "cobalt" | "citron" | "card";

const CATEGORY_VARIANT: Record<keyof typeof premiumTools, { variant: Variant; span: number }> = {
  core:        { variant: "cobalt", span: 7 },
  stateForms:  { variant: "card",   span: 5 },
  backend:     { variant: "card",   span: 5 },
  uiAnimation: { variant: "citron", span: 7 },
  delivery:    { variant: "card",   span: 7 },
  languages:   { variant: "card",   span: 5 },
};

const variantTheme = {
  cobalt: {
    bg: "var(--cobalt)",
    text: "#FFFFFF",
    sub: "rgba(255,255,255,0.72)",
    stamp: "rgba(255,255,255,0.55)",
    chipBg: "rgba(255,255,255,0.12)",
    chipBorder: "rgba(255,255,255,0.20)",
    chipText: "#FFFFFF",
    border: "var(--cobalt)",
  },
  citron: {
    bg: "var(--citron)",
    text: "var(--ink)",
    sub: "rgba(11,12,15,0.68)",
    stamp: "rgba(11,12,15,0.55)",
    chipBg: "rgba(255,255,255,0.55)",
    chipBorder: "rgba(11,12,15,0.10)",
    chipText: "var(--ink)",
    border: "var(--citron-deep)",
  },
  card: {
    bg: "var(--card)",
    text: "var(--ink)",
    sub: "var(--ink-3)",
    stamp: "var(--ink-4)",
    chipBg: "var(--paper)",
    chipBorder: "var(--line-strong)",
    chipText: "var(--ink)",
    border: "var(--line)",
  },
} as const;

function ToolChip({
  tool,
  index,
  theme,
}: {
  tool: ToolItem;
  index: number;
  theme: (typeof variantTheme)[Variant];
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.4,
        delay: 0.1 + index * 0.025,
        ease: EASE_OUT_EXPO as any,
      }}
      whileHover={{
        y: -2,
        scale: 1.04,
        transition: { type: "spring", stiffness: 320, damping: 18 },
      }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-sans text-[12px] font-medium whitespace-nowrap cursor-default border"
      style={{
        background: theme.chipBg,
        borderColor: theme.chipBorder,
        color: theme.chipText,
        willChange: "transform",
      }}
    >
      {tool.image && (
        <img
          src={tool.image}
          alt=""
          aria-hidden
          className="w-3.5 h-3.5 object-contain"
        />
      )}
      {tool.name}
    </motion.span>
  );
}

const spanClass: Record<number, string> = {
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
};

function CategoryCard({
  catKey,
  index,
}: {
  catKey: keyof typeof premiumTools;
  index: number;
}) {
  const cfg = CATEGORY_VARIANT[catKey];
  const items = premiumTools[catKey];
  const theme = variantTheme[cfg.variant];
  const { onMouseMove } = useSpotlight();
  const { t, pick } = useLang();
  const catLabels = t.stack.categories[catKey];

  return (
    <motion.div
      variants={fadeUp(12)}
      onMouseMove={onMouseMove}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`group spotlight relative col-span-12 ${spanClass[cfg.span] ?? "md:col-span-6"} rounded-2xl overflow-hidden p-5 md:p-6 flex flex-col gap-5`}
      style={{
        background: theme.bg,
        color: theme.text,
        border: `1px solid ${theme.border}`,
        boxShadow:
          cfg.variant === "card"
            ? "0 1px 0 rgba(11, 12, 15, 0.02), 0 2px 6px -4px rgba(11, 12, 15, 0.05)"
            : "0 18px 50px -28px rgba(11, 12, 15, 0.30)",
      }}
    >
      {/* Watermark logo for Core (Expo) */}
      {catKey === "core" && (
        <motion.img
          src="/projects_ss/expo.png"
          alt=""
          aria-hidden
          initial={{ opacity: 0, x: 12, y: 12, rotate: -6 }}
          whileInView={{ opacity: 0.16, x: 0, y: 0, rotate: -6 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO as any, delay: 0.2 }}
          className="absolute pointer-events-none select-none"
          style={{
            right: 16,
            bottom: 16,
            width: "clamp(80px, 22%, 140px)",
            height: "auto",
            filter: "brightness(0) invert(1)",
            zIndex: 0,
          }}
        />
      )}

      {/* Top row: number + title + count */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex flex-col gap-1">
          <span
            className="font-mono text-[10px] tracking-widest uppercase font-semibold tabular-nums"
            style={{ color: theme.stamp }}
          >
            / 0{index + 1}
          </span>
          <h3
            className="font-display font-semibold leading-none"
            style={{
              fontSize: "clamp(1.3rem,2vw,1.6rem)",
              letterSpacing: "-0.035em",
            }}
          >
            {pick(catLabels.title)}
          </h3>
          <span
            className="font-sans text-[12px] mt-0.5"
            style={{ color: theme.sub }}
          >
            {pick(catLabels.subtitle)}
          </span>
        </div>
        <span
          className="font-mono text-[10px] tracking-widest uppercase font-semibold px-2 py-1 rounded-full shrink-0"
          style={{
            background: theme.chipBg,
            border: `1px solid ${theme.chipBorder}`,
            color: theme.chipText,
          }}
        >
          {items.length} {pick(t.stack.countSuffix)}
        </span>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-1.5 mt-auto relative z-10">
        {items.map((tool, i) => (
          <ToolChip key={tool.id} tool={tool} index={i} theme={theme} />
        ))}
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const { t, pick } = useLang();
  const allTools = Object.values(premiumTools).flat();

  return (
    <section
      id="tools"
      className="w-full px-5 md:px-10 py-10 md:py-14"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer(0, 0.06)}
          className="flex flex-wrap items-end justify-between gap-3 mb-6"
        >
          <motion.div variants={fadeUp(8)} className="flex items-center gap-3">
            <span className="section-num">{pick(t.stack.label)}</span>
            <h2
              className="font-display font-semibold leading-[0.95]"
              style={{
                fontSize: "clamp(1.4rem,2.4vw,1.8rem)",
                letterSpacing: "-0.035em",
                color: "var(--ink)",
              }}
            >
              {pick(t.stack.headPre)}{" "}
              <span style={{ color: "var(--ink-3)" }}>{pick(t.stack.headPost)}</span>
            </h2>
          </motion.div>
          <motion.span
            variants={fadeUp(8)}
            className="tag-mono"
            style={{ color: "var(--ink-4)" }}
          >
            6 {pick(t.stack.categoryLabel)} · {allTools.length} {pick(t.stack.countSuffix)}
          </motion.span>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer(0, 0.07)}
          className="grid grid-cols-12 gap-3"
        >
          {(Object.keys(premiumTools) as (keyof typeof premiumTools)[]).map((key, idx) => (
            <CategoryCard key={key} catKey={key} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
