import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔄 FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  // 🚀 FETCH ON MOUNT + WHEN RETURNING FROM EDIT PAGE
  useEffect(() => {
    fetchProducts();
  }, [location.pathname]);

  // 🔁 STOCK UPDATE
  const updateStock = async (id, newStock) => {
    if (newStock < 0) return;

    try {
      await api.put(`/products/${id}`, {
        stock: newStock,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, stock: newStock } : p
        )
      );
    } catch (err) {
      alert("Failed to update stock");
    }
  };

  // ❌ DELETE PRODUCT
  const deleteProduct = async (id) => {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) =>
        prev.filter((p) => p._id !== id)
      );
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t hover:bg-gray-50"
              >
                {/* NAME */}
                <td className="p-3">{p.name}</td>

                {/* PRICE */}
                <td className="p-3 text-center">
                  <div>
                    <p className="font-medium">
                      ₹{p.finalPrice}
                    </p>
                    {p.discount > 0 && (
                      <p className="text-xs text-gray-500">
                        MRP ₹{p.price} • {p.discount}% off
                      </p>
                    )}
                  </div>
                </td>

                {/* STOCK CONTROL */}
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() =>
                        updateStock(p._id, p.stock - 1)
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="font-medium">
                      {p.stock}
                    </span>

                    <button
                      onClick={() =>
                        updateStock(p._id, p.stock + 1)
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* ACTIONS */}
                <td className="p-3">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/products/${p._id}/edit`
                        )
                      }
                      className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
