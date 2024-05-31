import { useState, useEffect } from "react";
import { db } from "../firebase/config"; 
import { updateDoc, doc, Timestamp } from "firebase/firestore";


export function useEditDocument(collectionName) {
    const [canceled, setCanceled] = useState(false); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 

    const checkIfCanceled = () => {
        if(canceled) return ;
    }

    const editDocument = async(id, data) => {
        checkIfCanceled(); 
        setLoading(true); 

        try {            
            const documentRef = await doc(db, collectionName, id); 
            await updateDoc(documentRef, {...data, updatedAt: Timestamp.now()}); 
            setLoading(false); 
        } catch (error) {
            console.log(error.message, typeof error.message)
            setError(error.message);
            setLoading(false); 
        }
    }


    useEffect(() => {
        return () => {
            setCanceled(true); 
        }
    }, [])

    return { editDocument, error, loading } ;     
}