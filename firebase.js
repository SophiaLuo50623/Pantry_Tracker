// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN9CVvwqK8wqeupQGGzk0Trq3rHsZt49k",
  authDomain: "inventory-management-310bb.firebaseapp.com",
  projectId: "inventory-management-310bb",
  storageBucket: "inventory-management-310bb.appspot.com",
  messagingSenderId: "719583169052",
  appId: "1:719583169052:web:a7861756915dc0b105edd9",
  measurementId: "G-ZN7M3N6P3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)

export {firestore}