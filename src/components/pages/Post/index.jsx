
import { useParams } from "react-router-dom";
import { useFetchSingleDocument } from "../../../hooks/useFetchSingleDocument"
import styles from "./Post.module.css";


export default function Post() {
    const { id } = useParams(); 
    const { data: post, error, loading } = useFetchSingleDocument("posts", id); 

    const goBack = () => {
        history.back(); 
    }

    return (
        <div className={styles.post}>
            {loading && <p>Loading...</p>}
            {!loading && !post && <p>No data</p>}
            {error && <div className="error">{error}</div>}
            {post && 
                <div className={styles.post_info}>
                    <h1>{post.title}</h1>
                    <p className={styles.description}>{post.description ? post.description : "No description."}</p>
                    <p className={styles.author}>by <span>{post.createdBy}</span></p>                        
                
                    <img src={post.image} alt={post.title} />
                    <div className={styles.tags}>
                            {post.tags.map((tag) => (
                                <span key={tag}>#{tag}</span>
                            ))}
                        </div>
                    <div dangerouslySetInnerHTML={{__html: post.body}}></div>
                    <button onClick={goBack} className="btn btn-outline">Go back</button>
                </div>
            }
        </div>
    )
}