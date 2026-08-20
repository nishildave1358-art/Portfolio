import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./GridDecoration.css";

interface GridDecorationProps {
  position?: "left" | "right" | "center";
  opacity?: number;
}

export default function GridDecoration({
  position = "right",
  opacity = 0.03,
}: GridDecorationProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`grid-decoration grid-decoration--${position}`} aria-hidden="true">
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        style={{ opacity }}
      >
        {/* Grid lines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.line
            key={`h-${i}`}
            x1="0"
            y1={i * 50}
            x2="400"
            y2={i * 50}
            stroke="currentColor"
            strokeWidth="0.5"
            initial={reducedMotion ? {} : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.05, ease: "easeOut" }}
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.line
            key={`v-${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="400"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={reducedMotion ? {} : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.05 + 0.3, ease: "easeOut" }}
          />
        ))}
        {/* Corner accent */}
        <motion.circle
          cx="200"
          cy="200"
          r="3"
          fill="var(--color-accent)"
          initial={reducedMotion ? {} : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="60"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="0.5"
          initial={reducedMotion ? {} : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
        />
      </svg>
    </div>
  );
}
