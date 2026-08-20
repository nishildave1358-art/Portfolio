import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionHeading from "../layout/SectionHeading";
import Marquee from "./Marquee";
import "./CurrentlyExploring.css";

const exploringItems = [
  { name: "Data Structures & Algorithms", abbr: "DSA", icon: "📐" },
  { name: "Cybersecurity", abbr: "SEC", icon: "🔐" },
  { name: "Advanced JavaScript", abbr: "JS", icon: "⚡" },
  { name: "Advanced Python", abbr: "PY", icon: "🐍" },
  { name: "Networking", abbr: "NET", icon: "🌐" },
];

const marqueeItems = [
  "DSA",
  "Cybersecurity",
  "JavaScript",
  "Python",
  "Networking",
  "Problem Solving",
  "Full-Stack",
  "Security Research",
];

export default function CurrentlyExploring() {
  const { ref, isVisible } = useScrollReveal();
  const reducedMotion = useReducedMotion();

  return (
    <section className="exploring section" id="exploring">
      <div className="container">
        <SectionHeading
          label="// growth"
          title="Currently Exploring"
          subtitle="Always learning. Always building."
          align="center"
        />

        {/* Marquee ticker */}
        <Marquee items={marqueeItems} speed={35} />

        {/* Cards */}
        <div className="exploring__grid" ref={ref}>
          {exploringItems.map((item, i) => (
            <motion.div
              key={item.name}
              className="exploring__item"
              initial={reducedMotion ? {} : { opacity: 0, y: 20, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              whileHover={{ y: -6, scale: 1.03 }}
              data-cursor-hover
            >
              <span className="exploring__icon">{item.icon}</span>
              <span className="exploring__abbr">{item.abbr}</span>
              <span className="exploring__name">{item.name}</span>
              <span className="exploring__pulse" />
            </motion.div>
          ))}
        </div>

        {/* Second marquee — reverse */}
        <Marquee items={marqueeItems} speed={40} reverse />

        <motion.p
          className="exploring__closing"
          initial={reducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Still learning. Still building.
        </motion.p>
      </div>
    </section>
  );
}
