import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./SectionDivider.css";

interface SectionDividerProps {
  label?: string;
}

export default function SectionDivider({ label }: SectionDividerProps) {
  const { ref, isVisible } = useScrollReveal();
  const reducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="section-divider" aria-hidden="true">
      <motion.div
        className="section-divider__line"
        initial={reducedMotion ? {} : { scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      />
      {label && (
        <motion.span
          className="section-divider__label"
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
