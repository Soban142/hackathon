import express from "express";
import {
  adminSignup,
  signin,
  studentSignin,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/adminSignup", adminSignup);

authRouter.route("/signin").post(signin);

authRouter.post("/studentSignin", studentSignin);

export default authRouter;
