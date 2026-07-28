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
  /** Desktop/web captures rendered inside a browser frame instead of a phone. */
  webShots?: string[];
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
    webShots: [
      `${SS}/sorsana_admin.png`,
    ],
    brand: "#7C3AED",
    mode: "light",
    href: "https://sorsanaapp.com/",
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
    id: "verona",
    title: "Verona",
    tagline: {
      en: "Management system for an art school",
      tr: "Sanat okulu için yönetim sistemi",
    },
    description: {
      en: "Management system for Verona Sanat's art school — instructors, students, courses (music/dance/stage/workshop), session-based scheduling and payment tracking, moving the studio off paper ledgers. A shared Supabase backend powers both an Expo mobile app and an Electron desktop panel; session billing, instructor contracts and printable records.",
      tr: "Verona Sanat'ın sanat okulu için yönetim sistemi — eğitmen, öğrenci, kurs (müzik/dans/sahne/atölye), seans bazlı ders planlama ve ödeme takibini kağıt defterden dijitale taşıyor. Ortak Supabase backend'i hem Expo mobil uygulamayı hem Electron masaüstü panelini besliyor; seans bazlı ücretlendirme, eğitmen sözleşmeleri ve yazdırılabilir kayıtlar.",
    },
    role: {
      en: "Full-stack · Desktop + Mobile",
      tr: "Full-stack · Masaüstü + Mobil",
    },
    status: {
      en: "In development · Desktop + Mobile",
      tr: "Geliştiriliyor · Masaüstü + Mobil",
    },
    techStack: ["Expo Router", "React Native", "Supabase", "Electron", "Reanimated", "TypeScript"],
    screenshots: [
      `${SS}/verona1.png`,
      `${SS}/verona2.png`,
    ],
    webShots: [
      `${SS}/verona_web1.png`,
      `${SS}/verona_web2.png`,
    ],
    brand: "#9E2E30",
    mode: "light",
    href: "#",
  },
  {
    id: "yalin-depo",
    title: "Yalın Depo",
    tagline: {
      en: "Smart warehouse & stock management for lean production",
      tr: "Yalın üretim için akıllı depo & stok yönetimi",
    },
    description: {
      en: "Warehouse optimization platform built on lean principles — a real-time 3D warehouse view (Three.js), color-coded shelves (fast/steady/slow flow), critical-stock alerts, barcode scanning, consumption analytics and automatic suggestions that route each part to the right shelf. React Native app + React/Three.js web dashboard on a shared Supabase backend. Tracks 2600+ SKUs across 12 shelves.",
      tr: "Yalın üretim prensipleriyle kurgulanan bir depo optimizasyon platformu — gerçek zamanlı 3D depo görünümü (Three.js), renk kodlu raf sistemi (hızlı/dengeli/yavaş akış), kritik stok uyarıları, barkod tarama, tüketim analitiği ve her parçayı doğru rafa yönlendiren otomatik öneriler. Ortak Supabase backend üzerinde React Native uygulaması + React/Three.js web paneli. 2600+ ürün çeşidi, 12 raf üzerinde takip ediliyor.",
    },
    role: {
      en: "Full-stack · Mobile + Web",
      tr: "Full-stack · Mobil + Web",
    },
    status: {
      en: "In development · Mobile + Web",
      tr: "Geliştiriliyor · Mobil + Web",
    },
    techStack: ["Expo SDK 54", "React Native", "Supabase", "expo-sqlite", "expo-camera", "Three.js"],
    screenshots: [
      `${SS}/yalin1.jpg`,
      `${SS}/yalin2.jpg`,
      `${SS}/yalin3.jpg`,
    ],
    webShots: [
      `${SS}/yalin_web1.png`,
      `${SS}/yalin_web2.png`,
    ],
    brand: "#F97316",
    mode: "light",
    href: "#",
  },
];
