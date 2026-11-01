import { useEffect, useRef, useState } from "react";
import ScrollReveal from "scrollreveal";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const FORMSPREE_URL = "https://formspree.io/f/xlgrdgzp";

const socials = [
  { icon: FaGithub, title: "GitHub", href: "https://github.com/AshwinMaharjan/" },
  {
    icon: FaLinkedin,
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/ashwin-maharjan-9940a5378",
  },
  { icon: FaEnvelope, title: "Gmail", href: "mailto:maharjan.ashwin098@gmail.com" },
  { icon: FaWhatsapp, title: "WhatsApp", href: "https://wa.me/9779860214171" },
  {
    icon: FaInstagram,
    title: "Instagram",
    href: "https://www.instagram.com/__ashwin07__/",
  },
  {
    icon: FaFacebookF,
    title: "Facebook",
    href: "https://www.facebook.com/mhrzn.ashwin/",
  },
];

const inputClass =
  "w-full rounded-lg bg-[#20242c] px-5 py-4 text-base text-white placeholder:text-gray-500 outline-none transition focus:ring-2 focus:ring-[#00e5ff]/60";

export default function Contact() {
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const toastTimer = useRef(null);

  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success", visible: false });

  // Same ScrollReveal settings as your old script.js: .heading from top
  useEffect(() => {
    const el = headingRef.current;
    const sr = ScrollReveal({ distance: "80px", duration: 2000, delay: 350 });
    sr.reveal(el, { origin: "top" });
    return () => sr.clean(el);
  }, []);

  // Clear the toast timer when leaving the page
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // Toast notification (shows for 5 seconds, like your old showToast)
  const showToast = (message, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ message, type, visible: true });
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 5000);
  };

  // Contact form handler (same Formspree request as your old script.js)
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
      className="flex min-h-screen w-full flex-col justify-center bg-[#323946] px-6 py-20 md:px-10 xl:px-[100px]"
    >
      <h2
        ref={headingRef}
        className="text-center text-4xl font-bold text-white md:text-5xl"
      >
        Contact <span className="text-[#00e5ff]">Me!</span>
      </h2>

      {/* Connect with me */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {socials.map(({ icon: Icon, title, href }) => (
          <a
            key={title}
            href={href}
            title={title}
            aria-label={title}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#00e5ff]/40 bg-white/10 text-2xl text-[#00e5ff] transition duration-300 hover:scale-110 hover:border-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#20242c] hover:shadow-[0_0_20px_rgba(0,229,255,0.6)]"
          >
            <Icon />
          </a>
        ))}
      </div>

      {/* Contact form */}
      <form ref={formRef} onSubmit={handleSubmit} className="mt-12 w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className={inputClass}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className={inputClass}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            required
            className={inputClass}
          />
          <input
            type="text"
            name="subject"
            placeholder="Email Subject"
            required
            className={inputClass}
          />
        </div>

        <textarea
          name="message"
          rows={10}
          placeholder="Your Message"
          required
          className={`${inputClass} mt-4 resize-none`}
        />

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={sending}
            className="rounded-full bg-[#00e5ff] px-10 py-4 text-base font-bold tracking-wide text-[#20242c] shadow-[0_0_20px_rgba(0,229,255,0.5)] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.8)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>

      {/* Toast notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed right-6 top-24 z-[100] flex max-w-[360px] items-start gap-3 rounded-lg border-l-4 bg-[#1b1f26] px-5 py-4 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
          toast.type === "success" ? "border-green-400" : "border-red-400"
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