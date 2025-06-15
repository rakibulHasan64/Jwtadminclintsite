import React, { useEffect, useState } from 'react';
import AllCarsCard from './AllCarsCard';
import { getAvailableCars } from '../../hooks/carsapi';

function AllCars() {
   const [cars, setCars] = useState([]);
   const [view, setView] = useState('grid');
   const [sortBy, setSortBy] = useState('date');
   const [order, setOrder] = useState('desc');
   const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => {
      const loadCars = async () => {
         const data = await getAvailableCars(sortBy, order);
         setCars(data);
      };
      loadCars();
   }, [sortBy, order]);

   // Search filter (case-insensitive) - model নাম অনুসারে
   const filteredCars = cars.filter(car =>
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className="min-h-screen mt-10 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-5">
         <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
               Available Cars for Rent
            </h1>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
               {/* View Buttons */}
               <div className="space-x-2">
                  <button
                     onClick={() => setView('grid')}
                     className={`px-5 py-2 rounded-md font-semibold transition ${view === 'grid'
                           ? 'bg-indigo-600 text-white shadow-md'
                           : 'bg-gray-50 text-gray-700 hover:bg-indigo-300'
                        }`}
                  >
                     Grid View
                  </button>
                  <button
                     onClick={() => setView('list')}
                     className={`px-5 py-2 rounded-md font-semibold transition ${view === 'list'
                           ? 'bg-indigo-600 text-white shadow-md'
                           : 'bg-gray-50 text-gray-700 hover:bg-indigo-300'
                        }`}
                  >
                     List View
                  </button>
               </div>

               {/* Sorting */}
               <div className="flex items-center space-x-4">
                  <select
                     onChange={(e) => setSortBy(e.target.value)}
                     value={sortBy}
                     className="border border-indigo-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                     <option value="date">Sort by Date</option>
                     <option value="price">Sort by Price</option>
                  </select>

                  <select
                     onChange={(e) => setOrder(e.target.value)}
                     value={order}
                     className="border border-indigo-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                     <option value="desc">Descending</option>
                     <option value="asc">Ascending</option>
                  </select>
               </div>
            </div>

            {/* Search Input */}
            <div className="max-w-md mx-auto mb-6">
               <input
                  type="text"
                  placeholder="Search cars by model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
               />
            </div>

            {/* Cars List */}
            <div
               className={`${view === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'flex flex-col space-y-4'
                  }`}
            >
               {filteredCars.length > 0 ? (
                  filteredCars.map((car) => (
                     <AllCarsCard key={car._id} car={car} view={view} />
                  ))
               ) : (
                  <p className="text-center text-gray-500 col-span-full">
                     No cars found.
                  </p>
               )}
            </div>
         </div>
      </div>
   );
}

export default AllCars;
