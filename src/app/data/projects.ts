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
  /** Pre-composited device mockup (phone frame baked in); rendered as-is, no CSS frame. */
  mockup?: string;
  /** Angled/perspective mockup variant, shown in front of the straight one. */
  mockupAngled?: string;
  /** Desktop/web captures rendered inside a browser frame instead of a phone. */
  webShots?: string[];
  brand: string;
  mode: "dark" | "light";
  imageFit?: "cover" | "contain";
  href?: string;
  /** App/brand icon shown on the visit button. */
  icon?: string;
};

const SS = "/projects_ss";

export const projects: Project[] = [
  {
    id: "sorsana",
    mockup: `${SS}/mockups/sorsana.png`,
    mockupAngled: `${SS}/mockups/sorsana-angled.png`,
    title: "Sorsana",
    tagline: {
      en: "Social Q&A platform for students",
      tr: "Öğrenciler için sosyal soru-cevap platformu",
    },
    description: {
      en: "A social learning platform where students snap a photo of any question and get clear, step-by-step answers from peers and AI in seconds. It turns problem-solving from a lonely task into a shared community experience.",
      tr: "Öğrencilerin takıldıkları soruyu görselle paylaşıp saniyeler içinde akranlarından ve yapay zekâdan adım adım açıklamalı çözümler aldığı sosyal bir öğrenme platformu. Soru çözmeyi tek başına yapılan bir iş olmaktan çıkarıp toplulukla paylaşılan bir deneyime dönüştürüyor.",
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
    icon: "/sorsana_icon.svg",
  },
  {
    id: "tipbox",
    mockup: `${SS}/mockups/tipbox.png`,
    mockupAngled: `${SS}/mockups/tipbox-angled.png`,
    title: "Tipbox",
    tagline: {
      en: "Blockchain-based product experience sharing",
      tr: "Blockchain tabanlı ürün deneyimi paylaşımı",
    },
    description: {
      en: "A community platform where people share honest product experiences and get rewarded for their contributions. It makes trustworthy reviews valuable, building a knowledge pool shoppers can rely on before they buy.",
      tr: "Kullanıcıların gerçek ürün deneyimlerini paylaştığı ve bu katkıları karşılığında ödüller kazandığı bir topluluk platformu. Dürüst deneyimleri değerli kılarak insanların satın almadan önce güvenebileceği bir bilgi havuzu oluşturuyor.",
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
    mockup: `${SS}/mockups/savely.png`,
    mockupAngled: `${SS}/mockups/savely-angled.png`,
    title: "Savely",
    tagline: {
      en: "Goal-based savings & social food feed",
      tr: "Hedef bazlı tasarruf ve sosyal akış",
    },
    description: {
      en: "A finance app that makes saving tangible by tying it to real goals. People set targets, watch their progress, and draw inspiration from a social feed — turning saving money into a habit that actually sticks.",
      tr: "Tasarrufu somut hedeflere bağlayarak motive edici hâle getiren bir finans uygulaması. Kullanıcılar birikim hedefleri koyar, ilerlemesini takip eder ve sosyal akıştan ilham alır — para biriktirmeyi kalıcı bir alışkanlığa dönüştürür.",
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
    mockup: `${SS}/mockups/lively.png`,
    mockupAngled: `${SS}/mockups/lively-angled.png`,
    title: "Lively",
    tagline: {
      en: "Animated wallpapers & visual discovery",
      tr: "Animasyonlu duvar kağıtları & görsel keşif",
    },
    description: {
      en: "A discovery app that brings phone screens to life with animated wallpapers. Users glide through a curated collection and set the perfect look for any mood with a single tap.",
      tr: "Telefon ekranını canlı, animasyonlu duvar kâğıtlarıyla kişiselleştiren bir keşif uygulaması. Özenle seçilmiş içerikler arasında akıcı bir deneyimle gezinip her ruh hâline uygun görünümü tek dokunuşla uygulama imkânı sunuyor.",
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
    mockup: `${SS}/mockups/verona.png`,
    mockupAngled: `${SS}/mockups/verona-angled.png`,
    title: "Verona",
    tagline: {
      en: "Management system for an art school",
      tr: "Sanat okulu için yönetim sistemi",
    },
    description: {
      en: "A single platform that runs an entire art school — instructors, students, music/dance/stage/workshop classes, session scheduling, billing and contracts. It moves the studio off paper ledgers into one organized, reliable system reachable from both mobile and desktop.",
      tr: "Bir sanat okulunun tüm işleyişini tek yerden yöneten bir platform — eğitmenler, öğrenciler, müzik/dans/sahne/atölye dersleri, seans planlama, ücretlendirme ve sözleşme takibi. Stüdyoyu kağıt defterlerden kurtarıp mobil ve masaüstünden erişilen düzenli, güvenilir bir sisteme taşıyor.",
    },
    role: {
      en: "Full-stack · Desktop + Mobile",
      tr: "Full-stack · Masaüstü + Mobil",
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
    mockup: `${SS}/mockups/yalin-depo.png`,
    mockupAngled: `${SS}/mockups/yalin-depo-angled.png`,
    title: "Yalın Depo",
    tagline: {
      en: "Smart warehouse & stock management for lean production",
      tr: "Yalın üretim için akıllı depo & stok yönetimi",
    },
    description: {
      en: "A smart warehouse platform built on lean principles — a real-time 3D warehouse view, shelves color-coded by flow speed, critical-stock alerts, fast barcode counting and automatic suggestions that route every part to the right shelf. It keeps 12 shelves and 2,600+ items manageable from one screen, accurately and fast.",
      tr: "Yalın üretim prensipleriyle kurgulanan bir akıllı depo yönetim platformu — gerçek zamanlı 3B depo görünümü, akış hızına göre renk kodlu raflar, kritik stok uyarıları, barkodla hızlı sayım ve her parçayı doğru rafa yönlendiren otomatik öneriler. 12 raf ve 2.600'den fazla ürünü tek ekrandan, hatasız ve hızlı yönetilebilir kılıyor.",
    },
    role: {
      en: "Full-stack · Mobile + Web",
      tr: "Full-stack · Mobil + Web",
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
