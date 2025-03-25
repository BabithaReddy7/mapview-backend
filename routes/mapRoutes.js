const express = require("express");
const router = express.Router();

// Dummy map data (Replace with real data fetching logic)
router.get("/", (req, res) => {  // Ensure this matches "/api/map" correctly
    res.json({
        message: "Map data retrieved successfully",
        data: {
            coordinates: [
                { lat: 12.9716, lng: 77.5946 },
                { lat: 28.7041, lng: 77.1025 }
            ],
            mapType: "OpenStreetMap"
        }
    });
});

module.exports = router;
