export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  role: string;
  technologies: string[];
  status: "ongoing" | "completed" | "in-progress";
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  color?: string;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: "eqoquest",
    name: "EqoQuest",
    slug: "eqoquest",
    tagline: "Interactive environmental education through game-based learning",
    description:
      "An interactive web application featuring game-style components designed to educate users about environmental topics. Includes experiences like Water Drop Catcher and Waste Sort Rush, built with structured level data and engaging mechanics.",
    role: "Developer",
    technologies: ["TypeScript", "React", "Vite", "Express", "REST APIs"],
    status: "ongoing",
    featured: true,
    githubUrl: "https://github.com/nishildave1358-art/EqoQuest",
    highlights: [
      "Water Drop Catcher interactive game",
      "Waste Sort Rush sorting mechanic",
      "Structured level progression system",
      "Game-style UI components",
    ],
  },
  {
    id: "odoocafepos",
    name: "OdooCafePOS",
    slug: "odoocafepos",
    tagline: "A modern point-of-sale system for cafe management",
    description:
      "A collaborative point-of-sale system built for cafe management, integrating with Odoo's ERP platform. A team project where I contributed frontend development and UI/UX design.",
    role: "Frontend Developer + UI/UX",
    technologies: ["JavaScript", "HTML", "CSS", "Odoo Framework"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com/nishildave1358-art/OdooCafePOS",
    highlights: [
      "Designed and developed the POS interface",
      "UI/UX decisions for order flow",
      "Frontend contribution to team project",
      "Responsive point-of-sale layout",
    ],
  },
  {
    id: "talent-ai",
    name: "Talent-AI",
    slug: "talent-ai",
    tagline: "AI-powered talent matching and assessment platform",
    description:
      "An AI-driven platform designed to streamline talent assessment and matching. Built as a collaborative project exploring the intersection of AI and recruitment.",
    role: "Developer",
    technologies: ["Python", "JavaScript", "APIs"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com/nishildave1358-art/Talent-AI",
  },
  {
    id: "travelloop",
    name: "Travelloop",
    slug: "travelloop",
    tagline: "A travel planning and experience sharing platform",
    description:
      "A web application for planning trips and sharing travel experiences. Built to explore full-stack development patterns with a focus on clean UI.",
    role: "Developer",
    technologies: ["React", "Node.js", "JavaScript"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com/nishildave1358-art/Travelloop",
  },
];
