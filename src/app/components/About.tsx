"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function About() {
    const [isClicked, setIsClicked] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

    useEffect(() => {
        function checkScreen() {
            setIsMobileOrTablet(window.innerWidth < 768);
        }
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    function handleImageClick() {
        if (isMobileOrTablet) {
            setIsClicked((prev) => !prev);
        }
    }

    return (
        <section
            id="about"
            className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 md:px-16 py-16 sm:py-20 bg-white"
        >
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div
                    data-aos="fade-left"
                    data-aos-delay="100"
                    className="flex justify-center md:justify-end md:pr-10 lg:pr-20 order-1 md:order-2"
                >
                    <img
                        src="/img/home_about.jpg"
                        alt="About Me"
                        onClick={handleImageClick}
                        className={`w-100 h-100 sm:w-120 sm:h-120 md:w-80 md:h-[450px] rounded-lg object-cover shadow-lg filter transition duration-500
                            ${isMobileOrTablet
                                ? isClicked
                                    ? "grayscale-0 cursor-pointer"
                                    : "grayscale cursor-pointer"
                                : "grayscale hover:grayscale-0"}
                        `}
                    />
                </div>

                <div className="flex-1 text-left md:text-left md:pl-10 lg:pl-20 order-2 md:order-1">
                    <h1
                        data-aos="fade-right"
                        data-aos-delay="200"
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative inline-block"
                    >
                        About
                        <span className="absolute left-0 -bottom-2 w-16 h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 rounded-full animate-pulse"></span>
                    </h1>

                    <p
                        data-aos="fade-right"
                        data-aos-delay="300"
                        className="text-base sm:text-lg text-gray-600 max-w-sm mx-auto md:mx-0 mb-8"
                    >
                        Skilled in JavaScript, Next.js, and Tailwind CSS, I create
                        responsive and user-friendly web applications.
                    </p>

                    <Link
                        data-aos="fade-right"
                        data-aos-delay="400"
                        href="/about"
                        className="px-6 py-3 rounded-lg bg-gray-900 text-gray-100 hover:bg-gray-700 transition"
                    >
                        More About Me
                    </Link>
                </div>
            </div>
        </section>
    );
}
