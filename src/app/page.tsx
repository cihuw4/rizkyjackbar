"use client";

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

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
      <main className="bg-gray-100 min-h-screen text-gray-900 pt-16">
        <Sidebar />

        {/* Hero Section */}
        <section
          id="home"
          className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 md:px-16 gap-10 pt-5 sm:pt-10 md:-mt-30"
        >
          {/* Left Side */}
          <div className="flex-1 text-center md:text-left md:pl-10 lg:pl-20">
            <h2
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-lg sm:text-xl font-semibold text-gray-700 mb-2"
            >
              Hi, I'm Muhammad Rizky
            </h2>
            <h1
              data-aos="fade-right"
              data-aos-delay="200"
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            >
              Frontend Developer
            </h1>
            <p
              data-aos="fade-right"
              data-aos-delay="300"
              className="text-base sm:text-lg text-gray-600 max-w-md mx-auto md:mx-0"
            >
              Focused on JavaScript, Next.js, and Tailwind CSS. Passionate about
              building clean, interactive, and responsive UI/UX.
            </p>

            <div
              data-aos="fade-right"
              data-aos-delay="400"
              className="mt-8 flex justify-center md:justify-start gap-4"
            >
              <a
                href="/CV_Muhammad_Rizky.pdf"
                download
                className="px-6 py-3 rounded-lg bg-gray-900 text-gray-100 hover:bg-gray-700 transition-colors duration-300"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition-colors duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div
            data-aos="fade-left"
            data-aos-delay="500"
            className="flex justify-center md:justify-end md:pr-10 lg:pr-20"
          >
            <img
              src="/img/profile.JPG"
              alt="Rizky Jackbar"
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-full md:w-70 md:h-[380px] md:rounded-[9999px] object-cover shadow-lg max-w-full filter grayscale hover:grayscale-0 transition duration-500"
            />
          </div>
        </section>

        {/* About Me Section */}
        <section
          id="about"
          className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 md:px-16 py-16 sm:py-20 bg-white"
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div
              data-aos="fade-left"
              data-aos-delay="100"
              className="flex justify-center md:justify-end md:pr-10 lg:pr-20 order-1 md:order-2"
            >
              <img
                src="/img/profile.JPG"
                alt="About Me"
                className="w-100 h-100 sm:w-120 sm:h-120 md:w-80 md:h-[450px] rounded-lg object-cover shadow-lg filter grayscale hover:grayscale-0 transition duration-500"
              />
            </div>

            <div className="flex-1 text-left md:text-left md:pl-10 lg:pl-20 order-2 md:order-1">
              <h1
                data-aos="fade-right"
                data-aos-delay="200"
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative inline-block"
              >
                About Me
                <span className="absolute left-0 -bottom-2 w-16 h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 rounded-full animate-pulse"></span>
              </h1>

              <p
                data-aos="fade-right"
                data-aos-delay="300"
                className="text-gray-700 text-lg mb-8"
              >
                I am a Frontend Developer passionate about creating clean,
                responsive, and interactive UI/UX.
              </p>

              <Link
                data-aos="fade-right"
                data-aos-delay="400"
                href="/about"
                className="px-6 py-3 rounded-lg bg-gray-900 text-gray-100 hover:bg-gray-700 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 md:px-16 py-16 sm:py-20 bg-gray-100"
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div
              data-aos="fade-left"
              data-aos-delay="100"
              className="flex justify-center md:justify-end md:pr-10 lg:pr-20 order-1 md:order-2"
            >
              <img
                src="/img/profile.JPG"
                alt="My Projects"
                className="w-100 h-100 sm:w-120 sm:h-120 md:w-80 md:h-[450px] rounded-lg object-cover shadow-lg filter grayscale hover:grayscale-0 transition duration-500"
              />
            </div>

            <div className="flex-1 text-left md:text-left md:pl-10 lg:pl-20 order-2 md:order-1">
              <h1
                data-aos="fade-right"
                data-aos-delay="200"
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative inline-block"
              >
                My Projects
                <span className="absolute left-0 -bottom-2 w-16 h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 rounded-full animate-pulse"></span>
              </h1>

              <p
                data-aos="fade-right"
                data-aos-delay="300"
                className="text-gray-700 text-lg mb-8"
              >
                Explore some of the web applications and interfaces I have built
                with modern frontend technologies.
              </p>

              <Link
                data-aos="fade-right"
                data-aos-delay="400"
                href="/projects"
                className="px-6 py-3 rounded-lg bg-gray-900 text-gray-100 hover:bg-gray-700 transition"
              >
                View Projects
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 md:px-16 py-16 sm:py-20 bg-white"
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div
              data-aos="fade-left"
              data-aos-delay="100"
              className="flex justify-center md:justify-end md:pr-10 lg:pr-20 order-1 md:order-2"
            >
              <img
                src="/img/profile.JPG"
                alt="Contact Me"
                className="w-100 h-100 sm:w-120 sm:h-120 md:w-80 md:h-[450px] rounded-lg object-cover shadow-lg filter grayscale hover:grayscale-0 transition duration-500"
              />
            </div>

            <div className="flex-1 text-left md:text-left md:pl-10 lg:pl-20 order-2 md:order-1">
              <h1
                data-aos="fade-right"
                data-aos-delay="200"
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative inline-block"
              >
                Contact Me
                <span className="absolute left-0 -bottom-2 w-16 h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 rounded-full animate-pulse"></span>
              </h1>

              <p
                data-aos="fade-right"
                data-aos-delay="300"
                className="text-gray-700 text-lg mb-8"
              >
                Have a project in mind or just want to say hi? Feel free to get
                in touch!
              </p>

              <a
                data-aos="fade-right"
                data-aos-delay="400"
                href="#contact"
                className="px-6 py-3 rounded-lg bg-gray-900 text-gray-100 hover:bg-gray-700 transition"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
