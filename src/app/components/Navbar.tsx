"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [origin, setOrigin] = useState({ x: 50, y: 50 });
    const [scrolled, setScrolled] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();

    // Detect scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    const handleToggleMenu = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const xPercent = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
            const yPercent = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
            setOrigin({ x: xPercent, y: yPercent });
        }
        setIsOpen(!isOpen);
    };

    return (
        <header
            className="fixed top-0 left-0 w-full z-50 transition-colors duration-300"
            style={{
                backgroundColor: scrolled ? "rgba(255, 255, 255, 0.5)" : "transparent",
            }}
        >
            <div className="mx-auto flex items-center justify-between py-6 px-6 relative z-50">
                {/* Left: Back button + Brand */}
                <motion.div
                    className="flex items-center w-20"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {(pathname === "/about" || pathname === "/projects") ? (
                        <Link href="/">
                            <ArrowLeft className="w-6 h-6 text-gray-900 cursor-pointer" />
                        </Link>
                    ) : (
                        <div className="w-6 h-6" />
                    )}
                    <span
                        className="ml-2 text-base font-bold text-gray-900 select-none"
                        style={{ fontFamily: "var(--font-horizon)" }}
                    >
                        RIZKY
                    </span>
                </motion.div>

                {/* Right: Hamburger */}
                <motion.button
                    ref={buttonRef}
                    className="flex flex-col justify-center items-center w-10 h-10 relative z-50"
                    onClick={handleToggleMenu}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Bottom line */}
                    <motion.span
                        className="block w-7 h-0.5 rounded"
                        style={{ backgroundColor: isOpen ? "#FF4C4C" : "#1F2937" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isOpen ? { rotate: 45, y: 6, opacity: 1 } : { rotate: 0, y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 25 }}
                    />
                    {/* Middle line */}
                    <motion.span
                        className="block w-7 h-0.5 rounded my-1"
                        style={{ backgroundColor: isOpen ? "#FF4C4C" : "#1F2937" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isOpen ? { opacity: 0 } : { opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    />
                    {/* Top line */}
                    <motion.span
                        className="block w-7 h-0.5 rounded"
                        style={{ backgroundColor: isOpen ? "#FF4C4C" : "#1F2937" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isOpen ? { rotate: -45, y: -6, opacity: 1 } : { rotate: 0, y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 25 }}
                    />
                </motion.button>
            </div>

            {/* Overlay & Menu */}
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
                                    <motion.div key={item.name} variants={itemVariants}>
                                        <Link
                                            href={item.href}
                                            className="block px-4 py-2 text-center text-white text-xl font-semibold"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
