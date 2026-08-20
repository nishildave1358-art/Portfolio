import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./EasterEgg.css";

const TERMINAL_SCRIPT: Array<{ type: "input" | "output"; text: string; delay: number }> = [
  { type: "input", text: "whoami", delay: 80 },
  { type: "output", text: "Nishil Dave — Computer Engineering Student", delay: 300 },
  { type: "input", text: "cat interests.txt", delay: 100 },
  { type: "output", text: "software · security · experimentation · learning", delay: 400 },
  { type: "input", text: "ls current_projects/", delay: 70 },
  { type: "output", text: "EqoQuest/  OdooCafePOS/  Talent-AI/", delay: 300 },
  { type: "input", text: "echo $STATUS", delay: 90 },
  { type: "output", text: "open_to_internships=true", delay: 250 },
  { type: "input", text: "cat secret.txt", delay: 120 },
  { type: "output", text: "You found the hidden terminal. Nice curiosity. 🔍", delay: 500 },
  { type: "output", text: "", delay: 0 },
  { type: "input", text: "_", delay: 0 },
];

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openTerminal = useCallback(() => {
    setIsOpen(true);
    setVisibleLines(0);
    setTypingText("");
  }, []);

  const closeTerminal = useCallback(() => {
    setIsOpen(false);
    setVisibleLines(0);
    setTypingText("");
    setIsTyping(false);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          closeTerminal();
        } else {
          openTerminal();
        }
      }
      if (e.key === "Escape" && isOpen) {
        closeTerminal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openTerminal, closeTerminal]);

  // Typing animation sequence
  useEffect(() => {
    if (!isOpen) return;

    let lineIndex = 0;

    const typeLine = () => {
      if (lineIndex >= TERMINAL_SCRIPT.length) return;

      const line = TERMINAL_SCRIPT[lineIndex];

      if (line.type === "input") {
        setIsTyping(true);
        setTypingText("");
        let charIndex = 0;

        const typeChar = () => {
          if (charIndex < line.text.length) {
            setTypingText(line.text.slice(0, charIndex + 1));
            charIndex++;
            typingTimeoutRef.current = setTimeout(typeChar, line.delay + Math.random() * 40);
          } else {
            setIsTyping(false);
            // Show the completed input line
            setVisibleLines((prev) => prev + 1);
            lineIndex++;
            typingTimeoutRef.current = setTimeout(typeLine, 300);
          }
        };

        typingTimeoutRef.current = setTimeout(typeChar, 200);
      } else {
        // Output line
        setVisibleLines((prev) => prev + 1);
        lineIndex++;
        typingTimeoutRef.current = setTimeout(typeLine, line.delay);
      }
    };

    typingTimeoutRef.current = setTimeout(typeLine, 600);

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines, typingText]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="easter-egg__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeTerminal}
          role="dialog"
          aria-label="Hidden terminal"
        >
          <motion.div
            className="easter-egg__terminal"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="easter-egg__titlebar">
              <div className="easter-egg__dots">
                <span className="easter-egg__dot easter-egg__dot--red" />
                <span className="easter-egg__dot easter-egg__dot--yellow" />
                <span className="easter-egg__dot easter-egg__dot--green" />
              </div>
              <span className="easter-egg__title">nishil@portfolio:~</span>
              <button
                className="easter-egg__close"
                onClick={closeTerminal}
                aria-label="Close terminal"
                data-cursor-hover
              >
                ✕
              </button>
            </div>

            <div className="easter-egg__body" ref={terminalRef}>
              {/* Completed lines */}
              {TERMINAL_SCRIPT.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={`easter-egg__line easter-egg__line--${line.type}`}>
                  {line.type === "input" ? (
                    <span className="easter-egg__prompt">
                      <span className="easter-egg__prompt-symbol">$</span> {line.text}
                    </span>
                  ) : line.text === "" ? (
                    <span>&nbsp;</span>
                  ) : (
                    <span className="easter-egg__output">{line.text}</span>
                  )}
                </div>
              ))}

              {/* Currently typing line */}
              {isTyping && (
                <div className="easter-egg__line easter-egg__line--input">
                  <span className="easter-egg__prompt">
                    <span className="easter-egg__prompt-symbol">$</span> {typingText}
                    <span className="easter-egg__cursor">▊</span>
                  </span>
                </div>
              )}

              {/* Idle cursor at end */}
              {!isTyping && visibleLines > 0 && visibleLines >= TERMINAL_SCRIPT.length && (
                <div className="easter-egg__line easter-egg__line--input">
                  <span className="easter-egg__prompt">
                    <span className="easter-egg__prompt-symbol">$</span>{' '}
                    <span className="easter-egg__cursor">▊</span>
                  </span>
                </div>
              )}
            </div>

            <div className="easter-egg__hint">
              Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to toggle · <kbd>Esc</kbd> to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
