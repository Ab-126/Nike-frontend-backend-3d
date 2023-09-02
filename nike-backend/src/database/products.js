const getDB = require("./db");
const { ObjectId } = require("mongodb");

const getAllProducts = async () => {
  const products = await getDB().products.find().toArray();
  return products;
};

const getProduct = async (id) => {
  const product = await getDB().products.findOne({ _id: new ObjectId(id) });
  return product;
};

module.exports = {
  getAllProducts,
  getProduct,
};
