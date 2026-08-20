import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./CustomCursor.css";

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  const ringConfig = { damping: 20, stiffness: 200, mass: 0.8 };
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  const trailRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);

      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 5) trailRef.current.shift();
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const overInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.closest(".project-card") ||
        target.closest(".tech-playground__tag") ||
        target.closest(".exploring__item") ||
        target.closest(".about__highlight") ||
        target.closest(".social-links__link")
      ) {
        setHovering(true);

        if (target.closest("[data-cursor-text]")) {
          setCursorText(target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") || "");
        }
      }
    };

    const leaveInteractive = () => {
      setHovering(false);
      setCursorText("");
    };

    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseover", overInteractive);
    document.addEventListener("mouseout", leaveInteractive);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", overInteractive);
      document.removeEventListener("mouseout", leaveInteractive);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
    };
  }, [reducedMotion, cursorX, cursorY, visible]);

  if (reducedMotion) return null;

  return (
    <div className={`custom-cursor ${visible ? "custom-cursor--visible" : ""}`} aria-hidden="true">
      {/* Main dot */}
      <motion.div
        className={`custom-cursor__dot ${clicking ? "custom-cursor__dot--click" : ""}`}
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: clicking ? 0.5 : hovering ? 0.3 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring */}
      <motion.div
        className={`custom-cursor__ring ${hovering ? "custom-cursor__ring--hover" : ""} ${clicking ? "custom-cursor__ring--click" : ""}`}
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: clicking ? 0.6 : hovering ? 1.8 : 1,
          opacity: hovering ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Cursor text label */}
      {cursorText && (
        <motion.div
          className="custom-cursor__text"
          style={{ x: ringX, y: ringY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {cursorText}
        </motion.div>
      )}

      {/* Glow trail on hover */}
      {hovering && (
        <motion.div
          className="custom-cursor__glow"
          style={{ x: ringX, y: ringY }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </div>
  );
}
