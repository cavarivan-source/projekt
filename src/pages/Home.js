import { useState, useEffect } from "react";
import "./Home.css";
import { buildFallbackMarkup, enhanceHomeMarkup } from "./homeUtils";

const BASE_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [homeHtml, setHomeHtml] = useState("<p>Ucitavanje sadrzaja...</p>");

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`${BASE_URL}v2/pages/176?_embed`);

        if (!response.ok) {
          throw new Error("Ne mogu povuci podatke");
        }

        const data = await response.json();
        const rendered = data?.content?.rendered || "";
        const featuredMedia = data?._embedded?.["wp:featuredmedia"]?.[0];
        setHomeHtml(enhanceHomeMarkup(rendered, featuredMedia));
      } catch (err) {
        console.log(err.message);
        setHomeHtml(buildFallbackMarkup(null, "Greska pri ucitavanju sadrzaja."));
      }
    };

    fetchPage();
  }, []);

  return (
    <div className="home-page">
      <div className="home-overlay" />

      <div className="home-wp-content" dangerouslySetInnerHTML={{ __html: homeHtml }} />
    </div>
  );
};

export default Home;
