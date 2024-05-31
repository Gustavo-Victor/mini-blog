import { useState, useEffect, useReducer } from "react"; 
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore"


const initialState = {
    loading: false, 
    error: null
}; 

const LOADING = "LOADING"; 
const INSERTED_DOC = "INSERTED_DOC";
const ERROR = "ERROR";  

const insertReducer = (initialState, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true, error: null }; 

        case INSERTED_DOC:
            return { loading: false, error: null }

        case ERROR:
            return { loading: false, error: action.payload }

        default: 
            return initialState; 
    }
}


export function useInsertDocument(docCollection) {
    const [state, dispatch] = useReducer(insertReducer, initialState); 
    const [canceled, setCanceled] = useState(false); 

    const checkCanceledBeforeDispatch = (action) => {
        if(!canceled) {
            dispatch(action);
        }
    }

    const insertDocument = async (document) => {
        checkCanceledBeforeDispatch({type: LOADING}); 

        try {
            const newDocument = {...document, createdAt: Timestamp.now()}
            const insertedDocument = await addDoc(collection(db, docCollection), newDocument)
             
            checkCanceledBeforeDispatch({
                type: INSERTED_DOC,
                payload: insertedDocument
            }); 
        } catch (error) {
            console.log(error.message, typeof error.message); 
            checkCanceledBeforeDispatch({type: ERROR, payload: error.message}); 
        }

    }


    useEffect(() => {
        return () => {
            setCanceled(true); 
        }
    }, []); 

    return { insertDocument, state }
}


