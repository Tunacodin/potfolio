import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { projects } from "../data/projects";

export function SelectedWork() {
  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16">Selected Work</h2>
          
          <div className="space-y-16">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link to={`/project/${project.id}`} className="block group">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <p className="text-xs sm:text-sm text-purple-400 uppercase tracking-wider">
                        {project.role}
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-bold group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-base text-gray-300">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1 h-1 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-400">{highlight}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 border border-white/10 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4">
                      <span className="inline-flex items-center gap-2 text-sm text-purple-400 group-hover:gap-3 transition-all">
                        View Case Study
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}