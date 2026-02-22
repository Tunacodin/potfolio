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
    <section id="contact" className="py-32 px-6 bg-gradient-to-b from-white via-blue-50/20 to-white relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 -right-40 w-80 h-80 rounded-3xl border border-blue-300/20"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 -left-40 w-72 h-72 rounded-3xl border border-blue-200/15"
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
            <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-blue-400" />
            <span className="text-sm font-light tracking-widest text-gray-600">GET IN TOUCH</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-black tracking-tight">
            Let's Connect
          </h2>
          <p className="text-lg text-gray-700 font-light max-w-2xl">
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
              className="p-8 md:p-10 border border-gray-200/50 rounded-2xl hover:border-blue-400/60 bg-gradient-to-br from-white/60 to-gray-50/40 backdrop-blur-sm hover:bg-blue-50/70 hover:shadow-xl hover:shadow-blue-200/40 transition-all duration-400 group cursor-pointer"
            >
              <p className="text-sm font-light text-gray-600 group-hover:text-blue-700 mb-2 tracking-widest uppercase">
                {contact.label}
              </p>
              <p className="text-lg md:text-xl font-medium text-black group-hover:text-blue-700 transition-colors">
                {contact.value}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
