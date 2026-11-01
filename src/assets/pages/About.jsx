import { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";

const skills = [
  "HTML",
  "CSS",
  "React",
  "Tailwind CSS",
  "JavaScript",
  "PHP",
  "Laravel",
  "MySQL",
  "PostgreSQL",
  "UI/UX Design",
  "Git & GitHub",
];

export default function About() {
  const imgRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);

  // Same ScrollReveal settings as your old script.js:
  // .heading from top, .about-img from left, .about-content from right
  useEffect(() => {
    const els = [headingRef.current, imgRef.current, contentRef.current];
    const sr = ScrollReveal({ distance: "80px", duration: 2000, delay: 350 });
    sr.reveal(headingRef.current, { origin: "top" });
    sr.reveal(imgRef.current, { origin: "left" });
    sr.reveal(contentRef.current, { origin: "right" });
    return () => els.forEach((el) => sr.clean(el));
  }, []);

  return (
    <section
      id="about"
      className="flex min-h-screen w-full items-center bg-[#323946] px-6 py-20 md:px-10 xl:px-[100px]"
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: round photo */}
        <div ref={imgRef} className="flex justify-center">
          <img
            src="/images/new_photo2.png"
            alt="Ashwin Maharjan"
            className="h-auto w-full max-w-[300px] object-contain md:max-w-[380px] xl:max-w-[440px]"
          />
        </div>

        {/* Right: text */}
        <div ref={contentRef} className="text-center lg:text-left">
          <h2
            ref={headingRef}
            className="text-5xl font-bold leading-tight text-white md:text-6xl xl:text-[4.5rem]"
          >
            About <span className="text-[#00e5ff]">Me</span>
          </h2>

          <p className="mt-5 text-justify text-base leading-relaxed text-white md:text-[1.1rem]">
            Hey, I&apos;m Ashwin Maharjan, a curious mind driven by code,
            design, and innovation. Currently pursuing my Bachelor in
            Information Management, I&apos;m navigating the intersection of
            technology, business, and creativity. I enjoy building clean,
            responsive interfaces just as much as I enjoy scripting logic on
            the backend.
          </p>

          <h3 className="mt-6 text-2xl font-bold text-white md:text-[1.7rem]">
            Skills &amp; Technologies:
          </h3>

          <ul className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
            {skills.map((skill) => (
              <li
                key={skill}
                className="cursor-default rounded-full border border-[#00e5ff]/30 bg-white/10 px-7 py-3.5 text-[0.95rem] font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition duration-300 hover:scale-110 hover:border-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#20242c] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}