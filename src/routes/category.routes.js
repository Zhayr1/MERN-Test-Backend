import express from "express";
import { upload } from "../utils/file-upload.util.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import categoryController from "../controllers/category.controller.js";
import { RoleMiddleware } from "../middlewares/role.middleware.js";
import { UserRolesEnum } from "../constants/user-roles.js";

export const categoryRoutes = express.Router();

categoryRoutes.get("/", categoryController.getCategories);

categoryRoutes.post(
  "/",
  AuthMiddleware,
  RoleMiddleware([UserRolesEnum.ADMIN]),
  upload.single("file"),
  categoryController.createCategory
);
