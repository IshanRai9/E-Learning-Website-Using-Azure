const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable or fallback to 5000

// API routes should be defined before static routes
app.use("/api", require("./routes/api"));

// Serve React frontend
app.use(express.static(path.join(__dirname, "../elearning-frontend/build"))); // Changed to build folder

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../elearning-frontend/build", "index.html")); // Changed to build folder
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});