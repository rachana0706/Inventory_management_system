import React from "react";

function Filters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  showLowStockOnly,
  onToggleLowStock,
  lowStockCount,
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />

      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label className="low-stock-toggle">
        <input
          type="checkbox"
          checked={showLowStockOnly}
          onChange={(e) => onToggleLowStock(e.target.checked)}
        />
        Show low stock only ({lowStockCount})
      </label>
    </div>
  );
}

export default Filters;
