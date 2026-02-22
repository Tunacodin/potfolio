import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { useRef } from "react";
import { projects } from "../data/projects";

export function SelectedWork() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <section ref={sectionRef} id="work" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
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
            <span className="text-sm font-light tracking-widest text-gray-600">SELECTED WORK</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-black tracking-tight">
            Featured Projects
          </h2>
        </motion.div>

        {/* Projects */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              style={{ opacity: textOpacity }}
            >
              <Link to={`/project/${project.id}`} className="block group">
                <div className="overflow-hidden rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300">
                  {/* Featured Image */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="relative h-80 md:h-96 overflow-hidden bg-gray-100"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/20 transition-all duration-300" />
                  </motion.div>

                  {/* Content */}
                  <div className="bg-white p-8 md:p-10 space-y-6">
                    <div className="space-y-2">
                      <p className="text-xs font-light text-blue-600 tracking-widest uppercase">
                        {project.role}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-medium text-black group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-gray-700 leading-relaxed font-light">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 py-4 border-y border-gray-200">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-600 mt-2 rounded-full flex-shrink-0" />
                          <p className="text-gray-700 font-light">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 border border-gray-300 rounded-full text-gray-700 font-light text-xs hover:border-blue-400 hover:text-blue-600 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-2">
                      <span className="inline-block font-light text-blue-600 group-hover:text-blue-700 transition-colors">
                        View Case Study →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}