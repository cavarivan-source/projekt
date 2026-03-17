import { useState, useEffect } from "react";
import "./Natjecanja.css";

const Natjecanja = () => {
  const [page, setPage] = useState(null);

    
    useEffect (
    () => {
    fetch(`https://front2.edukacija.online/backend/wp-json/wp/v2/pages/628?_embed`)
    .then (response => response.json())
    .then(
      (data) => {
        setPage (data);
      }
    )
    }, [])


    if(!page) return <p>Učitavanje...</p>
  
  return (
    <div className="natjecanja-page" dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>
  )
}


export default Natjecanja