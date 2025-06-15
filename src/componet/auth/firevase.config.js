// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8gnLsDxBipOq3JSBlwGqYL6Z3FvuyPeA",
  authDomain: "carebsite.firebaseapp.com",
  projectId: "carebsite",
  storageBucket: "carebsite.firebasestorage.app",
  messagingSenderId: "282661348016",
  appId: "1:282661348016:web:381e5b990c8c7ccd5b1175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };