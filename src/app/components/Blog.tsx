import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "./section-title";
import { blogArticles } from "../data/blogArticles";

const EASE_OUT_QUART = [0.165, 0.84, 0.44, 1];

export function Blog() {
  return (
    <section
      id="blog"
      className="w-full px-5 md:px-10 py-32 md:py-40"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <SectionTitle
              index="06"
              eyebrow="Notes / essays"
              line1="Recent"
              line2="writing."
            />
          </div>
          <div className="col-span-12 md:col-span-4 md:flex md:justify-end">
            <a
              href="#"
              className="font-sans text-sm font-medium link-underline"
              style={{ color: "var(--ink)" }}
            >
              See full archive →
            </a>
          </div>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-3 md:gap-4">
          {blogArticles.map((article, i) => {
            // alternate accent: first is cobalt, second is citron
            const cardClass = i === 0 ? "bento-card-cobalt" : "bento-card";
            const span = i === 0 ? "md:col-span-7" : "md:col-span-5";
            return (
              <motion.a
                key={article.id}
                href={article.href ?? "#"}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.42,
                  delay: i * 0.08,
                  ease: EASE_OUT_QUART as any,
                }}
                whileHover={{ y: -3 }}
                className={`group ${cardClass} col-span-12 ${span} p-7 md:p-9 flex flex-col gap-6 min-h-[340px]`}
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <span
                    className="font-mono text-[10px] tracking-widest uppercase font-semibold inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{
                      background: i === 0 ? "rgba(255,255,255,0.18)" : "var(--cobalt-soft)",
                      color: i === 0 ? "#FFFFFF" : "var(--cobalt-deep)",
                    }}
                  >
                    Essay · {String(i + 1).padStart(2, "0")}
                  </span>
                  <motion.span
                    className="w-11 h-11 rounded-full grid place-items-center"
                    style={{
                      background: i === 0 ? "var(--citron)" : "var(--ink)",
                      color: i === 0 ? "var(--ink)" : "var(--paper)",
                    }}
                    whileHover={{ rotate: 45, scale: 1.05 }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.span>
                </div>

                {/* Title */}
                <h3
                  className="font-display font-semibold mt-auto"
                  style={{
                    fontSize: i === 0 ? "clamp(1.9rem,3.2vw,2.8rem)" : "clamp(1.5rem,2.4vw,2rem)",
                    letterSpacing: "-0.035em",
                    color: i === 0 ? "#FFFFFF" : "var(--ink)",
                    lineHeight: 1.05,
                  }}
                >
                  {article.title}
                </h3>

                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{
                    color: i === 0 ? "rgba(255,255,255,0.85)" : "var(--ink-2)",
                  }}
                >
                  {article.description}
                </p>

                <div
                  className="flex items-center justify-between pt-5 border-t font-mono text-[10px] tracking-widest uppercase"
                  style={{
                    borderColor: i === 0 ? "rgba(255,255,255,0.18)" : "var(--line)",
                    color: i === 0 ? "rgba(255,255,255,0.7)" : "var(--ink-3)",
                  }}
                >
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
