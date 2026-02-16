//import './Blog.css';
//import post from '../components/zadaci/data/blogsingle.json';

//const BlogSingle = () => {

    import { useState,useEffect } from 'react';
    
import { data, useParams } from 'react-router-dom';
   
    
    const LigaSingle = () => {
   const{slug} = useParams();
   const [post,setPost] = useState(null);
   useEffect(() => {
fetch(`https://front2.edukacija.online/backend/wp-json/wp/v2/klub?slug=${slug}&_embed`)
.then(response => response.json ())
.then((data) => setPost(data[0]))

   }, [slug])

   if (!post) {
    return <p>Učitavanje</p>
   }
  return (
    <div className="liga-single">
        <div class="masthead" style={{
         backgroundImage: "url("+post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url+")"
        }}>
            <div class="container position-relative px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                        <div class="post-heading">
                            <h1>{post.title.rendered}</h1>
                          
                            <span class="meta">
       
                                , {new Date(post.date).toLocaleDateString("hr-HR")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <article class="mb-4">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>    
                    </div>
                </div>
            </div>
        </article>
    </div>
  );
};

export default LigaSingle;