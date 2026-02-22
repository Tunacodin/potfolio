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
    <section id="contact" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
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
              whileHover={{ y: -4 }}
              className="p-8 md:p-10 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-lg hover:bg-blue-50/50 transition-all duration-300 group"
            >
              <p className="text-sm font-light text-gray-600 group-hover:text-blue-600 mb-2 tracking-widest">
                {contact.label}
              </p>
              <p className="text-lg md:text-xl font-medium text-black group-hover:text-blue-600 transition-colors">
                {contact.value}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
