import { app } from "../firebase/config"; 
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    deleteUser,
    updateProfile,
    updateEmail,
    updatePassword,
    signOut,
    sendEmailVerification
} from "firebase/auth";
import { useState, useEffect } from "react";


export function useAuthentication() {
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [canceled, setCanceled] = useState(false); 
    const auth = getAuth(app); 

    const checkIfCanceled = () => {
        if(canceled) {
            return; 
        }
    }

    const createUser = async (data) => {
        checkIfCanceled();
        setLoading(true); 
        setError(null); 

        try {   
            const { name, email, password } = data;
            const { user } = await createUserWithEmailAndPassword(auth, email, password); 
            await updateProfile(user, { displayName: name}); 
            setLoading(false); 
            return user;
        } catch (error) { 
            console.log(error.message, typeof error.message); 
            let systemMessageError = ""; 
            if(error.message.includes("password")) {
                systemMessageError = "The password must contain at least 6 characters."; 
            } else if(error.message.includes("email-already")) {
                systemMessageError = "The email is already registered."; 
            } else {
                systemMessageError = "Error. Try again later."
            }
            setError(systemMessageError); 
        }

        setLoading(false); 
    }

    const verifyEmail = async (user) => {
        checkIfCanceled()
        setError(null); 
        setLoading(true) ;

        try {
            const result = await sendEmailVerification(user, null); 
            console.log(result); 
        } catch (error) {
            console.log(error.message, typeof error.message); 
        } finally {
            setLoading(false); 
        }
    }

    const login = async (data) => {
        checkIfCanceled(); 
        setError(null); 
        setLoading(true); 

        try {
            const { email, password } = data;
            await signInWithEmailAndPassword(auth, email, password); 
            setLoading(false);
        } catch (error) {
            console.log(error.message, typeof error.message); 
            let systemMessageError = ""; 
            if(error.message.includes("invalid-credential")) {
                systemMessageError = "Username or password is invalid."; 
            }else {
                systemMessageError = "Error. Try again later."
            }
            setError(systemMessageError); 
        }

        setLoading(false);
    }   

    const logout = async () => {
        checkIfCanceled(); 
        await signOut(auth); 
    }

    const updateUserData = async (field="name", user, value) => {
        checkIfCanceled(); 
        setError(null); 
        setLoading(true); 
        let msgError = ""; 
        try {
            if(field == "name") {   
                await updateProfile(user, { displayName: value });
                msgError = "Fail to update username.";
            } else if(field == "email") {
                await updateEmail(user, value); 
                msgError = "Fail to update email.";
            } else if (field == "password") {
                await updatePassword(user, value); 
                msgError = "Fail to update password.";            
            } else {
                return ;
            }
        } catch(e) {
            console.log(e.message, typeof e.message); 
            if(e.message.includes("operation-not-allowed")) {
                setError("You must verify your email first."); 
                setLoading(false); 
                return ;
            }
            setError(msgError); 
        } finally {
            setLoading(false);
        }
    }

    const removeUser = async (user) => {
        checkIfCanceled();
        setError(null);
        setLoading(true); 

        try {    
            await deleteUser(user); 
        } catch(e) {
            console.log(e.message, typeof e.message);
        } finally{
            setLoading(false); 
        }
    }

    useEffect(() => {
        return () => {
            setCanceled(true); 
        }
    }, []);
    
    return { error, loading, auth, createUser, logout, login, updateUserData, removeUser, verifyEmail }; 
}