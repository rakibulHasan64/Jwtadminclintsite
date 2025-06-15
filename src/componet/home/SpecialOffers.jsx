import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const offers = [
   {
      id: 1,
      title: "15% Off for Weekend Rentals!",
      description: "Special discount on any car booking from Friday to Sunday.",
      buttonText: "Book Now",
      image: "/two.png",
   },
   {
      id: 2,
      title: "Luxury Cars at Just $99/Day This Holiday Season!",
      description: "Rent premium cars at amazing prices during the holidays.",
      buttonText: "Learn More",
      image: "/three.png",
   },
   {
      id: 3,
      title: "Family Package Discount!",
      description: "Extra benefits and discounts for family trips.",
      buttonText: "See Details",
      image: "/one.png",
   },
];

const SpecialOffers = () => {
   useEffect(() => {
      AOS.init({ duration: 1000 });
   }, []);

   return (
      <section className="py-20 bg-blue-50 dark:bg-gray-900">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12" data-aos="fade-up">
               বিশেষ অফারসমূহ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {offers.map((offer, index) => (
                  <div
                     key={offer.id}
                     className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-600  hover:scale-105"
                     data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  >
                     <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-56 object-cover"
                     />
                     <div className="p-6 space-y-4">
                        <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
                           {offer.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           {offer.description}
                        </p>
                        <Link
                           to="/available-cars"
                           className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                           {offer.buttonText}
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default SpecialOffers;
