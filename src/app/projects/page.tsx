"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function ProjectsPage() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 text-gray-900 px-6 sm:px-10 md:px-16 py-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-video mx-auto lg:mx-0">

                    <div
                        data-aos="fade-right"
                        className="absolute top-14 left-0 w-3/4 aspect-video rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-0 -rotate-3 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                    >
                        <Image
                            src="/images/project3.png"
                            alt="Project 3"
                            fill
                            className="object-cover filter grayscale hover:grayscale-0 transition duration-500"
                        />
                    </div>

                    <div
                        data-aos="fade-right"
                        data-aos-delay="200"
                        className="absolute top-8 left-8 sm:left-12 w-3/4 aspect-video rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-10 rotate-2 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                    >
                        <Image
                            src="/images/project2.png"
                            alt="Project 2"
                            fill
                            className="object-cover filter grayscale hover:grayscale-0 transition duration-500"
                        />
                    </div>

                    <div
                        data-aos="fade-right"
                        data-aos-delay="400"
                        className="absolute top-0 left-16 sm:left-20 w-3/4 aspect-video rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-20 -rotate-1 transition-all duration-500 hover:-translate-y-3 hover:scale-110 hover:rotate-1 hover:shadow-2xl"
                    >
                        <Image
                            src="/images/project1.png"
                            alt="Project 1"
                            fill
                            className="object-cover filter grayscale hover:grayscale-0 transition duration-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center text-left">
                    <h1
                        data-aos="fade-left"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                    >
                        My Projects
                    </h1>
                    <p
                        data-aos="fade-up"
                        className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed"
                    >
                        Here are some of the applications and interfaces I have built
                        with modern frontend technologies. Each project is crafted with
                        clean design, performance optimization, and responsive layouts.
                    </p>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mt-4"
                    >
                        From small business websites to larger enterprise applications,
                        I aim to deliver scalable and maintainable solutions that enhance
                        user experience and usability.
                    </p>
                </div>
            </div>
        </main>
    );
}
