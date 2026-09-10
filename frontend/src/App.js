import React, { useEffect, useMemo, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import Filters from "./components/Filters";
import {
  fetchProducts,
  fetchLowStockProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/api";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [lowStockIds, setLowStockIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const [allRes, lowStockRes] = await Promise.all([
        fetchProducts(),
        fetchLowStockProducts(),
      ]);
      setProducts(allRes.data);
      setLowStockIds(new Set(lowStockRes.data.map((p) => p.id)));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not reach the server. Is the backend running on the configured port?"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddOrUpdate = async (formData) => {
    setError("");
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    setError("");
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product.");
    }
  };

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  );

  const visibleProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? p.category === category : true;
      const matchesLowStock = showLowStockOnly ? lowStockIds.has(p.id) : true;
      return matchesSearch && matchesCategory && matchesLowStock;
    });
  }, [products, search, category, showLowStockOnly, lowStockIds]);

  return (
    <div className="app-container">
      <header>
        <h1>Inventory Management System</h1>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <ProductForm
        editingProduct={editingProduct}
        onSubmit={handleAddOrUpdate}
        onCancel={() => setEditingProduct(null)}
      />

      <section className="product-list-section">
        <div className="section-header">
          <h2>Products</h2>
          <Filters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            categories={categories}
            showLowStockOnly={showLowStockOnly}
            onToggleLowStock={setShowLowStockOnly}
            lowStockCount={lowStockIds.size}
          />
        </div>

        {loading ? (
          <p className="loading-state">Loading products...</p>
        ) : (
          <ProductTable
            products={visibleProducts}
            onEdit={setEditingProduct}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
}

export default App;
