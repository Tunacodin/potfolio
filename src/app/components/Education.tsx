import { motion } from "motion/react";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

const educationItems = [
  {
    degree: "Bachelor of Computer Engineering",
    school: "Pamukkale University",
    courses: [
      "Software Architecture",
      "Data Structures",
      "Distributed Systems",
      "Object-Oriented Programming"
    ]
  }
];

export function Education() {
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
          className="absolute top-1/2 -right-40 w-72 h-72 rounded-3xl border border-gray-600/10"
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 -left-40 w-80 h-80 rounded-3xl border border-gray-500/5"
          animate={{ y: [25, 0, 25] }}
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
            <span className="text-sm font-light tracking-widest text-gray-400">EDUCATION</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
            Academic Background
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
            {educationItems.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0 w-full md:w-[calc(100%-12px)] snap-center"
              >
                <div className="h-full p-8 md:p-10 border border-gray-700/40 rounded-2xl space-y-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm hover:border-gray-500/60 hover:bg-gray-700/20 transition-all duration-300">
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-light text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-400 font-light text-lg">
                      {edu.school}
                    </p>
                  </div>

                  <div className="border-t border-gray-700 pt-8 space-y-6">
                    <p className="text-sm font-light tracking-widest text-gray-400">
                      RELEVANT COURSEWORK
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {edu.courses.map((course) => (
                        <motion.div
                          key={course}
                          whileHover={{ y: -2 }}
                          className="p-3 border border-gray-700/40 rounded-lg bg-gray-900/60 hover:border-gray-500/60 transition-all"
                        >
                          <p className="font-light text-gray-300 text-xs sm:text-sm text-center line-clamp-2">{course}</p>
                        </motion.div>
                      ))}
                    </div>
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
