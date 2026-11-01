import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "CV", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  // Highlight the link of the section currently in view
  // (same logic as your old script.js), and close the mobile menu on scroll.
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      links.forEach(({ label, href }) => {
        const sec = document.querySelector(href);
        if (!sec) return;
        const offset = sec.offsetTop - 150;
        if (top >= offset && top < offset + sec.offsetHeight) {
          setActive(label);
        }
      });
      setOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smoothly scroll so the section starts right below the sticky header
  const goTo = (e, label, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      window.scrollTo({
        top: Math.max(section.offsetTop - headerHeight + 1, 0),
        behavior: "smooth",
      });
      history.pushState(null, "", href);
    }
    setActive(label);
    setOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-[#20242c] font-['Poppins',sans-serif]"
    >
      <div className="flex w-full items-center justify-between px-6 py-6 md:px-10 xl:px-[100px]">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => goTo(e, "Home", "#home")}
          className="text-[1.6rem] font-extrabold leading-none text-white"
        >
          Portfolio
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-12 xl:gap-16">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => goTo(e, label, href)}
                  className={`text-[1.1rem] transition-colors duration-200 hover:text-[#00e5ff] ${
                    active === label ? "text-[#00e5ff]" : "text-white"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-7 bg-white transition-transform duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-7 bg-white transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-7 bg-white transition-transform duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-white/10 md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => goTo(e, label, href)}
                  className={`block py-3 text-lg ${
                    active === label ? "text-[#00e5ff]" : "text-white"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}