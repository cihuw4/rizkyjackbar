"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const PROJECT_IMG_SRC = "/img/home_project.webp";

interface ProjectsProps {
  onHoverImg?: (src: string | null) => void;
  isActive?: boolean;
}

export default function Projects({ onHoverImg, isActive }: ProjectsProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsClicked(false);
    }
  }, [isActive]);

  useEffect(() => {
    function checkScreen() {
      setIsMobileOrTablet(window.innerWidth < 768);
    }
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  function handleImageClick() {
    if (isMobileOrTablet) {
      const next = !isClicked;
      setIsClicked(next);
      if (onHoverImg) onHoverImg(next ? PROJECT_IMG_SRC : null);
    }
  }

  function handleMouseEnter() {
    if (!isMobileOrTablet && onHoverImg) onHoverImg(PROJECT_IMG_SRC);
  }

  function handleMouseLeave() {
    if (!isMobileOrTablet && onHoverImg) onHoverImg(null);
  }

  return (
    <section
      id="projects"
      className="flex flex-col-reverse md:flex-row items-center justify-center min-h-[75vh] md:min-h-screen px-5 sm:px-10 md:px-16 py-10 sm:py-20 bg-transparent"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <div
          data-aos="fade-left"
          data-aos-delay="100"
          className="flex justify-center md:justify-end order-1 md:order-2 w-full md:w-auto"
        >
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className=""
          >
            <Image
              src={PROJECT_IMG_SRC}
              alt="My Projects"
              width={320}
              height={420}
              onClick={handleImageClick}
              className={`w-44 h-56 sm:w-60 sm:h-72 md:w-72 md:h-96 rounded-2xl object-cover filter transition duration-700
                ${
                  !isActive
                    ? "grayscale"
                    : isMobileOrTablet
                      ? isClicked
                        ? "grayscale-0 cursor-pointer"
                        : "grayscale cursor-pointer"
                      : "grayscale hover:grayscale-0"
                }`}
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left order-2 md:order-1">
          <h1
            data-aos="fade-right"
            data-aos-delay="200"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 relative inline-block text-gray-900"
          >
            Projects
            <span className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 -bottom-1.5 w-12 h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 rounded-full animate-pulse"></span>
          </h1>

          <p
            data-aos="fade-right"
            data-aos-delay="300"
            className="hidden sm:block text-sm sm:text-base md:text-lg text-gray-600 max-w-md mx-auto md:mx-0 mb-6 leading-relaxed"
          >
            Selected web applications focused on performance, accessibility, and modern interfaces.
          </p>

          <div className="mt-2 sm:mt-0">
            <Link
              data-aos="fade-right"
              data-aos-delay="400"
              href="/projects"
              className="btn-liquid-clear text-xs sm:text-sm whitespace-nowrap"
            >
              View Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
