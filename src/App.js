import { BrowserRouter, Routes, Route } from "react-router";

import "./Gutenberg.css";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogSingle from "./pages/BlogSingle";
import Klubovi from "./pages/Klubovi";
import Natjecanja from "./pages/Natjecanja";
import Povijest from "./pages/Povijest";
import Profil from "./components/zadaci/Profil";
import KorisniciVjezba from "./components/zadaci/data/KorisniciVjezba";
import Tecaj from "./pages/Tecaj";
import Korisnici from "./components/zadaci/data/Korisnici";
import Kategorije from "./pages/Kategorije";
import Liga from "./pages/Liga";
import LigaSingle from "./pages/Ligasingle";
import Kontakt from "./pages/Kontakt";
import "./pages/signin.css"
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogSingle />} />
        <Route path="/klubovi" element={<Klubovi />} />
        <Route path="/natjecanja" element={<Natjecanja />} />
        <Route path="/povijest" element={<Povijest />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/korisnicivjezba" element={<KorisniciVjezba />} />
        <Route path="/tecaj" element={<Tecaj />} />
        <Route path="/korisnici" element={<Korisnici />} />
        <Route path="/kategorije" element={<Kategorije />} />
        <Route path="/liga" element={<Liga />} />
        <Route path="/liga/:slug" element={<LigaSingle />} />
                <Route path="/kontakt" element={<Kontakt />} />
                 <Route path="/signin" element={<SignIn />} />
                 <Route path="/signup" element={<SignUp />} />



      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
