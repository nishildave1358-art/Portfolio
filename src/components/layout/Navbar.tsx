import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "../../utils/helpers";
import { useIsMobile } from "../../hooks/useMediaQuery";
import "./Navbar.css";

const navItems = [
  { label: "Work", id: "projects" },
  { label: "About", id: "about" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 2.2 }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__inner">
          <a
            href="#"
            className="navbar__logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Go to top"
            data-cursor-hover
          >
            <span className="navbar__logo-mark">ND</span>
          </a>

          {!isMobile && (
            <div className="navbar__links">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`navbar__link ${activeSection === item.id ? "navbar__link--active" : ""}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  data-cursor-hover
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      className="navbar__indicator"
                      layoutId="nav-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="navbar__actions">
            <button
              className="navbar__cta"
              onClick={() => handleNavClick("contact")}
              data-cursor-hover
            >
              Let's Connect
            </button>

            {isMobile && (
              <button
                className={`navbar__burger ${mobileOpen ? "navbar__burger--open" : ""}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <span />
                <span />
                <span />
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobile && mobileOpen && (
          <>
            <motion.div
              className="mobile-menu__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="mobile-menu__content">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    className={`mobile-menu__link ${activeSection === item.id ? "mobile-menu__link--active" : ""}`}
                    onClick={() => handleNavClick(item.id)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  >
                    <span className="mobile-menu__link-index">0{i + 1}</span>
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  className="mobile-menu__cta"
                  onClick={() => handleNavClick("contact")}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navItems.length * 0.08, duration: 0.4 }}
                >
                  Let's Connect
                </motion.button>
              </div>

              <motion.div
                className="mobile-menu__footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span>Still exploring. Still building.</span>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
