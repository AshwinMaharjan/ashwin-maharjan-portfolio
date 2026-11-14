import { useEffect, useRef, useState } from "react";
import ScrollReveal from "scrollreveal";
import {
  FaBriefcase,
  FaCode,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFilePdf,
  FaAward,
} from "react-icons/fa";

// The PDF lives in src/assets and is bundled into the page (?inline), so the
// browser never makes a network request for a .pdf file that a download
// manager could intercept.
import cvPdf from "../../../public/Ashwin_Maharjan_CV.pdf";

const experience = [
  "Developed a responsive e-commerce platform with eSewa test environment payment integration",
  "Built task management system with team collaboration features",
];

const keySkills = [
  "HTML",
  "CSS",
  "PHP",
  "JavaScript",
  "MySQL",
  "PostgreSQL",
  "React",
  "Tailwind CSS",
  "UI/UX",
];

const achievements = [
  "Completed multiple full-stack web projects",
  "Proficient in modern web technologies and frameworks",
  "Strong foundation in UI/UX design principles",
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

function BulletList({ items }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-body">
          <span
            aria-hidden="true"
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <h3 className="flex items-center gap-3 font-heading text-xl font-semibold tracking-tight text-heading">
      <span className="grid h-9 w-9 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-base text-primary">
        <Icon />
      </span>
      {children}
    </h3>
  );
}

export default function CV() {
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfError, setPdfError] = useState(false);

  // Turn the bundled PDF into a blob URL for the viewer and the button.
  useEffect(() => {
    let cancelled = false;
    let objectUrl = null;

    fetch(cvPdf)
      .then((res) => res.arrayBuffer())
      .then((buf) => {
        objectUrl = URL.createObjectURL(
          new Blob([buf], { type: "application/pdf" })
        );
        if (cancelled) {
          URL.revokeObjectURL(objectUrl);
        } else {
          setPdfUrl(objectUrl);
        }
      })
      .catch(() => {
        if (!cancelled) setPdfError(true);
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

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

  return (
    <section
      id="cv"
      className="relative isolate w-full overflow-hidden border-t border-line bg-bg px-6 py-16 md:px-10 md:py-20 xl:px-[100px]"
    >
      {/* Background: one soft glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[1200px]">
        <div ref={headingRef} className="text-center">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-heading md:text-5xl">
            My CV
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-body md:text-lg">
            A quick summary here, and the full PDF just below.
          </p>
        </div>

        <div ref={contentRef} className="mt-12 space-y-6">
          {/* Resume summary */}
          <div className="overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-md">
            {/* Identity */}
            <div className="flex flex-col gap-4 border-b border-line p-6 md:flex-row md:items-end md:justify-between md:p-8">
              <div>
                <h3 className="font-heading text-3xl font-bold tracking-tight text-heading md:text-4xl">
                  Ashwin Maharjan
                </h3>
                <p className="mt-1 text-base font-medium text-primary md:text-lg">
                  Web Developer &amp; Graphic Designer
                </p>
              </div>
              <div className="space-y-1.5 text-sm text-body md:text-right">
                <p className="flex items-center gap-2 md:justify-end">
                  <FaMapMarkerAlt className="text-muted" /> Kathmandu, Nepal
                </p>
                <p className="flex items-center gap-2 break-all md:justify-end">
                  <FaEnvelope className="text-muted" /> maharjan.ashwin098@gmail.com
                </p>
              </div>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left */}
              <div className="space-y-8 p-6 md:p-8">
                <div>
                  <SectionTitle icon={FaBriefcase}>Projects &amp; experience</SectionTitle>
                  <BulletList items={experience} />
                </div>

                <div>
                  <SectionTitle icon={FaCode}>Key skills</SectionTitle>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {keySkills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-line bg-bg/60 px-3.5 py-1.5 text-sm font-medium text-heading"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-8 border-t border-line p-6 md:border-l md:border-t-0 md:p-8">
                <div>
                  <SectionTitle icon={FaGraduationCap}>Education</SectionTitle>
                  <h4 className="mt-4 text-base font-semibold text-heading">
                    Bachelor of Information Management (BIM)
                  </h4>
                  <p className="mt-1 text-[0.95rem] text-body">
                    Prime College (2022 – Pursuing)
                  </p>
                  
                </div>

                <div>
                  <SectionTitle icon={FaAward}>Achievements</SectionTitle>
                  <BulletList items={achievements} />
                </div>
              </div>
            </div>
          </div>

          {/* PDF viewer with a small toolbar */}
          <div className="overflow-hidden rounded-2xl border border-line bg-surface/60">
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 md:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <FaFilePdf />
                </span>
                <span className="truncate text-sm font-medium text-heading">
                  Ashwin Maharjan CV
                </span>
              </div>

              <a
                href={pdfUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!pdfUrl}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-bg shadow-[0_0_24px_-8px] shadow-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover motion-reduce:transition-none ${focusRing} ${
                  pdfUrl ? "" : "pointer-events-none opacity-50"
                }`}
              >
                View CV
              </a>
            </div>

            {pdfUrl ? (
              <iframe
                src={`${pdfUrl}#view=FitH`}
                title="Ashwin Maharjan CV"
                className="h-[480px] w-full md:h-[640px]"
              />
            ) : (
              <div className="flex h-[240px] w-full items-center justify-center px-6 text-center text-sm text-body md:h-[320px]">
                {pdfError ? "Couldn't load the CV preview." : "Loading CV..."}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}