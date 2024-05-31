import { useState } from "react";
import { useFetchDocuments } from "../../../hooks/useFetchDocuments";
import { Link, useNavigate } from "react-router-dom";
import PostDetails from "../../ui/PostDetails";
import "./Home.css";


export default function Home() {
    const [query, setQuery] = useState(""); 
    const { data: posts, loading, error } = useFetchDocuments("posts");
    const navigate = useNavigate(); 

    const handleChangeQuery = (e) => {
        setQuery(e.target.value); 
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(query); 

        if(query) {
            return navigate(`/search?q=${query}`); 
        }

        setQuery(""); 
    }

    return (
        <div className="home">
            <h1 className="title">See our latest Posts</h1>
            <form onSubmit={handleSubmit} className="search_form">
                <input 
                    type="text"
                    name="search"
                    id="search"
                    value={query || ""}
                    onChange={handleChangeQuery}
                    placeholder="Search for tags..." />
                <button className="btn btn-dark">Search</button>
            </form>
            <section className="posts_section">
                {/* <h2 className="subtitle">Posts</h2> */}
                {loading && <p>Loading...</p>}
                {posts && posts.length == 0 && 
                    <div className="no_posts">
                        <p>No posts found</p>
                        <Link className="btn" to="/myposts/create">Create your first post</Link>
                    </div>
                }
                {posts && 
                    <div className="posts">
                        {posts.map((post) => (
                            <PostDetails key={post.id} post={post} />
                        ))}
                    </div>
                }
                {error && <div className="error">{error}</div>}
            </section>
        </div>
    )
}