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

