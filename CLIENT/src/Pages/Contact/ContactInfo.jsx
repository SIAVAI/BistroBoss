/* eslint-disable no-unused-vars */
import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const contactData = [
  {
    icon: <FaPhoneAlt size={24} />,
    title: "Phone",
    detail: "+88 01723 45 98 789",
  },
  {
    icon: <FaMapMarkerAlt size={24} />,
    title: "Address",
    detail: "88/A, Green Road, Dhaka",
  },
  {
    icon: <FaClock size={24} />,
    title: "Working Hours",
    detail: (
      <>
        <p>Mon - Fri: 08:00 - 22:00</p>
        <p>Sat - Sun: 10:00 - 23:00</p>
      </>
    ),
  },
];

const ContactInfo = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contactData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="shadow-md border rounded-md overflow-hidden bg-white"
          >
            <div className="bg-yellow-600 text-white flex justify-center items-center h-16">
              {item.icon}
            </div>
            <div className="bg-gray-50 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <div className="text-sm text-gray-700">{item.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfo;
