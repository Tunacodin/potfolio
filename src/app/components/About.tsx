import { motion } from "motion/react";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

const aboutItems = [
  { title: "Experience", desc: "Internships at KodPit Software Company and Phinia Delphi Technology. Full-stack development with React Native, React.js, and .NET Core." },
  { title: "Technical Focus", desc: "Mobile-first architecture with cross-platform scalability and backend integration." },
  { title: "University", desc: "Pamukkale University, Computer Engineering (2020-Present). Specialized in software development and system architecture." },
  { title: "Location", desc: "Denizli, Turkey. Available for remote and on-site opportunities." },
];

export function About() {
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
    <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-gray-900 via-gray-800/20 to-gray-900 overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-3xl border border-gray-600/10 backdrop-blur-3xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-3xl border border-gray-500/5 backdrop-blur-3xl"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-gray-400 to-gray-300" />
            <span className="text-sm font-light tracking-widest text-gray-400">ABOUT ME</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
            Final-Year Engineering Student
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-2xl md:text-3xl font-light text-gray-200 leading-relaxed max-w-4xl">
            Computer Engineering student at Pamukkale University, passionate about building scalable mobile and web applications with clean architecture.
          </p>
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
            {aboutItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] snap-center"
              >
                <div className="h-full border border-gray-700/40 rounded-2xl p-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm hover:border-gray-500/60 hover:bg-gray-700/20 transition-all duration-300 group cursor-pointer space-y-4">
                  <h3 className="text-2xl font-light text-white group-hover:text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
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
