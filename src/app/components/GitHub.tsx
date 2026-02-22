import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

export function GitHub() {
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12 border border-gray-800 rounded-lg p-12 md:p-20 hover:border-blue-600/50 hover:bg-blue-600/5 transition-all duration-300"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-blue-400" />
              <span className="text-sm font-light tracking-widest text-gray-400">CODE & ARCHITECTURE</span>
              <div className="w-8 h-px bg-gradient-to-l from-blue-600 to-blue-400" />
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 group"
          >
            View GitHub Profile
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
