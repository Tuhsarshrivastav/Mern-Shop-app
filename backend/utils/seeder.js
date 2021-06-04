const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/db");

const products = require("../data/products.json");

// stting env
dotenv.config({ path: ".env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("products are deleted");
    await Product.insertMany(products);
    console.log("All products are added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
