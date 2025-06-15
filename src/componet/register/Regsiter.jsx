

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../provider/useAuth';

function Regsiter() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [photoURL, setPhotoURL] = useState('');
   const [password, setPassword] = useState('');
   const navgit = useNavigate();

   const { createUser, updateUser, } = useAuth();

   const handleRegister = async (e) => {
      e.preventDefault();

      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);

      if (!hasUpper || !hasLower || password.length < 6) {
         return toast.error('Password must contain at least 1 uppercase, 1 lowercase and 6 characters');
      }

      try {
         const userCredential = await createUser(email, password);
         await updateUser({
            displayName: name,
            photoURL,
         });
         navgit("/");
         toast.success('Registration successful!');
      } catch (error) {
         toast.error(error.message);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
         <div className="max-w-md w-full p-6 shadow-md rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Register</h2>

            <form onSubmit={handleRegister} className="space-y-4">
               <input
                  type="text"
                  placeholder="Name"
                  className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
               />
               <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
               <input
                  type="text"
                  placeholder="Photo URL"
                  className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  required
               />
               <input
                  type="password"
                  placeholder="Password"
                  className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />

               <p className="text-gray-700 dark:text-gray-300 text-center">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 dark:text-blue-400 underline">
                     Login
                  </Link>
               </p>

               <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
               >
                  Register
               </button>
            </form>
         </div>
      </div>
   );
}

export default Regsiter;
