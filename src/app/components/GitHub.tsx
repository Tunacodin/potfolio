import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

export function GitHub() {
  return (
    <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-gray-900 via-gray-800/20 to-gray-900 relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-3xl border border-gray-600/10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-72 h-72 rounded-3xl border border-gray-500/5"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12 border border-gray-700/40 rounded-2xl p-12 md:p-20 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm hover:border-gray-500/60 hover:bg-gray-700/20 transition-all duration-500"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-gradient-to-r from-gray-400 to-gray-300" />
              <span className="text-sm font-light tracking-widest text-gray-400">CODE & ARCHITECTURE</span>
              <div className="w-8 h-px bg-gradient-to-l from-gray-400 to-gray-300" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Explore My Repository
            </h2>
          </div>

          <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Demonstrating modular architecture, clean code structure, and scalable backend design patterns.
          </p>

          <motion.a
            href="https://github.com/Tunacodin"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300 group"
          >
            View GitHub Profile
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
