"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { projects } from "@/data/projects";
import { FaGithub, FaGlobe } from "react-icons/fa";

export default function ArchivePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(Flip);

    const container = containerRef.current;
    if (!container) return;

    const boxContainer =
      container.querySelector<HTMLElement>(".archive-box-container");
    const noFilterMsg =
      container.querySelector<HTMLElement>("#no-filter-msg");
    const allCheckbox = container.querySelector<HTMLInputElement>("#all");
    const filters = gsap.utils.toArray<HTMLInputElement>(".filter", container);
    const items = gsap.utils.toArray<HTMLElement>(".item", container);

    function updateFilters(animate = true) {
      if (!allCheckbox || !boxContainer) return;

      const activeSelectors = filters
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => "." + checkbox.id);

      const matches = activeSelectors.length
        ? gsap.utils.toArray<HTMLElement>(activeSelectors.join(","), container)
        : [];

      if (noFilterMsg) {
        noFilterMsg.style.display = matches.length === 0 ? "block" : "none";
      }

      // Initial state on mount: apply display directly without layout animation
      if (!animate) {
        items.forEach((item) => {
          item.style.display =
            matches.indexOf(item) === -1 ? "none" : "inline-flex";
        });
        allCheckbox.checked =
          filters.length > 0 && filters.every((cb) => cb.checked);
        return;
      }

      // Record state of items only so parent layout, header, and buttons remain 100% stay
      const state = Flip.getState(items);

      // adjust the display property of each item ("none" for filtered ones, "inline-flex" for matching ones)
      items.forEach((item) => {
        item.style.display =
          matches.indexOf(item) === -1 ? "none" : "inline-flex";
      });

      // animate from the previous state matching CodePen logic
      Flip.from(state, {
        duration: 0.6,
        scale: true,
        ease: "power2.inOut",
        stagger: 0.04,
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.5 }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0, duration: 0.4 }),
      });

      // Update the all checkbox:
      allCheckbox.checked =
        filters.length > 0 && filters.every((cb) => cb.checked);
    }

    // Apply default filter state on load without animation
    updateFilters(false);

    const handleFilterChange = () => {
      updateFilters(true);
    };

    const handleAllChange = () => {
      if (!allCheckbox) return;
      filters.forEach((checkbox) => {
        checkbox.checked = allCheckbox.checked;
      });
      updateFilters(true);
    };

    filters.forEach((btn) =>
      btn.addEventListener("change", handleFilterChange)
    );
    allCheckbox?.addEventListener("change", handleAllChange);

    return () => {
      filters.forEach((btn) =>
        btn.removeEventListener("change", handleFilterChange)
      );
      allCheckbox?.removeEventListener("change", handleAllChange);
    };
  }, []);

  const getFilterClasses = (project: (typeof projects)[0]): string => {
    const classes = ["item"];

    // Category
    if (project.category === "Web Development") {
      classes.push("filter-web");
    } else if (project.category === "Data Science") {
      classes.push("filter-data");
    }

    // Type: Client/Internship vs Personal/Academic
    const descLower = (project.desc || "").toLowerCase();
    if (
      descLower.includes("internship") ||
      descLower.includes("client") ||
      descLower.includes("friend's business")
    ) {
      classes.push("filter-internship");
    } else {
      classes.push("filter-personal");
    }

    return classes.join(" ");
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 min-h-screen bg-skylrk-clean text-gray-900">
      <div ref={containerRef} className="archive-container px-5 sm:px-8 md:px-12">
        {/* Header */}
        <div className="w-full max-w-4xl text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Project Archive
          </h1>
        </div>

        {/* Checkbox Filter Buttons */}
        <div className="archive-checkboxes">
          <label className="archive-tag-button" htmlFor="all">
            <input type="checkbox" id="all" />
            All
            <span className="checked-overlay">All</span>
          </label>

          <label className="archive-tag-button" htmlFor="filter-web">
            <input
              type="checkbox"
              id="filter-web"
              className="filter"
              defaultChecked
            />
            Web Development
            <span className="checked-overlay">Web Development</span>
          </label>

          <label className="archive-tag-button" htmlFor="filter-data">
            <input type="checkbox" id="filter-data" className="filter" />
            Data Science
            <span className="checked-overlay">Data Science</span>
          </label>

          <label className="archive-tag-button" htmlFor="filter-internship">
            <input
              type="checkbox"
              id="filter-internship"
              className="filter"
            />
            Client / Internship
            <span className="checked-overlay">Client / Internship</span>
          </label>

          <label className="archive-tag-button" htmlFor="filter-personal">
            <input
              type="checkbox"
              id="filter-personal"
              className="filter"
            />
            Personal & Academic
            <span className="checked-overlay">Personal & Academic</span>
          </label>
        </div>

        {/* GSAP Flip Box Container */}
        <div className="archive-box-container">
          <div
            id="no-filter-msg"
            className="w-full text-center py-24 text-gray-400 text-sm hidden select-none"
          >
            No categories selected. Check one or more filters above to view projects.
          </div>
          {projects.map((project) => (
            <div key={project.id} className={getFilterClasses(project)}>
              <div className="w-full h-full p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] hover:border-black/10 transition-all flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-black/5 text-gray-700">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-3 text-gray-500">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-900 transition-colors"
                          title="GitHub Repository"
                        >
                          <FaGithub size={17} />
                        </a>
                      )}
                      {project.web && (
                        <a
                          href={project.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-900 transition-colors"
                          title="Live Demo"
                        >
                          <FaGlobe size={17} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug">
                    {project.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-3 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                {/* Tech stack icons */}
                <div className="flex items-center gap-2 pt-3 border-t border-black/5 mt-2">
                  {project.tech?.slice(0, 5).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-sm opacity-75 hover:opacity-100 transition-opacity"
                      style={{
                        color: t.color === "multi" ? "#4285F4" : t.color,
                      }}
                    >
                      {t.icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
