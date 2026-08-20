import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionHeading from "../layout/SectionHeading";
import "./Cybersecurity.css";

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const tagVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Cybersecurity() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Move the shine effect
    const shine = cardRef.current.querySelector(
      ".cybersecurity__shine"
    ) as HTMLElement;
    if (shine) {
      shine.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(200, 255, 46, 0.06), transparent 40%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "";
    const shine = cardRef.current.querySelector(
      ".cybersecurity__shine"
    ) as HTMLElement;
    if (shine) {
      shine.style.background = "transparent";
    }
  };

  return (
    <section className="cybersecurity section" id="cybersecurity">
      <div className="container">
        <SectionHeading
          label="// security"
          title="Exploring Cybersecurity"
          subtitle="Hands-on vulnerability research and security-focused hackathons."
        />

        <div className="cybersecurity__perspective">
          <motion.div
            ref={cardRef}
            className="cybersecurity__card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={reducedMotion ? {} : { opacity: 0, y: 40, rotateX: 8 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : {}
            }
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Flash sweep overlay */}
            <div className="cybersecurity__flash" />

            {/* Interactive shine layer */}
            <div className="cybersecurity__shine" />

            {/* Glow border */}
            <div className="cybersecurity__glow" />

            <motion.div
              variants={reducedMotion ? undefined : stagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Header */}
              <div className="cybersecurity__card-header">
                <motion.div
                  className="cybersecurity__event-icon"
                  variants={reducedMotion ? undefined : scaleIn}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </motion.div>

                <div className="cybersecurity__title-group">
                  <motion.h3
                    className="cybersecurity__event-name"
                    variants={reducedMotion ? undefined : fadeUp}
                  >
                    Barracks Defence WarGames
                  </motion.h3>
                  <motion.p
                    className="cybersecurity__event-detail"
                    variants={reducedMotion ? undefined : fadeUp}
                  >
                    Q3 LHE 2026
                  </motion.p>
                </div>

                <motion.div
                  className="cybersecurity__rank"
                  variants={reducedMotion ? undefined : scaleIn}
                >
                  <span className="cybersecurity__rank-number">#5</span>
                  <span className="cybersecurity__rank-label">Team Rank</span>
                </motion.div>
              </div>

              {/* Body */}
              <div className="cybersecurity__card-body">
                <motion.p
                  className="cybersecurity__description"
                  variants={reducedMotion ? undefined : fadeUp}
                >
                  Identify vulnerabilities in a provided application/codebase and
                  submit vulnerability reports. Worked with one teammate on a team
                  of 2 (official size: 3).
                </motion.p>

                <div className="cybersecurity__details">
                  <motion.div
                    className="cybersecurity__detail"
                    variants={reducedMotion ? undefined : fadeUp}
                  >
                    <span className="cybersecurity__detail-label">Role</span>
                    <span className="cybersecurity__detail-value">
                      Vulnerability Discovery & Reporting
                    </span>
                  </motion.div>
                  <motion.div
                    className="cybersecurity__detail"
                    variants={reducedMotion ? undefined : fadeUp}
                  >
                    <span className="cybersecurity__detail-label">Findings</span>
                    <span className="cybersecurity__detail-value">
                      1 unique finding + multiple duplicate discoveries
                    </span>
                  </motion.div>
                  <motion.div
                    className="cybersecurity__detail"
                    variants={reducedMotion ? undefined : fadeUp}
                  >
                    <span className="cybersecurity__detail-label">Team</span>
                    <span className="cybersecurity__detail-value">
                      2 members (collaborative work)
                    </span>
                  </motion.div>
                  <motion.div
                    className="cybersecurity__detail"
                    variants={reducedMotion ? undefined : fadeUp}
                  >
                    <span className="cybersecurity__detail-label">
                      Certificate
                    </span>
                    <span className="cybersecurity__detail-value cybersecurity__detail-value--received">
                      ✓ Received
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Takeaways */}
              <div className="cybersecurity__takeaways">
                <motion.h4
                  className="cybersecurity__takeaways-title"
                  variants={reducedMotion ? undefined : fadeUp}
                >
                  Key Takeaways
                </motion.h4>
                <div className="cybersecurity__takeaway-tags">
                  {[
                    "Hands-on learning",
                    "Problem solving",
                    "Security curiosity",
                    "Teamwork",
                  ].map((tag) => (
                    <motion.span
                      key={tag}
                      className="cybersecurity__takeaway-tag"
                      variants={reducedMotion ? undefined : tagVariant}
                      whileHover={
                        reducedMotion
                          ? {}
                          : { scale: 1.05, y: -2 }
                      }
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          className="cybersecurity__note"
          initial={reducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Cybersecurity is an emerging area I'm actively exploring — not yet an
          area of deep expertise, but one I'm genuinely curious about and
          building foundations in.
        </motion.p>
      </div>
    </section>
  );
}
