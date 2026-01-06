import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
// import "./config/passport.js"; // Temporarily disabled to allow server start without Google Keys

// Route imports
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import newsRoutes from "./routes/news.js";
import jobsRoutes from "./routes/jobs.js";
import assessmentRoutes from "./routes/assessment.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // Required for cookies
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/assessment", assessmentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Debug Env (Temporary)
app.get("/api/debug-env", (req, res) => {
  res.json({
    hasKey: !!process.env.GEMINI_API_KEY,
    cwd: process.cwd(),
    keyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Basic root route
app.get("/", (req, res) => {
  res.send("HoriZon API is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("SERVER VERSION DEBUG: 2.0 (Direct Fetch)");
});

// Trigger restart for Gemini API Key update
