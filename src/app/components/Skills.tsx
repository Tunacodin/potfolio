import { motion } from "motion/react";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

const skillCategories = [
  { title: "Frontend", skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Router"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "Authentication", "Database Design"] },
  { title: "DevOps", skills: ["Docker", "GitHub", "CI/CD", "Deployment", "Monitoring"] },
  { title: "Design", skills: ["UI/UX Principles", "Responsive Design", "Figma", "Animation", "Accessibility"] },
];

export function Skills() {
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
      {/* Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 -right-48 w-96 h-96 rounded-3xl border border-gray-600/10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/3 -left-48 w-80 h-80 rounded-3xl border border-gray-500/5"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
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
            <span className="text-sm font-light tracking-widest text-gray-400">CAPABILITIES</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
            Skills & Expertise
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
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] snap-center"
              >
                <div className="h-full border border-gray-700/40 rounded-2xl p-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm hover:border-gray-500/60 hover:bg-gray-700/20 transition-all duration-300 group space-y-6">
                  <h3 className="text-2xl font-light text-white group-hover:text-gray-100">
                    {category.title}
                  </h3>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        className="p-3 bg-gray-900/60 border border-gray-600/40 rounded-lg hover:border-gray-500/60 transition-all duration-300"
                      >
                        <p className="text-gray-300 font-light text-sm line-clamp-1">
                          {skill}
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

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-gray-500 via-gray-400 to-transparent mt-20 origin-left"
        />
      </div>
    </section>
  );
}
