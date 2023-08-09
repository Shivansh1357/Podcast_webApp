// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAggG1d9KuZ8urKH54PVYLzh1o65yBpqDc",
  authDomain: "podcast-app-e9302.firebaseapp.com",
  projectId: "podcast-app-e9302",
  storageBucket: "podcast-app-e9302.appspot.com",
  messagingSenderId: "839059194710",
  appId: "1:839059194710:web:c41869efb3911ef3408cf7",
  measurementId: "G-Z591SVKF9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);
export const auth=getAuth(app);
export const storage=getStorage(app);

// export default {auth,db,storage};