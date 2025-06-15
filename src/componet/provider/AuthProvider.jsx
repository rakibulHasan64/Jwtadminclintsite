import { GoogleAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../auth/firevase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";



export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);


   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };


   const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };


   const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
   };


   const updateUser = (updatedData) => {
      return updateProfile(auth.currentUser, updatedData);
   };


   const logOut = () => {
      setLoading(true);
      return signOut(auth)
         .then(() => {
            setUser(null);
            setLoading(false);
         })
         .catch(() => setLoading(false));
   };


   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);
      });
      return () => unsubscribe();
   }, []);

   const authInfo = {
      user,
      loading,
      createUser,
      signIn,
      googleLogin,
      updateUser,
      logOut,
      setLoading,
   };

   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
}

export default AuthProvider;
