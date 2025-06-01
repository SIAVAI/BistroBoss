/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { motion } from "framer-motion";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments?email=${user.email}`)
        .then((res) => {
          setPayments(res.data.result || []);
        })
        .catch((err) => {
          console.error("Failed to fetch payments", err);
        });
    }
  }, [user?.email, axiosSecure]);
  return (
    <div className="max-w-auto mx-auto px-4 py-8">
      <SectionTitle
        subheading="At A Glance"
        heading="Payment history"
      ></SectionTitle>
      <h2 className="text-xl font-bold mb-4">
        PAYMENTS:{" "}
        <span className="text-indigo-600 font-extrabold">
          {payments.length}
        </span>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto bg-white rounded-lg shadow"
      >
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-yellow-500 text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Total Price</th>
              <th className="px-4 py-3">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">{payment.email}</td>
                <td className="px-4 py-3">
                  {payment.category || "Food Order"}
                </td>
                <td className="px-4 py-3">
                  ${(payment.amount / 100).toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  {new Date(payment.paymentDate).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default PaymentHistory;
