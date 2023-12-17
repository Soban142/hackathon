import User from "../model/User.js";
import bcrypt from "bcrypt";
import { createError } from "../middlewares/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signup = async (req, res, next) => {
  console.log(req.body);

  if (
    !req.body.firstname &&
    !req.body.lastname &&
    !req.body.course &&
    !req.body.password &&
    !req.body.email
  )
    return res
      .status(401)
      .json({ message: "Username, password and email field are compulsory." });

  let username = req.body.firstname + req.body.lastname;
  const emailExisted = await User.findOne({ email: req.body.email }).exec();
  if (emailExisted)
    return res
      .status(409)
      .json({ message: "email already exist", status: 409 });

  // const duplicateUser = await User.findOne({
  //   username: req.body.username,
  // }).exec();

  // if (duplicateUser)
  //   return res.status(409).json({ message: "user already exist", status: 409 });

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log(hashedPassword);
  try {
    const user = await User.create({
      username: username,
      email: req.body.email,
      password: hashedPassword,
      ...req.body,
    });

    const result = user;
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  console.log(req.body);
  const emailOrUsername = req.body?.username || req.body?.email;
  try {
    const foundUser = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    console.log(foundUser);
    if (!foundUser) return res.status(404).json("User not found");

    // const matchedPassword = await bcrypt.compare(
    //   req.body?.password,
    //   foundUser.password
    // );

    // if (matchedPassword) return res.status(401).json("Authorization failed");
    if (foundUser.password !== req.body.password)
      return res.status(401).json("Authorization failed");

    const accessToken = jwt.sign(
      {
        id: foundUser._id,
        isAdmin: foundUser.isAdmin,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...others } = foundUser._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    next(error);
  }

  //   try {
  //     const user = await User.findOne({ name: req.body.name });
  //     if (!user) return next(createError(404, "User not found!"));

  //     const matchedPassword = await bcrypt.compare(
  //       req.body.password,
  //       user.password
  //     );
  //     if (!matchedPassword) return next(createError(400, "Wrong credentials"));

  //     const token = jwt.sign({ id: user._id }, process.env.JWT);
  //     const { password, ...others } = user._doc;
  //     res
  //       .cookie("access_token", token, {
  //         httpOnly: true,
  //       })
  //       .status(200)
  //       .json(others);
  //   } catch (error) {
  //
  //   }
};

// const googleAuth = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT);
//       res
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .status(200)
//         .json(user._doc);
//     } else {
//       const newUser = new User({
//         ...req.body,
//         fromGoogle: true,
//       });

//       const savedUser = newUser.save();
//       const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
//       res
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .status(200)
//         .json(savedUser._doc);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export { signup, signin };
