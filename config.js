const Sequelize = require("sequelize");
require("dotenv").config(); // Load environment variables from .env file



const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
//   process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Authenticate and handle errors
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err.message); // Display error message
  })
  .finally(() => {
    // Ensure the Sequelize connection is closed, even if there's an error
    sequelize.close().then(() => {
      console.log("Connection closed.");
    });
  });
