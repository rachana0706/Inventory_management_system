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


app.use(notFound);


app.use(errorHandler);

module.exports = app;
