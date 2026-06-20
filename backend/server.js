const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const jobsRoute = require("./routes/jobs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log("MongoDB Error:", err));
// Routes
app.use("/jobs", jobsRoute);

// Test Route
app.get("/", (req, res) => {
    res.send("Job Tracker Backend Running 🚀");
});

// Test API
app.get("/test", (req, res) => {
    res.json({
        message: "API is working ✅"
    });
});

// Server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});