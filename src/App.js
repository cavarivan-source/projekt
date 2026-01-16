import { BrowserRouter, Routes, Route } from "react-router";

import './App.css';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogSingle from './pages/BlogSingle';
import Klubovi from "./pages/Klubovi";
import Natjecanja from "./pages/Natjecanja";
import Povijest from "./pages/Povijest";


function App() {
  return (
      <BrowserRouter>
      <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blogsingle" element={<BlogSingle />} />
      <Route path="/klubovi" element={<Klubovi />} />
       <Route path="/natjecanja" element={<Natjecanja />} />
        <Route path="/povijest" element={<Povijest />} />
    </Routes>
    <Footer />
  </BrowserRouter>

  );
}

export default App;
