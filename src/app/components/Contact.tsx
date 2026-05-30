import { motion } from "motion/react";
import { profile } from "../data/profile";
import { ArrowUpRight, Linkedin, Github, Globe } from "lucide-react";
import {
  EASE_OUT_EXPO,
  staggerContainer,
  fadeUp,
  useMagnetic,
  useSpotlight,
} from "../lib/motion";
import { useLang } from "../i18n/context";

function MagneticEmail() {
  const { ref, x, y } = useMagnetic(0.22);
  const spot = useSpotlight();
  const { t, pick } = useLang();
  return (
    <motion.a
      ref={ref as any}
      href={`mailto:${profile.email}`}
      whileTap={{ scale: 0.985 }}
      onMouseMove={spot.onMouseMove}
      className="group spotlight relative block w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <motion.div
        style={{ x, y }}
        className="flex items-center justify-between gap-4 px-6 md:px-8 py-6 md:py-7"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span
            className="hidden sm:inline-block w-2 h-2 rounded-full shrink-0"
            style={{
              background: "var(--citron)",
              boxShadow: "0 0 0 6px rgba(214,224,79,0.18)",
            }}
          />
          <div className="flex flex-col min-w-0">
            <span
              className="font-mono text-[10px] tracking-widest uppercase font-semibold"
              style={{ color: "rgba(250,250,247,0.55)" }}
            >
              {pick(t.contact.dropALine)}
            </span>
            <span
              className="font-display font-medium truncate"
              style={{
                fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
                letterSpacing: "-0.025em",
                color: "var(--paper)",
              }}
            >
              {profile.email}
            </span>
          </div>
        </div>
        <motion.span
          whileHover={{ rotate: 45 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full grid place-items-center"
          style={{ background: "var(--citron)" }}
        >
          <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" style={{ color: "var(--ink)" }} />
        </motion.span>
      </motion.div>
    </motion.a>
  );
}

export function Contact() {
  const { t, pick, lang } = useLang();
  const marqueeWords = t.contact.marquee[lang];

  const metaItems = [
    { label: pick(t.contact.meta.region),   value: pick(profile.location),         href: "#" },
    { label: pick(t.contact.meta.phone),    value: profile.phone,                  href: `tel:${profile.phone.replace(/\D/g, "")}` },
    { label: pick(t.contact.meta.response), value: pick(t.contact.metaValues.under24h), href: "#" },
    { label: pick(t.contact.meta.status),   value: pick(t.contact.metaValues.open),     href: "#" },
  ];

  const socials = [
    { Icon: Linkedin, name: "LinkedIn", href: profile.links.linkedin, tag: pick(t.contact.socials.linkedin) },
    { Icon: Github,   name: "GitHub",   href: profile.links.github,   tag: pick(t.contact.socials.github)   },
    { Icon: Globe,    name: "Website",  href: profile.links.website,  tag: pick(t.contact.socials.website)  },
  ];

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      {/* Top marquee */}
      <div
        className="relative py-3 border-y marquee-wrap"
        style={{ borderColor: "rgba(255,255,255,0.10)" }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={i}
              className="font-display font-medium inline-flex items-center gap-5 mx-7"
              style={{
                fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
                letterSpacing: "-0.02em",
                color:
                  i % 4 === 1
                    ? "var(--citron)"
                    : "rgba(250,250,247,0.65)",
              }}
            >
              {w}
              <span
                aria-hidden
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background:
                    i % 4 === 1 ? "var(--citron)" : "rgba(250,250,247,0.35)",
                }}
              />
            </span>
          ))}
        </div>
      </div>

      <div className="relative max-w-[1240px] mx-auto px-5 md:px-10 py-14 md:py-20">
        {/* Meta strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer(0, 0.06)}
          className="flex flex-wrap items-center justify-between gap-4 mb-10 md:mb-14"
        >
          <motion.span
            variants={fadeUp(8)}
            className="font-mono text-[10px] tracking-widest uppercase font-semibold"
            style={{ color: "rgba(250,250,247,0.55)" }}
          >
            {pick(t.contact.label)}
          </motion.span>
          <motion.span
            variants={fadeUp(8)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(214,224,79,0.12)",
              border: "1px solid rgba(214,224,79,0.30)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--citron)" }}
            />
            <span
              className="font-mono text-[10px] tracking-widest uppercase font-semibold"
              style={{ color: "var(--citron)" }}
            >
              {pick(t.contact.booking)}
            </span>
          </motion.span>
        </motion.div>

        {/* Subtitle + CTA grid */}
        <div className="mt-2 grid grid-cols-12 gap-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE_OUT_EXPO as any }}
            className="col-span-12 lg:col-span-5 font-sans text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(250,250,247,0.70)" }}
          >
            {pick(t.contact.intro)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 1.05, ease: EASE_OUT_EXPO as any }}
            className="col-span-12 lg:col-span-7"
          >
            <MagneticEmail />
          </motion.div>
        </div>

        {/* Quick meta grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer(0.25, 0.06)}
          className="mt-10 md:mt-14 grid grid-cols-12 gap-3"
        >
          {metaItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              variants={fadeUp(10)}
              whileHover={{ y: -3 }}
              className="col-span-6 md:col-span-3 p-4 rounded-xl border flex flex-col gap-1"
              style={{
                borderColor: "rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <span
                className="font-mono text-[10px] tracking-widest uppercase font-semibold"
                style={{ color: "rgba(250,250,247,0.45)" }}
              >
                {item.label}
              </span>
              <span
                className="font-display font-medium truncate"
                style={{
                  fontSize: "0.95rem",
                  letterSpacing: "-0.02em",
                  color: "var(--paper)",
                }}
              >
                {item.value}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Social link row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer(0.05, 0.06)}
          className="mt-3 grid grid-cols-12 gap-3"
        >
          {socials.map(({ Icon, name, href, tag }) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp(10)}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group col-span-12 md:col-span-4 p-5 rounded-xl border flex items-center justify-between gap-3 relative overflow-hidden"
              style={{
                borderColor: "rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-full grid place-items-center shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: "var(--paper)" }} />
                </span>
                <div className="flex flex-col">
                  <span
                    className="font-display font-semibold"
                    style={{
                      fontSize: "1rem",
                      letterSpacing: "-0.02em",
                      color: "var(--paper)",
                    }}
                  >
                    {name}
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-widest uppercase font-semibold"
                    style={{ color: "rgba(250,250,247,0.45)" }}
                  >
                    {tag}
                  </span>
                </div>
              </div>
              <motion.span
                whileHover={{ rotate: 45, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="w-9 h-9 rounded-full grid place-items-center shrink-0"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "var(--paper)" }} />
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
