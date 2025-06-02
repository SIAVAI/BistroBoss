/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  FiTrash2,
  FiCalendar,
  FiClock,
  FiUsers,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const BookingCard = ({ booking, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const handleDelete = async (id) => {
    axiosPublic
      .delete(`/reservations/${id}`)
      .then((res) => {
        toast.success("Booking Deleted Successfully!!!");
        refetch();
      })
      .catch((err) => {
        toast.error("Can't delete the booking.There was something wrong!!!");
      });
  };
  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "confirmed":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div className="flex flex-col space-y-2 flex-1 min-w-0">
        <h3 className="text-lg font-semibold truncate">{booking.name}</h3>
        <div className="text-gray-600 flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1">
            <FiCalendar />{" "}
            <span>{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock /> <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiUsers /> <span>{booking.guest}</span>
          </div>
          <div className="flex items-center gap-1 truncate max-w-xs">
            <FiMail /> <span>{booking.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiPhone /> <span>{booking.phone}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusStyles(
            booking.status
          )}`}
        >
          {booking.status}
        </span>
        <motion.button
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDelete(booking._id)}
          aria-label={`Delete booking for ${booking.name}`}
          className="text-red-600 hover:text-red-800"
        >
          <FiTrash2 size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BookingCard;
