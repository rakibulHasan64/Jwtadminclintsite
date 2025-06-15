import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import "swiper/css/pagination";


const slides = [
   {
      id: 1,
      heading: "Drive Your Dreams Today!",
      bgImage:
         "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1350&q=80",
   },
   {
      id: 2,
      heading: "Your Next Car Awaits You.",
      bgImage:
         "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1350&q=80",
   },
   {
      id: 3,
      heading: "Experience Luxury & Performance.",
      bgImage:
         "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1350&q=80",
   },
];


import { motion } from "framer-motion";

const Banner = () => {
   const navigate = useNavigate();

   const goToAvailableCars = () => {
      navigate("/available-cars");
   };

   return (
      <section className="relative w-full h-[75vh] md:h-[85vh] flex items-center bg-gray-900 text-white overflow-hidden">
         {/* Background image */}
         <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
               backgroundImage:
                  "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1350&q=80')",
            }}
         >
            <div className="absolute inset-0 bg-black opacity-60"></div>
         </div>

         {/* Content */}
         <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text Section */}
            <div className="max-w-xl text-center md:text-left space-y-6">
               <motion.h1
                  className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
               >
                  Drive Your Dreams Today!
               </motion.h1>
               <motion.p
                  className="text-lg text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
               >
                  Discover a wide range of premium and exotic cars tailored for your journey. Find the perfect ride today.
               </motion.p>
               <motion.button
                  onClick={goToAvailableCars}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
               >
                  View Available Cars
               </motion.button>
            </div>

            {/* Optional Image Section (only for larger screens) */}
            <motion.div
               className="hidden md:block md:w-1/2"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3, duration: 1 }}
            >
               {/* <img
                  src="https://i.ibb.co/pT2ZyXy/Flux-Dev-A-vibrant-and-colorful-illustration-depicting-a-socia-2.jpg"
                  alt="Car showcase"
                  className="rounded-lg shadow-2xl border-l-4 border-b-4 border-blue-500"
               /> */}
            </motion.div>
         </div>
      </section>
   );
};

export default Banner;


