import { useState, useEffect } from 'react';

import './Blog.css';
import { useParams } from 'react-router-dom';
import Author from '../components/Author';

const BASE_URL = process.env.REACT_APP_API_URL;

const BlogSingle = () => {
    const {slug} = useParams();
    const [post, setPost] = useState(null);
    

    useEffect (
        () => {
            fetch (`${BASE_URL}v2/posts?slug=${slug}&_embed`)
            .then(response => response.json())
            .then(
                (data) => {
                    setPost(data[0]);
                    
                }
            )

        }, [slug]
    )
    
    if(!post) return <p>Učitavanje</p>

    const featuredImageUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full?.source_url;

  return (
    <div className="blog-single">
        <div className="masthead">
            {featuredImageUrl && (
                <img src={featuredImageUrl} alt="" className="masthead-bg-image" />
            )}

            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="post-heading">
                            <h1>{post.title.rendered}</h1>
                        
                            <Author post={post}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <article className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>    
                    </div>
                </div>
            </div>
        </article>
    </div>
  )
}

export default BlogSingle