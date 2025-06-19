const productModel = require("../models/productModel");
const getProducts = async (req, res, next) => {
  try {
    const product = await productModel.getProducts();

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.createProduct(req.body);

    return res.status(201).json(req.body);
  } catch (err) {
    next(err);
  }
};
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await productModel.deleteProduct(id);
    return res.status(204).json({ message: "Produto removido com sucesso" });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, err) => {
  const { id } = req.params;
  try {
    await productModel.updateProduct(id, req.body);

    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
