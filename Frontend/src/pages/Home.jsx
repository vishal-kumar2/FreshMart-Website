import Hero from "../components/Hero";
import Featured from "../components/Featured";
import { useNavigate } from "react-router-dom";

const categories = [
  "Fruits & Vegetables",
  "Dairy & Bakery",
  "Beverages",
  "Snacks",
  "Grains & Pulses",
  "Personal Care",
  "Household",
  "Stationary"
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full">
      {/* HERO */}
      <Hero />

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() =>
                navigate(`/products?category=${category}`)
              }
              className="bg-green-50 hover:bg-green-100 cursor-pointer rounded-xl p-6 text-center font-semibold transition"
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS (FROM BACKEND) */}
      <Featured />

      {/* PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-green-600 text-white rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-2xl md:text-3xl font-bold">
            Free Delivery on Orders Above ₹499
          </h3>

          <button
            onClick={() => navigate("/products")}
            className="mt-4 md:mt-0 bg-white text-green-600 px-6 py-3 rounded-lg font-medium shadow hover:shadow-xl transition"
          >
            Shop Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
