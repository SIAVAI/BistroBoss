import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import Error from "../Components/Error/Error";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/DashBoard/User/MyCart/MyCart";
import AllUsers from "../Pages/DashBoard/Admin/AllUsers/AllUsers";
import AddItems from "../Pages/DashBoard/Admin/AddItems/AddItems";
import ManageItems from "../Pages/DashBoard/Admin/ManageItems/ManageItems";
import UpdateItem from "../Pages/DashBoard/Admin/UpdateItem/UpdateItem";
import Payment from "../Pages/DashBoard/User/Payment/Payment";
import GiveReview from "../Pages/DashBoard/User/GiveReview/GiveReview";
import Reservation from "../Pages/DashBoard/User/Reservation/Reservation";
import PaymentHistory from "../Pages/DashBoard/User/PaymentHistory/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: (
          <PrivateRoute>
            <Menu></Menu>
          </PrivateRoute>
        ),
      },
      {
        path: "/order",
        element: (
          <PrivateRoute>
            <Order></Order>
          </PrivateRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <PrivateRoute>
            <Contact></Contact>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "/dashboard/myCart",
        element: <MyCart></MyCart>,
      },
      {
        path: "/dashboard/all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/add-items",
        element: <AddItems></AddItems>,
      },
      {
        path: "/dashboard/manage-items",
        element: <ManageItems></ManageItems>,
      },
      {
        path: "/dashboard/update-item/:id",
        element: <UpdateItem></UpdateItem>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/menu/${params.id}`),
      },
      {
        path: "/dashboard/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/give-review",
        element: <GiveReview></GiveReview>,
      },
      {
        path: "/dashboard/reservation",
        element: <Reservation></Reservation>,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);
