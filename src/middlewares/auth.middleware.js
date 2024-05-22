import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const AuthMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};
