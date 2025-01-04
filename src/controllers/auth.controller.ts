import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";

export const register = async (req: Request, res: Response): Promise<any> => {
  const { name, phone, email, password } = req.body;
  try {
    const userWithPhone = await User.findOne({ phone });
    if (userWithPhone) {
      return res
        .status(400)
        .json({ message: "User already exists with this phone number" });
    }
    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, phone, password: encryptedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ message: `Server error` });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({ name: user.name, token });
  } catch (e) {
    res.status(500).json({ message: `Server error` });
  }
};
