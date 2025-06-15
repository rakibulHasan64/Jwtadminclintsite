// MyBooking.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import useAuth from "../provider/useAuth";
import Loddinge from "../provider/Loddinge";

Modal.setAppElement("#root");

function MyBooking() {
  const { user } = useAuth();
  const userEmail = user?.email;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);

  const fetchBookings = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/mybookinge?email=${userEmail}`)
      .then((res) => setBookings(res.data))
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (userEmail) fetchBookings();
  }, [userEmail]);

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setCancelModalOpen(true);
  };

  const confirmCancel = () => {
    axios
      .put(`http://localhost:5000/bookings/cancel/${selectedBooking._id}`)
      .then(() => {
        toast.success("Booking canceled");
        fetchBookings();
        setCancelModalOpen(false);
      })
      .catch(() => toast.error("Failed to cancel booking"));
  };

  const openModifyModal = (booking) => {
    setSelectedBooking(booking);
    setNewStartDate(new Date(booking.startDate));
    setNewEndDate(new Date(booking.endDate));
    setModifyModalOpen(true);
  };

  const confirmModify = () => {
    if (!newStartDate || !newEndDate || newEndDate <= newStartDate) {
      toast.error("Invalid date range");
      return;
    }

    axios
      .put(`http://localhost:5000/bookings/modify/${selectedBooking._id}`, {
        startDate: newStartDate,
        endDate: newEndDate,
      })
      .then(() => {
        toast.success("Booking updated");
        fetchBookings();
        setModifyModalOpen(false);
      })
      .catch(() => toast.error("Failed to update booking"));
  };

  const getTotalCost = (booking) => {
    if (!booking.pricePerDay || !booking.startDate || !booking.endDate) return 0;
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    return booking.pricePerDay * diffDays;
  };

  if (loading) return <Loddinge />;

  if (bookings.length === 0)
    return (
      <div className="text-center mt-24 h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-700">No data found </h2>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 overflow-x-auto h-screen mt-24">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">My Bookings</h2>
      <table className="min-w-full border border-gray-300 border-collapse text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Car Image</th>
            <th className="p-2 border">Model</th>
            <th className="p-2 border">Booking Date</th>
            <th className="p-2 border">Start</th>
            <th className="p-2 border">End</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr
              key={b._id}
              className="hover:bg-gray-50 transition"
              style={{ opacity: b.status === "Canceled" ? 0.5 : 1 }}
            >
              <td className="p-1 border">
                <img
                  src={b.image}
                  alt={b.model}
                  className="w-20 h-14 object-cover rounded border"
                />
              </td>
              <td className="p-2 border">{b.model}</td>
              <td className="p-2 border">{new Date(b.bookingDate).toLocaleDateString()}</td>
              <td className="p-2 border">{new Date(b.startDate).toLocaleDateString()}</td>
              <td className="p-2 border">{new Date(b.endDate).toLocaleDateString()}</td>
              <td className="p-2 border">${b.price}</td>
              <td className="p-2 border">{b.status}</td>
              <td className="p-2 border">
                {b.status !== "Canceled" && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openModifyModal(b)}
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded"
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => openCancelModal(b)}
                      className="px-2 py-1 bg-red-600 text-white text-xs rounded"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cancel Modal */}
      <Modal
        isOpen={cancelModalOpen}
        onRequestClose={() => setCancelModalOpen(false)}
        className="bg-white max-w-md mx-auto p-6 rounded shadow mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
        <p>
          Are you sure you want to cancel booking of{" "}
          <span className="font-medium text-red-600">{selectedBooking?.model}</span>?
        </p>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={() => setCancelModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            No
          </button>
          <button
            onClick={confirmCancel}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Yes, Cancel
          </button>
        </div>
      </Modal>

      {/* Modify Modal */}
      <Modal
        isOpen={modifyModalOpen}
        onRequestClose={() => setModifyModalOpen(false)}
        className="bg-white max-w-md mx-auto p-6 rounded shadow mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">Modify Booking Dates</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <DatePicker
              selected={newStartDate}
              onChange={setNewStartDate}
              selectsStart
              startDate={newStartDate}
              endDate={newEndDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">End Date</label>
            <DatePicker
              selected={newEndDate}
              onChange={setNewEndDate}
              selectsEnd
              startDate={newStartDate}
              endDate={newEndDate}
              dateFormat="dd/MM/yyyy"
              minDate={newStartDate || new Date()}
              className="border rounded p-2 w-full"
            />
          </div>

        
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={() => setModifyModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={confirmModify}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default MyBooking;
