import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Request Interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      console.log("Stopped by interceptors!!");

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Response Interceptor for handling errors (401, 403)
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response ? error.response.status : null;
      console.log("Status Code ERROR in interceptor", status);
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
