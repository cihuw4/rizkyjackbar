import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaVuejs, FaSass } from "react-icons/fa";
import { SiWordpress, SiPython, SiTailwindcss, SiNextdotjs, SiTypescript, SiVite, SiStreamlit, SiGooglecloud } from "react-icons/si";

export const projects = [
    {
        id: 1,
        name: "AxiomPay",
        category: "Web Development",
        desc: "Internship project: A web-based payment platform developed for a client in the Philippines.",
        img: "/img/axiompay.jpg",
        web: "https://axiompay.io",
        tech: [
            { icon: <FaReact />, color: "#61DBFB" },
            { icon: <SiTypescript />, color: "#3178C6" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
            { icon: <SiTailwindcss />, color: "#38BDF8" },
            { icon: <SiNextdotjs />, color: "#000000" },
        ],
    },
    {
        id: 2,
        name: "Swift-X",
        category: "Web Development",
        desc: "Internship project",
        img: "/img/swiftx.jpg",
        web: "https://swift-x.co/",
        tech: [
            { icon: <FaReact />, color: "#61DBFB" },
            { icon: <SiTypescript />, color: "#3178C6" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
            { icon: <SiTailwindcss />, color: "#38BDF8" },
            { icon: <SiNextdotjs />, color: "#000000" },
        ],
    },
    {
        id: 3,
        name: "8Bacus",
        category: "Web Development",
        desc: "Internship project",
        img: "/img/8bacus.jpg",
        web: "https://8bacuscorp.com/en",
        tech: [
            { icon: <FaReact />, color: "#61DBFB" },
            { icon: <SiTypescript />, color: "#3178C6" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
            { icon: <SiTailwindcss />, color: "#38BDF8" },
            { icon: <SiNextdotjs />, color: "#000000" },
        ],
    },
    {
        id: 4,
        name: "Face Republic",
        category: "Web Development",
        desc: "Internship project",
        img: "/img/facerepublic.jpg",
        web: "https://facerepublic.ae/",
        tech: [
            { icon: <FaReact />, color: "#61DBFB" },
            { icon: <SiTypescript />, color: "#3178C6" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
            { icon: <SiTailwindcss />, color: "#38BDF8" },
            { icon: <SiNextdotjs />, color: "#000000" },
        ],
    },
    {
        id: 5,
        name: "PayBo",
        category: "Web Development",
        desc: "Internship project",
        img: "/img/paybo.jpg",
        web: "https://paybo.io/",
        tech: [
            { icon: <FaReact />, color: "#61DBFB" },
            { icon: <SiTypescript />, color: "#3178C6" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
            { icon: <SiTailwindcss />, color: "#38BDF8" },
            { icon: <SiNextdotjs />, color: "#000000" },
        ],
    },
    {
        id: 6,
        name: "Dev Academy",
        category: "Web Development",
        desc: "An online learning platform designed for managing and attending online classes.",
        img: "/img/devacademy.jpg",
        github: "https://github.com/cihuw4/fe_binar_final_project.git",
        web: "https://devacademy.vercel.app",
        tech: [
            { icon: <FaReact />, color: "#61DBFB" },
            { icon: <SiTailwindcss />, color: "#38BDF8" },
            { icon: <SiVite />, color: "#646CFF" },
            { icon: <FaJsSquare />, color: "#F7DF1E" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
        ],
    },
    {
        id: 7,
        name: "StressByJB",
        category: "Data Science",
        desc: "Final year project: A stress-level prediction system for students and learners, built using Python and Streamlit, deployed on Google Cloud.",
        img: "/img/stressbyjb.jpg",
        github: "https://github.com/cihuw4/stressapp.git",
        web: "https://stressbyjb.streamlit.app",
        tech: [
            { icon: <SiPython />, color: "#3776AB" },
            { icon: <SiStreamlit />, color: "#FF4B3E" },
            {
                icon: (
                    <div
                        style={{
                            background: "linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)",
                            borderRadius: "50%",
                            padding: "6px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <SiGooglecloud color="white" className="w-6 h-6" />
                    </div>
                ),
                color: "multi",
            },
            { icon: <SiTailwindcss />, color: "#38BDF8" },
        ],
    },
    {
        id: 8,
        name: "Furniro",
        category: "Web Development",
        desc: "Personal project: An e-commerce platform for purchasing home furniture online.",
        img: "/img/furniro.jpg",
        github: "https://github.com/cihuw4/furniro.git",
        web: "https://furnirowebapp.vercel.app/",
        tech: [
            { icon: <FaReact />, color: "#61DBFB" },
            { icon: <SiTailwindcss />, color: "#38BDF8" },
            { icon: <SiNextdotjs />, color: "#000000" },
        ],
    },
    {
        id: 9,
        name: "HouseDimsum",
        category: "Web Development",
        desc: "A project for a friend's business: A website for a dimsum restaurant, including menu, online ordering, and reservation features.",
        img: "https://via.placeholder.com/400x225",
        github: "https://github.com/cihuw4/housedimsum.git",
        web: "https://housedimsum.vercel.app",
        tech: [
            { icon: <FaHtml5 />, color: "#E34C26" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
            { icon: <FaJsSquare />, color: "#F7DF1E" },
        ],
    },
    {
        id: 10,
        name: "Diopark",
        category: "Web Development",
        desc: "University project: A web system for managing parking, developed as part of coursework.",
        img: "https://via.placeholder.com/400x225",
        github: "https://github.com/cihuw4/userDiopark.git",
        tech: [
            { icon: <SiWordpress />, color: "#21759B" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
            { icon: <FaJsSquare />, color: "#F7DF1E" },
        ],
    },
];
