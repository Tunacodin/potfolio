import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { TechStack } from "../components/TechStack";
import { SelectedWork } from "../components/SelectedWork";
import { Experience } from "../components/Experience";
import { Education } from "../components/Education";
import { Skills } from "../components/Skills";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <About />
      <TechStack />
      <SelectedWork />
      <Experience />
      <Education />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
