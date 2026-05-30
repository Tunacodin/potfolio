export type Lang = "en" | "tr";

export type Localized<T = string> = { en: T; tr: T };

export const DEFAULT_LANG: Lang = "tr";

export const dictionary = {
  nav: {
    work:       { en: "Work",       tr: "Projeler" },
    stack:      { en: "Stack",      tr: "Stack" },
    experience: { en: "Experience", tr: "Deneyim" },
    contact:    { en: "Contact",    tr: "İletişim" },
  },

  header: {
    altMobileBrand: { en: "Tuna", tr: "Tuna" },
  },

  hero: {
    line1:        { en: "Mobile products,",   tr: "İhtiyaçları" },
    line2:        { en: "shipped end-to-end.", tr: "çözüme" },
    line3Prefix:  { en: "",                    tr: "" },
    line3Accent:  { en: "React Native.",       tr: "dönüştürüyorum." },
    intro: {
      en: "React Native & Expo developer with __HL__5+ years__/HL__ of hands-on experience. Shipped __INK__Sorsana, Savely, Lively & Elite Mindset__/INK__ to TestFlight and Google Play. Currently leading a 3-discipline community at Divizyon's Open Innovation Platform.",
      tr: "__HL__5+ yıl__/HL__ saha deneyimine sahip React Native & Expo geliştiricisiyim. __INK__Sorsana, Savely, Lively ve Elite Mindset__/INK__ uygulamalarını TestFlight ve Google Play kapalı testine çıkardım. Şu sıra Divizyon Open Innovation Platform'da üç disiplinli bir topluluğa liderlik ediyorum.",
    },
    ctaDownloadCV: { en: "Download CV",  tr: "CV İndir" },
    ctaSeeWork:    { en: "See work",     tr: "Projelere bak" },
    githubHandle:  { en: "github / @Tunacodin", tr: "github / @Tunacodin" },
    stats: {
      yearsRn:     { en: "Years RN / Expo",    tr: "Yıl · RN / Expo" },
      appsShipped: { en: "Apps shipped",       tr: "Yayına alınan ürün" },
      internships: { en: "Mobile internships", tr: "Mobil staj" },
    },
  },

  work: {
    label:    { en: "02 — Selected work", tr: "02 — Seçili projeler" },
    badge:    { en: "closed testing",     tr: "kapalı test" },
    headPre:  { en: "Apps I've",          tr: "Yayına" },
    headPost: { en: "shipped.",           tr: "aldıklarım." },
    tagline: {
      en: "Real screenshots from production builds — architecture, signing and store submission owned end-to-end.",
      tr: "Production build'lerden gerçek ekran görüntüleri — mimari, imzalama ve mağaza yayını uçtan uca tarafımdan yürütüldü.",
    },
    viewCase:   { en: "View case study", tr: "İncelemeyi aç" },
    roleLabel:  { en: "Role",            tr: "Rol" },
    stackLabel: { en: "Stack",           tr: "Stack" },
  },

  stack: {
    label:    { en: "03 — Stack",        tr: "03 — Stack" },
    headPre:  { en: "What I use",        tr: "Her gün" },
    headPost: { en: "every day.",        tr: "kullandıklarım." },
    countSuffix:   { en: "tools",        tr: "araç" },
    categoryLabel: { en: "categories",   tr: "kategori" },
    categories: {
      core: {
        title:    { en: "Core",                       tr: "Core" },
        subtitle: { en: "Cross-platform foundation",  tr: "Cross-platform temel" },
      },
      stateForms: {
        title:    { en: "State & Forms",                  tr: "State & Form" },
        subtitle: { en: "Data, validation, persistence", tr: "Veri, validasyon, depolama" },
      },
      backend: {
        title:    { en: "Backend",                tr: "Backend" },
        subtitle: { en: "APIs, auth, services",   tr: "API, auth, servisler" },
      },
      uiAnimation: {
        title:    { en: "UI / Motion",               tr: "UI / Motion" },
        subtitle: { en: "Design system + animation", tr: "Tasarım sistemi + animasyon" },
      },
      delivery: {
        title:    { en: "Delivery",              tr: "Delivery" },
        subtitle: { en: "Build, sign, distribute", tr: "Build · İmza · Dağıtım" },
      },
      languages: {
        title:    { en: "Languages",       tr: "Diller" },
        subtitle: { en: "Daily writing",   tr: "Her gün yazdıklarım" },
      },
    },
  },

  experience: {
    label:        { en: "04 — Experience", tr: "04 — Deneyim" },
    headPre:      { en: "Where I've",      tr: "Çalıştığım" },
    headPost:     { en: "worked.",         tr: "yerler." },
    rangeChip:    { en: "2023 — Present",  tr: "2023 — Halen" },
    eduLabel:     { en: "05 — Education",  tr: "05 — Eğitim" },
    locOngoing:   { en: "ongoing",         tr: "halen" },
    locCompleted: { en: "completed",       tr: "tamamlandı" },
  },

  contact: {
    label:   { en: "§ 06 — Contact",      tr: "§ 06 — İletişim" },
    booking: { en: "Booking — Q2 2026",   tr: "Müsait — 2026 Q2" },
    intro: {
      en: "Open to product collaborations, mobile builds, AI-assisted prototypes and longer engagements. Replies usually arrive within 24 hours.",
      tr: "Ürün iş birliklerine, mobil geliştirme işlerine, AI destekli prototip projelerine ve uzun soluklu iş ortaklıklarına açığım. Genellikle 24 saat içinde dönüş yaparım.",
    },
    dropALine: { en: "Drop a line",       tr: "Mesaj at" },
    meta: {
      region:    { en: "Region",          tr: "Konum" },
      phone:     { en: "Phone",           tr: "Telefon" },
      response:  { en: "Response",        tr: "Yanıt süresi" },
      status:    { en: "Status",          tr: "Durum" },
    },
    metaValues: {
      under24h:  { en: "Under 24h",       tr: "24 saat içinde" },
      open:      { en: "Open",            tr: "Müsait" },
    },
    socials: {
      linkedin:  { en: "Professional",    tr: "Profesyonel" },
      github:    { en: "Code",            tr: "Kod" },
      website:   { en: "Personal",        tr: "Kişisel" },
    },
    marquee: {
      en: [
        "Available for work",
        "Q2 2026",
        "React Native",
        "Expo",
        "n8n",
        "AI pipelines",
        "Mobile",
        "Backend",
      ],
      tr: [
        "Yeni projelere açığım",
        "2026 Q2",
        "React Native",
        "Expo",
        "n8n",
        "AI pipelines",
        "Mobil",
        "Backend",
      ],
    },
  },

  footer: {
    brandSubtitle: { en: "Mobile engineer · React Native / Expo", tr: "Mobil geliştirici · React Native / Expo" },
    elsewhere:     { en: "Elsewhere",  tr: "Sosyal" },
    navigate:      { en: "Navigate",   tr: "Sayfalar" },
    backToTop:     { en: "Back to top",tr: "En üste" },
    craftedIn:     { en: "Crafted in Konya, Türkiye", tr: "Konya'da hazırlandı" },
    copyright:     { en: "©",          tr: "©" },
  },
} as const;
