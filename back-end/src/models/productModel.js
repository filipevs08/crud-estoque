const connection = require("../database/connection");

// acessa o banco de dados e retorna os produtos que estão cadastrados
const getProducts = async () => {
  // faz a query para o banco de dados
  const products = await connection.execute("SELECT * FROM products");

  return products[0];
};

const createProduct = async (product) => {
  const { name, categorie, quantity } = product;

  const createdProduct = await connection.execute(
    "INSERT INTO products(name,categorie,quantity) VALUES (?,?,?)",
    [name, categorie, quantity]
  );
};
const deleteProduct = async (id) => {
  const deletedProduct = await connection.execute(
    "DELETE FROM products WHERE ID = ?",
    [id]
  );
  return deletedProduct;
};
const updateProduct = async (id, product) => {
  const { name, categorie, quantity } = product;
  const updatedProduct = await connection.execute(
    "UPDATE products SET name = ?, categorie = ?, quantity = ? WHERE ID = ?",
    [name, categorie, quantity, id]
  );
  return updatedProduct;
};
module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
