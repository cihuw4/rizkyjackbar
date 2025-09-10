"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function QuoteSection() {
    const fullText =
        "IImpossible is not a fact. It's an opinion. Impossible is not a declaration. It's a dare. Impossible is potential. Impossible is temporary. And impossible is nothing.";
    const highlight = "And impossible is nothing.";

    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [isTypingDone, setIsTypingDone] = useState(false);
    const [showPhilosophy, setShowPhilosophy] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTyping = () => {
        let currentIndex = 0;
        setDisplayedText("");
        setIsTypingDone(false);
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = setInterval(() => {
            setDisplayedText((prev) => prev + fullText[currentIndex]);
            currentIndex++;
            if (currentIndex >= fullText.length) {
                if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
                setIsTypingDone(true);
            }
        }, 30);
    };

    const startBlinkingCursor = () => {
        if (blinkIntervalRef.current) clearInterval(blinkIntervalRef.current);
        setShowCursor(true);
        blinkIntervalRef.current = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
    };

    const stopAnimations = () => {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        if (blinkIntervalRef.current) clearInterval(blinkIntervalRef.current);
        setDisplayedText("");
        setShowCursor(false);
        setIsTypingDone(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startTyping();
                    startBlinkingCursor();
                } else {
                    stopAnimations();
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
            stopAnimations();
        };
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isTypingDone) {
            timeout = setTimeout(() => {
                setShowPhilosophy(true);
            }, 1500);
        } else {
            setShowPhilosophy(false);
        }
        return () => clearTimeout(timeout);
    }, [isTypingDone]);

    return (
        <section
            ref={sectionRef}
            className="max-w-4xl mx-auto text-center min-h-[200px]"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-xl sm:text-2xl md:text-3xl font-semibold italic text-gray-700 whitespace-pre-wrap relative inline-block"
            >
                {displayedText.includes(highlight) ? (
                    <>
                        {displayedText.split(highlight)[0]}
                        <span
                            className="relative inline-block text-gray-700 font-bold"
                            style={{ verticalAlign: "bottom" }}
                        >
                            {highlight}

                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: isTypingDone ? "100%" : 0 }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                                className="absolute top-0 left-0 h-full text-yellow-500 overflow-hidden whitespace-nowrap"
                                style={{ pointerEvents: "none" }}
                            >
                                {highlight}
                            </motion.span>
                        </span>
                    </>
                ) : (
                    displayedText
                )}
                {/* Cursor */}
                <span
                    className={`ml-1 inline-block align-bottom h-7 border-l-2 border-gray-700 ${showCursor ? "opacity-100" : "opacity-0"
                        }`}
                    style={{ transform: "rotate(10deg)" }}
                />
            </motion.div>

            <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: showPhilosophy ? 1 : 0, y: showPhilosophy ? 0 : 10 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="mt-4 block text-lg font-normal text-gray-500"
            >
                - Adidas Philosophy
            </motion.span>
        </section>
    );
}
