const About = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          About FreshMart
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          FreshMart is your one-stop destination for fresh groceries,
          daily essentials, and household needs — delivered with
          quality and convenience in mind.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT TEXT */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 mb-4">
            FreshMart was built with a simple goal: to make grocery
            shopping easier, faster, and more reliable. We partner
            with trusted suppliers to ensure that every product meets
            high quality standards.
          </p>
          <p className="text-gray-700">
            From fresh fruits and vegetables to daily household
            essentials, our platform is designed to save your time and
            provide a smooth shopping experience.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="rounded-xl overflow-hidden shadow">
          <img
            src="/logo.webp"
            alt="Fresh groceries"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* VALUES */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Our Values
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="font-semibold text-lg mb-2">
              Quality Products
            </h3>
            <p className="text-gray-600 text-sm">
              We carefully select products to ensure freshness and
              reliability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="font-semibold text-lg mb-2">
              Customer First
            </h3>
            <p className="text-gray-600 text-sm">
              Your satisfaction is our priority at every step.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="font-semibold text-lg mb-2">
              Fast & Secure
            </h3>
            <p className="text-gray-600 text-sm">
              Smooth ordering, secure payments, and reliable delivery.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
