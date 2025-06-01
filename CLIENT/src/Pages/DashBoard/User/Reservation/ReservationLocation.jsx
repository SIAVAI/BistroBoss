/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ReservationLocation = () => {
  const info = [
    {
      icon: <FaPhoneAlt className="text-white text-xl" />,
      title: "PHONE",
      detail: "+38 (012) 34 56 789",
    },
    {
      icon: <FaMapMarkerAlt className="text-white text-xl" />,
      title: "ADDRESS",
      detail: "+38 (012) 34 56 789",
    },
    {
      icon: <FaClock className="text-white text-xl" />,
      title: "WORKING HOURS",
      detail: (
        <div className="leading-tight">
          <p>Mon - Fri: 08:00 - 22:00</p>
          <p>Sat - Sun: 10:00 - 23:00</p>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100 py-10 px-4"
    >
      {info.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="bg-yellow-700 flex items-center justify-center h-12">
            {item.icon}
          </div>
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <div className="text-sm text-gray-700">{item.detail}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default ReservationLocation;
