import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import videoFile from "./videos/0221.mov";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-screen overflow-hidden">
      {/* Geometric 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute -top-1/3 -right-1/4 w-96 h-96 rounded-3xl border border-blue-500/10 backdrop-blur-3xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-1/3 -left-1/4 w-80 h-80 rounded-3xl border border-blue-400/5 backdrop-blur-3xl"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Video Background with Parallax */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <video
          src={videoFile}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Sophisticated Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>
      
      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-5xl w-full space-y-8">
          {/* Subtitle Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-px bg-gradient-to-r from-blue-500 to-blue-300" />
            <span className="text-sm md:text-base font-light tracking-widest text-gray-300">
              MOBILE-FIRST ENGINEER
            </span>
          </motion.div>

          {/* Main Title - Gradient Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light leading-tight text-white tracking-tight">
              TUNA <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                BOSTANCIBAŞI
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed"
          >
            Building scalable mobile applications with domain-driven architecture and clean backend systems.
          </motion.p>

          {/* CTA Buttons - Eventis Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 pt-8"
          >
            <a
              href="#work"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-gray-500 text-white font-medium rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Eventis Style */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border border-white/50 rounded-full flex items-start justify-center pt-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}