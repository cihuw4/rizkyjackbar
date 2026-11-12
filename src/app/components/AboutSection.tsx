"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface AboutSectionProps {
  isMobileOrTablet?: boolean;
  clickedImages?: boolean[];
  setClickedImages?: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function AboutSection({
  isMobileOrTablet: externalIsMobile,
  clickedImages: externalClickedImages,
  setClickedImages: externalSetClickedImages,
}: AboutSectionProps) {
  const [internalClickedImages, setInternalClickedImages] = useState([
    false,
    false,
    false,
  ]);
  const clickedImages = externalClickedImages || internalClickedImages;
  const setClickedImages =
    externalSetClickedImages || setInternalClickedImages;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHoveredStack, setIsHoveredStack] = useState(false);

  const images = [
    {
      top: "top-8 sm:top-10 md:top-12",
      left: "left-[15%] md:left-0",
      rotateNum: -3,
      z: 0,
      src: "/img/about3.webp",
      alt: "Profile 3",
    },
    {
      top: "top-4 sm:top-5 md:top-6",
      left: "left-[20%] md:left-5 lg:left-8",
      rotateNum: 2,
      z: 10,
      src: "/img/about2.webp",
      alt: "Profile 2",
    },
    {
      top: "top-0",
      left: "left-[25%] md:left-10 lg:left-16",
      rotateNum: -1,
      z: 20,
      src: "/img/about1.webp",
      alt: "Profile 1",
    },
  ];

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
        {/* Images Stack - Matching ProjectsHero architecture */}
        <div
          className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] mx-auto mb-2 sm:mb-4 md:mb-0"
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
                style={{
                  width: "60%",
                  aspectRatio: "3 / 4",
                  willChange: "transform",
                }}
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
                  alt={img.alt}
                  fill
                  className="object-cover max-w-full max-h-full"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Text Section - Matching ProjectsHero typography and spacing */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-5 text-gray-900 tracking-tight">
            Who I Am ?
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
            Hi, I&apos;m{" "}
            <span className="font-semibold text-gray-900">Muhammad Rizky</span>.
            I&apos;m a passionate{" "}
            <span className="font-semibold text-gray-900">
              Frontend Developer
            </span>{" "}
            with a strong focus on building clean, responsive, and interactive
            UI/UX. I specialize in JavaScript, Next.js, and Tailwind CSS.
          </p>
          <p className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mt-2 sm:mt-3 max-w-xl mx-auto md:mx-0">
            My goal is to craft digital experiences that not only look great but
            also deliver smooth performance and accessibility across all
            devices.
          </p>
        </div>
      </div>
    </div>
  );
}
