import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { useRef } from "react";
import { projects } from "../data/projects";

export function SelectedWork() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <section ref={sectionRef} id="work" className="py-32 px-6 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-3xl border border-blue-300/20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-3xl border border-blue-200/15"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
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
            <span className="text-sm font-light tracking-widest text-gray-600">SELECTED WORK</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-black tracking-tight">
            Featured Projects
          </h2>
        </motion.div>

        {/* Projects */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              style={{ opacity: textOpacity }}
            >
              <Link to={`/project/${project.id}`} className="block group">
                <div className="overflow-hidden rounded-2xl border border-gray-200/50 hover:border-blue-400/60 bg-gradient-to-br from-white/50 to-gray-50/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group relative">
                  {/* Featured Image / Video Container */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="relative h-80 md:h-96 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
                  >
                    {/* Image Layer */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover absolute inset-0 group-hover:opacity-70 transition-opacity duration-500"
                    />
                    
                    {/* Video Overlay - Shows on Hover */}
                    {project.video && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                      >
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 border-2 border-blue-400/50 rounded-lg"
                        />
                      </motion.div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/20 transition-all duration-300" />
                  </motion.div>

                  {/* Content */}
                  <div className="bg-white p-8 md:p-10 space-y-6">
                    <div className="space-y-2">
                      <p className="text-xs font-light text-blue-600 tracking-widest uppercase">
                        {project.role}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-medium text-black group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-gray-700 leading-relaxed font-light">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 py-4 border-y border-gray-200">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-600 mt-2 rounded-full flex-shrink-0" />
                          <p className="text-gray-700 font-light">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 border border-gray-300 rounded-full text-gray-700 font-light text-xs hover:border-blue-400 hover:text-blue-600 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-2">
                      <span className="inline-block font-light text-blue-600 group-hover:text-blue-700 transition-colors">
                        View Case Study →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}