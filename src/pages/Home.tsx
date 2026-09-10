import { useState, useCallback } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useTheme } from "../hooks/useTheme";
import Navbar from "../components/layout/Navbar";
import PageLoader from "../components/layout/PageLoader";
import ScrollProgress from "../components/layout/ScrollProgress";
import SectionDivider from "../components/layout/SectionDivider";
import BackToTop from "../components/layout/BackToTop";
import ThemeToggle from "../components/layout/ThemeToggle";
import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Projects from "../components/projects/Projects";
import CodeShowcase from "../components/projects/CodeShowcase";
import TechnologyPlayground from "../components/skills/TechnologyPlayground";
import Cybersecurity from "../components/cybersecurity/Cybersecurity";
import CurrentlyExploring from "../components/exploring/CurrentlyExploring";
import Timeline from "../components/journey/Timeline";
import ContactCTA from "../components/contact/ContactCTA";
import Footer from "../components/layout/Footer";
import EasterEgg from "../components/easter-egg/EasterEgg";

export default function Home() {
  const [, setLoaded] = useState(false);
  const { theme, toggleTheme } = useTheme();
  useSmoothScroll();

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <a href="#hero" className="skip-to-content">
        Skip to content
      </a>
      <PageLoader onComplete={handleLoadComplete} />
      <ScrollProgress />
      <div className="theme-toggle-wrapper">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <CodeShowcase />
        <SectionDivider />
        <About />
        <SectionDivider />
        <TechnologyPlayground />
        <SectionDivider />
        <Cybersecurity />
        <SectionDivider />
        <CurrentlyExploring />
        <SectionDivider />
        <Timeline />
        <SectionDivider />
        <ContactCTA />
      </main>
      <Footer />
      <BackToTop />
      <EasterEgg />
    </>
  );
}
