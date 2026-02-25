import { motion } from "motion/react";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

const contacts = [
  {
    label: "Email",
    value: "contact@tunabostanci.com",
    href: "mailto:contact@tunabostanci.com"
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tunabostanci",
    href: "https://linkedin.com/in/tunabostanci"
  },
  {
    label: "GitHub",
    value: "github.com/tunabostanci",
    href: "https://github.com/tunabostanci"
  },
  {
    label: "Schedule",
    value: "Book a meeting",
    href: "https://calendly.com"
  }
];

export function Contact() {
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
    <section id="contact" className="py-24 md:py-32 px-6 bg-gradient-to-b from-gray-900 via-gray-800/20 to-gray-900 relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 -right-40 w-80 h-80 rounded-3xl border border-gray-600/10"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 -left-40 w-72 h-72 rounded-3xl border border-gray-500/5"
          animate={{ y: [30, 0, 30] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-gray-400 to-gray-300" />
            <span className="text-sm font-light tracking-widest text-gray-400">GET IN TOUCH</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
            Let's Connect
          </h2>
          <p className="text-lg text-gray-300 font-light max-w-2xl">
            Open to remote product engineering roles and collaboration opportunities.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="flex items-center gap-4 pt-8">
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
            {contacts.map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] snap-center"
              >
                <div className="h-full p-8 border border-gray-700/40 rounded-2xl hover:border-gray-500/60 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm hover:bg-gray-700/60 hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-400 group cursor-pointer space-y-3">
                  <p className="text-sm font-light text-gray-400 group-hover:text-gray-200 tracking-widest uppercase">
                    {contact.label}
                  </p>
                  <p className="text-lg md:text-xl font-light text-gray-200 group-hover:text-white line-clamp-2">
                    {contact.value}
                  </p>
                </div>
              </motion.a>
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
