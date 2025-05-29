/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaTelegramPlane } from "react-icons/fa";

const ContactForm = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 shadow">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold mb-1">
            Phone<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold mb-1">
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            rows="5"
            placeholder="Write your message here"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          ></textarea>
        </div>

        <div className="mt-6 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className=" hover:bg-yellow-700 text-white font-medium px-6 py-2 rounded inline-flex items-center gap-2"
            style={{
              background:
                "linear-gradient(90deg, rgb(131, 93, 35), rgb(181, 129, 48))",
            }}
          >
            Send Message <FaTelegramPlane />
          </motion.button>
        </div>
      </motion.form>
    </section>
  );
};

export default ContactForm;
