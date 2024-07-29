import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const token: string = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({
      token: token,
      deleted: false,
    }).select("-password");

    if (user) {
      (req as any)["user"] = user;
    }
  }
  next();
};

export default authMiddleware;
