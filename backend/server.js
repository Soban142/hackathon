import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/dbcon.js";
import authRouter from "./routes/authRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import videoRouter from "./routes/videoRoutes.js";
// import commentRouter from "./routes/commentRoutes.js";
// import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import studentRouter from "./routes/studentRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
connectDB();
// app.use(express.static("/public"));
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/attendances", attendanceRouter);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  res.status(status).json({
    success: false,
    status,
    message,
  });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
