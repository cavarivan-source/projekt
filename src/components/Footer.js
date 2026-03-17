import ScrollToTop from "./ScrollToTop";
import { Link } from "react-router-dom";
import poletLogo from "../img/Polet.png";

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.297-.048c.852-.04 1.433-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923 3.9 3.9 0 0 0 .923-1.417c.198-.509.333-1.09.372-1.943C15.99 10.445 16 10.173 16 8.001c0-2.174-.01-2.446-.048-3.3-.039-.85-.174-1.432-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.09-.333-1.943-.372C10.444.01 10.172 0 8 0m0 1.441c2.136 0 2.389.008 3.232.047.78.035 1.204.166 1.486.275.375.146.643.32.923.6.281.281.455.549.6.924.11.281.24.705.276 1.485.038.843.046 1.096.046 3.232s-.008 2.389-.046 3.232c-.036.78-.166 1.204-.275 1.486a2.5 2.5 0 0 1-.6.923 2.5 2.5 0 0 1-.924.6c-.282.11-.705.24-1.485.276-.843.038-1.096.046-3.232.046s-2.389-.008-3.232-.046c-.78-.036-1.204-.166-1.486-.275a2.5 2.5 0 0 1-.923-.6 2.5 2.5 0 0 1-.6-.924c-.11-.282-.24-.705-.276-1.485-.038-.843-.046-1.096-.046-3.232s.008-2.389.046-3.232c.036-.78.166-1.204.275-1.486.146-.375.32-.643.6-.923.281-.281.549-.455.924-.6.282-.11.705-.24 1.485-.276.843-.038 1.096-.046 3.232-.046M8 3.892A4.109 4.109 0 1 0 8 12.11 4.109 4.109 0 0 0 8 3.892m0 6.776A2.667 2.667 0 1 1 8 5.334a2.667 2.667 0 0 1 0 5.334m4.271-6.962a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92" />
  </svg>
);

const Footer =() => {
    return (
        <>

        <footer className="club-footer">
          <section className="club-footer-main">
            <div className="container">
              <div className="row g-4 club-footer-grid">
                <div className="col-lg-6 col-md-12">
                  <h4>Kontakt</h4>
                  <div className="club-footer-contact-layout">
                    <div className="club-footer-brand-block">
                      <Link to="/" className="club-footer-brand">
                        <img src={poletLogo} alt="NK Polet logo" />
                      </Link>
                      <p className="club-footer-brand-title">Nogometni klub Polet</p>
                      <p className="club-footer-brand-subtitle">Sveta Klara, Zagreb</p>
                    </div>

                    <ul className="club-footer-info-list">
                      <li>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=Mrk%C5%A1ina+42%2C+10020+Zagreb"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="club-footer-highlight-link"
                        >
                          Adresa: Mrkšina 42, 10020 Zagreb
                        </a>
                      </li>
                      <li>
                        <a href="mailto:info@nkpolet.hr">E-mail: info@nkpolet.hr</a>
                      </li>
                      <li>
                        <a href="tel:+385981747339">Telefon: +385 98 174 7339</a>
                      </li>
                      <li className="club-footer-note">Treninzi: ponedjeljak - petak, 18:00 - 21:00</li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6">
                  <h4>Izbornik</h4>
                  <ul className="club-footer-link-list">
                    <li><Link to="/">Naslovna</Link></li>
                    <li><Link to="/blog">Vijesti</Link></li>
                    <li><Link to="/ekipe">Ekipe</Link></li>
                    <li><Link to="/natjecanja">Natjecanja</Link></li>
                    <li><Link to="/clanstvoikontakt">Članstvo i kontakt</Link></li>
                  </ul>
                </div>

                <div className="col-lg-3 col-md-6">
                  <h4>Klub</h4>
                  <div className="club-footer-club-row">
                    <p>Najnovije objave i dnevne novosti pratite na našim društvenim mrežama.</p>
                    <div className="club-footer-socials-inline">
                      <a
                        href="https://www.facebook.com/profile.php?id=100094300556261"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="club-footer-social-link club-footer-social-link-facebook"
                        aria-label="Facebook"
                      >
                        <FacebookIcon />
                      </a>
                      <a
                        href="https://www.instagram.com/nk.polet/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="club-footer-social-link club-footer-social-link-instagram"
                        aria-label="Instagram"
                      >
                        <InstagramIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="club-footer-bottom">
                <p>© {new Date().getFullYear()} NK Polet Sveta Klara. Sva prava pridržana.</p>
                <button className="club-footer-top" onClick={ScrollToTop}>Natrag na vrh</button>
              </div>
            </div>
          </section>
        </footer>

        </>

            )
}

export default Footer;