import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Test from "./pages/Test";
import Classes from "./pages/Classes";
import Events from "./pages/Events";
import Expenses from "./pages/Expenses";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <div className="sharingan-bg flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-10">
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/events" element={<Events />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
