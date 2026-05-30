import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Menu, X, Mail, Phone, MapPin } from "lucide-react";
import { profile } from "../data/profile";
import { useLang } from "../i18n/context";
import { LanguageToggle } from "./ui/LanguageToggle";

const EASE_OUT_QUART = [0.165, 0.84, 0.44, 1];

export function Header() {
  const { t, pick } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: pick(t.nav.work),       href: "#work" },
    { label: pick(t.nav.stack),      href: "#tools" },
    { label: pick(t.nav.experience), href: "#experience" },
    { label: pick(t.nav.contact),    href: "#contact" },
  ];

  const contactItems = [
    { Icon: Mail,   label: profile.email,        href: `mailto:${profile.email}` },
    { Icon: Phone,  label: profile.phone,        href: `tel:${profile.phone.replace(/\D/g, "")}` },
    { Icon: MapPin, label: pick(profile.location), href: "#" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        background: scrolled
          ? "rgba(250, 250, 247, 0.82)"
          : "rgba(250, 250, 247, 0.5)",
        backdropFilter: "blur(18px) saturate(140%)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background 200ms, border-color 200ms",
      }}
    >
      <nav className="max-w-[1240px] mx-auto px-5 md:px-10 py-3 flex items-center justify-between gap-6">
        {/* Left: nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.04, ease: EASE_OUT_QUART as any }}
            >
              <a
                href={link.href}
                className="font-sans text-[13px] px-3 py-1.5 rounded-full transition-all"
                style={{ color: "var(--ink-2)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--card)";
                  e.currentTarget.style.color = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--ink-2)";
                }}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Right: contact details + language toggle (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {contactItems.map(({ Icon, label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: EASE_OUT_QUART as any }}
              whileHover={{ y: -1 }}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors"
              style={{ color: "var(--ink-2)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--card)";
                e.currentTarget.style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--ink-2)";
              }}
            >
              <Icon className="w-3 h-3" style={{ color: "var(--ink-4)" }} />
              <span className="font-sans text-[12px]">{label}</span>
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: EASE_OUT_QUART as any }}
            className="ml-2"
          >
            <LanguageToggle />
          </motion.div>
        </div>

        {/* Mobile: brand stub + toggle + menu */}
        <span className="md:hidden tag-mono">{pick(t.header.altMobileBrand)}</span>
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <motion.button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 rounded-md"
            style={{ color: "var(--ink)" }}
            aria-label="Toggle menu"
            transition={{ duration: 0.12 }}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </nav>

      {/* Scroll progress bar */}
      <motion.div
        className="h-[2px] origin-left"
        style={{ scaleX, background: "var(--cobalt)" }}
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: EASE_OUT_QUART as any }}
            className="md:hidden overflow-hidden border-t"
            style={{
              background: "rgba(250, 250, 247, 0.98)",
              backdropFilter: "blur(20px)",
              borderColor: "var(--line)",
            }}
          >
            <ul className="max-w-7xl mx-auto px-5 py-4 flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.24, ease: EASE_OUT_QUART as any }}
                  className="border-b last:border-b-0"
                  style={{ borderColor: "var(--line)" }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-4"
                  >
                    <span
                      className="font-display font-medium text-2xl"
                      style={{ color: "var(--ink)", letterSpacing: "-0.02em" }}
                    >
                      {link.label}
                    </span>
                    <span className="text-2xl" style={{ color: "var(--cobalt)" }}>
                      ↗
                    </span>
                  </a>
                </motion.li>
              ))}

              <li className="mt-4 pt-4 border-t" style={{ borderColor: "var(--line)" }}>
                <div className="flex flex-col gap-2">
                  {contactItems.map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-1"
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: "var(--ink-4)" }} />
                      <span className="font-sans text-sm" style={{ color: "var(--ink)" }}>
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
