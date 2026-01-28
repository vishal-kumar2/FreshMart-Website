import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch cart
  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setCart(data.cart);
    } catch (error) {
      console.error("Error fetching cart", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔹 Update quantity
  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;

    try {
      await api.put("/cart/update", {
        productId,
        quantity: newQty,
      });
      fetchCart();
    } catch (error) {
      console.error("Update failed");
    }
  };

  // 🔹 Remove item
  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      fetchCart();
    } catch (error) {
      console.error("Remove failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-10 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Your cart is empty
        </h2>
        <Link
          to="/products"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Shop Now
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Link
          to="/products"
          className="text-green-600 font-medium hover:underline"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="bg-white rounded-xl shadow p-4 flex gap-4"
            >
              {/* IMAGE */}
              <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                <img
                  src={item.image || item.product.images?.[0]?.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>
                <p className="text-green-600 font-bold">
                  ₹{item.price}
                </p>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.quantity - 1
                      )
                    }
                    className="p-1 border rounded"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.quantity + 1
                      )
                    }
                    className="p-1 border rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* REMOVE */}
              <button
                onClick={() =>
                  removeItem(item.product._id)
                }
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{cart.totalPrice}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span className="text-green-600">FREE</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{cart.totalPrice}</span>
          </div>

          <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
