import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaVuejs, FaSass } from "react-icons/fa";
import { SiWordpress, SiPython } from "react-icons/si";

export const projects = [
    {
        id: 1,
        name: "Portfolio Website",
        category: "Web Development",
        desc: "A personal portfolio website to showcase projects and skills.",
        img: "https://via.placeholder.com/400x225",
        github: "https://github.com/username/portfolio",
        web: "https://portfolio.vercel.app",
        tech: [
            { icon: <FaReact />, color: "#61DBFB" },
            { icon: <FaJsSquare />, color: "#F7DF1E" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
        ],
    },
    {
        id: 2,
        name: "E-commerce Store",
        category: "Web Development",
        desc: "An online store built for small business with cart and checkout.",
        img: "https://via.placeholder.com/400x225",
        github: "https://github.com/username/ecommerce-store",
        tech: [
            { icon: <FaReact />, color: "#61DBFB" },
            { icon: <FaNodeJs />, color: "#3C873A" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
        ],
    },
    {
        id: 3,
        name: "Blog Platform",
        category: "Web Development",
        desc: "A responsive blog platform with user authentication and CMS.",
        img: "https://via.placeholder.com/400x225",
        web: "https://blog-platform.vercel.app",
        tech: [
            { icon: <FaReact />, color: "#61DBFB" },
            { icon: <FaNodeJs />, color: "#3C873A" },
            { icon: <FaHtml5 />, color: "#E34C26" },
        ],
    },
    {
        id: 4,
        name: "Task Manager App",
        category: "Web Development",
        desc: "A productivity app to manage tasks and deadlines efficiently.",
        img: "https://via.placeholder.com/400x225",
        github: "https://github.com/username/task-manager",
        tech: [
            { icon: <FaVuejs />, color: "#42b883" },
            { icon: <FaSass />, color: "#CC6699" },
            { icon: <FaJsSquare />, color: "#F7DF1E" },
        ],
    },
    {
        id: 5,
        name: "Landing Page",
        category: "Web Development",
        desc: "A marketing landing page for a SaaS product.",
        img: "https://via.placeholder.com/400x225",
        web: "https://landing-saas.vercel.app",
        tech: [
            { icon: <FaHtml5 />, color: "#E34C26" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
            { icon: <FaJsSquare />, color: "#F7DF1E" },
        ],
    },
    {
        id: 6,
        name: "WordPress Blog",
        category: "Web Development",
        desc: "A dynamic WordPress blog site with custom themes and plugins.",
        img: "https://via.placeholder.com/400x225",
        github: "https://github.com/username/wp-blog",
        web: "https://wp-blog.com",
        tech: [
            { icon: <SiWordpress />, color: "#21759B" },
            { icon: <FaCss3Alt />, color: "#264DE4" },
            { icon: <FaJsSquare />, color: "#F7DF1E" },
        ],
    },
    {
        id: 7,
        name: "Data Analysis Tool",
        category: "Data & AI",
        desc: "A Python-based data analysis and visualization tool.",
        img: "https://via.placeholder.com/400x225",
        github: "https://github.com/username/data-analysis-tool",
        tech: [{ icon: <SiPython />, color: "#3776AB" }],
    },
];
