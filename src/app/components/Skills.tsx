import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const skillCategories = [
  { title: "Frontend", skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Router"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "Authentication", "Database Design"] },
  { title: "DevOps", skills: ["Docker", "GitHub", "CI/CD", "Deployment", "Monitoring"] },
  { title: "Design", skills: ["UI/UX Principles", "Responsive Design", "Figma", "Animation", "Accessibility"] },
];

export function Skills() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-blue-400" />
            <span className="text-sm font-light tracking-widest text-gray-400">CAPABILITIES</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
            Skills & Expertise
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              {/* Category Title */}
              <h3 className="text-xl font-medium text-white">
                {category.title}
              </h3>

              {/* Skills */}
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ y: -2 }}
                    className="p-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-blue-600/50 rounded-lg transition-all duration-300 group"
                  >
                    <p className="text-gray-300 font-light group-hover:text-blue-400 transition-colors text-sm">
                      {skill}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-blue-600 via-blue-400 to-transparent mt-20 origin-left"
        />
      </div>
    </section>
  );
}
