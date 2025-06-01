/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const Card = ({ item }) => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleAddToCart = (food) => {
    console.log(food, user.email);
    if (user && user.email) {
      const cartItem = {
        orderedId: food._id,
        name: food.name,
        email: user.email,
        image: food.image,
        price: food.price,
      };
      axiosSecure
        .post(`/carts`, cartItem)
        .then((response) => {
          if (response.data.insertedId) {
            toast.success("Item added to cart successfully!");
          } else {
            toast.error("Failed to add item to cart.");
          }
          refetch();
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
          toast.error("An error occurred while adding the item to the cart.");
        });

      console.log("Item added to cart:", food);
    } else {
      toast.error("Please login to add items to the cart.");
      console.log("User not logged in");
      navigate("/login");
      return;
    }
  };
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
        <button
          onClick={() => handleAddToCart(item)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 text-sm rounded transition"
        >
          ADD TO CART
        </button>
      </div>
    </motion.div>
  );
};

export default Card;
