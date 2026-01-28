import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.webp" alt="FreshMart" className="h-10" />
            <span className="text-2xl font-bold text-green-500">
              FreshMart
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            FreshMart brings farm-fresh groceries and daily essentials
            straight to your doorstep with fast and reliable delivery.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-green-500">Home</Link></li>
            <li><Link to="/products" className="hover:text-green-500">Products</Link></li>
            <li><Link to="/offers" className="hover:text-green-500">Offers</Link></li>
            <li><Link to="/cart" className="hover:text-green-500">Cart</Link></li>
          </ul>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>FAQ</li>
            <li>Shipping & Delivery</li>
            <li>Returns & Refunds</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Mail size={16} /> support@freshmart.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </p>
            <div className="flex gap-4 mt-4">
              <Facebook className="hover:text-green-500 cursor-pointer" />
              <Instagram className="hover:text-green-500 cursor-pointer" />
              <Twitter className="hover:text-green-500 cursor-pointer" />
              <Linkedin className="hover:text-green-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 py-4 text-center text-sm">
        © {new Date().getFullYear()} FreshMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
