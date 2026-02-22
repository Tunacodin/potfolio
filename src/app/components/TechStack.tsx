import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const technologies = {
  core: [
    "React Native",
    "Node.js",
    "Express.js",
    "Domain-Driven Design",
    "REST API Design",
    "n8n Automation",
    ".NET",
  ],
  supporting: [
    "Git",
    "Docker",
    "MongoDB",
    "PostgreSQL",
    "JWT Auth",
  ]
};

export function TechStack() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-32 w-64 h-64 rounded-3xl border border-blue-300/20 backdrop-blur-sm"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-64 h-64 rounded-3xl border border-blue-200/15 backdrop-blur-sm"
          animate={{ y: [20, 0, 20] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-blue-400" />
            <span className="text-sm font-light tracking-widest text-gray-600">TECHNOLOGIES</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-black tracking-tight">
            Tools I work with
          </h2>
        </motion.div>

        {/* Core Tech */}
        <div className="space-y-16">
          <motion.div
            style={{ opacity }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 tracking-wider">CORE</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {technologies.core.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="p-4 md:p-6 border border-gray-200/50 rounded-xl hover:border-blue-400/60 bg-gradient-to-br from-white/60 to-gray-50/40 backdrop-blur-sm hover:bg-blue-50/70 hover:shadow-lg hover:shadow-blue-200/30 transition-all duration-400 group cursor-pointer"
                  >
                    <p className="font-medium text-black group-hover:text-blue-700 transition-colors text-center text-sm font-light">
                      {tech}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Supporting Tech */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.3, 0.7, 1], [0.3, 1, 0.3]) }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 tracking-wider">SUPPORTING</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {technologies.supporting.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="p-4 md:p-5 border border-gray-200/40 rounded-xl hover:border-blue-400/50 bg-gradient-to-br from-white/50 to-gray-50/30 backdrop-blur-sm hover:bg-blue-50/60 hover:shadow-lg hover:shadow-blue-200/20 transition-all duration-400 group cursor-pointer"
                  >
                    <p className="font-medium text-black group-hover:text-blue-700 transition-colors text-center text-xs font-light">
                      {tech}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
