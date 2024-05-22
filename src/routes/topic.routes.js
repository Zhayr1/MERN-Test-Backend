import express from "express";
import { upload } from "../utils/file-upload.util.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import topicController from "../controllers/topic.controller.js";
import { RoleMiddleware } from "../middlewares/role.middleware.js";
import { UserRolesEnum } from "../constants/user-roles.js";
import { body, param } from "express-validator";

export const topicRoutes = express.Router();

topicRoutes.get("/", topicController.getTopicsByCategory);

topicRoutes.post(
  "/",
  [
    AuthMiddleware,
    RoleMiddleware([UserRolesEnum.ADMIN]),
    body("categoryId", "CategoryId is required")
      .isString()
      .not()
      .isEmpty()
      .escape(),
    body("name", "Name is required").isString().not().isEmpty().escape(),
    body("allowsImages", "Must be true or false").isBoolean().not().isEmpty(),
    body("allowsVideos", "Must be true or false").isBoolean().not().isEmpty(),
    body("allowsDocuments", "Must be true or false")
      .isBoolean()
      .not()
      .isEmpty(),
  ],
  topicController.createTopic
);

topicRoutes.patch(
  "/:id",
  AuthMiddleware,
  RoleMiddleware([UserRolesEnum.ADMIN]),
  upload.single("file"),
  topicController.updateTopic
);

topicRoutes.delete(
  "/:id",
  [
    AuthMiddleware,
    RoleMiddleware([UserRolesEnum.ADMIN]),
    param("id", "Invalid Id").not().isEmpty().isString().escape(),
  ],
  topicController.deleteTopic
);
