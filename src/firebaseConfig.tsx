
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {getAuth} from "firebase/auth";

//Store data in the database.
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBW1CRftNeQ_kHj02gQoo6Zn6diTVEn0So",
  authDomain: "docs-clone-ae183.firebaseapp.com",
  projectId: "docs-clone-ae183",
  storageBucket: "docs-clone-ae183.appspot.com",
  messagingSenderId: "590150053079",
  appId: "1:590150053079:web:947f2dfc29d19a32215492",
  measurementId: "G-37TT4TM0XH"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firestore=getFirestore(app)

export const auth=getAuth(app)
