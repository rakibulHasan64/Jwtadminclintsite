import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../componet/auth/firevase.config";


const axiosSecure = axios.create({
   baseURL: "https://servercar.vercel.app",
});


axiosSecure.interceptors.request.use(
   async (config) => {
      const user = auth.currentUser;
      if (user) {
         const token = await user.getIdToken();
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
);

axiosSecure.interceptors.response.use(
   (response) => response,
   async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
         console.warn("🔒 Unauthorized! Logging out...");
         await signOut(auth);
         window.location.href = "/login";
      }
      return Promise.reject(error);
   }
);

export default axiosSecure;

