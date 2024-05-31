import { useEffect, useState, } from "react";
import { useAuthentication } from "../../../hooks/useAuthentication";
import styles from "./Register.module.css";


export default function Register() {
    const initialState = {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    }
    const [user, setUser] = useState(initialState);
    const [error, setError] = useState("");
    const { createUser, error: authError, loading } = useAuthentication(); 

    const handleChangeUser = (e) => {
        setUser(prevState => {
            return {
                ...prevState, [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, password_confirmation } = user;

        if (!name || name.length == 0) {
            setError("Name is required.");
            return;
        }

        if (!email || email.length == 0) {
            setError("Email is required.");
            return;
        }

        if (!password || password.length == 0) {
            setError("Password is required.");
            return;
        }

        if (!password_confirmation || password_confirmation.length == 0) {
            setError("Confirm your password.");
            return;
        }

        if (password !== password_confirmation) {
            setError("Passwords don't match.");
            return;
        }

        const userTemplate = { name, email, password };
        const response = await createUser(userTemplate); 
        console.log(response); 

        setUser(initialState);
        setError("");
    }

    useEffect(() => {
        if(authError) {
            setError(authError); 
        }
    }, [authError]); 

    return (
        <div className={styles.register}>
            <h1>Register</h1>
            <p>Create your user to share your experiences and ideas.</p>
            <form onSubmit={handleSubmit} id="register-form">
                <label>
                    <span>Name: </span>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={user.name || ""}
                        placeholder="Your username..."
                        onChange={handleChangeUser}
                    />
                </label>
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
                <label>
                    <span>Password confirmation: </span>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={user.password_confirmation || ""}
                        id="password_confirmation"
                        placeholder="Your password again..."
                        onChange={handleChangeUser}
                    />
                </label>
                <button 
                    className="btn"
                    type="submit"
                    disabled={loading}
                    >
                    {loading ? "Loading..." : "Register"}                
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}