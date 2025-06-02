/* eslint-disable no-unused-vars */
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaDatabase, FaUsers, FaChartPie, FaMoneyBill } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AdminHome = () => {
  const { data = {} } = useQuery({
    queryKey: ["admin-stat"],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin-stats`
      );
      return result.data;
    },
  });

  const { users = 0, menu = 0, orders = 0, revenue = 0 } = data;

  const collectionStats = [
    { name: "Menu Items", count: menu },
    { name: "Total Orders", count: orders },
    { name: "Users", count: users },
  ];

  const pieColors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#d88484",
  ];
  const { data: userPayments = [] } = useQuery({
    queryKey: ["user-payments"],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-payments`
      );
      return result.data;
    },
  });
  const { data: categoryStats = [] } = useQuery({
    queryKey: ["category-stats"],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/category-stats`
      );
      return result.data;
    },
  });

  return (
    <>
      <div className="text-center my-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Hi, Welcome Back!!!
        </h2>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 bg-white">
        <motion.div whileHover={{ scale: 1.03 }}>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              💰 Revenue
            </h2>
            <p className="text-3xl font-bold">${revenue}</p>
          </div>
        </motion.div>

        <div className="col-span-1 md:col-span-2 xl:col-span-3 mt-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaChartPie /> Revenue by Category (Pie Chart)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  dataKey="totalRevenue"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaChartPie /> Admin Stats Overview (Bar Chart)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={collectionStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-3 mt-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaChartPie /> User Purchase Amounts
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userPayments}>
                <XAxis dataKey="email" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
