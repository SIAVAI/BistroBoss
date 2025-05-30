/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/others/authentication2.png";
import bg from "../../assets/others/authentication.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const generateCaptcha = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const reloadCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserInput("");
  };

  const onSubmit = (data) => {
    if (userInput.toLowerCase() !== captcha.toLowerCase()) {
      alert("Captcha does not match");
      return;
    }

    signIn(data.email, data.password)
      .then((result) => {
        console.log("User logged in:", result.user);
        reset();
        setUserInput("");
        setCaptcha(generateCaptcha());
        navigate("/");
        toast.success("Logged In Successfully!");
      })
      .catch((err) => {
        console.error("Login failed:", err.message);
        toast.error(`Something went wrong!!!`);
        toast.error(`${err.message}`);
      });
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
          });
        navigate("/");
        toast.success("Logged In Successfully!");
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
        <title>Login - Bistro</title>
      </Helmet>

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
          {/* Left image */}
          <div className="hidden md:flex items-center justify-center bg-white p-8">
            <img src={loginImage} alt="login" className="w-3/4" />
          </div>

          {/* Right form */}
          <div className="p-8 md:p-12 bg-white flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    Email is required
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    Password is required
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Captcha</span>
                  <button
                    type="button"
                    onClick={reloadCaptcha}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Reload Captcha
                  </button>
                </div>
                <input
                  type="text"
                  value={captcha}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 bg-gray-200 rounded text-center font-mono tracking-widest"
                />
                <input
                  type="text"
                  placeholder="Type here"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <button
                type="submit"
                disabled={userInput.toLowerCase() !== captcha.toLowerCase()}
                className={`w-full py-2 rounded font-semibold transition ${
                  userInput.toLowerCase() !== captcha.toLowerCase()
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-yellow-600 hover:bg-yellow-700 text-white"
                }`}
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              New here?{" "}
              <Link
                to="/registration"
                className="text-yellow-600 hover:underline"
              >
                Create a New Account
              </Link>
            </p>

            <div className="text-center mt-6 text-sm text-gray-500">
              or sign in with
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
        </motion.div>
      </section>
    </>
  );
};

export default Login;
