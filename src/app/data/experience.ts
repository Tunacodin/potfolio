import type { Localized } from "../i18n/dictionary";

export type Experience = {
  company: string;
  location: Localized;
  period: Localized;
  role?: Localized;
  description: Localized;
  href?: string;
};

export const experiences: Experience[] = [
  {
    company: "Divizyon",
    location: {
      en: "Open Innovation Platform",
      tr: "Open Innovation Platformu",
    },
    period: {
      en: "Feb 2026 – Present",
      tr: "Şubat 2026 – Halen",
    },
    role: {
      en: "Community Lead",
      tr: "Topluluk Lideri",
    },
    description: {
      en: "Leading a 3-discipline community (digital product, experience design, content production) — running events, sessions and sprint organisations, planning prototype-to-product sprints and coordinating mentors end-to-end.",
      tr: "Üç disipline (dijital ürün, deneyim tasarımı, içerik üretimi) ait bir topluluğun liderliğini yürütüyor; etkinlik, oturum ve sprint organizasyonlarını koordine ediyor, prototipten ürüne giden sprintleri planlıyor ve mentor süreçlerini uçtan uca yönetiyor.",
    },
    href: "https://www.divizyon.org/",
  },
  {
    company: "Füzyonist",
    location: {
      en: "Multi-disciplinary consulting agency",
      tr: "Çok disiplinli danışmanlık ajansı",
    },
    period: {
      en: "Oct 2025 – Mar 2026",
      tr: "Ekim 2025 – Mart 2026",
    },
    role: {
      en: "Mobile Developer",
      tr: "Mobil Geliştirici",
    },
    description: {
      en: "Built mobile applications for client MVP and product development projects using React Native. Contributed to mobile delivery in cross-functional teams with Agile / iterative methodology.",
      tr: "Müşteri MVP'leri ve ürün geliştirme projelerinde React Native ile mobil uygulamalar geliştirdi. Agile / iteratif metodolojiyle cross-functional ekiplerde mobil delivery süreçlerine aktif katkı verdi.",
    },
    href: "https://fuzyon.ist/",
  },
];
