"use client";

import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { FaTrophy, FaCertificate, FaPaintBrush } from "react-icons/fa";
import { motion } from "framer-motion";
import achievementsData from "../../data/achievementsData";

export default function EducationSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);
    const [headlineAnimated, setHeadlineAnimated] = useState(false);

    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });

        function checkScreenWidth() {
            setIsMobileOrTablet(window.innerWidth < 1024);
        }
        checkScreenWidth();
        window.addEventListener("resize", checkScreenWidth);

        return () => window.removeEventListener("resize", checkScreenWidth);
    }, []);

    useEffect(() => {
        const currentSection = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
                if (entry.isIntersecting) {
                    AOS.refresh();
                    if (!headlineAnimated) {
                        setHeadlineAnimated(true);
                    }
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.3,
            }
        );

        if (currentSection) observer.observe(currentSection);

        return () => {
            if (currentSection) observer.unobserve(currentSection);
        };
    }, [headlineAnimated]);

    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const [autoActiveIndex, setAutoActiveIndex] = useState(0);

    useEffect(() => {
        if (!isMobileOrTablet) {
            setAutoActiveIndex(-1);
            return;
        }

        const interval = setInterval(() => {
            setAutoActiveIndex((prev) => (prev + 1) % 3);
        }, 3000);

        return () => clearInterval(interval);
    }, [isMobileOrTablet]);

    const toggleActive = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const [showAll, setShowAll] = useState(false);

    const visibleAchievements = showAll
        ? achievementsData
        : achievementsData.slice(0, 3);

    return (
        <section
            id="education"
            ref={sectionRef}
            className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 transition-opacity duration-700 ease-in-out
                ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            data-aos="fade-up"
        >
            <div className="text-center" data-aos={!headlineAnimated ? "fade-up" : undefined}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Education</h2>
                <p className="text-gray-600 text-base sm:text-lg md:text-xl">Learn more about my educational background.</p>
            </div>

            {/* layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-26 items-start">
                {/* Left */}
                <div className="flex flex-col items-start text-left" data-aos="fade-right">
                    <h3 className="text-2xl font-semibold">Amikom Yogyakarta University</h3>
                    <p className="text-lg font-medium mt-1">Bachelor of Informatics | Computer Science</p>
                    <p className="text-sm text-gray-500 mt-1">2021 - 2025</p>

                    <div className="flex flex-row gap-2 group w-full justify-center mt-6" data-aos="fade-up">
                        {[0, 1, 2].map((idx) => {
                            const isDesktop = !isMobileOrTablet;
                            const hovered = hoverIndex !== null;

                            let widthClass = "w-1/3";
                            const style: React.CSSProperties = {
                                transition: "width 0.3s ease",
                                overflow: "hidden",
                                position: "relative",
                            };

                            if (isDesktop) {
                                if (!hovered) {
                                    widthClass = "w-1/3";
                                } else {
                                    if (hoverIndex === idx) {
                                        widthClass = "w-1/2";
                                        style.zIndex = 10;
                                    } else if (
                                        (hoverIndex === 0 && (idx === 1 || idx === 2)) ||
                                        (hoverIndex === 1 && idx === 2) ||
                                        (hoverIndex === 2 && idx === 1)
                                    ) {
                                        widthClass = "w-1/4";
                                        style.zIndex = 0;
                                    } else {
                                        widthClass = "w-1/4";
                                        style.zIndex = 0;
                                    }
                                }
                            } else {
                                const isActive = autoActiveIndex === idx;
                                widthClass = isActive ? "w-1/2" : "w-1/4";
                            }

                            let transformOrigin = "center";
                            if (idx === 0) transformOrigin = "left";
                            else if (idx === 2) transformOrigin = "right";

                            return (
                                <div
                                    key={idx}
                                    onMouseEnter={() => {
                                        if (isDesktop) setHoverIndex(idx);
                                    }}
                                    onMouseLeave={() => {
                                        if (isDesktop) setHoverIndex(null);
                                    }}
                                    className={`relative h-60 rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${widthClass}`}
                                    style={{ ...style, transformOrigin }}
                                >
                                    <Image
                                        src={`/img/campus${idx + 1}.jpg`}
                                        alt={`Campus ${idx + 1}`}
                                        fill
                                        className={`object-cover transition duration-300 filter ${isDesktop
                                            ? hoverIndex === idx
                                                ? "grayscale-0"
                                                : "grayscale"
                                            : autoActiveIndex === idx
                                                ? "grayscale-0"
                                                : "grayscale"
                                            }`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-full mt-6 space-y-4" data-aos="fade-up">
                        <p className="text-gray-600">
                            I pursued my undergraduate studies in Informatics at Universitas Amikom Yogyakarta, where I built a solid foundation in the core areas of computer science and software engineering. Throughout the program, I studied various subjects such as algorithms and data structures, database systems, computer networks, operating systems, and software development methodologies.
                        </p>
                        <p className="text-gray-600">
                            Beyond theoretical learning, I was also actively involved in practical projects that focused on modern web development. I gained extensive experience in building responsive and interactive user interfaces using technologies like React, Next.js, and Tailwind CSS, while also applying best practices in version control, clean code, and collaborative development through Git and GitHub.
                        </p>
                        <p className="text-gray-600">
                            My academic journey helped me develop strong problem-solving skills, logical thinking, and adaptability to emerging technologies. I also explored areas such as UI/UX design principles, API integration, and backend development fundamentals, preparing me to contribute effectively to real-world software development projects as a frontend developer.
                        </p>
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col" data-aos="fade-left">
                    <h3 className="text-2xl font-semibold">Achievements</h3>
                    <p className="text-lg font-medium mt-1">Some of my achievements during my study.</p>

                    <ul className="space-y-4 mt-12">
                        {achievementsData.map(({ icon, title, desc }, i) => {
                            const isActive = activeIndex === i;

                            return (
                                <motion.li
                                    key={i}
                                    onClick={() => toggleActive(i)}
                                    className="bg-white p-4 shadow rounded-md flex items-center space-x-4 cursor-pointer overflow-hidden"
                                    initial={false}
                                    animate={{
                                        scale: isActive ? 1.05 : 1,
                                        boxShadow: isActive
                                            ? "0 8px 20px rgba(43, 36, 15, 0.01)"
                                            : "0 2px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    data-aos="fade-up"
                                >
                                    <motion.div
                                        className={`inline-flex items-center justify-center rounded-full p-3 transition-colors duration-300 ${isActive ? "bg-yellow-100" : "bg-gray-100"
                                            }`}
                                    >
                                        {React.cloneElement(icon, {
                                            className: `w-6 h-6 transition-colors duration-300 ${isActive
                                                ? "text-yellow-400"
                                                : "text-gray-400 filter grayscale"
                                                }`,
                                        })}
                                    </motion.div>

                                    <div className="flex flex-col flex-1 min-w-0">
                                        <h4 className="text-sm sm:text-base font-semibold truncate">
                                            {title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                                            {desc}
                                        </p>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
