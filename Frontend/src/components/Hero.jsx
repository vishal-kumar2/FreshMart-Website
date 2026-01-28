import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="
        relative min-h-[70vh]  sm:min-h-50 md:min-h-screen md:h-130
        bg-center bg-no-repeat
        bg-[url('/Banner-mobile.png')]
        md:bg-[url('/Banner.png')]
        bg-cover
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6">
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Fresh Groceries <br />
            <span className="text-green-600">Delivered Daily</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-700">
            Get farm-fresh fruits, vegetables, and daily essentials delivered
            straight to your doorstep.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-base sm:text-lg font-medium">
              <Link to="/products">Shop Now</Link>
            </button>

            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg text-base sm:text-lg font-medium hover:bg-green-50">
              <Link to="/offers">View Offers</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
