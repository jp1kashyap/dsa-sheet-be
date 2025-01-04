import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

interface JwtPayload {
  id: string;
}

const authMiddleware = async (
  req: Request & { user?: IUser },
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token or user" });
    }
    req.user = user;
    next();
  } catch (e) {}
};
export { authMiddleware };
