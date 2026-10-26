"use client";

import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import QueteSection from "../components/QuoteSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-skylrk-clean text-gray-900 pt-28 sm:pt-32 md:pt-36 pb-20 px-6 sm:px-10 md:px-16 space-y-24 sm:space-y-32">
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <QueteSection />
    </div>
  );
}
