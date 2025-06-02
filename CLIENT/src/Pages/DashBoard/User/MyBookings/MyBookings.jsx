import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import BookingCard from "./BookingCard";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";

const fetchBookings = async (axiosPublic, email) => {
  const { data } = await axiosPublic.get(`/reservations/${email}`);
  return data;
};

const MyBookings = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: () => fetchBookings(axiosPublic, user.email),
  });

  if (isLoading) return <div>Loading bookings...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <SectionTitle
        subheading="See The Timings"
        heading="MY BOOKINGS"
      ></SectionTitle>
      <h2 className="text-2xl font-bold mb-6">
        Total bookings: ({bookings.length})
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} refetch={refetch} />
        ))
      )}
    </div>
  );
};

export default MyBookings;
