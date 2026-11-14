import { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";

// Same skills as before, grouped by what they're used for
const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    title: "Backend & database",
    items: ["PHP", "Laravel", "MySQL", "PostgreSQL"],
  },
  {
    title: "Design & tools",
    items: ["UI/UX Design", "Git & GitHub"],
  },
];

export default function About() {
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  // One calm reveal per side (skipped when the visitor prefers reduced motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [imgRef.current, contentRef.current];
    const sr = ScrollReveal({
      distance: "40px",
      duration: 1100,
      delay: 150,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
    sr.reveal(imgRef.current, { origin: "left" });
    sr.reveal(contentRef.current, { origin: "right", delay: 300 });
    return () => els.forEach((el) => sr.clean(el));
  }, []);

  return (
    <section
      id="about"
      className="relative isolate w-full overflow-hidden border-t border-line bg-bg px-6 py-16 md:px-10 md:py-20 xl:px-[100px]"
    >
      {/* Background: one soft glow behind the photo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left: photo (its circle is part of the image) */}
        <div ref={imgRef} className="relative flex justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-[14%] rounded-full bg-secondary/25 blur-[70px]"
          />
          <img
            src="/images/new_photo2.png"
            alt="Ashwin Maharjan"
            className="relative z-10 h-auto w-full max-w-[300px] object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)] md:max-w-[380px] xl:max-w-[440px]"
          />
        </div>

        {/* Right: text */}
        <div ref={contentRef} className="text-center lg:text-left">
          <h2 className="font-heading text-5xl font-bold leading-tight tracking-tight text-heading md:text-6xl">
            About me
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-body md:text-[1.05rem] lg:mx-0">
            Hey, I&apos;m Ashwin Maharjan, a curious mind driven by code,
            design, and innovation. Currently pursuing my Bachelor in
            Information Management, I&apos;m navigating the intersection of
            technology, business, and creativity. I enjoy building clean,
            responsive interfaces just as much as I enjoy scripting logic on the
            backend.
          </p>

          <h3 className="mt-10 font-heading text-2xl font-semibold tracking-tight text-heading">
            Skills &amp; technologies
          </h3>

          {/* Grouped skills in one panel */}
          <div className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/60 text-left backdrop-blur-md">
            {skillGroups.map(({ title, items }) => (
              <div
                key={title}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:gap-6 sm:p-5"
              >
                <h4 className="shrink-0 text-sm font-medium text-muted sm:w-36 sm:pt-2">
                  {title}
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <li
                      key={skill}
                      className="cursor-default rounded-full border border-line bg-bg/60 px-4 py-2 text-sm font-medium text-heading transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_18px_-6px] hover:shadow-primary motion-reduce:transition-none"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}