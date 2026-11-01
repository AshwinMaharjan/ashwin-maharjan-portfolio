import { useEffect, useRef, useState } from "react";
import ScrollReveal from "scrollreveal";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// category: "fullstack" or "frontend" (used by the filter buttons)
const projects = [
  {
    title: "MyCampus Hub",
    category: "fullstack",
    image: "/images/mycampus-hub-screenshot2.png",
    description:
      "MyCampus Hub is a web-based College Management System developed as an academic project to digitize and streamline core campus operations. The system provides role-based access for administrators, staff, and students, enabling efficient management of users, courses, subjects, notifications, and internal academic records.",
    tech: ["HTML", "CSS", "PHP", "JavaScript", "MySQL"],
    github: "https://github.com/AshwinMaharjan/MyCampus_Hub",
    demo: "https://mycampus-hub.free.nf/",
  },
  {
    title: "JerseyFlow Ecommerce",
    category: "fullstack",
    image: "/images/jerseyflow-screenshot-image.png",
    description:
      "JerseyFlow is a web based jersey e-commerce website built using PHP, HTML, CSS, and JavaScript, with MySQL as the backend database. It allows users to browse sports jerseys, view product details, and manage purchases through a smooth and interactive interface. The system is designed with a focus on performance, user experience, and clean UI for a seamless online shopping experience.",
    tech: ["HTML", "CSS", "PHP", "JavaScript", "MySQL", "API"],
    github: "https://github.com/AshwinMaharjan/jerseyflow-ecommerce",
    demo: "https://jersey-flow.free.nf/",
  },
  {
    title: "Vertex: Modern Admin Dashboard",
    category: "frontend",
    image: "/images/vertex-image.png",
    description:
      "A responsive, multi-page admin dashboard built with React, Tailwind CSS, and React Router, featuring interactive charts, dark mode, collapsible navigation, and reusable data components for analytics, orders, and reports.",
    tech: [
      "React",
      "React Router DOM",
      "Tailwind CSS",
      "Responsive Design",
      "Recharts",
      "Lucide React",
      "Vite",
    ],
    github: "https://github.com/AshwinMaharjan/vertex-admin-dashboard",
    demo: "https://vertex-admin-dashboard-five.vercel.app/",
  },
  {
    title: "CineXpress",
    category: "fullstack",
    image: "/images/cinexpress-ss.png",
    description:
      "A full-stack web application that allows users to browse movies, select seats and book tickets online. The system includes user authentication, seat availability validation and an admin panel for managing movies and shows. Built as an academic project to understand backend development and database-driven systems.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/AshwinMaharjan/cineXpress-management-system",
    demo: "http://cinexpress.great-site.net/",
  },
  {
    title: "CineSearch",
    category: "frontend",
    image: "/images/movie-app2.png",
    description:
      "A React movie discovery app powered by the TMDB API. Features real-time search, a favorites system with localStorage persistence, and a fully custom cinematic dark UI built from scratch with modular CSS.",
    tech: [
      "React",
      "React Router",
      "CSS",
      "Context API",
      "TMDB API",
      "localStorage",
    ],
    github: "https://github.com/AshwinMaharjan/movie-search-react",
    demo: "https://movie-search-react-rust-nine.vercel.app/",
  },
  {
    title: "ApexFrame Construction",
    category: "frontend",
    image: "/images/apex2.png",
    description:
      "ApexFrame Construction is a responsive construction company website built with React, JSX, and Bootstrap. It features a service showcase, project portfolio, and contact section, structured with reusable components and deployed on Vercel.",
    tech: ["React", "JSX", "Bootstrap", "JavaScript"],
    github: "https://github.com/AshwinMaharjan/apexframe-construction",
    demo: "https://apexframe-construction.vercel.app",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
];

export default function Projects() {
  const headingRef = useRef(null);
  const [filter, setFilter] = useState("all");

  // Same ScrollReveal settings as your old script.js: .heading from top
  useEffect(() => {
    const el = headingRef.current;
    const sr = ScrollReveal({ distance: "80px", duration: 2000, delay: 350 });
    sr.reveal(el, { origin: "top" });
    return () => sr.clean(el);
  }, []);

  const visibleProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="flex min-h-screen w-full flex-col justify-center bg-[#323946] px-6 py-20 md:px-10 xl:px-[100px]"
    >
      <h2
        ref={headingRef}
        className="text-center text-4xl font-bold text-white md:text-5xl"
      >
        Latest <span className="text-[#00e5ff]">Projects</span>
      </h2>

      {/* Filter buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`rounded-full border-2 px-7 py-2.5 text-sm font-bold transition duration-300 md:text-base ${
              filter === value
                ? "border-[#00e5ff] bg-[#00e5ff] text-[#20242c] shadow-[0_0_20px_rgba(0,229,255,0.5)]"
                : "border-[#00e5ff]/40 bg-white/10 text-white hover:border-[#00e5ff] hover:text-[#00e5ff]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col overflow-hidden rounded-2xl bg-[#20242c] shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)]"
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />

            <div className="flex flex-1 flex-col px-6 pb-6 pt-6 text-center">
              <h3 className="text-xl font-bold text-[#00e5ff] md:text-2xl">
                {project.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-gray-200">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="mt-auto flex flex-wrap justify-center gap-2 pt-6">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#00e5ff] px-5 py-2.5 text-sm font-bold text-[#00e5ff] transition duration-300 hover:bg-[#00e5ff] hover:text-[#20242c] hover:shadow-[0_0_18px_rgba(0,229,255,0.6)]"
                >
                  <FaGithub /> GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#00e5ff] px-5 py-2.5 text-sm font-bold text-[#00e5ff] transition duration-300 hover:bg-[#00e5ff] hover:text-[#20242c] hover:shadow-[0_0_18px_rgba(0,229,255,0.6)]"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}git add src/assets/pages/Projects.jsx