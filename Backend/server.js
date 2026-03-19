const express = require("express");
const app = express();
const apiRoutes = require("./Routes/NotesRoute.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./db.js");
const cors = require("cors");
const path=require("path")
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

if(process.env.NODE_ENV !== "production"){

app.use(cors({
  origin:"http://localhost:5173"
}))
}






// Notes routes (apply limiter here only)
app.use("/api/notes", limiter, apiRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../Frontend/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
})
}

// DB connection
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON THE ${PORT} PORT`);
  });
});