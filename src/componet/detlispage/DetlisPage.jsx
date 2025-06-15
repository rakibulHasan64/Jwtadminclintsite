import { useLoaderData } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../provider/useAuth";
Modal.setAppElement("#root");

function DetlisPage() {
   const { user } = useAuth();
   const car = useLoaderData();

   const [modalOpen, setModalOpen] = useState(false);
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [bookingCountState, setBookingCountState] = useState(car?.bookingCount || 0);

   const {
      _id,
      model,
      price,
      availability,
      features,
      image,
      description,
      location,
   } = car || {};

   const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
   const totalCost = totalDays * price;

   const handleBooking = () => {
      setModalOpen(true);
   };

   const closeModal = () => {
      setModalOpen(false);
   };

   // Booking Confirm Handler
   const handleConfirmBooking = async () => {
      if (!startDate || !endDate) {
         toast.warning("Please select both start and end dates.");
         return;
      }

      const bookingData = {
         carId: _id,
         model,
         image,
         location,
         userEmail: user?.email,
         startDate,
         endDate,
         price,
         bookingDate: new Date(),
         status: "Pending",
      };

      try {
         const res = await axios.post("http://localhost:5000/bookings", bookingData);

         if (res.data.insertedId) {
            // Booking successful - increment bookingCount for this car
            await axios.put(`http://localhost:5000/cars/increment-booking/${_id}`);

            // Update local state so UI reflects new booking count immediately
            setBookingCountState(prev => prev + 1);

            toast.success("✅ Booking Successful!");
            closeModal();
         } else {
            toast.error("❌ Booking Failed!");
         }
      } catch (err) {
         console.error(err);
         toast.error("Something went wrong. Please try again.");
      }
   };

   return (
      <div className="max-w-5xl mx-auto px-4 py-10 flex items-center justify-center h-screen">
         <div className="grid md:grid-cols-2 gap-6 items-center">
            <img
               src={image}
               alt={model}
               className="w-full h-[300px] object-cover rounded shadow"
            />

            <div className="space-y-4">
               <h2 className="text-3xl font-bold text-gray-800">{model}</h2>
               <p className="text-lg text-gray-600">
                  Price per day: <span className="font-semibold">${price}</span>
               </p>
               <p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${availability === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                     {availability}
                  </span>
               </p>
               <p className="text-gray-700">Bookings: {bookingCountState}</p>
               <p className="text-gray-600">Location: {location}</p>
               <p className="text-sm text-gray-500">Features: {features}</p>
               <p className="text-sm text-gray-700 mt-2">{description}</p>

               <button
                  onClick={handleBooking}
                  className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
               >
                  Book Now
               </button>
            </div>
         </div>

         {/* Booking Modal */}
         <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            className="bg-white p-6 rounded shadow max-w-md mx-auto mt-10"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
         >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Confirm Booking</h3>

            <div className="space-y-3">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <DatePicker
                     selected={startDate}
                     onChange={(date) => setStartDate(date)}
                     selectsStart
                     startDate={startDate}
                     endDate={endDate}
                     className="border px-2 py-1 rounded w-full"
                     placeholderText="Select start date"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <DatePicker
                     selected={endDate}
                     onChange={(date) => setEndDate(date)}
                     selectsEnd
                     startDate={startDate}
                     endDate={endDate}
                     minDate={startDate}
                     className="border px-2 py-1 rounded w-full"
                     placeholderText="Select end date"
                  />
               </div>

               <p className="text-gray-700">
                  Total Cost: <span className="font-bold">${totalCost || 0}</span>
               </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
               <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
                  Cancel
               </button>
               <button onClick={handleConfirmBooking} className="px-4 py-2 bg-green-500 text-white rounded">
                  Confirm
               </button>
            </div>
         </Modal>
      </div>
   );
}

export default DetlisPage;
