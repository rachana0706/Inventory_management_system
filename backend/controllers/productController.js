const Product = require("../models/Product");

const addProduct = async (req, res) => {
  const { name, category, price, quantity, minStock } = req.body;

  const product = await Product.create({
    name,
    category,
    price,
    quantity,
    minStock,
  });

  res.status(201).json({ success: true, data: product });
};


const getProducts = async (req, res) => {
  const { search, category } = req.query;
  const filter = {};

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
  if (category) {
    filter.category = { $regex: `^${category}$`, $options: "i" };
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: products.length, data: products });
};


const getLowStockProducts = async (req, res) => {

  const lowStockProducts = await Product.find({
    $expr: { $lte: ["$quantity", "$minStock"] },
  }).sort({ quantity: 1 });

  res.status(200).json({
    success: true,
    count: lowStockProducts.length,
    data: lowStockProducts,
  });
};


const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, data: product });
};


const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, data: product });
};


const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, data: {}, message: "Product deleted" });
};

module.exports = {
  addProduct,
  getProducts,
  getLowStockProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
