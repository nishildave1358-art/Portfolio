export interface SkillCategory {
  label: string;
  type: "used" | "exploring";
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Programming",
    type: "used",
    items: ["C", "C++"],
  },
  {
    label: "Web Development",
    type: "used",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js"],
  },
  {
    label: "Data & Integration",
    type: "used",
    items: ["REST APIs", "Databases"],
  },
  {
    label: "Tools & Other",
    type: "used",
    items: ["Python", "Git", "GitHub", "Vite"],
  },
  {
    label: "Currently Exploring",
    type: "exploring",
    items: ["DSA", "Cybersecurity", "Networking", "Advanced JavaScript", "Advanced Python"],
  },
];
