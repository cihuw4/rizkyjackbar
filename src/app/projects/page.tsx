"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProjectsPage() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 text-gray-900 px-6 sm:px-10 md:px-16 py-16">
            <div className="max-w-5xl mx-auto">
                <h1
                    data-aos="fade-right"
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                >
                    My Projects
                </h1>
                <p
                    data-aos="fade-up"
                    className="text-lg text-gray-700 leading-relaxed mb-10"
                >
                    Here are some of the applications and interfaces I have built with modern frontend technologies.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div
                        data-aos="zoom-in-up"
                        className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
                    >
                        <h2 className="text-2xl font-semibold mb-3">Project 1</h2>
                        <p className="text-gray-600">Description of project 1.</p>
                    </div>

                    <div
                        data-aos="zoom-in-up"
                        className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
                    >
                        <h2 className="text-2xl font-semibold mb-3">Project 2</h2>
                        <p className="text-gray-600">Description of project 2.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
