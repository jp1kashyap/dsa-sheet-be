import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import topicRoutes from "./routes/topic.routes";
import progressRoutes from "./routes/progress.routes";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://dsa-sheet-fe.vercel.app", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Include credentials if needed (e.g., cookies, HTTP auth)
  })
);
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/progress", progressRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
