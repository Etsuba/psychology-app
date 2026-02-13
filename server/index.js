import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes (make sure filenames match exactly)
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/book.js";       // ✅ matches your file
import emotionRoutes from "./routes/emotions.js"; // ✅ matches your file

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/emotions", emotionRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));