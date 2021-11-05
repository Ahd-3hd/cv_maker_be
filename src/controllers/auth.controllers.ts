import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      password: hashPassword,
    });
    await user.save();
    return res.status(201).json({
      message: "Signup successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Coudln't create user",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "No user with given credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Given credentials are incorrect",
      });
    }

    const accessToken = jwt.sign(user.password, "secret");

    return res.status(200).json({
      userId: user._id,
      accessToken,
      email,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, try again",
    });
  }
};
