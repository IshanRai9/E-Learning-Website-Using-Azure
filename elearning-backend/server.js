const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve React frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// API routes
app.use("/api", require("./routes/api")); // Adjust this based on your backend routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
