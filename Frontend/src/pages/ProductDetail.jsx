import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Toast from "../components/Alert";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ TOAST STATE
  const [showToast, setShowToast] = useState(false);

  // 🔄 FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
      } catch (error) {
        console.error("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🛒 ADD TO CART
  const handleAddToCart = async () => {
    try {
      await api.post("/cart/add", {
        productId: id,
        quantity: 1,
      });

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Please login to add items to cart"
      );
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg">
        Loading...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center mt-20 text-lg">
        Product not found
      </p>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* ✅ TOAST */}
      <Toast
        show={showToast}
        message="Product added to cart 🛒"
        onClose={() => setShowToast(false)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={product.images?.[0]?.url || "/placeholder.png"}
            alt={product.name}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {product.name}
          </h1>

          <p className="text-gray-500 mb-3">
            {product.category} • {product.unit}
          </p>

          {/* PRICE */}
          <div className="mb-4">
            <p className="text-green-600 text-2xl font-bold">
              ₹{product.finalPrice}
            </p>

            {product.discount > 0 && (
              <p className="text-gray-400 line-through">
                MRP ₹{product.price}
              </p>
            )}
          </div>

          <p className="text-gray-700 mb-6">
            {product.description}
          </p>

          <p className="mb-4">
            <span className="font-medium">Stock:</span>{" "}
            {product.stock > 0 ? (
              <span className="text-green-600">
                In Stock
              </span>
            ) : (
              <span className="text-red-600">
                Out of Stock
              </span>
            )}
          </p>

          <button
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className={`px-6 py-3 rounded-lg text-white font-medium transition ${
              product.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {product.stock === 0
              ? "Out of Stock"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
