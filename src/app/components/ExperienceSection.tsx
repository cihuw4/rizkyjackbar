"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaBriefcase } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ExperienceItem {
  title: string;
  company: string;
  description: string;
  dateInfo: string;
  logo: string;
}

// Chronological order: Oldest (first experience) at the top, Newest (current role) at the bottom
const experiences: ExperienceItem[] = [
  {
    title: "Teaching & Educational Service",
    company: "Darul Ma'arif Boarding School",
    description:
      "Completed a one-year teaching assignment as part of Gontor's graduation requirements, contributing to student education and supporting daily learning activities.",
    dateInfo: "2020 - 2021 | Indramayu",
    logo: "/img/logo_dm.png",
  },
  {
    title: "Teaching Assistant for Practicum",
    company: "Amikom Yogyakarta University",
    description:
      "Assisted students in mastering Linux operating systems, providing technical guidance during lab sessions and grading assignments.",
    dateInfo: "Februari - Juli 2023 | Amikom Campus",
    logo: "/img/amikom_logo.webp",
  },
  {
    title: "Frontend Developer Intern",
    company: "Coding Collective Indonesia",
    description:
      "Developed and maintained web applications using React, Next.js, and WordPress, focusing on responsive design and seamless user experience.",
    dateInfo: "May - August 2025 | Yogyakarta",
    logo: "/img/codingcollective_logo.webp",
  },
  {
    title: "Frontend Developer",
    company: "Trans Retail Indonesia",
    description:
      "Developed and maintained internal web applications used by multiple departments to support daily business operations.",
    dateInfo: "Oct 2025 - Apr 2026 | Jakarta",
    logo: "/img/transretail.png",
  },
  {
    title: "Junior Web Developer & RND",
    company: "Joindo Eka Handal",
    description:
      "Developed and maintained web applications, integrated front-end systems with databases and APIs, and handled testing, debugging, performance optimization, and site maintenance.",
    dateInfo: "Sep 2026 - Present | Jakarta",
    logo: "/img/pt_joindo_eka_handal_logo.jpeg",
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeItems, setActiveItems] = useState<boolean[]>(
    new Array(experiences.length).fill(false)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const section = container.closest<HTMLElement>(".section");
    const inner = container.closest<HTMLElement>(".section-inner");

    const ctx = gsap.context(() => {
      const triggerElement = section || container;
      const endScroll =
        section && inner
          ? `+=${inner.offsetHeight - (section.offsetHeight || window.innerHeight)}`
          : "bottom center";

      // Third-party GSAP ScrollTrigger animating the tracing beam
      gsap.fromTo(
        beamRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: triggerElement,
            start: section ? "bottom bottom" : "top center",
            end: () => endScroll,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const line = lineRef.current;
              if (!line) return;
              const lineRect = line.getBoundingClientRect();
              const beamTipY = lineRect.top + lineRect.height * self.progress;
              const isSectionActive = self.isActive || self.progress > 0;

              const newActive = iconRefs.current.map((icon, idx) => {
                if (!icon || !isSectionActive) return false;
                // First icon activates when inside the section (starting milestone)
                if (idx === 0) {
                  return self.progress >= 0;
                }
                const iconRect = icon.getBoundingClientRect();
                // Milestone icon lights up exactly when the tip of the beam reaches it,
                // and turns off immediately when the beam retreats back above it.
                return beamTipY >= iconRect.top + 2;
              });

              setActiveItems((prev) => {
                const hasChanged = newActive.some((val, i) => val !== prev[i]);
                return hasChanged ? newActive : prev;
              });
            },
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 relative"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-16 text-gray-900 tracking-tight">
        Professional Experience
      </h2>

      {/* Main Timeline Wrapper */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Background Base Line (Gray) */}
        <div
          ref={lineRef}
          className="absolute left-6 md:left-1/2 -translate-x-1/2 top-2 sm:top-4 md:top-6 bottom-6 sm:bottom-8 w-[2px] bg-gray-200 rounded-full overflow-hidden"
        >
          {/* Active Beam (Grows on scroll, driven by GSAP ScrollTrigger) */}
          <div
            ref={beamRef}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-full"
            style={{ height: "0%" }}
          />
        </div>

        {/* Timeline Items List */}
        <div className="space-y-10 sm:space-y-12">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            const isActive = activeItems[idx];

            return (
              <div
                key={idx}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className="relative flex items-start md:items-center w-full"
              >
                {/* Milestone Briefcase Icon (Lights up cleanly as beam reaches it) */}
                <div
                  ref={(el) => {
                    iconRefs.current[idx] = el;
                  }}
                  className={`absolute left-6 md:left-1/2 -translate-x-1/2 top-1 md:top-1/2 md:-translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-gray-900 text-white border-2 border-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] scale-105 ring-2 ring-gray-900/10"
                      : "bg-white text-gray-400 border border-gray-200 shadow-sm"
                  }`}
                >
                  <FaBriefcase
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
                      isActive ? "scale-105" : "scale-95"
                    }`}
                  />
                </div>

                {/* Content Layout: Alternating on Desktop, Left-aligned on Mobile */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-14 pl-16 md:pl-0">
                  {/* Left Column (Content if isLeft, Spacer on Desktop if !isLeft) */}
                  <div
                    className={`${
                      isLeft ? "md:text-right" : "hidden md:block"
                    }`}
                  >
                    {isLeft && (
                      <div className="flex flex-col md:items-end">
                        {/* Date Pill */}
                        <div
                          className={`inline-flex items-center text-xs sm:text-sm font-semibold rounded-full px-3.5 py-1 mb-2.5 transition-all duration-300 shadow-sm ${
                            isActive
                              ? "bg-gray-900 text-white border border-gray-800"
                              : "bg-gray-100 text-gray-600 border border-black/5"
                          }`}
                        >
                          {exp.dateInfo}
                        </div>

                        {/* Card Box */}
                        <div
                          className={`w-full max-w-lg rounded-2xl p-5 sm:p-6 text-left transition-all duration-300 ${
                            isActive
                              ? "bg-white border border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                              : "bg-white/80 backdrop-blur-sm border border-black/5 shadow-sm"
                          }`}
                        >
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                            {exp.title}
                          </h3>

                          {/* Company Name & Logo */}
                          <div className="text-gray-500 mb-2 flex items-center gap-2 text-xs sm:text-sm font-medium">
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              width={20}
                              height={20}
                              className="object-contain rounded-sm"
                            />
                            <span>{exp.company}</span>
                          </div>

                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column (Content if !isLeft, Spacer on Desktop if isLeft) */}
                  <div
                    className={`${
                      !isLeft ? "md:text-left" : "hidden md:block"
                    }`}
                  >
                    {!isLeft && (
                      <div className="flex flex-col md:items-start">
                        {/* Date Pill */}
                        <div
                          className={`inline-flex items-center text-xs sm:text-sm font-semibold rounded-full px-3.5 py-1 mb-2.5 transition-all duration-300 shadow-sm ${
                            isActive
                              ? "bg-gray-900 text-white border border-gray-800"
                              : "bg-gray-100 text-gray-600 border border-black/5"
                          }`}
                        >
                          {exp.dateInfo}
                        </div>

                        {/* Card Box */}
                        <div
                          className={`w-full max-w-lg rounded-2xl p-5 sm:p-6 text-left transition-all duration-300 ${
                            isActive
                              ? "bg-white border border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                              : "bg-white/80 backdrop-blur-sm border border-black/5 shadow-sm"
                          }`}
                        >
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                            {exp.title}
                          </h3>

                          {/* Company Name & Logo */}
                          <div className="text-gray-500 mb-2 flex items-center gap-2 text-xs sm:text-sm font-medium">
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              width={20}
                              height={20}
                              className="object-contain rounded-sm"
                            />
                            <span>{exp.company}</span>
                          </div>

                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
