const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const {
  addProduct,
  getProducts,
  getLowStockProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// NOTE: /low-stock must be declared BEFORE /:id, otherwise Express
// would treat "low-stock" as an :id value and route it to getProductById.
router.get("/low-stock", asyncHandler(getLowStockProducts));

router.route("/")
  .post(asyncHandler(addProduct))
  .get(asyncHandler(getProducts));

router.route("/:id")
  .get(asyncHandler(getProductById))
  .put(asyncHandler(updateProduct))
  .delete(asyncHandler(deleteProduct));

module.exports = router;
