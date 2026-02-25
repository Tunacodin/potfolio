export type ToolItem = {
  id: string;
  name: string;
  description: string;
  image?: string;
};

export type PremiumToolsByCategory = {
  languages: ToolItem[];
  developmentTools: ToolItem[];
  platforms: ToolItem[];
};

/** Yazılım dilleri (görseller CDN) */
export const languages: ToolItem[] = [
  { id: "ts", name: "TypeScript", description: "Typed JavaScript", image: "https://cdn.simpleicons.org/typescript/3178C6" },
  { id: "js", name: "JavaScript", description: "Runtime & frontend", image: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { id: "csharp", name: "C#", description: ".NET ecosystem", image: "https://dotnet.microsoft.com/favicon.ico" },
  { id: "sql", name: "SQL", description: "MS SQL, PostgreSQL", image: "https://www.microsoft.com/favicon.ico" },
];

/** Geliştirme araçları (görseller CDN) */
export const developmentTools: ToolItem[] = [
  { id: "rn-expo", name: "React Native & Expo", description: "Cross-platform mobile", image: "https://cdn.simpleicons.org/react/61DAFB" },
  { id: "android-emulator", name: "Android Emulator", description: "Genymotion / Android Studio", image: "https://cdn.simpleicons.org/android/3DDC84" },
  { id: "emulator", name: "iOS Simulator", description: "Xcode device simulators", image: "https://cdn.simpleicons.org/apple/ffffff" },
  { id: "expogo", name: "Expo Go", description: "Quick mobile prototyping", image: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/expo.svg" },
  { id: "nodejs", name: "Node.js", description: "JavaScript runtime", image: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { id: "tailwind", name: "Tailwind CSS", description: "Utility-first CSS", image: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { id: "circle", name: "Circle", description: "Community platform", image: "https://circle.so/favicon.ico" },
];

/** Platformlar & servisler: Git, GitHub, Supabase, n8n vb. (görseller CDN) */
export const platforms: ToolItem[] = [
  { id: "git", name: "Git", description: "Version control", image: "https://cdn.simpleicons.org/git/F05032" },
  { id: "github", name: "GitHub", description: "Code hosting & CI/CD", image: "https://cdn.simpleicons.org/github/ffffff" },
  { id: "supabase", name: "Supabase", description: "Backend & auth", image: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { id: "n8n", name: "n8n", description: "Workflow automation", image: "https://cdn.simpleicons.org/n8n/FF6D5A" },
  { id: "vercel", name: "Vercel", description: "Deploy & hosting", image: "https://cdn.simpleicons.org/vercel/000000" },
  { id: "firebase", name: "Firebase", description: "Backend & analytics", image: "https://cdn.simpleicons.org/firebase/FFCA28" },
];

/** Tüm kategoriler tek export (Premium Tools bölümü için) */
export const premiumTools: PremiumToolsByCategory = {
  languages,
  developmentTools,
  platforms,
};
