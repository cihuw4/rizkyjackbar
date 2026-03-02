"use client";

import { useEffect, useState } from "react";
import { Home as HomeIcon, User, FileText, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

const sections = [
  {
    id: "home",
    icon: HomeIcon,
    animationPath: "/lottie/home-button.json",
  },
  {
    id: "about",
    icon: User,
    animationPath: "/lottie/user.json",
  },
  {
    id: "projects",
    icon: FileText,
    animationPath: "/lottie/checklist.json",
  },
  {
    id: "contact",
    icon: Mail,
    animationPath: "/lottie/email.json",
  },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  // const [hovered, setHovered] = useState<string | null>(null);
  const [animations, setAnimations] = useState<Record<string, object>>({});

  // Load Lottie JSON dari public
  useEffect(() => {
    const loadAnimations = async () => {
      const results: Record<string, object> = {};

      for (const section of sections) {
        if (section.animationPath) {
          const res = await fetch(section.animationPath);
          results[section.id] = await res.json();
        }
      }

      setAnimations(results);
    };

    loadAnimations();
  }, []);

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
            current = section.id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="hidden md:flex fixed top-[55%] left-0 -translate-y-1/2 flex-col items-center gap-6 px-4 py-8 bg-gray-300 rounded-r-xl shadow-lg">
      {sections.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;

        return (
          <motion.button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className="relative w-12 h-12 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* ACTIVE → LOTTIE */}
            {isActive && animations[section.id] ? (
              <div className="absolute w-12 h-12 pointer-events-none">
                <Lottie animationData={animations[section.id]} loop autoplay />
              </div>
            ) : (
              /* DEFAULT → ICON */
              <Icon
                className={`w-8 h-8 transition-all duration-300 ${
                  isActive ? "text-black" : "text-gray-400"
                }`}
              />
            )}

            {/* Active Indicator */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  className={`absolute left-[105%] top-1/1 -translate-y-1/2 w-6 h-6 rounded-full ${
                    activeSection === "home" || activeSection === "projects"
                      ? "bg-gray-100"
                      : "bg-white"
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                  }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </nav>
  );
}
