require("dotenv").config();
const app = require("./app");

// Handle uncaought exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to uncaought exception`);
  process.exit(1);
});
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
//handle unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`ERROR:${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
