import { motion } from "motion/react";
import { SectionTitle } from "./section-title";
import { profile } from "../data/profile";

export function Education() {
  return (
    <section
      id="education"
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
          <SectionTitle line1="EDUCATION" line2="QUALIFICATION" />
        </motion.div>

        <div className="flex flex-col gap-8">
          {profile.education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="py-6 border-b border-white/[0.06] last:border-0"
            >
              <h3 className="text-white font-semibold text-lg md:text-xl mb-1">
                {edu.school}
              </h3>
              <p className="text-[#888888] text-sm font-light mb-2">
                {edu.place} · {edu.period}
              </p>
              {edu.degree && (
                <p className="text-[#B8B8B8] text-sm font-light">
                  {edu.degree}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {profile.languages && profile.languages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-10 pt-8 border-t border-white/[0.06]"
          >
            <h4 className="text-white font-semibold text-base mb-4">Languages</h4>
            <div className="flex flex-wrap gap-4">
              {profile.languages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-2">
                  <span className="text-[#B8B8B8] text-sm font-light">{lang.name}</span>
                  <span className="text-[#888888] text-xs font-light">— {lang.level}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
