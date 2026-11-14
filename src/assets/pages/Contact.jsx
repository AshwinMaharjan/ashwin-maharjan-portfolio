import { useEffect, useRef, useState } from "react";
import ScrollReveal from "scrollreveal";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaArrowRight,
} from "react-icons/fa";

const FORMSPREE_URL = "https://formspree.io/f/xlgrdgzp";

// `value` is the readable handle shown under each title (taken from your links)
const socials = [
  {
    icon: FaEnvelope,
    title: "Email",
    value: "maharjan.ashwin098@gmail.com",
    href: "mailto:maharjan.ashwin098@gmail.com",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+977 986-0214171",
    href: "https://wa.me/9779860214171",
  },
  {
    icon: FaLinkedin,
    title: "LinkedIn",
    value: "ashwin-maharjan",
    href: "https://www.linkedin.com/in/ashwin-maharjan-9940a5378",
  },
  {
    icon: FaGithub,
    title: "GitHub",
    value: "AshwinMaharjan",
    href: "https://github.com/AshwinMaharjan/",
  },
  {
    icon: FaInstagram,
    title: "Instagram",
    value: "@__ashwin07__",
    href: "https://www.instagram.com/__ashwin07__/",
  },
  {
    icon: FaFacebookF,
    title: "Facebook",
    value: "mhrzn.ashwin",
    href: "https://www.facebook.com/mhrzn.ashwin/",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const inputClass =
  "w-full rounded-xl border border-line bg-bg/60 px-4 py-3 text-base text-heading placeholder:text-muted outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/25";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-heading">{label}</span>
      {children}
    </label>
  );
}

export default function Contact() {
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const toastTimer = useRef(null);

  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success", visible: false });

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

  // Clear the toast timer when leaving the page
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // Toast notification (shows for 5 seconds)
  const showToast = (message, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ message, type, visible: true });
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 5000);
  };

  // Contact form handler (same Formspree request as before)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const data = Object.fromEntries(new FormData(form));

    setSending(true);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          _replyto: data.email,
          _subject: `Portfolio Contact: ${data.subject}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      showToast("Message sent successfully! I'll get back to you soon.", "success");
      form.reset();
    } catch {
      showToast(
        "Failed to send message. Please try again or email me directly at maharjan.ashwin098@gmail.com",
        "error"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate w-full overflow-hidden border-t border-line bg-bg px-6 py-16 md:px-10 md:py-20 xl:px-[100px]"
    >
      {/* Background: one soft glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[1200px]">
        <div ref={headingRef} className="text-center">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-heading md:text-5xl">
            Contact me
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-body md:text-lg">
            Have a project in mind or just want to say hi? Send a message or
            reach me on any of these.
          </p>
        </div>

        <div
          ref={contentRef}
          className="mt-12 grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-10"
        >
          {/* Left: ways to reach me */}
          <ul className="space-y-3">
            {socials.map(({ icon: Icon, title, value, href }) => (
              <li key={title}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 rounded-2xl border border-line bg-surface/60 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_16px_32px_-18px] hover:shadow-primary/40 motion-reduce:transition-none ${focusRing}`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-lg text-primary transition-colors duration-300 group-hover:border-primary/50 group-hover:bg-primary group-hover:text-bg">
                    <Icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-heading">{title}</span>
                    <span className="block truncate text-sm text-body">{value}</span>
                  </span>
                  <FaArrowRight className="shrink-0 text-sm text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right: form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur-md md:p-8"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Full name">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Email address">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Mobile number">
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="+977 98XXXXXXXX"
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Subject">
                <input
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  required
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Message">
                <textarea
                  name="message"
                  rows={7}
                  placeholder="Tell me a bit about your idea or question"
                  required
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={sending}
              className={`mt-6 w-full rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-bg shadow-[0_0_28px_-8px] shadow-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none sm:w-auto ${focusRing}`}
            >
              {sending ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </div>

      {/* Toast notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed right-6 top-24 z-[100] flex max-w-[360px] items-start gap-3 rounded-xl border border-line border-l-4 bg-surface px-5 py-4 text-sm text-heading shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
          toast.type === "success" ? "border-l-green-400" : "border-l-red-400"
        } ${
          toast.visible
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-8 opacity-0"
        }`}
      >
        <span
          className={`text-lg font-bold ${
            toast.type === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {toast.type === "success" ? "✓" : "✗"}
        </span>
        <span>{toast.message}</span>
      </div>
    </section>
  );
}