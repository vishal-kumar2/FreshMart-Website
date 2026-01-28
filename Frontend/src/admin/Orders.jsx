import { useEffect, useState } from "react";
import api from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await api.get("/orders");
      setOrders(data.orders);
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });
    setOrders(
      orders.map((o) =>
        o._id === id ? { ...o, status } : o
      )
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white p-4 mb-4 rounded shadow"
        >
          <p>Order ID: {order._id}</p>
          <p>Total: ₹{order.totalPrice}</p>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(order._id, e.target.value)
            }
            className="border p-2 mt-2"
          >
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Orders;
