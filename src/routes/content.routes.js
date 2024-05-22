import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import contentController from "../controllers/content.controller.js";
import { RoleMiddleware } from "../middlewares/role.middleware.js";
import { UserRolesEnum } from "../constants/user-roles.js";
import { param } from "express-validator";
import { upload } from "../utils/file-upload.util.js";

export const contentRoutes = express.Router();

contentRoutes.get(
  "/public/:id",
  [param("id", "Id is required").isMongoId().notEmpty().escape()],
  contentController.getPublicContentsByTopic
);

contentRoutes.get(
  "/:id",
  AuthMiddleware,
  RoleMiddleware([
    UserRolesEnum.ADMIN,
    UserRolesEnum.CREATOR,
    UserRolesEnum.READER,
  ]),
  [param("id", "Id is required").isMongoId().notEmpty().escape()],
  contentController.getContentsByTopic
);

contentRoutes.post(
  "/",
  [
    AuthMiddleware,
    RoleMiddleware([UserRolesEnum.ADMIN, UserRolesEnum.CREATOR]),
    upload.single("file"),
  ],
  contentController.createContent
);

contentRoutes.patch(
  "/:contentId",
  [
    AuthMiddleware,
    RoleMiddleware([UserRolesEnum.ADMIN, UserRolesEnum.CREATOR]),
    upload.single("file"),
  ],
  contentController.updateContent
);

contentRoutes.delete(
  "/:id",
  [
    AuthMiddleware,
    RoleMiddleware([UserRolesEnum.ADMIN]),
    param("id", "Invalid Id").isMongoId().notEmpty().escape(),
  ],
  contentController.deleteContent
);
