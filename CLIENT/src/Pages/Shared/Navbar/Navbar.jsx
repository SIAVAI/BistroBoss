import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext } from "react";
import person from "../../../assets/others/profile.png";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { LuShoppingCart } from "react-icons/lu";
import useCart from "../../../Hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart] = useCart();

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Logged out");
        navigate("/");
        toast.success("Logged out successfully!");
      })
      .catch((err) => {
        console.error("Logout failed:", err.message);
        toast.error(`Error: ${err.message}`);
      });
  };
  const navOptions = (
    <>
      <li className="hover:translate-y-1.5 transition duration-200">
        <Link to="/">HOME</Link>
      </li>
      <li className="hover:translate-y-1.5 transition duration-200">
        <Link to="/contact">CONTACT US</Link>
      </li>
      <li className="hover:translate-y-1.5 transition duration-200">
        <Link to="/dashboard">DASHBOARD</Link>
      </li>
      <li className="hover:translate-y-1.5 transition duration-200">
        <Link to="/menu">OUR MENU</Link>
      </li>
      <li className="hover:translate-y-1.5 transition duration-200">
        <Link to="/order">OUR SHOP</Link>
      </li>
      {user && (
        <>
          <li className="hover:translate-y-1.5 transition duration-200">
            <p onClick={handleLogout}>LOGOUT</p>
          </li>
          <li className="hover:translate-y-1.5 transition duration-200">
            <Link to="/dashboard/myCart" className="btn btn-ghost ">
              <LuShoppingCart />{" "}
              <div className="badge badge-sm badge-secondary">
                {cart.length}
              </div>
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div
      className="backdrop-blur-lg bg-opacity-30 fixed top-0 left-0 right-0 text-white z-50
"
    >
      <div className="navbar  shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost bg-transparent border-0  flex flex-col justify-center items-center font-[cinzel] gap-1 text-[#FFFFFF] p-2 hover:scale-105 transition duration-200"
          >
            <div className="font-extrabold text-lg mt-2">BISTRO BOSS</div>
            <div className="font-bold tracking-widest text-sm mb-2">
              Restaurant
            </div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="avatar hover:scale-110 hover:bg-amber-400 transition duration-200">
              <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2 ">
                <img src={person} alt="User avatar" />
              </div>
            </div>
          ) : (
            <div className="">
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
