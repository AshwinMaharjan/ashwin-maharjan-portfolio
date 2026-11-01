import { useEffect, useRef } from "react";
import Typed from "typed.js";
import ScrollReveal from "scrollreveal";
import {
  FaMapMarkerAlt,
  FaLaptopCode,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const ROLES = ["Student", "Web Developer", "Graphic Designer"];

const infoCards = [
  { icon: FaMapMarkerAlt, title: "Location", text: "Kathmandu, Nepal" },
  { icon: FaLaptopCode, title: "Expertise", text: "Full Stack Developer" },
  { icon: FaEnvelope, title: "Contact", text: "maharjan.ashwin098@gmail.com" },
];

const socials = [
  { icon: FaEnvelope, label: "Email", href: "mailto:maharjan.ashwin098@gmail.com" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com/AshwinMaharjan/" },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ashwin-maharjan-9940a5378",
  },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/9779860214171" },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/__ashwin07__/",
  },
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/mhrzn.ashwin/",
  },
];

export default function Home() {
  const typedEl = useRef(null);
  const contentRef = useRef(null);
  const nameRef = useRef(null);
  const introRef = useRef(null);
  const imgRef = useRef(null);

  // Typed.js (same settings as your old script.js)
  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: ROLES,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  // ScrollReveal (same distance/duration/delay and origins as your old script.js)
  useEffect(() => {
    const els = [
      contentRef.current,
      imgRef.current,
      nameRef.current,
      introRef.current,
    ];
    const sr = ScrollReveal({ distance: "80px", duration: 2000, delay: 350 });
    sr.reveal(contentRef.current, { origin: "top" });
    sr.reveal(imgRef.current, { origin: "bottom" });
    sr.reveal(nameRef.current, { origin: "left" });
    sr.reveal(introRef.current, { origin: "right" });
    return () => els.forEach((el) => sr.clean(el));
  }, []);

  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-80px)] w-full flex-col-reverse items-center justify-center gap-12 px-6 py-12 md:px-10 lg:flex-row lg:justify-between lg:gap-10 xl:px-[100px]"
    >
      {/* Left: text content */}
      <div
        ref={contentRef}
        className="w-full min-w-0 max-w-[680px] flex-1 text-center lg:text-left"
      >
        <h3 className="text-2xl font-semibold text-white md:text-[1.7rem]">
          Hello, It&apos;s Me
        </h3>
        <h1
          ref={nameRef}
          className="mt-1 text-4xl font-bold leading-tight text-white md:text-5xl xl:whitespace-nowrap xl:text-[3.5rem]"
        >
          Ashwin Maharjan
        </h1>
        <h3 className="mt-1 text-2xl font-semibold text-white md:text-[1.7rem]">
          And I&apos;m a <span ref={typedEl} className="text-[#00e5ff]" />
        </h3>

        <p ref={introRef} className="mt-5 text-base leading-relaxed text-gray-300">
          Hi, I&apos;m Ashwin, a tech enthusiast and aspiring developer
          passionate about web development. I&apos;m currently learning full
          stack development and working on projects that blend creativity with
          functionality. Always open to new challenges and collaboration.
        </p>

        {/* Glass info cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {infoCards.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#00e5ff]/60 hover:shadow-[0_0_20px_rgba(0,229,255,0.25)]"
            >
              <Icon className="mx-auto mb-2 text-2xl text-[#00e5ff]" />
              <h4 className="text-base font-semibold text-white">{title}</h4>
              <p className="mt-1 break-words text-sm text-gray-300">{text}</p>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#00e5ff] text-xl text-[#00e5ff] transition duration-300 hover:bg-[#00e5ff] hover:text-[#20242c] hover:shadow-[0_0_18px_#00e5ff]"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Right: photo with floating/bouncing effect */}
      <div
        ref={imgRef}
        className="flex w-full max-w-[320px] shrink-0 justify-center md:max-w-[400px] lg:w-[400px]"
      >
        <img
          src="/images/new_photo.png"
          alt="Ashwin Maharjan"
          className="h-auto w-full animate-[float_4s_ease-in-out_infinite] object-contain drop-shadow-[0_0_25px_rgba(0,229,255,0.25)]"
        />
      </div>
    </section>
  );
}