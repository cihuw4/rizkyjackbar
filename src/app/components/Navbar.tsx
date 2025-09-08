"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [circleOrigin, setCircleOrigin] = useState("100% 0%");
    const [logoKey, setLogoKey] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCircleOrigin(
                `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`
            );
        }
    }, [isOpen]);

    useEffect(() => {
        setLogoKey((prev) => prev + 1);
    }, [pathname]);

    const menuItems = (() => {
        if (pathname === "/") {
            return [
                { name: "Home", href: "/#home" },
                { name: "About", href: "/#about" },
                { name: "Projects", href: "/#projects" },
                { name: "Contact", href: "/#contact" },
            ];
        } else if (pathname === "/about") {
            return [
                { name: "Home", href: "/" },
                { name: "Projects", href: "/projects" },
            ];
        } else if (pathname === "/projects") {
            return [
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
            ];
        } else {
            return [{ name: "Home", href: "/" }];
        }
    })();

    const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, itemHref: string) => {
        setIsOpen(false);

        const hash = itemHref.split("#")[1];
        if (hash) {
            e.preventDefault();
            if (pathname !== "/") {
                router.push("/");
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            } else {
                const element = document.getElementById(hash);
                if (element) element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 
            ${scrolled || isOpen ? "bg-white/30 backdrop-blur-md" : "bg-transparent"}`}
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between py-5 px-6 lg:px-12">

                <div className="flex items-center gap-3 relative">

                    <motion.div
                        key={logoKey}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`${pathname === "/about" || pathname === "/projects"
                            ? "lg:block hidden pointer-events-none"
                            : "block lg:block pointer-events-none"
                            }`}
                    >
                        <div
                            className="text-xl font-bold tracking-wide text-gray-900"
                            style={{ fontFamily: "var(--font-horizon)" }}
                        >
                            RIZKY
                        </div>
                    </motion.div>

                    {(pathname === "/about" || pathname === "/projects") && (
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                            className="absolute left-0 md:left-[-15px] lg:left-[-40px]"
                        >
                            <Link
                                href="/"
                                className="flex items-center justify-center p-1 rounded-full hover:bg-black/10 transition"
                            >
                                <ArrowLeft size={25} className="text-gray-900" />
                            </Link>
                        </motion.div>
                    )}
                </div>

                <motion.button
                    ref={buttonRef}
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-[60]"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
                >
                    <motion.span
                        initial={false}
                        animate={{
                            rotate: isOpen ? 45 : 0,
                            y: isOpen ? 7 : 0,
                            backgroundColor: isOpen ? "#ef4444" : "#111111",
                        }}
                        transition={{ duration: 0.3 }}
                        className="block h-0.5 w-7 rounded"
                    />
                    <motion.span
                        initial={false}
                        animate={{ opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        className="block h-0.5 w-7 bg-gray-900 rounded"
                    />
                    <motion.span
                        initial={false}
                        animate={{
                            rotate: isOpen ? -45 : 0,
                            y: isOpen ? -9 : 0,
                            backgroundColor: isOpen ? "#ef4444" : "#111111",
                        }}
                        transition={{ duration: 0.3 }}
                        className="block h-0.5 w-7 rounded"
                    />
                </motion.button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 h-screen w-screen bg-black/80 z-50 flex flex-col items-center justify-center gap-8 text-2xl font-semibold text-white"
                        initial={{ clipPath: `circle(0% at ${circleOrigin})` }}
                        animate={{ clipPath: `circle(200% at ${circleOrigin})` }}
                        exit={{ clipPath: `circle(0% at ${circleOrigin})` }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        {menuItems.map((item, i) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: i * 0.15 + 0.3 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={(e) => handleMenuClick(e, item.href)}
                                        className="transition"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
