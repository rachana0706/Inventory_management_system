import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Each function returns response.data so components deal with plain
// { success, data, count } objects rather than the full axios response.

export const fetchProducts = (params = {}) =>
  api.get("/products", { params }).then((res) => res.data);

export const fetchLowStockProducts = () =>
  api.get("/products/low-stock").then((res) => res.data);

export const createProduct = (product) =>
  api.post("/products", product).then((res) => res.data);

export const updateProduct = (id, product) =>
  api.put(`/products/${id}`, product).then((res) => res.data);

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`).then((res) => res.data);

export default api;
