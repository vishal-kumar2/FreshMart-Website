import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      // 1️⃣ LOGIN (sets httpOnly cookie)
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        formData,
        { withCredentials: true }
      );

      // 2️⃣ FETCH PROFILE (reads cookie)
      const profileRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        { withCredentials: true }
      );

      // 3️⃣ UPDATE GLOBAL AUTH STATE
      setUser(profileRes.data.user);

      // 4️⃣ REDIRECT
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-yellow-100 flex items-center justify-center py-12 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE */}
        <div className="hidden md:flex bg-green-800 text-white flex-col justify-center p-10">
          <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
          <p className="text-lg opacity-90">
            Login to access fresh groceries delivered to your doorstep.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>✔ Fast delivery</li>
            <li>✔ Best prices</li>
            <li>✔ Fresh products</li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
            Login Account
          </h2>

          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-800 transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
