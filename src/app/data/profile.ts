import type { Localized } from "../i18n/dictionary";

export const profile = {
  name: "Tuna Bostancıbaşı",
  title: {
    en: "Mobile Application Developer · React Native / Expo",
    tr: "Mobil Uygulama Geliştirici · React Native / Expo",
  } as Localized,
  location: {
    en: "Konya, Türkiye",
    tr: "Konya, Türkiye",
  } as Localized,
  email: "tunabstncx@gmail.com",
  phone: "+90 538 722 72 58",
  links: {
    linkedin: "https://linkedin.com/in/tuna-bostancibasi",
    github:   "https://github.com/Tunacodin",
    instagram: "",
    website:  "https://tunabostancibasi.com",
  },
  education: [
    {
      school: "Pamukkale University",
      place: { en: "Denizli",  tr: "Denizli" } as Localized,
      period: { en: "2020 – 2025", tr: "2020 – 2025" } as Localized,
      degree: {
        en: "B.Sc. Computer Engineering",
        tr: "Bilgisayar Mühendisliği · Lisans",
      } as Localized,
    },
  ],
  languages: [
    {
      name:  { en: "Turkish", tr: "Türkçe" } as Localized,
      level: { en: "Native",  tr: "Ana Dil" } as Localized,
    },
    {
      name:  { en: "English", tr: "İngilizce" } as Localized,
      level: { en: "B2",      tr: "B2 — Orta-İleri" } as Localized,
    },
  ],
};
