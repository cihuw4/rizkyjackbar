"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutSection() {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [clickedImages, setClickedImages] = useState([false, false, false]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

            setActiveIndex((prev) => (prev === index ? null : index));
        }
    };

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

    const images = [
        {
            top: "top-14",
            left: "left-0",
            rotate: "-3",
            baseZ: 0,
            src: "/img/about3.jpg",
            alt: "Profile 3",
        },
        {
            top: "top-8",
            left: "left-10",
            rotate: "2",
            baseZ: 10,
            src: "/img/about2.jpg",
            alt: "Profile 2",
        },
        {
            top: "top-0",
            left: "left-20",
            rotate: "-1",
            baseZ: 20,
            src: "/img/about1.jpg",
            alt: "Profile 1",
        },
    ];

    return (
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-4">
            <div data-aos="fade-right" className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] h-[420px] sm:h-[460px] md:h-[500px] mx-auto lg:mx-0">
                {images.map(({ top, left, rotate, baseZ, src, alt }, index) => {
                    const zIndexClass = activeIndex === index ? "z-30" : `z-[${baseZ}]`;

                    const clickedClass =
                        isMobileOrTablet && clickedImages[index]
                            ? "grayscale-0 -translate-y-2 scale-105 shadow-2xl"
                            : isMobileOrTablet
                            ? "grayscale cursor-pointer"
                            : "filter grayscale hover:grayscale-0 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl";

                    return (
                        <div
                            key={index}
                            className={`
                                absolute ${top} ${left} rounded-2xl overflow-hidden shadow-xl ring-4 ring-white
                                ${zIndexClass} rotate-[${rotate}deg] transition-transform duration-500
                                ${clickedClass}
                                cursor-pointer
                            `}
                            onClick={() => handleImageClick(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                        >
                            <div className="
                                w-40 h-52
                                sm:w-48 sm:h-60
                                md:w-56 md:h-72
                                lg:w-64 lg:h-80
                                relative
                            ">
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    className="object-cover transition duration-500 max-w-full max-h-full"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Text Section */}
            <div
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="200"
                data-aos-once="true"
                className="flex flex-col justify-center text-left"
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
