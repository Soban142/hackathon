import express from "express";
// import {
//   updateUser,
//   deleteUser,
//   getUser,
// } from "../controllers/studentController.js";
// import User from "../model/User.js";
import { verifyToken, verifyTokenAndAdmin } from "../middlewares/verifyJWT.js";
import {
  checkIn,
  checkOut,
  getAllAttendances,
  getAttendance,
} from "../controllers/attendanceController.js";

const attendanceRouter = express.Router();

attendanceRouter.post("/checkin", checkIn);
attendanceRouter.put("/checkout", checkOut);
attendanceRouter.get("/find/:id", verifyTokenAndAdmin, getAttendance);
attendanceRouter.get("/", verifyTokenAndAdmin, getAllAttendances);

export default attendanceRouter;
