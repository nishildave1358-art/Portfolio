import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./Marquee.css";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
}

export default function Marquee({ items, speed = 30, reverse = false }: MarqueeProps) {
  const reducedMotion = useReducedMotion();

  const content = items.map((item) => (
    <span key={item} className="marquee__item">
      <span className="marquee__text">{item}</span>
      <span className="marquee__dot">·</span>
    </span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div
        className={`marquee__track ${reducedMotion ? "marquee__track--static" : ""}`}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="marquee__content">{content}</div>
        <div className="marquee__content" aria-hidden="true">{content}</div>
      </div>
    </div>
  );
}
