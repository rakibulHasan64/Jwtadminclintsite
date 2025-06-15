import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import useAuth from "../provider/useAuth";

const Navbar = () => {
   const { user, logOut } = useAuth();
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const navigate = useNavigate(); 

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const navLinks = [
      { name: "Home", path: "/" },
      { name: "Available Cars", path: "/available-cars" },
      ...(user
         ? [
            { name: "Add Car", path: "/addcar" },
            { name: "My Cars", path: "/my-cars" },
            { name: "My Bookings", path: "/my-bookings" },
            { name: "Logout", path: "/logout" },
         ]
         : []),
   ];

   const handleLogout = () => {
      logOut()
         .then(() => {
            
         })
         .catch((error) => {
            console.error("Logout failed:", error);
         });
   };

   return (
      <nav
         className={`fixed top-0 left-0 w-full z-50 px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 flex items-center justify-between ${isScrolled
               ? "bg-white/80 shadow-md text-gray-800 backdrop-blur py-3"
               : "bg-indigo-600 text-white py-5"
            }`}
      >
         {/* Left: Logo */}
         <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
               <img
                  src="/public/custom_garage-removebg-preview.png"
                  alt="Logo"
                  className={`w-28 h-19 ${isScrolled ? "invert" : ""}`}
               />
            
            </Link>
         </div>

         {/* Center: Desktop Nav Links */}
         <div className="hidden md:flex gap-6 items-center text-xl">
            {navLinks.map((link, index) => {
               if (link.name === "Logout") {
                  return (
                     <button
                        key={index}
                        onClick={handleLogout}
                        className={`hover:underline transition duration-300 ${isScrolled ? "text-gray-700" : "text-white"
                           }`}
                     >
                        Logout
                     </button>
                  );
               }
               return (
                  <Link
                     key={index}
                     to={link.path}
                     className={`hover:underline transition duration-300 ${isScrolled ? "text-gray-700" : "text-white"
                        }`}
                  >
                     {link.name}
                  </Link>
               );
            })}
         </div>

         {/* Right: User Image or Login + Mobile Menu Button */}
         <div className="flex items-center gap-4">
            {user ? (
               user.photoURL ? (
                  <img
                     src={user.photoURL}
                     alt="User Avatar"
                     className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                  />
               ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold border-2 border-indigo-500">
                     {user.displayName ? user.displayName[0].toUpperCase() : "U"}
                  </div>
               )
            ) : (
               <Link
                  to="/login"
                  className={`hidden md:inline-block px-4 py-2 rounded-md border ${isScrolled
                        ? "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                        : "border-white text-white hover:bg-white hover:text-indigo-600"
                     } transition`}
               >
                  Login
               </Link>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
               <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle Menu"
               >
                  <svg
                     className={`w-6 h-6 ${isScrolled ? "text-black" : "text-white"}`}
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     strokeWidth="2"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                     />
                  </svg>
               </button>
            </div>
         </div>

         {/* Mobile Slide-out Menu */}
         <div
            className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-md transform transition-transform duration-300 z-50 p-6 flex flex-col gap-6 md:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
               }`}
         >
            <button
               className="self-end"
               onClick={() => setIsMenuOpen(false)}
               aria-label="Close Menu"
            >
               <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M6 18L18 6M6 6l12 12"
                  />
               </svg>
            </button>

            {navLinks.map((link, index) => {
               if (link.name === "Logout") {
                  return (
                     <button
                        key={index}
                        onClick={() => {
                           setIsMenuOpen(false);
                           handleLogout();
                        }}
                        className="text-gray-800 hover:text-indigo-600 transition"
                     >
                        Logout
                     </button>
                  );
               }
               return (
                  <Link
                     key={index}
                     to={link.path}
                     onClick={() => setIsMenuOpen(false)}
                     className="text-gray-800 hover:text-indigo-600 transition"
                  >
                     {link.name}
                  </Link>
               );
            })}
         </div>
      </nav>
   );
};

export default Navbar;
