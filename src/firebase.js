// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmqg8gwQgMC_APPy83rbq0Tb5H4tgXgE0",
  authDomain: "my-recipes-46063.firebaseapp.com",
  projectId: "my-recipes-46063",
  storageBucket: "my-recipes-46063.appspot.com",
  messagingSenderId: "879088459845",
  appId: "1:879088459845:web:7d9091cd60043f9c21832c",
  measurementId: "G-V7D0TN90EF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app);

export default getFirestore(app)
