"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";

export default function Contact() {
    const [isClicked, setIsClicked] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

    useEffect(() => {
        function checkScreen() {
            setIsMobileOrTablet(window.innerWidth < 768);
        }
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    function handleImageClick() {
        if (isMobileOrTablet) {
            setIsClicked((prev) => !prev);
        }
    }

    return (
        <section
            id="contact"
            className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 md:px-16 py-16 sm:py-20 bg-white"
        >
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* Right side: Image */}
                <div
                    data-aos="fade-left"
                    data-aos-delay="100"
                    className="flex justify-center md:justify-end md:pr-10 lg:pr-20 order-1 md:order-2"
                >
                    <img
                        src="/img/home_contact.jpg"
                        alt="Contact Me"
                        onClick={handleImageClick}
                        className={`w-100 h-100 sm:w-120 sm:h-120 md:w-80 md:h-[450px] rounded-lg object-cover shadow-lg filter transition duration-500
                            ${isMobileOrTablet
                                ? isClicked
                                    ? "grayscale-0 cursor-pointer"
                                    : "grayscale cursor-pointer"
                                : "grayscale hover:grayscale-0"}
                        `}
                    />
                </div>

                {/* Left side: Text + icons */}
                <div className="flex-1 text-left md:text-left md:pl-10 lg:pl-20 order-2 md:order-1">
                    <h1
                        data-aos="fade-right"
                        data-aos-delay="200"
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative inline-block"
                    >
                        Contact
                        <span className="absolute left-0 -bottom-2 w-16 h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 rounded-full animate-pulse"></span>
                    </h1>

                    <p
                        data-aos="fade-right"
                        data-aos-delay="300"
                        className="text-base sm:text-lg text-gray-600 max-w-sm mx-auto md:mx-0 mb-8"
                    >
                        Have a project in mind or just want to say hi? Feel free to get in touch!
                    </p>

                    <div className="flex gap-4" data-aos="fade-right" data-aos-delay="400">
                        {/* Email */}
                        <a
                            href="mailto:muhamadrizky62020@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-500 transition"
                        >
                            <Mail className="w-6 h-6" />
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/muhammad-rizky-842606218/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-500 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm13.5 11.27h-3v-5.5c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5v5.5h-3v-10h3v1.31c.756-1.096 2.16-1.81 3.5-1.81 2.481 0 4.5 2.019 4.5 4.5v6z" />
                            </svg>
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/cihuw4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-500 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.238 1.839 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.84 1.232 1.911 1.232 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.813 1.104.813 2.222v3.293c0 .321.218.694.825.576 4.765-1.589 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
