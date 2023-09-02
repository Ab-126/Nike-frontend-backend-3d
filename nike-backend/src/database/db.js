const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI

let client;

const getDB = () => {
  if (!client) {
    client = new MongoClient(url);
  }

  const database = client.db("test");
  const products = database.collection("products");
  const orders = database.collection("orders");

  return {
    products,
    orders,
  };
};

module.exports = getDB;
