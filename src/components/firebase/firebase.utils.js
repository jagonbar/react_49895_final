import './firebase.config.js'

import {getFirestore, collection, getDocs, query, where} from "firebase/firestore";
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
// export default queryCollection