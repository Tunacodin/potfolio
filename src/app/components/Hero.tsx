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
    <section ref={containerRef} className="relative h-screen w-screen overflow-hidden pt-20">
      {/* Geometric 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute -top-1/3 -right-1/4 w-96 h-96 rounded-3xl border border-gray-400/10 backdrop-blur-3xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-1/3 -left-1/4 w-80 h-80 rounded-3xl border border-gray-300/5 backdrop-blur-3xl"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Video Background */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-4xl w-full space-y-8">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-px bg-gradient-to-r from-gray-400 to-transparent" />
            <span className="text-sm md:text-base font-light tracking-widest text-gray-400 uppercase">
              Computer Engineer
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-2"
          >
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tighter text-white"
              animate={{ opacity: [1, 0.95, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              TUNA
            </motion.h1>
            <motion.h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[0.9] tracking-tighter text-gray-300"
              animate={{ opacity: [0.95, 1, 0.95] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              BOSTANCIBAŞI
            </motion.h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-gray-300 max-w-xl font-light leading-relaxed space-y-2"
          >
            <span>Final-year Computer Engineering student at Pamukkale University. Specialized in mobile-first development with React Native and modern web technologies.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 pt-6"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-light rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/50 text-sm tracking-wide"
            >
              Explore Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-gray-500 text-gray-300 hover:text-white font-light rounded-full hover:border-gray-400 hover:bg-white/5 transition-all duration-300 text-sm tracking-wide"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <div className="w-6 h-10 border border-gray-500/60 rounded-full flex items-start justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-1 h-2 bg-gray-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}