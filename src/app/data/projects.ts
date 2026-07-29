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
      en: "A social learning platform where students share the questions they encounter as images and instantly benefit from both peer-driven and AI-assisted solutions. It transforms solitary studying into an interactive, community-based experience — turning knowledge into a value that grows as it is shared.",
      tr: "Öğrencilerin karşılaştıkları soruları görselleriyle paylaşarak hem akranlarından hem de yapay zekâ destekli çözümlerden anında yararlanabildiği sosyal bir öğrenme platformu. Bireysel çalışmayı topluluk temelli, etkileşimli bir öğrenme deneyimine dönüştürerek bilgiyi paylaşıldıkça büyüyen bir değere çeviriyor.",
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
      en: "A community platform where users share genuine product experiences and see their contributions transparently rewarded on-chain. By turning trustworthy opinions into a valuable asset, it lets consumers ground their purchasing decisions in solid, verifiable insight.",
      tr: "Kullanıcıların gerçek ürün deneyimlerini paylaştığı ve bu katkılarının blokzincir üzerinde şeffaf biçimde ödüllendirildiği bir topluluk platformu. Güvenilir kullanıcı görüşlerini değerli bir varlığa dönüştürerek tüketicilerin satın alma kararlarını sağlam ve doğrulanabilir bilgiye dayandırmasını sağlıyor.",
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
      en: "All your saves from every platform, in one place",
      tr: "Tüm platformlardaki kayıtların tek çatı altında",
    },
    description: {
      en: "An app that consolidates the items you save across multiple social media and digital platforms into a single hub. It makes scattered saves organizable, reviewable and trackable — turning everything you collect into a meaningful, easily accessible archive.",
      tr: "Birden fazla sosyal medya ve dijital platformdan yapılan kaydetme işlemlerini tek bir çatı altında toplayan bir uygulama. Dağınık biçimde biriken kayıtları düzenlenebilir, değerlendirilebilir ve takip edilebilir hâle getirerek kullanıcının biriktirdiği tüm içeriği anlamlı ve erişilebilir bir arşive dönüştürüyor.",
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
      en: "A visual discovery app that lets users personalize their device screens with a curated library of animated wallpapers. Through fluid browsing and a rich content archive, it makes finding and applying a look that matches each user's aesthetic effortless.",
      tr: "Kullanıcıların cihaz ekranlarını özenle seçilmiş, animasyonlu duvar kâğıtlarıyla kişiselleştirdiği bir görsel keşif uygulaması. Akıcı bir gezinme deneyimi ve zengin içerik arşiviyle, her kullanıcının kendi estetik tercihine uygun görünümü zahmetsizce bulup uygulamasını sağlıyor.",
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
      en: "A versatile digital platform that centralizes the entire operation of Verona Sanat Merkezi — tracking students, instructors and courses under one roof, with role-based access that lets both instructors and administrators manage their own domains. From session scheduling to billing, it runs every step of the operation seamlessly across mobile and desktop.",
      tr: "Verona Sanat Merkezi'nin tüm yönetim süreçlerini; kursiyer, eğitmen ve kurs takibini tek çatı altında toplayan çok yönlü bir dijital platform. Rol bazlı yetkilendirmeyle hem eğitmenlerin hem de yöneticilerin kendi sorumluluk alanlarını kontrol edebildiği, seans planlamasından ücretlendirmeye kadar operasyonun her adımını mobil ve masaüstünde bütünleşik biçimde yürüten bir sistem.",
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
      en: "A smart inventory management platform built on lean manufacturing principles that digitizes warehouse operations end to end. With a real-time 3D warehouse view, shelves classified by flow speed, critical-stock alerts, rapid barcode counting and an automatic recommendation engine that routes each item to its optimal location, it enables 2,600+ products across 12 shelves to be managed from a single point with high accuracy.",
      tr: "Yalın üretim ilkeleri üzerine kurgulanan, depo operasyonlarını uçtan uca dijitalleştiren bir akıllı stok yönetim platformu. Gerçek zamanlı üç boyutlu depo görünümü, akış hızına göre sınıflandırılmış raf sistemi, kritik stok uyarıları, barkodla hızlı sayım ve her ürünü en uygun konuma yönlendiren otomatik öneri mekanizmasıyla 2.600'ü aşkın ürünün 12 raf üzerinde tek merkezden, yüksek doğrulukla yönetilmesini sağlıyor.",
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
