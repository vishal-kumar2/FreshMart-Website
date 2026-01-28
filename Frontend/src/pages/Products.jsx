import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Toast from "../components/Alert";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  

  // 🔄 FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🛒 ADD TO CART
  const handleAddToCart = async (e, productId) => {
  e.stopPropagation();

  try {
    await api.post("/cart/add", {
      productId,
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

  // 🔍 PRODUCT CLICK → DETAILS PAGE
  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg">
        Loading products...
      </p>
    );
  }


  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
       <Toast
      show={showToast}
      message="Product added to cart 🛒"
      onClose={() => setShowToast(false)}
    />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">
          All Products
        </h1>

        <div className="relative w-full md:w-80">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
          />
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products
          .filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <div
              key={product._id}
              onClick={() =>
                handleProductClick(product._id)
              }
              className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition relative"
            >
              {/* DISCOUNT BADGE */}
              {product.discount > 0 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              )}

              {/* IMAGE */}
              <div className="h-40 bg-gray-100 rounded mb-3 overflow-hidden">
                <img
                  src={
                    product.images?.[0]?.url ||
                    "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover transition"
                />
              </div>

              {/* INFO */}
              <h3 className="font-semibold text-lg truncate">
                {product.name}
              </h3>

              <p className="text-sm text-gray-500">
                {product.category} • {product.unit}
              </p>

              {/* PRICE */}
              <div className="mt-1">
                <p className="text-green-600 font-bold text-lg">
                  ₹{product.finalPrice}
                </p>

                {product.discount > 0 && (
                  <p className="text-sm text-gray-400 line-through">
                    MRP ₹{product.price}
                  </p>
                )}
              </div>

              {/* STOCK */}
              {product.stock === 0 && (
                <p className="text-red-500 text-sm font-medium mt-1">
                  Out of stock
                </p>
              )}

              {/* ADD TO CART */}
              <button
                onClick={(e) =>
                  handleAddToCart(e, product._id)
                }
                disabled={product.stock === 0}
                className={`mt-3 w-full py-2 rounded-lg transition ${
                  product.stock === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Products;
