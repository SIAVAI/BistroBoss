/* eslint-disable no-unused-vars */
import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../../Hooks/useMenu";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDelete = async (id) => {
    const result = await axiosSecure.delete(`/menu/${id}`);
    if (result.data.deletedCount > 0) {
      toast.success("Food Item Deleted Successfully!!!");
      refetch();
    } else {
      toast.error("There was an error while deleting!!!");
    }
  };

  return (
    <>
      <SectionTitle subheading="Hurry Up!" heading="Manage All Item(s)" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 sm:px-6 lg:px-8"
      >
        <h2 className="font-bold text-xl sm:text-2xl mb-4 text-gray-800">
          TOTAL ITEMS: {menu.length}
        </h2>

        {/* Large screen: Table */}
        <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-yellow-700 text-white">
              <tr>
                <th className="w-12 p-3 text-center">#</th>
                <th className="w-20 p-3 text-center">Image</th>
                <th className="p-3 text-left">Item Name</th>
                <th className="w-24 p-3 text-center">Price</th>
                <th className="w-20 p-3 text-center">Edit</th>
                <th className="w-20 p-3 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menu.map(({ _id, image, name, price }, idx) => (
                <tr key={_id} className="hover:bg-yellow-50 transition-colors">
                  <td className="p-3 text-center font-medium">{idx + 1}</td>
                  <td className="p-3 text-center">
                    {/* Placeholder for image */}
                    <img
                      src={image}
                      className="w-12 h-12 bg-gray-300 rounded-md mx-auto"
                    />
                  </td>
                  <td className="p-3">{name}</td>
                  <td className="p-3 text-center">${price.toFixed(2)}</td>
                  <td className="p-3 text-center">
                    <Link
                      to={`/dashboard/update-item/${_id}`}
                      className="bg-yellow-700 hover:bg-yellow-800 p-2 rounded text-white transition btn btn-ghost hover:scale-105 duration-200"
                    >
                      <FaEdit size={16} />
                    </Link>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(_id)}
                      className="bg-red-700 hover:bg-red-800 p-2 rounded text-white transition btn btn-ghost hover:scale-105 duration-200"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-yellow-700 text-white">
              <tr>
                <th className="p-3 text-center">#</th>
                <th className="p-3 text-center">Image</th>
                <th className="p-3 text-left">Item Name</th>
                <th className="p-3 text-center">Price</th>
                <th className="p-3 text-center">Edit</th>
                <th className="p-3 text-center">Delete</th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Small/Medium screens: Card list */}
        <div className="lg:hidden space-y-4">
          {menu.map(({ _id, image, name, price }, idx) => (
            <div
              key={_id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                {/* Image placeholder */}
                <img
                  src={image}
                  className="w-14 h-14 bg-gray-300 rounded-md flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-gray-800">{name}</p>
                  <p className="text-yellow-700 font-semibold mt-1">
                    ${price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  to={`/dashboard/update-item/${_id}`}
                  aria-label={`Edit ${name}`}
                  className="bg-yellow-700 hover:bg-yellow-800 p-2 rounded text-white transition btn btn-ghost hover:scale-105 duration-200"
                >
                  <FaEdit size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(_id)}
                  aria-label={`Delete ${name}`}
                  className="bg-red-700 hover:bg-red-800 p-2 rounded text-white transition hover:scale-105 duration-200"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default ManageItems;
