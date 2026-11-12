"use client";

import { projects } from "@/data/projects";
import FlipCard from "./FlipCard";

export default function ProjectsGrid({
  isMobileOrTablet,
}: {
  isMobileOrTablet: boolean;
}) {
  const previewProjects = projects.slice(0, 4);

  return (
    <div id="projects-grid" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8 sm:py-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 text-center text-gray-900 tracking-tight">
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {previewProjects.map((project, index) => (
          <FlipCard
            key={project.id}
            project={project}
            delay={index * 100}
            isMobileOrTablet={isMobileOrTablet}
          />
        ))}
      </div>
    </div>
  );
}
