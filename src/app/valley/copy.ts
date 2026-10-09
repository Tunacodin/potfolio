import type { Localized } from "../i18n/dictionary";

/** The film is cut into acts, each with its own scroll length in vh and its own 0..1 clock,
    so adding an act never retimes the others. */
const ACT_VH = { valley: 681, beacon: 454, river: 520, clearing: 760, horizon: 340 } as const;
export type Act = keyof typeof ACT_VH;
/** Scroll track in vh. */
export const TRACK_VH = Object.values(ACT_VH).reduce((a, b) => a + b, 0);
export const ACTS = (() => {
  const out = {} as Record<Act, [number, number]>;
  let s = 0;
  for (const k of Object.keys(ACT_VH) as Act[]) out[k] = [s / TRACK_VH, (s += ACT_VH[k]) / TRACK_VH];
  return out;
})();
/** Act-local time -> film progress. */
export const at = (act: Act, x: number) => ACTS[act][0] + x * (ACTS[act][1] - ACTS[act][0]);
/** Film progress -> act-local time, clamped to 0..1. */
export const local = (act: Act, p: number) => Math.min(1, Math.max(0, (p - ACTS[act][0]) / (ACTS[act][1] - ACTS[act][0])));

/** One line on screen at a time; `from`/`to` are film progress, `y` the line's height on screen. */
export type Beat = { id: string; from: number; to: number; text: Localized; small?: Localized; size: "xl" | "l"; y?: number };

export const BEATS: Beat[] = [
  {
    id: "fog",
    from: 0,
    to: at("valley", 0.22),
    size: "xl",
    text: { tr: "Her ürün bir sisle başlar.", en: "Every product begins in fog." },
  },
  {
    id: "search",
    from: at("valley", 0.27),
    to: at("valley", 0.47),
    size: "l",
    text: { tr: "Netlik bulunmaz, inşa edilir.", en: "Clarity isn't found. It's built." },
  },
  {
    id: "ground",
    from: at("valley", 0.58),
    to: at("valley", 0.72),
    size: "xl",
    text: { tr: "Görünmeyen kısım, görüneni taşır.", en: "The unseen part carries the seen." },
    small: { tr: "Teknoloji", en: "Technology" },
  },
  {
    id: "next",
    from: at("valley", 0.93),
    to: at("beacon", 0.09),
    size: "l",
    text: { tr: "Uzaktaki ışık: marka.", en: "The far light: brand." },
  },
  // the beacon act: the light is drawn into a sign between `brand` and `one`, with no line on screen
  {
    id: "brand",
    from: at("beacon", 0.12),
    to: at("beacon", 0.34),
    size: "l",
    y: 0.62,
    text: { tr: "Marka bir işarettir. Uzaktan tanınır.", en: "A brand is a signal. Known from afar." },
    small: { tr: "Marka", en: "Brand" },
  },
  {
    id: "one",
    from: at("beacon", 0.68),
    to: at("beacon", 0.86),
    size: "l",
    y: 0.62,
    text: { tr: "Renk, ses, biçim: tek ışık.", en: "Color, voice, form: one light." },
  },
  {
    id: "river",
    from: at("beacon", 0.9),
    to: at("river", 0.07),
    size: "l",
    y: 0.62,
    text: { tr: "Değişerek kalan: nehir.", en: "What lasts by changing: the river." },
  },
  // the river act: the sign's light runs down into the valley as dawn comes; the ink flips between `bed` and `adapt`
  {
    id: "bed",
    from: at("river", 0.15),
    to: at("river", 0.34),
    size: "xl",
    text: { tr: "Su her gün yenidir. Yatak aynı kalır.", en: "The water is new each day. The bed stays." },
    small: { tr: "Sürdürülebilirlik", en: "Sustainability" },
  },
  {
    id: "adapt",
    from: at("river", 0.46),
    to: at("river", 0.68),
    size: "l",
    text: { tr: "Yeni teknolojiye ayak uyduran ürün eskimez.", en: "A product that keeps up with new technology doesn't age." },
  },
  {
    id: "clearing",
    from: at("river", 0.76),
    to: at("river", 1.01),
    size: "l",
    text: { tr: "Sisin ötesi: açıklık.", en: "Beyond the fog: the clearing." },
  },
  // the clearing act: full day; one line, then the products one at a time (SHOWCASE)
  {
    id: "quality",
    from: at("clearing", 0.03),
    to: at("clearing", 0.11),
    size: "xl",
    text: { tr: "Sis kalkınca iş görünür.", en: "When the fog lifts, the work shows." },
    small: { tr: "Kalite", en: "Quality" },
  },
  // the horizon act: the gaze lifts to the sky, and the film ends on an invitation
  {
    id: "horizon",
    from: at("horizon", 0.06),
    to: at("horizon", 0.4),
    size: "xl",
    text: { tr: "Her açıklık yeni bir ufuk gösterir.", en: "Every clearing shows a new horizon." },
    small: { tr: "Ufuk", en: "Horizon" },
  },
  {
    id: "invite",
    from: at("horizon", 0.5),
    to: 1.01,
    size: "l",
    y: 0.36,
    text: { tr: "Sisin içinde bir fikrin mi var? Birlikte netleştirelim.", en: "Got an idea in the fog? Let's make it clear together." },
  },
];

/** Film window where the products pass one at a time, each holding an equal slot. */
export const SHOWCASE = { from: at("clearing", 0.13), to: at("clearing", 1) };
/** Film progress where the contact row comes up under the last line. */
export const CTA_AT = at("horizon", 0.62);

/** Half-formed thoughts hidden in the fog; the lantern finds them. x/y in viewport fractions. */
export const WHISPERS: { text: Localized; x: number; y: number }[] = [
  { text: { tr: "fikir", en: "an idea" }, x: 0.22, y: 0.3 },
  { text: { tr: "belki", en: "maybe" }, x: 0.72, y: 0.24 },
  { text: { tr: "nasıl?", en: "how?" }, x: 0.62, y: 0.68 },
  { text: { tr: "kim için?", en: "for whom?" }, x: 0.15, y: 0.66 },
  { text: { tr: "ya şöyle olsaydı", en: "what if" }, x: 0.43, y: 0.17 },
  { text: { tr: "neden?", en: "why?" }, x: 0.84, y: 0.5 },
];

/** Tech names sit on lattice nodes; offsets in metres from the reveal origin. */
export const TECH: { name: string; at: [number, number] }[] = [
  { name: "React Native", at: [-22, -26] },
  { name: "TypeScript", at: [26, -34] },
  { name: "Expo", at: [-46, -46] },
  { name: "Supabase", at: [46, -52] },
  { name: "Three.js", at: [-8, -60] },
  { name: "Reanimated", at: [-34, -78] },
  { name: "Skia", at: [20, -84] },
  { name: "Electron", at: [56, -96] },
];

export const STOPS: { id: string; at: number | null; name: Localized }[] = [
  { id: "arayis", at: 0, name: { tr: "Arayış", en: "Search" } },
  { id: "temel", at: at("valley", 0.68), name: { tr: "Temel", en: "Ground" } },
  { id: "isaret", at: at("beacon", 0.66), name: { tr: "İşaret", en: "Beacon" } },
  { id: "nehir", at: at("river", 0.24), name: { tr: "Nehir", en: "River" } },
  { id: "aciklik", at: at("clearing", 0.135), name: { tr: "Açıklık", en: "Clearing" } },
  { id: "ufuk", at: at("horizon", 0.7), name: { tr: "Ufuk", en: "Horizon" } },
];

export const UI = {
  name: "Tuna Bostancıbaşı",
  role: { tr: "Teknoloji, marka, kalıcı ürünler.", en: "Technology, brand, lasting products." },
  contact: { tr: "Doğrudan iletişim", en: "Get in touch" },
  sound: { tr: "Ses", en: "Sound" },
  scroll: { tr: "Kaydır", en: "Scroll" },
  visit: { tr: "Ürünü aç", en: "Open product" },
  write: { tr: "E-posta gönder", en: "Send an email" },
} satisfies Record<string, Localized | string>;
