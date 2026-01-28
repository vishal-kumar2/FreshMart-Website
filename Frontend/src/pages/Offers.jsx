import { Tag } from "lucide-react";
import { Link } from "react-router-dom";

const Offers = () => {
  // dummy offers (frontend-only)
  const offers = [
    {
      id: 1,
      title: "Flat 20% OFF",
      description: "On all fruits & vegetables",
      code: "FRESH20",
      bg: "bg-green-100",
    },
    {
      id: 2,
      title: "Buy 1 Get 1 Free",
      description: "On selected snacks",
      code: "B1G1",
      bg: "bg-amber-100",
    },
    {
      id: 3,
      title: "₹100 OFF",
      description: "On orders above ₹499",
      code: "SAVE100",
      bg: "bg-blue-100",
    },
    {
      id: 4,
      title: "Free Delivery",
      description: "On your first order",
      code: "FREEDEL",
      bg: "bg-purple-100",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Best Offers for You</h1>
        <p className="text-gray-600">
          Save more on your grocery shopping with exclusive deals
        </p>
      </div>

      {/* OFFERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`${offer.bg} rounded-xl p-6 shadow hover:shadow-lg transition`}
          >
            <div className="flex items-center gap-2 mb-3 text-green-700">
              <Tag />
              <span className="font-semibold">Special Offer</span>
            </div>

            <h3 className="text-xl font-bold mb-2">
              {offer.title}
            </h3>

            <p className="text-gray-700 mb-4">
              {offer.description}
            </p>

            <div className="bg-white rounded-lg px-4 py-2 flex justify-between items-center mb-4">
              <span className="font-mono font-semibold">
                {offer.code}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(offer.code)}
                className="text-sm text-green-600 hover:underline"
              >
                Copy
              </button>
            </div>

            <Link
              to="/products"
              className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Shop Now
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Offers;
