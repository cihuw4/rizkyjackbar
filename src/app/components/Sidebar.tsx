"use client";

import { useEffect, useState } from "react";
import { Home as HomeIcon, User, FolderKanban, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
    { id: "home", icon: HomeIcon },
    { id: "about", icon: User },
    { id: "projects", icon: FolderKanban },
    { id: "contact", icon: Mail },
];

export default function Sidebar() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            let current = "home";
            sections.forEach((section) => {
                const el = document.getElementById(section.id);
                if (el) {
                    const top = el.offsetTop;
                    const scrollY = window.scrollY + window.innerHeight / 3;
                    if (scrollY >= top) current = section.id;
                }
            });
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="hidden md:flex fixed top-[55%] left-0 transform -translate-y-1/2 flex-col items-center gap-6 px-4 py-8 bg-gray-900 rounded-r-xl shadow-lg">
            {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                    <motion.button
                        key={section.id}
                        onClick={() => handleClick(section.id)}
                        className="p-2 rounded relative"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icon
                            className={`w-6 h-6 text-white transition-transform ${isActive ? "scale-125" : ""}`}
                        />

                        <AnimatePresence>
                            {isActive && (
                                <motion.span
                                    key={section.id}
                                    className={`absolute left-[100%] top-1/2 -translate-y-1/2 translate-x-1 w-6 h-6 rounded-full pointer-events-none ${activeSection === "home" || activeSection === "projects"
                                        ? "bg-gray-100"
                                        : "bg-white"
                                        }`}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                />
                            )}
                        </AnimatePresence>
                    </motion.button>
                );
            })}
        </nav>
    );
}
