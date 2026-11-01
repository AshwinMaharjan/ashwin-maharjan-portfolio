import { useEffect, useRef, useState } from "react";
import ScrollReveal from "scrollreveal";
import {
  FaBriefcase,
  FaCode,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFilePdf,
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

function BulletList({ items }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-relaxed text-gray-200">
          <span className="mt-0.5 text-xs text-[#00e5ff]">&#9656;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <h3 className="flex items-center gap-2 text-lg font-bold text-[#00e5ff] md:text-xl">
      <Icon />
      {children}
    </h3>
  );
}

export default function CV() {
  const headingRef = useRef(null);
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

  // Same ScrollReveal settings as your old script.js: .heading from top
  useEffect(() => {
    const el = headingRef.current;
    const sr = ScrollReveal({ distance: "80px", duration: 2000, delay: 350 });
    sr.reveal(el, { origin: "top" });
    return () => sr.clean(el);
  }, []);

  return (
    <section
      id="cv"
      className="flex min-h-screen w-full flex-col justify-center bg-[#20242c] px-6 py-20 md:px-10 xl:px-[100px]"
    >
      <h2
        ref={headingRef}
        className="text-center text-4xl font-bold text-white md:text-5xl"
      >
        My <span className="text-[#00e5ff]">CV</span>
      </h2>

      {/* Quick resume card */}
      <div className="mt-12 w-full rounded-2xl border border-[#00e5ff]/25 bg-[#2a2f3a] px-6 py-8 md:px-10 md:py-10">
        {/* Header */}
        <div className="border-b border-white/15 pb-6 text-center">
          <h2 className="text-3xl font-bold text-[#00e5ff] md:text-4xl">
            Ashwin Maharjan
          </h2>
          <h3 className="mt-2 text-base font-semibold text-white md:text-lg">
            Web Developer &amp; Graphic Designer
          </h3>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-300">
            <FaMapMarkerAlt /> Kathmandu, Nepal
          </p>
          <p className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-300">
            <FaEnvelope /> maharjan.ashwin098@gmail.com
          </p>
        </div>

        {/* Two columns */}
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Left column */}
          <div className="space-y-8">
            <div>
              <SectionTitle icon={FaBriefcase}>Projects &amp; Experience</SectionTitle>
              <BulletList items={experience} />
            </div>

            <div>
              <SectionTitle icon={FaCode}>Key Skills</SectionTitle>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {keySkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[#00e5ff]/30 bg-white/10 px-4 py-1.5 text-xs font-bold text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            <SectionTitle icon={FaGraduationCap}>Education</SectionTitle>
            <h4 className="mt-4 text-sm font-bold text-white md:text-base">
              Bachelor of Information Management (BIM)
            </h4>
            <p className="mt-1 text-sm text-gray-300">
              Prime College (2022-Pursuing)
            </p>
            <p className="mt-1 text-sm text-gray-300">
              <strong className="font-bold">Specialization:</strong> Web Developer
              &amp; Graphic Designer
            </p>

            <h4 className="mt-8 text-sm font-bold text-white md:text-base">
              Achievements:
            </h4>
            <BulletList items={achievements} />
          </div>
        </div>
      </div>

      {/* PDF viewer */}
      <div className="mt-8 w-full overflow-hidden rounded-2xl border border-[#00e5ff]/25">
        {pdfUrl ? (
          <iframe
            src={`${pdfUrl}#view=FitH`}
            title="Ashwin Maharjan CV"
            className="h-[480px] w-full md:h-[640px]"
          />
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center px-6 text-center text-sm text-gray-300 md:h-[320px]">
            {pdfError ? "Couldn't load the CV preview." : "Loading CV..."}
          </div>
        )}
      </div>

      {/* View CV button */}
      <div className="mt-8 flex justify-center">
        <a
          href={pdfUrl ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#00e5ff] px-8 py-3 text-base font-bold text-[#20242c] shadow-[0_0_20px_rgba(0,229,255,0.5)] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.8)]"
        >
          <FaFilePdf />
          View CV
        </a>
      </div>
    </section>
  );
}