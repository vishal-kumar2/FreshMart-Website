import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    stock: "",
    unit: "pcs",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/products/${id}`);
      const p = data.product;

      setForm({
        name: p.name,
        price: p.price,
        discount: p.discount,
        stock: p.stock,
        unit: p.unit,
      });

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await api.put(`/products/${id}`, {
      price: Number(form.price),
      discount: Number(form.discount),
      stock: Number(form.stock),
      unit: form.unit,
    });

    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <form className="bg-white p-6 rounded-xl shadow max-w-xl" onSubmit={submitHandler}>
        <p className="mb-4 text-center text-2xl font-medium">
          {form.name}
        </p>
        <label className="block text-sm font-medium mb-1">
          Price
         </label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />
        <label className="block text-sm font-medium mb-1">
          Discount
         </label>
        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={form.discount}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />
        <label className="block text-sm font-medium mb-1">
          Stock
         </label>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <label className="block text-sm font-medium mb-1">
          Unit
         </label>
        <select
          name="unit"
          value={form.unit}
          onChange={handleChange}
          className="w-full border p-3 mb-6 rounded"
        >
          <option value="pcs">pcs</option>
          <option value="kg">kg</option>
          <option value="gm">gm</option>
          <option value="ltr">ltr</option>
          <option value="ml">ml</option>
        </select>

        <button className="bg-green-600 text-white px-6 py-3 rounded w-full">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
