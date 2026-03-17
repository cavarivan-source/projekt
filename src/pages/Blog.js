import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import ReactPaginate from "react-paginate";
import ScrollToTop from "../components/ScrollToTop";
import BlogPost from "../components/BlogPost";
import { Helmet } from "react-helmet-async";
import "./Blog.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}v2/categories?slug=vijestipolet`)
      .then((r) => r.json())
      .then((cats) => {
        if (cats.length > 0) setCategoryId(cats[0].id);
      });
  }, []);

  useEffect(() => {
    if (categoryId === null) return;

    setLoading(true);
    const per_page = 6;
    const url = `${BASE_URL}v2/posts?_embed&per_page=${per_page}&page=${currentPage + 1}&categories=${categoryId}`;

    fetch(url)
      .then((response) => {
        const totalPages = response.headers.get("X-WP-TotalPages");
        setPageCount(Number(totalPages));
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .finally(() => setLoading(false));
  }, [categoryId, currentPage]);

  return (
    <>
<Helmet>
      <title>Vijesti iz Poleta</title>
      <meta name="description" content="Pregled naših vijesti iz Poleta." />
    </Helmet>
      {loading && <Loader />}
      <div className="blog-page">
        <div className="container">
          <h1>Vijesti iz Poleta</h1>

          <div className="row">
            {posts.map((post) => {
              return <BlogPost key={post.id} post={post} />;
            })}
          </div>
          
          <ReactPaginate
            previousLabel={"← prethodna"}
            nextLabel={"sljedeća →"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={(e) => {
              setCurrentPage(e.selected);
              setPosts([]);
              ScrollToTop();
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
      </div>
    </>
  );
};

export default Blog;
