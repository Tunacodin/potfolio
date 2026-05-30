import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { SelectedWork } from "../components/SelectedWork";
import { Experience } from "../components/Experience";
import { TechStack } from "../components/TechStack";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <Header />

      <main className="w-full pt-20 md:pt-24">
        {/* Page 1 — Hero */}
        <Hero />

        {/* Page 2 — Selected work */}
        <SelectedWork />

        {/* Page 3 — Stack, Experience, Contact */}
        <TechStack />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
