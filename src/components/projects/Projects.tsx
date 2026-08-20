import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionHeading from "../layout/SectionHeading";
import ProjectCard from "./ProjectCard";
import SpotlightCard from "../layout/SpotlightCard";
import TiltCard from "../layout/TiltCard";
import { projects } from "../../data/projects";
import "./Projects.css";

const projectAccentColors: Record<string, string> = {
  eqoquest: "rgba(34, 211, 238, 0.15)",
  odoocafepos: "rgba(244, 114, 182, 0.15)",
  "talent-ai": "rgba(167, 139, 250, 0.15)",
  travelloop: "rgba(251, 146, 60, 0.15)",
};

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const smallerProjects = projects.filter((p) => !p.featured);
  const { ref, isVisible } = useScrollReveal();
  const reducedMotion = useReducedMotion();

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <SectionHeading
          label="// work"
          title="Things I've Built"
          subtitle="Selected projects that showcase what I enjoy building and the problems I like solving."
        />

        {/* Featured Projects with Tilt + Spotlight */}
        <div className="projects__featured" ref={ref}>
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={reducedMotion ? {} : { opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
            >
              <SpotlightCard color={projectAccentColors[project.id] || "rgba(200, 255, 46, 0.08)"}>
                <TiltCard>
                  <ProjectCard project={project} featured />
                </TiltCard>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Smaller Projects */}
        {smallerProjects.length > 0 && (
          <div className="projects__smaller">
            <h3 className="projects__smaller-title">Other Projects</h3>
            <div className="projects__smaller-grid">
              {smallerProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94] as const,
                  }}
                >
                  <SpotlightCard color={projectAccentColors[project.id] || "rgba(200, 255, 46, 0.08)"}>
                    <ProjectCard project={project} />
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* GitHub CTA */}
        <motion.div
          className="projects__github"
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="projects__github-text">
            Want to see more of my code?
          </p>
          <a
            href="https://github.com/nishildave1358-art"
            className="projects__github-link"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View GitHub Profile →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
