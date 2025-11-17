"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Tech = {
    icon: React.ReactNode;
    color: string;
};

type Project = {
    img: string;
    name: string;
    desc: string;
    tech: Tech[];
};

export default function FlipCard({
    project,
    delay,
    isMobileOrTablet,
}: {
    project: Project;
    delay: number;
    isMobileOrTablet: boolean;
}) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            data-aos="fade-up"
            data-aos-delay={100 + delay}
            className="w-full aspect-video perspective"
            onClick={() => setIsFlipped(!isFlipped)}
            onMouseEnter={() => !isMobileOrTablet && setIsFlipped(true)}
            onMouseLeave={() => !isMobileOrTablet && setIsFlipped(false)}
            style={{ cursor: "pointer" }}
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
                    <div className="absolute top-0 right-0 bg-[#0A2757] text-white px-3 py-1 rounded-bl-2xl font-semibold text-sm">
                        Flip for detail
                    </div>
                </motion.div>

                <motion.div
                    className="absolute w-full h-full backface-hidden rounded-2xl bg-black bg-opacity-80 text-white flex flex-col justify-between p-4 sm:p-6 overflow-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="overflow-hidden">
                        <h3 className="text-lg sm:text-2xl font-semibold mb-2 truncate">
                            {project.name}
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-base break-words max-w-full">
                            {project.desc}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between mt-4 gap-3">
                        <div className="flex flex-wrap gap-3 max-w-[70%]">
                            {project.tech.map((tech, i) => (
                                <div
                                    key={i}
                                    className="text-xl sm:text-3xl transition"
                                    style={{ color: tech.color }}
                                >
                                    {tech.icon}
                                </div>
                            ))}
                        </div>

                        {/* <button className="px-4 py-2 bg-[#0A2757] text-white rounded-lg hover:bg-[#0C3A72] transition cursor-pointer whitespace-nowrap">
                            Preview
                        </button> */}
                    </div>
                </motion.div>
            </motion.div>
            <style jsx>{`
                .perspective {
                    perspective: 1000px;
                }
            `}</style>
        </motion.div>
    );
}
