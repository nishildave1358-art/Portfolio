import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionHeading from "../layout/SectionHeading";
import "./CodeShowcase.css";

const CODE_SNIPPETS = [
  {
    title: "React Component",
    filename: "Hero.tsx",
    language: "tsx",
    code: `const Hero = () => {
  const [scrambleDone, setScrambleDone] = useState(false);

  return (
    <section className="hero">
      <InteractiveVisual />
      <h1>
        <TextScramble text="Nishil Dave" />
      </h1>
      <MagneticButton>
        Explore My Work
      </MagneticButton>
    </section>
  );
};`,
  },
  {
    title: "API Route",
    filename: "api/projects.ts",
    language: "ts",
    code: `export async function getProjects() {
  const repos = await fetch(
    "https://api.github.com/users/nishildave1358-art/repos"
  );

  return repos.map(repo => ({
    name: repo.name,
    description: repo.description,
    stars: repo.stargazers_count,
    language: repo.language,
  }));
}`,
  },
  {
    title: "Custom Hook",
    filename: "useScrollReveal.ts",
    language: "ts",
    code: `export function useScrollReveal<T>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}`,
  },
];

export default function CodeShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const { ref, isVisible } = useScrollReveal();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDisplayedCode(CODE_SNIPPETS[activeIndex].code);
      return;
    }

    const code = CODE_SNIPPETS[activeIndex].code;
    let index = 0;
    setDisplayedCode("");

    const interval = setInterval(() => {
      if (index < code.length) {
        setDisplayedCode(code.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [activeIndex, reducedMotion]);

  return (
    <section className="code-showcase section" id="code">
      <div className="container">
        <SectionHeading
          label="// code"
          title="How I Think"
          subtitle="A glimpse into the code behind the projects."
          align="center"
        />

        <div ref={ref} className="code-showcase__container">
          {/* Tab selector */}
          <div className="code-showcase__tabs">
            {CODE_SNIPPETS.map((snippet, i) => (
              <button
                key={snippet.filename}
                className={`code-showcase__tab ${i === activeIndex ? "code-showcase__tab--active" : ""}`}
                onClick={() => setActiveIndex(i)}
                data-cursor-hover
              >
                <span className="code-showcase__tab-dot" />
                {snippet.filename}
              </button>
            ))}
          </div>

          {/* Code editor */}
          <motion.div
            className="code-showcase__editor"
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <div className="code-showcase__titlebar">
              <div className="code-showcase__dots">
                <span className="code-showcase__dot code-showcase__dot--red" />
                <span className="code-showcase__dot code-showcase__dot--yellow" />
                <span className="code-showcase__dot code-showcase__dot--green" />
              </div>
              <span className="code-showcase__filename">
                {CODE_SNIPPETS[activeIndex].filename}
              </span>
              <span className="code-showcase__language">
                {CODE_SNIPPETS[activeIndex].language}
              </span>
            </div>

            <div className="code-showcase__body">
              <div className="code-showcase__line-numbers">
                {displayedCode.split("\n").map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <pre className="code-showcase__code">
                <code>{displayedCode}</code>
                <span className="code-showcase__cursor">▌</span>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
