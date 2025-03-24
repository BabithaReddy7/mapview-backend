const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// Secret Key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Fetch user from database
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      console.log("Stored password hash:", user.password);

      // Validate password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid password" });
      }

      // Generate JWT Token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Login successful", token });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// User Registration
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the user already exists by email
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      db.run(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        function (err) {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "User registration failed" });
          }

          console.log("User registered:", { username, email, hashedPassword });

          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

