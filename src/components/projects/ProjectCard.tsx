import { motion } from "framer-motion";
import type { Project } from "../../data/projects";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const accentColors: Record<string, string> = {
  eqoquest: "#22d3ee",
  odoocafepos: "#f472b6",
  "talent-ai": "#a78bfa",
  travelloop: "#fb923c",
};

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const accentColor = accentColors[project.id] || "var(--color-accent)";

  return (
    <motion.article
      className={`project-card ${featured ? "project-card--featured" : ""}`}
      style={{ "--card-accent": accentColor } as React.CSSProperties}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      data-cursor-hover
    >
      {/* Gradient background that shows on hover */}
      <div
        className="project-card__gradient"
        style={{
          background: `radial-gradient(ellipse at 80% 20%, ${accentColor}08 0%, transparent 60%)`,
        }}
      />

      <div className="project-card__glow" style={{ background: accentColor }} />

      <div className="project-card__inner">
        <div className="project-card__header">
          <div className="project-card__title-row">
            <h3 className="project-card__name">{project.name}</h3>
            <span className={`project-card__status project-card__status--${project.status}`}>
              {project.status === "ongoing" ? "Ongoing" : project.status === "in-progress" ? "In Progress" : "Completed"}
            </span>
          </div>
          <p className="project-card__role" style={{ color: accentColor }}>{project.role}</p>
        </div>

        <p className="project-card__description">{project.description}</p>

        {project.highlights && featured && (
          <ul className="project-card__highlights">
            {project.highlights.map((h) => (
              <li key={h} className="project-card__highlight-item">
                <span className="project-card__highlight-dot" style={{ background: accentColor }} />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="project-card__footer">
          <div className="project-card__tech">
            {project.technologies.map((tech) => (
              <span key={tech} className="project-card__tech-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-card__links">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className="project-card__link"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="project-card__link"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" />
                </svg>
                Live
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Top accent line */}
      <div className="project-card__accent-line" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
    </motion.article>
  );
}
