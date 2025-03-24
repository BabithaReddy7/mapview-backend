const sqlite3 = require('sqlite3').verbose();

// Create a new database connection
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

module.exports = db; // Export the database connection if needed elsewhere

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const mapRoutes = require("./routes/mapRoutes"); 


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes) // Make sure this is here
app.use("/api", mapRoutes); // Register the route

const PORT = 5000;
app.get("/test", (req, res) => {
    res.json({ message: "Server is running!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

