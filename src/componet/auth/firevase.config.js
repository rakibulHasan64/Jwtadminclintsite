


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGvXa8p9_AwBkaBrMzPqb3GfIBNe4oe68",
  authDomain: "cars-1925d.firebaseapp.com",
  projectId: "cars-1925d",
  storageBucket: "cars-1925d.firebasestorage.app",
  messagingSenderId: "1079031932750",
  appId: "1:1079031932750:web:5cef736caade45f350e01f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };