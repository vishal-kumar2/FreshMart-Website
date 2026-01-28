import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `relative ${
      isActive
        ? "text-green-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-green-600"
        : "hover:text-green-600"
    }`;

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center gap-6 px-6 py-3">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.webp"
            alt="Grocery Logo"
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold text-green-600">
            FreshMart
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-6 font-medium text-gray-700">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/offers" className={navLinkClass}>
            Offers
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          {/* ADMIN LINK */}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className="flex items-center gap-1 hover:text-black font-medium"
            >
              <Shield size={16} />
              Admin
            </NavLink>
          )}
        </nav>

        {/* SEARCH */}
        <div className="flex-1 hidden md:flex">
          <div className="relative w-full">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search for groceries..."
              className="w-full pl-10 pr-4 py-2 rounded-full border"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 ml-auto">
          {/* 👉 CART (ONLY WHEN LOGGED IN) */}
          {user && (
            <Link to="/cart" className="relative">
              <ShoppingCart size={26} />
            </Link>
          )}

          {/* AUTH */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-full hover:bg-green-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <User size={26} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100 font-medium"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col px-6 py-4 gap-4 font-medium text-gray-700">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/products" onClick={() => setIsOpen(false)}>
              Products
            </Link>
            <Link to="/offers" onClick={() => setIsOpen(false)}>
              Offers
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="font-semibold"
              >
                Admin Panel
              </Link>
            )}

            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
