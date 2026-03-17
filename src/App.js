import { BrowserRouter, Routes, Route } from "react-router";

import "./Gutenberg.css";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogSingle from "./pages/BlogSingle";
import Clanstvo from "./pages/Clanstvo";
import Klubovi from "./pages/Klubovi";
import Natjecanja from "./pages/Natjecanja";
import Profil from "./components/zadaci/Profil";
import KorisniciVjezba from "./components/zadaci/data/KorisniciVjezba";
import Tecaj from "./pages/Tecaj";
import Korisnici from "./components/zadaci/data/Korisnici";
import Kategorije from "./pages/Kategorije";
import "./pages/signin.css"
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";

import AdminLayout from "./pages/admin/AdminLayout";
import MyPosts from "./pages/admin/MyPosts";
import Settings from "./pages/admin/Settings";
import MyDetails from "./pages/admin/MyDetails";

import AuthorPage from "./pages/AuthorPage";

import Shop from "./pages/shop/Shop";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout";

function App() {
  return (
    <BrowserRouter basename={'/icavar'}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clanstvoikontakt" element={<Clanstvo />} />
       
        <Route path="/blog/:slug" element={<BlogSingle />} />
        <Route path="/ekipe" element={<Klubovi />} />
        <Route path="/natjecanja" element={<Natjecanja />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/korisnicivjezba" element={<KorisniciVjezba />} />
        <Route path="/tecaj" element={<Tecaj />} />
        <Route path="/korisnici" element={<Korisnici />} />
        <Route path="/kategorije" element={<Kategorije />} />
                 <Route path="/signin" element={<SignIn />} />
                 <Route path="/signup" element={<SignUp />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="myposts" element={<MyPosts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="mydetails" element={<MyDetails />} />
        </Route>  

<Route path="/blog" element={<Blog />} />
<Route path="/author/:id" element={<AuthorPage />} />
<Route path="/shop" element={<Shop />} />
<Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={<Checkout />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
