import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandling.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res, next) => {
  try {
    const { userName, email, password, profilePic } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) return next(errorHandler(400, "User aleady existed"));

    const hashPass = bcryptjs.hashSync(password, 10);

    await User.create({ userName, email, password: hashPass, profilePic });

    res
      .status(201)
      .json({ success: true, message: "User Successfully Created" });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isExist = await User.findOne({ email });

    if (!isExist) return next(errorHandler(400, "User not found..!"));

    const mathPass = bcryptjs.compareSync(password, isExist.password);

    if (!mathPass) return next(errorHandler(400, "Incorrect Password"));

    const token = jwt.sign({ _id: isExist._id }, process.env.SECREATE_KEY);

    const { password: xyz, ...userData } = isExist._doc;
    res
      .cookie("cookie", token, {
        httpOnly: true,
        maxAge: 12 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      })

      .status(202)
      .json(userData);
  } catch (error) {
    next(error);
  }
};

export const userLogout = (req, res, next) => {
  console.log(`first`);
  res
    .clearCookie("cookie")
    .status(200)
    .json({ message: "user successfully logout" });
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res
      .clearCookie("cookie")
      .status(200)
      .json({ success: true, message: "User successfully deleted" });
  } catch (error) {
    console.log(`Error while deleteUser Profile : ${error}`);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { avatar } = req.body;

  if (req.user.id !== req.params.id) {
    return next(errorHandler(400, "You can update only your profile"));
  }

  if (avatar === req.user.profilePic) {
    return;
  }

  if (req.body.email) {
    const isExistUser = await User.findOne({ email: req.body.email });
    if (isExistUser) {
      return next(errorHandler(400, "User already exists"));
    }
  }

  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  try {
    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          profilePic: avatar,
        },
      },
      { new: true }
    );

    const { password, ...userData } = newUser._doc;

    res.status(201).json(userData);
  } catch (error) {
    console.log(`Error while update user : ${error}`);
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { displayName, email, photoURL } = req.body;

  try {
    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
      const token = jwt.sign(
        { _id: isExistUser._id },
        process.env.SECREATE_KEY
      );

      const { password, ...userData } = isExistUser._doc;

      return res
        .cookie("cookie", token, {
          httpOnly: true,
          maxAge: 12 * 24 * 60 * 60 * 1000,
          secure: true,
          sameSite: "None",
        })
        .status(202)
        .json(userData);
    }

    const password = Math.floor(Math.random() * 10000000 + 10000000).toString();

    const hashPass = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      userName: displayName,
      email,
      profilePic: photoURL,
      password: hashPass,
    });

    // console.log(profilePic);
    await newUser.save();

    const { password: xyz, ...userData } = newUser._doc;

    const token = jwt.sign({ _id: newUser._id }, process.env.SECREATE_KEY);
    res
      .cookie("cookie", token, {
        httpOnly: true,
        maxAge: 12 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      })
      .status(202)
      .json(userData);
  } catch (error) {
    console.log(`Error while Google-Auth : ${error}`);
    next(error);
  }
};
