import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionHeading from "../layout/SectionHeading";
import "./Timeline.css";

const timelineEvents = [
  {
    year: "2025",
    title: "Started B.Tech — Computer Engineering",
    org: "Dharmsinh Desai University",
    description: "Began my journey into computer engineering, driven by curiosity about how technology works.",
    type: "education" as const,
  },
  {
    year: "2025",
    title: "Outskill — Generative AI",
    org: "Outskill",
    description: "Explored the fundamentals of generative AI and its applications.",
    type: "program" as const,
  },
  {
    year: "2026",
    title: "Barracks Defence WarGames Q3 LHE",
    org: "Security Hackathon",
    description: "Team rank #5 — vulnerability discovery and reporting in a hands-on security challenge.",
    type: "hackathon" as const,
  },
  {
    year: "2026",
    title: "IEEE SB Bootcamp",
    org: "IEEE Student Branch",
    description: "Ongoing participation in IEEE's student branch bootcamp program.",
    type: "program" as const,
  },
  {
    year: "Now",
    title: "Building & Exploring",
    org: "Self-directed",
    description: "Full-stack development, cybersecurity research, DSA practice, and collaborative projects.",
    type: "growth" as const,
  },
];

export default function Timeline() {
  const { ref, isVisible } = useScrollReveal();
  const reducedMotion = useReducedMotion();

  return (
    <section className="journey section" id="journey">
      <div className="container">
        <SectionHeading
          label="// journey"
          title="My Journey"
          subtitle="A student → builder → explorer → problem solver."
        />

        <div className="timeline" ref={ref}>
          {timelineEvents.map((event, i) => (
            <motion.div
              key={`${event.year}-${event.title}`}
              className={`timeline__item timeline__item--${event.type}`}
              initial={reducedMotion ? {} : { opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="timeline__marker">
                <div className="timeline__dot" />
                {i < timelineEvents.length - 1 && <div className="timeline__line" />}
              </div>

              <div className="timeline__content">
                <div className="timeline__meta">
                  <span className="timeline__year">{event.year}</span>
                  <span className={`timeline__type timeline__type--${event.type}`}>
                    {event.type}
                  </span>
                </div>
                <h3 className="timeline__title">{event.title}</h3>
                <p className="timeline__org">{event.org}</p>
                <p className="timeline__description">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
