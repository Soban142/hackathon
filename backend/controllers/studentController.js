import { createError } from "../middlewares/error.js";
import bcrypt from "bcrypt";
import uniqueRandom from "unique-random";
import User from "../model/User.js";
import Student from "../model/Student.js";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "dyrhv6cn5",
  api_key: "959655167265919",
  api_secret: "hWbsTlR52xo_CY0ehZm7qu3bHWc",
});
import { dirname } from "path";
import { fileURLToPath } from "url";
import { rejects } from "assert";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const updateStudent = async (req, res) => {
  console.log(req.file);
  // if (req.body.password) {
  //   req.body.password = await bcrypt.hash(req.body.password, 10);
  // }

  if (req.file) {
    new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          return error ? rejects(error) : resolve(uploadResult);
        })
        .end(req.file.buffer);
    }).then(async (uploadResult) => {
      console.log(uploadResult);
      try {
        const updatedStudent = await Student.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              ...req.body,
              img: uploadResult.url,
            },
          },
          { new: true }
        );
        console.log(updatedStudent);
        res.status(200).json(updateStudent);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  } else {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log(updatedStudent);
      res.status(200).json(updatedStudent);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    const { password, ...others } = student._doc;
    res.status(200).json(student);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

export const registerStudent = async (req, res, next) => {
  if (
    !req.body.firstname &&
    !req.body.lastname &&
    !req.body.course &&
    !req.body.password &&
    !req.body.email
  )
    return res.status(401).json({
      message: "Username, password and email field are compulsory.",
    });

  let username = req.body.firstname + " " + req.body.lastname;
  const emailExisted = await Student.findOne({
    email: req.body.email,
  }).exec();
  if (emailExisted)
    return res
      .status(409)
      .json({ message: "email already exist", status: 409 });

  let rollNum = await generateUniqueRollNum();
  async function generateUniqueRollNum() {
    let rollNumber = Math.round(Math.random() * 1000) + 1;
    console.log(rollNumber);

    try {
      const existingStudent = await Student.findOne({
        rollNum: rollNumber,
      }).exec();
      console.log(existingStudent);
      if (existingStudent) {
        rollNumber = await generateUniqueRollNum();
      }
    } catch (error) {
      next(error);
    }

    return rollNumber;
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // console.log(hashedPassword);

    if (req?.file) {
      new Promise((resolve) => {
        cloudinary.uploader
          .upload_stream((error, uploadResult) => {
            return error ? rejects(error) : resolve(uploadResult);
          })
          .end(req.file.buffer);
      }).then(async (uploadResult) => {
        console.log(uploadResult);
        try {
          const student = await Student.create({
            username: username,
            email: req.body.email,
            password: hashedPassword,
            img: uploadResult?.url,
            rollNum,
            ...req.body,
          });

          const result = student;
          console.log(student);
          res.status(201).json(result);
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      try {
        const student = await Student.create({
          username: username,
          email: req.body.email,
          password: hashedPassword,
          rollNum,
          ...req.body,
        });
        res.status(201).json(student);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    next(error);
  }
};
