"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { projects } from "@/data/projects";
import FlipCard from "../components/FlipCard";

export default function ProjectsPage() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const previewProjects = projects.slice(0, 4);

    return (
        <>
            <main className="min-h-screen bg-gray-100 text-gray-900 px-6 sm:px-10 md:px-16 py-30">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-video mx-auto lg:mx-0">
                        <div
                            data-aos="fade-right"
                            className="absolute top-14 left-0 w-3/4 aspect-video rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-0 -rotate-3 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src="https://via.placeholder.com/400x225"
                                alt="Project 3"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div
                            data-aos="fade-right"
                            data-aos-delay={200}
                            className="absolute top-8 left-8 sm:left-12 w-3/4 aspect-video rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-10 rotate-2 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src="https://via.placeholder.com/400x225"
                                alt="Project 2"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div
                            data-aos="fade-right"
                            data-aos-delay={400}
                            className="absolute top-0 left-16 sm:left-20 w-3/4 aspect-video rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-20 -rotate-1 transition-all duration-500 hover:-translate-y-3 hover:scale-110 hover:rotate-1 hover:shadow-2xl"
                        >
                            <img
                                src="https://via.placeholder.com/400x225"
                                alt="Project 1"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Right: teks hero */}
                    <div className="flex flex-col justify-center text-left">
                        <h1
                            data-aos="fade-left"
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                        >
                            My Projects
                        </h1>
                        <p
                            data-aos="fade-left"
                            className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed"
                        >
                            Here are some of the applications and interfaces I have built
                            with modern frontend technologies. Each project is crafted with
                            clean design, performance optimization, and responsive layouts.
                        </p>
                        <p
                            data-aos="fade-left"
                            data-aos-delay={200}
                            className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mt-4"
                        >
                            From small business websites to larger enterprise applications,
                            I aim to deliver scalable and maintainable solutions that
                            enhance user experience and usability.
                        </p>
                    </div>
                </div>
            </main>

            <section id="projects-grid" className="pb-16 sm:pb-20">
                <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16">
                    <h2
                        data-aos="fade-up"
                        data-aos-delay={200}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-20 text-center"
                    >
                        Projects
                    </h2>

                    {/* Project */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {previewProjects.map((project, index) => (
                            <FlipCard key={project.id} project={project} delay={index * 100} />
                        ))}
                    </div>

                    <div className="flex justify-center mt-10">
                        <Link href="/archive">
                            <button
                                data-aos="fade-up"
                                data-aos-delay={200}
                                className="px-6 py-3 bg-gray-900 text-gray-100 rounded-lg font-semibold hover:bg-gray-700 transition"
                            >
                                View All
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
