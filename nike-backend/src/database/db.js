const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://abhi:abhi@cluster0.nt88kzf.mongodb.net/?retryWrites=true&w=majority";

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
