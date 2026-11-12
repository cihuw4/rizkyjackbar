"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectsHero from "../components/ProjectsHero";
import ProjectsGrid from "../components/ProjectsGrid";
import TechLogosMarquee from "../components/TechLogosMarquee";
import Link from "next/link";
import { FolderArchive, Mail, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
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
    }, 300);

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
      {/* SECTION 1: HERO */}
      <section className="section section-1 z-10 bg-[#fbfbfb] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-black/5">
        <div className="section-content">
          <div className="section-inner w-full">
            <ProjectsHero
              isMobileOrTablet={isMobileOrTablet}
              clickedImages={clickedImages}
              setClickedImages={setClickedImages}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED PROJECTS (SCROLLABLE WITHIN) */}
      <section
        id="projects-grid"
        className="section section-2 section-scrollable z-20 bg-[#f4f5f7] shadow-[0_-10px_30px_rgba(0,0,0,0.04)] border-t border-black/5"
      >
        <div className="section-content">
          <div className="section-inner w-full">
            <ProjectsGrid isMobileOrTablet={isMobileOrTablet} />
          </div>
        </div>
      </section>

      {/* SECTION 3: TECH LOGOS MARQUEE */}
      <section className="section section-3 z-30 bg-[#fafafc] shadow-[0_-10px_30px_rgba(0,0,0,0.04)] border-t border-black/5">
        <div className="section-content">
          <div className="section-inner w-full px-6 py-10">
            <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Technologies & Tools
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 sm:mt-3 max-w-xl mx-auto">
                Modern frontend libraries, frameworks, and tools used to build
                responsive, performant, and reliable web applications.
              </p>
            </div>
            <TechLogosMarquee isMobileOrTablet={isMobileOrTablet} />
          </div>
        </div>
      </section>

      {/* SECTION 4: ARCHIVE CTA & CONTACT */}
      <section className="section section-4 z-40 bg-[#f0f2f5] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-t border-black/5">
        <div className="section-content">
          <div className="section-inner w-full px-6 py-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4">
              Looking for more projects?
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Explore the complete directory of past work, open-source
              components, UI experiments, and web applications built over the
              years.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link href="/archive">
                <button className="btn-liquid-clear px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <FolderArchive size={16} />
                  <span>View All Projects</span>
                  <ArrowRight size={14} />
                </button>
              </Link>
              <a href="mailto:rizkyjackbar@gmail.com">
                <button className="btn-liquid-clear px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <Mail size={16} />
                  <span>Let&apos;s Connect</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
