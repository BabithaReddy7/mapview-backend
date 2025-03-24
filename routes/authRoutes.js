const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Correct import

// Define routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router; // Export router
