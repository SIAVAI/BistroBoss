/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import { FcHome } from "react-icons/fc";
import { AiTwotoneHome } from "react-icons/ai";
import { ImMenu } from "react-icons/im";
import { MdShoppingBag } from "react-icons/md";
import { FcContacts } from "react-icons/fc";
import { SlCalender } from "react-icons/sl";
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa";
import { TbStarsFilled } from "react-icons/tb";
import { TbBrandBooking } from "react-icons/tb";
import { ImSpoonKnife } from "react-icons/im";
import { FaList } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${user?.email}`)
      .then((response) => {
        const data = response.data;
        setIsAdmin(data.isAdmin);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Navigation links
  const adminNavOptions = (
    <>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <FcHome className="text-xl" />
        <Link to="/dashboard/admin-home">Admin Home</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <ImSpoonKnife className="text-xl" />
        <Link to="/dashboard/add-items">Add Items</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <FaList className="text-xl" />
        <Link to="/dashboard/manage-items">Manage Items</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <FaBook className="text-xl" />
        <Link to="/dashboard/manage-bookings">Manage Bookings</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <FaUsers className="text-xl" />
        <Link to="/dashboard/all-users">All Users</Link>
      </li>
    </>
  );

  const userNavOptions = (
    <ul>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <FaHome className="text-xl" />
        <Link to="/dashboard/user-home">User Home</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <SlCalender className="text-xl" />
        <Link to="/dashboard/reservation">Reservation</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <FaMoneyBillWave className="text-xl" />
        <Link to="/dashboard/payment-history">Payment History</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <FaOpencart className="text-xl" />
        <Link to="/dashboard/myCart">My Cart</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <TbStarsFilled className="text-xl" />
        <Link to="/dashboard/give-review">Add Review</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <TbBrandBooking className="text-xl" />
        <Link to="/dashboard/my-bookings">My Booking(s)</Link>
      </li>
    </ul>
  );

  const commonNavOptions = (
    <ul>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <AiTwotoneHome className="text-xl" />
        <Link to="/">Home</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <ImMenu className="text-xl" />
        <Link to="/menu">Menu</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <MdShoppingBag className="text-xl" />
        <Link to="/order">Shop</Link>
      </li>
      <li className="flex items-center gap-2 btn btn-ghost bg-transparent text-black hover:bg-[#D1A054] hover:text-white transition duration-200">
        <FcContacts className="text-xl" />
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out bg-[#D1A054] min-h-screen p-4 text-black   `}
      >
        <div className={` mb-4 ${isSidebarOpen ? "block" : "hidden"}`}>
          <h2 className="font-extrabold text-lg mt-2">BISTRO BOSS</h2>
          <p className="font-bold tracking-widest text-sm mb-2">RESTAURANT</p>
        </div>

        {/* Toggle Arrow */}
        <div className="animate-bounce">
          <button onClick={toggleSidebar} className="text-2xl text-white">
            {isSidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <div
          className={`mt-4 ${
            isSidebarOpen ? "block" : "hidden"
          } flex flex-col gap-4`}
        >
          <div>
            {isAdmin === true ? <>{adminNavOptions}</> : <>{userNavOptions}</>}
          </div>
          <hr className="text-white my-4" />
          <div>{commonNavOptions}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
