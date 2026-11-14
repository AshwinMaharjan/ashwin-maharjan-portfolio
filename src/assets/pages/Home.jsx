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
  { icon: FaEnvelope, title: "Email", text: "maharjan.ashwin098@gmail.com" },
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

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

// Smooth scroll that lands just below the sticky header
const scrollToSection = (e, href) => {
  e.preventDefault();
  const section = document.querySelector(href);
  if (!section) return;
  const headerH = document.querySelector("header")?.offsetHeight ?? 0;
  const y = section.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: Math.max(y - headerH + 1, 0), behavior: "smooth" });
  history.pushState(null, "", href);
};

export default function Home() {
  const typedEl = useRef(null);
  const contentRef = useRef(null);
  const imgRef = useRef(null);

  // Typed.js
  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: ROLES,
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1400,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  // One calm entrance on load (skipped when the visitor prefers reduced motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [contentRef.current, imgRef.current];
    const sr = ScrollReveal({
      distance: "40px",
      duration: 1100,
      delay: 150,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
    sr.reveal(contentRef.current, { origin: "bottom" });
    sr.reveal(imgRef.current, { origin: "right", delay: 350 });
    return () => els.forEach((el) => sr.clean(el));
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh w-full flex-col-reverse items-center justify-center gap-10 overflow-hidden bg-bg px-6 pb-12 pt-24 md:px-10 lg:flex-row lg:pt-28 lg:justify-between lg:gap-12 xl:px-[100px]"
    >
      {/* Background: faint grid that fades out + two soft colour glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Left: text */}
      <div
        ref={contentRef}
        className="w-full min-w-0 max-w-[680px] flex-1 text-center lg:text-left"
      >
        <p className="text-lg text-body md:text-xl">Hello, it&apos;s me</p>

        <h1 className="mt-2 font-heading text-5xl font-bold leading-[1.05] tracking-tight text-heading md:text-6xl xl:text-[4.25rem]">
          Ashwin Maharjan
        </h1>

        <h2 className="mt-4 flex min-h-[2.75em] flex-wrap justify-center gap-x-3 font-heading text-xl font-medium leading-snug text-heading sm:min-h-0 md:text-3xl lg:justify-start [&_.typed-cursor]:font-light [&_.typed-cursor]:text-primary">
          <span>And I&apos;m a</span>
          <span>
            <span ref={typedEl} className="text-primary" />
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-body lg:mx-0">
          Hi, I&apos;m Ashwin, a tech enthusiast and aspiring developer passionate
          about web development. I&apos;m currently learning full stack development
          and working on projects that blend creativity with functionality. Always
          open to new challenges and collaboration.
        </p>

        {/* Actions + socials */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-5 lg:justify-start">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "#projects")}
              className={`rounded-full bg-primary px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_28px_-8px] shadow-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover motion-reduce:transition-none ${focusRing}`}
            >
              View my work
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className={`rounded-full border border-line bg-surface/60 px-6 py-3 text-sm font-semibold text-heading transition-colors duration-300 hover:border-primary/50 hover:text-primary ${focusRing}`}
            >
              Contact me
            </a>
          </div>


          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/60 text-base text-body transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_18px_-6px] hover:shadow-primary motion-reduce:transition-none ${focusRing}`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick facts: location + expertise on top, full-width email below */}
        <dl className="mt-10 grid overflow-hidden rounded-2xl border border-line bg-surface/60 text-left backdrop-blur-md sm:grid-cols-2">
          {infoCards.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={`flex items-center gap-3 p-4 ${
                i === 0 ? "border-b border-line sm:border-r" : ""
              } ${i === 1 ? "border-b border-line" : ""} ${
                i === 2 ? "sm:col-span-2 sm:border-t-0" : ""
              }`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon />
              </span>
              <div className="min-w-0">
                <dt className="text-xs text-muted">{title}</dt>
                <dd className="text-sm font-medium text-heading [overflow-wrap:anywhere]">
                  {text}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      {/* Right: photo (the circle is already part of the image) */}
      <div
        ref={imgRef}
        className="relative flex w-full max-w-[280px] shrink-0 items-center justify-center sm:max-w-[340px] lg:w-[420px] lg:max-w-[420px]"
      >
        {/* Diffuse glow only: no extra shape around the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-[12%] rounded-full bg-primary/25 blur-[70px]"
        />
        <img
          src="/images/new_photo.png"
          alt="Ashwin Maharjan"
          className="relative z-10 h-auto w-full animate-[float_6s_ease-in-out_infinite] object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)] motion-reduce:animate-none"
        />
      </div>
    </section>
  );
}