const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

// Initialize the database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Import Routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const mapRoutes = require("./routes/mapRoutes");





const app = express();

// Middleware
app.use(express.json());  // For parsing application/json
app.use(cors());          // To allow cross-origin requests

// Routes
app.use("/api/auth", authRoutes);         // Authentication routes

app.use("/api/dashboard", dashboardRoutes); // Dashboard routes
app.use("/api/map", mapRoutes);               // Map-related routes

// Test route to check if the server is working
app.get("/test", (req, res) => {
    res.json({ message: "Server is running!" });
});

// Start the server
const PORT = process.env.PORT || 5000;  // Use environment variable for PORT if available
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = db;  // Export db if needed in other files
