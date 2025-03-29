const express = require("express");
const router = express.Router();

// Example API endpoint
router.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

// Add more routes as needed
// Example: A sample endpoint to fetch courses
router.get("/courses", (req, res) => {
  res.json([
    { id: 1, name: "JavaScript Basics" },
    { id: 2, name: "Advanced Node.js" },
  ]);
});

module.exports = router;
