/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./PostDetails.module.css"; 


export default function PostDetails({ post }) {
    
    const { id, title, description, image, createdBy, tags } = post ; 
    let formattedDescription = null; 
    if(description.length > 0) {
        formattedDescription = description.substring(0, 70); 
        formattedDescription += "..."; 
    }
    
    return (
        <div className={styles.post}>
            <img src={image} width={100} alt={title} />
            <div className={styles.post_info}>
                <div className={styles.post_align}>
                    <h3>{title}</h3>
                    <p>{formattedDescription ? formattedDescription : "No description."}</p>
                    <p>by<span className={styles.author}> {createdBy}</span></p>
                    <div className={styles.post_tags}>
                        {tags.map((tag) => (
                            <span key={tag}>#{tag}</span>
                        ))}
                    </div>
                </div>
                <Link to={`/myposts/${id}`} className="btn btn-outline">Learn more</Link>
            </div>
        </div>
    )
}