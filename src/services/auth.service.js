import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { matchedData } from "express-validator";

const registerUser = async (req, res) => {
  const { username, email, password, role } = matchedData(req);

  let user = await UserModel.findOne({ email });

  if (user) {
    return res.status(400).json({ msg: "This Email is already registered" });
  }

  user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ msg: "This username is already used" });
  }

  user = new UserModel({
    username,
    email,
    password,
    role,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const payload = {
    id: user.id,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

  return token;
};

const loginUser = async (email, password) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    }
  );

  return { user, token };
};

export default {
  registerUser,
  loginUser,
};
