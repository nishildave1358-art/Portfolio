import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "../../utils/helpers";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import MagneticButton from "../layout/MagneticButton";
import TextScramble from "../layout/TextScramble";
import InteractiveHeroVisual from "./InteractiveHeroVisual";
import "./Hero.css";

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.6,
    },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 50, rotateX: -50 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const fadeUpDelayed = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [scrambleDone, setScrambleDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (scrambleDone) return;
    const t = setTimeout(() => setScrambleDone(true), 1600);
    return () => clearTimeout(t);
  }, [scrambleDone]);

  const firstName = "Nishil".split("");
  const lastName = "Dave".split("");

  return (
    <section className="hero" id="hero">
      <InteractiveHeroVisual />
      <div className="hero__overlay" />
      <div className="hero__gradient-orb hero__gradient-orb--1" />
      <div className="hero__gradient-orb hero__gradient-orb--2" />
      <div className="hero__gradient-orb hero__gradient-orb--3" />

      <div className="container hero__content">
        <motion.div
          className="hero__text"
          variants={reducedMotion ? undefined : stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Status pill */}
          <motion.div className="hero__status" variants={reducedMotion ? undefined : fadeUp}>
            <span className="hero__status-dot" />
            <span className="hero__status-text">Open to internships</span>
          </motion.div>

          <motion.p className="hero__label" variants={reducedMotion ? undefined : fadeUp}>
            <span className="hero__label-line" />
            Computer Engineering Student & Developer
          </motion.p>

          {/* Name with letter animation */}
          <h1 className="hero__name">
            <span className="hero__name-row">
              {firstName.map((char, i) => (
                <motion.span
                  key={`f-${i}`}
                  className="hero__letter"
                  variants={reducedMotion ? undefined : letterVariant}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="hero__name-row hero__name-row--accent">
              {lastName.map((char, i) => (
                <motion.span
                  key={`l-${i}`}
                  className="hero__letter hero__letter--accent"
                  variants={reducedMotion ? undefined : letterVariant}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Scramble tagline */}
          <motion.p className="hero__tagline" variants={reducedMotion ? undefined : fadeUpDelayed}>
            {reducedMotion ? (
              "Building software. Exploring security. Solving problems."
            ) : (
              <TextScramble
                text="Building software. Exploring security. Solving problems."
                trigger={mounted}
                duration={1500}
              />
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero__ctas" variants={reducedMotion ? undefined : fadeUp}>
            <MagneticButton strength={0.15}>
              <button
                className="hero__cta hero__cta--primary"
                onClick={() => scrollToSection("projects")}
                data-cursor-hover
              >
                Explore My Work
                <span className="hero__cta-arrow">↓</span>
              </button>
            </MagneticButton>
            <MagneticButton strength={0.15}>
              <button
                className="hero__cta hero__cta--secondary"
                onClick={() => scrollToSection("contact")}
                data-cursor-hover
              >
                Let's Connect
              </button>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero__scroll-hint"
          initial={reducedMotion ? undefined : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <span className="hero__scroll-text">scroll</span>
          <motion.span
            className="hero__scroll-line"
            animate={reducedMotion ? {} : { scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Brand tagline */}
        <motion.div
          className="hero__brand"
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={reducedMotion ? {} : { opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="hero__brand-text">Curious by nature. Building by choice.</span>
        </motion.div>

        {/* Year badge */}
        <motion.div
          className="hero__year-badge"
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
          animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
          transition={{ delay: 2.8, duration: 0.6 }}
        >
          <span className="hero__year-number">2026</span>
        </motion.div>
      </div>
    </section>
  );
}
