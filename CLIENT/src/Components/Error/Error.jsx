import { Link, useNavigate } from "react-router-dom";
import errorGif from "../../assets/404.gif";

const Error = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white min-h-screen flex items-center justify-center px-6 py-12">
      <div className="container mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="lg:w-1/2">
          <p className="text-sm font-medium text-gray-500">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500">
            Sorry, the page you are looking for doesn’t exist. Here are some
            helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3 max-w-xs">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 bg-white border rounded-lg gap-x-2 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </button>

            <Link
              to="/"
              className="w-1/2 px-5 py-2 text-sm text-white bg-gray-500 rounded-lg text-center hover:bg-gray-600"
            >
              Take me HOME
            </Link>
          </div>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <img
            className="w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-contain"
            src={errorGif}
            alt="404 error"
          />
        </div>
      </div>
    </section>
  );
};

export default Error;
