import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Featured = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get("/products?limit=10");
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to load featured products");
      }
    };

    fetchFeatured();
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          Featured Products
        </h2>

        {/* ARROWS */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-white shadow rounded-full hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="p-2 bg-white shadow rounded-full hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* SCROLLABLE PRODUCTS */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="min-w-55 bg-white rounded-xl shadow hover:shadow-lg transition p-4 shrink-0"
          >
            {/* IMAGE */}
            <div className="h-40 bg-gray-100 rounded mb-3 overflow-hidden">
              <img
                src={
                  product.images?.[0]?.url ||
                  "/placeholder.png"
                }
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </div>

            {/* INFO */}
            <h3 className="font-semibold truncate">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500">
              {product.category}
            </p>

            <p className="text-green-600 font-bold mt-1">
              ₹{product.finalPrice}
            </p>

            {/* VIEW PRODUCT */}
            <button
              onClick={() =>
                navigate(`/products/${product._id}`)
              }
              className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
