import { useEffect, useState } from "react";
import { useAuthentication } from "../../../hooks/useAuthentication";
import styles from "./Login.module.css"; 


export default function Login(){
    
    const initialState = {email: "", password: ""}; 
    const [user, setUser] = useState(initialState);
    const [error, setError] = useState(null); 
    const { loading, error: authError, login } = useAuthentication();
    

    const handleChangeUser = (e) => {
        setUser(prevState => {
            return {...prevState, [e.target.name]: e.target.value}; 
        }); 
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const { email, password } = user; 
        
        if(!email || email.length == 0) {
            setError("Email is required.");
            return ;
        }

        if(!password || password.length == 0) {
            setError("Password is required.");
            return ;
        }

        console.log(user); 
        login(user); 
        setUser(initialState); 
        setError(""); 
        // navigate("/");
    }

    useEffect(() => {
        if(authError) {
            setError(authError);
        }
    }, [authError]); 
    
    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <p>Access your account and start writting</p>
            <form onSubmit={handleSubmit} id="register-form">
                <label>
                    <span>Email: </span>
                    <input
                        type="email"
                        name="email"
                        value={user.email || ""}
                        id="email"
                        placeholder="Your best email..."
                        onChange={handleChangeUser}
                    />
                </label>
                <label>
                    <span>Password: </span>
                    <input
                        type="password"
                        name="password"
                        value={user.password || ""}
                        id="password"
                        placeholder="Your password..."
                        onChange={handleChangeUser}
                    />
                </label>
                <button 
                    className="btn"
                    type="submit"
                    disabled={loading}
                    >
                    {loading ? "Loading..." : "Enter"}                
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}