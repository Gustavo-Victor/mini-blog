import { Link } from "react-router-dom"
import styles from "./About.module.css";


export default function About() {
    return (
        <div className={styles.about}>
            <h1>About Mini <span>Blog</span></h1>
            <p>This project consists of a mini using ReactJS on the Front-End and Firebase on the Back-End.
            </p>
            <p>Hope you like it!</p>
            <Link className="btn" to="/posts/create">Create Post</Link>
        </div>
    )
}