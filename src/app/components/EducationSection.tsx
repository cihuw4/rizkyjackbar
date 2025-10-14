"use client";

import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import achievementsData from "../../data/achievementsData";

export default function EducationSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);
    const [headlineAnimated, setHeadlineAnimated] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [autoActiveIndex, setAutoActiveIndex] = useState(0);

    const [selectedAchievement, setSelectedAchievement] = useState<null | {
        title: string;
        desc: string;
        icon: JSX.Element;
        pdf: string;
    }>(null);

    // ✅ Inisialisasi AOS & cek device
    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        const checkScreenWidth = () => setIsMobileOrTablet(window.innerWidth < 1024);
        checkScreenWidth();
        window.addEventListener("resize", checkScreenWidth);
        return () => window.removeEventListener("resize", checkScreenWidth);
    }, []);

    useEffect(() => {
        const currentSection = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
                if (entry.isIntersecting && !headlineAnimated) {
                    AOS.refresh();
                    setHeadlineAnimated(true);
                }
            },
            { threshold: 0.3 }
        );
        if (currentSection) observer.observe(currentSection);
        return () => {
            if (currentSection) observer.unobserve(currentSection);
        };
    }, [headlineAnimated]);

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

    const openPopup = (achievement: {
        title: string;
        desc: string;
        icon: JSX.Element;
        pdf: string;
    }) => setSelectedAchievement(achievement);

    const closePopup = () => setSelectedAchievement(null);

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
                <p className="text-gray-600 text-base sm:text-lg md:text-xl">
                    Learn more about my educational background.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-26 items-start">
                {/* Left - Campus */}
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
                                    onMouseEnter={() => isDesktop && setHoverIndex(idx)}
                                    onMouseLeave={() => isDesktop && setHoverIndex(null)}
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
                            I pursued my undergraduate studies in Informatics at Universitas Amikom Yogyakarta...
                        </p>
                        <p className="text-gray-600">
                            Beyond theoretical learning, I was also actively involved in practical projects...
                        </p>
                        <p className="text-gray-600">
                            My academic journey helped me develop strong problem-solving skills...
                        </p>
                    </div>
                </div>

                {/* Right - Achievements */}
                <div className="flex flex-col" data-aos="fade-left">
                    <h3 className="text-2xl font-semibold">Achievements</h3>
                    <p className="text-lg font-medium mt-1">Some of my achievements during my study.</p>

                    <ul className="space-y-4 mt-12">
                        {achievementsData.map(({ icon, title, desc, pdf }, i) => (
                            <motion.li
                                key={i}
                                onClick={() => openPopup({ title, desc, icon, pdf })}
                                whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                                className="bg-white p-4 shadow rounded-md flex items-center space-x-4 cursor-pointer overflow-hidden transition-transform"
                                data-aos="fade-up"
                            >
                                <motion.div className="inline-flex items-center justify-center rounded-full p-3 bg-gray-100 group-hover:bg-yellow-100 transition-colors duration-300">
                                    {React.cloneElement(icon, {
                                        className:
                                            "w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors duration-300",
                                    })}
                                </motion.div>

                                <div className="flex flex-col flex-1 min-w-0">
                                    <h4 className="text-sm sm:text-base font-semibold truncate">{title}</h4>
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">{desc}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>

            <AnimatePresence>
                {selectedAchievement && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex justify-center items-center px-2 sm:px-4"
                        onClick={closePopup}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg shadow-lg w-full max-w-[95%] sm:max-w-2xl md:max-w-4xl relative flex flex-col overflow-hidden max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Tombol close */}
                            <button
                                onClick={closePopup}
                                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl z-10"
                            >
                                ×
                            </button>

                            {/* Header */}
                            <div className="p-3 sm:p-4 border-b text-center">
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    {selectedAchievement.title}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base">
                                    {selectedAchievement.desc}
                                </p>
                            </div>

                            {/* PDF Viewer */}
                            <div className="w-full flex-1 bg-gray-100">
                                <iframe
                                    src={selectedAchievement.pdf}
                                    className="w-full h-[60vh] sm:h-[70vh] md:h-[500px]"
                                    title="PDF Viewer"
                                ></iframe>
                            </div>

                            {/* Footer download */}
                            <div className="p-3 sm:p-4 border-t flex justify-center sm:justify-end">
                                <a
                                    href={selectedAchievement.pdf}
                                    download
                                    className="bg-green-600 text-white text-sm sm:text-base px-4 py-2 rounded-md hover:bg-green-700 transition w-full sm:w-auto text-center"
                                >
                                    Download PDF
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
