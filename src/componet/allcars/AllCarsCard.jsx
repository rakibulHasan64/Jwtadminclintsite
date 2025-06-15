import React from 'react';
import { Link } from 'react-router-dom';

function AllCarsCard({ car, view }) {
   const {
      _id,
      model,
      price,
      image,
      availability,
      location
   } = car;

   return (
      <div className={`border p-4 rounded shadow-md ${view === 'list' ? 'flex gap-4 items-center' : ''}`}>
         <img
            src={image}
            alt={model}
            className={`${view === 'list' ? 'w-32 h-24' : 'w-full h-48'} object-cover rounded`}
         />
         <div className={`${view === 'list' ? '' : 'mt-4'}`}>
            <h3 className="text-xl font-bold">{model}</h3>
            <p className="text-gray-600">Price: ${price}</p>
            <p className="text-green-500">{availability}</p>
            <p className="text-gray-500">Location: {location}</p>
            <Link to={`/detlis/${_id}`}>
               <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Book Now</button>
            </Link>
         </div>
      </div>
   );
}

export default AllCarsCard;
