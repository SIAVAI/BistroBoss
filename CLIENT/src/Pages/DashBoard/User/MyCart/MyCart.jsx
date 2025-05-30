import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../../Hooks/useCart";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  // Calculate total orders (sum of quantities)
  const totalOrders = cart.length;

  const handleDeleteItem = (id) => {
    axiosSecure
      .delete(`/carts/${id}`)
      .then((response) => {
        if (response.data.deletedCount > 0) {
          console.log(`Item with id ${id} deleted successfully.`);
          toast.success("Item deleted successfully!");
          refetch();
        } else {
          console.error(`Failed to delete item with id ${id}.`);
          toast.error("Failed to delete item.");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <>
      <Helmet>
        <title>My Cart - Bistro Boss</title>
      </Helmet>
      <SectionTitle
        subheading="My Cart"
        heading="Wanna Add Moe Items?"
        className="text-center mb-6"
      ></SectionTitle>
      <div className="w-auto mx-auto p-4 shadow-lg rounded-md ">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
          <h2 className="font-semibold text-lg">
            Total Orders: <span className="font-bold">{totalOrders}</span>
          </h2>
          <h2 className="font-semibold text-lg">
            Total Price:{" "}
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </h2>
          <button
            type="button"
            className="bg-yellow-700 text-white px-4 py-1 rounded-md whitespace-nowrap"
          >
            Pay
          </button>
        </div>

        {/* Table header */}
        <div className="hidden md:grid grid-cols-6 gap-4 bg-yellow-700 text-white p-2 rounded-t-md font-semibold text-sm">
          <div className="col-span-1 text-center">Item Image</div>
          <div className="col-span-2">Item Name</div>
          <div className="col-span-1 text-center">Price</div>
          <div className="col-span-1 text-center">Action</div>
        </div>

        {/* Cart items */}
        <div className="border border-gray-300 rounded-b-md divide-y divide-gray-300">
          {cart.map((item, index) => (
            <div
              key={item.id || index}
              className="grid grid-cols-6 gap-4 items-center p-2 text-gray-700 text-sm"
            >
              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </div>

              {/* Name */}
              <div className="col-span-2">{item.name}</div>

              {/* Price */}
              <div className="text-center">${item.price.toFixed(2)}</div>

              {/* Delete action */}
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-ghost bg-red-700 p-2 rounded hover:bg-red-800 transition"
                  onClick={() => {
                    handleDeleteItem(item._id);
                  }}
                  aria-label={`Delete ${item.name}`}
                >
                  <FaTrashAlt className="text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyCart;
