"use client";

import { useEffect, useState } from "react";
import ProjectsHero from "../components/ProjectsHero";
// import TechLogosMarquee from "../components/TechLogosMarquee";
import ProjectsGrid from "../components/ProjectsGrid";

export default function ProjectsPage() {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [clickedImages, setClickedImages] = useState([false, false, false]);
    const [clickedIcons, setClickedIcons] = useState(new Array(16).fill(false));

    useEffect(() => {
        const handleResize = () => {
            setIsMobileOrTablet(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <ProjectsHero
                isMobileOrTablet={isMobileOrTablet}
                clickedImages={clickedImages}
                setClickedImages={setClickedImages}
            />

            {/* <TechLogosMarquee
                isMobileOrTablet={isMobileOrTablet}
                clickedIcons={clickedIcons}
                setClickedIcons={setClickedIcons}
            /> */}

            <ProjectsGrid isMobileOrTablet={isMobileOrTablet} />
        </div>
    );
}
