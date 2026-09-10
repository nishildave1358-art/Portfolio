import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionHeading from "../layout/SectionHeading";
import "./ContactCTA.css";

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function ContactCTA() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <SectionHeading
          label="// connect"
          title="Let's Connect"
          subtitle="I'm always open to interesting conversations and opportunities."
          align="center"
        />

        <div className="contact__perspective">
          <motion.div
            ref={cardRef}
            className="contact__card"
            initial={reducedMotion ? {} : { opacity: 0, y: 24 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : {}
            }
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >

            <motion.div
              className="contact__inner"
              variants={reducedMotion ? undefined : stagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p
                className="contact__message"
                variants={reducedMotion ? undefined : fadeUp}
              >
                I'm currently looking for{" "}
                <span className="text-accent">internship opportunities</span>{" "}
                where I can learn, contribute, and gain real-world experience. If
                you're working on something interesting or have an opportunity —
                I'd love to hear from you.
              </motion.p>

              <motion.div
                className="contact__ctas"
                variants={reducedMotion ? undefined : fadeUp}
              >
                <a
                  href="mailto:nishildave1358@gmail.com"
                  className="contact__cta contact__cta--primary"
                  data-cursor-hover
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Send Email
                </a>
                <a
                  href="https://www.linkedin.com/in/nishildave"
                  className="contact__cta contact__cta--secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </motion.div>

              <motion.p
                className="contact__collab"
                variants={reducedMotion ? undefined : fadeUp}
              >
                Also open to collaboration on interesting projects.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
