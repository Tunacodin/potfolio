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
    <section className="py-32 px-6 bg-white relative overflow-hidden">
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
            <span className="text-sm font-light tracking-widest text-gray-600">EXPERIENCE</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-black tracking-tight">
            Work Experience
          </h2>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 md:p-10 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-medium text-black">
                      {exp.role}
                    </h3>
                    <p className="text-blue-600 font-light">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <span className="text-sm font-light text-gray-600">
                      {exp.period}
                    </span>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 pt-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-600 mt-2 rounded-full flex-shrink-0" />
                      <p className="text-gray-700 font-light">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
