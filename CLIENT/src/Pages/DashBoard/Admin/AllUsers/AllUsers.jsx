import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
    onError: (error) => {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    },
  });

  const handleRole = (id) => {
    axiosSecure
      .patch(`/users/admin/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("User Role updated successfully!!");
          refetch();
        }
      })
      .catch((err) => {
        toast.error("Failed to update user role.");
        console.log("Error :", err);
      });
  };

  const handleDeleteUser = (id) => {
    axiosSecure
      .delete(`/users/${id}`)
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
      <SectionTitle
        subheading="How Many??"
        heading="Manage All Users"
      ></SectionTitle>
      <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-sm">
        {/* Header */}
        <h2 className="font-semibold text-lg mb-4">
          Total Users: <span className="font-bold">{users.length}</span>
        </h2>

        {/* Table header */}
        <div className="hidden md:grid grid-cols-5 gap-4 bg-yellow-700 text-white p-2 rounded-t-md font-semibold text-sm">
          <div className="text-center">#</div>
          <div>Name</div>
          <div>Email</div>
          <div className="text-center">Role</div>
          <div className="text-center">Action</div>
        </div>

        {/* Table rows */}
        <div className="border border-gray-300 rounded-b-md divide-y divide-gray-300">
          {users.map((user, idx) => (
            <div
              key={user._id || idx}
              className="flex flex-col md:grid md:grid-cols-5 gap-2 md:gap-4 p-3 md:p-2 text-gray-700 text-sm"
            >
              {/* Index */}
              <div className="md:text-center font-semibold">
                <span className="md:hidden font-semibold mr-1">#:</span>
                {idx + 1}
              </div>

              {/* Name */}
              <div>
                <span className="md:hidden font-semibold mr-1">Name:</span>
                {user.name || "No Name"}
              </div>

              {/* Email */}
              <div>
                <span className="md:hidden font-semibold mr-1">Email:</span>
                {user.email || "No Email"}
              </div>

              {/* Role */}
              <div className="md:text-center">
                <span className="md:hidden font-semibold mr-1">Role:</span>
                <button
                  type="button"
                  onClick={() => handleRole(user._id)}
                  className={` text-white p-2 rounded-md inline-flex items-center hover:scale-105 transition-normal duration-200  ${
                    user.isAdmin ? "bg-gray-400" : "bg-yellow-700"
                  }`}
                  title={user.isAdmin ? "Admin" : "User"}
                  disabled={user.isAdmin}
                >
                  <FaUsers />
                </button>
              </div>

              {/* Delete action */}
              <div className="md:text-center">
                <span className="md:hidden font-semibold mr-1">Action:</span>
                <button
                  type="button"
                  className="bg-red-700 p-2 rounded hover:bg-red-800 transition"
                  onClick={() => {
                    handleDeleteUser(user._id);
                  }}
                  aria-label={`Delete user ${user.name}`}
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

export default AllUsers;
