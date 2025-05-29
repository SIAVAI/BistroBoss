/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import registerImage from "../../assets/others/authentication2.png";
import bg from "../../assets/others/authentication.png";

const Registration = () => {
  return (
    <section
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        filter: "brightness(0.8)",
        backdropFilter: "blur(5px)",
        height: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Form Area */}
        <div className="p-8 md:p-12 bg-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Type here"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded font-semibold transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already registered?{" "}
            <Link to="/login" className="text-yellow-600 hover:underline">
              Go to log in
            </Link>
          </p>

          <div className="text-center mt-6 text-sm text-gray-500">
            Or sign up with
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <button className="text-xl hover:text-yellow-600 transition">
              <FaFacebookF />
            </button>
            <button className="text-xl hover:text-yellow-600 transition">
              <FaGoogle />
            </button>
            <button className="text-xl hover:text-yellow-600 transition">
              <FaGithub />
            </button>
          </div>
        </div>

        {/* Image Area */}
        <div className="hidden md:flex items-center justify-center bg-white p-8">
          <img src={registerImage} alt="sign-up" className="w-3/4" />
        </div>
      </motion.div>
    </section>
  );
};

export default Registration;
