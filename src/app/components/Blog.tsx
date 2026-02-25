import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "./section-title";
import { blogArticles } from "../data/blogArticles";

const ACCENT = "#FF6B4A";

export function Blog() {
  return (
    <section
      id="blog"
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
          <SectionTitle line1="DESIGN" line2="THOUGHTS" />
        </motion.div>

        <div className="flex flex-col gap-8">
          {blogArticles.map((article, i) => (
            <motion.a
              key={article.id}
              href={article.href ?? "#"}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex flex-col sm:flex-row sm:items-start gap-4 py-6 border-b border-white/[0.06] hover:border-white/10 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#FF6B4A] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[#888888] text-sm font-light leading-relaxed">
                  {article.description}
                </p>
                <div className="flex items-center gap-4 mt-3 text-[#888888] text-xs font-light">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              <span className="shrink-0" style={{ color: ACCENT }}>
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
