"use client";

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen text-gray-900 -mt-8">
        <Sidebar />
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
