import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";

export function GitHub() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <Github className="w-16 h-16 mx-auto text-purple-400" />
          
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold">Code & Architecture</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore selected repositories demonstrating modular architecture, clean code structure, and scalable backend design.
            </p>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:border-purple-500/50 rounded-lg transition-colors group"
          >
            <Github className="w-5 h-5" />
            <span>View GitHub Profile</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
