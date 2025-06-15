

import  { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../provider/useAuth';


function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navgert = useNavigate();

   const location = useLocation();
   const from = location.state?.from?.pathname || "/";


   const { signIn, googleLogin } = useAuth();

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         await signIn(email, password);
         navgert(from);
         toast.success('Login successful!');
      } catch (error) {
         toast.error(error.message);
      }
   };

   const handleGoogleLogin = async () => {
      try {
         await googleLogin();
         navgert(from);
         toast.success('Logged in with Google!');
      } catch (error) {
         toast.error(error.message);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
         <div className="max-w-md w-full p-6 shadow-md rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Login</h2>

            <form onSubmit={handleLogin} className="space-y-4">
               <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
               <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
               >
                  Login
               </button>
            </form>

            <button
               onClick={handleGoogleLogin}
               className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
               Login with Google
            </button>

            <p className="mt-4 text-gray-700 dark:text-gray-300 text-center">
               Don't have an account?{' '}
               <Link to="/regsiter" className="text-blue-600 dark:text-blue-400 underline">
                  Register
               </Link>
            </p>
         </div>
      </div>
   );
}

export default Login;
