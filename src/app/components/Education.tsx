import { motion } from "motion/react";

export function Education() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16">Education</h2>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Bachelor of Computer Engineering</h3>
            <p className="text-lg text-gray-300">Pamukkale University</p>
            
            <div className="pt-4">
              <p className="text-sm text-gray-400 mb-3 uppercase tracking-wider">
                Relevant Coursework
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Software Architecture",
                  "Data Structures",
                  "Distributed Systems",
                  "Object-Oriented Programming"
                ].map((course) => (
                  <span
                    key={course}
                    className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:border-purple-500/50 transition-colors"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
