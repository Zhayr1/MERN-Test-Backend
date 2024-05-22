import express from "express";
import { upload } from "../utils/file-upload.util.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import categoryController from "../controllers/category.controller.js";
import { RoleMiddleware } from "../middlewares/role.middleware.js";
import { UserRolesEnum } from "../constants/user-roles.js";
import { param } from "express-validator";

export const categoryRoutes = express.Router();

categoryRoutes.get("/", categoryController.getCategories);

categoryRoutes.post(
  "/",
  AuthMiddleware,
  RoleMiddleware([UserRolesEnum.ADMIN]),
  upload.single("file"),
  categoryController.createCategory
);

categoryRoutes.patch(
  "/:id",
  AuthMiddleware,
  RoleMiddleware([UserRolesEnum.ADMIN]),
  upload.single("file"),
  categoryController.updateCategory
);

categoryRoutes.delete(
  "/:id",
  [
    AuthMiddleware,
    RoleMiddleware([UserRolesEnum.ADMIN]),
    param("id", "Invalid Id").not().isEmpty().isString().escape(),
  ],
  categoryController.deleteCategory
);
