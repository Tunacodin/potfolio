import { motion } from "motion/react";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

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

// Flatten technologies for carousel display
const allTechs = [
  { category: "CORE", items: technologies.core },
  { category: "SUPPORTING", items: technologies.supporting }
];

export function TechStack() {
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
    <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-gray-900 via-gray-800/20 to-gray-900 relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-32 w-64 h-64 rounded-3xl border border-gray-600/10 backdrop-blur-sm"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-64 h-64 rounded-3xl border border-gray-500/5 backdrop-blur-sm"
          animate={{ y: [20, 0, 20] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-gray-400 to-gray-300" />
            <span className="text-sm font-light tracking-widest text-gray-400">TECHNOLOGIES</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
            Tools I work with
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="flex items-center gap-4">
          {/* Left Scroll Button */}
          <motion.button
            onClick={() => scroll("left")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 p-2 rounded-full border border-gray-600 hover:border-gray-400 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-300 rotate-180" />
          </motion.button>

          {/* Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory flex-1 pb-2 no-scrollbar"
          >
            {allTechs.map((techCategory, categoryIndex) => (
              <motion.div
                key={techCategory.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] snap-center"
              >
                <div className="h-full border border-gray-700/40 rounded-2xl p-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm hover:border-gray-500/60 hover:bg-gray-700/20 transition-all duration-300 space-y-6">
                  <h3 className="text-lg font-medium text-gray-400 tracking-wider">
                    {techCategory.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {techCategory.items.map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-3 border border-gray-700/40 rounded-lg hover:border-gray-500/60 bg-gray-900/60 hover:bg-gray-700/40 transition-all duration-300 group cursor-pointer"
                      >
                        <p className="font-light text-gray-300 group-hover:text-white transition-colors text-center text-xs sm:text-sm line-clamp-2">
                          {tech}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <motion.button
            onClick={() => scroll("right")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 p-2 rounded-full border border-gray-600 hover:border-gray-400 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
