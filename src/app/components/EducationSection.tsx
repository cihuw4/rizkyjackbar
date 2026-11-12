"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import achievementsData from "../../data/achievementsData";
import { ChevronDown, ExternalLink, Download } from "lucide-react";

export default function EducationSection() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [autoActiveIndex, setAutoActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkScreenWidth = () =>
      setIsMobileOrTablet(window.innerWidth < 1024);
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  useEffect(() => {
    if (!isMobileOrTablet) {
      setAutoActiveIndex(-1);
      return;
    }
    const interval = setInterval(() => {
      setAutoActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobileOrTablet]);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="education"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10"
      style={{ overflowAnchor: "none" }}
    >
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-gray-900 tracking-tight">
          Education & Achievements
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Learn more about my educational background and accomplishments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start w-full">
        {/* Left - Campus (Sticky on desktop so it stays completely stationary) */}
        <div className="flex flex-col items-start text-left lg:sticky lg:top-4 self-start w-full">
          <div className="inline-flex items-center text-xs sm:text-sm font-semibold rounded-full px-3.5 py-1 mb-2.5 bg-gray-100 text-gray-600 border border-black/5 shadow-sm">
            2021 - 2025
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Amikom Yogyakarta University
          </h3>
          <p className="text-base sm:text-lg font-medium text-gray-700 mt-1">
            Bachelor of Informatics | Computer Science
          </p>

          <div className="flex flex-row gap-2 group w-full justify-center mt-5">
            {[0, 1, 2].map((idx) => {
              const isDesktop = !isMobileOrTablet;
              const hovered = hoverIndex !== null;

              let widthClass = "w-1/3";
              const style: React.CSSProperties = {
                transition: "width 0.3s ease",
                overflow: "hidden",
                position: "relative",
              };

              if (isDesktop) {
                if (!hovered) {
                  widthClass = "w-1/3";
                } else {
                  if (hoverIndex === idx) {
                    widthClass = "w-1/2";
                    style.zIndex = 10;
                  } else {
                    widthClass = "w-1/4";
                    style.zIndex = 0;
                  }
                }
              } else {
                const isActive = autoActiveIndex === idx;
                widthClass = isActive ? "w-1/2" : "w-1/4";
              }

              let transformOrigin = "center";
              if (idx === 0) transformOrigin = "left";
              else if (idx === 2) transformOrigin = "right";

              return (
                <div
                  key={idx}
                  onMouseEnter={() => isDesktop && setHoverIndex(idx)}
                  onMouseLeave={() => isDesktop && setHoverIndex(null)}
                  className={`relative h-52 sm:h-60 rounded-xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer ${widthClass}`}
                  style={{ ...style, transformOrigin }}
                >
                  <Image
                    src={`/img/campus${idx + 1}.webp`}
                    alt={`Campus ${idx + 1}`}
                    fill
                    className={`object-cover transition duration-300 filter ${
                      isDesktop
                        ? hoverIndex === idx
                          ? "grayscale-0"
                          : "grayscale"
                        : autoActiveIndex === idx
                          ? "grayscale-0"
                          : "grayscale"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Description Text without dots or card background */}
          <div className="w-full mt-5 space-y-2.5 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
            <p>
              I pursued my undergraduate studies in Informatics at Universitas
              Amikom Yogyakarta.
            </p>
            <p>
              Beyond theoretical learning, I was also actively involved in
              practical projects.
            </p>
            <p>
              My academic journey helped me develop strong problem-solving
              skills.
            </p>
          </div>
        </div>

        {/* Right - Achievements */}
        <div className="flex flex-col w-full">
          <h3 className="text-2xl font-semibold text-gray-900">Achievements</h3>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Some of my achievements during my study.
          </p>

          <ul className="space-y-3 mt-4 max-h-[540px] lg:max-h-[580px] overflow-y-auto pr-1.5 custom-scrollbar">
            {achievementsData.map(({ icon, title, desc, pdf }, i) => {
              const isOpen = openIndex === i;

              return (
                <li
                  key={i}
                  className={`bg-white rounded-xl overflow-hidden transition-all duration-300 border ${
                    isOpen
                      ? "border-gray-900/20 shadow-md ring-1 ring-gray-900/10"
                      : "border-black/5 shadow-sm hover:shadow"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown(i)}
                    className="w-full flex justify-between items-center p-3.5 sm:p-4 text-left group cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`inline-flex items-center justify-center rounded-xl p-2.5 sm:p-3 transition-colors duration-300 ${
                          isOpen
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-900"
                        }`}
                      >
                        {React.cloneElement(icon, {
                          className: "w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300",
                        })}
                      </div>

                      <div className="flex flex-col flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                          {title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                          {desc}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ml-3 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-gray-900" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Dropdown PDF - Clean Accordion with smooth overflow clipping */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.25, delay: 0.05 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.15 },
                          },
                        }}
                        className="overflow-hidden border-t border-gray-100 bg-gray-50/70"
                      >
                        <div className="p-3 sm:p-4">
                          <div className="w-full h-[260px] sm:h-[320px] bg-white rounded-lg border border-gray-200 overflow-hidden shadow-inner relative">
                            <iframe
                              src={pdf}
                              className="w-full h-full border-0"
                              title={`PDF - ${title}`}
                            />
                          </div>

                          <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5">
                            <a
                              href={pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-200 px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-gray-50 transition"
                            >
                              <ExternalLink size={14} />
                              <span>View Fullscreen</span>
                            </a>

                            <a
                              href={pdf}
                              download
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 px-4 py-1.5 rounded-lg shadow-sm transition"
                            >
                              <Download size={14} />
                              <span>Download Certificate</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
