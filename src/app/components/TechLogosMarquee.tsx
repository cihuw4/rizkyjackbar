"use client";

import { useState } from "react";
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
  isMobileOrTablet?: boolean;
  clickedIcons?: boolean[];
  setClickedIcons?: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function TechLogosMarquee({
  isMobileOrTablet = false,
  clickedIcons: externalClicked,
  setClickedIcons: externalSetClicked,
}: TechLogosMarqueeProps) {
  const [internalClicked, setInternalClicked] = useState<boolean[]>(new Array(16).fill(false));
  const clickedIcons = externalClicked || internalClicked;
  const setClickedIcons = externalSetClicked || setInternalClicked;
  const techs = [
    { icon: FaReact, color: "#61DAFB", name: "React" },
    { icon: FaJsSquare, color: "#F7DF1E", name: "JavaScript" },
    { icon: FaHtml5, color: "#E34F26", name: "HTML5" },
    { icon: FaCss3Alt, color: "#1572B6", name: "CSS3" },
    { icon: FaNodeJs, color: "#5FA04E", name: "Node.js" },
    { icon: FaVuejs, color: "#4FC08D", name: "Vue.js" },
    { icon: SiPython, color: "#3776AB", name: "Python" },
    { icon: SiWordpress, color: "#21759B", name: "WordPress" },
  ];

  const loopedTechs = [...techs, ...techs];

  const handleIconClick = (idx: number) => {
    if (!isMobileOrTablet) return;

    setClickedIcons((prev) => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });

    setTimeout(() => {
      setClickedIcons((prev) => {
        const updated = [...prev];
        updated[idx] = false;
        return updated;
      });
    }, 1000);
  };

  return (
    <div className="w-full overflow-hidden py-4 sm:py-6 bg-transparent">
      <div className="flex items-center h-full max-w-6xl mx-auto px-2 sm:px-10 md:px-16">
        <motion.div
          className="flex gap-3 sm:gap-6 md:gap-10 min-w-max"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: ["0%", "-50%"] }}
          transition={{
            opacity: { duration: 0.5 },
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            pointerEvents: "none",
          }}
        >
          {loopedTechs.map((tech, idx) => {
            const Icon = tech.icon;
            const isActive = isMobileOrTablet && clickedIcons[idx];

            return (
              <motion.div
                key={idx}
                className={`group flex flex-col items-center justify-center min-w-[64px] sm:min-w-[90px] md:min-w-[120px] transition-colors duration-200 ${
                  isMobileOrTablet ? "cursor-pointer" : "cursor-default"
                }`}
                whileHover={
                  !isMobileOrTablet
                    ? {
                        scale: 1.25,
                        color: tech.color,
                        transition: { duration: 0.2 },
                      }
                    : {}
                }
                onClick={
                  isMobileOrTablet ? () => handleIconClick(idx) : undefined
                }
                style={{
                  pointerEvents: "auto",
                  color: isActive ? tech.color : "#A0AEC0",
                }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <Icon className="w-full h-full" />
                </div>
                <span className="mt-1 sm:mt-2 text-[11px] sm:text-xs md:text-sm font-medium text-gray-700">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
