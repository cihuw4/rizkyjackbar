"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [isClicked, setIsClicked] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

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
      setIsClicked((prev) => !prev);
    }
  }

  return (
    <section
      id="home"
      className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 md:px-16 py-16 sm:py-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 sm:px-10 md:px-16">
        {/* Left Side */}
        <div className="flex-1 text-center md:text-left">
          <h2
            data-aos="fade-right"
            data-aos-delay="100"
            className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
            Muhammad Rizky
          </h2>
          <h1
            data-aos="fade-right"
            data-aos-delay="200"
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Frontend Developer
          </h1>
          <p
            data-aos="fade-right"
            data-aos-delay="300"
            className="text-base sm:text-lg text-gray-600 max-w-sm mx-auto md:mx-0">
            As a Frontend Developer dedicated to crafting seamless user
            interfaces and engaging digital experiences using modern web
            technologies.
          </p>

          <div
            data-aos="fade-right"
            data-aos-delay="400"
            className="mt-8 flex justify-center md:justify-start gap-4">
            <a
              href="/Muhammad_Rizky.pdf"
              download
              className="px-6 py-3 rounded-lg bg-gray-900 text-gray-100 hover:bg-gray-600 transition-colors duration-300">
              Download CV
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-900 transition-colors duration-300">
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div
          data-aos="fade-left"
          data-aos-delay="500"
          className="flex justify-center md:justify-end">
          <img
            src="/img/home_hero.jpg"
            alt="Rizky Jackbar"
            onClick={handleImageClick}
            className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full md:w-70 md:h-[380px] object-cover shadow-lg max-w-full filter transition duration-500
                            ${
                              isMobileOrTablet
                                ? isClicked
                                  ? "grayscale-0 cursor-pointer"
                                  : "grayscale cursor-pointer"
                                : "grayscale hover:grayscale-0"
                            }
                        `}
          />
        </div>
      </div>
    </section>
  );
}
