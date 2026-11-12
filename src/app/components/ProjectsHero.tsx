"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface ProjectsHeroProps {
  isMobileOrTablet: boolean;
  clickedImages: boolean[];
  setClickedImages: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function ProjectsHero({
  isMobileOrTablet,
  clickedImages,
  setClickedImages,
}: ProjectsHeroProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHoveredStack, setIsHoveredStack] = useState(false);

  const images = [
    {
      top: "top-4 sm:top-6 md:top-8 lg:top-12",
      left: "left-[11%] md:left-0",
      rotateNum: -3,
      z: 0,
      src: "/img/project3.webp",
    },
    {
      top: "top-2 sm:top-3 md:top-4 lg:top-6",
      left: "left-[15%] md:left-4 lg:left-8",
      rotateNum: 2,
      z: 10,
      src: "/img/project1.webp",
    },
    {
      top: "top-0",
      left: "left-[19%] md:left-8 lg:left-16",
      rotateNum: -1,
      z: 20,
      src: "/img/project2.webp",
    },
  ];

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleImageClick = (index: number) => {
    setClickedImages((prev) => {
      const isAlreadyClicked = prev[index];
      const updated = [false, false, false];
      if (!isAlreadyClicked) {
        updated[index] = true;
      }
      return updated;
    });
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const isAnyClicked = clickedImages.some(Boolean);
  const isInteracting = isHoveredStack || activeIndex !== null || isAnyClicked;

  const cardVariants: Variants = {
    idle: (custom: { index: number; rotateNum: number; z: number }) => ({
      rotate: custom.rotateNum,
      y: [0, -4, 0],
      scale: 1,
      filter: "grayscale(100%)",
      zIndex: custom.z,
      transition: {
        y: {
          duration: 3 + custom.index * 0.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
        duration: 0.3,
        ease: "easeOut" as const,
      },
    }),
    active: (custom: { rotateNum: number }) => ({
      rotate: custom.rotateNum,
      y: -12,
      scale: 1.06,
      filter: "grayscale(0%)",
      zIndex: 40,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    inactive: (custom: { rotateNum: number; z: number }) => ({
      rotate: custom.rotateNum,
      y: 0,
      scale: 1,
      filter: "grayscale(100%)",
      zIndex: custom.z,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div className="w-full h-full flex items-center justify-center py-4 sm:py-6 md:py-8 lg:py-12 bg-transparent text-gray-900">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Images Stack - Centered horizontally on mobile */}
        <div
          className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[480px] h-[150px] sm:h-[185px] md:h-[220px] lg:h-[270px] mx-auto mb-3 sm:mb-4 md:mb-0"
          onMouseEnter={() => setIsHoveredStack(true)}
          onMouseLeave={() => {
            setIsHoveredStack(false);
            setActiveIndex(null);
          }}
        >
          {images.map((img, index) => {
            const isThisActive = activeIndex === index || clickedImages[index];
            const currentVariant = isInteracting
              ? isThisActive
                ? "active"
                : "inactive"
              : "idle";

            return (
              <motion.div
                key={index}
                custom={{ index, rotateNum: img.rotateNum, z: img.z }}
                variants={cardVariants}
                animate={currentVariant}
                className={`absolute ${img.top} ${img.left} rounded-2xl overflow-hidden shadow-xl ring-4 ring-white cursor-pointer select-none`}
                style={{ width: "70%", aspectRatio: "16 / 9", willChange: "transform" }}
                whileTap={{
                  scale: 0.94,
                  transition: { duration: 0.1 },
                }}
                onClick={() => handleImageClick(index)}
                onMouseEnter={() => {
                  setIsHoveredStack(true);
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  setActiveIndex(null);
                }}
              >
                <Image
                  src={img.src}
                  alt={`Project ${index + 1}`}
                  fill
                  className="object-cover max-w-full max-h-full"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-5 text-gray-900 tracking-tight">
            My Projects
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
            Here are some of the applications and interfaces I have built with
            modern frontend technologies. Each project is crafted with clean
            design, performance optimization, and responsive layouts.
          </p>
          <p className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mt-2 sm:mt-3 max-w-xl mx-auto md:mx-0">
            From small business websites to larger enterprise applications, I
            aim to deliver scalable and maintainable solutions that enhance user
            experience and usability.
          </p>
        </div>
      </div>
    </div>
  );
}
