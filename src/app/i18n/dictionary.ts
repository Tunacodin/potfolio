export type Lang = "en" | "tr";

export type Localized<T = string> = { en: T; tr: T };

export const DEFAULT_LANG: Lang = "tr";

export const dictionary = {
  nav: {
    work:       { en: "Products",   tr: "Ürünler" },
    experience: { en: "Experience", tr: "Deneyim" },
    contact:    { en: "Contact",    tr: "İletişim" },
    cv:         { en: "Download CV", tr: "CV indir" },
    home:       { en: "Back to top", tr: "Başa dön" },
  },

  hero: {
    name: { en: "Tuna Bostancıbaşı", tr: "Tuna Bostancıbaşı" },
    sub: {
      en: "Mobile developer. I took {n} products from idea to working app.",
      tr: "Mobil geliştiriciyim. {n} ürünü fikirden çalışan uygulamaya taşıdım.",
    },
    open: { en: "Open {title}", tr: "{title} ürününe git" },
    cta:  { en: "See the products", tr: "Ürünlere bak" },
    prev: { en: "Previous product", tr: "Önceki ürün" },
    next: { en: "Next product", tr: "Sonraki ürün" },
    drag: { en: "Drag", tr: "Sürükle" },
    view: { en: "View", tr: "İncele" },
  },

  about: {
    intro: {
      en: "I'm a React Native and Expo developer with 5+ years of hands-on experience. I shipped Sorsana, Savely and Lively to TestFlight and Google Play testing. After working across three different teams, I now build products as a freelance developer.",
      tr: "5 yılı aşkın saha deneyimine sahip bir React Native ve Expo geliştiricisiyim. Sorsana, Savely ve Lively'yi TestFlight ve Google Play kapalı testine çıkardım. Üç farklı ekipte edindiğim deneyimin ardından şu anda serbest geliştirici olarak ürünler geliştiriyorum.",
    },
    portraitAlt: { en: "Portrait of Tuna Bostancıbaşı", tr: "Tuna Bostancıbaşı portresi" },
    stats: [
      { value: 5, suffix: "+", label: { en: "Years with React Native", tr: "Yıl React Native deneyimi" } },
      { value: 8, suffix: "",  label: { en: "Products built",          tr: "Geliştirilen ürün" } },
      { value: 3, suffix: "",  label: { en: "Companies",               tr: "Şirket deneyimi" } },
    ],
  },

  work: {
    heading: { en: "Products I've built.", tr: "Geliştirdiğim ürünler." },
    visit:   { en: "Visit {title}",        tr: "{title} sitesine git" },
  },

  experience: {
    heading:   { en: "Experience.", tr: "Deneyim." },
    education: { en: "Education",   tr: "Eğitim" },
  },

  contact: {
    heading: { en: "Let's build your next product together.", tr: "Bir sonraki ürünü birlikte yapalım." },
    intro: {
      en: "Open to product partnerships, mobile builds, AI-assisted prototypes and long-term work. I reply within 24 hours.",
      tr: "Ürün ortaklıklarına, mobil uygulama geliştirmeye, yapay zekâ destekli prototiplere ve uzun soluklu işlere açığım. 24 saat içinde dönüş yaparım.",
    },
    copy:     { en: "Copy",     tr: "Kopyala" },
    copied:   { en: "Copied",   tr: "Kopyalandı" },
    phone:    { en: "Phone",    tr: "Telefon" },
    location: { en: "Location", tr: "Konum" },
    elsewhere:{ en: "Elsewhere", tr: "Bağlantılar" },
  },

  footer: {
    rights: { en: "All rights reserved.", tr: "Tüm hakları saklıdır." },
  },
} as const;
