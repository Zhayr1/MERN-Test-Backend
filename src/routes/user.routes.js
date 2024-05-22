import express from "express";
import userController from "../controllers/user.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

export const userRoutes = express.Router();

userRoutes.get("/profile", AuthMiddleware, userController.getUserProfile);
