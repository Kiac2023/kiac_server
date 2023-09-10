require("dotenv").config();
const express = require("express");
const { sequelize } = require("./model/application.model");
const path = require("path"); // Import the path module

const studentRoutes = require("./routes/student.route");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; 
const IP_ADDRESS = process.env.IP_ADDRESS; // Specify the IP address you want to use

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/students", studentRoutes);
app.use('/api/students/uploads', express.static('uploads'));
app.use((err, req, res, next) => {
  console.error(err.stack); // log the error stack trace
  res.status(500).send({error: 'Something went wrong!'});
});

// Define a route to handle document downloads
app.get('/api/students/upload/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Set the Content-Disposition header to trigger a download
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.sendFile(filePath);
});

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Student Management System!",
    
  });
});

sequelize.sync().then(() => {
  app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is running at http://${IP_ADDRESS}:${PORT}/`);
  });
});
