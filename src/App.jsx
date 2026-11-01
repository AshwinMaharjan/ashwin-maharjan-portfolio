import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  return <h1 className="text-4xl font-bold">Home Page</h1>;
}

function About() {
  return <h1 className="text-4xl font-bold">About Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;