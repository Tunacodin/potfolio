import { Header } from "../components/Header";
import { StickyProfile } from "../components/StickyProfile";
import { Hero } from "../components/Hero";
import { SelectedWork } from "../components/SelectedWork";
import { Experience } from "../components/Experience";
import { Education } from "../components/Education";
import { TechStack } from "../components/TechStack";
import { Blog } from "../components/Blog";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ fontFamily: "'Poppins', sans-serif", background: "var(--background)" }}
    >
      <Header />
      <div className="flex flex-col lg:flex-row pt-16 lg:pt-20">
        {/* Left: sticky profile - visible on lg and up */}
        <aside className="hidden lg:block lg:w-[340px] lg:shrink-0 lg:pl-8 xl:pl-12 lg:pr-4 pt-6">
          <StickyProfile />
        </aside>
        {/* Right: scrollable content */}
        <main className="flex-1 min-w-0 px-6 md:px-8 lg:px-12 xl:px-16 pt-8 lg:pt-12 pb-0">
          <Hero />
          <SelectedWork />
          <Experience />
          <Education />
          <TechStack />
          <Blog />
          <Contact />
          <Footer />
        </main>
      </div>
      {/* Mobile: profile at top (optional compact version) - for now we only show on lg */}
    </div>
  );
}
