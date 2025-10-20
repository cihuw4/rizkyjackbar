"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from "@mui/lab";
import { Typography, useMediaQuery } from "@mui/material";
import { FaBriefcase } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";

interface ExperienceItem {
    title: string;
    company: string;
    description: string;
    dateInfo: string;
    logo: string;
}

const experiences: ExperienceItem[] = [
    {
        title: "Frontend Developer",
        company: "Trans Retail Indonesia",
        description: "Developed and Maintained website",
        dateInfo: "Oct 2025 | Present | Jakarta",
        logo: "/transmart_logo.webp",
    },
    {
        title: "Frontend Developer Intern",
        company: "Coding Collective Indonesia",
        description:
            "Developed and maintained web applications using React, Next.js, and WordPress, focusing on responsive design and seamless user experience.",
        dateInfo: "May 2025 | August 2025 | Yogyakarta",
        logo: "/codingcollective_logo.webp",
    },
    {
        title: "Frontend Web Developer",
        company: "Tokonesia",
        description:
            "Built and customized WordPress-based websites, ensuring optimal performance, clean UI, and cross-device compatibility.",
        dateInfo: "Jun 2023 | Dec 2023 | Remote (Based in China)",
        logo: "/tokonesia_id_logo.webp",
    },
    {
        title: "Teaching Assistant for Practicum",
        company: "Amikom Yogyakarta University",
        description:
            "Assisted students in mastering Linux operating systems, providing technical guidance during lab sessions and grading assignments.",
        dateInfo: "Februari - Juli 2023 | Amikom Campus",
        logo: "/amikom_logo.webp",
    },
];

export default function ExperienceSection() {
    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-out",
            once: false,
        });
        AOS.refresh();
    }, []);

    return (
        <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 relative">
            <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12"
                data-aos="fade-up"
            >
                Professional Experience
            </h2>

            <Timeline
                position={isMobileOrTablet ? "right" : "alternate"}
                sx={{
                    "& .MuiTimelineItem-root": {
                        "&:before": { flex: 0, padding: 0 },
                    },
                }}
            >
                {experiences.map((exp, idx) => (
                    <TimelineItem key={idx}>
                        {!isMobileOrTablet && (
                            <TimelineOppositeContent className="hidden md:flex">
                                <Typography color="textSecondary"></Typography>
                            </TimelineOppositeContent>
                        )}

                        <TimelineSeparator
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                            }}
                        >
                            <TimelineDot
                                sx={{
                                    bgcolor: "gray.500",
                                    color: "gray.700",
                                }}
                                data-aos="zoom-in"
                                data-aos-duration="600"
                                data-aos-once="false"
                            >
                                <FaBriefcase />
                            </TimelineDot>

                            {/* Connector */}
                            <TimelineConnector
                                sx={{ flexGrow: 1, mt: 0, bgcolor: "gray.400" }}
                                data-aos="fade-up"
                                data-aos-duration="600"
                                data-aos-once="false"
                            />
                            {idx === experiences.length - 1 && (
                                <TimelineDot
                                    sx={{
                                        width: 0,
                                        height: 0,
                                        p: 0,
                                        m: 0,
                                        bgcolor: "transparent",
                                    }}
                                />
                            )}
                        </TimelineSeparator>

                        <TimelineContent>
                            <div className="flex flex-col">
                                {/* Small date card */}
                                <div
                                    className={`bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-gray-900 rounded-xl p-2 px-4 mb-2 w-fit ${
                                        !isMobileOrTablet && idx % 2 === 1 ? "ml-auto" : ""
                                    } shadow`}
                                    data-aos="fade-right"
                                    data-aos-duration="600"
                                    data-aos-once="false"
                                >
                                    {exp.dateInfo}
                                </div>

                                {/* Main card */}
                                <div
                                    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition text-left"
                                    data-aos="fade-left"
                                    data-aos-duration="600"
                                    data-aos-once="false"
                                >
                                    <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>

                                    {/* Company logo + name */}
                                    <div className="text-gray-500 mb-1 flex items-center gap-2">
                                        <img
                                            src={exp.logo}
                                            alt={`${exp.company} logo`}
                                            className="w-5 h-5 object-contain"
                                        />
                                        <span>{exp.company}</span>
                                    </div>

                                    <p className="text-gray-700">{exp.description}</p>
                                </div>
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </section>
    );
}
