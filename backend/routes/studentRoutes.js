import express from "express";
import {
  updateStudent,
  deleteStudent,
  getStudent,
  registerStudent,
} from "../controllers/studentController.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middlewares/verifyJWT.js";
import Student from "../model/Student.js";
import multer from "multer";

const studentRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

studentRouter.put(
  "/:id",
  verifyTokenAndAdmin,
  upload.single("userimg"),
  updateStudent
);

//DELETE
studentRouter.delete("/:id", verifyTokenAndAdmin, deleteStudent);

//GET STUDENT
studentRouter.get("/find/:id", verifyTokenAndAdmin, getStudent);

//GET ALL STUDENTS
studentRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const students = query
      ? await Student.find().sort({ _id: -1 }).limit(5)
      : await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

studentRouter.post(
  "/registerStudent",
  verifyTokenAndAdmin,
  upload.single("userimg"),
  registerStudent
);

export default studentRouter;
