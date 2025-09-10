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
}: {
    project: Project;
    delay: number;
}) {
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
                            {project.tech.map((tech, i) => (
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
                .perspective { perspective: 1000px; }
            `}</style>
        </motion.div>
    );
}
