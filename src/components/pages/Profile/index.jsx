import { useState, useEffect } from "react";
import { useAuthValue } from "../../../context/AuthContext";
import { useAuthentication } from "../../../hooks/useAuthentication"
import styles from "./Profile.module.css";


export default function Profile() {
    const { user } = useAuthValue();
    const { updateUserData, removeUser, error: authError, verifyEmail } = useAuthentication();
    const initialState = { 
        name: user.displayName,
        email: user.email,
        password: "" 
    }
    const [formData, setFormData] = useState(initialState || {}); 
    const [error, setError] = useState(null); 

    const checkEmail = () => {
        console.log(user.email); 
        verifyEmail(user); 
    }

    const handleChangeData = (e) => {
        setFormData(prevState => {
            return {...prevState, [e.target.name]: e.target.value}; 
        }); 
    }

    const updateUserName = (e) => {
        e.preventDefault(); 
        const { name } = formData; 

        if(!name || name.length == 0) {
            setError("Name is required.");
            return ;
        }
        console.log(name);
        updateUserData("name", user, name); 
        
    }

    const updateUserEmail = (e) => {
        e.preventDefault(); 

        const { email } = formData; 

        if(!email || email.length == 0) {
            setError("Email is required.");
            return ;
        }
        console.log(email);
        updateUserData("email", user, email); 
    }

    const updateUserPassword = (e) => {
        e.preventDefault(); 

        const { password } = formData; 

        if(!password || password.length == 0) {
            setError("Password is required.");
            return ;
        }
        console.log(password);
        updateUserData("password", user, password); 
    }

    const removeAccount = () => {
        removeUser(user); 
    }


    useEffect(() => {
        if(authError) {
            setError(authError); 
        }
    }, [authError]);

    return (
        <div className={styles.profile}>
            <h1>Your profile</h1>
            <p>Update your profile data as you wish</p>

            {!user.emailVerified && <button onClick={checkEmail}>Verify email</button>}
        
            <div className={styles.profile_info}>
                <div className={styles.forms}>
                    <form onSubmit={updateUserName} id="form-update-name">
                        <input 
                            type="text"
                            name="name"
                            placeholder="Your username..."
                            minLength={7}
                            maxLength={60}
                            value={formData.name || ""}
                            onChange={handleChangeData} />
                        <button 
                            type="submit"
                            className="btn btn-outline">
                            Update
                        </button>
                    </form>

                    <form onSubmit={updateUserEmail} id="form-update-email">
                        <input 
                            type="text"
                            name="email"
                            placeholder="Your email..."
                            minLength={13}
                            maxLength={70}
                            value={formData.email || ""}
                            onChange={handleChangeData} />
                            <button 
                                type="submit"
                                className="btn btn-outline">
                                Update
                            </button>
                    </form>

                    <form onSubmit={updateUserPassword} id="form-update-password">
                        <input 
                            type="password"
                            name="password"
                            placeholder="Your password..."
                            minLength={6}
                            maxLength={32}
                            value={formData.password || ""}
                            onChange={handleChangeData} />
                            <button
                                type="submit" 
                                className="btn btn-outline">
                                Update
                            </button>
                    </form>
                </div>
                
                <button onClick={removeAccount} className="btn btn-outline btn-danger">Delete Account</button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}