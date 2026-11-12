"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SiLinkedin, SiGithub } from "react-icons/si";

const CONTACT_IMG_SRC = "/img/home_contact.webp";

interface ContactProps {
  onHoverImg?: (src: string | null) => void;
  isActive?: boolean;
}

export default function Contact({ onHoverImg, isActive }: ContactProps) {
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
      if (onHoverImg) onHoverImg(next ? CONTACT_IMG_SRC : null);
    }
  }

  function handleMouseEnter() {
    if (!isMobileOrTablet && onHoverImg) onHoverImg(CONTACT_IMG_SRC);
  }

  function handleMouseLeave() {
    if (!isMobileOrTablet && onHoverImg) onHoverImg(null);
  }

  return (
    <section
      id="contact"
      className="w-full flex items-center justify-center min-h-[75vh] md:min-h-screen py-10 sm:py-20 bg-transparent"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        {/* Right side: Image */}
        <div className="flex justify-center md:justify-end order-1 md:order-2 w-full md:w-auto">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className=""
          >
            <Image
              src={CONTACT_IMG_SRC}
              alt="Contact Me"
              onClick={handleImageClick}
              width={320}
              height={420}
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

        {/* Left side: Text + icons */}
        <div className="flex-1 text-center md:text-left order-2 md:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 relative inline-block text-gray-900">
            Contact
            <span className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 -bottom-1.5 w-12 h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 rounded-full animate-pulse"></span>
          </h1>

          <p className="hidden sm:block text-sm sm:text-base md:text-lg text-gray-600 max-w-xl lg:max-w-2xl mx-auto md:mx-0 mb-6 leading-relaxed">
            Have a project in mind or just want to say hi? Feel free to get in touch!
          </p>

          <div className="flex flex-col items-center md:items-start gap-4 mt-2 sm:mt-0">
            {/* 3 Social Icons */}
            <div className="flex gap-3 sm:gap-4">
              {/* Gmail / Email */}
              <a
                href="mailto:muhamadrizky62020@gmail.com?subject=Hello%20Rizky&body=Hi%20Rizky,%0A%0AI%20want%20to%20discuss%20a%20project%20with%20you."
                aria-label="Send email to Muhammad Rizky"
                className="group btn-liquid-clear !p-0 w-12 h-12 flex items-center justify-center !rounded-full transition duration-300 shadow-sm hover:shadow"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  viewBox="50 85 412 350"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Left Blue Flap */}
                  <path
                    d="M158 391v-142l-82-63V361q0 30 30 30"
                    fill="#4285F4"
                  />
                  {/* Red Center Fold */}
                  <path
                    d="M154 248l102 77l102-77v-98l-102 77l-102-77"
                    fill="#EA4335"
                  />
                  {/* Right Green Flap */}
                  <path
                    d="M354 391v-142l82-63V361q0 30-30 30"
                    fill="#34A853"
                  />
                  {/* Top-Left Dark Red Accent */}
                  <path
                    d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26"
                    fill="#C5221F"
                  />
                  {/* Top-Right Yellow Accent */}
                  <path
                    d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26"
                    fill="#FBBC04"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/muhammad-rizky-842606218/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="group btn-liquid-clear !p-0 w-12 h-12 flex items-center justify-center !rounded-full transition duration-300 shadow-sm hover:shadow"
              >
                <SiLinkedin className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform duration-300" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/cihuw4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="group btn-liquid-clear !p-0 w-12 h-12 flex items-center justify-center !rounded-full transition duration-300 shadow-sm hover:shadow"
              >
                <SiGithub className="w-5 h-5 text-[#24292F] group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
