"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { projects } from "@/data/projects";
import FlipCard from "../components/FlipCard";
import { motion } from "framer-motion";
import {
    FaReact,
    FaJsSquare,
    FaHtml5,
    FaCss3Alt,
    FaNodeJs,
    FaVuejs,
} from "react-icons/fa";
import { SiPython, SiWordpress } from "react-icons/si";

export default function ProjectsPage() {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [clickedImages, setClickedImages] = useState([false, false, false]);
    const [clickedIcons, setClickedIcons] = useState(new Array(16).fill(false));

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

    const handleIconClick = (idx: number) => {
        if (isMobileOrTablet) {
            setClickedIcons((prev) => {
                const updated = [...prev];
                updated[idx] = true;
                return updated;
            });

            setTimeout(() => {
                setClickedIcons((prev) => {
                    const updated = [...prev];
                    updated[idx] = false;
                    return updated;
                });
            }, 1000);
        }
    };

    const previewProjects = projects.slice(0, 4);

    const techs = [
        { icon: FaReact, color: "#61DBFB", name: "React" },
        { icon: FaJsSquare, color: "#F7DF1E", name: "JavaScript" },
        { icon: FaHtml5, color: "#E34C26", name: "HTML5" },
        { icon: FaCss3Alt, color: "#264DE4", name: "CSS3" },
        { icon: FaNodeJs, color: "#3C873A", name: "Node.js" },
        { icon: FaVuejs, color: "#42b883", name: "Vue.js" },
        { icon: SiPython, color: "#3776AB", name: "Python" },
        { icon: SiWordpress, color: "#21759B", name: "WordPress" },
    ];

    const loopedTechs = [...techs, ...techs];

    return (
        <div>
            {/* === Projects Hero Section with Interactive Image Stack === */}
            <section className="min-h-screen bg-gray-100 text-gray-900 px-6 sm:px-10 md:px-16 py-20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* === Image Stack === */}
                    <div data-aos="fade-right" className="relative w-[320px] h-[180px] sm:w-[400px] sm:h-[225px] md:w-[500px] md:h-[280px] mx-auto lg:mx-0">
                        {[
                            {
                                top: "top-14",
                                left: "left-0",
                                rotate: "-3",
                                z: "z-0",
                                src: "/images/project1.jpg",
                            },
                            {
                                top: "top-8",
                                left: "left-10",
                                rotate: "2",
                                z: "z-10",
                                src: "/images/project2.jpg",
                            },
                            {
                                top: "top-0",
                                left: "left-20",
                                rotate: "-1",
                                z: "z-20",
                                src: "/images/project3.jpg",
                            },
                        ].map((img, index) => (
                            <div
                                key={index}
                                className={`
                                    absolute ${img.top} ${img.left} w-[75%] aspect-video rounded-2xl overflow-hidden shadow-xl ring-4 ring-white ${img.z} rotate-[${img.rotate}deg] transition-transform duration-500
                                    ${isMobileOrTablet
                                        ? clickedImages[index]
                                            ? "grayscale-0 -translate-y-2 scale-105 shadow-2xl"
                                            : "grayscale cursor-pointer"
                                        : "filter grayscale hover:grayscale-0 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                                    }
                                `}
                                onClick={() => handleImageClick(index)}
                            >
                                <Image
                                    src={img.src}
                                    alt={`Project ${index + 1}`}
                                    fill
                                    className="object-cover transition duration-500"
                                />
                            </div>
                        ))}
                    </div>

                    {/* === Text Section === */}
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

            {/* === Tech Logos Marquee (mobile interaction + desktop hover) === */}
            <section className="w-screen bg-gray-100 overflow-hidden py-6 -mt-12 lg:-mt-48 mb-16">
                <motion.div
                    className="flex gap-10 min-w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 60,
                        ease: "linear",
                    }}
                >
                    {loopedTechs.map((tech, idx) => {
                        const Icon = tech.icon;
                        const isActive = isMobileOrTablet && clickedIcons[idx];
                        const iconColor = isActive ? tech.color : "#A0AEC0";

                        return (
                            <motion.div
                                key={idx}
                                className="group flex flex-col items-center justify-center min-w-[120px] cursor-pointer"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: idx * 0.1,
                                    duration: 0.6,
                                    type: "spring",
                                }}
                                whileHover={!isMobileOrTablet ? { scale: 1.3 } : {}}
                                onClick={() => handleIconClick(idx)}
                            >
                                <motion.div
                                    style={{
                                        color: iconColor,
                                        filter: isActive
                                            ? "drop-shadow(0 4px 10px rgba(0,0,0,0.3))"
                                            : "none",
                                        transform: isActive ? "scale(1.3)" : "scale(1)",
                                        transition: "all 0.3s ease-in-out",
                                    }}
                                    whileHover={
                                        !isMobileOrTablet
                                            ? {
                                                color: tech.color,
                                                filter:
                                                    "drop-shadow(0 4px 10px rgba(0,0,0,0.3))",
                                            }
                                            : {}
                                    }
                                >
                                    <Icon size={50} />
                                </motion.div>
                                <span className="mt-2 text-sm font-medium text-gray-700">
                                    {tech.name}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>

            {/* === Projects Grid Section === */}
            <section id="projects-grid" className="pb-16 sm:pb-20">
                <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16">
                    <h2
                        data-aos="fade-up"
                        data-aos-delay={200}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-20 text-center"
                    >
                        Projects
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {previewProjects.map((project, index) => (
                            <FlipCard
                                key={project.id}
                                project={project}
                                delay={index * 100}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center mt-10">
                        <Link href="/archive">
                            <button
                                data-aos="fade-up"
                                data-aos-delay={200}
                                className="px-6 py-3 bg-[#0A2757] text-white rounded-lg font-semibold hover:bg-[#0C3A72] transition"
                            >
                                View All
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
