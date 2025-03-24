const express = require("express");
const router = express.Router();
const db = require("../database");
const authController = require("../controllers/authController"); // Correct import

// Define routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/users", (req, res) => {
    db.all("SELECT id, username, email FROM users", [], (err, rows) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json(rows);
    });
  });

module.exports = router; // Export router
