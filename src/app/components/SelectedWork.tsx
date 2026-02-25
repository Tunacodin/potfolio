import { motion } from "motion/react";
import { projects } from "../data/projects";
import { SectionTitle } from "./section-title";
import { ArrowUpRight } from "lucide-react";

const ACCENT = "#FF6B4A";

export function SelectedWork() {
  return (
    <section
      id="work"
      className="w-full py-16 md:py-20"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <SectionTitle line1="RECENT" line2="PROJECTS" />
        </motion.div>

        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.href ?? "#"}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group flex flex-col sm:flex-row gap-4 sm:gap-6 items-start py-6 border-b border-white/[0.06] hover:border-white/10 transition-colors"
            >
              <div className="w-full sm:w-40 shrink-0 aspect-video rounded-lg overflow-hidden bg-[#1A1A1A]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-white font-semibold text-lg group-hover:opacity-90">
                    {project.title}
                  </h3>
                  <p className="text-[#AAAAAA] text-sm font-light">{project.description}</p>
                </div>
                <span className="shrink-0 self-start sm:self-center" style={{ color: ACCENT }}>
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
