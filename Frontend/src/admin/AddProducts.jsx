import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const categories = [
  "Fruits & Vegetables",
  "Dairy & Bakery",
  "Beverages",
  "Snacks",
  "Grains & Pulses",
  "Personal Care",
  "Household",
];

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    discount: "",
    stock: "",
    unit: "pcs",
    expiryDate: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ------------------ HANDLERS ------------------ */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ------------------ SUBMIT ------------------ */
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!image) {
      setError("Product image is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      // 🔥 IMPORTANT: MUST MATCH upload.single("image")
      formData.append("image", image);

      await api.post("/products/add", formData);

      navigate("/admin/products");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ UI ------------------ */
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-xl shadow max-w-2xl space-y-4"
      >
        {error && <p className="text-red-600">{error}</p>}

        <input
          name="name"
          placeholder="Product Name"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="brand"
          placeholder="Brand (optional)"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="category"
          required
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            onChange={handleChange}
            className="border p-3 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            required
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="unit"
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="pcs">pcs</option>
            <option value="kg">kg</option>
            <option value="gm">gm</option>
            <option value="ltr">ltr</option>
            <option value="ml">ml</option>
          </select>
        </div>

        <input
          type="date"
          name="expiryDate"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block font-medium mb-1">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 h-28 w-28 object-cover rounded border"
            />
          )}
        </div>

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
