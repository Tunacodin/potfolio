import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "../data/projects";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-purple-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* Header */}
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-purple-400 uppercase tracking-wider">
                {project.role}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto"
              />
            </div>

            {/* Overview */}
            {project.overview && (
              <section className="space-y-4">
                <h2 className="text-4xl font-bold">Overview</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {project.overview}
                </p>
              </section>
            )}

            {/* Problem */}
            {project.problem && (
              <section className="space-y-4 bg-white/5 p-8 rounded-xl">
                <h2 className="text-4xl font-bold">Problem</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {project.problem}
                </p>
              </section>
            )}

            {/* Solution */}
            {project.solution && (
              <section className="space-y-4">
                <h2 className="text-4xl font-bold">Solution</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {project.solution}
                </p>
              </section>
            )}

            {/* Architecture */}
            {project.architecture && (
              <section className="space-y-6">
                <h2 className="text-4xl font-bold">Architecture</h2>
                <ul className="space-y-4">
                  {project.architecture.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 text-lg text-gray-300">
                      <span className="text-purple-400 font-bold mt-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Technical Decisions */}
            {project.technicalDecisions && (
              <section className="space-y-6 bg-white/5 p-8 rounded-xl">
                <h2 className="text-4xl font-bold">Technical Decisions</h2>
                <ul className="space-y-4">
                  {project.technicalDecisions.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 text-lg text-gray-300">
                      <span className="text-purple-400 font-bold mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Trade-offs */}
            {project.tradeoffs && (
              <section className="space-y-6">
                <h2 className="text-4xl font-bold">Trade-offs</h2>
                <ul className="space-y-4">
                  {project.tradeoffs.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 text-lg text-gray-300">
                      <span className="text-purple-400 font-bold mt-1">↔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Impact */}
            {project.impact && (
              <section className="space-y-4 bg-purple-600/10 border border-purple-500/30 p-8 rounded-xl">
                <h2 className="text-4xl font-bold">Impact</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {project.impact}
                </p>
              </section>
            )}

            {/* Lessons Learned */}
            {project.lessonsLearned && (
              <section className="space-y-4">
                <h2 className="text-4xl font-bold">Lessons Learned</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {project.lessonsLearned}
                </p>
              </section>
            )}

            {/* CTA */}
            <div className="border-t border-white/10 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                View All Projects
              </Link>
              
              <a
                href="#contact"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2 transition-colors"
              >
                Discuss This Project
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}