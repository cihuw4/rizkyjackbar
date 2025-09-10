"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { FaGithub, FaGlobe } from "react-icons/fa";

const categories = ["All", "Web Development", "Data & AI"];

export default function ArchivePage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredProjects, setFilteredProjects] = useState(projects);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(
                projects.filter((p) => p.category === selectedCategory)
            );
        }
    }, [selectedCategory]);

    return (
        <section className="py-16 sm:py-20 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 sm:px-10 md:px-16">
                <h2
                    data-aos="fade-up"
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-center text-gray-900"
                >
                    Project Archive
                </h2>

                <div className="flex justify-center gap-4 mb-10 flex-wrap">
                    {categories.map((cat, index) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className={`px-4 py-2 rounded-full font-semibold transition ${selectedCategory === cat
                                    ? "bg-gray-900 text-gray-100"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="flex justify-between items-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors shadow-md p-4"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {project.name}
                                </h3>
                                <p className="text-sm text-gray-600">{project.desc}</p>
                            </div>

                            <div className="flex space-x-4">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-700 hover:text-gray-900 transition"
                                    >
                                        <FaGithub size={22} />
                                    </a>
                                )}
                                {project.web && (
                                    <a
                                        href={project.web}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-700 hover:text-gray-900 transition"
                                    >
                                        <FaGlobe size={22} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
