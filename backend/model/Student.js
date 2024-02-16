import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    rollNum: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    course: {
      type: String,
    },
    contact: {
      type: Number,
    },
    img: {
      type: String,
      default: "",
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
