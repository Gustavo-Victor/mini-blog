import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../../context/AuthContext"; 
import { useInsertDocument } from "../../../hooks/useInsertDocument"
import styles from "./CreatePost.module.css"; 


export default function CreatePost() {
    const initialState = { 
        title: "",
        description: "",
        image: "",
        body: "",
        tags: []
    };
    const [post, setPost] = useState(initialState); 
    const [formError, setFormError] = useState(""); 
    const { insertDocument, state: { error, loading } } = useInsertDocument("posts");
    const { user } = useAuthValue(); 
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        let value = e.target.value; 
        let name = e.target.name; 

        if(name == "tags") {
            const postTags = value.trim().toLowerCase().split(","); 
            setPost(prevState => {
                return {...prevState, tags: [...postTags]}
            }); 
            return ;
        }

        setPost(prevState => {
            return {...prevState, [name]: value}; 
        }); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();  
        setFormError(""); 
        

        // get data
        const { title, description, body, image, tags } = post;

        // validate image url
        try {
            new URL(image); 
        } catch(e) {
            setFormError("Invalid URL"); 
            return ;
        }


        // validations
        if(!title || title.length == 0) {
            setFormError("Title is required.");
            return ;
        }

        if(!image || image.length == 0) {
            setFormError("Image URL is required.");
            return ;
        }

        if(!body || body.length == 0) {
            setFormError("Content is required.");
            return ;
        }

        if(!tags || tags.length == 0 || tags.join("").length == 0) {
            setFormError("Add at least one tag.");
            return ;
        }

        if(formError) return ;

        // insert document
        insertDocument({
            title,
            description, 
            image, 
            body, 
            tags, 
            uid: user.uid,
            createdBy: user.displayName
        })

        // reset states
        console.log(post); 
        setPost(initialState);

        // redirect
        navigate("/"); 
    }

    useEffect(() => {
        if(error) {
            setFormError(error);
        }
    }, [error]); 

    return (
        <div className={styles.create_post}>
            <h1>Create Post</h1>
            <p>Write about whatever you want and share your knowledge.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title: </span>
                    <input 
                        type="text"
                        name="title"
                        id="title"
                        value={post.title || ""}
                        placeholder="Post title..."
                        maxLength={30}
                        minLength={7}
                        onChange={handleChange} />
                </label>
                <label>
                    <span>Description: </span>
                    <input 
                        type="text"
                        name="description"
                        id="description"
                        value={post.description || ""}
                        placeholder="Post description..."
                        onChange={handleChange} />
                </label>
                <label>
                    <span>Image: </span>
                    <input 
                        type="text"
                        name="image"
                        id="image"
                        value={post.image || ""}
                        placeholder="Post image url..."                        
                        onChange={handleChange} />
                </label>
                <label>
                    <span>Content: </span>
                    <textarea 
                        name="body"
                        id="body"
                        value={post.body || ""}
                        placeholder="Post content..."                    
                        onChange={handleChange}></textarea>
                </label> 
                <label>
                    <span>Tags: </span>
                    <input 
                        type="text"
                        name="tags"
                        id="tags"
                        value={post.tags.join(",") || ""}
                        placeholder="Post content..."                    
                        onChange={handleChange}/>
                </label> 
                <button 
                    disabled={loading}
                    className="btn"
                    type="submit">
                    {loading ? "Loading..." : "Create"}
                </button>
                {formError && <div className="error">{formError}</div>}
            </form>
        </div>
    )
}