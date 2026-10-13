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
    company: "Ilgar Teknoloji",
    location: {
      en: "SuPublic platform",
      tr: "SuPublic platformu",
    },
    period: {
      en: "Jul 2026 – Present",
      tr: "Temmuz 2026 – Halen",
    },
    role: {
      en: "Full Stack Developer",
      tr: "Full Stack Developer",
    },
    description: {
      en: "Building SuPublic end to end, a platform that maps public water points across Türkiye: React Native / Expo mobile app, Laravel REST API and MySQL, admin panel, website, OTA updates and store releases.",
      tr: "Türkiye genelindeki su noktalarını haritada gösteren SuPublic platformunu uçtan uca geliştiriyor: React Native / Expo mobil uygulama, Laravel REST API ve MySQL, yönetim paneli, web sitesi, OTA güncellemeler ve mağaza yayınları.",
    },
  },
  {
    company: "Divizyon",
    location: {
      en: "Open Innovation Platform",
      tr: "Open Innovation Platformu",
    },
    period: {
      en: "Feb 2026 – Jul 2026",
      tr: "Şubat 2026 – Temmuz 2026",
    },
    role: {
      en: "Community Lead",
      tr: "Topluluk Lideri",
    },
    description: {
      en: "Led a 3-discipline community (digital product, experience design, content production), ran events, sessions and sprint organisations, planned prototype-to-product sprints and coordinated mentors end-to-end.",
      tr: "Üç disipline (dijital ürün, deneyim tasarımı, içerik üretimi) ait bir topluluğun liderliğini yürüttü; etkinlik, oturum ve sprint organizasyonlarını koordine etti, prototipten ürüne giden sprintleri planladı ve mentor süreçlerini uçtan uca yönetti.",
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
