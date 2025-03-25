const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("❌ Error connecting to database:", err.message);
    } else {
        console.log("✅ Connected to SQLite database.");
    }
});

const app = express();

// ✅ CORS Configuration
const corsOptions = {
    origin: ["https://map-view-gamma.vercel.app", "http://localhost:3000"], // Update as needed
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());  

// Import Routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const mapRoutes = require("./routes/mapRoutes");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/map", mapRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({ message: "🚀 Backend is running on Render!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

module.exports = db;
