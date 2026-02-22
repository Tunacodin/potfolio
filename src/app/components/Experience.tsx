import { motion } from "motion/react";

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
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16">Experience</h2>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="pb-8 border-b border-white/10 last:border-b-0"
              >
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <span className="font-semibold text-white">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.type}</span>
                    <span>•</span>
                    <span>{exp.period}</span>
                  </div>

                  <ul className="space-y-2 pt-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-300 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
