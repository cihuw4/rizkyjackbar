"use client";

import { projects } from "@/data/projects";
import FlipCard from "./FlipCard";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProjectsGrid({
    isMobileOrTablet,
}: {
    isMobileOrTablet: boolean;
}) {
    const previewProjects = projects.slice(0, 4);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section id="projects-grid" className="pb-16 sm:pb-20">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16">
                <h2
                    data-aos="fade-up"
                    data-aos-delay={200}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-20 text-center"
                >
                    Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {previewProjects.map((project, index) => (
                        <FlipCard
                            key={project.id}
                            project={project}
                            delay={index * 100}
                            isMobileOrTablet={isMobileOrTablet}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <Link href="/archive">
                        <button
                            data-aos="fade-up"
                            data-aos-delay={200}
                            className="px-6 py-3 bg-[#0A2757] text-white rounded-lg font-semibold hover:bg-[#0C3A72] transition"
                        >
                            View All
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
