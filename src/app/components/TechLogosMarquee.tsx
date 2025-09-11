"use client";

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

interface TechLogosMarqueeProps {
    isMobileOrTablet: boolean;
    clickedIcons: boolean[];
    setClickedIcons: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function TechLogosMarquee({
    isMobileOrTablet,
    clickedIcons,
    setClickedIcons,
}: TechLogosMarqueeProps) {
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

    // Duplicate the list to create infinite marquee effect
    const loopedTechs = [...techs, ...techs];

    const handleIconClick = (idx: number) => {
        if (isMobileOrTablet) {
            setClickedIcons((prev) => {
                const updated = [...prev];
                updated[idx] = true;
                return updated;
            });

            // Reset after 1 second so the icon "click effect" is temporary
            setTimeout(() => {
                setClickedIcons((prev) => {
                    const updated = [...prev];
                    updated[idx] = false;
                    return updated;
                });
            }, 1000);
        }
    };

    return (
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
                            whileHover={
                                !isMobileOrTablet
                                    ? {
                                        scale: 1.3,
                                        color: tech.color,
                                        filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.3))",
                                    }
                                    : {}
                            }
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
    );
}
