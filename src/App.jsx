import Header from "./components/Header";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
// As each page is ready, import it and swap it in for its placeholder below:
// import Skills from "./assets/pages/Skills";
// import Projects from "./assets/pages/Projects";
// import CV from "./assets/pages/CV";
// import Contact from "./assets/pages/Contact";
// import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#20242c] font-['Poppins',sans-serif] text-white">
      <Header />

      <main>
        <Home />
        <About />

        {/* Keep the id on each section so the header links and scroll
            highlighting keep working when you replace these placeholders. */}
        <section id="skills" className="min-h-screen" />
        <section id="projects" className="min-h-screen" />
        <section id="cv" className="min-h-screen" />
        <section id="contact" className="min-h-screen" />
      </main>
    </div>
  );
}