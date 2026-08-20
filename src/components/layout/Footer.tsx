import { motion } from "framer-motion";
import { socialLinks } from "../../data/socials";
import { scrollToSection } from "../../utils/helpers";
import "./Footer.css";

export default function Footer() {
  const primarySocials = socialLinks.filter((s) => s.primary);
  const secondarySocials = socialLinks.filter((s) => !s.primary);

  return (
    <footer className="footer" role="contentinfo">
      {/* Ambient top glow */}
      <div className="footer__glow" aria-hidden="true" />

      <div className="container">
        <div className="footer__top">
          {/* Big CTA */}
          <motion.div
            className="footer__cta-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="footer__cta-label">Have a project in mind?</p>
            <h2 className="footer__cta-heading">
              Let's build something{" "}
              <span className="footer__cta-accent">great</span> together.
            </h2>
            <a
              href="mailto:nishildave1358@gmail.com"
              className="footer__cta-button"
              data-cursor-hover
            >
              Get in touch →
            </a>
          </motion.div>

          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <a
                href="#"
                className="footer__logo"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                aria-label="Go to top"
                data-cursor-hover
              >
                <span className="footer__logo-mark">ND</span>
              </a>
              <p className="footer__name">Nishil Dave</p>
              <p className="footer__tagline">Still exploring. Still building.</p>
            </div>

            {/* Navigate */}
            <div className="footer__section">
              <h3 className="footer__heading">Navigate</h3>
              <button className="footer__link" onClick={() => scrollToSection("projects")}>
                Work
              </button>
              <button className="footer__link" onClick={() => scrollToSection("about")}>
                About
              </button>
              <button className="footer__link" onClick={() => scrollToSection("journey")}>
                Journey
              </button>
              <button className="footer__link" onClick={() => scrollToSection("contact")}>
                Contact
              </button>
            </div>

            {/* Connect */}
            <div className="footer__section">
              <h3 className="footer__heading">Connect</h3>
              {primarySocials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="footer__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                >
                  {social.name}
                </a>
              ))}
            </div>

            {/* Resume placeholder */}
            <div className="footer__section">
              <h3 className="footer__heading">More</h3>
              <span className="footer__link footer__link--muted">
                Resume — Coming Soon
              </span>
              <a
                href="https://github.com/nishildave1358-art"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Nishil Dave. Built with curiosity & code.
          </p>

          <div className="footer__secondary-socials">
            {secondarySocials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="footer__social-pill"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                data-cursor-hover
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
