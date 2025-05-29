/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const Card = ({ item }) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{item.recipe}</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 text-sm rounded transition">
          ADD TO CART
        </button>
      </div>
    </motion.div>
  );
};

export default Card;
