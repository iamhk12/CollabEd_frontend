import {
  addDoc,
  collection,
  doc,
  updateDoc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import { auth, firestore} from "../firebaseConfig";

const docsCollection = collection(firestore, "docs");
const docs = collection(firestore, "docs");
const userDocumentsCollection = collection(firestore, "userDocuments");

type PayloadType = {
  value: string;
  title: string;
};
export const createDoc = async (payload: PayloadType, shareWithEmail: string | null = null) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    // Handle the case where the user is not authenticated
    return;
  }

  // Add document to 'docs' collection
  const docRef = await addDoc(docsCollection, {
    ...payload,
    userId: currentUser.email, // Use email as the user ID
    userName: currentUser.displayName,
    createdAt: serverTimestamp(),
  });

  // Add reference to the new document in the user's 'userDocuments' collection
  const userDocRef = doc(userDocumentsCollection, currentUser.email);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userDocData = userDocSnap.data();
    if (userDocData?.documents) {
      const updatedDocuments = [...userDocData.documents, docRef.id];
      await updateDoc(userDocRef, { documents: updatedDocuments });
    }
  } else {
    await setDoc(userDocRef, { documents: [docRef.id] });
  }

  // Share the document with the specified user via email
  if (shareWithEmail) {
    const sharedUserDocRef = doc(userDocumentsCollection, shareWithEmail);
    const sharedUserDocSnap = await getDoc(sharedUserDocRef);

    if (sharedUserDocSnap.exists()) {
      const sharedUserDocData = sharedUserDocSnap.data();
      if (sharedUserDocData?.documents) {
        const sharedDocuments = [...sharedUserDocData.documents, docRef.id];
        await updateDoc(sharedUserDocRef, { documents: sharedDocuments });
      }
    } else {
      await setDoc(sharedUserDocRef, { documents: [docRef.id] });
    }
  }
};

export const getDocuments = async (setDocs: any) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    // Handle the case where the user is not authenticated
    return;
  }

  const userDocRef = doc(userDocumentsCollection, currentUser.email);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userDocData = userDocSnap.data();

    if (userDocData?.documents) {
      const docsPromises = userDocData.documents.map(async (docId: string) => {
        const docRef = doc(docsCollection, docId);
        const docSnap = await getDoc(docRef);

        // Check if the document exists in the main 'docs' collection
        if (docSnap.exists()) {
          return { ...docSnap.data(), id: docSnap.id };
        } else {
          // If the document doesn't exist in 'docs', remove it from 'userDocuments'
          const updatedDocuments = userDocData.documents.filter(
            (filteredDocId: string) => filteredDocId !== docId
          );
          await updateDoc(userDocRef, { documents: updatedDocuments });
          return null; // Indicate that the document is not present in 'docs'
        }
      });

      const filteredDocs = (await Promise.all(docsPromises)).filter(Boolean); // Filter out null values
      setDocs(filteredDocs);
    }
  }
};





export const editDoc = (payload:any,id:string) => {

  const docToEdit=doc(docs,id)
  updateDoc(docToEdit,{...payload,modifiedAt:serverTimestamp()},id);

};



export const getCurrentDoc = (id:string,setCurrentDocument:any) => {

  const docToGet=doc(docs,id)

  getDoc(docToGet).then((response)=>{
    setCurrentDocument(response.data())
  }).catch((err)=>{
    console.log(err)
  })
};

export const deleteDocument = async (id: string) => {
  // Remove document from 'docs' collection
  await deleteDoc(doc(docsCollection, id));

  // Remove document ID from 'userDocuments' collections of all users
  const usersSnapshot = await getDocs(userDocumentsCollection);
  const batch = firestore.batch();

  usersSnapshot.forEach((userDoc) => {
    const userDocData = userDoc.data();
    if (userDocData?.documents && userDocData.documents.includes(id)) {
      const updatedDocuments = userDocData.documents.filter((docId: string) => docId !== id);
      const userDocRef = doc(userDocumentsCollection, userDoc.id);
      batch.update(userDocRef, { documents: updatedDocuments });
    }
  });

  // Commit the batch update
  await batch.commit();
};

