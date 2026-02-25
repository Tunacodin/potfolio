import { motion } from "motion/react";
import { SectionTitle } from "./section-title";
import { premiumTools } from "../data/tools";
import type { ToolItem } from "../data/tools";

const CATEGORY_CONFIG: Record<keyof typeof premiumTools, { title: string; subtitle: string }> = {
  languages: { title: "Yazılım dilleri", subtitle: "Programlama dilleri" },
  developmentTools: { title: "Geliştirme araçları", subtitle: "Emülatör, IDE, framework" },
  platforms: { title: "Platformlar & servisler", subtitle: "Git, GitHub, Supabase, n8n" },
};

function ToolCard({ tool, index }: { tool: ToolItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.06] transition-all duration-300"
    >
      <div className="aspect-square relative overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
        {tool.image ? (
          <img
            src={tool.image}
            alt={tool.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-3xl md:text-4xl font-bold text-white/40 group-hover:text-white/60 transition-colors">
            {tool.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-white font-semibold text-sm md:text-base truncate" title={tool.name}>
          {tool.name}
        </h3>
        <p className="text-[#888888] text-xs md:text-sm font-light mt-0.5 line-clamp-2">
          {tool.description}
        </p>
      </div>
    </motion.div>
  );
}

export function TechStack() {
  return (
    <section
      id="tools"
      className="w-full py-16 md:py-20"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <SectionTitle line1="PREMIUM" line2="TOOLS" />
        </motion.div>

        <div className="flex flex-col gap-14 md:gap-16">
          {(Object.keys(premiumTools) as (keyof typeof premiumTools)[]).map((categoryKey) => {
            const items = premiumTools[categoryKey];
            const { title, subtitle } = CATEGORY_CONFIG[categoryKey];
            if (items.length === 0) return null;
            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h3 className="text-white font-semibold text-lg md:text-xl">{title}</h3>
                  <p className="text-[#888888] text-sm font-light mt-0.5">{subtitle}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                  {items.map((tool, i) => (
                    <ToolCard key={tool.id} tool={tool} index={i} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
