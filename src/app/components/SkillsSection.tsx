"use client";

import { useState } from "react";
import { FaCode, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaVuejs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiBootstrap, SiMaterialdesign, SiChakraui, SiAntdesign, SiDaisyui, SiFigma, SiStorybook, SiFramer, SiPostman, SiVite, SiWebpack, SiBabel, SiJest, SiCypress, SiVitest, SiJavascript, SiHtml5, SiCss3, SiGraphql, SiTestinglibrary } from "react-icons/si";
import { MdDashboardCustomize } from "react-icons/md";
import { VscBeaker } from "react-icons/vsc";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsSection() {
    const [selectedSkill, setSelectedSkill] = useState<string>("Frontend Fundamentals");
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const skills = [
        {
            name: "Frontend Fundamentals",
            icon: (active: boolean, hover: boolean) => (
                <FaCode
                    className="w-12 h-12 transition-colors duration-300"
                    style={{ color: active || hover ? "#FF7F50" : "#9CA3AF" }}
                />
            ),
            details: [
                { name: "HTML", icon: SiHtml5, color: "#E34F26" },
                { name: "CSS (Flexbox, Grid, Responsive)", icon: SiCss3, color: "#1572B6" },
                { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
                { name: "DOM Manipulation", icon: FaCode, color: "#FF7F50" },
                { name: "Web Accessibility", icon: SiTestinglibrary, color: "#4CAF50" },
                { name: "SEO Basics", icon: FaCode, color: "#FF4500" },
            ],
            tools: [
                { name: "VS Code", icon: FaCode, color: "#007ACC" },
                // { name: "Chrome DevTools", icon: FaCode, color: "#4285F4" },
                { name: "Git", icon: FaGitAlt, color: "#F05032" },
                { name: "Github", icon: FaGithub, color: "#181717" },
            ],
        },
        {
            name: "UI Frameworks",
            icon: (active: boolean, hover: boolean) => (
                <MdDashboardCustomize
                    className="w-12 h-12 transition-colors duration-300"
                    style={{ color: active || hover ? "#9B5DE5" : "#9CA3AF" }}
                />
            ),
            details: [
                { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
                { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
                { name: "Material UI", icon: SiMaterialdesign, color: "#007FFF" },
                // { name: "Chakra UI", icon: SiChakraui, color: "#319795" },
            ],
            tools: [
                { name: "Figma", icon: SiFigma, color: "#F24E1E" },
                // { name: "Storybook", icon: SiStorybook, color: "#FF4785" },
                // { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
            ],
        },
        {
            name: "Frameworks & Libraries",
            icon: (active: boolean, hover: boolean) => (
                <FaReact
                    className="w-12 h-12 transition-colors duration-300"
                    style={{ color: active || hover ? "#61DAFB" : "#9CA3AF" }}
                />
            ),
            details: [
                { name: "React.js", icon: FaReact, color: "#61DAFB" },
                { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
                { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
                { name: "Node.js", icon: FaNodeJs, color: "#339933" },
                { name: "Express.js", icon: FaNodeJs, color: "#000000" },
                // { name: "React Query", icon: FaReact, color: "#FF4154" },
                // { name: "Vue.js", icon: FaVuejs, color: "#4FC08D" },
            ],
            tools: [
                { name: "Postman", icon: SiPostman, color: "#FF6C37" },
                { name: "Vite", icon: SiVite, color: "#646CFF" },
                // { name: "Webpack", icon: SiWebpack, color: "#8DD6F9" },
            ],
        },
        {
            name: "Testing",
            icon: (active: boolean, hover: boolean) => (
                <VscBeaker
                    className="w-12 h-12 transition-colors duration-300"
                    style={{ color: active || hover ? "#22C55E" : "#9CA3AF" }}
                />
            ),
            details: [
                { name: "Jest", icon: SiJest, color: "#C21325" },
                { name: "React Testing Library", icon: FaReact, color: "#61DAFB" },
            ],
            tools: [
                { name: "CI/CD (GitHub Actions)", icon: FaGithub, color: "#181717" },
            ],
        },
    ];

    return (
        <section className="max-w-6xl mx-auto text-center">
            <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Skills & Expertise
            </motion.h2>

            {/* Skill Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {skills.map((skill, i) => {
                    const isActive = selectedSkill === skill.name;
                    const isHovered = hoveredSkill === skill.name;

                    return (
                        <motion.button
                            key={i}
                            onClick={() => setSelectedSkill(skill.name)}
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 w-full"
                        >
                            <div className="mb-4">{skill.icon(isActive, isHovered)}</div>
                            <p className={`text-lg font-medium ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                                {skill.name}
                            </p>
                        </motion.button>
                    );
                })}
            </div>

            {/* Skill Details */}
            <AnimatePresence mode="wait">
                {selectedSkill && (
                    <motion.div
                        key={selectedSkill}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="mt-10"
                    >
                        <h3 className="text-2xl font-semibold mb-4">Core Skills</h3>
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {skills
                                .find((s) => s.name === selectedSkill)
                                ?.details.map((item, idx) => {
                                    const IconComp = item.icon;
                                    return (
                                        <motion.span
                                            key={idx}
                                            onMouseEnter={() => setHoveredItem(item.name)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-full shadow-sm hover:bg-gray-300 transition"
                                        >
                                            {IconComp && (
                                                <IconComp
                                                    className="w-5 h-5 transition-colors duration-300"
                                                    style={{
                                                        color: hoveredItem === item.name ? item.color : "#6B7280",
                                                    }}
                                                />
                                            )}
                                            {item.name}
                                        </motion.span>
                                    );
                                })}
                        </div>

                        <h3 className="text-2xl font-semibold mb-4">Tools & Technologies</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {skills
                                .find((s) => s.name === selectedSkill)
                                ?.tools.map((tool, idx) => {
                                    const IconComp = tool.icon;
                                    return (
                                        <motion.span
                                            key={idx}
                                            onMouseEnter={() => setHoveredItem(tool.name)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-900 font-medium rounded-full shadow-sm hover:bg-gray-400 transition"
                                        >
                                            {IconComp && (
                                                <IconComp
                                                    className="w-5 h-5 transition-colors duration-300"
                                                    style={{
                                                        color: hoveredItem === tool.name ? tool.color : "#6B7280",
                                                    }}
                                                />
                                            )}
                                            {tool.name}
                                        </motion.span>
                                    );
                                })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
