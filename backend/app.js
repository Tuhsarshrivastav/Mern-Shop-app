const express = require("express");
const app = express();
const connect = require("./config/db");
const ErrorMiddlewares = require("./middlewares/Error");

//Database connection
connect();

//middlewares

app.use(express.json());

//imports
const products = require("./routes/productRoute");

app.use("/api/v1", products);
app.use(ErrorMiddlewares);

module.exports = app;
