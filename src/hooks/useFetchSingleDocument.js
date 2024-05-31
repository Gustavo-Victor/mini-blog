import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export function useFetchSingleDocument(collectionName, id) {
    const [data, setData] = useState(null); 
    const [canceled, setCanceled] = useState(false); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        if(canceled) return ;
        setLoading(true); 
        setError(null);

        const loadData = async () => {
            try {
                const documentReference = await doc(db, collectionName, id); 
                const document = await getDoc(documentReference); 
                setData(document.data()); 
            } catch (error) {
                console.log(error.message, typeof error.message);
                setError(error.message); 
            } finally {
                setLoading(false);
            }
        }
        loadData(); 

    }, [collectionName, id, canceled]); 


    useEffect(() => {
        return () => {
            setCanceled(true); 
        }
    }, []); 

    return { data, loading, error, }
}