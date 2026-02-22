import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-blue-500 to-blue-300" />
            <span className="text-sm font-light tracking-widest text-gray-400">ABOUT ME</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
            Engineering for impact
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 mb-12"
          >
            <p className="text-2xl md:text-3xl font-light text-gray-200 leading-relaxed">
              I build scalable mobile applications with clean architecture and automation-driven workflows.
            </p>
          </motion.div>

          {/* Left Column */}
          <div className="space-y-8">
            {[
              { title: "Mobile First", desc: "React Native expertise with cross-platform scalability" },
              { title: "Clean Code", desc: "Domain-driven design and architecture patterns" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-3"
              >
                <h3 className="text-xl font-medium text-white">{item.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {[
              { title: "Backend", desc: "Node.js and scalable API design with clear architectural patterns" },
              { title: "Automation", desc: "n8n workflows and automation-friendly system design" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-3"
              >
                <h3 className="text-xl font-medium text-white">{item.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
