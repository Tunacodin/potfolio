import { motion } from "motion/react";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

const experiences = [
  {
    company: "Tipbox",
    role: "Mobile & Backend Developer",
    type: "Part-time",
    period: "2023 - Present",
    description: [
      "Developed and maintained mobile features",
      "Designed backend domain logic",
      "Collaborated with distributed teams"
    ]
  },
  {
    company: "Divizyon",
    role: "Community & Digital Projects",
    type: "Volunteer",
    period: "2022 - Present",
    description: [
      "Contributed to digital product initiatives",
      "Worked in creative and technical coordination"
    ]
  }
];

export function Experience() {
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
          className="absolute top-1/3 -right-48 w-80 h-80 rounded-3xl border border-gray-600/10"
          animate={{ rotate: [-45, 315] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-48 w-96 h-96 rounded-3xl border border-gray-500/5"
          animate={{ rotate: [315, -45] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
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
            <span className="text-sm font-light tracking-widest text-gray-400">EXPERIENCE</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
            Work Experience
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
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] snap-center"
              >
                <div className="h-full p-8 border border-gray-700/40 rounded-2xl hover:border-gray-500/60 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm hover:bg-gradient-to-br hover:from-gray-800/60 hover:to-gray-900/50 transition-all duration-400 space-y-6">
                  <div className="flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-light text-white line-clamp-1">
                        {exp.role}
                      </h3>
                      <p className="text-gray-400 font-light text-sm">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-light text-gray-400">
                        {exp.period}
                      </span>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-700/40 text-gray-300">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-gray-500 mt-2 rounded-full flex-shrink-0" />
                        <p className="text-gray-300 font-light text-sm line-clamp-2">{item}</p>
                      </li>
                    ))}
                  </ul>
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
