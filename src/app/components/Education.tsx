import { motion } from "motion/react";

export function Education() {
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
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
            <span className="text-sm font-light tracking-widest text-gray-400">EDUCATION</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
            Academic Background
          </h2>
        </motion.div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-10 md:p-12 border border-gray-800 rounded-lg space-y-8 hover:border-blue-600/50 hover:bg-blue-600/5 transition-all duration-300"
        >
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-light text-white">
              Bachelor of Computer Engineering
            </h3>
            <p className="text-blue-400 font-light text-lg">
              Pamukkale University
            </p>
          </div>

          <div className="border-t border-gray-800 pt-8 space-y-6">
            <p className="text-sm font-light tracking-widest text-gray-400">
              RELEVANT COURSEWORK
            </p>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Software Architecture",
                "Data Structures",
                "Distributed Systems",
                "Object-Oriented Programming"
              ].map((course) => (
                <motion.div
                  key={course}
                  whileHover={{ y: -2 }}
                  className="p-4 border border-gray-800 rounded-lg bg-gradient-to-br from-gray-900 to-black hover:border-blue-600/50 transition-all"
                >
                  <p className="font-light text-gray-300 text-sm text-center">{course}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
