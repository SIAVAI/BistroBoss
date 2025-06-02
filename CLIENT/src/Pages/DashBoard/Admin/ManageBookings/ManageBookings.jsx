/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { toast } from "react-toastify";
const fetchBookings = async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_URL}/reservations`
  );
  return result.data;
};

const Update = async ({ id, status }) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}/reservations/${id}`,
    { status }
  );
  return data;
};

const ManageBookings = () => {
  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["adminBookings"],
    queryFn: fetchBookings,
  });

  const statusOptions = ["pending", "confirmed", "cancelled"];

  const handleStatusChange = async (id, status) => {
    try {
      const updatedBooking = await Update({ id, status });
      toast.success("Status Updated!!");
      refetch();

      console.log("Booking status updated", status);
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <SectionTitle
        subheading="At A Glance"
        heading="Manage All Bookings"
      ></SectionTitle>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <motion.div
              key={booking._id}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2 truncate">
                  {booking.name}
                </h2>
                <div className="badge badge-info mb-4 text-white">
                  {booking.status}
                </div>
                <p>
                  <strong>Email:</strong> {booking.email}
                </p>
                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {booking.time}
                </p>
                <p>
                  <strong>Guests:</strong> {booking.guest}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="mt-4 flex gap-4 flex-wrap">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(booking._id, status)}
                    className={`btn btn-ghost ${
                      booking.status === status
                        ? "bg-gray-500 text-white cursor-not-allowed"
                        : "bg-[#80E2B7] text-white hover:bg-blue-600"
                    }`}
                    disabled={booking.status === status}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <div>No bookings found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
