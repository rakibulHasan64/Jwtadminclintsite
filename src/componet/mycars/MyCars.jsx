import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../provider/useAuth';
import axios from 'axios';
import Loddinge from '../provider/Loddinge';

Modal.setAppElement('#root');

function MyCars() {
   const { user, loading } = useAuth();
   const [cars, setCars] = useState([]);
   const [editingCar, setEditingCar] = useState(null);
   const [modalIsOpen, setModalIsOpen] = useState(false);

   const fetchCars = async (email) => {
      try {
         const res = await axios.get(`http://localhost:5000/caruser/email?email=${email}`);
         const data = res.data;

         if (Array.isArray(data)) {
            setCars(data);
         } else {
            setCars([]);
            console.error("Expected array, got:", data);
         }
      } catch (err) {
         toast.error('Failed to load your cars');
         setCars([]);
      }
   };

   useEffect(() => {
      if (!loading && user?.email) {
         fetchCars(user.email);
      }
   }, [user, loading]);

   const openEditModal = (car) => {
      setEditingCar({ ...car });
      setModalIsOpen(true);
   };

   const closeModal = () => {
      setModalIsOpen(false);
      setEditingCar(null);
   };

   const handleUpdate = async (e) => {
      e.preventDefault();

      const { _id, ...carWithoutId } = editingCar;

      try {
         await axios.put(`http://localhost:5000/updatecar/${_id}`, carWithoutId);
         toast.success('Car updated successfully');
         closeModal();
         fetchCars(user.email);
      } catch (err) {
         toast.error('Failed to update car');
      }
   };


   const handleDelete = async (id) => {
      if (confirm('Are you sure you want to delete this car?')) {
         try {
            await axios.delete(`http://localhost:5000/deletecar/${id}`);
            toast.success('Car deleted successfully');
            fetchCars(user?.email);
         } catch (err) {
            toast.error('Failed to delete car');
         }
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setEditingCar((prev) => ({ ...prev, [name]: value }));
   };

   if (loading) {
      return <Loddinge />;
   }

   return (
      <div className="max-w-7xl mx-auto px-4 mt-24 h-screen ">
         <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">My Cars</h2>

         {Array.isArray(cars) && cars.length === 0 ? (
            <div className="text-center mt-20">
               <p className="text-lg text-gray-600">You haven't added any cars yet.</p>
               <a href="/addcar" className="text-indigo-600 hover:underline font-medium mt-2 inline-block">Add a Car</a>
            </div>
         ) : (
            <div className="overflow-x-auto shadow-md rounded-lg bg-white">
               <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-100">
                     <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-700">Image</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-700">Model</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-700">Price/Day</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-700">Bookings</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-700">Availability</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-700">Added</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                     {cars.map((car) => (
                        <tr key={car._id} className="hover:bg-gray-50 transition-all">
                           <td className="px-6 py-3">
                              <img src={car.image} alt="car" className="h-14 w-24 object-cover rounded border" />
                           </td>
                           <td className="px-6 py-3">{car.model}</td>
                           <td className="px-6 py-3">${car.price}</td>
                           <td className="px-6 py-3">{car.bookingCount}</td>
                           <td className="px-6 py-3">{car.availability}</td>
                           <td className="px-6 py-3">{new Date(car.addedDate).toLocaleDateString()}</td>
                           <td className="px-6 py-3 flex flex-wrap gap-2">
                              <button
                                 onClick={() => openEditModal(car)}
                                 className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
                              >
                                 Update
                              </button>
                              <button
                                 onClick={() => handleDelete(car._id)}
                                 className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
                              >
                                 Delete
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}

         {/* Modal */}
         <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="bg-white p-6 rounded-md max-w-xl w-full mx-auto mt-10 shadow-xl border"
            overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
         >
            {editingCar && (
               <form onSubmit={handleUpdate} className="space-y-4">
                  <h3 className="text-xl font-bold mb-4 text-gray-700">Update Car Info</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <input name="model" value={editingCar.model} onChange={handleChange} placeholder="Car Model" className="border p-2 rounded w-full" required />
                     <input name="price" value={editingCar.price} onChange={handleChange} type="number" placeholder="Daily Price" className="border p-2 rounded w-full" required />
                     <input name="availability" value={editingCar.availability} onChange={handleChange} placeholder="Availability" className="border p-2 rounded w-full" />
                     <input name="regNumber" value={editingCar.regNumber} onChange={handleChange} placeholder="Registration Number" className="border p-2 rounded w-full" />
                     <input name="features" value={editingCar.features} onChange={handleChange} placeholder="Features" className="border p-2 rounded w-full" />
                     <input name="location" value={editingCar.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded w-full" />
                     <input name="image" value={editingCar.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded w-full" />
                  </div>
                  <textarea name="description" value={editingCar.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full" rows="3" />

                  <div className="flex justify-end gap-3 pt-4">
                     <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
                     <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Update</button>
                  </div>
               </form>
            )}
         </Modal>
      </div>

   );
}

export default MyCars;
