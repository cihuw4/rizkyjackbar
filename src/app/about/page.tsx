"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function AboutPage() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 text-gray-900 px-6 sm:px-10 md:px-16 py-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                <div className="relative w-[320px] h-[460px] mx-auto md:mx-0">
                    <div
                        data-aos="fade-right"
                        className="absolute top-14 left-0 w-64 h-80 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-0 -rotate-3 transition-transform duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                    >
                        <Image
                            src="/images/profile3.jpg"
                            alt="Profile 3"
                            fill
                            className="object-cover filter grayscale hover:grayscale-0 transition duration-500"
                        />
                    </div>

                    <div
                        data-aos="fade-right"
                        data-aos-delay="200"
                        className="absolute top-8 left-10 w-64 h-80 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-10 rotate-2 transition-transform duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                    >
                        <Image
                            src="/images/profile2.jpg"
                            alt="Profile 2"
                            fill
                            className="object-cover filter grayscale hover:grayscale-0 transition duration-500"
                        />
                    </div>

                    <div
                        data-aos="fade-right"
                        data-aos-delay="400"
                        className="absolute top-0 left-20 w-64 h-80 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-20 -rotate-1 transition-transform duration-500 hover:-translate-y-3 hover:scale-110 hover:rotate-1 hover:shadow-2xl"
                    >
                        <Image
                            src="/images/profile1.jpg"
                            alt="Profile 1"
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
                        Who I Am
                    </h1>
                    <p
                        data-aos="fade-left"
                        className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed"
                    >
                        Hi, I'm <span className="font-semibold">Muhammad Rizky</span>.
                        I’m a passionate <span className="font-semibold">Frontend Developer</span>
                        with a strong focus on building clean, responsive, and interactive UI/UX.
                        I specialize in <span className="text-blue-600 font-medium">JavaScript</span>,
                        <span className="text-blue-600 font-medium"> Next.js</span>, and
                        <span className="text-blue-600 font-medium"> Tailwind CSS</span>. <br /><br />
                        My goal is to craft digital experiences that not only look great but also
                        deliver smooth performance and accessibility across all devices.
                    </p>
                </div>
            </div>
        </main>
    );
}
