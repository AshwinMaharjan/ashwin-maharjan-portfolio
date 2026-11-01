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

export default function Skills() {
  const headingRef = useRef(null);
  const containerRef = useRef(null);

  // Same ScrollReveal settings as your old script.js:
  // .heading from top, .services-container from bottom
  useEffect(() => {
    const els = [headingRef.current, containerRef.current];
    const sr = ScrollReveal({ distance: "80px", duration: 2000, delay: 350 });
    sr.reveal(headingRef.current, { origin: "top" });
    sr.reveal(containerRef.current, { origin: "bottom" });
    return () => els.forEach((el) => sr.clean(el));
  }, []);

  return (
    <section
      id="skills"
      className="flex min-h-screen w-full flex-col justify-center bg-[#20242c] px-6 py-20 md:px-10 xl:px-[60px]"
    >
      <h2
        ref={headingRef}
        className="text-center text-4xl font-bold text-white md:text-5xl"
      >
        My <span className="text-[#00e5ff]">Skills</span>
      </h2>

      <div
        ref={containerRef}
        className="mt-14 grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-[28px] border-2 border-transparent bg-[#323946] px-8 py-12 text-center transition duration-300 hover:scale-[1.03] hover:border-[#00e5ff] hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] md:px-10"
          >
            <Icon className="mx-auto text-5xl text-[#00e5ff]" />
            <h3 className="mt-6 text-2xl font-bold text-white md:text-[1.7rem] md:leading-snug">
              {title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}