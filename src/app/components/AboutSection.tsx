"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutSection() {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [clickedImages, setClickedImages] = useState([false, false, false]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        const handleResize = () => {
            setIsMobileOrTablet(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleImageClick = (index: number) => {
        if (isMobileOrTablet) {
            setClickedImages((prev) => {
                const updated = [...prev];
                updated[index] = !updated[index];
                return updated;
            });
        }
    };

    return (
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 py-16">
            {/* Image Stack */}
            <div data-aos="fade-right" className="relative w-[320px] h-[460px] mx-auto md:mx-0">
                {/* Image 1 */}
                <div
                    className={`
                        absolute top-14 left-0 w-64 h-80 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-0 -rotate-3 transition-transform duration-500
                        ${isMobileOrTablet
                            ? clickedImages[0]
                                ? "grayscale-0 -translate-y-2 scale-105 shadow-2xl"
                                : "grayscale cursor-pointer"
                            : "filter grayscale hover:grayscale-0 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                        }
                    `}
                    onClick={() => handleImageClick(0)}
                >
                    <Image
                        src="/images/profile3.jpg"
                        alt="Profile 3"
                        fill
                        className="object-cover transition duration-500"
                    />
                </div>

                {/* Image 2 */}
                <div
                    className={`
                        absolute top-8 left-10 w-64 h-80 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-10 rotate-2 transition-transform duration-500
                        ${isMobileOrTablet
                            ? clickedImages[1]
                                ? "grayscale-0 -translate-y-2 scale-105 shadow-2xl"
                                : "grayscale cursor-pointer"
                            : "filter grayscale hover:grayscale-0 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                        }
                    `}
                    onClick={() => handleImageClick(1)}
                >
                    <Image
                        src="/images/profile2.jpg"
                        alt="Profile 2"
                        fill
                        className="object-cover transition duration-500"
                    />
                </div>

                {/* Image 3 */}
                <div
                    className={`
                        absolute top-0 left-20 w-64 h-80 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-20 -rotate-1 transition-transform duration-500
                        ${isMobileOrTablet
                            ? clickedImages[2]
                                ? "grayscale-0 -translate-y-3 scale-110 rotate-1 shadow-2xl"
                                : "grayscale cursor-pointer"
                            : "filter grayscale hover:grayscale-0 hover:-translate-y-3 hover:scale-110 hover:rotate-1 hover:shadow-2xl"
                        }
                    `}
                    onClick={() => handleImageClick(2)}
                >
                    <Image
                        src="/images/profile1.jpg"
                        alt="Profile 1"
                        fill
                        className="object-cover transition duration-500"
                    />
                </div>
            </div>

            {/* Text Section */}
            <div
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="200"
                data-aos-once="true"
                className="flex flex-col justify-center text-left px-4"
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Who I Am
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                    Hi, I&apos;m <span className="font-semibold">Muhammad Rizky</span>.
                    I&apos;m a passionate <span className="font-semibold">Frontend Developer</span>{' '}
                    with a strong focus on building clean, responsive, and interactive UI/UX.
                    I specialize in JavaScript, Next.js, and Tailwind CSS.
                    <br /><br />
                    My goal is to craft digital experiences that not only look great but also
                    deliver smooth performance and accessibility across all devices.
                </p>
            </div>
        </section>
    );
}
