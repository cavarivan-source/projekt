import { Link } from "react-router-dom";
import Loader from "../components/Loader";

import { useEffect, useState } from "react";
const Liga = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const[liga, setLiga]= useState([]);
  const[izabranaLiga,setIzabranaLiga] = useState("");


  useEffect(() => {
    fetch("https://front2.edukacija.online/backend/wp-json/wp/v2/liga")
      .then((response) => response.json())
      .then((data) => setLiga(data));
  }, []);



  useEffect(() => {
    setLoading(true);

    let url = "https://front2.edukacija.online/backend/wp-json/wp/v2/klub?_embed";
    
    if(izabranaLiga) url += "&liga=" + izabranaLiga;
 


    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .finally(() => setLoading(false));
  }, [izabranaLiga]);

  return (
    <>
      {loading && <Loader/>}
      <div className="blog-page">
        <div className="container">
          <h1>Liga</h1>
          <select
                className="form-select"
                value={izabranaLiga}
                onChange={(e) => setIzabranaLiga(e.target.value)}
              >
                <option value="">Sve Lige</option>

                {liga.map((liga) => (
                  <option key={liga.id} value={liga.id}>
                    {liga.name}
                  </option>
                ))}
              </select>
          <div className="row">
             {posts.map((post) => {
            const image =
              post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
                ?.full?.source_url;
            return (
              <div key={post.id} className="col-md-4 mb-4 blog-post">
                {image && (
                    <Link to={'/liga/' + post.slug}>
                  <img src={image} className="mb-3" alt={post.title.rendered} />
                  </Link>
                )}
                <Link to={'/liga/' + post.slug}>
                <h2>{post.title.rendered}</h2>
                </Link>
                <div
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <p>
                  {post._embedded?.author?.[0]?.name} |{" "}
                  {new Date(post.date).toLocaleDateString("hr-HR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Liga;