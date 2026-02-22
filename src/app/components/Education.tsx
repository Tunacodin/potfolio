import { motion } from "motion/react";

export function Education() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-gray-900 via-gray-800/20 to-gray-900 relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 -right-40 w-72 h-72 rounded-3xl border border-gray-600/10"
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 -left-40 w-80 h-80 rounded-3xl border border-gray-500/5"
          animate={{ y: [25, 0, 25] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
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
            <div className="w-8 h-px bg-gradient-to-r from-gray-400 to-gray-300" />
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
          whileHover={{ y: -4 }}
          className="p-10 md:p-12 border border-gray-700/40 rounded-2xl space-y-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm hover:border-gray-500/60 hover:bg-gradient-to-br hover:from-gray-800/60 hover:to-gray-900/50 hover:shadow-xl hover:shadow-gray-500/10 transition-all duration-400"
        >
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-light text-white">
              Bachelor of Computer Engineering
            </h3>
            <p className="text-gray-400 font-light text-lg">
              Pamukkale University
            </p>
          </div>

          <div className="border-t border-gray-700 pt-8 space-y-6">
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
                  className="p-4 border border-gray-700/40 rounded-lg bg-gradient-to-br from-gray-800/30 to-gray-900/30 hover:border-gray-500/60 transition-all"
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
