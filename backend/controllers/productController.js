const Product = require("../models/Product");

// @desc    Add a new product
// @route   POST /products
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

// @desc    Get all products (supports optional search & category filter
//          via query params, e.g. /products?search=phone&category=Electronics)
// @route   GET /products
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

// @desc    Get products whose quantity has fallen to/below their minStock
// @route   GET /products/low-stock
const getLowStockProducts = async (req, res) => {
  // $expr lets us compare two fields of the same document
  const lowStockProducts = await Product.find({
    $expr: { $lte: ["$quantity", "$minStock"] },
  }).sort({ quantity: 1 });

  res.status(200).json({
    success: true,
    count: lowStockProducts.length,
    data: lowStockProducts,
  });
};

// @desc    Get a single product by id
// @route   GET /products/:id
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, data: product });
};

// @desc    Update a product
// @route   PUT /products/:id
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

// @desc    Delete a product
// @route   DELETE /products/:id
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
