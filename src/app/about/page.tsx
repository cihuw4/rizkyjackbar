"use client";

import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 px-6 sm:px-10 md:px-16 py-16 space-y-32">
            <AboutSection />
            <SkillsSection />
        </div>
    );
}
