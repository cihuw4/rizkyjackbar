"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const HERO_IMG_SRC = "/img/home_hero.webp";

interface HeroProps {
  onHoverImg?: (src: string | null) => void;
  isActive?: boolean;
}

export default function Hero({ onHoverImg, isActive = true }: HeroProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsClicked(false);
      setIsHovered(false);
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
      if (onHoverImg) onHoverImg(next ? HERO_IMG_SRC : null);
    }
  }

  function handleMouseEnter() {
    if (!isMobileOrTablet && isActive) {
      setIsHovered(true);
      if (onHoverImg) onHoverImg(HERO_IMG_SRC);
    }
  }

  function handleMouseLeave() {
    if (!isMobileOrTablet) {
      setIsHovered(false);
      if (onHoverImg) onHoverImg(null);
    }
  }

  return (
    <section
      id="home"
      className="w-full flex items-center justify-center min-h-[75vh] md:min-h-screen py-10 sm:py-20 bg-transparent"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left Side */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-500 mb-1 tracking-widest uppercase font-accidentalPresident">
            Muhammad Rizky
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 sm:mb-4 text-gray-900 md:-ml-1">
            Frontend Developer
          </h1>

          <p className="hidden sm:block text-sm sm:text-base md:text-lg text-gray-600 max-w-xl lg:max-w-2xl mx-auto md:mx-0 leading-relaxed mb-6">
            Crafting seamless user interfaces and engaging digital experiences using modern web technologies.
          </p>

          <div className="mt-4 sm:mt-8 flex justify-center md:justify-start gap-3 sm:gap-4">
            <a
              href="/MuhammadRizky-CV.pdf"
              download
              className="btn-liquid-clear text-xs sm:text-sm whitespace-nowrap"
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="btn-liquid-clear text-xs sm:text-sm whitespace-nowrap"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div data-aos="fade-left" data-aos-delay="500" className="flex justify-center md:justify-end items-center">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className=""
          >
            <Image
              src={HERO_IMG_SRC}
              alt="Rizky Jackbar"
              width={320}
              height={420}
              priority
              onClick={handleImageClick}
              className={`w-44 h-56 sm:w-60 sm:h-72 md:w-72 md:h-96 rounded-t-full rounded-b-full object-cover filter transition duration-700
                ${!isActive
                  ? "grayscale"
                  : isMobileOrTablet
                    ? isClicked
                      ? "grayscale-0 cursor-pointer"
                      : "grayscale cursor-pointer"
                    : isHovered
                      ? "grayscale-0"
                      : "grayscale hover:grayscale-0"
                }
              `}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
