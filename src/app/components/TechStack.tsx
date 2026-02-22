import { motion } from "motion/react";

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

export function TechStack() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16">Tech Stack</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-300">Core</h3>
              <div className="flex flex-wrap gap-3">
                {technologies.core.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:border-purple-500/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-300">Supporting</h3>
              <div className="flex flex-wrap gap-3">
                {technologies.supporting.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:border-purple-500/50 transition-colors"
                  >
                    {tech}
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
