import { motion } from "motion/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 border-t-4 border-black bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="grid md:grid-cols-3 gap-12">
            {/* Branding */}
            <div className="space-y-2">
              <h3 className="text-3xl font-black">TB</h3>
              <p className="text-sm font-bold text-gray-400">
                Mobile-First Product Engineer
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <p className="font-black text-white text-sm tracking-widest">QUICK LINKS</p>
              <div className="space-y-2">
                {["Work", "About", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-sm font-bold hover:text-purple-400 transition-colors"
                  >
                    → {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="space-y-3">
              <p className="font-black text-white text-sm tracking-widest">SOCIAL</p>
              <div className="space-y-2">
                {[
                  { label: "GitHub", url: "https://github.com/tunabostanci" },
                  { label: "LinkedIn", url: "https://linkedin.com/in/tunabostanci" },
                  { label: "Email", url: "mailto:contact@tunabostanci.com" }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-bold hover:text-purple-400 transition-colors"
                  >
                    → {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-white/20 pt-8" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
            <p className="font-bold text-white">
              © {currentYear} Tuna Bostancıbaşı. All rights reserved.
            </p>
            <p className="font-bold text-gray-400">
              Built with React, TypeScript, Tailwind CSS & Framer Motion
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
