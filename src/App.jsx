import { useEffect } from "react";
import Lenis from "lenis";
import "./App.css";

import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

function App() {
  useEffect(() => {
    // Respect reduced-motion + skip smooth scroll on touch (native is faster there)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      wheelMultiplier: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App relative" data-testid="app-root">
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
