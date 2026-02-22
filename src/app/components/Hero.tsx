import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import videoFile from "./videos/0221.mov";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
              Tuna
              <br />
              <span className="text-purple-400">BOSTANCIBAŞI</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400">
              Mobile-First Product Engineer
            </p>
          </div>

          <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
            I build scalable mobile applications with clean backend architecture and automation-driven workflows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#work"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 transition-colors group"
            >
              View Selected Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-white/20 hover:border-purple-500/50 rounded-lg transition-colors text-center"
            >
              Book a Call
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <video
              src={videoFile}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}