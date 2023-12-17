import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/userController.js";
import User from "../model/User.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middlewares/verifyJWT.js";

const userRouter = express.Router();

userRouter.put("/:id", verifyTokenAndAuthorization, updateUser);

//DELETE
// userRouter.delete("/:id", verifyTokenAndAuthorization, deleteUser);
userRouter.delete("/:id", verifyTokenAndAdmin, deleteUser);

//GET USER
userRouter.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
userRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

userRouter.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default userRouter;
