import type { Localized } from "../i18n/dictionary";

export type Project = {
  id: string;
  title: string;
  /** Two to four words, shown under the podium next to the product name. */
  kind: Localized;
  tagline: Localized;
  description: Localized;
  role: Localized;
  status?: Localized;
  techStack: string[];
  screenshots: string[];
  /** Pre-composited device mockup (phone frame baked in, webp); rendered as-is, no CSS frame. */
  mockup?: string;
  /** Angled/perspective mockup variant, shown in front of the straight one. */
  mockupAngled?: string;
  /** Desktop/web captures (1440px webp); the first one is shown large under the product text. */
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
    mockup: `${SS}/mockups/sorsana.webp`,
    mockupAngled: `${SS}/mockups/sorsana-angled.webp`,
    title: "Sorsana",
    kind: { en: "student Q&A", tr: "öğrenci soru-cevap" },
    tagline: {
      en: "Social Q&A platform for students",
      tr: "Öğrenciler için sosyal soru-cevap platformu",
    },
    description: {
      en: "Students post a photo of a question and get answers from peers and AI within minutes.",
      tr: "Öğrenci sorusunun fotoğrafını paylaşır, dakikalar içinde akranlarından ve yapay zekâdan çözüm alır.",
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
      `${SS}/web/sorsana-admin.webp`,
    ],
    brand: "#7C3AED",
    mode: "light",
    href: "https://sorsanaapp.com/",
    icon: "/sorsana_icon.svg",
  },
  {
    id: "supublic",
    mockup: `${SS}/mockups/supublic.webp`,
    mockupAngled: `${SS}/mockups/supublic-angled.webp`,
    title: "SuPublic",
    kind: { en: "drinking water map", tr: "içme suyu haritası" },
    tagline: {
      en: "Türkiye's drinking water map, made for refilling your bottle",
      tr: "Türkiye'nin içme suyu haritası, matarayla doldur",
    },
    description: {
      en: "Shows public fountains across Türkiye; users log refills, add new fountains and see the plastic they saved.",
      tr: "Türkiye'deki halka açık çeşmeleri gösterir; kullanıcı dolumunu kaydeder, yeni çeşme ekler, kurtardığı plastiği görür.",
    },
    role: {
      en: "Solo developer · Mobile, API, admin",
      tr: "Tek geliştirici · Mobil, API, yönetim paneli",
    },
    status: {
      en: "Live on App Store and Google Play",
      tr: "App Store ve Google Play'de yayında",
    },
    techStack: [],
    screenshots: [],
    brand: "#0056DD",
    mode: "light",
    href: "https://supublic.com",
  },
  {
    id: "tipbox",
    mockup: `${SS}/mockups/tipbox.webp`,
    mockupAngled: `${SS}/mockups/tipbox-angled.webp`,
    title: "Tipbox",
    kind: { en: "product reviews on chain", tr: "zincir üstü ürün yorumu" },
    tagline: {
      en: "Blockchain-based product experience sharing",
      tr: "Blockchain tabanlı ürün deneyimi paylaşımı",
    },
    description: {
      en: "Users share real product experiences and earn on-chain rewards for trusted reviews.",
      tr: "Kullanıcı gerçek ürün deneyimini paylaşır, güvenilir yorumları blokzincirde ödüllendirilir.",
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
    mockup: `${SS}/mockups/savely.webp`,
    mockupAngled: `${SS}/mockups/savely-angled.webp`,
    title: "Savely",
    kind: { en: "saves from every app", tr: "her uygulamadan kayıtlar" },
    tagline: {
      en: "All your saves from every platform, in one place",
      tr: "Tüm platformlardaki kayıtların tek çatı altında",
    },
    description: {
      en: "Pulls what you save across social apps into one library you can sort, review and track.",
      tr: "Sosyal uygulamalarda kaydettiklerini tek kütüphanede toplar; düzenler, gözden geçirir, takip edersin.",
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
    mockup: `${SS}/mockups/lively.webp`,
    mockupAngled: `${SS}/mockups/lively-angled.webp`,
    title: "Lively",
    kind: { en: "live wallpapers", tr: "canlı duvar kağıdı" },
    tagline: {
      en: "Animated wallpapers & visual discovery",
      tr: "Animasyonlu duvar kağıtları & görsel keşif",
    },
    description: {
      en: "A curated library of animated wallpapers you can find and apply in a few taps.",
      tr: "Özenle seçilmiş animasyonlu duvar kâğıtları; birkaç dokunuşla bul, ekranına uygula.",
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
    mockup: `${SS}/mockups/verona.webp`,
    mockupAngled: `${SS}/mockups/verona-angled.webp`,
    title: "Verona",
    kind: { en: "art school management", tr: "sanat okulu yönetimi" },
    tagline: {
      en: "Management system for an art school",
      tr: "Sanat okulu için yönetim sistemi",
    },
    description: {
      en: "Runs an art school's students, instructors and courses in one desktop and mobile system with role-based access.",
      tr: "Bir sanat okulunun kursiyer, eğitmen ve kurslarını rol bazlı yetkiyle tek masaüstü ve mobil sistemde yönetir.",
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
      `${SS}/web/verona-1.webp`,
      `${SS}/web/verona-2.webp`,
    ],
    brand: "#9E2E30",
    mode: "light",
    href: "#",
  },
  {
    id: "yalin-depo",
    mockup: `${SS}/mockups/yalin-depo.webp`,
    mockupAngled: `${SS}/mockups/yalin-depo-angled.webp`,
    title: "Yalın Depo",
    kind: { en: "warehouse digital twin", tr: "depo dijital ikizi" },
    tagline: {
      en: "A warehouse digital twin that knows where every pallet is",
      tr: "Her paletin yerini bilen depo dijital ikizi",
    },
    description: {
      en: "A 3D twin of a factory warehouse: staff scan pallets on the phone, even offline; managers see fill rate and idle stock.",
      tr: "Fabrika deposunun 3D ikizi: görevli telefondan barkod okutur (internetsiz de), yönetici doluluğu ve hareketsiz stoğu görür.",
    },
    role: {
      en: "Solo developer · Mobile, web, 3D",
      tr: "Tek geliştirici · Mobil, web, 3D",
    },
    status: {
      en: "Pilot stage",
      tr: "Pilot aşamasında",
    },
    techStack: ["Expo SDK 54", "React Native", "Supabase", "expo-sqlite", "expo-camera", "Three.js"],
    screenshots: [
      `${SS}/yalin1.jpg`,
      `${SS}/yalin2.jpg`,
      `${SS}/yalin3.jpg`,
    ],
    webShots: [
      `${SS}/web/yalin-twin.webp`,
      `${SS}/web/yalin-heat.webp`,
    ],
    brand: "#F97316",
    mode: "light",
    href: "https://yalin-depo.vercel.app",
  },
  {
    id: "yalin-soguk",
    mockup: `${SS}/mockups/yalin-soguk.webp`,
    title: "Yalın Depo Soğuk",
    kind: { en: "cold-store digital twin", tr: "soğuk depo dijital ikizi" },
    tagline: {
      en: "Every pallet of the cold chain, in its place",
      tr: "Soğuk zincirin her paleti, yerinde",
    },
    description: {
      en: "A 3D twin of a dairy cold store split into climate zones: what sits where and when it expires, at a glance.",
      tr: "Süt soğuk deposunun iklim bölgelerine ayrılmış 3D ikizi: hangi gözde ne olduğu ve ne zaman bozulacağı tek bakışta.",
    },
    role: {
      en: "Solo developer · 3D twin, web",
      tr: "Tek geliştirici · 3D ikiz, web",
    },
    status: {
      en: "Demo ready",
      tr: "Demo hazır",
    },
    techStack: ["Three.js", "React", "Vite", "Motion", "camera-controls"],
    screenshots: [],
    webShots: [
      `${SS}/web/yalin-soguk-twin.webp`,
      `${SS}/web/yalin-soguk-site.webp`,
    ],
    brand: "#0E8A8A",
    mode: "light",
  },
];

/** Small phone-screen captures (360px wide, `h` tall), shown as a row under each product. */
export type WallShot = { id: string; src: string; h: number };

const shot = (id: string, n: number, h: number): WallShot => ({ id, src: `${SS}/wall/${id}-${n}.webp`, h });

// Interleaved so neighbouring tiles come from different products.
export const wallShots: WallShot[] = [
  shot("sorsana", 1, 779), shot("yalin-depo", 1, 780), shot("lively", 1, 790), shot("savely", 3, 728),
  shot("supublic", 1, 794), shot("sorsana", 4, 779), shot("tipbox", 1, 779),
  shot("sorsana", 2, 779), shot("yalin-depo", 2, 780), shot("lively", 2, 785), shot("savely", 1, 576),
  shot("sorsana", 6, 779), shot("tipbox", 2, 779), shot("yalin-depo", 3, 780), shot("sorsana", 3, 779),
  shot("lively", 3, 779), shot("savely", 2, 574), shot("sorsana", 5, 779), shot("yalin-depo", 4, 780),
  shot("sorsana", 7, 779), shot("sorsana", 8, 779),
];

/** A product's own captures, in file order. */
export const shotsOf = (id: string) =>
  wallShots.filter((s) => s.id === id).sort((a, b) => a.src.localeCompare(b.src, undefined, { numeric: true }));
