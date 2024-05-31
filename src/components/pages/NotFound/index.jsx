import { Link } from "react-router-dom"; 
import styles from "./NotFound.module.css"; 


export default function NotFound() {
    return (
        <div className={styles.not_found}>
            <h1 className="title">Not Found 😥</h1>
            <p>I{"'"}m sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="btn">Go back</Link>
        </div>
    )
}