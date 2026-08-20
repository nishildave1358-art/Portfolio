import "./NumberedSection.css";

interface NumberedSectionProps {
  number: string;
  children: React.ReactNode;
}

export default function NumberedSection({ number, children }: NumberedSectionProps) {
  return (
    <div className="numbered-section">
      <span className="numbered-section__number" aria-hidden="true">{number}</span>
      {children}
    </div>
  );
}
