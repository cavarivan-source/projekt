import { useState, useEffect } from "react";

const Natjecanja = () => {
  const [page, setPage] = useState(null);

    
    useEffect (
    () => {
    fetch('https://front2.edukacija.online/backend/wp-json/wp/v2/pages/628?_embed')
    .then (response => response.json())
    .then(
      (data) => {
        setPage (data);
        console.log(data)

      }
    )
    }, [])


    if(!page) return <p>Učitavanje...</p>
  
  return (
    <div dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>    
  )
}


export default Natjecanja