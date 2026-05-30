import { motion } from "motion/react";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { experiences } from "../data/experience";
import { profile } from "../data/profile";
import { staggerContainer, fadeUp, useSpotlight } from "../lib/motion";
import { useLang } from "../i18n/context";

function ExperienceCard({
  exp,
  featured = false,
}: {
  exp: (typeof experiences)[number];
  featured?: boolean;
}) {
  const { onMouseMove } = useSpotlight();
  const { pick } = useLang();
  const period = pick(exp.period);
  const location = pick(exp.location);
  const role = exp.role ? pick(exp.role) : undefined;
  const description = pick(exp.description);
  return (
    <motion.a
      href={exp.href}
      variants={fadeUp(10)}
      onMouseMove={onMouseMove}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`group spotlight bento-card flex flex-col gap-3 ${
        featured ? "p-6 md:p-7" : "p-5 md:p-6"
      }`}
    >
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-baseline gap-3">
          <span
            className="font-display font-semibold leading-none tabular-nums"
            style={{
              fontSize: featured ? "clamp(1.6rem,2.4vw,2rem)" : "1.35rem",
              letterSpacing: "-0.035em",
              color: "var(--cobalt)",
            }}
          >
            {period.split(" ")[0]}
          </span>
          <span className="tag-mono" style={{ color: "var(--ink-4)" }}>
            {location}
          </span>
        </div>
        <motion.span
          whileHover={{ rotate: 45 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="w-8 h-8 rounded-full grid place-items-center shrink-0"
          style={{
            background: "var(--card-soft)",
            color: "var(--ink)",
            border: "1px solid var(--line-strong)",
          }}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.span>
      </div>

      <div className="relative z-10">
        <h3
          className="font-display font-semibold"
          style={{
            fontSize: featured
              ? "clamp(1.4rem,2vw,1.7rem)"
              : "clamp(1.1rem,1.6vw,1.3rem)",
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            lineHeight: 1.05,
          }}
        >
          {exp.company}
        </h3>
        {role && (
          <span
            className="font-mono text-[10px] tracking-widest uppercase font-semibold mt-1.5 inline-block"
            style={{ color: "var(--cobalt)" }}
          >
            / {role}
          </span>
        )}
      </div>

      <p
        className={`font-sans leading-relaxed relative z-10 ${
          featured ? "text-sm line-clamp-4" : "text-xs line-clamp-3"
        }`}
        style={{ color: "var(--ink-3)" }}
      >
        {description}
      </p>
    </motion.a>
  );
}

export function Experience() {
  const { t, pick } = useLang();
  // Heuristic: most recent experience is featured
  const [featured, ...rest] = experiences;
  const edu = profile.education[0];

  return (
    <section id="experience" className="w-full px-5 md:px-10 py-10 md:py-14">
      <div className="max-w-[1240px] mx-auto">
        {/* Soft header (no divider line) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer(0, 0.06)}
          className="flex flex-wrap items-end justify-between gap-3 mb-6"
        >
          <motion.div variants={fadeUp(8)} className="flex items-center gap-3">
            <span className="section-num">{pick(t.experience.label)}</span>
            <h2
              className="font-display font-semibold leading-[0.95]"
              style={{
                fontSize: "clamp(1.4rem,2.4vw,1.8rem)",
                letterSpacing: "-0.035em",
                color: "var(--ink)",
              }}
            >
              {pick(t.experience.headPre)}{" "}
              <span style={{ color: "var(--ink-3)" }}>{pick(t.experience.headPost)}</span>
            </h2>
          </motion.div>
          <motion.span variants={fadeUp(8)} className="chip-cobalt">
            {pick(t.experience.rangeChip)}
          </motion.span>
        </motion.div>

        {/* Intentional 12-col bento */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer(0.04, 0.06)}
          className="grid grid-cols-12 gap-3"
        >
          {/* Featured experience (most recent) */}
          <div className="col-span-12 md:col-span-7">
            <ExperienceCard exp={featured} featured />
          </div>

          {/* Other experience */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
            {rest.map((exp) => (
              <ExperienceCard key={`${exp.company}-${exp.period}`} exp={exp} />
            ))}
          </div>

          {/* Education — full-width horizontal band */}
          <motion.div
            variants={fadeUp(10)}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="col-span-12 bento-card-citron p-5 md:p-6 grid grid-cols-12 items-center gap-4 md:gap-6"
          >
            {/* Left — Section label */}
            <div className="col-span-12 md:col-span-3 flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-full grid place-items-center shrink-0"
                style={{ background: "rgba(11,12,15,0.10)" }}
              >
                <GraduationCap
                  className="w-4 h-4"
                  style={{ color: "var(--ink)" }}
                />
              </span>
              <div className="flex flex-col">
                <span
                  className="font-mono text-[10px] tracking-widest uppercase font-semibold"
                  style={{ color: "var(--ink-2)" }}
                >
                  {pick(t.experience.eduLabel)}
                </span>
                <span
                  className="font-display font-semibold tabular-nums"
                  style={{
                    fontSize: "1.1rem",
                    letterSpacing: "-0.025em",
                    color: "var(--ink)",
                  }}
                >
                  {pick(edu.period)}
                </span>
              </div>
            </div>

            {/* Middle — School + degree */}
            <div className="col-span-12 md:col-span-6">
              <h3
                className="font-display font-semibold"
                style={{
                  fontSize: "clamp(1.2rem,1.8vw,1.5rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                  lineHeight: 1.1,
                }}
              >
                {edu.school}
              </h3>
              <p
                className="font-sans text-[13px] mt-1"
                style={{ color: "var(--ink-2)" }}
              >
                {pick(edu.degree)} · {pick(edu.place)}
              </p>
            </div>

            {/* Right — Languages as soft chips */}
            <div className="col-span-12 md:col-span-3 flex md:justify-end flex-wrap gap-1.5">
              {profile.languages.map((l, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase font-semibold"
                  style={{
                    background: "rgba(11,12,15,0.08)",
                    color: "var(--ink)",
                  }}
                >
                  {pick(l.name)}
                  <span style={{ color: "var(--ink-2)", opacity: 0.7 }}>
                    · {pick(l.level)}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
