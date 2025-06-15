import React, { useEffect, useState } from 'react';
import { getAvailableCars } from '../../hooks/carsapi';
import { formatDistanceToNow } from 'date-fns';

function AvlavileCars() {
   const [cars, setCars] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const data = await getAvailableCars('date', 'desc'); 
         const availableCars = data.filter(car => car.bookingStatus === 'available');
         setCars(availableCars.slice(0, 6)); 
      };
      fetchData();
   }, []);

   return (
      <div className="max-w-7xl mx-auto px-4 py-20">
         <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Recent Listings</h2>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cars?.map((car) => (
               <div
                  key={car._id}
                  className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border hover:scale-[1.02]"
               >
                  <img
                     src={car.image}
                     alt={car.model}
                     className="w-full h-48 object-cover"
                  />
                  <div className="p-4 space-y-2">
                     <h3 className="text-xl font-semibold text-gray-800">{car.model}</h3>
                     <p className="text-gray-600 text-sm">${car.price}/day</p>
                     <p className="text-sm">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${car.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                           {car.availability}
                        </span>
                     </p>
                     <p className="text-sm text-gray-500">Bookings: {car.bookingCount}</p>
                     <p className="text-xs text-gray-400">Added {formatDistanceToNow(new Date(car.addedDate))} ago</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default AvlavileCars;
