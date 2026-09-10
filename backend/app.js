const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Inventory Management API is running" });
});

app.use("/products", productRoutes);

// 404 handler for unmatched routes
app.use(notFound);

// Centralized error handler (must be last)
app.use(errorHandler);

module.exports = app;
