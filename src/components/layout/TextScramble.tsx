import { useEffect, useRef, useState } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean;
  duration?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function TextScramble({
  text,
  className = "",
  trigger = true,
  duration = 1200,
}: TextScrambleProps) {
  const [display, setDisplay] = useState("");
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;

    let frame = 0;
    const totalFrames = Math.floor(duration / 30);
    const chars = text.split("");

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;

      const result = chars.map((char, i) => {
        if (char === " ") return " ";
        const charProgress = i / chars.length;
        if (progress > charProgress + 0.3) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });

      setDisplay(result.join(""));

      if (frame < totalFrames) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [text, trigger, duration]);

  return <span className={className}>{display}</span>;
}
