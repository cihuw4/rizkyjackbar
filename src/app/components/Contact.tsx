"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";

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
      className="flex flex-col-reverse md:flex-row items-center justify-center min-h-[75vh] md:min-h-screen px-5 sm:px-10 md:px-16 py-10 sm:py-20 bg-transparent"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
        {/* Right side: Image */}
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
          <h1
            data-aos="fade-right"
            data-aos-delay="200"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 relative inline-block text-gray-900"
          >
            Contact
            <span className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 -bottom-1.5 w-12 h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 rounded-full animate-pulse"></span>
          </h1>

          <p
            data-aos="fade-right"
            data-aos-delay="300"
            className="hidden sm:block text-sm sm:text-base md:text-lg text-gray-600 max-w-md mx-auto md:mx-0 mb-6 leading-relaxed"
          >
            Have a project in mind or just want to say hi? Feel free to get in touch!
          </p>

          <div
            className="flex flex-col items-center md:items-start gap-4 mt-2 sm:mt-0"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            {/* 3 Social Icons */}
            <div className="flex gap-3 sm:gap-4">
              {/* Email */}
              <a
                href="mailto:muhamadrizky62020@gmail.com?subject=Hello%20Rizky&body=Hi%20Rizky,%0A%0AI%20want%20to%20discuss%20a%20project%20with%20you."
                aria-label="Send email to Muhammad Rizky"
                className="btn-liquid-clear !p-0 w-12 h-12 flex items-center justify-center !rounded-full text-black hover:text-black transition"
              >
                <Mail className="w-5 h-5 text-black" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/muhammad-rizky-842606218/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="btn-liquid-clear !p-0 w-12 h-12 flex items-center justify-center !rounded-full text-black hover:text-black transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current text-black"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm13.5 11.27h-3v-5.5c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5v5.5h-3v-10h3v1.31c.756-1.096 2.16-1.81 3.5-1.81 2.481 0 4.5 2.019 4.5 4.5v6z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/cihuw4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="btn-liquid-clear !p-0 w-12 h-12 flex items-center justify-center !rounded-full text-black hover:text-black transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current text-black"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.238 1.839 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.523-.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873 1.232 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.813 1.104.813 2.222v3.293c0 .321.218.694.825.576 4.765-1.589 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            {/* Website Launches Badge */}
            <a
              href="https://websitelaunches.com/site/rizkyjackbar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Image
                src="https://websitelaunches.com/badge/rizkyjackbar.com.svg"
                alt="Established Online - Public launch record"
                width={255}
                height={55}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
