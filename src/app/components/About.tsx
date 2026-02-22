import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-5xl md:text-6xl font-bold">About</h2>
          
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              I am a mobile-focused software engineer specializing in React Native and scalable Node.js backend systems.
            </p>
            
            <p>
              My approach is product-oriented. I design systems with long-term maintainability in mind, applying domain-driven principles and structured architecture patterns.
            </p>
            
            <p>
              I enjoy building applications that are functional, sustainable, testable, and automation-friendly.
            </p>
            
            <p>
              I have experience working in distributed environments and collaborating asynchronously across teams.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
