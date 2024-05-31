import { Link } from "react-router-dom"; 
import { useAuthValue } from "../../../context/AuthContext"
import { useFetchDocuments } from "../../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../../hooks/useDeleteDocument";
import styles from "./Dashboard.module.css"; 


export default function Dashboard() {
    const { user } = useAuthValue(); 
    const { data: posts, error, loading } = useFetchDocuments("posts", null, user.uid); 
    const { deleteDocument } = useDeleteDocument("posts");
    
    return (
        <div className={styles.dashboard}>
            <h1 className="title">Dashboard</h1>
            <p>Manage your posts</p>
            {!posts || posts.length == 0 || loading && <p>Loading...</p>}
            {error && <div className="error">{error}</div>}
            {posts && posts.length == 0 
                ?   
                <div className={styles.no_posts}>
                    You do not have any posts yet.
                </div>
                : 
                <section className={styles.posts}>
                    <div className={styles.post_header}>
                        <span>Title</span>
                        <span>Actions</span>
                    </div>
                    {posts && posts.map((post) => (
                        <div className={styles.post_body} key={post.id}>
                            <h4>{post.title}</h4>
                            <div>
                                <Link to={`/myposts/${post.id}`} className="btn btn-outline">See</Link>
                                <Link to={`/myposts/edit/${post.id}`} className="btn btn-outline">Edit</Link>
                                <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </section>
            }
            <Link className="btn" to="/myposts/create">New Post</Link>
        </div>
    )
}