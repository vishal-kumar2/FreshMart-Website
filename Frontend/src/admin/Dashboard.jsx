import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, o, u] = await Promise.all([
          api.get("/products"),
          api.get("/orders"),
          api.get("/users"),
        ]);

        setStats({
          products: p.data.totalProducts || p.data.products.length,
          orders: o.data.orders.length,
          users: u.data.users.length,
        });
      } catch (error) {
        console.error("Stats load failed");
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Products" value={stats.products} />
        <StatCard title="Orders" value={stats.orders} />
        <StatCard title="Users" value={stats.users} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;
