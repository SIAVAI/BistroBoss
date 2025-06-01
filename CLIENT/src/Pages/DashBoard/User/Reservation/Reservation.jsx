/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaUserFriends } from "react-icons/fa";
import ReservationLocation from "./ReservationLocation";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

const Reservation = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Reservation Details:", data);
    reset();
  };

  return (
    <>
      <SectionTitle
        subheading="Reservation"
        heading="Book a Table"
      ></SectionTitle>
      <div className=" bg-gray-50 flex items-center justify-center px-4 py-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Book A Table</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Date */}
            <div className="col-span-1">
              <label className="block mb-1 font-medium">Date*</label>
              <div className="relative">
                <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className="input input-bordered pl-10 w-full"
                />
              </div>
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div>

            {/* Time */}
            <div className="col-span-1">
              <label className="block mb-1 font-medium">Time*</label>
              <div className="relative">
                <FaClock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="time"
                  {...register("time", { required: "Time is required" })}
                  className="input input-bordered pl-10 w-full"
                />
              </div>
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time.message}</p>
              )}
            </div>

            {/* Guest */}
            <div className="col-span-1">
              <label className="block mb-1 font-medium">Guest*</label>
              <div className="relative">
                <FaUserFriends className="absolute top-3 left-3 text-gray-400" />
                <select
                  {...register("guest", {
                    required: "Guest count is required",
                  })}
                  className="select select-bordered pl-10 w-full"
                >
                  <option value="">Select</option>
                  <option value="1 Person">1 Person</option>
                  <option value="2 People">2 People</option>
                  <option value="3 People">3 People</option>
                  <option value="4+ People">4+ People</option>
                </select>
              </div>
              {errors.guest && (
                <p className="text-red-500 text-sm">{errors.guest.message}</p>
              )}
            </div>

            {/* Name */}
            <div className="col-span-1">
              <label className="block mb-1 font-medium">Name*</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="col-span-1">
              <label className="block mb-1 font-medium">Phone*</label>
              <input
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="col-span-1">
              <label className="block mb-1 font-medium">Email*</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Button */}
            <div className="col-span-full flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn bg-yellow-700 text-white hover:bg-yellow-800"
              >
                Book A Table 📅
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
      <SectionTitle subheading="Visit Us" heading="Our Location"></SectionTitle>
      <ReservationLocation className="mt-10"></ReservationLocation>
    </>
  );
};

export default Reservation;
