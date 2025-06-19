const express = require("express");
const Router = express.Router();
const productController = require("./controller/productController");
const productMiddleware = require("./middlewares/productMiddleware");

Router.get("/products", productController.getProducts);

Router.post(
  "/create-product",
  productMiddleware.validationChain(),
  productMiddleware.validateBody,
  productController.createProduct
);

Router.delete("/delete-product/:id", productController.deleteProduct);

Router.put(
  "/update-product/:id",
  productMiddleware.validationChain(),
  productMiddleware.validateBody,
  productController.updateProduct
);

module.exports = Router;
