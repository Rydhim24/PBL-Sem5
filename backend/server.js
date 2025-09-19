import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// app.use("./routes/auth.js", authRoutes);

app.use("/api/auth", authRoutes);
app.use("/profile", profileRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  })
  .catch(err => console.error(err));
