"use client";

import { Home as HomeIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [origin, setOrigin] = useState({ x: 50, y: 50 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const xPercent = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
            const yPercent = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
            setOrigin({ x: xPercent, y: yPercent });
        }
    }, []);

    const menuItems = ["Home", "About", "Projects", "Contact"];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.5,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative z-50">
                <a href="#home" className="flex items-center z-50">
                    <HomeIcon className="w-6 h-6 text-gray-900" />
                </a>

                <button
                    ref={buttonRef}
                    className="flex flex-col justify-center items-center w-10 h-10 relative z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <motion.span
                        className="block w-7 h-0.5 rounded"
                        style={{ backgroundColor: isOpen ? "#FF4C4C" : "#1F2937" }}
                        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    />
                    <motion.span
                        className="block w-7 h-0.5 rounded my-1"
                        style={{ backgroundColor: isOpen ? "#FF4C4C" : "#1F2937" }}
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="block w-7 h-0.5 rounded"
                        style={{ backgroundColor: isOpen ? "#FF4C4C" : "#1F2937" }}
                        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/85 z-40"
                            initial={{ clipPath: `circle(0% at ${origin.x}% ${origin.y}%)` }}
                            animate={{ clipPath: `circle(150% at ${origin.x}% ${origin.y}%)` }}
                            exit={{ clipPath: `circle(0% at ${origin.x}% ${origin.y}%)` }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto"
                            onClick={() => setIsOpen(false)}
                        >
                            <motion.div
                                className="w-full max-w-sm p-6 flex flex-col gap-4 items-center"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {menuItems.map((item) => (
                                    <motion.a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className="block px-4 py-2 text-center text-white text-xl font-semibold"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, fontWeight: 700 }}
                                        whileTap={{ scale: 0.95, fontWeight: 700 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
