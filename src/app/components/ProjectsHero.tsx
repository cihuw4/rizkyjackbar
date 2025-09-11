"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

interface ProjectsHeroProps {
    isMobileOrTablet: boolean;
    clickedImages: boolean[];
    setClickedImages: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function ProjectsHero({
    isMobileOrTablet,
    clickedImages,
    setClickedImages,
}: ProjectsHeroProps) {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const images = [
        {
            top: "top-14",
            left: "left-0",
            rotate: "-3",
            z: 0,
            src: "/images/project1.jpg",
        },
        {
            top: "top-8",
            left: "left-10",
            rotate: "2",
            z: 10,
            src: "/images/project2.jpg",
        },
        {
            top: "top-0",
            left: "left-20",
            rotate: "-1",
            z: 20,
            src: "/images/project3.jpg",
        },
    ];

    const handleMouseEnter = (index: number) => {
        if (!isMobileOrTablet) {
            setActiveIndex(index);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobileOrTablet) {
            setActiveIndex(null);
        }
    };

    const handleImageClick = (index: number) => {
        if (isMobileOrTablet) {
            setClickedImages((prev) => {
                const updated = [...prev];
                updated[index] = !updated[index];
                return updated;
            });

            setActiveIndex((prev) => (prev === index ? null : index));
        }
    };

    return (
        <section className="min-h-screen bg-gray-100 text-gray-900 px-6 sm:px-10 md:px-16 py-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Images */}
                <div
                    data-aos="fade-right"
                    className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] h-[150px] sm:h-[210px] md:h-[280px] mx-auto lg:mx-0 mb-12 lg:mb-0"
                >
                    {images.map((img, index) => {
                        const zIndexStyle = {
                            zIndex: activeIndex === index ? 30 : img.z,
                        };

                        const grayscaleClass = isMobileOrTablet
                            ? clickedImages[index]
                                ? "grayscale-0"
                                : "grayscale cursor-pointer"
                            : activeIndex === index
                                ? "grayscale-0"
                                : "grayscale hover:grayscale-0";

                        return (
                            <div
                                key={index}
                                className={`absolute ${img.top} ${img.left} rounded-2xl overflow-hidden shadow-xl ring-4 ring-white rotate-[${img.rotate}deg] transition-transform duration-500 transform hover:-translate-y-2 hover:scale-105`}
                                style={{ ...zIndexStyle, width: "75%", aspectRatio: "16 / 9" }}
                                onClick={() => handleImageClick(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Image
                                    src={img.src}
                                    alt={`Project ${index + 1}`}
                                    fill
                                    className={`object-cover transition duration-500 max-w-full max-h-full ${grayscaleClass}`}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Text */}
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
                        Here are some of the applications and interfaces I have built with
                        modern frontend technologies. Each project is crafted with clean
                        design, performance optimization, and responsive layouts.
                    </p>
                    <p
                        data-aos="fade-left"
                        data-aos-delay={200}
                        className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mt-4"
                    >
                        From small business websites to larger enterprise applications, I
                        aim to deliver scalable and maintainable solutions that enhance
                        user experience and usability.
                    </p>
                </div>
            </div>
        </section>
    );
}
