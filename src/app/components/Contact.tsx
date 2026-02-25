import { useState } from "react";
import { motion } from "motion/react";
import { SectionTitle } from "./section-title";

const ACCENT = "#FF6B4A";
const INPUT_BG = "#333333";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-20"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">
        {/* Left: title only */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full md:max-w-[320px] shrink-0"
        >
          <SectionTitle line1="LET'S WORK" line2="TOGETHER" />
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 w-full min-w-0 max-w-lg"
        >
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <span className="text-5xl" style={{ color: ACCENT }}>
                ✓
              </span>
              <p className="text-white font-semibold text-lg">Message sent!</p>
              <p className="text-[#888888] text-sm font-light">I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#AAAAAA] text-sm font-medium">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-lg px-4 py-3 text-white text-sm font-light placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] transition-colors border-0"
                    style={{ background: INPUT_BG }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#AAAAAA] text-sm font-medium">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="rounded-lg px-4 py-3 text-white text-sm font-light placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] transition-colors border-0"
                    style={{ background: INPUT_BG }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#AAAAAA] text-sm font-medium">Budget</label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="rounded-lg px-4 py-3 text-sm font-light focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] transition-colors appearance-none border-0 w-full"
                  style={{
                    background: INPUT_BG,
                    color: form.budget ? "#fff" : "#888888",
                  }}
                >
                  <option value="">Select...</option>
                  <option value="<1k">&lt; $1k</option>
                  <option value="1k-3k">$1k – $3k</option>
                  <option value="3k-5k">$3k – $5k</option>
                  <option value=">5k">&gt; $5k</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#AAAAAA] text-sm font-medium">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="rounded-lg px-4 py-3 text-white text-sm font-light placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] transition-colors resize-none border-0 w-full"
                  style={{ background: INPUT_BG }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg font-semibold text-sm text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ACCENT }}
              >
                Submit
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
