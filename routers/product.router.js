const express = require("express");
const ProductRouter = express.Router();
const productController = require("../controllers/product.controller");

ProductRouter.post("/create", productController.createProduct);
ProductRouter.get("/all", productController.getAllProducts);
ProductRouter.get("/:id", productController.getProductById);
ProductRouter.put("/update/:id", productController.updateProductById);
ProductRouter.delete("/delete/:id", productController.deleteProductById);

module.exports = ProductRouter;