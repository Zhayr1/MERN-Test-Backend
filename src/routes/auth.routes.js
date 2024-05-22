import express from "express";
import userController from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { UserRolesEnum } from "../constants/user-roles.js";

export const authRoutes = express.Router();

authRoutes.post(
  "/register",
  [
    body("email", "Type a valid email").isEmail(),
    body("username", "username is required").not().isEmpty().escape(),
    body("password", "Password must have minimum 6 characters").isLength({
      min: 6,
    }),
    body(
      "role",
      `Role must be ${UserRolesEnum.READER} or ${UserRolesEnum.CREATOR}`
    ).isIn([UserRolesEnum.CREATOR, UserRolesEnum.READER]),
  ],
  userController.registerUser
);
authRoutes.post(
  "/login",
  [
    body("email", "Type a valid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
  ],
  userController.loginUser
);
