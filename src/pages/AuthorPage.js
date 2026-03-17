import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import BlogPost from "../components/BlogPost";
import ReactPaginate from "react-paginate";
import ScrollToTop from "../components/ScrollToTop";
import "./AuthorPage.css"; // Kreiraj CSS ako treba

const BASE_URL = process.env.REACT_APP_API_URL;

const AuthorPage = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchPosts = useCallback(() => {
    setLoading(true);
    const perPage = 6;
    fetch(`${BASE_URL}v2/posts?_embed&author=${id}&per_page=${perPage}&page=${currentPage + 1}`)
      .then((response) => {
        const totalPages = response.headers.get("X-WP-TotalPages");
        setPageCount(Number(totalPages) || 0);
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .finally(() => setLoading(false));
  }, [id, currentPage]);

  useEffect(() => {
    fetch(`${BASE_URL}v2/users/${id}?_embed`)
      .then((response) => response.json())
      .then((data) => {
        setAuthor(data);
      })
      .catch(() => setAuthor(null));
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPosts();
    }
  }, [id, fetchPosts]);

  if (loading) return <Loader />;
  if (!author) return <div className="container">Autor nije pronađen.</div>;

  return (
    <>
      <div className="author-page container">
        <Link to="/blog" className="btn btn-secondary mb-3">&larr; Nazad na blog</Link>
        <div className="author-header row align-items-center mb-5">
          <div className="col-md-3 text-center">
            <img
              src={author.avatar_urls?.[96] || "/default-avatar.png"}
              alt={author.name}
              className="img-fluid rounded-circle mb-3 author-page-avatar"
            />
          </div>
          <div className="col-md-9">
            <h1>{author.name}</h1>
            {author.description && <p>{author.description}</p>}
            <p>
              <strong>Email:</strong> {author.email ? "Zastupljeno" : "Nije naveden"} |{" "}
              <strong>Članaka:</strong> {pageCount > 0 ? pageCount * 6 : 0}
            </p>
          </div>
        </div>

        {posts.length > 0 ? (
          <>
            <h2>Članci od {author.name}</h2>
            <div className="row">
              {posts.map((post) => (
                  <BlogPost key={post.id} post={post} />
              ))}
            </div>
            {pageCount > 1 && (
              <ReactPaginate
                previousLabel={"Prethodna"}
                nextLabel={"Sljedeća"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={(e) => {
                  setCurrentPage(e.selected);
                  setPosts([]);
                  ScrollToTop();
                }}
                containerClassName={"pagination justify-content-center mb-5"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            )}
          </>
        ) : (
          <p>Ovaj autor još nema članaka.</p>
        )}
      </div>
    </>
  );
};

export default AuthorPage;
