import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { FaRegUser } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  const { data = {} } = useQuery({
    queryKey: ["user-home-stats"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-home-stats?email=${user?.email}`
      );
      return res.data;
    },
  });

  const { orders = 0, payments = 0, reservations = 0, reviews = 0 } = data;

  const pieData = [
    { name: "Orders", value: orders },
    { name: "Payments", value: payments },
    { name: "Reservations", value: reservations },
    { name: "Reviews", value: reviews },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-4 bg-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <FaRegUser /> Welcome to Your Dashboard
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Your Activity Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
