"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import QuoteSection from "../components/QuoteSection";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function AboutPage() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [clickedImages, setClickedImages] = useState([false, false, false]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".section");
      if (panels.length <= 1) return;

      // Pop the last panel so it doesn't get pinned or fade out
      const animatedPanels = panels.slice(0, -1);

      animatedPanels.forEach((panel) => {
        // Element holding the content inside the panel
        const innerpanel = panel.querySelector<HTMLElement>(".section-inner");
        if (!innerpanel) return;

        // Height of the content inside the panel
        const panelHeight = innerpanel.offsetHeight;

        // Height of the viewport available inside the panel
        const viewportHeight = panel.offsetHeight || window.innerHeight;

        const difference = panelHeight - viewportHeight;

        // ratio (between 0 and 1) representing the portion of the overall animation for fake-scrolling
        const fakeScrollRatio =
          difference > 0 ? difference / (difference + viewportHeight) : 0;

        // if fake scroll needed, add appropriate margin to bottom so next panel arrives at the proper time
        if (fakeScrollRatio) {
          panel.style.marginBottom = `${panelHeight * fakeScrollRatio}px`;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () =>
              fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : "bottom top",
            pinSpacing: false,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // fake scroll if inner content is taller than viewport
        if (fakeScrollRatio) {
          tl.to(innerpanel, {
            yPercent: -100,
            y: viewportHeight,
            duration: 1 / (1 - fakeScrollRatio) - 1,
            ease: "none",
          });
        }

        // scale down & fade out as next slide stacks on top
        tl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 0.7, opacity: 0.5, duration: 0.9 }
        ).to(panel, { opacity: 0, duration: 0.1 });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    // Refresh again after initial render & assets settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="slides-wrapper relative w-full bg-skylrk-clean text-gray-900 overflow-x-hidden"
    >
      {/* SECTION 1: WHO I AM (PROFILE HERO) */}
      <section className="section section-1 z-10 bg-[#fbfbfb] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-black/5">
        <div className="section-content">
          <div className="section-inner w-full">
            <AboutSection
              isMobileOrTablet={isMobileOrTablet}
              clickedImages={clickedImages}
              setClickedImages={setClickedImages}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: SKILLS & EXPERTISE (SCROLLABLE WITHIN) */}
      <section className="section section-2 section-scrollable z-20 bg-[#f4f5f7] shadow-[0_-10px_30px_rgba(0,0,0,0.04)] border-t border-black/5">
        <div className="section-content">
          <div className="section-inner w-full">
            <SkillsSection />
          </div>
        </div>
      </section>

      {/* SECTION 3: PROFESSIONAL EXPERIENCE (SCROLLABLE WITHIN) */}
      <section className="section section-3 section-scrollable z-30 bg-[#fafafc] shadow-[0_-10px_30px_rgba(0,0,0,0.04)] border-t border-black/5">
        <div className="section-content">
          <div className="section-inner w-full">
            <ExperienceSection />
          </div>
        </div>
      </section>

      {/* SECTION 4: EDUCATION & ACHIEVEMENTS (SCROLLABLE WITHIN) */}
      <section className="section section-4 section-scrollable z-40 bg-[#f2f4f7] shadow-[0_-10px_30px_rgba(0,0,0,0.04)] border-t border-black/5">
        <div className="section-content">
          <div className="section-inner w-full">
            <EducationSection />
          </div>
        </div>
      </section>

      {/* SECTION 5: PHILOSOPHY QUOTE & CTA */}
      <section className="section section-5 z-50 bg-[#eef1f5] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-t border-black/5">
        <div className="section-content">
          <div className="section-inner w-full px-6 py-16 text-center max-w-4xl mx-auto flex flex-col justify-center items-center">
            <QuoteSection />

            <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link href="/projects">
                <button className="btn-liquid-clear px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <span>Explore Projects</span>
                  <ArrowRight size={14} />
                </button>
              </Link>
              <a href="mailto:rizkyjackbar@gmail.com">
                <button className="btn-liquid-clear px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <Mail size={16} />
                  <span>Get in Touch</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
