"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaVuejs, FaSass, } from "react-icons/fa";
import { SiWordpress, SiPython } from "react-icons/si";

export default function ProjectsPage() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const allProjects = [
        {
            id: 1,
            name: "Portfolio Website",
            category: "Web Development",
            desc: "A personal portfolio website to showcase projects and skills.",
            img: "https://via.placeholder.com/400x225",
            tech: [
                { icon: <FaReact />, color: "#61DBFB" },
                { icon: <FaJsSquare />, color: "#F7DF1E" },
                { icon: <FaCss3Alt />, color: "#264DE4" },
            ],
        },
        {
            id: 2,
            name: "E-commerce Store",
            category: "Web Development",
            desc: "An online store built for small business with cart and checkout.",
            img: "https://via.placeholder.com/400x225",
            tech: [
                { icon: <FaReact />, color: "#61DBFB" },
                { icon: <FaNodeJs />, color: "#3C873A" },
                { icon: <FaCss3Alt />, color: "#264DE4" },
            ],
        },
        {
            id: 3,
            name: "Blog Platform",
            category: "Web Development",
            desc: "A responsive blog platform with user authentication and CMS.",
            img: "https://via.placeholder.com/400x225",
            tech: [
                { icon: <FaReact />, color: "#61DBFB" },
                { icon: <FaNodeJs />, color: "#3C873A" },
                { icon: <FaHtml5 />, color: "#E34C26" },
            ],
        },
        {
            id: 4,
            name: "Task Manager App",
            category: "Web Development",
            desc: "A productivity app to manage tasks and deadlines efficiently.",
            img: "https://via.placeholder.com/400x225",
            tech: [
                { icon: <FaVuejs />, color: "#42b883" },
                { icon: <FaSass />, color: "#CC6699" },
                { icon: <FaJsSquare />, color: "#F7DF1E" },
            ],
        },
        {
            id: 5,
            name: "Landing Page",
            category: "Web Development",
            desc: "A marketing landing page for a SaaS product.",
            img: "https://via.placeholder.com/400x225",
            tech: [
                { icon: <FaHtml5 />, color: "#E34C26" },
                { icon: <FaCss3Alt />, color: "#264DE4" },
                { icon: <FaJsSquare />, color: "#F7DF1E" },
            ],
        },
        {
            id: 6,
            name: "WordPress Blog",
            category: "Web Development",
            desc: "A dynamic WordPress blog site with custom themes and plugins.",
            img: "https://via.placeholder.com/400x225",
            tech: [
                { icon: <SiWordpress />, color: "#21759B" },
                { icon: <FaCss3Alt />, color: "#264DE4" },
                { icon: <FaJsSquare />, color: "#F7DF1E" },
            ],
        },
        {
            id: 7,
            name: "Data Analysis Tool",
            category: "Data & AI",
            desc: "A Python-based data analysis and visualization tool.",
            img: "https://via.placeholder.com/400x225",
            tech: [
                { icon: <SiPython />, color: "#3776AB" },
            ],
        },
    ];

    const [filter, setFilter] = useState<"All" | "Web Development" | "Data & AI">("All");

    const filteredProjects = allProjects.filter(
        (project) => filter === "All" || project.category === filter
    );

    return (
        <>
            {/* Hero / Intro Projects */}
            <main className="min-h-screen bg-gray-100 text-gray-900 px-6 sm:px-10 md:px-16 py-30">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-video mx-auto lg:mx-0">
                        <div
                            data-aos="fade-right"
                            className="absolute top-14 left-0 w-3/4 aspect-video rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-0 -rotate-3 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src="https://via.placeholder.com/400x225"
                                alt="Project 3"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div
                            data-aos="fade-right"
                            data-aos-delay={200}
                            className="absolute top-8 left-8 sm:left-12 w-3/4 aspect-video rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-10 rotate-2 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src="https://via.placeholder.com/400x225"
                                alt="Project 2"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div
                            data-aos="fade-right"
                            data-aos-delay={400}
                            className="absolute top-0 left-16 sm:left-20 w-3/4 aspect-video rounded-2xl overflow-hidden shadow-xl ring-4 ring-white z-20 -rotate-1 transition-all duration-500 hover:-translate-y-3 hover:scale-110 hover:rotate-1 hover:shadow-2xl"
                        >
                            <img
                                src="https://via.placeholder.com/400x225"
                                alt="Project 1"
                                className="object-cover w-full h-full"
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
                            data-aos="fade-left"
                            className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed"
                        >
                            Here are some of the applications and interfaces I have built
                            with modern frontend technologies. Each project is crafted with
                            clean design, performance optimization, and responsive layouts.
                        </p>
                        <p
                            data-aos="fade-left"
                            data-aos-delay={200}
                            className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mt-4"
                        >
                            From small business websites to larger enterprise applications,
                            I aim to deliver scalable and maintainable solutions that enhance
                            user experience and usability.
                        </p>
                    </div>
                </div>
            </main>

            {/* Project Grid Section with Filter */}
            <section id="projects-grid" className="py-16 sm:py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16">
                    <h2
                        data-aos="fade-up"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center"
                    >
                        Projects
                    </h2>

                    {/* Filter Buttons */}
                    <div className="flex justify-center gap-4 mb-8">
                        {["All", "Web Development", "Data & AI"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat as any)}
                                className={`px-4 py-2 rounded-lg font-semibold transition ${filter === cat
                                    ? "bg-[#0A2757] text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Project Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredProjects.map((project, index) => (
                            <FlipCard key={project.id} project={project} delay={index * 100} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

// FlipCard Component pakai Framer Motion
// FlipCard Component pakai Framer Motion dengan badge "Flip for detail"
function FlipCard({ project, delay }: { project: any; delay: number }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            data-aos="fade-up"
            data-aos-delay={100 + delay}
            className="w-full aspect-video perspective"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ cursor: "default" }}
        >
            <motion.div
                className="relative w-full h-full rounded-2xl shadow-lg"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <motion.div
                    className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={project.img}
                        alt={project.name}
                        className="w-full h-full object-cover rounded-2xl"
                    />
                    {/* Badge / Lengkungan */}
                    <div className="absolute top-0 right-0 bg-[#0A2757] text-white px-3 py-1 rounded-bl-2xl font-semibold text-sm">
                        Flip for detail
                    </div>
                </motion.div>

                {/* Back */}
                <motion.div
                    className="absolute w-full h-full backface-hidden rounded-2xl bg-black bg-opacity-80 text-white flex flex-col justify-between p-6"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div>
                        <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                            {project.name}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base">{project.desc}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-3">
                            {project.tech.map((tech: any, i: number) => (
                                <div
                                    key={i}
                                    className="text-2xl sm:text-3xl transition"
                                    style={{ color: tech.color }}
                                >
                                    {tech.icon}
                                </div>
                            ))}
                        </div>
                        <button className="px-4 py-2 bg-[#0A2757] text-white rounded-lg hover:bg-[#0C3A72] transition cursor-pointer">
                            Preview
                        </button>
                    </div>
                </motion.div>
            </motion.div>
            <style jsx>{`
                .perspective {perspective: 1000px;}
            `}</style>
        </motion.div>
    );
}
