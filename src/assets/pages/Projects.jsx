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

const categoryLabel = { fullstack: "Full Stack", frontend: "Frontend" };

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

export default function Projects() {
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const [filter, setFilter] = useState("all");

  // One calm reveal (skipped when the visitor prefers reduced motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [headingRef.current, contentRef.current];
    const sr = ScrollReveal({
      distance: "40px",
      duration: 1100,
      delay: 150,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
    sr.reveal(headingRef.current, { origin: "bottom" });
    sr.reveal(contentRef.current, { origin: "bottom", delay: 300 });
    return () => els.forEach((el) => sr.clean(el));
  }, []);

  const visibleProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="relative isolate w-full overflow-hidden border-t border-line bg-bg px-6 py-16 md:px-10 md:py-20 xl:px-[100px]"
    >
      {/* Background: one soft glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[1200px]">
        <div ref={headingRef} className="text-center">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-heading md:text-5xl">
            Latest projects
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-body md:text-lg">
            A few things I&apos;ve built, from college systems to React apps.
          </p>
        </div>

        <div ref={contentRef}>
          {/* Filter: segmented control */}
          <div className="mt-10 flex justify-center">
            <div
              role="group"
              aria-label="Filter projects"
              className="inline-flex rounded-full border border-line bg-surface/60 p-1.5 backdrop-blur"
            >
              {filters.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  aria-pressed={filter === value}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 motion-reduce:transition-none md:px-6 ${focusRing} ${
                    filter === value
                      ? "bg-primary text-bg shadow-[0_0_20px_-6px] shadow-primary"
                      : "text-body hover:text-heading"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Project cards */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <article
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_48px_-24px] hover:shadow-primary/30 starting:translate-y-3 starting:opacity-0 motion-reduce:transition-none"
              >
                {/* Screenshot */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-bg">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/80 px-3 py-1 text-xs font-medium text-heading backdrop-blur">
                    {categoryLabel[project.category]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-heading">
                    {project.title}
                  </h3>

                  <p className="mt-3 line-clamp-4 text-[0.95rem] leading-relaxed text-body">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.tech.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line bg-bg/60 px-3 py-1 text-xs font-medium text-body"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  <div className="mt-6 flex gap-3 border-t border-line pt-5">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-bg transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_20px_-6px] hover:shadow-primary motion-reduce:transition-none ${focusRing}`}
                    >
                      <FaExternalLinkAlt className="text-xs" /> Live demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-heading transition-colors duration-300 hover:border-primary/60 hover:text-primary ${focusRing}`}
                    >
                      <FaGithub /> GitHub
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}