import { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import { FaCode, FaLaptopCode, FaPaintBrush } from "react-icons/fa";

const skills = [
  {
    icon: FaCode,
    title: "Frontend Development",
    text: "I build responsive and user-friendly web interfaces using HTML, CSS, JavaScript, and React. I focus on clean code, performance, and creating smooth, engaging user experiences across different devices and browsers.",
  },
  {
    icon: FaLaptopCode,
    title: "System-Based Web Applications",
    text: "I develop full-stack web applications by combining frontend and backend technologies. I have experience building projects that handle user interaction, data management, and system logic to create practical and efficient solutions.",
  },
  {
    icon: FaPaintBrush,
    title: "UI / UX Design (Basic)",
    text: "I create simple and visually appealing interfaces with a focus on usability and clarity. Using tools like Adobe Photoshop, I design layouts and visuals that enhance user experience and maintain design consistency.",
  },
];

// A soft cyan light follows the cursor across the card
const trackPointer = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
};

export default function Skills() {
  const headingRef = useRef(null);
  const containerRef = useRef(null);

  // One calm reveal (skipped when the visitor prefers reduced motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [headingRef.current, containerRef.current];
    const sr = ScrollReveal({
      distance: "40px",
      duration: 1100,
      delay: 150,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
    sr.reveal(headingRef.current, { origin: "bottom" });
    sr.reveal(containerRef.current, { origin: "bottom", delay: 300 });
    return () => els.forEach((el) => sr.clean(el));
  }, []);

  return (
    <section
      id="skills"
      className="relative isolate w-full overflow-hidden border-t border-line bg-bg px-6 py-16 md:px-10 md:py-20 xl:px-[100px]"
    >
      {/* Background: one soft glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[1200px]">
        <div ref={headingRef} className="text-center">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-heading md:text-5xl">
            My skills
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-body md:text-lg">
            What I can build and design, from interface to database.
          </p>
        </div>

        <div
          ref={containerRef}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {skills.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              onMouseMove={trackPointer}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_40px_-20px] hover:shadow-primary/30 motion-reduce:transition-none md:p-8"
            >
              {/* Cursor spotlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(320px_circle_at_var(--x,50%)_var(--y,0%),rgba(34,211,238,0.12),transparent_65%)]"
              />

              <div className="relative">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-2xl text-primary transition-colors duration-300 group-hover:border-primary/50 group-hover:bg-primary group-hover:text-bg">
                  <Icon />
                </span>
                <h3 className="mt-6 font-heading text-xl font-semibold leading-snug tracking-tight text-heading md:text-[1.4rem]">
                  {title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-body">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}