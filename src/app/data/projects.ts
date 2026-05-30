import type { Localized } from "../i18n/dictionary";

export type Project = {
  id: string;
  title: string;
  tagline: Localized;
  description: Localized;
  role: Localized;
  status?: Localized;
  techStack: string[];
  screenshots: string[];
  brand: string;
  mode: "dark" | "light";
  imageFit?: "cover" | "contain";
  href?: string;
};

const SS = "/projects_ss";

export const projects: Project[] = [
  {
    id: "sorsana",
    title: "Sorsana",
    tagline: {
      en: "Social Q&A platform for students",
      tr: "Öğrenciler için sosyal soru-cevap platformu",
    },
    description: {
      en: "Peer-based question solving platform — students post questions with images, get AI-augmented explanations, react and discuss. Shipped to TestFlight and Google Play closed testing.",
      tr: "Öğrencilerin görsellerle soru paylaşıp AI destekli açıklamalar aldığı, tepki verip tartışabildiği akran tabanlı bir soru çözüm platformu. TestFlight ve Google Play kapalı testine çıkarıldı.",
    },
    role: {
      en: "Lead Mobile Developer",
      tr: "Lead Mobile Developer",
    },
    status: {
      en: "Closed testing · iOS + Android",
      tr: "Kapalı test · iOS + Android",
    },
    techStack: ["Expo SDK 55", "Zustand", "TanStack Query", "RHF + Zod", "Skia", "Supabase"],
    screenshots: [
      `${SS}/sorsana1%20(2).jpeg`,
      `${SS}/sorsana1%20(1).jpeg`,
      `${SS}/sorsana1%20(5).jpeg`,
    ],
    brand: "#7C3AED",
    mode: "light",
    href: "#",
  },
  {
    id: "tipbox",
    title: "Tipbox",
    tagline: {
      en: "Blockchain-based product experience sharing",
      tr: "Blockchain tabanlı ürün deneyimi paylaşımı",
    },
    description: {
      en: "Blockchain-based platform where users share product experiences and earn on-chain rewards. Contributed React Native screens, Web3 integration and full-stack work alongside the team.",
      tr: "Kullanıcıların ürün deneyimlerini paylaşarak on-chain ödüller kazandığı blockchain tabanlı bir platform. React Native ekranları, Web3 entegrasyonu ve full-stack tarafında takıma katkı verildi.",
    },
    role: {
      en: "React Native + Full-stack",
      tr: "React Native + Full-stack",
    },
    status: {
      en: "Team project",
      tr: "Takım projesi",
    },
    techStack: ["React Native", "Web3", "Full-stack", "REST"],
    screenshots: [
      `${SS}/tipbox.PNG`,
      `${SS}/tipbox2.PNG`,
    ],
    brand: "#22C55E",
    mode: "light",
    href: "#",
  },
  {
    id: "savely",
    title: "Savely",
    tagline: {
      en: "Goal-based savings & social food feed",
      tr: "Hedef bazlı tasarruf ve sosyal akış",
    },
    description: {
      en: "Financial goal & social savings app — Apple Sign-In, Supabase backend, signed Android release. Custom feed components with image-rich content cards and Reanimated transitions.",
      tr: "Finansal hedef takibi ve sosyal tasarruf için bir uygulama — Apple Sign-In, Supabase backend ve imzalı Android sürüm. Görsel zengin içerik kartları için özel feed bileşenleri ve Reanimated geçişler geliştirildi.",
    },
    role: {
      en: "Lead Mobile Developer",
      tr: "Lead Mobile Developer",
    },
    status: {
      en: "Closed testing · iOS + Android",
      tr: "Kapalı test · iOS + Android",
    },
    techStack: ["Expo Router", "Supabase", "Apple Sign-In", "Reanimated", "EAS Build"],
    screenshots: [
      `${SS}/savely1.png`,
      `${SS}/savely2.png`,
      `${SS}/savely3.png`,
    ],
    brand: "#22C55E",
    mode: "light",
    imageFit: "contain",
    href: "#",
  },
  {
    id: "lively",
    title: "Lively",
    tagline: {
      en: "Animated wallpapers & visual discovery",
      tr: "Animasyonlu duvar kağıtları & görsel keşif",
    },
    description: {
      en: "Animated wallpaper and visual discovery app with curated content, gesture-driven Bottom Sheet and high-performance Expo Image rendering. NativeWind styling system throughout.",
      tr: "Küratörlü içeriklerle animasyonlu duvar kağıdı ve görsel keşif sunan bir uygulama. Jest tabanlı Bottom Sheet, yüksek performanslı Expo Image render'ı ve baştan sona NativeWind stil sistemi.",
    },
    role: {
      en: "Lead Mobile Developer",
      tr: "Lead Mobile Developer",
    },
    status: {
      en: "Closed testing · iOS + Android",
      tr: "Kapalı test · iOS + Android",
    },
    techStack: ["Expo Router", "NativeWind", "Expo Image", "Bottom Sheet", "Apple Sign-In"],
    screenshots: [
      `${SS}/lively1.png`,
      `${SS}/lively2.png`,
      `${SS}/lively3.png`,
    ],
    brand: "#A3E635",
    mode: "dark",
    href: "#",
  },
  {
    id: "elite-mindset",
    title: "Elite Mindset",
    tagline: {
      en: "Daily inspiration & quote sharing",
      tr: "Günlük ilham & alıntı paylaşımı",
    },
    description: {
      en: "Daily inspiration and quote sharing app with category-based discovery and favorites. Built on Expo and React Native with a focused single-task UX.",
      tr: "Kategori bazlı keşif ve favorileme özellikleriyle günlük ilham ve alıntı paylaşımı için bir uygulama. Expo ve React Native üzerinde, tek odak noktasına yoğunlaşan bir UX yaklaşımıyla kurgulandı.",
    },
    role: {
      en: "Lead Mobile Developer",
      tr: "Lead Mobile Developer",
    },
    status: {
      en: "Closed testing · iOS + Android",
      tr: "Kapalı test · iOS + Android",
    },
    techStack: ["Expo", "React Native", "Reanimated", "AsyncStorage"],
    screenshots: [
      `${SS}/elite_mindset.png`,
    ],
    brand: "#A78BFA",
    mode: "dark",
    href: "#",
  },
];
