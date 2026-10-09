import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Products } from "../components/Products";
import { About } from "../components/About";
import { Experience } from "../components/Experience";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { useSmoothScroll } from "../lib/scroll";

export default function Home() {
  useSmoothScroll();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
