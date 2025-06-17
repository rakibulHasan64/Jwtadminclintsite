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

   useEffect(() => {
      document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
   }, [isMenuOpen]);

   const handleLogout = () => {
      logOut()
         .then(() => navigate("/"))
         .catch((error) => console.error("Logout failed:", error));
   };

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

   return (
      <nav
         className={`fixed top-0 left-0 w-full z-[9999] px-6 md:px-16 transition-all duration-500 flex items-center justify-between ${isScrolled
               ? "bg-white/80 shadow-md text-gray-800 backdrop-blur py-3"
               : "bg-indigo-600 text-white py-5"
            }`}
      >
         {/* Logo */}
         <Link to="/" className="flex items-center gap-2">
            <img
               src="/custom_garage-removebg-preview.png"
               alt="Logo"
               className={`w-28 h-auto ${isScrolled ? "invert" : ""}`}
            />
         </Link>

         {/* Desktop Nav */}
         <div className="hidden md:flex gap-6 items-center text-lg">
            {navLinks.map((link, index) =>
               link.name === "Logout" ? (
                  <button
                     key={index}
                     onClick={handleLogout}
                     className="hover:underline transition text-inherit"
                  >
                     Logout
                  </button>
               ) : (
                  <Link
                     key={index}
                     to={link.path}
                     className="hover:underline transition text-inherit"
                  >
                     {link.name}
                  </Link>
               )
            )}
         </div>

         {/* Avatar + Login */}
         <div className="flex items-center gap-4">
            {user ? (
               user.photoURL ? (
                  <img
                     src={user.photoURL}
                     alt="User"
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
                  className={`px-4 py-2 rounded-md border ${isScrolled
                        ? "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                        : "border-white text-white hover:bg-white hover:text-indigo-600"
                     } transition hidden md:inline-block`}
               >
                  Login
               </Link>
            )}

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
               <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
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

         {/* Mobile Fullscreen Menu */}
         <div
            className={`fixed inset-0 bg-white z-[9998] transition-transform duration-300 flex flex-col items-center justify-center gap-6 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
               }`}
         >
            <button
               className="absolute top-6 right-6"
               onClick={() => setIsMenuOpen(false)}
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

            {navLinks.map((link, index) =>
               link.name === "Logout" ? (
                  <button
                     key={index}
                     onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                     }}
                     className="text-gray-800 text-xl hover:text-indigo-600"
                  >
                     Logout
                  </button>
               ) : (
                  <Link
                     key={index}
                     to={link.path}
                     onClick={() => setIsMenuOpen(false)}
                     className="text-gray-800 text-xl hover:text-indigo-600"
                  >
                     {link.name}
                  </Link>
               )
            )}

            {/* Login button for mobile */}
            {!user && (
               <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-indigo-600 border border-indigo-600 px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition"
               >
                  Login
               </Link>
            )}
         </div>
      </nav>
   );
};

export default Navbar;
