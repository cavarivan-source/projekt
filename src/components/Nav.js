import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";
import poletLogo from "../img/Polet.png";

const Nav = () => {
  const location = useLocation();
  const [name, setName] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setName(user);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    const interval = setInterval(updateCartCount, 2000);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  if (location.pathname === "/register") return null;
  if (location.pathname === "/signin") return null;
  
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setName(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark polet-nav">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={poletLogo} alt="Polet logo" height="64" /> 
        </Link>
  
        <button
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar" 
          aria-controls="mainNavbar"
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span> 
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Početna</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">Vijesti</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#!" id="ddKlub" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Klub
              </Link>
              <ul className="dropdown-menu" aria-labelledby="ddKlub">
                <li><Link className="dropdown-item" to="/ekipe">Ekipe</Link></li>
                <li><Link className="dropdown-item" to="/natjecanja">Natjecanja</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/clanstvoikontakt">Članstvo i kontakt</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#!" id="ddWebshop" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Webshop
              </Link>
              <ul className="dropdown-menu" aria-labelledby="ddWebshop">
                <li><Link className="dropdown-item" to="/shop">Shop</Link></li>
                <li><Link className="dropdown-item" to="/cart">Košarica</Link></li>
              </ul>
            </li>

            {/* BOOTSTRAP + SVG KOŠARICA S BROJAČEM */}
            <li className="nav-item position-relative">
              <Link className="nav-link p-2" to="/cart" title="Košarica">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102z"/>
                  <path fillRule="evenodd" d="M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>

                {/* CRVENO-VIDLJIVI BADGE */}
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light polet-cart-badge"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-3">
              {name && (
                <button onClick={logOut} className="btn btn-primary btn-sm">
                  Dobrodošli, {name}
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;