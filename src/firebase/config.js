import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const { 
    VITE_REACT_APP_API_KEY,
    VITE_REACT_APP_AUTH_DOMAIN,
    VITE_REACT_APP_PROJECT_ID,
    VITE_REACT_APP_STORAGE_BUCKET,
    VITE_REACT_APP_MESSAGING_SENDER_ID,
    VITE_REACT_APP_APPLICATION_ID,
    VITE_REACT_APP_MEASUREMENT_ID
 } = import.meta.env;


const firebaseConfig = {
    apiKey: VITE_REACT_APP_API_KEY,
    authDomain: VITE_REACT_APP_AUTH_DOMAIN,
    projectId: VITE_REACT_APP_PROJECT_ID,
    storageBucket: VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: VITE_REACT_APP_APPLICATION_ID,
    measurementId: VITE_REACT_APP_MEASUREMENT_ID
}

export const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app);