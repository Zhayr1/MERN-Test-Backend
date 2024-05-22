import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import topicController from "../controllers/topic.controller.js";
import { RoleMiddleware } from "../middlewares/role.middleware.js";
import { UserRolesEnum } from "../constants/user-roles.js";
import { body, param } from "express-validator";

export const topicRoutes = express.Router();

topicRoutes.get(
  "/:id",
  param("id", "Id is required").isMongoId().not().isEmpty().escape(),
  topicController.getTopicsByCategory
);

topicRoutes.post(
  "/",
  [
    AuthMiddleware,
    RoleMiddleware([UserRolesEnum.ADMIN]),
    body("categoryId", "CategoryId is required")
      .isMongoId()
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
  "/:topicId",
  [
    AuthMiddleware,
    RoleMiddleware([UserRolesEnum.ADMIN]),
    param("topicId", "Topic id is required").isMongoId().notEmpty().escape(),
    body("categoryId", "CategoryId is required").isMongoId().escape(),
    body("name", "Name is required").isString().escape(),
    body("allowsImages", "Must be true or false").isBoolean(),
    body("allowsVideos", "Must be true or false").isBoolean(),
    body("allowsDocuments", "Must be true or false").isBoolean(),
  ],
  topicController.updateTopic
);

topicRoutes.delete(
  "/:id",
  [
    AuthMiddleware,
    RoleMiddleware([UserRolesEnum.ADMIN]),
    param("id", "Invalid Id").isMongoId().notEmpty().escape(),
  ],
  topicController.deleteTopic
);
