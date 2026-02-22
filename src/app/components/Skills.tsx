import { motion } from "motion/react";

const skills = [
  "Mobile Development",
  "Backend Architecture",
  "API Design",
  "Authentication Systems",
  "Database Modeling",
  "Automation Design",
  "Version Control",
  "Product Thinking",
  "System Design Mindset",
  "Problem Solving",
  "Async Collaboration",
  "Ownership Mentality",
];

export function Skills() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16">Skills</h2>
          
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 border border-white/10 rounded-lg hover:border-purple-500/50 transition-colors text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
