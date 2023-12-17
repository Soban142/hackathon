import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/userController.js";
import User from "../model/User.js";
import {
  verifyToken,
} from "../middlewares/verifyJWT.js";

const userRouter = express.Router();

userRouter.put("/:id", verifyToken, updateUser);

//DELETE
// userRouter.delete("/:id", verifyTokenAndAuthorization, deleteUser);
userRouter.delete("/:id", verifyToken, deleteUser);