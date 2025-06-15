import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import useAuth from '../provider/useAuth';
import axios from 'axios';

const AddCar = () => {
   const { user } = useAuth();
   const [selectedDate, setSelectedDate] = useState(new Date());
   const [carData, setCarData] = useState({
      model: '',
      price: '',
      availability: '',
      regNumber: '',
      features: '',
      description: '',
      image: '',
      location: ''
   });

   const handleChange = e => {
      const { name, value } = e.target;
      setCarData(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const newCar = {
         ...carData,
         price: parseFloat(carData.price),
         bookingCount: 0,
         addedBy: user?.email || "anonymous",
         addedDate: selectedDate.toISOString(),
         bookingStatus: 'available'
      };

      
      

      try {
         const res = await axios.post("http://localhost:5000/car", newCar, {
            headers: {
               "Content-Type": "application/json",
            },
         });

         if (res.data.insertedId) {
            Swal.fire("Success", "Car added successfully!", "success");
         }
      } catch (error) {
         Swal.fire("Error", "Something went wrong!", "error");
       }
   };

   return (
      <section className="py-12 px-4 bg-[#f9fafe] min-h-screen">
         <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">🚗 Add a New Car</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Input fields */}
               {[
                  { label: "Car Model", name: "model", placeholder: "Toyota Camry 2023" },
                  { label: "Rental Price ($/day)", name: "price", type: "number", placeholder: "e.g., 50" },
                  { label: "Registration Number", name: "regNumber", placeholder: "DHA-0000" },
                  { label: "Features", name: "features", placeholder: "GPS, AC, Bluetooth" },
                  { label: "Location", name: "location", placeholder: "Dhaka" },
                  { label: "Image URL", name: "image", placeholder: "https://..." }
               ].map((field, i) => (
                  <div key={i} className={field.name === "image" ? "md:col-span-2" : ""}>
                     <label className="block mb-1 font-medium">{field.label}</label>
                     <input
                        type={field.type || "text"}
                        name={field.name}
                        required
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                        onChange={handleChange}
                     />
                  </div>
               ))}

               {/* Availability */}
               <div>
                  <label className="block mb-1 font-medium">Availability</label>
                  <select
                     name="availability"
                     required
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                     onChange={handleChange}
                  >
                     <option value="">Select</option>
                     <option value="Available">Available</option>
                     <option value="Unavailable">Unavailable</option>
                  </select>
               </div>

               {/* Description */}
               <div className="md:col-span-2">
                  <label className="block mb-1 font-medium">Description</label>
                  <textarea
                     name="description"
                     rows="4"
                     placeholder="Write about the car..."
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 resize-none"
                     onChange={handleChange}
                  ></textarea>
               </div>

               {/* Date Picker */}
               <div className="md:col-span-2">
                  <label className="block mb-1 font-medium">Add Date</label>
                  <DatePicker
                     selected={selectedDate}
                     onChange={(date) => setSelectedDate(date)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                  />
               </div>

               {/* Submit Button */}
               <button
                  type="submit"
                  className="md:col-span-2 w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 text-lg font-semibold"
               >
                  🚘 Submit Car Info
               </button>
            </form>
         </div>
      </section>
   );
};

export default AddCar;
