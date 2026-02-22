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
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Let's Connect</h2>
            <p className="text-lg text-gray-300">
              Open to remote product engineering roles and collaboration opportunities.
            </p>
          </div>

          <div className="space-y-4">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-white/10 rounded-lg hover:border-purple-500/50 transition-colors"
              >
                <p className="text-sm text-gray-400 mb-1">{contact.label}</p>
                <p className="font-mono text-sm">{contact.value}</p>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
