const express = require("express");
const app = express();
const apiRoutes = require("./Routes/NotesRoute.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./db.js");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

dotenv.config();

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests, please try again later."
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Sample route
app.get("/", (req, res) => {
  res.send("test the api route");
});



// Notes routes (apply limiter here only)
app.use("/api/notes", limiter, apiRoutes);

// DB connection
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON THE ${PORT} PORT`);
  });
});