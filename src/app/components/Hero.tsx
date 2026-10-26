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
      className="flex flex-col-reverse md:flex-row items-center justify-center min-h-[85vh] md:min-h-screen px-6 sm:px-10 md:px-16 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:py-24"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left Side */}
        <div className="flex-1 text-center md:text-left">
          <h2
            data-aos="fade-right"
            data-aos-delay="100"
            className="text-xs sm:text-sm md:text-base font-semibold text-gray-500 mb-1 tracking-widest uppercase"
          >
            Muhammad Rizky
          </h2>
          <h1
            data-aos="fade-right"
            data-aos-delay="200"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 sm:mb-4 text-gray-900"
          >
            Frontend Developer
          </h1>
          
          <p
            data-aos="fade-right"
            data-aos-delay="300"
            className="hidden sm:block text-sm sm:text-base md:text-lg text-gray-600 max-w-md mx-auto md:mx-0 leading-relaxed mb-6"
          >
            Crafting seamless user interfaces and engaging digital experiences using modern web technologies.
          </p>

          <div
            data-aos="fade-right"
            data-aos-delay="400"
            className="mt-4 sm:mt-8 flex justify-center md:justify-start gap-3 sm:gap-4"
          >
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
        <div data-aos="fade-left" data-aos-delay="500" className="flex justify-center items-center">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className=""
          >
            <Image
              src={HERO_IMG_SRC}
              alt="Rizky Jackbar"
              width={400}
              height={400}
              priority
              onClick={handleImageClick}
              className={`w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover filter transition duration-700
                ${
                  !isActive
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
