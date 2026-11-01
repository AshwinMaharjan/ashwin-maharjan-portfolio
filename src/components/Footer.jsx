import { FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, "", "#home");
  };

  return (
    <footer className="flex w-full flex-col items-center justify-between gap-4 bg-[#20242c] px-6 py-6 text-center font-['Poppins',sans-serif] sm:flex-row sm:text-left md:px-10 xl:px-[100px]">
      <p className="text-sm text-white md:text-base">
        Copyright &copy; {year} by Ashwin Maharjan | All Rights Reserved.
      </p>

      <a
        href="#home"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#00e5ff] text-2xl text-[#20242c] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,229,255,0.7)]"
      >
        <FaArrowUp />
      </a>
    </footer>
  );
}