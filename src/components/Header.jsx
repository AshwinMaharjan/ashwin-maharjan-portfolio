import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

// Edit your name here (the surname hides on smaller screens)
const BRAND = { first: "Ashwin", last: "Maharjan" };

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
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mark, setMark] = useState({ left: 0, ready: false });

  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef({});

  /* ---------- One entrance: the island drops in on first load ---------- */
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* ---------- Scroll: active section, progress, compact state ---------- */
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const top = window.scrollY;
      const headerH = headerRef.current?.offsetHeight ?? 0;

      const line = top + headerH + 120;
      let current = links[0].label;
      links.forEach(({ label, href }) => {
        const sec = document.querySelector(href);
        if (sec && sec.getBoundingClientRect().top + top <= line) current = label;
      });
      if (window.innerHeight + top >= document.documentElement.scrollHeight - 4) {
        current = links[links.length - 1].label;
      }
      setActive(current);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(top / max, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;

      setScrolled(top > 16);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ---------- Glowing marker under the active desktop link ---------- */
  const measureMark = useCallback(() => {
    const el = itemRefs.current[active];
    const list = listRef.current;
    if (!el || !list) return;
    const l = list.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setMark({ left: r.left - l.left + r.width / 2, ready: true });
  }, [active]);

  useLayoutEffect(() => {
    measureMark();
    window.addEventListener("resize", measureMark);
    // re-measure once webfonts finish loading (link widths change)
    document.fonts?.ready.then(measureMark);
    return () => window.removeEventListener("resize", measureMark);
  }, [measureMark]);

  /* ---------- Mobile menu: lock page scroll, Esc / outside click / resize ---------- */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onPointer = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpen(false);
    };
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  /* ---------- Smooth scroll to a section, below the header ---------- */
  const goTo = (e, label, href) => {
    e.preventDefault();
    setOpen(false);
    const section = document.querySelector(href);
    if (section) {
      const headerH = headerRef.current?.offsetHeight ?? 0;
      const y = section.getBoundingClientRect().top + window.scrollY;
      // wait a frame so the scroll lock is released before scrolling
      requestAnimationFrame(() => {
        window.scrollTo({ top: Math.max(y - headerH + 1, 0), behavior: "smooth" });
      });
      history.pushState(null, "", href);
    }
    setActive(label);
  };

  const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

  return (
    <header
      ref={headerRef}
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 w-full px-4 pt-4 font-sans transition-transform duration-700 ease-out motion-reduce:transition-none md:px-6 ${
        mounted ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`relative mx-auto w-full transition-[max-width] duration-500 ease-out ${
          scrolled ? "max-w-[1040px]" : "max-w-[1200px]"
        }`}
      >
        {/* Island: gradient hairline border around a glass surface */}
        <div
          className={`pointer-events-auto rounded-full bg-linear-to-r p-px transition-shadow duration-300 ${
            scrolled
              ? "from-primary/50 via-line to-secondary/50 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.8)]"
              : "from-primary/25 via-line to-secondary/25"
          }`}
        >
          <div
            className={`relative overflow-hidden rounded-full backdrop-blur-xl transition-colors duration-300 ${
              scrolled ? "bg-bg/80" : "bg-bg/30"
            }`}
          >
            <div
              className={`flex items-center justify-between gap-4 pl-3 pr-3 transition-[padding] duration-300 md:pl-4 md:pr-3 ${
                scrolled ? "py-2" : "py-2.5"
              }`}
            >
              {/* Logo: a drawn "A" with a glowing dot, plus wordmark */}
              <a
                href="#home"
                onClick={(e) => goTo(e, "Home", "#home")}
                aria-label={`${BRAND.first} ${BRAND.last}, back to top`}
                className={`group flex items-center gap-3 rounded-xl ${focusRing}`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface/80 transition-colors duration-300 group-hover:border-primary/60">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                    <path
                      d="M5 19 L12 5 L19 19"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-heading"
                    />
                    <circle
                      cx="12"
                      cy="15.2"
                      r="1.9"
                      className="fill-primary drop-shadow-[0_0_4px_var(--color-primary)] transition-transform duration-300 group-hover:-translate-y-1.5 motion-reduce:transition-none"
                    />
                  </svg>
                </span>
                <span className="font-heading text-lg font-semibold tracking-tight text-heading">
                  {BRAND.first}
                  <span className="hidden text-body xl:inline"> {BRAND.last}</span>
                </span>
              </a>

              {/* Desktop nav */}
              <nav aria-label="Primary" className="hidden md:block">
                <ul ref={listRef} className="relative flex items-center">
                  {links.map(({ label, href }) => (
                    <li key={label} ref={(el) => (itemRefs.current[label] = el)}>
                      <a
                        href={href}
                        onClick={(e) => goTo(e, label, href)}
                        aria-current={active === label ? "true" : undefined}
                        className={`block rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors duration-200 lg:px-4 ${focusRing} ${
                          active === label ? "text-heading" : "text-body hover:text-heading"
                        }`}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                  {/* Glowing marker that slides to the active link */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-0.5 h-[3px] w-6 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_2px] shadow-primary/60 transition-[left,opacity] duration-300 ease-out motion-reduce:transition-none ${
                      mark.ready ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ left: mark.left }}
                  />
                </ul>
              </nav>

              {/* Right side: availability + CTA */}
              <div className="hidden items-center gap-4 md:flex">
                <span className="hidden items-center gap-2 font-mono text-xs text-muted xl:inline-flex">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Open to work
                </span>
                <a
                  href="#contact"
                  onClick={(e) => goTo(e, "Contact", "#contact")}
                  className={`rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-bg shadow-[0_0_26px_-8px] shadow-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover motion-reduce:transition-none ${focusRing}`}
                >
                  Let&apos;s talk
                </a>
              </div>

              {/* Mobile toggle */}
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen(!open)}
                className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-surface/80 transition-colors hover:border-primary/40 md:hidden ${focusRing}`}
              >
                <span
                  className={`h-0.5 w-4.5 rounded bg-heading transition-transform duration-300 ${
                    open ? "translate-y-2 rotate-45 bg-primary" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-4.5 rounded bg-heading transition-opacity duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-4.5 rounded bg-heading transition-transform duration-300 ${
                    open ? "-translate-y-2 -rotate-45 bg-primary" : ""
                  }`}
                />
              </button>
            </div>

            {/* Scroll progress, clipped by the island's rounded ends */}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5">
              <div
                ref={progressRef}
                className="h-full origin-left scale-x-0 bg-linear-to-r from-primary via-secondary to-accent"
              />
            </div>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          id="mobile-nav"
          aria-hidden={!open}
          className={`pointer-events-auto absolute inset-x-0 top-full mt-3 origin-top rounded-3xl border border-line bg-surface/95 p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300 ease-out md:hidden ${
            open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-95 opacity-0"
          }`}
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {links.map(({ label, href }, i) => (
                <li
                  key={label}
                  className={`border-b border-line/70 transition-all duration-300 last:border-0 ${
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                >
                  <a
                    href={href}
                    onClick={(e) => goTo(e, label, href)}
                    aria-current={active === label ? "true" : undefined}
                    className={`flex items-center justify-between py-3.5 font-heading text-2xl font-medium tracking-tight transition-colors ${
                      active === label ? "text-primary" : "text-heading hover:text-primary"
                    }`}
                  >
                    {label}
                    {active === label && (
                      <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px] shadow-primary" />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Open to work
              </span>
              <a
                href="#contact"
                onClick={(e) => goTo(e, "Contact", "#contact")}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-primary-hover"
              >
                Let&apos;s talk
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}