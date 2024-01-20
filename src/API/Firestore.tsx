import { firestore, auth } from "../firebaseConfig";

import {
  addDoc,
  collection,
  doc,
  updateDoc,
//where,
  getDocs,
  getDoc,
  deleteDoc,serverTimestamp, Timestamp
  //orderBy,
  // query,onSnapshot,
} from "firebase/firestore";
// import { Timestamp } from 'firebase/firestore'

// const current_timestamp = Timestamp.fromDate(new Date())

// if(!my_data.updated_at.isEqual(current_timestamp)){ ... }
const docs = collection(firestore, "docs");

type payloadType = {
  value: string;
  title: string;
};




// const modifiedAt = serverTimestamp()
export const createDoc = (payload: payloadType) => {
  addDoc(docs, {
    ...payload,
    userId: auth.currentUser?.uid,
    userName: auth.currentUser?.displayName,
    createdAt:serverTimestamp(),
    // modifiedAt:serverTimestamp()
    // modifiedAt:Timestamp
    // modifiedAt:docRef.update({ updated_at:modifiedAt})
  });
};


export const getDocuments=(setDocs:any)=>{
  getDocs(docs).then((response)=>{
    setDocs(response.docs.map((doc)=>{
      return {...doc.data(),id:doc.id}
    }))
  })
  }

//editing document where stuff gets modified...



export const editDoc = (payload:any,id:string) => {

  const docToEdit=doc(docs,id)
  updateDoc(docToEdit,{...payload,modifiedAt:serverTimestamp()},id);

        // const docRef = db.collection('docs').doc(id);    

// Update the timestamp field with the value from the server
              // const res = await docRef.update({
              //   timestamp: modifiedAt.serverTimestamp()
              // });
  // const docRef=doc(firestore,'docs',modifiedAt)

  // updateDoc(docRef,modifiedAt)
};





//----------------------------------------------
export const getCurrentDoc = (id:string,setCurrentDocument:any) => {

  const docToGet=doc(docs,id)

  getDoc(docToGet).then((response)=>{
    setCurrentDocument(response.data())
    // console.log(response.data(),"::::response")
  }).catch((err)=>{
    console.log(err)
  })
};

//Function for deleting the document..
export const deleteDocument = async (id:string) => {
  await deleteDoc(doc(docs,id))
};



//queries---------------------------


// const q=query(docs, where("userId", "==", auth.currentUser?.uid),orderBy('title','desc'));

// onSnapshot(q,(snapshot)=>{
//   let docus=[]
//   snapshot.docus.forEach((docu)=>{
//     docus.push({...docu.data(),id:docu.id})
//   })
//   console.log(docus)
// })
//-------------------------

// export const getDocuments = (setDocs: any) => {
//   const docQuery = query(docs, where("userId", "==", auth.currentUser?.uid),orderBy('title','desc'));


//       getDocs(docs).then((response)=>{
//     setDocs(response.docs.map((doc)=>{
//       return {...doc.data(),id:doc.id}
//     }))
//     // setDocs(
//     //   response.docs.map((doc) => {
//     //     return { ...doc.data(), id: doc.id };
//     //   })
//     // );
//   });
//   console.log(docs)
// };



// export const getCurrentDoc = async (
//   id: string,
//   setValue: any,
//   setTitle: any
// ) => {
//   let docToGet = doc(docs, id);
//   await onSnapshot(docToGet, (response) => {
//     setValue(response.data()?.value);
//     setTitle(response.data()?.title);
//   });
// };