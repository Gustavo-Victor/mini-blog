import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";


export function useDeleteDocument(collecitonName) {
    const [canceled, setCanceled] = useState(false); 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 

    const checkCanceled = () => {
        if(canceled) return ;
    }

    const deleteDocument = async (id) => {
        checkCanceled(); 
        setLoading(true); 
        try {
            //const collectionRef = await collection(db, collecitonName); 
            const deletedDocument = await deleteDoc(doc(db, collecitonName, id));   
            console.log(deletedDocument);         
        } catch(e) {
            console.log(e.message, typeof e.message);
            setError(e.message); 
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        return () => {
            setCanceled(true); 
        }
    }, []);

    return { error, loading, deleteDocument };
}