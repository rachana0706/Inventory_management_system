import React, { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  category: "",
  price: "",
  quantity: "",
  minStock: "",
};


function ProductForm({ editingProduct, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
        minStock: editingProduct.minStock,
      });
    } else {
      setForm(emptyForm);
    }
    setFormError("");
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.category.trim()) {
      setFormError("Name and category are required.");
      return;
    }
    if (form.price === "" || Number(form.price) < 0) {
      setFormError("Price must be a non-negative number.");
      return;
    }
    if (form.quantity === "" || Number(form.quantity) < 0) {
      setFormError("Quantity must be a non-negative number.");
      return;
    }
    if (form.minStock === "" || Number(form.minStock) < 0) {
      setFormError("Minimum stock must be a non-negative number.");
      return;
    }

    setFormError("");
    onSubmit({
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      quantity: Number(form.quantity),
      minStock: Number(form.minStock),
    });

    if (!editingProduct) setForm(emptyForm);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Update Product" : "Add Product"}</h2>

      {formError && <p className="form-error">{formError}</p>}

      <div className="form-row">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Wireless Mouse"
          />
        </label>

        <label>
          Category
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Electronics"
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Price (₹)
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            min="0"
            value={form.quantity}
            onChange={handleChange}
          />
        </label>

        <label>
          Min Stock
          <input
            type="number"
            name="minStock"
            min="0"
            value={form.minStock}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingProduct ? "Save Changes" : "Add Product"}
        </button>
        {editingProduct && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
