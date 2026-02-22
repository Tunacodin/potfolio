import { motion } from "motion/react";

const contacts = [
  {
    label: "Email",
    value: "contact@tunabostanci.com",
    href: "mailto:contact@tunabostanci.com"
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tunabostanci",
    href: "https://linkedin.com/in/tunabostanci"
  },
  {
    label: "GitHub",
    value: "github.com/tunabostanci",
    href: "https://github.com/tunabostanci"
  },
  {
    label: "Schedule",
    value: "Book a meeting",
    href: "https://calendly.com"
  }
];

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-gradient-to-b from-gray-900 via-gray-800/20 to-gray-900 relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 -right-40 w-80 h-80 rounded-3xl border border-gray-600/10"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 -left-40 w-72 h-72 rounded-3xl border border-gray-500/5"
          animate={{ y: [30, 0, 30] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-gray-400 to-gray-300" />
            <span className="text-sm font-light tracking-widest text-gray-400">GET IN TOUCH</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
            Let's Connect
          </h2>
          <p className="text-lg text-gray-300 font-light max-w-2xl">
            Open to remote product engineering roles and collaboration opportunities.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-6 pt-8">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="p-8 md:p-10 border border-gray-700/40 rounded-2xl hover:border-gray-500/60 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm hover:bg-gray-700/60 hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-400 group cursor-pointer"
            >
              <p className="text-sm font-light text-gray-400 group-hover:text-gray-200 mb-2 tracking-widest uppercase">
                {contact.label}
              </p>
              <p className="text-lg md:text-xl font-medium text-gray-200 group-hover:text-white transition-colors">
                {contact.value}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
