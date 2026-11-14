import { FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, "", "#home");
  };

  return (
    <footer className="w-full border-t border-line bg-bg px-6 py-6 md:px-10 xl:px-[100px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-body">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-medium text-heading">Ashwin Maharjan</span>. All
          rights reserved.
        </p>

        <a
          href="#home"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface/60 text-base text-primary transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-bg hover:shadow-[0_0_20px_-4px] hover:shadow-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none"
        >
          <FaArrowUp />
        </a>
      </div>
    </footer>
  );
}