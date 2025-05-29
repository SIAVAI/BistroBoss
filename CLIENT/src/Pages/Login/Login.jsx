/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import loginImage from "../../assets/others/authentication2.png";
import bg from "../../assets/others/authentication.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);
  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log("User logged in successfully:", user);
        form.reset();
        setCaptcha(generateCaptcha());
        setUserInput("");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };
  const reloadCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserInput("");
  };

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
        {/* Left image */}
        <div className="hidden md:flex items-center justify-center bg-white p-8">
          <img src={loginImage} alt="login" className="w-3/4" />
        </div>

        {/* Right form */}
        <div className="p-8 md:p-12 bg-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                placeholder="Type here"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {/* Captcha */}
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
              disabled={userInput.toLowerCase() !== captcha.toLowerCase()}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded font-semibold transition"
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
            <button className="text-xl hover:text-yellow-600 transition">
              <FaGoogle />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
