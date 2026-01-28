import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SIDEBAR_WIDTH = "w-64";

const AdminLayout = () => {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded transition ${
      isActive
        ? "bg-green-600 text-white"
        : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <div className="flex">
      {/* SIDEBAR (FIXED, NO SCROLL) */}
      <aside
        className={`${SIDEBAR_WIDTH} fixed inset-y-0 left-0 bg-gray-900 text-white p-6 flex flex-col`}
      >
        <h2 className="text-2xl font-bold mb-8 text-green-400">
          Admin Panel
        </h2>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-2 flex-1">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/products" end className={linkClass}>
            Products
          </NavLink>

          <NavLink to="/admin/products/add" className={linkClass}>
            Add Product
          </NavLink>

          <NavLink to="/admin/orders" className={linkClass}>
            Orders
          </NavLink>

          <NavLink to="/admin/users" className={linkClass}>
            Users
          </NavLink>
        </nav>

        {/* BACK TO STORE */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-200"
        >
          <ArrowLeft size={18} />
          Back to Store
        </button>
      </aside>

      {/* MAIN CONTENT (SCROLLABLE) */}
      <main
        className={`ml-64 flex-1 min-h-screen bg-gray-100 p-8 overflow-y-auto`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
