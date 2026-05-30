export type ToolItem = {
  id: string;
  name: string;
  description: string;
  image?: string;
};

export type PremiumToolsByCategory = {
  core: ToolItem[];
  stateForms: ToolItem[];
  backend: ToolItem[];
  uiAnimation: ToolItem[];
  delivery: ToolItem[];
  languages: ToolItem[];
};

/** CORE — RN, Expo, Router, TS */
export const core: ToolItem[] = [
  { id: "react-native",  name: "React Native 0.83", description: "Cross-platform mobile",    image: "https://cdn.simpleicons.org/react/61DAFB" },
  { id: "expo",          name: "Expo SDK 55",        description: "Managed workflow & EAS",   image: "https://cdn.simpleicons.org/expo/FFFFFF" },
  { id: "expo-router",   name: "Expo Router",        description: "File-based navigation",    image: "https://cdn.simpleicons.org/expo/FFFFFF" },
  { id: "typescript",    name: "TypeScript",         description: "Typed JavaScript",         image: "https://cdn.simpleicons.org/typescript/3178C6" },
];

/** STATE & FORMS */
export const stateForms: ToolItem[] = [
  { id: "zustand",       name: "Zustand",            description: "Lightweight state store",  image: "https://cdn.simpleicons.org/react/61DAFB" },
  { id: "tanstack",      name: "TanStack Query",     description: "Async server state",       image: "https://cdn.simpleicons.org/reactquery/FF4154" },
  { id: "rhf",           name: "React Hook Form",    description: "Performant form lib",      image: "https://cdn.simpleicons.org/reacthookform/EC5990" },
  { id: "zod",           name: "Zod",                description: "Schema validation",        image: "https://cdn.simpleicons.org/zod/3E67B1" },
  { id: "asyncstorage",  name: "AsyncStorage",       description: "Persistent local storage", image: "https://cdn.simpleicons.org/react/61DAFB" },
];

/** BACKEND */
export const backend: ToolItem[] = [
  { id: "nodejs",        name: "Node.js",            description: "Server-side JavaScript",   image: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { id: "express",       name: "Express.js",         description: "Minimal Node.js framework", image: "https://cdn.simpleicons.org/express/000000" },
  { id: "supabase",      name: "Supabase",           description: "Postgres + auth",          image: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { id: "firebase",      name: "Firebase",           description: "Realtime, FCM, auth",      image: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { id: "dotnet",        name: ".NET 6 Web API",     description: "REST services in C#",      image: "https://cdn.simpleicons.org/dotnet/512BD4" },
  { id: "rest",          name: "REST / JWT",         description: "API contracts, auth",      image: "https://cdn.simpleicons.org/jsonwebtokens/000000" },
  { id: "axios",         name: "Axios",              description: "HTTP client",              image: "https://cdn.simpleicons.org/axios/5A29E4" },
];

/** UI / ANIMATION */
export const uiAnimation: ToolItem[] = [
  { id: "nativewind",    name: "NativeWind",         description: "Tailwind for RN",          image: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { id: "reanimated",    name: "Reanimated",         description: "Native 60fps motion",      image: "https://cdn.simpleicons.org/react/61DAFB" },
  { id: "skia",          name: "Skia",               description: "GPU 2D graphics",          image: "https://cdn.simpleicons.org/react/61DAFB" },
  { id: "flashlist",     name: "FlashList",          description: "Virtualized lists",        image: "https://cdn.simpleicons.org/shopify/96BF48" },
  { id: "bottomsheet",   name: "Bottom Sheet",       description: "Gorhom sheet system",      image: "https://cdn.simpleicons.org/react/61DAFB" },
  { id: "expo-blur",     name: "Expo Blur",          description: "Native blur views",        image: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/expo.svg" },
];

/** DELIVERY */
export const delivery: ToolItem[] = [
  { id: "eas",           name: "EAS Build",          description: "Cloud iOS/Android builds", image: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/expo.svg" },
  { id: "testflight",    name: "TestFlight",         description: "iOS beta distribution",    image: "https://cdn.simpleicons.org/apple/F4F1EB" },
  { id: "playconsole",   name: "Play Console",       description: "Android release tracks",   image: "https://cdn.simpleicons.org/googleplay/414141" },
  { id: "code-signing",  name: "Code Signing",       description: "iOS certs / keystores",    image: "https://cdn.simpleicons.org/letsencrypt/003A70" },
  { id: "ota",           name: "OTA Updates",        description: "Expo updates channels",    image: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/expo.svg" },
];

/** LANGUAGES */
export const languages: ToolItem[] = [
  { id: "ts",     name: "TypeScript", description: "Primary language",      image: "https://cdn.simpleicons.org/typescript/3178C6" },
  { id: "js",     name: "JavaScript", description: "Web & RN runtime",      image: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { id: "csharp", name: "C#",         description: ".NET backend",          image: "https://cdn.simpleicons.org/dotnet/512BD4" },
  { id: "java",   name: "Java",       description: "Android native bridges",image: "https://cdn.simpleicons.org/openjdk/ED8B00" },
  { id: "python", name: "Python",     description: "Scripts & tooling",     image: "https://cdn.simpleicons.org/python/3776AB" },
];

export const premiumTools: PremiumToolsByCategory = {
  core,
  stateForms,
  backend,
  uiAnimation,
  delivery,
  languages,
};
