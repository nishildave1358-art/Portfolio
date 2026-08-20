import { motion } from "framer-motion";
import "./ThemeToggle.css";

interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      data-cursor-hover
    >
      <motion.div
        className="theme-toggle__track"
        animate={{
          backgroundColor: theme === "dark" ? "rgba(200, 255, 46, 0.1)" : "rgba(200, 255, 46, 0.2)",
        }}
      >
        <motion.div
          className="theme-toggle__thumb"
          animate={{ x: theme === "dark" ? 0 : 22 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {theme === "dark" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}
