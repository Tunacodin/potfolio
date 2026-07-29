import { motion } from "motion/react";
import { projects, type Project } from "../data/projects";
import { ArrowUpRight } from "lucide-react";
import { EASE_OUT_QUART, staggerContainer, fadeUp } from "../lib/motion";
import { useLang } from "../i18n/context";

/* ────────────────────────────────────────────── */
/* PhoneMockup — vertical iPhone-style frame      */
/* ────────────────────────────────────────────── */
function PhoneMockup({
  src,
  mode,
  width = 220,
  fit = "cover",
}: {
  src: string;
  mode: "dark" | "light";
  width?: number;
  fit?: "cover" | "contain";
}) {
  const bezel = "#0B0C0F";
  const innerBg = mode === "dark" ? "#0B0C0F" : "#FFFFFF";
  const islandWidth = width * 0.32;
  const statusBarHeight = Math.round(width * 0.115);

  return (
    <div
      className="relative select-none"
      style={{
        width,
        aspectRatio: "9 / 19.5",
        borderRadius: 38,
        background: bezel,
        padding: 5,
        boxShadow:
          "0 30px 60px -22px rgba(11,12,15,0.40), 0 10px 22px -12px rgba(11,12,15,0.22), inset 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      <span aria-hidden className="absolute" style={{ left: -2, top: "20%", width: 2, height: 28, background: bezel, borderRadius: 2 }} />
      <span aria-hidden className="absolute" style={{ left: -2, top: "30%", width: 2, height: 50, background: bezel, borderRadius: 2 }} />
      <span aria-hidden className="absolute" style={{ right: -2, top: "28%", width: 2, height: 70, background: bezel, borderRadius: 2 }} />

      <div
        className="relative w-full h-full overflow-hidden"
        style={{ borderRadius: 33, background: innerBg }}
      >
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: fit,
            objectPosition: "center top",
          }}
          loading="lazy"
          decoding="async"
        />
        {/* Status-bar cover — hides the baked-in status bar/notch, plain white band */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 z-[9]"
          style={{ height: statusBarHeight, background: innerBg }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{
            top: 8,
            width: islandWidth,
            height: 22,
            background: "#0B0C0F",
            borderRadius: 14,
          }}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/* BrowserMockup — macOS-style desktop/web window */
/* ────────────────────────────────────────────── */
function BrowserMockup({
  src,
  mode,
  width = 420,
  fit = "cover",
}: {
  src: string;
  mode: "dark" | "light";
  width?: number;
  fit?: "cover" | "contain";
}) {
  const bezel = "#0B0C0F";
  const innerBg = mode === "dark" ? "#0B0C0F" : "#FFFFFF";
  const barHeight = Math.round(width * 0.058);
  const dot = Math.max(6, Math.round(width * 0.018));

  return (
    <div
      className="relative select-none"
      style={{
        width,
        borderRadius: 16,
        background: bezel,
        padding: 4,
        boxShadow:
          "0 30px 60px -22px rgba(11,12,15,0.40), 0 10px 22px -12px rgba(11,12,15,0.22), inset 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="relative w-full overflow-hidden flex flex-col"
        style={{ borderRadius: 12, background: innerBg }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 shrink-0"
          style={{
            height: barHeight,
            paddingLeft: 12,
            paddingRight: 12,
            background: mode === "dark" ? "#15171C" : "#F1F1F3",
            borderBottom: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          }}
        >
          <span style={{ width: dot, height: dot, borderRadius: dot, background: "#FF5F57" }} />
          <span style={{ width: dot, height: dot, borderRadius: dot, background: "#FEBC2E" }} />
          <span style={{ width: dot, height: dot, borderRadius: dot, background: "#28C840" }} />
        </div>
        {/* Viewport — image at its natural ratio, full width, never cropped */}
        <img
          src={src}
          alt=""
          className="block w-full h-auto"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/* PhoneStage — quiet fade-rise, no rotation/3D   */
/* ────────────────────────────────────────────── */
function PhoneStage({ project }: { project: Project }) {
  const count = project.screenshots.length;
  const webShots = project.webShots ?? [];
  const mockup = project.mockup;
  const angled = project.mockupAngled;

  // Fully-opaque spring slide-in — no opacity fade. Each mockup flies in from a
  // direction (fx/fy offset) and settles into place with a subtle overshoot.
  const MockupImg = ({ src, h, x, y, z, delay, fx = 0, fy = 60, rot = 0 }: { src: string; h: number; x: number; y: number; z: number; delay: number; fx?: number; fy?: number; rot?: number }) => (
    <motion.div
      className="absolute"
      initial={{ x: x + fx, y: y + fy, rotate: rot }}
      whileInView={{ x, y, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 78, damping: 14, delay }}
      style={{ zIndex: z, height: h }}
    >
      <img src={src} alt="" className="h-full w-auto object-contain select-none" draggable={false} loading="lazy" decoding="async" />
    </motion.div>
  );

  // Pre-composited device mockups (phone frame baked in) — angled variant in front, straight behind
  if (mockup || angled) {
    // Mixed: browser hero + angled/straight phones (web + mobile projects)
    if (webShots.length > 0) {
      return (
        <div className="relative h-[380px] md:h-[440px] flex items-center justify-center">
          <motion.div
            className="absolute"
            initial={{ x: -132, y: 90 }}
            whileInView={{ x: -132, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 78, damping: 15 }}
            style={{ zIndex: 1 }}
          >
            <BrowserMockup src={webShots[0]} mode={project.mode} width={410} />
          </motion.div>
          {mockup && <MockupImg src={mockup} h={300} x={110} y={-30} fx={130} fy={70} rot={6} z={2} delay={0.16} />}
          {angled && <MockupImg src={angled} h={360} x={228} y={14} fx={170} fy={90} rot={9} z={3} delay={0.08} />}
        </div>
      );
    }
    // Mobile-only: angled phone in front, straight phone behind
    return (
      <div className="relative h-[380px] md:h-[440px] flex items-center justify-center">
        {mockup && <MockupImg src={mockup} h={360} x={-120} y={-16} from={4} z={2} delay={0.12} />}
        {angled && <MockupImg src={angled} h={430} x={70} y={10} from={30} z={3} delay={0} />}
      </div>
    );
  }

  // Mixed: browser hero + up to 2 phones overlapping (fallback — raw screenshots)
  if (webShots.length > 0) {
    const phones = project.screenshots.slice(0, 2);
    const phonePos = [
      { x: 150, y: 52, from: 66, z: 3, w: 150 },
      { x: 250, y: -46, from: -32, z: 2, w: 132 },
    ];
    return (
      <div className="relative h-[380px] md:h-[440px] flex items-center justify-center">
        <motion.div
          className="absolute"
          initial={{ x: -66, y: 16, scale: 0.94 }}
          whileInView={{ x: -66, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_OUT_QUART as any }}
          style={{ zIndex: 1 }}
        >
          <BrowserMockup src={webShots[0]} mode={project.mode} width={380} fit={project.imageFit ?? "cover"} />
        </motion.div>
        {phones.map((src, i) => {
          const p = phonePos[i];
          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{ x: p.x, y: p.from, scale: 0.94 }}
              whileInView={{ x: p.x, y: p.y, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE_OUT_QUART as any }}
              style={{ zIndex: p.z }}
            >
              <PhoneMockup src={src} mode={project.mode} width={p.w} fit={project.imageFit} />
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Single phone
  if (count === 1) {
    return (
      <div className="relative h-[380px] md:h-[440px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT_QUART as any }}
        >
          <PhoneMockup src={project.screenshots[0]} mode={project.mode} width={220} fit={project.imageFit} />
        </motion.div>
      </div>
    );
  }

  // 3 phones — final positions set as layout, only opacity + tiny rise on entry
  const positions = [
    { x: -130, y: 20,  rotate: -10, z: 1, scale: 0.92 },
    { x: 0,    y: -14, rotate: 0,   z: 3, scale: 1.0  },
    { x: 130,  y: 20,  rotate: 10,  z: 1, scale: 0.92 },
  ];

  return (
    <div className="relative h-[380px] md:h-[440px] flex items-center justify-center">
      {project.screenshots.map((src, i) => {
        const p = positions[i] ?? positions[positions.length - 1];
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: p.x,
              y: p.y + 18,
              rotate: p.rotate,
              scale: p.scale * 0.95,
            }}
            whileInView={{
              x: p.x,
              y: p.y,
              rotate: p.rotate,
              scale: p.scale,
            }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.65,
              delay: i * 0.08,
              ease: EASE_OUT_QUART as any,
            }}
            style={{ zIndex: p.z }}
          >
            <PhoneMockup src={src} mode={project.mode} width={180} fit={project.imageFit} />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────── */
/* ProjectShowcase — info + phones, alternating   */
/* ────────────────────────────────────────────── */
function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const isReverse = index % 2 === 1;
  const { t, pick } = useLang();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer(0, 0.06)}
      className="relative grid grid-cols-12 gap-6 md:gap-10 items-center py-8 md:py-12"
    >
      {/* Info column */}
      <motion.div
        variants={fadeUp(10)}
        className={`col-span-12 md:col-span-5 ${isReverse ? "md:order-2" : ""}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <span
            className="font-mono text-[12px] tracking-wider uppercase font-semibold"
            style={{ color: project.brand }}
          >
            / {String(index + 1).padStart(2, "0")}
          </span>
          {project.status && (
            <span
              lang="en"
              className="font-mono text-[12px] tracking-wider uppercase font-semibold inline-flex items-center gap-1.5"
              style={{ color: "var(--ink-3)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: project.brand }}
              />
              {pick(project.status)}
            </span>
          )}
        </div>

        <h3
          className="font-display font-semibold leading-[0.92]"
          style={{
            fontSize: "clamp(1.7rem,3.6vw,2.6rem)",
            letterSpacing: "-0.04em",
            color: "var(--ink)",
          }}
        >
          {project.title}.
        </h3>

        <p
          className="font-display font-medium mt-2"
          style={{
            fontSize: "clamp(1rem,1.4vw,1.2rem)",
            letterSpacing: "-0.02em",
            color: "var(--ink-3)",
          }}
        >
          {pick(project.tagline)}
        </p>

        <p
          className="font-sans text-sm leading-relaxed mt-3 max-w-md"
          style={{ color: "var(--ink-2)" }}
        >
          {pick(project.description)}
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <span className="tag-mono pt-1 w-12 shrink-0" style={{ color: "var(--ink-4)" }}>
              {pick(t.work.roleLabel)}
            </span>
            <span className="font-sans text-sm" style={{ color: "var(--ink)" }}>
              {pick(project.role)}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="tag-mono pt-1 w-12 shrink-0" style={{ color: "var(--ink-4)" }}>
              {pick(t.work.stackLabel)}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  lang="en"
                  className="font-mono text-[12px] tracking-wide uppercase px-2 py-0.5 border"
                  style={{
                    color: "var(--ink-2)",
                    borderColor: "var(--line-strong)",
                    background: "var(--card)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {project.href && project.href !== "#" && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 mt-5 pl-2 pr-4 py-2 rounded-full font-sans text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:outline-none"
            style={{
              color: "#FFFFFF",
              background: project.brand,
            }}
          >
            {project.icon && (
              <img
                src={project.icon}
                alt=""
                aria-hidden
                className="w-6 h-6 rounded-md shrink-0"
              />
            )}
            <span>
              {pick(t.work.visitSite).replace("{title}", project.title)}
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </motion.div>

      {/* Phone stage */}
      <motion.div
        variants={fadeUp(10)}
        className={`col-span-12 md:col-span-7 relative ${isReverse ? "md:order-1" : ""}`}
      >
        <PhoneStage project={project} />
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────── */
/* SelectedWork — section wrapper                 */
/* ────────────────────────────────────────────── */
export function SelectedWork() {
  const { t, pick } = useLang();
  return (
    <section id="work" className="w-full px-5 md:px-10 py-10 md:py-14 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer(0, 0.06)}
          className="flex flex-wrap items-end justify-between gap-4 pb-3 border-b"
          style={{ borderColor: "var(--line-strong)" }}
        >
          <motion.div variants={fadeUp(8)}>
            <div className="flex items-center gap-3 mb-2">
              <span className="section-num">{pick(t.work.label)}</span>
              <span className="tag-mono" style={{ color: "var(--ink-4)" }}>
                {projects.length} · {pick(t.work.badge)}
              </span>
            </div>
            <h2
              className="font-display font-semibold leading-[0.92]"
              style={{
                fontSize: "clamp(1.8rem,4vw,3rem)",
                letterSpacing: "-0.04em",
                color: "var(--ink)",
              }}
            >
              {pick(t.work.headPre)}{" "}
              <span style={{ color: "var(--ink-3)" }}>{pick(t.work.headPost)}</span>
            </h2>
          </motion.div>
        </motion.div>

        <div>
          {projects.map((project, i) => (
            <div
              key={project.id}
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
            >
              <ProjectShowcase project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
