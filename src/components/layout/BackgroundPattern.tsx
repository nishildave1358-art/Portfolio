import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./BackgroundPattern.css";

export default function BackgroundPattern() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="bg-pattern" aria-hidden="true">
      {/* Subtle dot grid */}
      <div className="bg-pattern__dots" />

      {/* Floating gradient orbs */}
      {!reducedMotion && (
        <>
          <div className="bg-pattern__orb bg-pattern__orb--1" />
          <div className="bg-pattern__orb bg-pattern__orb--2" />
          <div className="bg-pattern__orb bg-pattern__orb--3" />
        </>
      )}

      {/* Vignette overlay */}
      <div className="bg-pattern__vignette" />
    </div>
  );
}
