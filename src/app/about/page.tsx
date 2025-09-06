"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutPage() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <main className="min-h-screen bg-white text-gray-900 px-6 sm:px-10 md:px-16 py-16">
            <div className="max-w-5xl mx-auto">
                <h1
                    data-aos="fade-right"
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                >
                    About Me
                </h1>
                <p
                    data-aos="fade-up"
                    className="text-lg text-gray-700 leading-relaxed"
                >
                    Hi, I'm Muhammad Rizky. A passionate Frontend Developer focused on building
                    clean, responsive, and interactive UI/UX using JavaScript, Next.js, and Tailwind CSS.
                </p>
            </div>
        </main>
    );
}
