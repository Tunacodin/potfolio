import { motion } from "motion/react";
import { profile } from "../data/profile";
import { ArrowUp } from "lucide-react";
import { staggerContainer, fadeUp, useMagnetic } from "../lib/motion";
import { useLang } from "../i18n/context";
import { LanguageToggle } from "./ui/LanguageToggle";

function BackToTop({ label }: { label: string }) {
  const { ref, x, y } = useMagnetic(0.3);
  return (
    <motion.a
      ref={ref as any}
      href="#top"
      whileTap={{ scale: 0.96 }}
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full"
      style={{ background: "var(--citron)", color: "var(--ink)" }}
    >
      <motion.span style={{ x, y, display: "inline-flex" }} className="items-center gap-2">
        <ArrowUp className="w-3 h-3" />
        <span className="font-mono text-[10px] tracking-widest uppercase font-semibold">
          {label}
        </span>
      </motion.span>
    </motion.a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { t, pick } = useLang();

  const elsewhere = [
    { name: "LinkedIn", href: profile.links.linkedin },
    { name: "GitHub",   href: profile.links.github },
    { name: "Website",  href: profile.links.website },
  ];

  const navigate = [
    { name: pick(t.nav.work),       href: "#work" },
    { name: pick(t.nav.stack),      href: "#tools" },
    { name: pick(t.nav.experience), href: "#experience" },
    { name: pick(t.nav.contact),    href: "#contact" },
  ];

  return (
    <footer
      className="relative w-full"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer(0, 0.06)}
        className="max-w-[1240px] mx-auto px-5 md:px-10 py-8 grid grid-cols-12 items-start gap-6 border-t"
        style={{ borderColor: "rgba(255,255,255,0.10)" }}
      >
        {/* Brand */}
        <motion.div variants={fadeUp(8)} className="col-span-12 md:col-span-5">
          <span
            className="font-display font-medium"
            style={{
              fontSize: "0.95rem",
              letterSpacing: "-0.02em",
              color: "var(--paper)",
            }}
          >
            {profile.name}
          </span>
          <span
            className="block font-mono text-[10px] tracking-widest uppercase mt-1"
            style={{ color: "rgba(250,250,247,0.45)" }}
          >
            {pick(t.footer.brandSubtitle)}
          </span>
          <div className="mt-4">
            <LanguageToggle variant="dark" />
          </div>
        </motion.div>

        {/* Elsewhere */}
        <motion.div
          variants={fadeUp(8)}
          className="col-span-6 md:col-span-3 flex flex-col gap-1"
        >
          <span
            className="font-mono text-[10px] tracking-widest uppercase font-semibold mb-1"
            style={{ color: "rgba(250,250,247,0.40)" }}
          >
            {pick(t.footer.elsewhere)}
          </span>
          {elsewhere.map((l) => (
            <motion.a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="font-sans text-[13px]"
              style={{ color: "var(--paper)" }}
            >
              {l.name} <span style={{ color: "rgba(250,250,247,0.35)" }}>↗</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Navigate */}
        <motion.div
          variants={fadeUp(8)}
          className="col-span-6 md:col-span-2 flex flex-col gap-1"
        >
          <span
            className="font-mono text-[10px] tracking-widest uppercase font-semibold mb-1"
            style={{ color: "rgba(250,250,247,0.40)" }}
          >
            {pick(t.footer.navigate)}
          </span>
          {navigate.map((l) => (
            <motion.a
              key={l.name}
              href={l.href}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="font-sans text-[13px]"
              style={{ color: "var(--paper)" }}
            >
              {l.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Back to top */}
        <motion.div
          variants={fadeUp(8)}
          className="col-span-12 md:col-span-2 flex md:justify-end items-start"
        >
          <BackToTop label={pick(t.footer.backToTop)} />
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-3 flex flex-wrap items-center justify-between gap-2">
          <span
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: "rgba(250,250,247,0.40)" }}
          >
            © {year} — {profile.name}
          </span>
          <span
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: "rgba(250,250,247,0.40)" }}
          >
            {pick(t.footer.craftedIn)}
          </span>
        </div>
      </div>
    </footer>
  );
}
