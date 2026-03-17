import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ReactPaginate from "react-paginate";
import ScrollToTop from "../components/ScrollToTop";
import BlogPost from "../components/BlogPost";

const Kategorije = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetch (`https://front2.edukacija.online/backend/wp-json/wp/v2/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    setLoading(true);

    const perPage = 3;

    const url = `https://front2.edukacija.online/backend/wp-json/wp/v2/posts?categories=${selectedCategory}&per_page=${perPage}&page=${currentPage + 1}&_embed`;
    fetch(url)
      .then((response) => {
        const totalPages = response.headers.get("X-WP-TotalPages");
        setPageCount(Number(totalPages) || 0);
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(Number(e.target.value));
    setPosts([]);
  };

  return (
    <>
      {loading && <Loader />}

      <div className="container blog-page">
        <div className="row">
          <div className="col-md-12">
            <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="" disabled>
                Odaberite kategorije
              </option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          {posts.map((post) => {
            
            return (
              <BlogPost key={post.id} post={post} />
            );
          })}
        </div>
        <ReactPaginate
          previousLabel={"next"}
            nextLabel={"→prev"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={(e) => {
              setCurrentPage(e.selected)
              setPosts([])
              ScrollToTop()
                     }}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
            />
      </div>
    </>
  );
};

export default Kategorije;