/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import registerImage from "../../assets/others/authentication2.png";
import bg from "../../assets/others/authentication.png";
import { Bounce, toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Registration = () => {
  const axiosPublic = useAxiosPublic();
  const { signInWithGoogle, createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSignUp = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log("User created:", result.user);
        toast.success("Registration Successful!");

        axiosPublic
          .post("/users", {
            name: data.name,
            email: data.email,
            isAdmin: false,
          })
          .then((response) => {
            console.log("User registered:", response.data);
            toast.success("User registered successfully!");
          });
        reset();
        navigate("/");
      })
      .catch((err) => {
        console.error("Registration failed:", err.message);
        toast.error(`Something went wrong!!!`);
        toast.error(`${err.message}`);
      });

    console.log("Form Data:", data);
    reset();
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Google Sign-In:", result.user);
        axiosPublic
          .post("/users", {
            name: result.user.name || result.user.displayName,
            email: result.user.email,
            isAdmin: false,
          })
          .then((response) => {
            console.log("User registered:", response.data);
            toast.success("User registered successfully!");
            reset();
            navigate("/");
            toast.success("Logged In Successfully!");
          })
          .catch((err) => {
            console.error("Error registering user:", err.message);
            toast.error(`Something went wrong!!!`);
            toast.error(`${err.message}`);
          });
      })
      .catch((err) => {
        console.error("Google Login failed:", err.message);
        toast.error(`Something went wrong!!!`);
        toast.error(`${err.message}`);
      });
  };

  return (
    <>
      <Helmet>
        <title>Bistro | Sign Up</title>
      </Helmet>

      <section
        className="min-h-screen flex items-center justify-center px-4 bg-gray-100"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          filter: "brightness(0.8)",
          backdropFilter: "blur(5px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          {/* Form Area */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

            <form onSubmit={handleSubmit(handleSignUp)} noValidate>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Type your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
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
              <button
                onClick={handleGoogleLogin}
                className="text-xl hover:text-yellow-600 transition"
              >
                <FaGoogle />
              </button>
            </div>
          </div>

          {/* Image Area */}
          <div className="hidden md:flex items-center justify-center bg-white p-8">
            <img src={registerImage} alt="sign-up" className="w-3/4" />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Registration;
