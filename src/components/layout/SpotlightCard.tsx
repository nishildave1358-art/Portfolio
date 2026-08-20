import { useRef, useState, useEffect } from "react";
import "./SpotlightCard.css";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  color = "rgba(200, 255, 46, 0.08)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        "--spotlight-x": `${position.x}px`,
        "--spotlight-y": `${position.y}px`,
        "--spotlight-color": color,
        "--spotlight-opacity": isHovered ? "1" : "0",
      } as React.CSSProperties}
    >
      <div className="spotlight-card__spotlight" />
      <div className="spotlight-card__content">{children}</div>
    </div>
  );
}
