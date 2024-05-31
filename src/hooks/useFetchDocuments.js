import { useState, useEffect } from "react"; 
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore"; 


export function useFetchDocuments(collectionName, search = null, uid = null) {
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState(null); 
    const [canceled, setCanceled] = useState(false); 


    useEffect(() => {
        const loadData = async () => {
            if(canceled) return ;
            setLoading(true); 

            const collectionRef = collection(db, collectionName); 
            try {
                let q = ""; 
                //search 
                if(search) {
                    q = await query(collectionRef, where("tags", "array-contains", search), orderBy("createdAt", "desc")); 
                } else if (uid) {
                    q = await query(collectionRef, where("uid", "==", uid), orderBy("createdAt", "desc")); 
                } else {    
                    //dashboard
                    q = await query(collectionRef, orderBy("createdAt", "desc")); 
                }
                await onSnapshot(q, (querySnapshot) => {
                    setData(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id, 
                            ...doc.data()
                        }))
                    );
                })
            } catch (error) {
                console.log(error.message, typeof error.message); 
                setError(error.message); 
            } finally {
                setLoading(false); 
            }

        }
        loadData();
    }, [collectionName, search, uid, canceled]);

    useEffect(() => {
        return () => {
            setCanceled(true); 
        }
    }, [])

    return { error, loading, data }; 
}