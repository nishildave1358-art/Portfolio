import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PageLoader.css";

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("reveal"), 1200);
    const timer2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="page-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="page-loader__content">
            {/* ND Monogram */}
            <motion.div
              className="page-loader__mark"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="page-loader__nd">ND</span>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="page-loader__bar-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <div className="page-loader__bar">
                <motion.div
                  className="page-loader__bar-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.4,
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="page-loader__tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase === "reveal" ? 1 : 0.4, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Still exploring. Still building.
            </motion.p>
          </div>

          {/* Curtain wipe on exit */}
          {phase === "reveal" && (
            <motion.div
              className="page-loader__curtain"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              style={{ transformOrigin: "bottom" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
