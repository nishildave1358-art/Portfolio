import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionHeading from "../layout/SectionHeading";
import "./About.css";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function AnimatedCounter({ end, suffix = "", label, delay = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.5 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const duration = 1500;
      const startTime = Date.now();

      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, end, delay]);

  return (
    <div ref={ref} className="about__counter">
      <span className="about__counter-number">
        {reducedMotion ? end : count}{suffix}
      </span>
      <span className="about__counter-label">{label}</span>
    </div>
  );
}

const highlights = [
  { icon: "⌨️", label: "Web Development", desc: "React, TypeScript, Node.js" },
  { icon: "🔒", label: "Cybersecurity", desc: "Vulnerability research & hackathons" },
  { icon: "🤝", label: "Collaboration", desc: "Team projects & open-source" },
  { icon: "🧠", label: "Problem Solving", desc: "DSA & competitive programming" },
];

export default function About() {
  const { ref, isVisible } = useScrollReveal();
  const reducedMotion = useReducedMotion();

  return (
    <section className="about section" id="about">
      <div className="container">
        <SectionHeading
          label="// about"
          title="Who I Am"
          subtitle="A snapshot of who I am, what I build, and where I'm headed."
        />

        <div ref={ref} className="about__grid">
          <motion.div
            className="about__text"
            initial={reducedMotion ? {} : { opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <p className="about__paragraph">
              I'm <strong>Nishil Dave</strong>, a second-year Computer Engineering student
              at Dharmsinh Desai University. I enjoy turning ideas into practical digital
              experiences — whether that's a web application, an interactive game, or
              exploring how systems can be made more secure.
            </p>
            <p className="about__paragraph">
              I'm building my skills through web development, programming, cybersecurity
              research, hackathons, and collaborative projects. My focus is on{" "}
              <span className="text-accent">learning by building</span> and solving
              real-world problems.
            </p>
            <p className="about__paragraph">
              Currently exploring full-stack development and cybersecurity while
              strengthening my foundations in DSA and networking. I believe in{" "}
              <span className="text-accent">curiosity by nature, building by choice</span>{" "}
              — and I'm just getting started.
            </p>

            {/* Counters */}
            <div className="about__counters">
              <AnimatedCounter end={5} label="Projects Built" delay={0} />
              <AnimatedCounter end={5} suffix="+" label="Hackathons" delay={100} />
              <AnimatedCounter end={9} suffix="+" label="Technologies" delay={200} />
              <AnimatedCounter end={5} label="Rank #5 Wargames" delay={300} />
            </div>
          </motion.div>

          <motion.div
            className="about__highlights"
            initial={reducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="about__highlight"
                initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -3, scale: 1.01 }}
                data-cursor-hover
              >
                <span className="about__highlight-icon">{item.icon}</span>
                <div className="about__highlight-text">
                  <span className="about__highlight-label">{item.label}</span>
                  <span className="about__highlight-desc">{item.desc}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
