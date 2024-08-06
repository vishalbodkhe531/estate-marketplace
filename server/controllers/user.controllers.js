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
