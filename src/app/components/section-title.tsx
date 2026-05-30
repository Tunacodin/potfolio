import { motion } from "motion/react";

type SectionTitleProps = {
  line1: string;
  line2: string;
  eyebrow?: string;
  index?: string;
  className?: string;
};

const EASE_OUT_QUART = [0.165, 0.84, 0.44, 1];

export function SectionTitle({ line1, line2, eyebrow, index, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {(eyebrow || index) && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: EASE_OUT_QUART as any }}
          className="flex items-center gap-4"
        >
          {index && (
            <span className="section-num inline-flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--cobalt)" }}
              />
              §{index}
            </span>
          )}
          {eyebrow && (
            <span className="tag-mono">{eyebrow}</span>
          )}
          <span className="flex-1 h-px" style={{ background: "var(--line-strong)" }} />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.42, ease: EASE_OUT_QUART as any, delay: 0.05 }}
        className="display-headline"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
      >
        <span className="block">{line1}</span>
        <span className="block" style={{ color: "var(--ink-3)" }}>
          {line2}
        </span>
      </motion.h2>
    </div>
  );
}
