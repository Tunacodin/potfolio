import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Home, FolderOpen, GraduationCap, Briefcase, Wrench, PenLine } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#", icon: Home },
  { label: "Projects", href: "#work", icon: FolderOpen },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Education", href: "#education", icon: GraduationCap },
  { label: "Tools", href: "#tools", icon: Wrench },
  { label: "Blog", href: "#blog", icon: PenLine },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] border-b backdrop-blur-md"
      style={{
        background: "rgba(10, 10, 10, 0.9)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center relative">
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                aria-label={link.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        <motion.button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 p-2 text-white"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/[0.06]"
            style={{ background: "rgba(10, 10, 10, 0.98)" }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-sm font-light text-[#888] hover:text-white py-2 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
