const express = require("express");
const router = express.Router();

// Sample dashboard data
const dashboardData = [
    { id: 1, title: "Total Users", description: "1500 users registered" },
    { id: 2, title: "Active Sessions", description: "500 users online" },
    { id: 3, title: "Total Locations", description: "120 locations tracked" }
];

// Protected dashboard route
router.get("/", (req, res) => {
    console.log("✅ API hit: Sending Dashboard Data...");
    res.json({ success: true, data: dashboardData }); // ✅ Send structured response
});

module.exports = router;
