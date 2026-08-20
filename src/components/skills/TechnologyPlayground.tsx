import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionHeading from "../layout/SectionHeading";
import { skillCategories } from "../../data/skills";
import "./TechnologyPlayground.css";

export default function TechnologyPlayground() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { ref, isVisible } = useScrollReveal();
  const reducedMotion = useReducedMotion();

  const filteredSkills = activeCategory
    ? skillCategories.filter((c) => c.label === activeCategory)
    : skillCategories;

  return (
    <section className="tech-playground section" id="skills">
      <div className="container">
        <SectionHeading
          label="// stack"
          title="Technology Playground"
          subtitle="Technologies I work with and areas I'm currently exploring."
          align="center"
        />

        {/* Category filters */}
        <div className="tech-playground__filters" ref={ref}>
          <motion.button
            className={`tech-playground__filter ${activeCategory === null ? "tech-playground__filter--active" : ""}`}
            onClick={() => setActiveCategory(null)}
            initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0 }}
          >
            All
          </motion.button>
          {skillCategories.map((cat, i) => (
            <motion.button
              key={cat.label}
              className={`tech-playground__filter ${activeCategory === cat.label ? "tech-playground__filter--active" : ""} ${cat.type === "exploring" ? "tech-playground__filter--exploring" : ""}`}
              onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
              initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * (i + 1) }}
            >
              {cat.label}
              {cat.type === "exploring" && <span className="tech-playground__exploring-dot" />}
            </motion.button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="tech-playground__categories">
          <AnimatePresence mode="wait">
            {filteredSkills.map((cat) => (
              <motion.div
                key={cat.label}
                className="tech-playground__category"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="tech-playground__category-header">
                  <h3 className="tech-playground__category-label">{cat.label}</h3>
                  <span className={`tech-playground__category-badge tech-playground__category-badge--${cat.type}`}>
                    {cat.type === "used" ? "Experienced" : "Exploring"}
                  </span>
                </div>
                <div className="tech-playground__tags">
                  {cat.items.map((item, i) => (
                    <motion.span
                      key={item}
                      className={`tech-playground__tag ${cat.type === "exploring" ? "tech-playground__tag--exploring" : ""}`}
                      initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
