import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Skills from "./assets/pages/Skills";
import Projects from "./assets/pages/Projects";
import CV from "./assets/pages/CV";
import Contact from "./assets/pages/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-[#20242c] font-['Poppins',sans-serif] text-white">
      <Header />

      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <CV />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}