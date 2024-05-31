import { useQuery } from "../../../hooks/useQuery";
import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../../hooks/useFetchDocuments";
import PostDetails from "../../ui/PostDetails";
import "./Search.css";


export default function Search() {
    const query = useQuery();
    const search = query.get("q"); 
    const { data: posts, error, loading } = useFetchDocuments("posts", search);

    return (
        <div className="search">
            <h1 className="title">Search for {`"${search}"`}</h1>
            <section className="posts_section">
                {loading && <p>Loading...</p>}
                {posts && posts.length == 0 && 
                    <div className="no_posts">
                        <p>No posts found for this query 😥</p>
                        <Link className="btn btn-outline" to="/">Go back</Link>
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