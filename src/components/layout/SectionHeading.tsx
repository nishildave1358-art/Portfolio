import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./SectionHeading.css";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const { ref, isVisible } = useScrollReveal();
  const reducedMotion = useReducedMotion();

  return (
    <div ref={ref} className={`section-heading section-heading--${align}`}>
      {label && (
        <motion.span
          className="section-heading__label"
          initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0 }}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        className="section-heading__title"
        initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="section-heading__line"
        initial={reducedMotion ? {} : { scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      {subtitle && (
        <motion.p
          className="section-heading__subtitle"
          initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
