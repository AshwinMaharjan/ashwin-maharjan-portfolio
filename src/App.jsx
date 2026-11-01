import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Skills from "./assets/pages/Skills";
import CV from "./assets/pages/CV";
import Contact from "./assets/pages/Contact";
// When the Projects page is ready, import it and swap it in for its placeholder:
// import Projects from "./assets/pages/Projects";

export default function App() {
  return (
    <div className="min-h-screen bg-[#20242c] font-['Poppins',sans-serif] text-white">
      <Header />

      <main>
        <Home />
        <About />
        <Skills />

        {/* Keep the id on the section so the header link and scroll
            highlighting keep working when you replace this placeholder. */}
        <section id="projects" className="min-h-screen" />

        <CV />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}