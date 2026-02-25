import { motion } from "motion/react";
import { Link } from "react-router";
import { useRef } from "react";
import { projects } from "../data/projects";
import { ChevronRight } from "lucide-react";

export function SelectedWork() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? offset : -offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="work" className="py-24 md:py-32 px-6 bg-gradient-to-b from-gray-900 via-gray-800/20 to-gray-900 relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-3xl border border-gray-600/10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-3xl border border-gray-500/5"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-gray-400 to-gray-300" />
            <span className="text-sm font-light tracking-widest text-gray-400">FEATURED WORK</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
            Selected Projects
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] snap-center"
              >
                <Link to={`/project/${project.id}`} className="block group/card h-full">
                  <div className="overflow-hidden rounded-3xl border border-gray-700/40 hover:border-gray-500/60 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-gray-500/20 transition-all duration-500 h-full flex flex-col">
                    {/* Image Container */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800"
                    >
                      {/* Image Layer */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover/card:opacity-70 transition-opacity duration-500"
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
                            className="absolute inset-0 border-2 border-gray-400/50 rounded-2xl"
                          />
                        </motion.div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover/card:from-black/40 transition-all duration-300" />
                    </motion.div>

                    {/* Content */}
                    <div className="bg-gray-900/80 p-6 md:p-8 space-y-4 flex-1 flex flex-col">
                      <div className="space-y-2 flex-1">
                        <p className="text-xs font-light text-gray-400 tracking-widest uppercase">
                          {project.role}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-medium text-white group-hover/card:text-gray-200 transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-gray-300 leading-relaxed font-light text-sm line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack - Compact */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 border border-gray-600/50 rounded-full text-gray-300 font-light text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-1 text-gray-400 font-light text-xs">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="pt-2 flex items-center gap-1">
                        <span className="text-sm font-light text-gray-400 group-hover/card:text-gray-300 transition-colors">
                          View Project
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover/card:text-gray-300 group-hover/card:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex gap-2 justify-end mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hide scrollbar styling */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}