import { useState, useEffect } from "react";
import { useAuthValue } from "../../../context/AuthContext"
import { useEditDocument } from "../../../hooks/useEditDocument";
import { useFetchSingleDocument } from "../../../hooks/useFetchSingleDocument";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditPost.module.css"; 


export default function EditPost() {
    
    const { id } = useParams();
    const { data, error: fetchError, loading } = useFetchSingleDocument("posts", id);
    const [error, setError] = useState(false)
    const [post, setPost] = useState({...data} || null); 
    const { editDocument, error: updateError, loading: updateLoading } = useEditDocument("posts"); 
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
        setError(null); 

        // get data
        const { title, description, body, image, tags } = post;

        // validations
        if(!title || title.length == 0) {
            setError("Title is required.");
            return ;
        }
        
        if(!image || image.length == 0) {
            setError("Image URL is required.");
            return ;
        }
        
        
        if(!body || body.length == 0) {
            setError("Content is required.");
            return ;
        }
        
        if(!tags || tags.length == 0 || tags.join("").length == 0) {
            setError("Add at least one tag.");
            return ;
        }
        
        // validate image url
        try {
            new URL(image); 
        } catch(e) {
            setError("Invalid URL"); 
            return ;
        }

        if(error) return ;

        // update doc
        console.log(post); 
        const data = {
            title,
            description, 
            image, 
            body, 
            tags, 
            uid: user.uid,
            createdBy: user.displayName
        }
        
        editDocument(id, data); 
        navigate("/myposts"); 
        setPost({}); 
    }

    useEffect(() => {
        if(data) {
            setPost({...data}); 
        }
    }, [data]); 

    useEffect(() => {
        if(fetchError) {
            setError(fetchError)
        }
    }, [fetchError]); 

    useState(() => {
        if(updateError) {
            setError(updateError);
        }
    }, [updateError]); 
  
    return (
        <div className={styles.edit_post}>
        <h1>Edit Post</h1>
        <p>Write about whatever you want and share your knowledge.</p>
        {loading && <p>Loading...</p>}

        {post && 
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
                        onChange={handleChange}
                        />
                </label>
                <label>
                    <span>Description: </span>
                    <input 
                        type="text"
                        name="description"
                        id="description"
                        value={post.description || ""}
                        maxLength={90}
                        placeholder="Post description..."
                        onChange={handleChange}
                        />
                </label>
                <label>
                    <span>Image: </span>
                    <input 
                        type="text"
                        name="image"
                        id="image"
                        value={post.image || ""}                       
                        placeholder="Post image url..." 
                        onChange={handleChange}
                        />
                </label>
                <p>Image preview: </p>
                <div className={styles.preview_container}>
                    <img src={post.image} alt={post.title} />
                </div>
                <label>
                    <span>Content: </span>
                    <textarea 
                        name="body"
                        id="body"
                        value={post.body || ""}               
                        placeholder="Post content..."   
                        onChange={handleChange}  
                        ></textarea>
                </label> 
                <label>
                    <span>Tags: </span>
                    <input 
                        type="text"
                        name="tags"
                        id="tags"
                        value={post.tags || ""}             
                        placeholder="Post content..."    
                        onChange={handleChange}   
                        />
                </label> 
                <button 
                    className="btn"
                    type="submit"
                    disabled={updateLoading}
                    >
                    {updateLoading ? "Loading..." : "Edit"}
                </button>                
                {error && <div className="error">{error}</div>}
            </form>
        }
    </div>
    )
}