"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

// Register Observer plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

export default function GsapSwipeSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverImgSrc, setHoverImgSrc] = useState<string | null>(null);
  // Keep the last active image url so when hover leaves, it fades out smoothly to base bg
  const [lastBgSrc, setLastBgSrc] = useState<string>("/assets/img/hero.png");

  const handleHoverImg = (src: string | null) => {
    if (src) setLastBgSrc(src);
    setHoverImgSrc(src);
  };

  const slides = [
    { id: "hero", label: "01 / HOME", Component: Hero },
    { id: "about", label: "02 / ABOUT", Component: About },
    { id: "projects", label: "03 / PROJECTS", Component: Projects },
    { id: "contact", label: "04 / CONTACT", Component: Contact },
  ];

  useEffect(() => {
    // Reset blurred bg on slide change
    setHoverImgSrc(null);
  }, [activeIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".gsap-slider-section");
      const images = gsap.utils.toArray<HTMLElement>(".slider-bg");
      const outerWrappers = gsap.utils.toArray<HTMLElement>(".slider-outer");
      const innerWrappers = gsap.utils.toArray<HTMLElement>(".slider-inner");

      if (!sections.length) return;

      let currentIndex = -1;
      const wrap = gsap.utils.wrap(0, sections.length);
      let animating = false;

      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });

      function gotoSection(index: number, direction: number) {
        index = wrap(index);
        animating = true;
        setActiveIndex(index);

        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;

        const tl = gsap.timeline({
          defaults: { duration: 1.25, ease: "power1.inOut" },
          onComplete: () => {
            animating = false;
          },
        });

        if (currentIndex >= 0 && sections[currentIndex]) {
          // The outgoing section stays visible and sits under incoming section
          gsap.set(sections[currentIndex], { zIndex: 0 });
          tl.to(images[currentIndex], { yPercent: -15 * dFactor }, 0)
            .set(sections[currentIndex], { autoAlpha: 0 });
        }

        // Incoming section sits on top with zIndex 1
        gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

        tl.fromTo(
          [outerWrappers[index], innerWrappers[index]],
          {
            yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
          },
          {
            yPercent: 0,
          },
          0
        ).fromTo(
          images[index],
          { yPercent: 15 * dFactor },
          { yPercent: 0 },
          0
        );

        currentIndex = index;
      }

      // Create Observer for wheel, touch, pointer
      const observer = Observer.create({
        target: containerRef.current || window,
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onDown: () => !animating && gotoSection(currentIndex - 1, -1),
        onUp: () => !animating && gotoSection(currentIndex + 1, 1),
        tolerance: 15,
        preventDefault: true,
      });

      // Initial slide entrance
      gotoSection(0, 1);

      return () => {
        observer.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="gsap-swipe-slider">

      {/* Dot indicators / Slide pagination */}
      <div className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`transition-all duration-300 rounded-full ${activeIndex === idx
                ? "w-2.5 h-7 bg-gray-900 shadow-md"
                : "w-2.5 h-2.5 bg-gray-400/50 hover:bg-gray-600"
              }`}
          />
        ))}
      </div>

      {/* Slide number counter indicator in bottom-left */}
      <div className="fixed bottom-6 left-6 sm:left-10 z-40 text-xs font-mono tracking-widest text-gray-400">
        <span className="text-gray-900 font-bold">
          0{activeIndex + 1}
        </span>{" "}
        / 0{slides.length}
      </div>

      {/* Sections structure required by the GSAP swipe slider algorithm */}
      {slides.map(({ id, Component }, index) => (
        <section key={id} className={`gsap-slider-section slide-${index}`}>
          <div className="slider-outer">
            <div className="slider-inner">
              <div className="slider-bg">
                {/*
                  Blurred image background layer — Skylrk-style:
                  The hovered image fills the bg, blurred heavily + white overlay
                  so it reads as a subtle color wash instead of a visible photo.
                */}
                <div
                  className={`ambient-blur-bg ${hoverImgSrc ? "active" : ""}`}
                  style={{
                    backgroundImage: `url(${hoverImgSrc || lastBgSrc})`,
                  }}
                />
                <div className="w-full h-full flex items-center justify-center overflow-y-auto px-4 z-10 relative">
                  <Component
                    onHoverImg={handleHoverImg}
                    isActive={activeIndex === index}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
