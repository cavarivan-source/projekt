import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const[name, setName] = useState(null);
  useEffect( () => {
      const user = localStorage.getItem("username");
      if(user) setName(user);
    }, []

  );

  if(location.pathname === "/signin") {
    return;
  }
  
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  return (
        
<>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="./img/logo.svg" alt="logo" height="12"/> 
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span> 
        </button>

        <div className="navbar-collapse collapse" id="mainNavbar" >
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
               <li className="nav-item">
              <Link className="nav-link text-end" to="/klubovi">Klubovi</Link>
            </li>

                 <li className="nav-item">
              <Link className="nav-link text-end" to="/natjecanja">Natjecanja</Link>
            </li>
                  <li className="nav-item">
              <Link className="nav-link text-end" to="/povijest">Povijest</Link>
            </li>
                             <li className="nav-item">
              <Link className="nav-link text-end" to="/kategorije">Kategorije</Link>
            </li>
                            <li className="nav-item">
              <Link className="nav-link text-end" to="/liga">Liga</Link>
            </li>
           
          </ul>

     <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item">
                  { name ? (<button onClick={logOut} className="btn btn-primary">Dobrodošli,
                    {name}</button>
                  ) : (
                  <Link className="nav-link" to="/signin" title="Sign in">
                    <img src="./img/acc-wrap.svg" alt="Sign in" className="icon-sm"/>
                     </Link>
                  )
                  }
                  
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart" title="Cart">
                    <img src="./img/cart-wrap.svg" alt="Cart" className="icon-lg "/>
                  </Link>
                </li>
              </ul>
          
            </div>
          </div>
        </nav>
        </>
      )
    }
    
    export default Nav;