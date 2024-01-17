import './firebase.config.js'

import {getFirestore, collection, getDocs, getDoc, doc, query, where, addDoc} from "firebase/firestore";
/**
 * Recupera documentos de una colección de Firestore basados en una consulta.
 *
 * @param {string} collectionName - El nombre de la colección de Firestore.
 * @param {string[]} queryString - La cadena de consulta para filtrar los documentos.
 * @return {Object[]} Un array de documentos de la colección.
 */
export const queryCollection = async (collectionName, queryString) => {
    console.log({queryString})
    const db = getFirestore();
    const c  = collection(db,collectionName);
    let queryFilter
    if(queryString && queryString.length > 0){
        queryFilter=query(c,where(...queryString));
    }else{
        queryFilter=query(c);
    }
    
    const snapshot = await getDocs(queryFilter);
    const documents = snapshot.docs.map((doc) => {
        return {id:doc.id, ...doc.data()}
    });
    return documents;
}
/**
 * Recupera un documento de una colección en la base de datos de Firestore.
 *
 * @param {string} collectionName - El nombre de la colección.
 * @param {string} documentId - El ID del documento que se va a recuperar.
 * @return {object} Retorna los datos del documento recuperado.
 */
export const queryDocument = async (collectionName, documentId) => {
    console.log({documentId})   
    const db = getFirestore();
    const d  = doc(db, collectionName, documentId);
    const docSnapshot = await getDoc(d);
    return docSnapshot.data();
}



/**
 * Agrega un documento a la colección especificada en Firestore.
 *
 * @param {Object} newDocument - El documento que se va a agregar.
 * @param {string} collectionName - El nombre de la colección donde se va a agregar el documento.
 * @return {string} El ID del nuevo documento agregado.
 */
export const addDocument = async (newDocument, collectionName)=>{    
    const db = getFirestore();
    const ordersCollection = collection(db, collectionName);
    const d = await addDoc(ordersCollection, newDocument)
    console.log("debug",d.id)
    return d.id
}

