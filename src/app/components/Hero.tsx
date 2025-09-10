"use client";

import { useState } from "react";

export default function Hero() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <section
                id="home"
                className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 md:px-16 py-16 sm:py-20"
            >
                <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 sm:px-10 md:px-16">
                    {/* Left Side */}
                    <div className="flex-1 text-center md:text-left">
                        <h2
                            data-aos="fade-right"
                            data-aos-delay="100"
                            className="text-lg sm:text-xl font-semibold text-gray-700 mb-2"
                        >
                            Muhammad Rizky
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
                            className="text-base sm:text-lg text-gray-600 max-w-sm mx-auto md:mx-0"
                        >
                            As a Frontend Developer dedicated to crafting seamless user
                            interfaces and engaging digital experiences using modern web
                            technologies.
                        </p>

                        <div
                            data-aos="fade-right"
                            data-aos-delay="400"
                            className="mt-8 flex justify-center md:justify-start gap-4"
                        >
                            {/* Open Modal on Click */}
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-6 py-3 rounded-lg bg-gray-900 text-gray-100 hover:bg-gray-700 transition-colors duration-300"
                            >
                                Preview CV
                            </button>
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
                        className="flex justify-center md:justify-end"
                    >
                        <img
                            src="/img/profile.JPG"
                            alt="Rizky Jackbar"
                            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full md:w-70 md:h-[380px] object-cover shadow-lg max-w-full filter grayscale hover:grayscale-0 transition duration-500"
                        />
                    </div>
                </div>
            </section>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-hidden relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-6 text-red-500 hover:text-red-700 text-2xl font-bold"
                        >
                            &times;
                        </button>


                        <h2 className="text-xl font-bold mb-4">CV Preview</h2>

                        {/* PDF Preview */}
                        <div className="w-full h-[70vh] overflow-y-auto rounded border mb-6">
                            <iframe
                                src="/Muhammad_Rizky.pdf"
                                title="CV Preview"
                                className="w-full h-full"
                            ></iframe>
                        </div>

                        {/* Download Button */}
                        <div className="flex justify-end mb-6">
                            <a
                                href="/Muhammad_Rizky.pdf"
                                download
                                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                            >
                                Download CV
                            </a>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
