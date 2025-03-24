const express = require("express");
const router = express.Router();

// Protected dashboard route
router.get("/", (req, res) => {
    res.json({ message: "Dashboard data" });
});

module.exports = router;


