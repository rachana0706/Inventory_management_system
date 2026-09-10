import React from "react";

function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="empty-state">No products match the current filters.</p>;
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price (₹)</th>
          <th>Quantity</th>
          <th>Min Stock</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const isLowStock = product.quantity <= product.minStock;
          return (
            <tr key={product.id} className={isLowStock ? "low-stock-row" : ""}>
              <td>
                {product.name}
                {isLowStock && <span className="low-stock-badge">Low Stock</span>}
              </td>
              <td>{product.category}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{product.minStock}</td>
              <td>{new Date(product.createdAt).toLocaleDateString()}</td>
              <td className="actions-cell">
                <button className="btn btn-small" onClick={() => onEdit(product)}>
                  Edit
                </button>
                <button
                  className="btn btn-small btn-danger"
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductTable;
